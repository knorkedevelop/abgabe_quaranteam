from Cohooyo.db.models import *
from Cohooyo.utils.messages import Error


def get_user_by(attribute_name, attribute_value):
    try:
        if attribute_name == "email":
            return User.query.filter_by(email=attribute_value).first()
        if attribute_name == "id":
            return User.query.filter_by(id=attribute_value).first()
        if attribute_name == "email_verification_token":
            return User.query.filter_by(email_verification_token=attribute_value).first()
        if attribute_name == "password_reset_token":
            return User.query.filter_by(password_reset_token=attribute_value).first()
    except:
        raise Error("READ_INCORRECT")


def get_employer_by(attribute_name, attribute_value):
    try:
        if attribute_name == "id":
            return Employer.query.filter_by(id=attribute_value).first()
    except:
        raise Error("READ_INCORRECT")


def get_worker_by(attribute_name, attribute_value):
    try:
        if attribute_name == "id":
            return Worker.query.filter_by(id=attribute_value).first()
    except:
        raise Error("READ_INCORRECT")


def get_job_by(attribute_name, attribute_value):
    try:
        if attribute_name == "id":
            return Job.query.filter_by(id=attribute_value).first()
        if attribute_name == "title":
            return Job.query.filter_by(title=attribute_value).first()
    except:
        raise Error("READ_INCORRECT")


def get_chat_by(attribute_name, attribute_value):
    try:
        if attribute_name == "id":
            return Chat.query.filter_by(id=attribute_value).first()
    except:
        raise Error("READ_INCORRECT")
