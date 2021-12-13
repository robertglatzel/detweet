# deTweet

deTweet is a twitter application that cleans your profile of unwanted tweets by filtering your tweets against a database of flagged words. We make it easy for you to review and remove problematic tweets with the click of a button. 

deTweet is currently being rewritten to run on the MERN stack. 


Login Page
<img src="https://github.com/robertglatzel/detweet/blob/master/images/Screen%20Shot%202019-04-03%20at%2010.17.19%20AM.png" />

Logged in
<img src="https://github.com/robertglatzel/detweet/blob/master/images/Screen%20Shot%202019-04-03%20at%2010.17.34%20AM.png" />

Displaying filtered tweets
<img src="https://github.com/robertglatzel/detweet/blob/master/images/Screen%20Shot%202019-04-03%20at%2010.18.15%20AM.png" />

Removing tweets
<img src="https://github.com/robertglatzel/detweet/blob/master/images/Screen%20Shot%202019-04-03%20at%2010.18.32%20AM.png" />


## Developer Environment
Ubuntu 18.04


## Installation instructions

The below instructions need to be reworked because they are unclear.

 - Clone the repo
 - cd into the directory
 - ./install_mysql.sh (This installs pip3 and mysqlserver) (remember your root user's password)
 - ./update_tables_databases.sh (This updates the databases and tables to support full unicode)
 - python3 -m venv detweet_env (This creates a virtual environment)
 - source detweet_env/bin/activate (Activates the virtual environment)
 - pip3 install -r requirements.txt
 - Create an instance directory in the root level of the repository
 - Add __init__.py and config.py into the directory.
 - Set these as environmental variables in your shell: database_uri, twitter_api_key, twitter_api_secret, access_token, access_secret
 - export FLASK_APP = detweet_app in the shell
 - export FLASK_ENV = development (for debug mode)
 - flask run
 - check out the application on localhost:5000
