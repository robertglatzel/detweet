#!/usr/bin/python3
"""
This twitter bot checks your posts to see if you've tweeted anything
that might be considered questionable and lead to complications further in
your career.
"""
from flask import request
from os.path import abspath
import re

def get_all_tweets(twitter_req_obj, request):
    '''
    Grabs 3200 the tweets from the twitter api in their full text form.
    '''
    global_tweet_list = []
    last_tweet_id = None
    for i in range(16):
        if (last_tweet_id) is None:
            payload = {
                'count': 200,
                'include_rts': 1,
                'tweet_mode':'extended'
            }
        else:
            payload = {
                'count': 200,
                'include_rts': 1,
                'max_id': last_tweet_id,
                'tweet_mode':'extended'
            }
        tweet_list = twitter_req_obj.get('statuses/user_timeline.json', params=payload).json()
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
            tweet_text_lower = re.split(r'[\s,\.]+', tweet['full_text'].lower())
            for word in bad_words:
                if word in tweet_text_lower:
                    new_txt = re.sub(word, '<strong>{}</strong>'.format(word), tweet['full_text'], flags=re.IGNORECASE)
                    tweet_dict = {tweet.get('id'): '"{}"'.format(new_txt)}
                    bad_tweet_list.append(tweet_dict)
    except Exception as e:
        print(e)

    return bad_tweet_list


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
