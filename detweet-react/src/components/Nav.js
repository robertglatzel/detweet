import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
	return (
		<div className="ui borderless menu">
			<Link exact to="/select">
				<img id="logo-corner" src={require('../images/detweet logo_favicon.png')} alt="detweet logo" />
			</Link>
			<div id="welcome">
				<img
					id="banner"
					className="ui center aligned"
					src={require('../images/banner-logo_resize.png')}
					alt="detweet banner"
				/>
			</div>
			<div id="logout-box-top" className="item" />
		</div>
	);
};

export default Nav;
