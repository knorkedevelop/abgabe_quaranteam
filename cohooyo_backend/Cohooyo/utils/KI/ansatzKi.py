import spacy
from spacy.matcher import Matcher
import requests
import json
# import cohooyo_backen.cohooyo.db.CRUD import read
usernumber = 0
otherusernumber = 0

# TODO check if this works well, add hashtags and likes made so far

# request API
r = requests.get('https://api.cohooyo.com/jobs')
jobs = json.loads(r.text)
print(len(jobs))


# load spacy
nlp = spacy.load("de_core_news_lg")
matcher = Matcher(nlp.vocab)

# In this example we are using data from the api, reached by their position.
# When the database is filled by data we are going to use following statement to access the users:
# read.get_user_byId('enterId')

# the evaluation-algorithm. Returns a compability score


def evaluate(usernumber, otherusernumber):

    evalscore = 0
    # print(jobs[usernumber]['jobTitle'])

    user_title = nlp(jobs[usernumber]['jobTitle'])
    employer_title = nlp(jobs[otherusernumber]['jobTitle'])

    #  save evaluationscore
    evalscore += (user_title.similarity(employer_title))

    # calculate latitude and longitude difference
    latitude_difference = abs(
        jobs[usernumber]['latitude'] - jobs[usernumber]['latitude'])
    longitude_difference = abs(
        jobs[otherusernumber]['longitude'] - jobs[otherusernumber]['longitude'])

    # calculate the locational difference
    locational_difference = (latitude_difference + longitude_difference)

    # add to the evaluation score
    evalscore = evalscore - locational_difference

    print(jobs[usernumber]['jobTitle'] + " und " +
          jobs[otherusernumber]['jobTitle'] + " beträgt:")
    print(evalscore)
    return evalscore


# iterate through users
index = 0
for otherusernumber in range(13, 16):
    matchlist = []
    evalscore = evaluate(usernumber, otherusernumber)
    # add evaluationscore to list
    matchlist.insert(index, evalscore)
    index = index + 1

print(matchlist)

# for the inclusion of the description. Filters by nouns and verbs, since this is the only relevant data

"""
user =  nlp(jobs[15]['hashtags'])

employer = nlp(jobs[16]['hashtags'])

# Create Pattern
pattern = [{"POS": "VERB"}]
pattern2 = [{"POS": "NOUN"}]

# TODO: Locations aren't recognized
pattern3 = [{"POS": "LOC"}]


# Use Pattern on both entities
matcher.add("PATTERN1", None, pattern, pattern2, pattern3)
matches_user = matcher(user)
matches_employer= matcher(employer)

# filter the pattern - user
for match_id, start, end in matches_user:
  new_user = new_user + " " +  user[start:end].text

print("User Beschreibung:")
print(new_user)

print("")
print("")
# filter the pattern - employer
for match_id, start, end in matches_employer:
  new_employer = new_employer + " " +  employer[start:end].text

print("Employer Beschreibung:")
print(new_employer)

# Create nlp object out of filtered patterns
new_user = nlp(new_user)
new_employer = nlp(new_employer)

# Calculate similarities between both entities
print(new_user.similarity(new_employer))


"""


# TODO: add hashtags to the evaluation score. Which atm isn't
#       possible, bcs the API doesnt't provides proper hashtags, but descriptional texts
