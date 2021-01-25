from Cohooyo.db.models import *
from Cohooyo.utils.messages import *


def delete_job(job):
    try:
        for current_chat in job.chat:
            db.session.delete(current_chat)
        for current_rec in job.recommendation:
            db.session.delete(current_rec)
        db.session.delete(job)
        db.session.commit()
    except:
        raise Error("DELETE_INCORRECT")
