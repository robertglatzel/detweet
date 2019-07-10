import React from 'react';
import './Logo.css';

const Logo = () => {
	return (
		<div className="logo-div">
			<img
				id="logo-large"
				className="ui center aligned header logo hvr-bob"
				src={require('../../images/detweet logo_larger_square.png')}
				alt="detweet logo"
			/>
		</div>
	);
};

export default Logo;
