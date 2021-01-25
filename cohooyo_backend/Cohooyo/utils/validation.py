import re
from Cohooyo.utils.messages import *


def validate_request_attr(request, attr):
    all_attr = {}
    for current_attr in attr:
        if not current_attr in request.json:
            raise Error("REQUEST_INCORRECT")
        else:
            all_attr = all_attr | {current_attr: request.json[current_attr]}
    return all_attr


def validate_user(email, password):
    if not email:
        raise Error("NO_EMAIL")
    if not password:
        raise Error("NO_PASSWORD")
    validate_password(password)


def validate_password(password):
    if len(password) < 8:
        raise Error("PASSWORD_TO_SHORT")
    if re.search("\\s", password):
        raise Error("PASSWORD_HAS_SPACE")
    if not re.search("[a-z]", password):
        raise Error("PASSWORD_NEED_LOWER_CASE")
    if not re.search("[A-Z]", password):
        raise Error("PASSWORD_NEED_UPPER_CASE")
    if not re.search("[0-9]", password):
        raise Error("PASSWORD_NEED_NUMBER")


def validate_employer(company_name):
    if not company_name:
        raise Error("NO_COMPANY")
    if len(company_name) < 3:
        raise Error("COMPANY_TOO_SHORT")


def validate_worker(first_name, last_name):
    if not first_name:
        raise Error("NO_FIRST_NAME")
    if not last_name:
        raise Error("NO_LAST_NAME")

