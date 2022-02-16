import React from "react";
import { Cakes } from "./info/cakes";
import { Orders } from "./info/orders";
import { Account } from "./info/account";


export class Information extends React.Component {

    constructor(props) {
        super(props);
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


    render() {
        let { current } = this.props;
        let { datos } = this.props;
        let info;

        if (current == 0) {
            if (datos.length < 0) info = <p>No hay cuenta :O</p>
            else info = <Account datos = {datos}></Account>
        }

        if (current == 1) {
            if (datos.length < 0) info = <p>No hay pasteles</p>
            else info = <Cakes datos = {datos}></Cakes>
        }

        if (current == 2) {
            if (datos.length < 0) info = <p>No hay pedidos</p>
            else info = <Orders datos = {datos} modificar = {this.props.modificar}></Orders>
            
        }

        return (
            <div className="">
                {info}
            </div>
        );
    }


}