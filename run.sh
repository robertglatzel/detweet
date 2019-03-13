#!/usr/bin/env bash
export FLASK_APP=detweet_app
export FLASK_ENV=development
if [ ! -d detweet_env ]; then
    echo "Virtual environment does not exist..creating one now"
    virtualenv detweet_env 1>detweet_creation_log.txt
    echo "Activating virtual environment.."
    source detweet_env/bin/activate
    echo "Installing dependencies required by app...hold on!"
    pip3 install -r requirements.txt 1>install_log.txt
    echo "Installed all dependencies in virtual environment.."
else
    source detweet_env/bin/activate
fi
flask run --host=0.0.0.0
