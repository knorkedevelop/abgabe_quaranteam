from Cohooyo.db.models import *
from Cohooyo.db.models import db


def test_delete_data(app):
    with app.app_context():
        users = User.query.all()
        for current_user in users:
            delete_one_data_ring(current_user)
        # delete_one_data_ring(User.query.filter(User.email.endswith('@mailbox.org')).first())
        db.session.commit()


def delete_one_data_ring(user):
    if user.employer:
        employer = user.employer
        jobs = employer.job
        for current_job in jobs:
            chats = current_job.chat
            for current_chat in chats:
                messages = current_chat.message
                for current_message in messages:
                    db.session.delete(current_message)
                db.session.delete(current_chat)
            rec = current_job.recommendation
            for current_rec in rec:
                db.session.delete(current_rec)
            db.session.delete(current_job)
        db.session.delete(employer)
        db.session.delete(user)
    else:
        worker = user.worker
        chats = worker.chat
        recs = worker.recommendation
        for current_chat in chats:
            messages = current_chat.message
            for current_message in messages:
                db.session.delete(current_message)
            db.session.delete(current_chat)
        for current_rec in recs:
            db.session.delete(current_rec)
        db.session.delete(worker)
        db.session.delete(user)
