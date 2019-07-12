import React from 'react';
import './Logo.css';

const Logo = () => {
	return (
		<div className="Logo-div">
			<img
				id="Logo-large"
				className="ui center aligned header Logo hvr-bob"
				src={require('../../images/detweet logo_larger_square.png')}
				alt="detweet logo"
			/>
		</div>
	);
};

export default Logo;
