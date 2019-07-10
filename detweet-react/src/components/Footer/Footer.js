import React from 'react';
import './Footer.css';

const Footer = () => {
	return (
		<footer>
			<div className="ui center aligned container">
				<div>
					<h4 className="ui center aligned header">Connect with the developers</h4>

					<a href="https://twitter.com/detweet_app?ref_src=twsrc%5Etfw" data-show-count="false">
						Follow @detweet_app
					</a>
					<script async src="https://platform.twitter.com/widgets.js" charSet="utf-8" />

					<a href="https://twitter.com/rglatzell?ref_src=twsrc%5Etfw" data-show-count="false">
						Follow @rglatzell
					</a>
					<script async src="https://platform.twitter.com/widgets.js" charSet="utf-8" />

					<a href="https://twitter.com/hemant_heer?ref_src=twsrc%5Etfw" data-show-count="false">
						Follow @hemant_heer
					</a>
					<script async src="https://platform.twitter.com/widgets.js" charSet="utf-8" />
				</div>
				<div id="divide" className="ui inverted section divider" />
				<div className="ui horizontal small divided link list">
					<a className="item" href="mailto:detweet.app@gmail.com">
						Contact Us
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
