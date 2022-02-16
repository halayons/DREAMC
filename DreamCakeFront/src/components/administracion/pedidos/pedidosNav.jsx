import '../style.scss';
import React from 'react';


export class PedidosNav extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<nav class="navbar navbar-expand-lg navbar-light bg-light">
					<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav mr-auto">
							<li class="nav-item active">
								<a class="nav-link" href="#">Todos los pedidos <span class="sr-only">(current)</span></a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#">Pedidos pendientes</a>
							</li>

							<li class="nav-item">
								<a class="nav-link" href="#">Pedidos entregados</a>
							</li>
						</ul>
						<form class="form-inline my-2 my-lg-0">
							<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
							<button class="ver" type="submit">Buscar</button>
						</form>
					</div>
				</nav>
			</div>
		);
	}
}