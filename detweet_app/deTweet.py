#!/usr/bin/python3
"""
This twitter bot checks your posts to see if you've tweeted anything
that might be considered questionable and lead to complications further in
your career.
"""

from detweet_app import app
from flask import request, session
from os.path import abspath
import urllib.parse
import json
import re
import time

def get_all_tweets(client, request):
    '''
    Grabs 3200 the tweets from the twitter api in their full text form.
    '''


    api_endpoint = 'https://api.twitter.com/1.1/statuses/user_timeline.json'

    params = {
        'count': 200,
        'include_rts': 1,
        'tweet_mode': 'extended'
    }

    qs = '?count=200&include_rts=1&tweet_mode=extended'

    global_tweet_list = []
    last_tweet_id = None
    for i in range(16):
        if (last_tweet_id) is None:
            pass
        else:
            #params['max_id'] = last_tweet_id
            qs += '&max_id={}'.format(last_tweet_id)
        resp, content = client.request(
            api_endpoint + qs,
            method="GET",
        )

        tweet_list = json.loads(content.decode('utf-8'))
        last_tweet_id = tweet_list[-1].get('id')
        global_tweet_list += tweet_list

    user_filter = request.get_json()
    tweets = filter_tweets(global_tweet_list, user_filter)
    return tweets


def filter_tweets(tweets, user_filter=None):
    """
    Filter out tweets that you've tweeted and delete them. If user has passed in
    a custom filter, use that instead of the list of bad words as a filter.
    """

    bad_tweet_list = []

    if user_filter[0] == '':
        f_path = abspath("bad_words_list_less")
        with open(f_path) as f:
            bad_words = [word.rstrip('\n') for word in f]
    else:
        user_bad_word = user_filter
        bad_words = [word.lower() for word in user_bad_word]

    try:
        for tweet in tweets:
            for word in bad_words:
                tweet_text_lower = re.findall(r"[\w']+", tweet['full_text'].lower())
                tweet_text_orig = re.findall(r"[\w']+", tweet['full_text'])
#                tweet_text_lower = tweet['full_text'].lower().split()
#                tweet_text_orig = tweet['full_text'].split()
                if word in tweet_text_lower:
                    idx = tweet_text_lower.index(word)
                    strong_word = '<strong>{}</strong>'.format(tweet_text_orig[idx])
                    tweet_text_orig[idx] = strong_word
                    tweet_dict = {tweet.get('id'): '"{}"'.format(' '.join(tweet_text_orig))}
                    bad_tweet_list.append(tweet_dict)
    except Exception as e:
        print(e)

    return bad_tweet_list


def delete_tweets(client, request):
    """
    Deletes all flagged tweets
    """
    tweet_id_list = request.get_json()
    print(tweet_id_list)
    not_deleted = []
    for tweet_id in tweet_id_list:
            try:
                tweet_id = int(tweet_id)
                endpoint = "https://api.twitter.com/1.1/statuses/destroy/{}.json".format(tweet_id)

                resp, content = client.request(
                    endpoint,
                    method='POST'
                )
                if resp.status != 200:
                    not_deleted.append(tweet_id)
            except:
                print("Fail")
                return "fail"
    print("All flagged tweets have been deleted.")
    return "success"
