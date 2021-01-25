
import pytest
from Cohooyo.db.models import *
from Cohooyo.utils.messages import *


@pytest.mark.parametrize(
    ("user_type", "email", "password", "first_name",
     "last_name", "birth_day", "birth_month", "birth_year", "company_name", "message"),
    (
        ("worker", "worker@test.de", "testTEST1", "fn", "ln", 17, 1, 1990, "ABC",  bytes(
            Error.codes["EMAIL_EXIST_ALREADY"], "UTF-8")),
        # ("worker", "worker1@test.de", "testTEST1", "", "ln", 17, 1, 1990, "ABC",  bytes(
        #     Error.codes["NO_FIRST_NAME"], "UTF-8")),
        # ("worker", "worker1@test.de", "testTEST1", "fn", "", 17, 1, 1990, "ABC",  bytes(
        #     Error.codes["NO_LAST_NAME"], "UTF-8")),
        # ("employer", "employer1@test.de", "testTEST1", "fn", "ln", 17, 1, 1990, "",  bytes(
        #     Error.codes["NO_COMPANY"], "UTF-8")),
        # ("employer", "employer1@test.de", "testTEST1", "fn", "ln", 17, 1, 1990, "ab",  bytes(
        #     Error.codes["COMPANY_TOO_SHORT"], "UTF-8")),
        ("worker", "worker1@test.de", "testTEST1", "fn", "ln", 17, 1, 1990, "abc", bytes(
            Success.codes["REGISTERED"], "UTF-8")),
        ("employer", "employer1@test.de", "testTEST1", "fn", "ln",  17, 1, 1990, "GMBH", bytes(
            Success.codes["REGISTERED"], "UTF-8")),
    ),
)
def test_register(client, user_type, email, password,  first_name, last_name, birth_day, birth_month, birth_year, company_name, message):
    response = client.post(
        "/api/auth/register", json={"email": email, "password": password, "user_type": user_type, "first_name": first_name, "last_name": last_name, "birth_day": birth_day, "birth_month": birth_month, "birth_year": birth_year, "company_name": company_name}, content_type="application/json")
    assert response.status_code == 200
    assert message in response.data


@ pytest.mark.parametrize(
    ("email", "password", "message"),
    (
        ("", "",  bytes(Error.codes["EMAIL_INCORRECT"], "UTF-8")),
        (None, "",  bytes(Error.codes["EMAIL_INCORRECT"], "UTF-8")),
        ("worker@test.de", "testTEST1",   bytes(
            Success.codes["LOGGED_IN"], "UTF-8")),
        ("worker@test.de", "",  bytes(
            Error.codes["PASSWORD_INCORRECT"], "UTF-8")),
    ),
)
def test_login(client,  email, password, message):
    response = client.post(
        "/api/auth/login", json={'email': email, "password": password}, content_type="application/json")
    assert message in response.data
    assert response.status_code == 200


def test_wrong_login(client):
    message = bytes(
        Error.codes["REQUEST_INCORRECT"], "UTF-8")
    response = client.post(
        "/api/auth/login", json={}, content_type="application/json")
    assert message in response.data
    assert response.status_code == 200


def test_wrong_register(client):
    message = bytes(
        Error.codes["REQUEST_INCORRECT"], "UTF-8")
    response = client.post(
        "/api/auth/register", json={}, content_type="application/json")
    assert message in response.data
    assert response.status_code == 200


def test_logout(client):
    message = bytes(Success.codes["LOGGED_OUT"], "UTF-8")
    response = client.post(
        "/api/auth/logout", json={}, content_type="application/json")
    assert message in response.data
    assert response.status_code == 200
