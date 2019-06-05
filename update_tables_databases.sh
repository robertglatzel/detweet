#!/usr/bin/env bash

flask createdb
echo 'ALTER DATABASE detweet CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci' | mysql -uroot -p
echo 'ALTER TABLE user CONVERT TO CHARACTER SET utf8mb4 COLLATE = utf8mb4_unicode_ci' | mysql -uroot -p
echo 'ALTER TABLE user CHANGE description description VARCHAR(256) CHARACTER SET utf8mb4 COLLATE = utf8mb4_unicode_ci' | mysql -uroot -p
echo 'ALTER TABLE user CHANGE name name VARCHAR(256) CHARACTER SET utf8mb4 COLLATE = utf8mb4_unicode_ci' | mysql -uroot -p
