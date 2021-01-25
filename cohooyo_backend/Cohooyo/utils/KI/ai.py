import spacy
from sklearn.cluster import KMeans  # current
import time
import threading
from . import data
import string
from flask import g
import numpy as np
from functools import reduce
from Cohooyo.db.models import *


class Ai:

    modelLang = "de_core_news_"
    modelSize = "lg"
    clusterSize = 6
    # imports for self.nlp
    modelString = modelLang + modelSize
    nlp = spacy.load(modelString)

    # imports for db

    # get data
    # TODO use database instead
    workers = []
    # no corresponding data
    # evaluations = data.evaluations
    jobs = []
    users = []

    mapped_clusters = []

    def __init__(self):
        self.do_queries()

    def do_queries(self):
        self.workers = Worker.query.all()
        self.jobs = Job.query.all()
        self.users = self.workers + self.jobs
        return self.users

    # IMPLEMENTATION

    def mapping(self):
        # TODO: Find best simple mapping for internal model
        # Feature Selection + mapping with spacy vectors
        # self.nlp(job['hashtags'][1]).vector, self.nlp(job['must_have'][1]).vector,
        mapped_users = list(map(lambda job: np.concatenate((self.nlp(job.title).vector, self.nlp(
            job.hashtags).vector, self.nlp(job.location).vector)), self.jobs))
        return mapped_users

    def clustering(self):
        mapped_users = self.mapping()
        # Clustering
        kmeans = KMeans(n_clusters=self.clusterSize)
        # fit kmeans object to data
        kmeans.fit(mapped_users)
        self.mapped_clusters = kmeans.fit_predict(mapped_users)
        return self.mapped_clusters

    # TODO: Find out how to get exact distance between the mapped points
    # https://www.tetrel.ai/de/blog/geodata-python

    def closest_cluster(self, jobid):
        # TODO
        indices_only = list(map(lambda job: job.id, self.jobs))
        _ = indices_only.index(jobid)
        clusternr = self.mapped_clusters[_]
        return self.mapped_clusters[_]


# returns id only, ok?

    def get_jobs_by_cluster(self, clusterid):
        jobs_indices = np.where(self.mapped_clusters == clusterid)[0]

        return_jobs = []
        for index, job in enumerate(self.jobs):
            if index in jobs_indices:
                return_jobs.append(job.id)

        return return_jobs

    """
    def get_recommendations():
        # the id of the user is saved as user, done for all users
        # TODO access user likes
        likes_per_users = list(map(lambda user: user.recommendation, users))
        list_of_clusters_per_user = list(map(lambda likes_per_user: list(map(
            lambda user_like: closest_cluster(user_like), likes_per_user)), likes_per_users))
        recommended_jobs = list(map(lambda list_per_user: list(map(
            lambda cluster: get_jobs_by_cluster(cluster), list_per_user)), list_of_clusters_per_user))
        recommendations = list(map(lambda user_recommendations: reduce(
            lambda x, y: x+y, user_recommendations, []), recommended_jobs))
        print('\n', recommendations)
        return recommendations
    """
    # for now this works for exactly one user

    def get_recommendations_for(self, id, type):
        # this can get the long job_id '5f3b770d809ba900124873ee' etc
        # indices_only=list(map(lambda job: job["_id"], jobs))

        # alternative: = User.query.filter(User.id.ilike('%some_phrase%'))
        relevant_users = [self.users[id]]
        likes_per_users = list(map(lambda user: user[2], relevant_users))

        list_of_clusters_per_user = list(map(lambda likes_per_user: list(map(
            lambda user_like: self.closest_cluster(user_like), likes_per_user)), likes_per_users))
        recommended_jobs = list(map(lambda list_per_user: list(map(
            lambda cluster: self.get_jobs_by_cluster(cluster), list_per_user)), list_of_clusters_per_user))
        recommendations = list(map(lambda user_recommendations: reduce(
            lambda x, y: x+y, user_recommendations, []), recommended_jobs))

        if (type == self.worker):
            # TODO: Filter so that there's only jobs with hard-set criteria met
            return recommendations
        else:
            # TODO: Filter so that there's only workers with hard-set criteria met
            return recommendations

    # filter by hard-set criteria like max_distance, isworker, isjob

    def filter_recommendations():
        return None

    # Add Prediction Score
    """
    def find_prediction(userid, jobid):
        if jobid in recommendations[userid]:
            return 1
        else:
            return 0
    """

    # this won't work anymore
    """
    def evaluate_alg():
        # Set threshold for boolean decision
        thresholded_evaluations = list(map(lambda evaluation: [
                                    evaluation[0], evaluation[1], 1 if evaluation[2] > 2 else 0], evaluations))

        results_for_confusion_matrix = []

        y_true = []
        y_pred = []
        for evaluation in thresholded_evaluations:
            # evaluation[1] is the userid
            prediction = find_prediction(evaluation[0], evaluation[1])
            evaluation.append(prediction)
            results_for_confusion_matrix.append(evaluation)
            y_true.append(evaluation[2])
            y_pred.append(prediction)

        from sklearn.metrics import confusion_matrix

        _ = confusion_matrix(y_true, y_pred)
        sns.heatmap(_/np.sum(_), annot=True, fmt='.2%', cmap='Blues')

        saveString = 'tests\\visualization_ai' + \
            modelSize + str(clusterSize) + '.png'
        plt.savefig(saveString)
    """

    # start_time =  time.perf_counter()
    # takes 1sec+
    # clustering()
    # print("clustering - time1: ", time.perf_counter() - start_time)
    # takes practically no time
    # data.clustering = mapped_clusters
    # print("clustering - time2: ", time.perf_counter() - start_time)

    # start_thread_time =  time.perf_counter()
    # th = threading.Thread(target=clustering)
    # th.start()

    # visualize()

    # start_time =  time.perf_counter()
    # recommendations = get_recommendations()
    # print("all recommendations - time: ", time.perf_counter() - start_time)
    # print(recommendations[1])

    # start_time =  time.perf_counter()
    # so far slower than all recommendations
    # print (get_recommendations_for(1))
    # print("1 recommendation - time: ", time.perf_counter() - start_time)

    # evaluate_alg()

    # th.join()
    # print("clustering - time1: ", time.perf_counter() - start_thread_time)

    # How to use:
    # clustering() and get_recommendations_for(int) are the only ones called externally
    # clustering = clustering()
