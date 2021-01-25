from logging import error
from flask import Blueprint, request
from flask import g
from Cohooyo.utils.validation import validate_request_attr
from Cohooyo.db.CRUD import read, update, create
from Cohooyo.views import auth
from Cohooyo.utils.messages import Error, Success
bp = Blueprint('chat', __name__, url_prefix='/api/chat')


@auth.login_required
@bp.route('/get_chats', methods=['POST'])
def get_chats():
    try:
        chats = []
        # for worker get chats
        if g.user.worker:
            current_user = g.user
            for current_chat in current_user.worker.chat:
                chats.append({"chat_id": current_chat.id,
                              "title": current_chat.job.title})
        else:
            # for jobs get chats
            validated_attr = validate_request_attr(request, ["job_id"])
            current_job = read.get_job_by("id", validated_attr['job_id'])
            for current_chat in current_job.chat:
                chats.append({"chat_id": current_chat.id,
                              "first_name": current_chat.worker.first_name})
        return Success("READ_CORRECT").asdict() | {"chats": chats}
    except Error as myError:
        return myError.asdict()


@auth.login_required
@bp.route('/get_messages', methods=['POST'])
def get_messages():
    try:
        validated_attr = validate_request_attr(request, ["chat_id"])
        messages = []
        current_chat = read.get_chat_by("id", validated_attr["chat_id"])
        for current_message in current_chat.message:
            messages.append({"message": current_message.content,
                             "from_worker": current_message.from_worker})
        return Success("READ_CORRECT").asdict() | {"messages": messages}
    except Error as myError:
        return myError.asdict()


@ auth.login_required
@ bp.route('/send_message', methods=['POST'])
def send_message():
    try:
        validated_attr = validate_request_attr(request, ["content", "chat_id"])
        current_user = g.user
        content = validated_attr['content']
        chat_id = validated_attr['chat_id']
        current_chat = read.get_chat_by("id", chat_id)
        if current_user.worker:
            create.create_message(content, True, current_chat.id)
        else:
            create.create_message(content, False, current_chat.id)
        return Success("MESSAGE_SENT").asdict()
    except Error as myError:
        return myError.asdict()
