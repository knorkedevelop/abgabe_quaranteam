from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String())
    password = db.Column(db.String())
    is_verified = db.Column(db.Boolean())
    email_verification_token = db.Column(db.String())
    password_reset_token = db.Column(db.String())
    employer = db.relationship(
        "Employer", uselist=False, back_populates="user")
    worker = db.relationship("Worker", uselist=False,
                             back_populates="user", lazy='joined')

    def __init__(self, email, password, email_verification_token):
        self.email = email
        self.password = password
        self.email_verification_token = email_verification_token
        self.is_verified = False

    def repr(self):
        return f"email:{self.email}:password{self.password}"


class Employer(db.Model):
    __tablename__ = 'employer'
    # primarykeys
    id = db.Column(db.Integer, primary_key=True)
    # attributes
    company_name = db.Column(db.String())
    description = db.Column(db.String())
    image = db.Column(db.String())
    logo = db.Column(db.String())
    master_certificate = db.Column(db.String())
    # foreignkeys
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship("User", uselist=False,
                           back_populates="employer", lazy='joined')
    job = db.relationship('Job', back_populates='employer', lazy=True)

    def __init__(self, company_name, user_id):
        self.company_name = company_name
        self.user_id = user_id
       # self.master_certificate = master_certificate

    def repr(self):
        return {"company_name": self.company_name, "description": self.description, "image": self.image, "logo": self.logo, "master_certificate": self.master_certificate}


class Worker(db.Model):
    __tablename__ = 'worker'
    # primarykeys
    id = db.Column(db.Integer, primary_key=True)
    # attributes
    first_name = db.Column(db.String())
    last_name = db.Column(db.String())
    location = db.Column(db.String())
    image = db.Column(db.String())
    cv = db.Column(db.String())
    hashtags = db.Column(db.String())
    birthdate = db.Column(db.Date())

    # foreignkeys
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship("User", uselist=False,
                           back_populates="worker", lazy='joined')
    chat = db.relationship("Chat", back_populates="worker")
    recommendation = db.relationship("Recommendation", back_populates="worker")

    def __init__(self, birth_day, birth_month, birth_year, user_id, first_name, last_name):
        self.birthdate = datetime.date(
            int(birth_year), int(birth_month), int(birth_day))
        self.user_id = user_id
        self.first_name = first_name
        self.last_name = last_name

    def repr(self):
        return {"id": self.id, "birth_day": self.birthdate.day, "birth_month": self.birthdate.month, "birth_year": self.birthdate.year, "first_name": self.first_name, "last_name": self.last_name, "location": self.location, "image": self.image, "cv": self.cv, "hashtags": self.hashtags, }


# class Address(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     street = db.Column(db.String())
#     number = db.Column(db.String())
#     postcode = db.Column(db.String())
#     city = db.Column(db.String())

#     def __init__(self, street, number, postcode, city):
#         self.street = street
#         self.number = number
#         self.postcode = postcode
#         self.city = city


class Job(db.Model):
    __tablename__ = 'job'
    # primarykeys
    id = db.Column(db.Integer, primary_key=True)
    # attributes
    title = db.Column(db.String())
    type = db.Column(db.String())
    description = db.Column(db.String())
    hashtags = db.Column(db.String())
    location = db.Column(db.String())
    must_have = db.Column(db.String())
    nice_have = db.Column(db.String())
    created_at = db.Column(db.String())
    is_active = db.Column(db.Boolean())
    # foreignkeys
    employer_id = db.Column(db.Integer, db.ForeignKey(
        'employer.id'), nullable=False)
    employer = db.relationship("Employer", back_populates="job")
    chat = db.relationship("Chat", back_populates="job")
    recommendation = db.relationship("Recommendation", back_populates="job")

    def __init__(self, title, type, description, location, must_have, nice_have, hashtags, created_at, employer_id):
        self.title = title
        self.type = type
        self.description = description
        self.location = location
        self.must_have = must_have
        self.nice_have = nice_have
        self.created_at = created_at
        self.is_active = True
        self.hashtags = hashtags
        self.employer_id = employer_id

    def repr(self):
        return {"job_id": self.id, "title": self.title, "type": self.type, "description": self.description, "location": self.location, "must_have": self.must_have, "nice_have": self.nice_have, "is_active": self.is_active, "hashtags": self.hashtags}


class Message(db.Model):
    __tablename__ = 'message'
    # primarykeys
    id = db.Column(db.Integer, primary_key=True)
    # attributes
    content = db.Column(db.String())
    send_at = db.Column(db.DateTime())
    from_worker = db.Column(db.Boolean())
    # foreignkeys
    chat_id = db.Column(db.Integer, db.ForeignKey('chat.id'))
    chat = db.relationship(
        "Chat", uselist=False, back_populates="message")

    def __init__(self, content, from_worker, chat_id):
        self.content = content
        self.send_at = datetime.datetime.now()
        self.from_worker = from_worker
        self.chat_id = chat_id


# Beziehungstabellen


class Recommendation(db.Model):
    __tablename__ = 'recommendation'
    # primarykeys/foreignkeys
    id = db.Column(db.Integer, primary_key=True)
    worker_id = db.Column(db.Integer, db.ForeignKey(
        'worker.id'))
    job_id = db.Column(db.Integer, db.ForeignKey('job.id'))
    # 0 = undefined; -1 = mismatch; 1= match
    worker_match = db.Column(db.Integer())
    job_match = db.Column(db.Integer())

    worker = db.relationship(
        "Worker", uselist=False, back_populates="recommendation")
    job = db.relationship(
        "Job", uselist=False, back_populates="recommendation")

    def __init__(self, worker_id, job_id):
        self.job_id = job_id
        self.worker_id = worker_id


class Chat(db.Model):
    __tablename__ = 'chat'
    # primarykeys/foreignkeys
    id = db.Column(db.Integer, primary_key=True)

    message = db.relationship("Message", back_populates="chat")
    worker = db.relationship("Worker",  uselist=False, back_populates="chat")
    job = db.relationship("Job", uselist=False, back_populates="chat")
    worker_id = db.Column(db.Integer, db.ForeignKey(
        'worker.id'))
    job_id = db.Column(db.Integer, db.ForeignKey('job.id'), nullable=False)

    def __init__(self, worker_id, job_id):
        self.worker_id = worker_id
        self.job_id = job_id

    def repr(self):
        return {"chat_id": self.id}
