import React from 'react';

import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import Cookies from 'js-cookie';

import '../style.scss';

import { CreateBanner } from './createBanner';

export class Banner extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			banners: [],
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
		fetch("http://localhost:8000/banner/get_all/", requestOptions)
			.then(response => response.json())
			.then(json => this.setState({ banners: json }))
			.catch(error => console.log(error))
	}

	estadoFormatter(cell, row) {
		return row.status ? 'Activo' : 'Inactivo'
	}

	imagenFormatter(cell, row) {
		return <img src={row.image} style={{ width: '20px' }}></img>
	}

	onAfterSaveCell(row, cellName, cellValue) {
		this.estadoBanner(row.id, cellValue);
	}

	findId(data, id){
		for(let i = 0; i < data.length; i++)
			if(data[i].id == id) return i;
		
		return -1;
	}

	estadoBanner(id, valor) {
		const requestOptions = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': Cookies.get('csrftoken')
			},
			credentials: "include",
			body: JSON.stringify({
				'status': valor
			})
		};
		fetch("http://localhost:8000/banner/delete/" + id + "/", requestOptions)
			.then(response => response.json())
			.then(json => this.getAll())
			.catch(error => console.log(error));
	}

	modal = (e) => {
		e.preventDefault();
		this.setState({
			open: !this.state.open
		});
	};

	render() {
		const options = {
			sortName: this.state.sortName,
			sortOrder: this.state.sortOrder,
			onSortChange: this.onSortChange
		};

		let table = "no hay datos"
		if (this.state.banners.length > 0) {
			table = (
				<BootstrapTable data={this.state.banners} options={options} cellEdit={{ mode: 'click', blurToSave: true, afterSaveCell: this.onAfterSaveCell }}>
					<TableHeaderColumn isKey dataField='id' dataSort={true} filter={{ type: 'TextFilter', delay: 200 }} >
						ID
					</TableHeaderColumn>
					<TableHeaderColumn dataField='title' dataSort={true} editable={false}>
						Titulo
					</TableHeaderColumn>
					<TableHeaderColumn dataField='text' dataSort={true} filter={{ type: 'TextFilter', delay: 200 }} editable={false}>
						Texto
					</TableHeaderColumn>
					<TableHeaderColumn dataField='abstract' dataSort={true} filter={{ type: 'TextFilter', delay: 200 }} editable={false}>
						Resumen
					</TableHeaderColumn>
					<TableHeaderColumn dataField='image' dataFormat={this.imagenFormatter} dataSort={false} editable={false}>
						Imagen
					</TableHeaderColumn>
					<TableHeaderColumn dataField='status' dataFormat={this.estadoFormatter} dataSort={true} filter={{ type: 'TextFilter', delay: 200 }} editable={false}
						editable={{ type: 'select', options: { values: [{ value: true, text: 'Activo' }, { value: false, text: 'Inactivo' }] } }}>
						Estado
					</TableHeaderColumn>
				</BootstrapTable>
			)
		}

		return (
			<div>
				<button className="btn-principal btn-mediano" onClick={this.modal}>Crear Banner</button>
				<CreateBanner open={this.state.open} onClose={this.modal}></CreateBanner>
				{table}
			</div>
		);
	}
}
