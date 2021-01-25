from Cohooyo.utils.messages import *
from Cohooyo.db.CRUD import read


def test_get_recs_worker(client, login_worker):
    # login
    head = login_worker
    # get_profile
    response = client.post(
        "/api/matching/get_user_recs", json={}, content_type="application/json", headers=head)
    assert "jobs" in response.json


def test_get_recs_employer(client, login_employer):
    # login
    head = login_employer
    # get_profile
    response = client.post(
        "/api/matching/get_user_recs", json={}, content_type="application/json", headers=head)
    assert "jobs" in response.json
