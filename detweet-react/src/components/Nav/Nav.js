import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = (props) => {
	return (
		<div className="ui borderless menu">
			<div style={{ marginTop: '7px', marginLeft: '5px' }}>
				<Link to="/select">
					<img id="logo-corner" src={require('../../images/detweet logo_favicon.png')} alt="detweet logo" />
				</Link>
			</div>
			<div id="Nav-banner-container">
				<img
					id="Nav-banner"
					className="ui center aligned"
					src={require('../../images/banner-logo_resize.png')}
					alt="detweet banner"
				/>
			</div>
			<div id="logout-box-top" className="item" />
		</div>
	);
};

export default Nav;
