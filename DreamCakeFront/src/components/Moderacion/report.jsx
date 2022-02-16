import './styles.scss';
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { Moderar } from './moderar'



export class Report extends React.Component {
    acct = {
		0: false,
		1: true,
	};

	constructor(props) {
		super(props);
		this.state = {
			open: true,
			sortName: undefined,
			sortOrder: undefined
		}

		this.activeFormatter = this.activeFormatter.bind(this);
		this.reportedFormatter = this.reportedFormatter.bind(this);
		this.stateFromatter = this.stateFromatter.bind(this);
		this.openModal = this.openModal.bind(this);
		this.onSortChange = this.onSortChange.bind(this);
	}
	  
	
	activeFormatter(cell, row) {

		let content
		if(cell){
			content = <button class="btn-report" onClick={this.openModal}>Ocultar</button>
		}
		else{
			content = <button class="btn-report" onClick={this.openModal}>Mostrar</button>
		}

		return (
			<div>
				{content}
				<Moderar open={this.state.open} datos={row} onClose={this.openModal} />
			</div>
		);
	  }
	  
	reportedFormatter(cell, row) {
		let format = <input type='checkbox' checked={ cell }/>

		return (
			<div>{format} </div>
			
		);
	}  
	
	openModal = (e) => {
		e.preventDefault();
		this.setState({
			open: !this.state.open
		});
	};

	stateFromatter(cell, row) {
		let content
		if(row.status){
			content = <img className=" img-post" src = {cell}  ></img>
		}
		else{
			content = <img className=" img-post" src = {cell}  style={{ filter: "grayscale(100%)" }}  ></img>
		}

        return (
                <div class = "card col-lg-4">
                        {content}
                </div>
        );
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
		return  `${('0' + (date.getMonth() + 1)).slice(-2)}/${('0' + (date.getDate() - 1)).slice(-2)}/${date.getFullYear()}`;
	}

	render() {
		const options = {
			sortName: this.state.sortName,
			sortOrder: this.state.sortOrder,
			onSortChange: this.onSortChange
		};
		return (
			<div class="container bg-light">
				<BootstrapTable data={this.props.datos} headerStyle={ { background: '#7CD5D0' } }  pagination options = {options}>
					<TableHeaderColumn isKey dataField='id' dataSort={true} filter={{ type: 'TextFilter', delay: 200 }}>
						ID
					</TableHeaderColumn>
					<TableHeaderColumn dataField='usuario' dataSort={true}>
						Usuario
					</TableHeaderColumn>
					<TableHeaderColumn dataField='reported' dataSort={true} dataFormat ={this.reportedFormatter}>
						Reportado
					</TableHeaderColumn>
					<TableHeaderColumn dataField='published_date' dataSort={true}>
						Fecha
					</TableHeaderColumn>
					<TableHeaderColumn dataField='foto' dataFormat={this.stateFromatter}>
						Ver
					</TableHeaderColumn>
					<TableHeaderColumn dataField='status' dataSort={true} dataFormat={this.activeFormatter}>
						Moderar
					</TableHeaderColumn>
				</BootstrapTable>
				
			</div>
		);
	}
}