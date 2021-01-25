from flask import request
import functools
from flask import (Blueprint, g,  request, session)
from werkzeug.security import generate_password_hash, check_password_hash
from Cohooyo.utils.validation import validate_password, validate_user, validate_request_attr, validate_employer, validate_worker
from Cohooyo.utils.email import send_verification_email, send_pw_reset_email
from Cohooyo.utils.security import generate_token, decode_auth_token, encode_auth_token
from Cohooyo.utils.messages import *
from Cohooyo.db.CRUD import read, update, create


bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@bp.route('/register', methods=['POST'])
def register():
    try:
        validated_attr = validate_request_attr(
            request, ["user_type", "email", "password"])
        if read.get_user_by('email', validated_attr["email"]) is not None:
            raise Error('EMAIL_EXIST_ALREADY')
        # Create user
        verification_token = generate_token()
        new_user = None
        # validate & create_employer
        if validated_attr["user_type"] == 'employer':
            employer_attr = validate_request_attr(request, ["company_name"])
            validate_user(
                validated_attr["email"], validated_attr["password"])
            #validate_employer(employer_attr["company_name"])
            new_user = create.create_user(validated_attr["email"], generate_password_hash(
                validated_attr["password"]), verification_token)
            create.create_employer(employer_attr['company_name'], new_user.id)
        # or validate & create worker
        elif validated_attr["user_type"] == 'worker':
            worker_attr = validate_request_attr(
                request, ["birth_day", "birth_month", "birth_year", "first_name", "last_name"])
            validate_user(
                validated_attr["email"], validated_attr["password"])
            #validate_worker(worker_attr['first_name'], worker_attr['last_name'])
            new_user = create.create_user(validated_attr["email"], generate_password_hash(
                validated_attr["password"]), verification_token)
            create.create_worker(
                worker_attr['birth_day'], worker_attr['birth_month'], worker_attr['birth_year'], new_user.id,  worker_attr['first_name'], worker_attr['last_name'])

        #send_verification_email(email, request.json['last_name'], verification_token)
        auth_token = encode_auth_token(new_user.id)

        return Success('REGISTERED').asdict() | {"auth_token": auth_token.decode()}
    except Error as myError:
        return myError.asdict()


@ bp.route('/login', methods=['POST'])
def login():
    try:
        validated_attr = validate_request_attr(request, ["email", "password"])
        email = validated_attr['email']
        password = validated_attr['password']
        # Validation
        user = read.get_user_by('email', email)
        if user is None:
            raise Error('EMAIL_INCORRECT')

        if not check_password_hash(user.password, password):
            raise Error('PASSWORD_INCORRECT')

        # Login and create session
        auth_token = encode_auth_token(user.id)
        isWorker = True if user.worker else False
        return Success('LOGGED_IN').asdict() | {"auth_token": auth_token.decode(), "isWorker": isWorker}
    except Error as myError:
        return myError.asdict()


@ bp.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return Success('LOGGED_OUT').asdict()


@ bp.route('/verify', methods=['GET', 'POST'])
def verify():
    try:
        # GET, redirect to react native
        email_verification_token = request.args.get('tk')
        user = read.get_user_by('email_verification_token',
                                email_verification_token)
        if user is None:
            raise Error('CANT_VERIFY_EMAIL')
        update.set_user_attribute(user, 'is_verified', True)
        return Success('VERIFIED').asdict()
    except Error as myError:
        return myError.asdict()


@ bp.route('/reset_password', methods=['POST'])
def reset_password():
    try:
        validated_attr = validate_request_attr(request, ["email"])
        email = validated_attr['email']
        user = read.get_user_by('email', email)
        if user is None:
            raise Error('EMAIL_INCORRECT')
        else:
            password_reset_token = generate_token()
            send_pw_reset_email(user.email, user.last_name,
                                password_reset_token)
            update.set_user_attribute(
                user, 'password_reset_token', password_reset_token)
            return Success('PW_RESET_SEND').asdict()
    except Error as myError:
        return myError.asdict()


@ bp.route('/get_password_reset_page', methods=['POST'])
def get_password_reset_page():
    try:
        # GET, redirect to react native
        password_reset_token = request.args.get('tk')
        user = read.get_user_by('password_reset_token', password_reset_token)

        if user is None:
            raise Error('CANT_RESET_PASSWORD')
        return Success('ENTER_PASSWORD').asdict()
    except Error as myError:
        return myError.asdict()


@ bp.route('/set_new_password', methods=['POST'])
def set_new_password():
    try:
        validated_attr = validate_request_attr(request, ["password"])
        password_reset_token = request.args.get('tk')
        password = validated_attr['password']
        user = read.get_user_by('password_reset_token', password_reset_token)
        if user is None:
            raise Error('CANT_RESET_PASSWORD')
        validate_password(password)
        update.set_user_attribute(
            user, 'password', generate_password_hash(password))
        update.set_user_attribute(user, 'password_reset_token', None)
        return Success('ENTER_PASSWORD').asdict()
    except Error as myError:
        return myError.asdict()


@ bp.before_app_request
def load_logged_in_user():
    auth_token = None
    auth_header = request.headers.get('Authorization')
    g.user = None

    if auth_header:
        auth_token = auth_header.split(" ")[1]

    if auth_token:
        resp = decode_auth_token(auth_token)
        if not isinstance(resp, str):
            g.user = read.get_user_by('id', resp)


def login_required(view):
    @ functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return Error("MUST_LOGGED_IN").asdict(), 401

        return view(**kwargs)

    return wrapped_view
