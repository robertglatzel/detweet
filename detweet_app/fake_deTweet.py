#!/usr/bin/python3
"""
This twitter bot checks your posts to see if you've tweeted anything
that might be considered questionable and lead to complications further in
your career.
"""
from flask import request
from os.path import abspath
import re
from faker import Faker
import json

fake = Faker()

def generate_fake_profile():
    '''
    Generates a fake user profile with a name, description, and image. 
    '''
    tweet_list = []

    user = {
        'username': fake.user_name(),
        'description': f"Avid fan of {fake.bs()}. Currently working at {fake.company()}. Let's connect!",
        'image': fake.image_url()
    }

    return user


def filter_tweets(tweets, user_filter=None):
    """
    Filter out tweets that you've tweeted and delete them. If user has passed in
    a custom filter, use that instead of the list of bad words as a filter.
    """

    bad_tweet_list = []

    #if user_filter[0] == '':
    f_path = ("bad_words_list_less")
    with open(f_path) as f:
        bad_words = [word.rstrip('\n') for word in f]
    '''
    else:
        user_bad_word = user_filter
        bad_words = [word.lower() for word in user_bad_word]
    '''
    try:
        for tweet in tweets:
            for word in bad_words:
                tweet_text_lower = re.findall(r"[\w']+", tweet['description'].lower())
                tweet_text_orig = re.findall(r"[\w']+", tweet['description'])
                if word in tweet_text_lower:
                    idx = tweet_text_lower.index(word)
                    strong_word = '<strong>{}</strong>'.format(tweet_text_orig[idx])
                    tweet_text_orig[idx] = strong_word
                    tweet_dict = {tweet['id']: '"{}"'.format(' '.join(tweet_text_orig))}
                    bad_tweet_list.append(tweet_dict)
    except Exception as e:
        print(e)

    return bad_tweet_list

def get_all_tweets():
    '''
    Generates 100 fake tweets, half of which contain bad words. 
    Returns a list of dicts representing the tweets with id as the key, text as value.
    '''
    global_tweet_list = []
    # user_filter = request.get_json()
        
    bad_words = ['Shit', 'Damn', 'Stupid', 'Bastard', 'Wanker', 'Prick']

    for tweet in range(100):
        fake_tweets = {}
        if tweet % 2 == 0:
            fake_tweets['id'] = fake.ean8()
            fake_tweets['description'] = f'{fake.sentence(nb_words=30)} {fake.word(ext_word_list=bad_words)}'
        else:
            fake_tweets['id'] = fake.ean8()
            fake_tweets['description'] = f'{fake.sentence(nb_words=30)}'
        global_tweet_list.append(fake_tweets)

    tweets = filter_tweets(global_tweet_list)
    return tweets

def delete_tweets(twitter_req_obj, request):
    """
    Deletes all flagged tweets
    """
    tweet_id_list = request.get_json()
    print(tweet_id_list)
    for tweet_id in tweet_id_list:
            try:
                tweet_id = int(tweet_id)
                endpoint_build = "statuses/destroy/{}.json".format(tweet_id)
                resp = twitter_req_obj.post(endpoint_build).json()
            except:
                print("Fail")
                return "fail"
    print("All flagged tweets have been deleted.")
    return "success"
