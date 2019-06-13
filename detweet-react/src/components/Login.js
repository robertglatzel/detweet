import React, { Component } from 'react';
import Logo from './Logo'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div>
                <Logo />
                <div id="sign-in" className="instructions">
                    <p className="ui center aligned">Welcome to <strong>deTweet</strong>, a Twitter application that cleans your profile of unwanted tweets by filtering your tweets against a database of flagged words. We make it easy for you to review and remove problematic tweets with the click of a button. <br/> <br/>
                    Sign in below to get started, or login with a dummy profile to check out deTweet's features!</p>
                    <button id="login-button"className="ui basic button centered" onClick={this.props.login}><i className="twitter icon"></i><p>Sign in with Twitter</p></button>
                    <br />
                    <button id="dummy-button"className="ui basic button centered" onClick={this.props.dummy}><i className="twitter icon"></i><p>Dummy Profile</p></button>
                </div>
            </div>
        );
    }
}
 
export default Login;