import '../style.scss';
import React from 'react';
import { Detallep } from './detallep';


export class Estado extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let content

		if(this.props.datos.aceptado){
			content = <p>ACEPTADO ESTADO: {this.props.datos.estado}</p>
		}
		else{
			content = <p>{this.props.datos.aceptado ? 'Aceptado' : 'No aceptado'}</p>
		}


		return (
			<div>
				{content}
			</div>
		);
	}
}