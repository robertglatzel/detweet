#!/usr/bin/python3
"""
This twitter bot checks your posts to see if you've tweeted anything
that might be considered questionable and lead to complications further in
your career.
"""

import tweepy
import time
from models.AuthClass import AuthClass


"""Setup"""
login = AuthClass()
auth = tweepy.OAuthHandler(login.consumer_key, login.consumer_secret)
auth.set_access_token(login.access_token, login.access_secret)
api = tweepy.API(auth)
user = api.me()


def safety():
    """
    Filter out tweets that you've tweeted and delete them.
    """
    bad_tweet_list = []

    with open('bad_words_list') as f:
        bad_words = [word.rstrip('\n') for word in f]

    try:
        for tweet in tweepy.Cursor(api.user_timeline, tweet_mode="extended").items(3200):
            for word in bad_words:
                tweet_text_list = tweet.full_text.lower().split()
                if word in tweet_text_list:
                    strong_word = '<strong>{}</strong>'.format(word)
                    idx = tweet_text_list.index(word)
                    tweet_text_list[idx] = strong_word
                    tweet_dict = {tweet.id: '"{}"'.format(' '.join(tweet_text_list))}
                    bad_tweet_list.append(tweet_dict)
        return bad_tweet_list
    except:
        print("Try again later")
        return bad_tweet_list

if __name__ == "__main__":
    safety()
'''
    if len(bad_tweet_list) == 0:
        print("No problem here!")
        return

    while len(bad_tweet_list) > 0:
        print(len(bad_tweet_list))
        print_flagged(bad_tweet_list)

        delete_prompt = input("Delete all tweets?\nEnter (y/n): ")
        if delete_prompt == "y":
            delete_tweets(bad_tweet_list)
            return

        exclude = input("\nOkay, do you want to exclude a tweet from the list?\
        \nEnter (y/n): ")

        if exclude == "y":
            index = input("\nWhich tweet? Enter the index number of a tweet: ")
            print("Trying to remove tweet at index {}...".format(index))
            time.sleep(2)

            try:
                del bad_tweet_list[int(index)]
                print("Removed tweet")
            except:
                print("\n\n\t##### ERROR! #####")
                print("\tIndex does not exist, try again.")
                print("\t##################\n")
                time.sleep(4)

        else:
            print("Okay, exiting the program...")
            return

    if len(bad_tweet_list) == 0:
        print("\n\nNothing left in the queue, exiting the program...")

def print_flagged(arr):
    """
    Prints out all the flagged tweets
    """
    idx = 0
    print("\n============= List of flagged tweets =============")
    for tweet in arr:
        for val in tweet.values():
            print("\n########## FLAGGED TWEET ##########")
            print("Index: {}\nTweet Content: {}".format(idx,val))
            idx += 1
            print("###################################\n")

def delete_tweets(arr):
    """
    Deletes all flagged tweets
    """
    for tweet in arr:
        for tweet_id in tweet.keys():
            try:
                api.destroy_status(tweet_id)
            except:
                print("Fail")
                return
    print("All flagged tweets have been deleted.")
'''
