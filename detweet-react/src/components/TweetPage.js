import React, { Component } from 'react';
import UserInfo from './UserInfo'
import Start from './Start'
import Instructions from './Instructions'

class TweetPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            realUser: false,
            username: "",
            description: "",
            startClicked: false,
        }
    }

    loadTweets(userType){
        // Removes the start button box and toggles the instructions box.
        this.setState({startClicked: true})
        // Loads tweets from twitter api or via fake_detweet.
        if (userType === true){
            //load tweets from api.
            console.log('loading real tweets')
        } else {
            // load tweets from fake_detweet
            console.log('loading fake tweets')
        }
    }

    componentDidMount(){
        // If the user type is false, it means we're logging in with a dummy profile.
        // So we need to call the fake_detweet function and generate fake data and store it in our state,
        // then pass that info down to userInfo, and the tweets.
        if (this.props.user === false){
            this.setState({username: 'Fake User', description: 'This is a test profile'})
            console.log('Dummy logged in')
        }
        // If the user type is true, it means we have a real user. We have to query detweet and grab all the users
        // info and send it along.
        else {
            this.setState({realUser: true, username: 'Real User', description: 'This is a real profile'})
            console.log('real logged in')
        }
    }

    render() { 
        return (
            <div>
                <UserInfo 
                    user={this.state}
                />
                {/* If start has not been clicked, render the start button message. 
                Otherwise the main container which cointains instructions, the loaded tweets, and the search again buttons. 
                */}

                {!this.state.startClicked ? 
                    (<Start 
                        startButton={this.loadTweets.bind(this)} 
                        userType={this.state.realUser}
                    />)
                :
                    (<div id="main-container">
                        <Instructions />

                    </div>) 
                }

            </div>

            
        );
    }
}
 
export default TweetPage;