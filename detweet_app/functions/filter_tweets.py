from os.path import abspath
import re


def filter_tweets(tweets, user_filter=None):
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
                txt_low = re.findall(r"[^#!.\s]+", tweet['full_text'].lower())
                txt_orig = re.findall(r"[^#!.\s]+", tweet['full_text'])
                txt_space = re.findall(r"[#!.\s]+", tweet['full_text'])
                if word in txt_low:
                    idx = txt_low.index(word)
                    strong_word = '<strong>{}</strong>'.format(txt_orig[idx])
                    txt_orig[idx] = strong_word
                    lst_rebld = []
                    for i in range(len(txt_orig)):
                        lst_rebld.append(txt_orig[i])
                        try:
                            lst_rebld.append(txt_space[i])
                        except:
                            pass
                    tweet_dict = {
                        tweet.get('id'): '"{}"'.format(''.join(lst_rebld))
                        }
                    bad_tweet_list.append(tweet_dict)
    except Exception as e:
        print(e)

    return bad_tweet_list
