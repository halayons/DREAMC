import './style.scss';
import React from 'react';

import Cookies from 'js-cookie';

export class Menu extends React.Component {
	constructor(props) {
		super(props);

		this.setCurrent = this.setCurrent.bind(this);
		this.cerrarSesion = this.cerrarSesion.bind(this);
	}

	home() {
		window.location.pathname = "/";
	}

	setCurrent(event) {
		this.props.menu(event.target.name);
	}

	cerrarSesion() {
		const requestOptions = {
			method: 'POST',
			headers: {
				// 'Content-Type': 'application/json',
				'X-CSRFToken': Cookies.get('csrftoken')
			},
			credentials: "include",
		};
		fetch("http://localhost:8000/users/api/auth/logout/", requestOptions)
			.then(response => response.json())
			.then(json => {
				window.location.pathname = "/";
			})
			.catch(error => console.log(error));
	}

	render() {
		return (
			<div class="sidebar">
				<div className="btn-group-vertical">
				<br></br>
				<br></br>
					<button class="active" className="btn-secundario "href="/">Home</button>
					<button name='0' className="btn-secundario " onClick={this.setCurrent} href="#pedidos">Pedidos</button>
					<button name='1' className="btn-secundario" onClick={this.setCurrent} href="#banner">Banner</button>
					<button name='2' className="btn-secundario " onClick={this.setCurrent} href="#mod">Moderadores</button>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					
					<button name='3' className="btn-principal " onClick={this.cerrarSesion} href="#logout">Cerrar sesión</button>
				</div>
			</div>
		);
	}
}