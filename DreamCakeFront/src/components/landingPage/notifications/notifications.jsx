import '../style.scss';
import React from 'react';

export class Notifications extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notifications: ''
		}
	}


	render() {
		let news =this.props.notifications;
		let mensaje = '';
		if(news!=undefined && news.length>0){
			
			return (
				<div className="overflow-auto">
					{news.map(message => {
						if(message.instance.aceptado ==false){mensaje='no '}else{mensaje=" "}
						console.log(message.instance);
						return(
							<div className="col-lg-12 col-sm-12 col-12 ">
								<img  className="col-6"src={message.instance.foto} alt="" />
								<p className="text-wrap">Su pedido {mensaje}fue aceptado</p>
								<span>ID  pedido:{message.instance.idpedido}</span>
								<hr />
							</div>
						)
					}) }
				</div>
			);
		
		}else return (
				<span className="l">No hay notificaciones</span>
		);
		
	}
}