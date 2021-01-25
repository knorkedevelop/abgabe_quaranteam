from logging import error
from flask import Blueprint, request
from Cohooyo.db.CRUD import update, create, delete
from flask import g
from Cohooyo.db.CRUD import read
from Cohooyo.views import auth
from Cohooyo.utils.messages import *
from Cohooyo.utils.validation import validate_request_attr
import time
bp = Blueprint('profile', __name__, url_prefix='/api/profile')


@auth.login_required
@bp.route('/get_profile', methods=['POST'])
def get_profile():
    try:
        # hole User + /Employer, Worker von der Session und gib diesen als Json zurück
        user = g.user
        if user is None:
            raise Error("MUST_LOGGED_IN")
        if user.worker:
            representation = user.worker.repr()
        else:
            representation = user.employer.repr()
        print(representation)
        return Success("PROFILE_UPDATED").asdict() | representation
    except Error as myError:
        return myError.asdict()


@auth.login_required
@bp.route('/update_profile', methods=['POST'])
def update_profile():
    try:
        user = g.user
        if user is None:
            raise Error("MUST_LOGGED_IN")
        if user.employer:
            validated_attr = validate_request_attr(
                request, ["company_name", "description", "logo", "image", "master_certificate"])
            employer = user.employer
            update.update_employer(
                employer, "company_name", validated_attr['company_name'])
            update.update_employer(
                employer, "description", validated_attr['description'])
            update.update_employer(
                employer, "logo", validated_attr['logo'])
            update.update_employer(
                employer, "image", validated_attr['image'])
            update.update_employer(
                employer, "master_certificate", validated_attr['master_certificate'])
        else:
            validated_attr = validate_request_attr(
                request, ["first_name", "last_name", "birth_day", "birth_month", "birth_year", "location", "image", "cv", "hashtags"])
            worker = user.worker
            update.update_worker(
                worker, "first_name", validated_attr['first_name'])
            update.update_worker(
                worker, "last_name", validated_attr['last_name'])
            print(validated_attr['birth_day'])
            update.update_worker(
                worker, "birth_day", validated_attr['birth_day'])
            update.update_worker(
                worker, "birth_month", validated_attr['birth_month'])
            update.update_worker(
                worker, "birth_year", validated_attr['birth_year'])
            update.update_worker(
                worker, "location", validated_attr['location'])
            update.update_worker(
                worker, "image", validated_attr['image'])
            update.update_worker(
                worker, "cv", validated_attr['cv'])
            update.update_worker(
                worker, "hashtags", validated_attr['hashtags'])
        return Success("PROFILE_UPDATED").asdict()
    except Error as myError:
        return myError.asdict()


@ auth.login_required
@ bp.route('/get_jobs', methods=['POST'])
def get_jobs():
    try:
        employer = g.user.employer
        if not employer:
            raise Error("NO_JOBS")
        jobs = []
        for current_job in employer.job:
            jobs.append(current_job.repr())

        return Success("READ_CORRECT").asdict() | {"jobs": jobs}
    except Error as myError:
        return myError


@ auth.login_required
@ bp.route('/update_job', methods=['POST'])
def update_job():
    try:
        validated_attr = validate_request_attr(request, [
            "title", "type", "description", "hashtags", "location", "must_have", "nice_have", "job_id"])
        current_job = read.get_job_by("id", validated_attr['job_id'])
        user = g.user
        if not user.employer:
            raise Error("NO_JOBS")
        update.update_job(
            current_job, "title", validated_attr['title'])
        update.update_job(
            current_job, "type", validated_attr['type'])
        update.update_job(
            current_job, "description", validated_attr['description'])
        update.update_job(
            current_job, "hashtags", validated_attr['hashtags'])
        update.update_job(
            current_job, "location", validated_attr['location'])
        update.update_job(
            current_job, "must_have", validated_attr['must_have'])
        update.update_job(
            current_job, "nice_have", validated_attr['nice_have'])
        return Success("PROFILE_UPDATED").asdict()
    except Error as myError:
        return myError.asdict()


@ auth.login_required
@ bp.route('/create_job', methods=['POST'])
def create_job():
    try:
        validated_attr = validate_request_attr(
            request, ["title", "type", "location", "description", "must_have", "hashtags", "nice_have"])
        title = validated_attr["title"]
        type = validated_attr["type"]
        description = validated_attr["description"]
        location = validated_attr["location"]
        must_have = validated_attr["must_have"]
        nice_have = validated_attr["nice_have"]
        hashtags = validated_attr["hashtags"]
        employer = g.user.employer
        new_job = create.create_job(
            title, type, description, location, must_have, nice_have, hashtags, time.ctime(), employer.id)

        return Success("JOB_CREATED").asdict() | {"job_id": new_job.id}
    except Error as myError:
        return myError.asdict()


@ auth.login_required
@ bp.route('/toggle_activate_job', methods=['POST'])
def toggle_activate_job():
    try:
        validated_attr = validate_request_attr(request, ["job_id"])
        job = read.get_job_by("id", validated_attr["job_id"])
        if job.is_active == False:
            update.update_job(job, "is_active", True)
        else:
            update.update_job(job, "is_active", False)
        return Success("PROFILE_UPDATED").asdict()
    except Error as myError:
        return myError.asdict()


@ auth.login_required
@ bp.route('delete_job', methods=['POST'])
def delete_job():
    try:
        validated_attr = validate_request_attr(request, ["job_id"])
        current_job = read.get_job_by("id", validated_attr['job_id'])
        delete.delete_job(current_job)
        return Success("JOB_DELETED").asdict()

    except Error as myError:
        return myError.asdict()
