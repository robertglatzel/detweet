import React from 'react';

const Users = (props) => {
	const img = props.img;
	return (
		<div className="column centered">
			<div id={props.id} className="user ui segment hvr-float-shadow">
				<div className="data-top-bar">
					<p>
						<strong>{props.username}</strong>{' '}
					</p>
				</div>
				<div className="item">
					<button onClick={props.keep} className="keep-data ui button violet hvr-pulse-grow" title="Keep me!">
						Keep me
					</button>
				</div>
				<div className="ui feed">
					<div className="event">
						<div className="label">
							<img
								style={{ width: '100px' }}
								src={require('../images/' + props.img)}
								alt={props.username}
							/>
						</div>
						<div style={{ marginLeft: '90px' }} className="content">
							<div className="summary">{props.description}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Users;
