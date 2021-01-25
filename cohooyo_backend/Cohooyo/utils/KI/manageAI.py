import ai

import threading
import time

current_cluster = ai.clustering()

#all recommendations
def get_recommendations(user):
    recs = ai.get_recommendations_for(user)
    recs = filter_recommendations(recs, user)


def filter_recommendations(recs, user):

    for rec in recs:
        #filter criteria might have to be an explicit list for ease of access
        for filter_hashtag in user['filter_criteria']:
            if filter_hashtag in rec['hashtags']:
                recs.remove(rec)

    return recs

def sort_recommendations():
    return None

def continuous_clustering():
    while(True):
        th = threading.Thread(target=ai.clustering)
        #TODO: use something like a promise to get the clustering returned
        th.start()
        th.join

