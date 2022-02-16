import './styles.scss';
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { CommentsList } from './comments';

export class CommentsReport extends React.Component {
    
        constructor(props) {
		super(props);
		this.state = {
			open: true,
			sortName: undefined,
			sortOrder: undefined
		}

		this.commentsFormatter = this.commentsFormatter.bind(this);
		this.reportedFormatter = this.reportedFormatter.bind(this);
		this.fotoFormatter = this.fotoFormatter.bind(this);
		this.onSortChange = this.onSortChange.bind(this);
	}
	  
	
	commentsFormatter(cell, row) {
		return (
			<div>
				<CommentsList id={cell}/>
			</div>
		);
	  }

	reportedFormatter(cell, row) {
		let format = <input type='checkbox' checked={ cell }/>

		return (
			<div>{format} </div>
			
		);
	}  

	fotoFormatter(cell, row) {
        return (
                <div class = "d-flex justify-content-center">
                    <img className=" img-post-comments" src = {cell}  ></img>
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
				<BootstrapTable data={this.props.datos} headerStyle={ { background: '#7CD5D0' } } pagination options = {options}>
					<TableHeaderColumn isKey dataField='id' dataSort={true} filter={{ type: 'TextFilter', delay: 200 }}>
						ID
					</TableHeaderColumn>
					<TableHeaderColumn dataField='foto' dataFormat={this.fotoFormatter}>
						Publicacion
					</TableHeaderColumn>
					<TableHeaderColumn  dataField='id' dataSort={true} dataFormat={this.commentsFormatter}>
						Moderar
					</TableHeaderColumn>
				</BootstrapTable>
				
			</div>
		);
	}
}