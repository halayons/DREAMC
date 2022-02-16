import React from "react";
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export class Cakes extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            sortName: undefined,
            sortOrder: undefined
		}

		this.onSortChange = this.onSortChange.bind(this);
	}

    formaFromatter(cell, row) {
        const formas = {
            'CI': 'Circular',
            'CU': 'Cuadrado',
        }
        return formas[row.forma];
    }

    masaFormatter(cell, row) {
        const masas = {
            'VA': 'Vainilla',
            'CH': 'Chocolate',
            'TL': 'Tres Leches',
            'RV': 'RedVelvet',
        }
        return masas[row.masa];
    }

    rellenoFormatter(cell, row) {
        const rellenos = {
            'AQ': 'Arequipe',
            'NU': 'Nutella',
            'ML': 'Mermelada',
            'CP': 'CremaPastelera',
        }
        return rellenos[row.relleno]
    }

    coberturaFormatter(cell, row) {
        const coberturas = {
            'CR': 'Crema',
            'FD': 'Fondant',
        }
        return coberturas[row.cobertura]
    }

	colorFormatter(cell, row){
		return row.color
	}

	onSortChange(sortName, sortOrder) {
        this.setState({
            sortName,
            sortOrder
        });
    }


	render() {
		const options = {
			sortName: this.state.sortName,
			sortOrder: this.state.sortOrder,
			onSortChange: this.onSortChange,

			hideSizePerPage: true
		};

		return (
			<BootstrapTable data={this.props.datos} options={options} pagination>
				<TableHeaderColumn width='150' isKey dataField='id' dataSort={true} filter={{ type: 'TextFilter', delay: 200 }} >
					ID
				</TableHeaderColumn>
				<TableHeaderColumn width='150' dataField='num_pisos' dataSort={true} filter={{ type: 'TextFilter', delay: 200 }}>
					Pisos
				</TableHeaderColumn>
				<TableHeaderColumn width='150' dataField='forma' dataSort={true} dataFormat={this.formaFromatter}>
					Forma
				</TableHeaderColumn>
				<TableHeaderColumn width='150' dataField='masa' dataSort={true} dataFormat={this.masaFormatter}>
					Masa
				</TableHeaderColumn>
				<TableHeaderColumn width='150' dataField='relleno' dataSort={true} dataFormat={this.rellenoFormatter}>
					Relleno
				</TableHeaderColumn>
				<TableHeaderColumn width='150' dataField='cobertura' dataSort={true} dataFormat={this.coberturaFormatter}>
					Cobertura
				</TableHeaderColumn>
				<TableHeaderColumn width='150' dataField='color' dataSort={true} dataFormat={this.colorFormatter}>
					Color
				</TableHeaderColumn>
				<TableHeaderColumn width='150' dataField='costo' dataSort={true}>
					Costo
				</TableHeaderColumn>
				<TableHeaderColumn width='150' dataField='mensaje' dataSort={true}>
					Mensaje
				</TableHeaderColumn>
			</BootstrapTable>
		);
	}
}
