import React from 'react';
import './UserInfo.css';

const UserInfo = (props) => {
	return (
		<div className="UserInfo-profile-div instructions">
			<div id="UserInfo-profile-content" className="ui unstackable items">
				<div className="item">
					<div className="UserInfo-image">
						<img
							id="UserInfo-image-large"
							className="ui center aligned header logo"
							src=""
							alt="Pic of me"
						/>
					</div>
					<div className="UserInfo-content">
						<p className="header">{props.user.username}</p>
						<div className="UserInfo-description">
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
