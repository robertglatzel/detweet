import React, { Component } from 'react';


class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() {
        let props = this.props;
        return (
            <div id="start-detweet-div" className="instructions">
                <p>To begin filtering tweets against <strong>deTweet's</strong> database, please click the start button. Or enter a custom search term that you would like to filter against.</p>
                <button 
                    id="start-button"
                    className="ui basic button centered button-style" 
                    onClick={() => props.startButton(props.userType)}>
                    Start
                </button>
                
                <div id="selection-toggle" className="ui slider checkbox">
                    <input type="checkbox" />
                    <label></label>
                </div>
                <div id="search-box" className="ui disabled input">
                    <input type="text" placeholder="Search..." />
                </div>
            </div>
        );
    }
}
 
export default Start;