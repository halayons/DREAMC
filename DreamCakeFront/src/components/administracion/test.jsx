
import React from 'react';

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';

export class Test extends React.Component {
	ws = new WebSocket("ws://localhost:8000/ws/")

	constructor(props) {
		super(props);
		this.send = this.send.bind(this)
	}

	componentDidMount(){
		this.ws.onopen = evt => { 
			console.log("open");
			this.send();
		}; 

		this.ws.onclose = evt => { console.log('disconnected') }; 

		this.ws.onmessage = evt => { 
			const message = JSON.parse(evt.data)
			this.setState({dataFromServer: message})
			console.log(message) 
			this.addNFT();
		}; 

		this.ws.onerror = evt => { console.log(JSON.stringify(evt)) }; 
	}

	send(){
		this.ws.send(JSON.stringify({
			action: "subscribe_to_pedido_activity",
			request_id: new Date().getTime(),
		}))
	}

	
// {idpedido: 10, fecha_pedido: "2021-Jun-24 ", foto: "/media/pedido/a_8_69UKEp6.png", direccion: "asdfa", costo: 2, …}
// aceptado: true
// comentario: "sadfasdf"
// costo: 2
// direccion: "asdfa"
// domiciliario: true
// estado: 2
// fecha_pedido: "2021-Jun-24 "
// foto: "/media/pedido/a_8_69UKEp6.png"
// idpedido: 10
// pasteles: 1
// user: "admin@admin.com"
// __proto__: Object

	addNFT(){
		store.addNotification({
			title: "Nuevo pedido",
			message: this.state.message.user + " realizo un nuevo pedido",
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


	render() {
		return (
			<div>
				 <ReactNotification />
				<button onClick = {this.send}></button>
			</div>
		);
	}
}