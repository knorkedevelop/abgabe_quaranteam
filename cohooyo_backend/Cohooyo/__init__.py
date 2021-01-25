from flask import Flask
from flask_cors import CORS
from Cohooyo.views import auth, profile, chat, matching
from flask_migrate import Migrate
from Cohooyo.db.models import db
from flask_mail import Mail
from Cohooyo.utils import email


def create_app(test_config=None):
    server = Flask(__name__)
    CORS(server)
    server.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:5005@localhost:5001/cohooyo"
    server.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(server)
    migrate = Migrate(server, db)
    server.config.from_mapping(
        # a default secret that should be overridden by instance config
        SECRET_KEY="dev"
    )

    # create Email Outputserver
    server.config['MAIL_SERVER'] = 'smtp.gmail.com'
    server.config['MAIL_PORT'] = 465
    server.config['MAIL_USERNAME'] = 'quaranteamsep@gmail.com'
    server.config['MAIL_PASSWORD'] = 'XEHHQ8gEk8QAQxe'
    server.config['MAIL_USE_TLS'] = False
    server.config['MAIL_USE_SSL'] = True
    email.mail = Mail(server)

    if test_config is None:
        # load the instance config, if it exists, when not testing
        server.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        server.config.from_mapping(test_config)

    server.register_blueprint(auth.bp)
    server.register_blueprint(profile.bp)
    server.register_blueprint(chat.bp)
    server.register_blueprint(matching.bp)

    return server


server = create_app()


@server.route('/')
def tutorialspoint():
    return "Welcome to TutorialsPoint"
