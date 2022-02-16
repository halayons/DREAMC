import React from "react";

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import { store } from 'react-notifications-component';
import Cookies from 'js-cookie';

export class Notification extends React.Component {

	constructor(props) {
		super(props);
		// this.state={
		// 	dataFromServer: ""
		// }
	}

	componentDidMount() {
		this.reloadPedidoUser();
	}

	stateFromatter(state){
		let states = ["En proceso", "Enviado", "Entregado"];
		return states[state];
	}

	addNFT(message) {
		let mensaje = message.model == "pedido.Pedido" ? `Pedido actualizado\nEstado: ${this.stateFromatter(message.instance.estado)}` : "Nueva actividad en tus posts";
		let titulo = message.model == "pedido.Pedido" ? "Pedido actualizado" : "Nueva actividad"
		store.addNotification({
			title: titulo,
			message: mensaje,
			type: "success",
			insert: "top",
			container: "bottom-right",
			animationIn: ["animate__animated", "animate__fadeIn"],
			animationOut: ["animate__animated", "animate__fadeOut"],
			dismiss: {
				duration: 5000,
				onScreen: true
			}
		});
	}

	sendPedido() {
		this.ws.send(JSON.stringify({
			type: "subscribe",
			id: new Date().getTime(),
			action: 'list',
			model: "pedido.Pedido"
		}))
	}

	sendPost() {
		this.ws.send(JSON.stringify({
			type: "subscribe",
			id: new Date().getTime(),
			action: 'list',
			model: "social.Post"
		}))
	}

	reloadPedidoUser() {
		this.ws = new WebSocket("ws://localhost:8000/ws/pedidoUser/")


		this.ws.onopen = evt => {
			this.sendPedido();
			console.log("open");
		};

		this.ws.onclose = evt => {
			console.log('disconnected reloadiong')
			//if (Cookies.get('sessionid') != undefined) this.reloadPedidoUser()
			this.reloadPedidoUser()
		};

		this.ws.onmessage = evt => {

			const message = JSON.parse(evt.data)
			// this.setState({ dataFromServer: message })
			
			this.props.notificationManager(message);
			this.addNFT(message);
		};

		this.ws.onerror = evt => { console.log(JSON.stringify(evt)) };
	}

	reloadPostUser(){
		this.ws = new WebSocket("ws://localhost:8000/ws/socialUser/")

		this.ws.onopen = evt => {
			this.sendPost();
		};

		this.ws.onclose = evt => {
			console.log('disconnected reloadiong')
			if (Cookies.get('sessionid') != undefined) this.reloadPedidoUser()
		};

		this.ws.onmessage = evt => {
			const message = JSON.parse(evt.data)
			// this.setState({ dataFromServer: message })
			// console.log(message);
			this.addNFT(message);
		};

		this.ws.onerror = evt => { console.log(JSON.stringify(evt)) };
	}

	sendData=(e)=>{

	}

	render() {
		this.sendData.bind(this);
		return (
			<ReactNotification />	
		);
	}
}
