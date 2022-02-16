import React from 'react';

import { Detallep } from './detallep';

export class ModalManager extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			showModal: false,
			current: ''
		}

		this.openModal = this.openModal.bind(this)
	}

	openModal = (e) => {
		e.preventDefault();
		this.setState({
			current: this.props.current,
			showModal: true
		});
	};


	render() {
		return (
			<div>
				<button onClick={this.openModal} className="btn btn-default"> Ver </button>
				{this.state.showModal ? (< Detallep show={this.state.showModal} />) : null}
			</div>
		)
	}
}