import React, { Component, StyleSheet } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Modal, Button, Imput, ModalFooter, modalHeader } from 'reactstrap';
import Loader from 'react-loader-spinner';
import paginationFactory from 'react-bootstrap-table2-paginator';

export class Prueba extends Component {
	searchArray = [];
	formatButton = (cell, row) => {
		if (row.title) {
			return (
				<div>
					<button class="btn btn-sm btn-success" onClick={() => this.viewInfo(row.thumbnailUrl, row.id, row.title, row.albumId)}> Show row info in model</button>
				</div>
			)
		}
	}
	state = {
		Items: [],
		loading: false,
		newInfoModal: false,
		columns: [{
			dataField: 'albumId',
			text: 'Album Id',
		},
		{
			dataField: 'id',
			text: 'Id',
			sort: true,
		},
		{
			dataField: 'title',
			text: 'Tlitle',
			sort: true,
		},
		{
			text: 'Format Button',
			formatter: this.formatButton,
			sort: true,
		}]
	}
	constructor(props) {
		super(props)
		this.getItems();
	}
	toggleInfo() {
		this.setState({ newInfoModal: true })
	}
	handleClose = () => {
		this.setState({ newInfoModal: false })
	}
	viewInfo(thumbnailUrl, id, title, albumId) {
		this.setState({ newInfoModal: !this.state.newInfoModal })
		localStorage.setItem("albumId", albumId);
		localStorage.setItem("id", id);
		localStorage.setItem("title", title);
		localStorage.setItem("thumbnailUrl", thumbnailUrl);
	}
	getItems = async () => {
		try {
			this.setState({ loading: false })
			let data = await axios({
				method: 'get',
				url: 'https://jsonplaceholder.typicode.com/photos'
			}).then(({ datta }) => data)
			console.log(data);
			this.searchArray = data;
			this.setState({ Items: data, loading: true });
		}
		catch (err) {
			console.log(err);
		}
	}
	onChangeHandler(e) {
		console.log(e.target.value);
		let newArray = this.searchArray.filter((d) => {
			console.log(d);
			let searchValue = d.title.toLowerCase();
			return searchValue.indexOf(e.target.value) !== -1;
		});
		this.setState({ Items: newArray })
	}
	render() {
		const { loading } = this.state
		return (
			<div className="Prueba">
				{!loading && <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />}
				<Loader type="ThreeDots" color="#000" height="50" width="100" />
			</div> ||
			<div>
				<input type="text" value={this.state.value} onChange={this.onChangeHandler.bind(this)} placeholder="search for" />
				<BootstrapTable
					columns={this.state.columns}
					keyField="id"
					striped
					hover
					data={this.state.Items}
					pagination={paginationFactory()}
				/>
				<>
					<Button color="#ff f" onClick={this.toggleInfo.bind(this)}></Button>
					<Modal isOpen={this.state.newInfoModal} size="lg">
						<ModalHeader>
							Modal Header
						</ModalHeader>
						<ModalBody>
							<div>
								<img src={localStorage.getItem("thumbnailUrl")} height={200} />
								<imput value={localStorage.getItem("id")} style={{ marginTop: 10 }} />
								<imput value={localStorage.getItem("title")} style={{ marginTop: 10 }} />
								<imput value={localStorage.getItem("albumId")} style={{ marginTop: 10 }} />
							</div>

						</ModalBody>
						<ModalFooter>
							<button class="btn btn-primary" onClick={this.handleClose}>Cancel </button>
						</ModalFooter>
					</Modal>
				</>
			</div>
		);
	}



}