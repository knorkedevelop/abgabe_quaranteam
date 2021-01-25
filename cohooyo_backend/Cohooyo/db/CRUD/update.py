from Cohooyo.db.models import *
from Cohooyo.utils.messages import *


def update_user(user, attribute_name, attribute_value):
    try:
        if attribute_name == "email":
            user.email = attribute_value
        elif attribute_name == "password":
            user.password = attribute_value
        elif attribute_name == "is_verified":
            user.is_verified = attribute_value
        elif attribute_name == "password_reset_token":
            user.password_reset_token = attribute_value
            db.session.commit()
    except:
        raise Error("UPDATE_INCORRECT")


def update_employer(employer, attribute_name, attribute_value):
    try:
        if attribute_name == "company_name":
            employer.company_name = attribute_value
        elif attribute_name == "description":
            employer.description = attribute_value
        elif attribute_name == "logo":
            employer.logo = attribute_value
        elif attribute_name == "master_certificate":
            employer.master_certificate = attribute_value
        elif attribute_name == "image":
            employer.image = attribute_value
        db.session.commit()
    except:
        raise Error("UPDATE_INCORRECT")


def update_worker(worker, attribute_name, attribute_value):
    try:
        if attribute_name == "birth_day":
            worker.birthdate.replace(day=attribute_value)
        if attribute_name == "birth_month":
            worker.birthdate.replace(month=attribute_value)
        if attribute_name == "birth_year":
            worker.birthdate.replace(year=attribute_value)
        elif attribute_name == "first_name":
            worker.first_name = attribute_value
        elif attribute_name == "last_name":
            worker.last_name = attribute_value
        elif attribute_name == "image":
            worker.image = attribute_value
        elif attribute_name == "cv":
            worker.cv = attribute_value
        elif attribute_name == "hashtags":
            worker.hashtags = attribute_value
        elif attribute_name == "location":
            worker.location = attribute_value
        db.session.commit()
    except:
        raise Error("UPDATE_INCORRECT")


def update_job(job, attribute_name, attribute_value):
    try:
        if attribute_name == "title":
            job.title = attribute_value
        elif attribute_name == "type":
            job.type = attribute_value
        elif attribute_name == "description":
            job.description = attribute_value
        elif attribute_name == "hashtags":
            job.hashtags = attribute_value
        elif attribute_name == "location":
            job.location = attribute_value
        elif attribute_name == "must_have":
            job.must_have = attribute_value
        elif attribute_name == "nice_have":
            job.nice_have = attribute_value
        elif attribute_name == "is_active":
            job.is_active = attribute_value
        db.session.commit()
    except:
        raise Error("UPDATE_INCORRECT")
