import os
import tempfile
import pytest
from Cohooyo import create_app
from Cohooyo.db.models import *
from Cohooyo.db.CRUD import read, create


@pytest.fixture
def app():
    """Create and configure a new app instance for each test."""
    # create a temporary file to isolate the database for each test
    db_fd, db_path = tempfile.mkstemp()
    # create the app with common test config
    test_server = create_app({
        'TESTING': True
    })
    # close and remove the temporary database
    os.close(db_fd)
    os.unlink(db_path)
    #create_test_db(test_server.test_client(), test_server)
    return test_server


@ pytest.fixture
def client(app):
    """A test client for the app."""
    return app.test_client()


@ pytest.fixture
def runner(app):
    """A test runner for the app's Click commands."""
    return app.test_cli_runner()

@ pytest.fixture
def login_worker(client):
    response = client.post(
        "/api/auth/login", json={"email": "worker@test.de", "password": "testTEST1"}, content_type="application/json")
    auth_token = response.json["auth_token"]
    return {"Authorization": "Bearer "+auth_token}

@ pytest.fixture
def login_employer(client):
    response = client.post(
        "/api/auth/login", json={"email": "employer@test.de", "password": "testTEST1"}, content_type="application/json")
    auth_token = response.json["auth_token"]
    return {"Authorization": "Bearer "+auth_token}


# def create_test_db(client, app):
#     with app.app_context():
#         client.post(
#             "/api/auth/register", json={"email": "employer@test.de", "password": "testTEST1", "user_type": "employer", "company_name": "GMBH"}, content_type="application/json")
#         client.post(
#             "/api/auth/register", json={"email": "worker@test.de", "password": "testTEST1", "user_type": "worker", "first_name": "Peter", "last_name": "Pan",  "birth_day": 1, "birth_month": 1, "birth_year": 1900, }, content_type="application/json")
#         employer = read.get_user_by("email", "employer@test.de").employer
#         worker = read.get_user_by("email", "worker@test.de").worker
#         job = create.create_job("myTitle", "myType", "myDescription",
#                                 "myLocation", "myMust_have", "myNice_have", "#myHashtags", "17.02", employer.id)
#         chat = create.create_chat(worker.id, job.id)
#         create.create_message("hay", True, chat.id)
#         create.create_message("hello too", False, chat.id)
