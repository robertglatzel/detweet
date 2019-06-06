#!/usr/bin/env bash

sudo apt-get update
sudo apt-get -y install python3-pip
sudo apt-get -y install mysql-server
sudo apt install libmysqlclient-dev
echo 'CREATE DATABASE IF NOT EXISTS detweet' | mysql -uroot -p
