from ..models import *
from ...utils.messages import *


def create_user(email, password, email_verification_token):
    try:
        new_user = User(email, password, email_verification_token)
        db.session.add(new_user)
        db.session.commit()
    except:
        raise Error("CREATE_INCORRECT")
    else:
        return new_user


def create_employer(company_name, user_id):
    try:
        new_employer = Employer(company_name, user_id)
        db.session.add(new_employer)
        db.session.commit()
    except:
        raise Error("CREATE_INCORRECT")
    else:
        return new_employer


def create_worker(birth_day, birth_month, birth_year, user_id, first_name, last_name):
    try:
        new_worker = Worker(birth_day, birth_month,
                            birth_year, user_id, first_name, last_name)
        db.session.add(new_worker)
        db.session.commit()
    except:
        raise Error("CREATE_INCORRECT")
    else:
        return new_worker


def create_job(title="", type="", description="", location="", must_have="", nice_have="", hashtags="", created_at="", employer_id=1):
    try:
        new_job = Job(title, type, description, location, must_have,
                      nice_have, hashtags, created_at, employer_id)
        db.session.add(new_job)
        db.session.commit()
    except:
        raise Error("CREATE_INCORRECT")
    else:
        return new_job


def create_message(content, from_worker, chat_id):
    try:
        new_message = Message(content, from_worker, chat_id)
        db.session.add(new_message)
        db.session.commit()
    except:
        raise Error("CREATE_INCORRECT")
    else:
        return new_message


def create_chat(worker_id, job_id):
    try:
        new_chat = Chat(worker_id, job_id)
        db.session.add(new_chat)
        db.session.commit()
    except:
        raise Error("CREATE_INCORRECT")
    else:
        return new_chat


def create_recommandation(worker_id, job_id):
    try:
        new_rec = Recommendation(worker_id, job_id)
        db.session.add(new_rec)
        db.session.commit()
    except:
        raise Error("CREATE_INCORRECT")
    else:
        return new_rec
