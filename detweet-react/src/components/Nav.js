import React, { Component } from 'react';


class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="ui borderless menu">
                <a className="item logo" href="#"><img id="logo-corner" src={require("../images/detweet logo_favicon.png")} alt="detweet logo"/></a>
                <div id="welcome">
                    <img id="banner" className="ui center aligned" src={require("../images/banner-logo_resize.png")} alt="detweet banner" />
                </div>
                <div id="logout-box-top" className="item">

                </div>
            </div>
         );
    }
}
 
export default Nav;