import React, { Component } from 'react';

const UserInfo = (props) => {
	return (
		<div className="user-profile-div instructions">
			<div id="profile-content" className="ui unstackable items">
				<div className="item">
					<div className="image">
						<img id="user-image-large" className="ui center aligned header logo" src="" alt="Pic of me" />
					</div>
					<div className="content">
						<p className="header">{props.user.username}</p>
						<div className="description">
							<p>{props.user.description}</p>
						</div>
						<div className="extra">
							<span id="count-info" />
							<span id="remaining" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserInfo;
