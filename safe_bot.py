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


def filter_tweet():
    """
    Filter out tweets that you've tweeted and delete them.
    """
    new_tweets = api.user_timeline(screen_name=user,
                                   count=500, tweet_mode="extended")
    allTweets = [x for x in new_tweets if "Murakami" in x.full_text]

    """
    Print out all the questionable tweets. Wait for user input to destroy all.
    """
    if len(allTweets) == 0:
        print("No problem here!")
        return

    while len(allTweets) != 0:
        print_flagged(allTweets)
        print("")

        delete_prompt = input("Delete all tweets?\nEnter (y/n): ")
        if delete_prompt == "y":
            delete_tweets(allTweets)
            return

        exclude = input("\nOkay, do you want to exclude a tweet from the list?\
        \nEnter (y/n): ")

        if exclude == "y":
            index = input("\nWhich tweet? Enter the index number of a tweet: ")
            print("Trying to remove tweet at index {}...".format(index))
            time.sleep(2)

            try:
                del allTweets[int(index)]
                print("Removed tweet")
            except:
                print("\n\n\t##### ERROR! #####")
                print("\tIndex does not exist, try again.")
                print("\t##################\n")
                time.sleep(4)

        else:
            print("Okay, exiting the program...")
            return

    if len(allTweets) == 0:
        print("\n\nNothing left in the queue, exiting the program...")


def print_flagged(arr):
    """
    Prints out all the flagged tweets
    """
    idx = 0
    print("\n============= List of flagged tweets =============")
    for tweet in arr:
        print("\n########## FLAGGED TWEET ##########")
        print("Index: {}\nTweet Content: {}".format(idx,tweet.full_text))
        idx += 1
        print("###################################\n")

def delete_tweets(arr):
    """
    Deletes all flagged tweets
    """
    for tweet in arr:
        try:
            api.destroy_status(tweet.id_str)
        except:
            print("Fail")
    print("All flagged tweets have been deleted.")

if __name__ == "__main__":
    filter_tweet()
