import React from 'react';
import UserInfo from './UserInfo';
import TweetPage from './TweetPage';
import UserPage from './UserPage';
import { Route, Link, Switch } from 'react-router-dom';

const UserOrTweet = ({ match, userType, userInfo }) => {
	return (
		<div>
			<UserInfo user={userInfo} />
			<Switch>
				<Route
					exact
					path={match.url}
					render={() => (
						<div id="user-or-tweet" className="instructions">
							<p>
								There are two ways of using deTweet. <br />
								If you would like to use deTweet to clean up your tweets, select Tweets. <br />
								If you would like to clean up your friends, select Friends.
							</p>
							<Link to={`${match.url}/tweets`}>
								<button
									id="tweet-select-button"
									type="submit"
									className="ui basic button centered button-style"
								>
									Tweets
								</button>
							</Link>
							<Link to={`${match.url}/users`}>
								<button
									id="user-select-button"
									type="submit"
									className="ui basic button centered button-style"
								>
									Users
								</button>
							</Link>
						</div>
					)}
				/>
				<Route path={`${match.url}/tweets`} render={() => <TweetPage userType={userType} />} />
				<Route path={`${match.url}/users`} render={() => <UserPage userType={userType} />} />
			</Switch>
		</div>
	);
};

export default UserOrTweet;
