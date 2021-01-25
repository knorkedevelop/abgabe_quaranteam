# TODO: db query from here
from Cohooyo.db.models import *
from sklearn.cluster import KMeans  # current
import time
import threading
from . import data
import seaborn as sns
from matplotlib import pyplot as plt
import spacy
#from sklearn.feature_extraction import stop_words
from sklearn.feature_extraction import text as text_feature_extraction
import string
from flask import g
import numpy as np
from functools import reduce


modelLang = "de_core_news_"
modelSize = "lg"
clusterSize = 6
# imports for nlp
modelString = modelLang + modelSize
nlp = spacy.load(modelString)

# imports for ml algorithm
# imports for visualization
# import needed userData and matchingData
# import for monitoring code and multithreading

# imports for db

# get data
# TODO use database instead
#workers = Worker.query.all()
users = data.users
# no corresponding data
evaluations = data.evaluations
#jobs = Job.query.all()
jobs = data.jobs

# globals, get rid of
global mapped_jobs
global mapped_clusters

# VISUALIZATION
# pca = principal component analysis, project data to a lower dimensional space


def pca(data):
    from sklearn.decomposition import PCA
    pca = PCA(n_components=2)
    pca.fit(data)
    return pca.transform(data)


def visualize():
    mapped_jobs = mapping()
    data = pca(mapped_jobs)

    plt.scatter(data[:, 0], data[:, 1])

    for index, xy in enumerate(zip(data[:, 0], data[:, 1])):
        plt.annotate(jobs[index]['_id'][0:7], xy=xy, textcoords='data')

    plt.scatter(data[:, 0], data[:, 1], c=mapped_clusters)

    # in AI root directory, shows unclustered but mapped data
    # plt.savefig("models\leastEffort\\visualization\prototype2\mappingLarge.png")

    # in AI root directory, shows clustered data
    saveString = 'tests\\visualization_ai' + \
        modelSize + str(clusterSize) + '.png'
    plt.savefig(saveString)


# IMPLEMENTATION
def mapping():
    # TODO: Find best simple mapping for internal model
    # Feature Selection + mapping with spacy vectors
    global mapped_jobs
    #nlp(job['hashtags'][1]).vector, nlp(job['must_have'][1]).vector,
    mapped_jobs = list(map(lambda job: np.concatenate((nlp(job['jobTitle']).vector, nlp(
        job['hashtags']).vector, [job['latitude'], job['longitude']])), jobs))
    return mapped_jobs


def clustering():
    mapping()
    # Clustering
    kmeans = KMeans(n_clusters=clusterSize)
    # fit kmeans object to data
    kmeans.fit(mapped_jobs)
    global mapped_clusters
    mapped_clusters = kmeans.fit_predict(mapped_jobs)
    return mapped_clusters

# TODO: Find out how to get exact distance between the mapped points


def closest_cluster(jobid):
    indices_only = list(map(lambda job: job["_id"], jobs))
    _ = indices_only.index(jobid)
    clusternr = mapped_clusters[_]
    return mapped_clusters[_]


def get_jobs_by_cluster(clusterid):
    jobs_indices = np.where(mapped_clusters == clusterid)[0]

    return_jobs = []
    for index, job in enumerate(jobs):
        if index in jobs_indices:
            return_jobs.append(job['_id'])

    return return_jobs


def get_recommendations():
    # the id of the user is saved as user, done for all users
    likes_per_users = list(map(lambda user: user[2], users))
    list_of_clusters_per_user = list(map(lambda likes_per_user: list(map(
        lambda user_like: closest_cluster(user_like), likes_per_user)), likes_per_users))
    recommended_jobs = list(map(lambda list_per_user: list(map(
        lambda cluster: get_jobs_by_cluster(cluster), list_per_user)), list_of_clusters_per_user))
    recommendations = list(map(lambda user_recommendations: reduce(
        lambda x, y: x+y, user_recommendations, []), recommended_jobs))
    print('\n', recommendations)
    return recommendations

# for now for works for exactly one user


def get_recommendations_for(id):
    # this can get the long job_id '5f3b770d809ba900124873ee' etc
    #indices_only=list(map(lambda job: job["_id"], jobs))

    relevant_users = [users[id]]
    likes_per_users = list(map(lambda user: user[2], relevant_users))

    list_of_clusters_per_user = list(map(lambda likes_per_user: list(map(
        lambda user_like: closest_cluster(user_like), likes_per_user)), likes_per_users))
    recommended_jobs = list(map(lambda list_per_user: list(map(
        lambda cluster: get_jobs_by_cluster(cluster), list_per_user)), list_of_clusters_per_user))
    recommendations = list(map(lambda user_recommendations: reduce(
        lambda x, y: x+y, user_recommendations, []), recommended_jobs))
    #print('\n', recommendations)
    return recommendations

# filter by hard-set criteria like max_distance


def filter_recommendations():
    return None


# Add Prediction Score
def find_prediction(userid, jobid):
    if jobid in recommendations[userid]:
        return 1
    else:
        return 0

# this won't work anymore


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


#start_time =  time.perf_counter()
# takes 1sec+
# clustering()
#print("clustering - time1: ", time.perf_counter() - start_time)
# takes practically no time
#data.clustering = mapped_clusters
#print("clustering - time2: ", time.perf_counter() - start_time)


#start_thread_time =  time.perf_counter()
#th = threading.Thread(target=clustering)
# th.start()


# visualize()


#start_time =  time.perf_counter()
#recommendations = get_recommendations()
#print("all recommendations - time: ", time.perf_counter() - start_time)
# print(recommendations[1])

#start_time =  time.perf_counter()
# so far slower than all recommendations
#print (get_recommendations_for(1))
#print("1 recommendation - time: ", time.perf_counter() - start_time)

# evaluate_alg()

# th.join()
#print("clustering - time1: ", time.perf_counter() - start_thread_time)


# How to use:
# clustering() and get_recommendations_for(int) are the only ones called externally
#clustering = clustering()
