
from Cohooyo.views.chat import *
from Cohooyo.db.models import *


def test_chat_worker(client, login_worker):
    # login
    head = login_worker
    # get all chats from worker
    response = client.post("/api/chat/get_chats",
                           json={}, content_type="application/json", headers=head)
    assert response.json["chats"][0]["title"] == "myTitle"
    current_chat_id = response.json["chats"][0]["chat_id"]
    # get all messages from one chat
    response = client.post(
        "/api/chat/get_messages", json={"chat_id": current_chat_id}, content_type="application/json", headers=head)
    assert response.json["messages"][0] == {
        "message": "hay", "from_worker": True}
    # send message
    response = client.post(
        "/api/chat/send_message", json={"chat_id": current_chat_id, "content": "hay"}, content_type="application/json", headers=head)
    assert Success("MESSAGE_SENT").asdict() == response.json


def test_chat_employer(client, login_employer):
    # login
    head = login_employer
    # get all jobs for one employer
    response = client.post(
        "/api/profile/get_jobs", json={}, content_type="application/json", headers=head)
    assert response.json["jobs"][0]["title"] == "myTitle"
    current_job_id = response.json["jobs"][0]["job_id"]
    # get all chats for one job
    response = client.post(
        "/api/chat/get_chats", json={"job_id": current_job_id}, content_type="application/json", headers=head)
    assert response.json["chats"][0]["first_name"] == "Peter"
    current_chat_id = response.json["chats"][0]["chat_id"]
    # get all messages for one chat
    response = client.post(
        "/api/chat/get_messages", json={"chat_id": current_chat_id}, content_type="application/json", headers=head)
    print(response.data)
    assert response.json["messages"][0] == {
        "message": "hay", "from_worker": True}

    # send message
    response = client.post(
        "/api/chat/send_message", json={"chat_id": current_chat_id, "content": "hello"}, content_type="application/json", headers=head)
    assert Success("MESSAGE_SENT").asdict() == response.json
