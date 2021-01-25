import pytest
from Cohooyo.utils.messages import *
from Cohooyo.utils.validation import *


@pytest.mark.parametrize(
    ("email", "password", "message"),
    (
        ("", "pw", "NO_EMAIL"),
        ("em", "", "NO_PASSWORD")
    ),
)
def test_validate_user(email, password, message):
    try:
        validate_user(email, password)
    except Error as myError:
        assert myError.error_code is message


@pytest.mark.parametrize(
    ("password", "message"),
    (
        ("abc", "PASSWORD_TO_SHORT"),
        ("ab cdefgh", "PASSWORD_HAS_SPACE"),
        ("ABCDEFGH", "PASSWORD_NEED_LOWER_CASE"),
        ("abcdefgh", "PASSWORD_NEED_UPPER_CASE"),
        ("abcdEFGH", "PASSWORD_NEED_NUMBER"),
        ("abcdEFGH8", None),
    ),
)
def test_validate_password(password,  message):
    try:
        validate_password(password)
    except Error as myError:
        assert myError.error_code is message
