import '../style.scss';
import React from 'react';
import { Estado } from './estado';
import { PedidosNav } from './pedidosNav';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Detallep } from './detallep';

import Cookies from 'js-cookie';


export class Pedidos extends React.Component {
	estados = [{
		value: '0',
		text: 'En Proceso'
	}, {
		value: '1',
		text: 'Enviado'
	}, {
		value: '2',
		text: 'Entregado',
	}, {
		value: '4',
		text: 'Cancelado'
	}]

	acpt = [{
		value: true,
		text: 'Aceptado'
	},
	{
		value: false,
		text: 'No aceptado'
	}]

	constructor(props) {
		super(props);
		this.state = {
			open: true,
			value: " ",
			sortName: undefined,
			sortOrder: undefined,
			current: ""
		}

		this.buttonFormatter = this.buttonFormatter.bind(this);
		this.stateFromatter = this.stateFromatter.bind(this);
		this.openModal = this.openModal.bind(this);
		this.onSortChange = this.onSortChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.estadoFormatter = this.estadoFormatter.bind(this)
		this.aceptadoFormatter = this.aceptadoFormatter.bind(this);
		this.onAfterSaveCell = this.onAfterSaveCell.bind(this);
		this.replaceModalItem = this.replaceModalItem.bind(this);
		this.updateRow = this.updateRow.bind(this);
	}

	handleChange(event) {
		console.log(event.tar)
		this.setState({ value: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		alert('Esta seguro?: ' + this.state.value);

	}
	replaceModalItem(index) {
		this.setState({
			requiredItem: index
		});
	}

	buttonFormatter(cell, row) {

		return (
			<div>
				<button button type="button" className="col-lg-6 col-sm6 col-6 btn btn-register " data-dismiss="modal" data-toggle="modal" data-target={'#'+'a' + row.idpedido}>ver</button>
				<Detallep row = {row}></Detallep>
			</div>
		);
	}

	updateRow(event) {
		this.setState({current: parseInt(event.target.idpedido)})
		// for (let i = 0; i < this.props.datos; i++)
		// 	if (this.props.datos[i].idpedido == parseInt(event.target.idpedido)){
		// 		console.log(this.props.datos[i])
		// 		this.setState({ current: this.props.datos[i] })
		// 	}
	}

	buttonSelect(cell, row) {
		return (
			<div>
				<select onChange={this.handleChange} value={row.estado % 3}>
					<option value={0}>En proceso</option>
					<option value={1}>Enviado</option>
					<option value={2}>Entregado</option>
				</select>
			</div>
		);
	}


	openModal = (e) => {
		e.preventDefault();
		this.setState({
			open: !this.state.open
		});
	};

	stateFromatter(cell, row) {
		return <Estado datos={row}></Estado>
	}

	onSortChange(sortName, sortOrder) {
		this.setState({
			sortName,
			sortOrder
		});
	}

	parseDate = (s) => {

	}

	dateFormatter(cell, row) {
		let s = cell;

		let months = {
			jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
			jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
		};
		let p = s.split('-');
		let date = new Date(p[0], months[p[1].toLowerCase()], p[2]);
		return `${('0' + (date.getMonth() + 1)).slice(-2)}/${('0' + (date.getDate() - 1)).slice(-2)}/${date.getFullYear()}`;
	}

	estadoFormatter(cell, row) {
		let estados = ['En proceso', 'Enviado', 'Entregado', 'Cancelado'];
		return estados[row.estado]
	}

	aceptadoFormatter(cell, row) {
		return row.aceptado ? 'Aceptado' : 'No aceptado'
	}


	onAfterSaveCell(row, cellName, cellValue) {
		// alert(`Save cell ${cellName} with value ${cellValue} id ${row.idpedido}`);
		if (cellName == 'aceptado') this.aceptarPedido(row.idpedido, cellValue)
		if (cellName == 'estado') this.estadoPedido(row.idpedido, cellValue)
		// if(cellName == 'aceptado') this.aceptarPedido
	}

	aceptarPedido(id, valor) {
		const requestOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': Cookies.get('csrftoken')
			},
			credentials: "include",
			body: JSON.stringify({
				'aceptado': valor
			})
		};
		fetch("http://localhost:8000/aceptar_pedido/" + id + "/", requestOptions)
			.then(response => response.json())
			.then(json => {
				if (json.hasOwnProperty('aceptado'))
					alert(`Pedido ${id} aceptado`)
			})
			.catch(error => console.log(error));
	}

	estadoPedido(id, valor) {
		const requestOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': Cookies.get('csrftoken')
			},
			credentials: "include",
			body: JSON.stringify({
				'estado': valor
			})
		};
		fetch("http://localhost:8000/estado_pedido/" + id + "/", requestOptions)
			.then(response => response.json())
			.then(json => console.log(json))
			.catch(error => console.log(error));
	}



	render() {
		const pagination = {
			page: 2,
			sizePerPage: 5,
			lastPageText: '>>',
			firstPageText: '<<',
			nextPageText: '>',
			prePageText: '<',
			showTotal: true,
			alwaysShowAllBtns: true,
			onPageChange: function (page, sizePerPage) {
				console.log('page', page);
				console.log('sizePerPage', sizePerPage);
			},
			onSizePerPageChange: function (page, sizePerPage) {
				console.log('page', page);
				console.log('sizePerPage', sizePerPage);
			}
		};
		const options = {
			sortName: this.state.sortName,
			sortOrder: this.state.sortOrder,
			onSortChange: this.onSortChange
		};

		let table = "no hay datos"

		if (this.props.datos.length > 0) {
			table = (
				<BootstrapTable pagination={pagination} data={this.props.datos} options={options} cellEdit={{ mode: 'click', blurToSave: true, afterSaveCell: this.onAfterSaveCell }}>
					<TableHeaderColumn isKey dataField='idpedido' dataSort={true} filter={{ type: 'TextFilter', delay: 200 }} >
						ID
					</TableHeaderColumn>
					<TableHeaderColumn dataField='fecha_pedido' dataSort={true} dataFormat={this.dateFormatter} editable={false} >
						Fecha
					</TableHeaderColumn>
					<TableHeaderColumn dataField='user' dataSort={true} filter={{ type: 'TextFilter', delay: 200 }} editable={false}>
						Usuario
					</TableHeaderColumn>
					<TableHeaderColumn dataField='aceptado' dataSort={true} filter={{ type: 'TextFilter', delay: 200 }} dataFormat={this.aceptadoFormatter}
						editable={{ type: 'select', options: { values: this.acpt } }}>
						Aceptado
					</TableHeaderColumn>
					<TableHeaderColumn dataField='button' dataFormat={this.buttonFormatter} editable={false}>
						Ver
					</TableHeaderColumn>
					<TableHeaderColumn dataField='estado' dataFormat={this.estadoFormatter} editable={{ type: 'select', options: { values: this.estados } }}>
						Editar Estado
					</TableHeaderColumn>
				</BootstrapTable>

			)
		}


		return (
			<div>
				{table}
				{/* <Detallep datos={this.props.datos} current={this.state.current} /> */}
			</div>
		);
	}
}