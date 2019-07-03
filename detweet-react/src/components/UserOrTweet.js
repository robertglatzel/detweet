import React, { Component } from 'react';
import UserInfo from './UserInfo';
import TweetPage from './TweetPage';
import UserPage from './UserPage';

class UserOrTweet extends Component {
	constructor(props) {
		super(props);
		this.state = {
			realUser: null,
			tweetPage: null,
			userPage: null
		};
	}

	componentDidMount() {
		// If the user type is false, it means we're logging in with a dummy profile.
		// So we need to call the fake_detweet function and generate fake data and store it in our state,
		// then pass that info down to userInfo, and the tweets.
		if (this.props.userType === false) {
			this.setState({ realUser: false });
			console.log('Dummy logged in');
		} else {
			// If the user type is true, it means we have a real user. We have to query detweet and grab all the users
			// info and send it along.
			this.setState({ realUser: true });
			console.log('real user logged in');
		}
	}

	loadTweetPage = () => {
		this.setState({ tweetPage: true });
	};

	loadUserPage = () => {
		this.setState({ userPage: true });
	};

	render() {
		return (
			<div>
				<UserInfo user={this.props.userInfo} />

				{this.state.tweetPage === true ? (
					<TweetPage userType={this.state.realUser} />
				) : this.state.userPage === true ? (
					<UserPage userType={this.state.realUser} />
				) : (
					<div id="user-or-tweet" className="instructions">
						<p>
							There are two ways of using deTweet. <br />
							If you would like to use deTweet to clean up your tweets, select Tweets. <br />
							If you would like to clean up your friends, select Friends.
						</p>
						<button
							id="tweet-select-button"
							type="submit"
							className="ui basic button centered button-style"
							onClick={this.loadTweetPage}
						>
							Tweets
						</button>
						<button
							id="user-select-button"
							type="submit"
							className="ui basic button centered button-style"
							onClick={this.loadUserPage}
						>
							Users
						</button>
					</div>
				)}
			</div>
		);
	}
}

export default UserOrTweet;
