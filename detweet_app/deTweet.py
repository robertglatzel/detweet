#!/usr/bin/python3
"""
This twitter bot checks your posts to see if you've tweeted anything
that might be considered questionable and lead to complications further in
your career.
"""

from os.path import abspath
def safety(tweets, user_filter=None):
    """
    Filter out tweets that you've tweeted and delete them.
    """
    bad_tweet_list = []

    if user_filter[0] == '':
        user_filter = None

    if user_filter is None:
        f_path = abspath("bad_words_list_less")
        with open(f_path) as f:
            bad_words = [word.rstrip('\n') for word in f]
    else:
        user_bad_word = user_filter
        bad_words = [word.lower() for word in user_bad_word]

    print(bad_words)
    print('length of tweets: {}'.format(len(tweets)))

    for tweet in tweets:
        for word in bad_words:
            tweet_text_lower = tweet['text'].lower().split()
            tweet_text_orig = tweet['text'].split()
            if word in tweet_text_lower:
                idx = tweet_text_lower.index(word)
                strong_word = '<strong>{}</strong>'.format(tweet_text_orig[idx])
                tweet_text_orig[idx] = strong_word
                tweet_dict = {tweet.get('id'): '"{}"'.format(' '.join(tweet_text_orig))}
                bad_tweet_list.append(tweet_dict)

    print(len(bad_tweet_list))
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
