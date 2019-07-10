from os.path import abspath
import re


def filter_tweets(tweets, user_filter):
    ''' Iterates through all tweets and marks the tweet based on a bunch of
        terms that the user has entered or our own file of bad words

    Args:
        tweets (list): list of tweet objects obtained from the Twitter API
        user_filter (list): list of words to flag within the tweet text
                            If no terms were entered by the user, this filter
                            becomes a list of bad words from a file stored in
                            the repo. Otherwise, this filter will use the terms
                            entered by the user.

    Returns:
        list: bad_tweet_list. can be empty (no flagged tweets) or contain
        a list of dicts e.g. [{tweet_id: flagged_tweet}, ... ]
    '''
    bad_tweet_list = []

    # Handles the case where the user_filter is empty. It still comes in as
    # a list that contains something
    if user_filter[0] == '':
        f_path = abspath("bad_words_list_less")
        with open(f_path) as f:
            bad_words = [word.rstrip('\n') for word in f]
    else:
        # Case where the user entered a bunch of terms in the box
        bad_words = [word.lower() for word in user_filter]

    for tweet in tweets:
        for word in bad_words:
            # Naive solution to force regex
            # to interpret * and + characters literally
            word = word.replace('+', '\+')
            word = word.replace('*', '\*')
            regex = r'{}'.format(word)
            repl = '<strong>{}</strong>'.format(word)
            marked_tweet = re.sub(regex, repl, tweet['full_text'])
            if marked_tweet != tweet['full_text']:
                tweet_dict = {
                    tweet.get('id'): '"{}"'.format(marked_tweet)
                    }
                bad_tweet_list.append(tweet_dict)

    return bad_tweet_list
