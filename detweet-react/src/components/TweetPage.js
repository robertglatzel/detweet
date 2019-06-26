import React, { Component } from 'react';
import UserInfo from './UserInfo';
import Start from './Start';
import Instructions from './Instructions';
import Tweet from './Tweet';
import NoResults from './NoResults';

class TweetPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			realUser: null,
			startClicked: false,
			searchTerm: '',
			disabledSearch: true,
			tweets: [
				{ id: '100', text: 'tweet one' },
				{ id: '200', text: 'tweet two' },
				{ id: '300', text: 'tweet three' },
				{ id: '400', text: 'tweet four' }
			]
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
			console.log('real logged in');
		}
	}

	// Loads tweets. Also grabs the search term for passing back to detweet.
	loadTweets = (userType) => {
		this.setState({ startClicked: true });
		// Loads tweets from twitter api or via fake_detweet.
		if (userType === true) {
			//load tweets from api.
			console.log('loading real tweets');
		} else {
			// load tweets from fake_detweet
			console.log('loading fake tweets');
		}
		console.log(`This will be sent to detweet: ${this.state.searchTerm}`);
	};

	// grabs the remaining tweet id's and creats an array, sending them back to javascript.
	deleteTweets = () => {
		let tweetsToRemove = [];
		this.state.tweets.forEach((tweet) => {
			tweetsToRemove.push(tweet['id']);
		});
		console.log(`This list of tweet id's will be removed ${tweetsToRemove}`);
	};

	// Keep tweet. Should remove the tweet from the page and from the array of loaded objects.
	// keep me should update the tweets state and remove the selected tweet with a matching id.
	// Needs an animation

	keepTweet = (e) => {
		let id = e.target.parentElement.id;
		this.setState((prevState) => ({
			tweets: prevState.tweets.filter((tweet) => tweet.id !== id)
		}));
	};

	// Will remove all loaded tweets and instructions, retriggering the start box.
	searchAgain = () => {
		this.setState({ startClicked: false, searchTerm: '', disabledSearch: true, tweets: [] });
		console.log('search again clicked');
	};

	// Switches the state of the disabled search. If disabled, default to detweet bad words.
	// if enabled, text value will be grabbed by loadTweets for sending back to detweet.
	searchToggle = () => {
		this.setState((prevState) => ({
			disabledSearch: !prevState.disabledSearch,
			searchTerm: (prevState.searchTerm = '')
		}));
	};

	// update the value held in search term when user types. Will be sent back as a search term for detweet.
	getSearchValue = (e) => {
		this.setState({ searchTerm: e.target.value });
	};

	render() {
		let tweets = this.state.tweets.map((tweet) => (
			<Tweet id={tweet.id} key={tweet.id} text={tweet.text} keep={this.keepTweet} />
		));

		return (
			<div>
				<UserInfo user={this.props.userInfo} />
				{/* If start has not been clicked, render the start button message. 
                Otherwise the main container which cointains instructions, the loaded tweets. 
                */}

				{!this.state.startClicked ? (
					<Start
						startButton={this.loadTweets}
						userType={this.state.realUser}
						startClicked={this.state.startClicked}
						searchTerm={this.state.searchTerm}
						disabledSearch={this.state.disabledSearch}
						searchToggle={this.searchToggle}
						getValue={this.getSearchValue}
					/>
				) : (
					<div id="main-container">
						{/* If tweet array length is empty, display no results div */}
						{this.state.tweets.length !== 0 ? (
							<div>
								<Instructions searchAgain={this.searchAgain} delete={this.deleteTweets} />
								<div id="enclosure" className="ui three column stackable grid container">
									{/* Tweets get loaded here. */}
									{tweets}
								</div>
							</div>
						) : (
							<NoResults search={this.searchAgain} />
						)}
					</div>
				)}
			</div>
		);
	}
}

export default TweetPage;
