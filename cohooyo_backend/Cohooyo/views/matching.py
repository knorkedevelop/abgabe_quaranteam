from logging import error
from flask import Blueprint, request
from flask import g
from Cohooyo.db.CRUD import read, update, create
from Cohooyo.db.models import *
from Cohooyo.views import auth
from Cohooyo.utils.messages import *
from Cohooyo.utils.validation import validate_request_attr
bp = Blueprint('matching', __name__, url_prefix='/api/matching')

# gives Frontend next five recs, has to be called while frontend still has some left
# should tell apart employers and workers


@auth.login_required
@bp.route('/get_user_recs', methods=['POST'])
def get_user_recs():
    try:
        user = g.user
        if user is None:
            raise Error("MUST_LOGGED_IN")
        if user.worker:
            allJobs =  Job.query.order_by(Job.id.asc())
            resultJobs = []
            for currentJob in allJobs:
                #if(currentJob.location == user.worker.location):
                resultJobs.append(currentJob.repr() | {
                                    "job_image": currentJob.employer.image})
                create.create_recommandation(user.worker.id, currentJob.id)
            return Success("READ_CORRECT").asdict() | {"jobs": resultJobs}
        else:
            employer = user.employer
            allWorkers = Worker.query.order_by(Worker.id.asc())
            result_jobs = []
            for currentJob in employer.job:
                result_worker = []
                for currentWorker in allWorkers:
                    #if currentWorker.location == currentJob.location:
                    create.create_recommandation(
                        currentWorker.id, currentJob.id)
                    result_worker.append(currentWorker.repr())
                result_jobs.append(
                    {"worker": result_worker, "job": currentJob.repr()})
            return Success("READ_CORRECT").asdict() | {"jobs": result_jobs}
    except Error as myError:
        return myError.asdict()


# here? Something to request new recs from ml after requesting recs x times
# @auth.login_required
# @bp.route('/update_recs', methods=['POST'])
# def update_recs():

    # these into one?


@auth.login_required
@bp.route('/like', methods=['POST'])
def like():
    try:
        user = g.user
        if user.worker:
            current_job = validate_request_attr(
                request, ["current_job"])["current_job"]
            for currentRec in user.worker.recommendation:
                if currentRec.job_id == current_job.id:
                    currentRec.worker_match = 1
                    if currentRec.job_match == 1:
                        create.new_chat(user.worker.id, current_job.id)
            return Success("UPDATE_CORRECT").asdict()
        else:
            val_attr = validate_request_attr(
                request, ["current_worker", "current_job"])
            current_job = val_attr["current_job"]
            current_worker = val_attr["current_worker"]
            for currentRec in current_job.recommendation:
                if currentRec.worker_id == current_worker.id:
                    currentRec.job_match = 1
                    if currentRec.worker_match == 1:
                        create.new_chat(user.worker.id, current_job.id)
            return Success("UPDATE_CORRECT").asdict()
    except Error as myError:
        return myError


@auth.login_required
@bp.route('/dislike', methods=['POST'])
def dislike():
    try:
        user = g.user
        if user.worker:
            current_job = validate_request_attr(
                request, ["current_job"])["current_job"]
            for currentRec in user.worker.recommendation:
                if currentRec.job_id == current_job.id:
                    currentRec.worker_match = -1
            return Success("UPDATE_CORRECT").asdict()
        else:
            val_attr = validate_request_attr(
                request, ["current_worker", "current_job"])
            current_job = val_attr["current_job"]
            current_worker = val_attr["current_worker"]
            for currentRec in current_job.recommendation:
                if currentRec.worker_id == current_worker.id:
                    currentRec.job_match = -1
            return Success("UPDATE_CORRECT").asdict()
    except Error as myError:
        return myError
