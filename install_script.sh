#!/usr/bin/env bash
# Sets up the virtual environment with all the dependencies listed in the requirements.txt file and runs the flask app on 0.0.0.0

sudo apt-get update
sudo apt-get -y install python3-pip
sudo apt-get -y install mysql-server
echo 'CREATE DATABASE IF NOT EXISTS detweet' | mysql -uroot -p
sudo apt-get -y install libmysqlclient-dev
