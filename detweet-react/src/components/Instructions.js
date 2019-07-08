import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';

class Instructions extends Component {
	/* Strip the extra s so it's usable in the paragraph. */
	state = { open: false };

	close = () => {
		this.setState({ open: false });
	};

	open = () => {
		this.setState({ open: true });
	};

	render() {
		let type = '';
		if (this.props.type === 'users') {
			type = 'user';
		} else {
			type = 'tweet';
		}

		let button = (
			<button id="remove-all" className="ui basic button centered button-style" onClick={this.open}>
				Remove {this.props.type}
			</button>
		);
		return (
			<div id="instruction-box" className="instructions">
				<p>
					If you see a {type} that you would like to keep, click the 'Keep me' button.<br /> When you're ready
					to remove the {this.props.type} just click the button below, or search again.
				</p>
				<div className="remove-button">
					<Modal trigger={button} size="small" id="confirm" open={this.state.open}>
						<Modal.Content>
							<p>
								All items remaining on the page will be deleted.
								<br /> Do you want to proceed?
								<br /> This action is irreversiable.
							</p>
						</Modal.Content>
						<Modal.Actions style={{ textAlign: 'center' }}>
							<button id="remove" className="ui basic button button-style" onClick={this.props.delete}>
								deTweet!
							</button>
							<button id="cancel" className="ui basic button button-style" onClick={this.close}>
								On second thought...
							</button>
						</Modal.Actions>
					</Modal>
					<button id="reset" className="ui basic button button-style" onClick={this.props.searchAgain}>
						Search Again
					</button>
				</div>
			</div>
		);
	}
}

export default Instructions;
