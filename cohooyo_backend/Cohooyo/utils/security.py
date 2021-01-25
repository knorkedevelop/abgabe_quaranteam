import jwt
import datetime
import os
from flask import current_app


def generate_token():
    return os.urandom(24)


def encode_auth_token(user_id):
    """
    Generates the Auth Token
    :return: string
    """
    payload = {
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1, seconds=0),
        'iat': datetime.datetime.utcnow(),
        'sub': user_id
    }
    return jwt.encode(payload, current_app.config.get('SECRET_KEY'), algorithm='HS256')


def decode_auth_token(auth_token):
    """
    Decodes the auth token
    :param auth_token:
    :return: integer|string
    """
    try:
        payload = jwt.decode(auth_token, current_app.config.get(
            'SECRET_KEY'), algorithms=['HS256'])
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return 'SIGNATURE_EXPIRED'
    except jwt.InvalidTokenError:
        return 'INVALID_TOKEN'
