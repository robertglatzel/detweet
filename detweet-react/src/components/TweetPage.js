import React, { Component } from 'react';
import Logo from './Logo'

class TweetPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div class="user-profile-div instructions">
                <div id="profile-content" class="ui unstackable items">
                <div class="item">
                    <div class="image">
                    <img id="user-image-large" class="ui center aligned header logo" src="" />
                    </div>
                    <div class="content">
                    <p class="header">@username</p>
                    <div class="description">
                        <p>info</p>
                    </div>
                    <div class="extra">
                        <span id="count-info"></span><span id="remaining"></span>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            
         );
    }
}
 
export default TweetPage;