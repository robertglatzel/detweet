# deTweet

deTweet is a twitter application that cleans your profile of unwanted tweets by filtering your tweets against a database of flagged words. We make it easy for you to review and remove problematic tweets with the click of a button. 

A live demo is available here: https://www.youtube.com/watch?v=NZCVmNk-uHg&feature=youtu.be

deTweet is currently being rewritten to run on the MERN stack. 

## How to install and run
This application has been developed and tested on Ubuntu 14.04. The best way to run the application is to use vagrant and initialize a box that lets you run Ubuntu 14.04 server edition.

To get started with vagrant, install VirtualBox from here https://www.virtualbox.org/wiki/Downloads. Find the right executable for your operating system and follow the instructions to get it installed. VirtualBox is a great tool that allows you to run different operating system entirely in software on top of your current operating system. 

Now that VirtualBox has been installed, install vagrant by choosing your operating system from this link.https://www.vagrantup.com/downloads.html. 

Once vagrant has been installed, from any directory on your host operating system run `vagrant init`. This creates a VagrantFile containing text to manage the settings of the operating system that you'll virtualize.

Look for the line `config.vm.box` and the replace the string "base" with "ubuntu/trusty64". The resulting line should look like `config.vm.box = "ubuntu/trusty64"` 

The next line that you'll want to look for is `config.vm.network "forwarded_port"`. On a default VagrantFile, this should be on line 26. A bit further down, you'll see a line that's nearly similar but it contains host_ip. You'll want to ignore this line.

Uncomment the line by removing the `#` and set the guest and host parameters to 5002. The line should look like: `config.vm.network "forwarded_port", guest: 5002, host: 5002`

Run the commands `vagrant up` and `vagrant ssh` to obtain a shell into the remote machine.

1. If you don't have git installed, run `sudo apt-get update` and `sudo apt-get -y install git` to install git.

Make sure you save your changes and
Please make sure you have Python3, python3-pip, and MySQL installed (the default MySQLinstallation from Ubuntu's ppa's will suffice). when MySQL is being installed, create a good root password and remember it because you'll be needing it when running the application locally. After you have the right OS and these basic programs installed, follow these steps.

2. Apply for a twitter developer account: API key, API secret key, Access token, Access token secret. Apply for the account here: https://developer.twitter.com/en/apply-for-access.html

3. Clone the repo

4. cd into the cloned directory named  `detweet`

5. Locate the `instance` directory and config.py. Replace the environmental variables with your keys, secrets, and the mysql root user's password.

6. Run install_script.sh by doing `./install_script.sh`. This will update Ubuntu's package lists with the latest versions of packages, install pip3, install the latest version of a MySQL server from Ubuntu's package lists, and create a database named `detweet` in the MySQL server. When prompted for the password, remember the password that you set when installing mysql-server.

7. Install virtualenv, the tool used to isolate dependencies from the rest of a host operating system's packages. Run `sudo pip3 install virtualenv`.

8. Within the root of the cloned directory, create a virtual environment to hold all of our python3 package dependencies. Run `virtualenv detweet_env`.

9. Activate the virtual environment by running `source detweet_env/bin/activate`

10. Install all the packages listed in the requirements.txt file `pip3 install -r requirements.txt`. You will see lines of text installing the packages on your shell's standard out. This process should go smoothly but if you run into any issues, let me know and I'll do my best to help you.

11. When you're in the virtual environment, your shell prompt will have the name of the virtual environment in parantheses preceding your ACTUAL shell prompt. This is normal and let's you know that you're within the virtual environment when intalling packages.

12. While in the virtual environment, run `flask createdb`. This creates the necessary tables, fields within them, and any relationship multiple tables may share.

13. You're now ready to run the app by doing `FLASK_APP=detweet_app FLASK_ENV=development flask run --host=0.0.0.0`.

14. Head to your browser and access the application by typing `localhost:5002`.


Login Page
<img src="https://github.com/robertglatzel/detweet/blob/master/images/Screen%20Shot%202019-04-03%20at%2010.17.19%20AM.png" />

Logged in
<img src="https://github.com/robertglatzel/detweet/blob/master/images/Screen%20Shot%202019-04-03%20at%2010.17.34%20AM.png" />

Displaying filtered tweets
<img src="https://github.com/robertglatzel/detweet/blob/master/images/Screen%20Shot%202019-04-03%20at%2010.18.15%20AM.png" />

Removing tweets
<img src="https://github.com/robertglatzel/detweet/blob/master/images/Screen%20Shot%202019-04-03%20at%2010.18.32%20AM.png" />
