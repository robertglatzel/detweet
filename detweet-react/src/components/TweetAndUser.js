import React, { Component } from 'react';
import StartTweets from './StartTweets';
import StartUsers from './StartUsers';
import Instructions from './Instructions';
import Tweet from './Tweet';
import Users from './Users';
import NoResults from './NoResults';
import Deleted from './Deleted';
import { Dimmer, Loader } from 'semantic-ui-react';

class TweetAndUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectionType: '',
			realUser: null,
			startClicked: false,
			deleteClicked: false,
			searchTerm: '',
			disabledSearch: true,
			dimmerActive: false,
			data: [
				{
					id: '100',
					text: 'tweet one',
					img: 'detweet logo_favicon.png',
					description: 'Im a cool guy and i like to do this and that',
					name: 'user1'
				},
				{
					id: '200',
					text: 'tweet two',
					img: 'detweet logo_favicon.png',
					description: 'sometimes I like to watch shows',
					name: 'user2'
				},
				{
					id: '300',
					text: 'tweet three',
					img: 'detweet logo_favicon.png',
					description: 'loves socks',
					name: 'user3'
				},
				{
					id: '400',
					text: 'tweet four',
					img: 'detweet logo_favicon.png',
					description: 'loves plants, cats, and everything under the sun. Please give me a follow!',
					name: 'user4'
				}
			]
		};
	}

	componentDidMount() {
		// If the user type is false, it means we're logging in with a dummy profile.
		// So we need to call the fake_detweet function and generate fake data and store it in our state,
		// then pass that info down to userInfo, and the tweets.
		this.setState({ selectionType: this.props.match.params.selectionName });
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

	loadData = (userType, selectionType) => {
		this.setState({ dimmerActive: true }, () => {
			setTimeout(() => {
				this.setState({ startClicked: true, dimmerActive: false });
			}, 3000);
		});
		if (selectionType === 'tweets') {
			// Loads tweets from twitter api or via fake_detweet.
			if (userType === true) {
				//load tweets from api.
				console.log('loading real tweets');
			} else {
				// load tweets from fake_detweet
				console.log('loading fake tweets');
			}
			console.log(`This will be sent to detweet: ${this.state.searchTerm}`);
		} else if (selectionType === 'users') {
			if (userType === true) {
				//load users from api.
				console.log('loading real users');
			} else {
				// load users from fake_detweet
				console.log('loading fake users');
			}
		}
	};

	// grabs the remaining tweet id's and creats an array, sending them back to detweet.
	deleteData = () => {
		this.setState({ deleteClicked: true });
		let dataToRemove = [];
		this.state.data.forEach((item) => {
			dataToRemove.push(item['id']);
		});
		console.log(`This list of tweet id's will be removed ${dataToRemove}`);
	};

	// Keep tweet. Should remove the tweet from the page and from the array of loaded objects.
	// keep me should update the tweets state and remove the selected tweet with a matching id.
	// Needs an animation

	keepItem = (e) => {
		let id;
		if (this.state.selectionType === 'tweets') {
			id = e.target.parentElement.id;
		} else if (this.state.selectionType === 'users') {
			id = e.target.parentElement.parentElement.id;
		}
		this.setState((prevState) => ({
			data: prevState.data.filter((item) => item.id !== id)
		}));
	};

	// Will remove all loaded tweets and instructions, retriggering the start box.
	searchAgain = () => {
		this.setState({ startClicked: false, searchTerm: '', disabledSearch: true, data: [], deleteClicked: false });
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
		let startType;
		if (this.state.selectionType === 'tweets') {
			startType = (
				<StartTweets
					startButton={this.loadData}
					userType={this.state.realUser}
					selectionType={this.state.selectionType}
					startClicked={this.state.startClicked}
					searchTerm={this.state.searchTerm}
					disabledSearch={this.state.disabledSearch}
					searchToggle={this.searchToggle}
					getValue={this.getSearchValue}
				/>
			);
		} else {
			startType = (
				<StartUsers
					startButton={this.loadData}
					selectionType={this.state.selectionType}
					userType={this.state.realUser}
					startClicked={this.state.startClicked}
				/>
			);
		}

		return (
			<div>
				{/*Loading circle once start is clicked, covers whole page */}
				<Dimmer active={this.state.dimmerActive}>
					<Loader size="large">Loading...</Loader>
				</Dimmer>

				{!this.state.startClicked ? (
					<div>{startType}</div>
				) : (
					<div id="main-container">
						{/* If delete was clicked, render the TweetsDeleted component. 
						From there, the user can decide if they want to serach again. 
						Clicking search again will set deleteClicked to false.
						If tweet array length is empty, display no results div, otherwise it will display all the tweets. */}
						{this.state.deleteClicked ? (
							<Deleted searchAgain={this.searchAgain} type={this.state.selectionType} />
						) : this.state.data.length !== 0 ? (
							<div>
								<Instructions
									searchAgain={this.searchAgain}
									delete={this.deleteData}
									type={this.state.selectionType}
								/>
								<div id="enclosure" className="ui three column stackable grid container">
									{this.state.selectionType === 'tweets' ? (
										this.state.data.map((tweet) => (
											<Tweet
												id={tweet.id}
												key={tweet.id}
												text={tweet.text}
												keep={this.keepItem}
											/>
										))
									) : (
										this.state.data.map((user) => (
											<Users
												id={user.id}
												key={user.id}
												username={user.name}
												description={user.description}
												img={user.img}
												keep={this.keepItem}
											/>
										))
									)}
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

export default TweetAndUser;
