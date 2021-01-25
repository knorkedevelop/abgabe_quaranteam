from Cohooyo.utils.messages import *
from Cohooyo.db.CRUD import read


def test_get_profile_worker(client, login_worker):
    # login
    head = login_worker
    # get_profile
    response = client.post(
        "/api/profile/get_profile", json={}, content_type="application/json", headers=head)
    assert response.json["first_name"] == "Peter"


def test_get_profile_employer(client,login_employer):
    # login
    head = login_employer
    # get_profile
    response = client.post(
        "/api/profile/get_profile", json={}, content_type="application/json", headers=head)
    assert response.json["company_name"] == "GMBH"


def test_update_profile_employer(client,login_employer):
    # login
    head = login_employer
    # set profile
    response = client.post(
        "/api/profile/update_profile", json={"company_name": "KMBH", "description": "testDescription", "logo": "path/to/logo", "image": "path/to/image", "master_certificate": "myMaster_certificate"}, content_type="application/json", headers=head)
    assert response.json["message"] == Success("PROFILE_UPDATED").message


def test_update_profile_worker(client,login_worker):
    # login
    head = login_worker
    # set profile
    response = client.post(
        "/api/profile/update_profile", json={"first_name": "myFirstName", "last_name": "myLastName", "birth_day": 1, "birth_month": 2, "birth_year": 2000, "image": "path/to/image", "cv": "myCV", "hashtags": "myHastags", "location": "myLocation"}, content_type="application/json", headers=head)
    assert response.json["message"] == Success("PROFILE_UPDATED").message


def test_get_set_jobs(client, app,login_employer):
    # login
    head = login_employer
    # get jobs
    response = client.post(
        "/api/profile/get_jobs", json={}, content_type="application/json", headers=head)
    assert response.json["jobs"][0]["title"] == "myTitle"
    job_id = response.json["jobs"][0]["job_id"]
    # deactivate job
    response = client.post(
        "/api/profile/activate_job", json={}, content_type="application/json", headers=head)
    # activate job

    # set_job
    response = client.post(
        "/api/profile/update_job", json={"job_id": job_id, "title": "myTitle", "type": "myType", "description": "myDescription", "hashtags": "myHashtags", "must_have": "myMust_have", "nice_have": "myNice_have", "location": "myLocation"}, content_type="application/json", headers=head)
    assert response.json["message"] == Success("PROFILE_UPDATED").message
    # delete_job
    response = client.post(
        "/api/profile/delete_job", json={"job_id": job_id}, content_type="application/json", headers=head)
    with app.app_context():
        assert read.get_job_by("id", job_id) == None
