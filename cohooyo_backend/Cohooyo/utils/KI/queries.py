from flask import Flask
from flask_cors import CORS
from Cohooyo.db.models import *
from flask_migrate import Migrate
from Cohooyo.db.models import db
from flask import current_app




def do_queries(app):
    with app.app_context():
        workers = Worker.query.all()
        jobs = Job.query.all()
        users = workers + jobs
        return users