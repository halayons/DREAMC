import React from "react";
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import Cookies from 'js-cookie';


export class Orders extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			sortName: undefined,
			sortOrder: undefined
		}

		this.onSortChange = this.onSortChange.bind(this);
		this.editarPedido = this.editarPedido.bind(this);
		this.cancelarPedido = this.cancelarPedido.bind(this);
		this.editarFormatter = this.editarFormatter.bind(this);
	}

	estadoFormatter(cell, row) {
		let estados = ['En proceso', 'Enviado', 'Entregado', 'Cancelado'];
		return estados[row.estado]
	}

	aceptadoFormatter(cell, row) {
		return row.aceptado ? 'Aceptado' : 'No aceptado'
	}

	onSortChange(sortName, sortOrder) {
		this.setState({
			sortName,
			sortOrder
		});
	}

	editarPedido(event) {
		for(let i = 0; i < this.props.datos.length; i++){
			if(this.props.datos[i].idpedido == parseInt(event.target.name)){
				const requestOptions = {
					method: 'GET',
					headers: {
						// 'Content-Type': 'application/json',
						'X-CSRFToken': Cookies.get('csrftoken')
					},
					credentials: "include",
				};
				fetch("http://localhost:8000/pastel_pedido/" + parseInt(event.target.name) + "/", requestOptions)
					.then(response => 
						response.json()
					)
					.then(json => {
						console.log(json)
						// alert(json)
						this.props.modificar(json, 1);
					})
					.catch(error => console.log(error));
			}
		}
	}

	cancelarPedido(event) {
		const requestOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': Cookies.get('csrftoken')
			},
			credentials: "include",
		};
		fetch("http://localhost:8000/cancelar_pedido/" + parseInt(event.target.name) + "/", requestOptions)
			.then(response => {
				if (response.status != 200)
					alert(response.text);
				else return response.json()
			})
			.then(json => {
				alert('Se cancelo correctamente');
			})
			.catch(error => console.log(error));
	}

	editarFormatter(cell, row) {
		return (
			<div>
				<button name={row.idpedido} disabled={row.aceptado || row.estado == 3} onClick={this.editarPedido}>Editar</button>
				<button name={row.idpedido} disabled={row.aceptado || row.estado == 3} onClick={this.cancelarPedido}>Cancelar</button>
			</div>
		)
	}


	render() {
		const options = {
			sortName: this.state.sortName,
			sortOrder: this.state.sortOrder,
			onSortChange: this.onSortChange,

			hideSizePerPage: true
		};

		return (
			<div className="div-table">
				<BootstrapTable data={this.props.datos} pagination={true} options={options}>
					<TableHeaderColumn width='50' isKey dataField='idpedido' dataSort={true} filter={{ type: 'TextFilter', delay: 200 }} >
						ID
					</TableHeaderColumn>
					<TableHeaderColumn width='150' dataField='fecha_pedido' dataSort={true} dataFormat={this.dateFormatter} >
						Fecha
					</TableHeaderColumn>
					<TableHeaderColumn width='150' dataField='aceptado' dataSort={true} filter={{ type: 'TextFilter', delay: 200 }} dataFormat={this.aceptadoFormatter}>
						Aceptado
					</TableHeaderColumn>
					<TableHeaderColumn width='150' dataField='estado' dataFormat={this.estadoFormatter}>
						Estado
					</TableHeaderColumn>
					<TableHeaderColumn width='150' dataField='direccion' dataSort={true}>
						Direccion
					</TableHeaderColumn>
					<TableHeaderColumn width='150' dataField='costo' dataSort={true} >
						Costo
					</TableHeaderColumn>
					<TableHeaderColumn width='150' dataField='idpedido' dataFormat={this.editarFormatter} dataSort={false} >
						Editar
					</TableHeaderColumn>
				</BootstrapTable>
			</div>
		);
	}
}
