import React from 'react';

import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import Cookies from 'js-cookie';

import '../style.scss';
import { Estado } from '../pedidos/estado';


export class Moderadores extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			users: [],
			sortName: undefined,
			sortOrder: undefined,
			open: false,
		}

		this.onSortChange = this.onSortChange.bind(this);
		this.onAfterSaveCell = this.onAfterSaveCell.bind(this);
	}

	componentDidMount() {
		this.getAll()
	}

	onSortChange(sortName, sortOrder) {
		this.setState({
			sortName,
			sortOrder
		});
	}

	getAll(){
		const requestOptions = {
			method: 'GET',
			headers: {
				// 'Content-Type': 'application/json',
				'X-CSRFToken': Cookies.get('csrftoken')
			},
			credentials: "include",
		};
		fetch("http://localhost:8000/users/api/auth/all_users/", requestOptions)
			.then(response => response.json())
			.then(json => this.setState({ users: json }))
			.catch(error => console.log(error))
	}

	estadoFormatter(cell, row) {
		return row.is_active ? 'Activo' : 'Inactivo'
	}

	imagenFormatter(cell, row) {
		return <img src={row.foto} style={{ width: '20px' }}></img>
	}

	onAfterSaveCell(row, cellName, cellValue) {
		this.updateUser(row.id, cellName, cellValue);
	}

	findId(data, id){
		for(let i = 0; i < data.length; i++)
			if(data[i].id == id) return i;
		
		return -1;
	}

	updateUser(id, nombre, valor) {
		let b;
		if(nombre == 'is_active') b = {is_active: valor == 'true'}
		if(nombre == 'is_staff') b = {is_staff: valor == 'true'}
		if(nombre == 'is_superuser') b = {is_superuser: valor == 'true'}

		const requestOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': Cookies.get('csrftoken')
			},
			credentials: "include",
			body: JSON.stringify(b)
		};
		fetch("http://localhost:8000/users/api/auth/user/admin/" + id + "/", requestOptions)
			.then(response => response.json())
			.then(json => {
				console.log(json);
				this.getAll();
			})
			.catch(error => console.log(error));
	}

	render() {
		const options = {
			sortName: this.state.sortName,
			sortOrder: this.state.sortOrder,
			onSortChange: this.onSortChange
		};

		let table = "no hay datos"
		if (this.state.users.length > 0) {
			table = (
				<BootstrapTable data={this.state.users} options={options} cellEdit={{ mode: 'click', blurToSave: true, afterSaveCell: this.onAfterSaveCell }}>
					<TableHeaderColumn isKey dataField='id' dataSort={true} filter={{ type: 'TextFilter', delay: 200 }} >
						ID
					</TableHeaderColumn>
					<TableHeaderColumn dataField='full_name' dataSort={true} filter={{ type: 'TextFilter', delay: 200 }} editable={false}>
						Nombre
					</TableHeaderColumn>
					<TableHeaderColumn dataField='email' dataSort={true} filter={{ type: 'TextFilter', delay: 200 }} editable={false}>
						Email
					</TableHeaderColumn>
					<TableHeaderColumn dataField='foto' dataFormat={this.imagenFormatter} dataSort={false} editable={false}>
						Foto
					</TableHeaderColumn>
					<TableHeaderColumn dataField='is_active' dataFormat={this.estadoFormatter} dataSort={true} filter={{ type: 'TextFilter', delay: 200 }} editable={false}
						editable={{ type: 'select', options: { values: [{ value: true, text: 'Activo' }, { value: false, text: 'Inactivo' }] } }}>
						Estado
					</TableHeaderColumn>
					<TableHeaderColumn dataField='is_staff' dataSort={true} filter={{ type: 'TextFilter', delay: 200 }} editable={false}
						editable={{ type: 'select', options: { values: [{ value: true, text: 'true' }, { value: false, text: 'false' }] } }}>
						Es Moderador
					</TableHeaderColumn>
					<TableHeaderColumn dataField='is_superuser' dataSort={true} filter={{ type: 'TextFilter', delay: 200 }} editable={false}
						editable={{ type: 'select', options: { values: [{ value: true, text: 'true' }, { value: false, text: 'false' }] } }}>
						Es Administrador
					</TableHeaderColumn>
				</BootstrapTable>
			)
		}

		return (
			<div>
				{table}
			</div>
		);
	}
}
