import React, { Component } from 'react';
import StartUsers from './StartUsers';
import Instructions from './Instructions';
import Users from './Users';
import NoResults from './NoResults';
import Deleted from './Deleted';

class TweetPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			realUser: null,
			startClicked: false,
			deleteClicked: false,
			users: [
				{
					name: 'user1',
					id: '100',
					description: 'Im a cool guy and i like to do this and that',
					img: 'detweet logo_favicon.png'
				},
				{
					name: 'user2',
					id: '200',
					description: 'sometimes I like to watch shows',
					img: 'detweet logo_favicon.png'
				},
				{ name: 'user3', id: '300', description: 'loves socks', img: 'detweet logo_favicon.png' },
				{
					name: 'user4',
					id: '400',
					description: 'loves plants, cats, and everything under the sun. Please give me a follow!',
					img: 'detweet logo_favicon.png'
				}
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

	// Loads Users.
	loadUsers = (userType) => {
		this.setState({ startClicked: true });
		// Loads users from twitter api or via fake_detweet.
		if (userType === true) {
			//load users from api.
			console.log('loading real users');
		} else {
			// load users from fake_detweet
			console.log('loading fake users');
		}
	};

	// grabs the remaining tweet id's and creats an array, sending them back to detweet.
	deleteUsers = () => {
		this.setState({ deleteClicked: true });
		let usersToRemove = [];
		this.state.users.forEach((user) => {
			usersToRemove.push(user['id']);
		});
		console.log(`This list of user id's will be removed ${usersToRemove}`);
	};

	// Keep tweet. Should remove the tweet from the page and from the array of loaded objects.
	// keep me should update the tweets state and remove the selected tweet with a matching id.
	// Needs an animation

	keepUser = (e) => {
		console.log(e.target.parentElement.parentElement.id);
		let id = e.target.parentElement.parentElement.id;
		this.setState((prevState) => ({
			users: prevState.users.filter((user) => user.id !== id)
		}));
	};

	// Will remove all loaded users and instructions, retriggering the start box.
	searchAgain = () => {
		this.setState({ startClicked: false, users: [], deleteClicked: false });
		console.log('search again clicked');
	};

	render() {
		return (
			<div>
				{/* If start has not been clicked, render the start button message. 
				Otherwise the main container which cointains instructions, and the loaded tweets. 
				I realize this is kind of messy, will refactor it at some point.
                */}

				{!this.state.startClicked ? (
					<StartUsers
						startButton={this.loadUsers}
						userType={this.state.realUser}
						startClicked={this.state.startClicked}
					/>
				) : (
					<div id="main-container">
						{/* If delete was clicked, render the Deleted component. 
						From there, the user can decide if they want to serach again. 
						Clicking search again will set deleteClicked to false.
						If user array length is empty, display no results div, otherwise it will display all the user. */}
						{this.state.deleteClicked ? (
							<Deleted searchAgain={this.searchAgain} type={'users'} />
						) : this.state.users.length !== 0 ? (
							<div>
								<Instructions searchAgain={this.searchAgain} delete={this.deleteUsers} type={'Users'} />
								<div id="enclosure" className="ui three column stackable grid container">
									{this.state.users.map((user) => (
										<Users
											id={user.id}
											key={user.id}
											username={user.name}
											description={user.description}
											img={user.img}
											keep={this.keepUser}
										/>
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
