import React, { Component } from 'react';
import StartTweets from './StartTweets';
import Instructions from './Instructions';
import Tweet from './Tweet';
import NoResults from './NoResults';
import Deleted from './Deleted';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

class TweetPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			realUser: null,
			startClicked: false,
			deleteClicked: false,
			searchTerm: '',
			disabledSearch: true,
			dimmerActive: false,
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
			console.log('real user logged in');
		}
	}

	// Loads tweets from api. When start is clicked, it launches the loading circle.
	// When api returns with all results, loading circle will be disabled.
	// Also grabs the search term for passing back to detweet.

	loadTweets = (userType) => {
		this.setState({ dimmerActive: true }, () => {
			setTimeout(() => {
				this.setState({ startClicked: true, dimmerActive: false });
			}, 3000);
		});
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

	// grabs the remaining tweet id's and creats an array, sending them back to detweet.
	deleteTweets = () => {
		this.setState({ deleteClicked: true });
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
		this.setState({ startClicked: false, searchTerm: '', disabledSearch: true, tweets: [], deleteClicked: false });
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
		return (
			<div>
				{/*Loading circle once start is clicked, covers whole page */}
				<Dimmer active={this.state.dimmerActive}>
					<Loader size="large">Loading...</Loader>
				</Dimmer>

				{!this.state.startClicked ? (
					<StartTweets
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
						{/* If delete was clicked, render the TweetsDeleted component. 
						From there, the user can decide if they want to serach again. 
						Clicking search again will set deleteClicked to false.
						If tweet array length is empty, display no results div, otherwise it will display all the tweets. */}
						{this.state.deleteClicked ? (
							<Deleted searchAgain={this.searchAgain} type={'tweets'} />
						) : this.state.tweets.length !== 0 ? (
							<div>
								<Instructions
									searchAgain={this.searchAgain}
									delete={this.deleteTweets}
									type={'Tweets'}
								/>
								<div id="enclosure" className="ui three column stackable grid container">
									{this.state.tweets.map((tweet) => (
										<Tweet id={tweet.id} key={tweet.id} text={tweet.text} keep={this.keepTweet} />
									))}
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
