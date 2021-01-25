# # use test_auth for reference
# import pytest

# #from Cohooyo.utils.KI.ansatzKi import *
# #from Cohooyo.utils.KI.ml import *
# from Cohooyo.utils.KI.ai import *
# from Cohooyo.utils.KI.queries import *

# from Cohooyo.db.models import *
# #from Cohooyo.db.CRUD import update
# #from Cohooyo.db.CRUD.read import *

# # todo: tests without isolating db for every test
# """
# def test_ki():
#     index = 0
#     for otherusernumber in range (13, 16):
#         matchlist = []
#         evalscore = evaluate(usernumber, otherusernumber)
#         # add evaluationscore to list
#         matchlist.insert(index, evalscore)
#         index = index + 1

#     print(matchlist)
# """


# def test_ml(client, app):
#     with app.app_context():
#         testAi = Ai()
#         password = "Goodenough3344!"
#         user_type = "worker"
#         last_name = "Doe"
#         birthdate = "17.01.1990"
#         company_name = None

#         for i in range(5):
#             email = str(i) + 'mailmail@web.de'
#             first_name = "John " + str(i)
#             client.post(
#                 "/api/auth/register", json={"email": email, "password": password, "user_type": user_type, "first_name": first_name, "last_name": last_name, "birthdate": birthdate, "company_name": company_name}, content_type="application/json")
#         user_type = "worker"

#         for i in range(5):
#             email = str(i+50) + 'mailmail@web.de'
#             first_name = "John " + str(i+50)
#             company_name = "GMBH " + str(i)
#             client.post(
#                 "/api/auth/register", json={"email": email, "password": password, "user_type": user_type, "first_name": first_name, "last_name": last_name, "birthdate": birthdate, "company_name": company_name}, content_type="application/json")

#         testMap = testAi.clustering()
#         recommendations = testAi.get_recommendations()
#         print(recommendations)

#         assert recommendations is not None
#         worker_string = worker_query()
#         print(worker_string)
#         assert worker_string is not None

#         job_string = job_query()
#         print(worker_string)
#         assert worker_string is not None


# def worker_query():
#     try:
#         workers = Worker.query.all()
#         string_all_workers = ''
#         for worker in workers:
#             string_all_workers += '*' + worker.first_name + ', ' + worker.last_name + ' '
#         string_all_workers += '\n'
#         return string_all_workers
#     except Exception as e:
#         # e holds description of the error
#         error_text = "The error: " + str(e)
#         hed = 'Query is broken</h1>'
#         return hed + error_text


# def job_query():
#     try:
#         jobs = Job.query.all()
#         string_all_jobs = ''
#         for job in jobs:
#             string_all_jobs += '*' + job.first_name + ', ' + job.last_name + ' '
#         string_all_jobs += '\n'
#         return string_all_jobs
#     except Exception as e:
#         # e holds description of the error
#         error_text = "The error: " + str(e)
#         hed = 'Query is broken</h1>'
#         return hed + error_text


# def test_queries():
#     users = do_queries()
#     assert users is not None


# """
# def test_crud_read():
#     users = get_all_of_type(User)
# """
