import './style.scss';

import React from 'react';
import { Footer, Header } from '../landingPage';
import { Pedidos } from './pedidos/pedidos';

import { Banner } from './banner/banner';
import { Moderadores } from './crearModerador/moderadores';
import { Menu } from './menu';

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';

import Cookies from 'js-cookie';

export class Admin extends React.Component {

  ws = new WebSocket("ws://http://localhost:8000/ws/pedido/")

  constructor(props) {
    super(props)
    this.state = {
      pedidos: [{
        idpedido: 1,
        fecha_pedido: "2021-Jun-24 ",
        foto: "http://localhost:8000/media/pedido/a_8_69UKEp6.png",
        direccion: "asdfa",
        costo: 2.0,
        aceptado: false,
        estado: 2,
        comentario: "sadfasdf",
        domiciliario: true,
        pasteles: 1,
        user: "admin@admin.com"
      },
      {
        idpedido: 3,
        fecha_pedido: "2020-Jun-24 ",
        foto: "http://localhost:8000/media/pedido/a_8_69UKEp6.png",
        direccion: "asdfa",
        costo: 2.0,
        aceptado: true,
        estado: 2,
        comentario: "sadfasdf",
        domiciliario: true,
        pasteles: 1,
        user: "admin@admin.com"
      },
      {
        idpedido: 4,
        fecha_pedido: "2020-Jun-24 ",
        foto: "http://localhost:8000/media/pedido/a_8_69UKEp6.png",
        direccion: "asdfa",
        costo: 2.0,
        aceptado: true,
        estado: 2,
        comentario: "sadfasdf",
        domiciliario: true,
        pasteles: 1,
        user: "admin@admin.com"
      },
      {
        idpedido: 5,
        fecha_pedido: "2020-Jun-24 ",
        foto: "http://localhost:8000/media/pedido/a_8_69UKEp6.png",
        direccion: "asdfa",
        costo: 2.0,
        aceptado: true,
        estado: 2,
        comentario: "sadfasdf",
        domiciliario: true,
        pasteles: 1,
        user: "admin@admin.com"
      },
      {
        idpedido: 6,
        fecha_pedido: "2020-Jun-24 ",
        foto: "http://localhost:8000/media/pedido/a_8_69UKEp6.png",
        direccion: "asdfa",
        costo: 2.0,
        aceptado: true,
        estado: 2,
        comentario: "sadfasdf",
        domiciliario: true,
        pasteles: 1,
        user: "admin@admin.com"
      },
      {
        idpedido: 7,
        fecha_pedido: "2020-Jun-24 ",
        foto: "http://localhost:8000/media/pedido/a_8_69UKEp6.png",
        direccion: "asdfa",
        costo: 2.0,
        aceptado: true,
        estado: 2,
        comentario: "sadfasdf",
        domiciliario: true,
        pasteles: 1,
        user: "admin@admin.com"
      },
      {
        idpedido: 8,
        fecha_pedido: "2020-Jun-24 ",
        foto: "http://localhost:8000/media/pedido/a_8_69UKEp6.png",
        direccion: "asdfa",
        costo: 2.0,
        aceptado: true,
        estado: 2,
        comentario: "sadfasdf",
        domiciliario: true,
        pasteles: 1,
        user: "admin@admin.com"
      },
      {
        idpedido: 9,
        fecha_pedido: "2020-Jun-24 ",
        foto: "http://localhost:8000/media/pedido/a_8_69UKEp6.png",
        direccion: "asdfa",
        costo: 2.0,
        aceptado: true,
        estado: 2,
        comentario: "sadfasdf",
        domiciliario: true,
        pasteles: 1,
        user: "admin@admin.com"
      },
      {
        idpedido: 10,
        fecha_pedido: "2020-Jun-24 ",
        foto: "http://localhost:8000/media/pedido/a_8_69UKEp6.png",
        direccion: "asdfa",
        costo: 2.0,
        aceptado: true,
        estado: 2,
        comentario: "sadfasdf",
        domiciliario: true,
        pasteles: 1,
        user: "admin@admin.com"
      },
      {
        idpedido: 11,
        fecha_pedido: "2020-Jun-24 ",
        foto: "http://localhost:8000/media/pedido/a_8_69UKEp6.png",
        direccion: "asdfa",
        costo: 2.0,
        aceptado: true,
        estado: 2,
        comentario: "sadfasdf",
        domiciliario: true,
        pasteles: 1,
        user: "admin@admin.com"
      },
      {
        idpedido: 12,
        fecha_pedido: "2020-Jun-24 ",
        foto: "http://localhost:8000/media/pedido/a_8_69UKEp6.png",
        direccion: "asdfa",
        costo: 2.0,
        aceptado: true,
        estado: 2,
        comentario: "sadfasdf",
        domiciliario: true,
        pasteles: 1,
        user: "admin@admin.com"
      },
      {
        idpedido: 13,
        fecha_pedido: "2020-Jun-24 ",
        foto: "http://localhost:8000/media/pedido/a_8_69UKEp6.png",
        direccion: "asdfa",
        costo: 2.0,
        aceptado: true,
        estado: 2,
        comentario: "sadfasdf",
        domiciliario: true,
        pasteles: 1,
        user: "admin@admin.com"
      },
      {
        idpedido: 14,
        fecha_pedido: "2020-Jun-24 ",
        foto: "http://localhost:8000/media/pedido/a_8_69UKEp6.png",
        direccion: "asdfa",
        costo: 2.0,
        aceptado: true,
        estado: 2,
        comentario: "sadfasdf",
        domiciliario: true,
        pasteles: 1,
        user: "admin@admin.com"
      },
      {
        idpedido: 15,
        fecha_pedido: "2020-Jun-24 ",
        foto: "http://localhost:8000/media/pedido/a_8_69UKEp6.png",
        direccion: "asdfa",
        costo: 2.0,
        aceptado: true,
        estado: 2,
        comentario: "sadfasdf",
        domiciliario: true,
        pasteles: 1,
        user: "admin@admin.com"
      }],
      atr: "-fecha_pedido",
      id:0
    }

    this.send = this.send.bind(this);
    this.cargarPedidos = this.cargarPedidos.bind(this);
    this.changeComponent = this.changeComponent.bind(this);
  }

  componentDidMount() {
    this.cargarPedidos();
    this.reload();
    this.requestUser();
  }

  requestUser() {
		fetch('http://localhost:8000/users/api/auth/user/', {
			method: 'GET',
			credentials: 'include',
			headers: {
			},
		}).then((response) => response.json())
			.then(responseJson => {
				if(!responseJson.is_staff) window.location.pathname = "/";
			}).catch(error => console.error('Error:', error));
	}


  send() {
    this.ws.send(JSON.stringify({
      type: "subscribe",
      id: new Date().getTime(),
      action: 'list',
      model: "pedido.Pedido"
    }))
  }

  addNFT(message) {
    store.addNotification({
      title: "Nuevo pedido",
      message: message.user + " realizo un nuevo pedido",
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

  cargarPedidos(event) {
    const requestOptions = {
      method: 'GET',
      headers: {
        // 'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
      },
      credentials: "include",
    };
    fetch("http://localhost:8000/all_pedidos/'" + this.state.atr + "/", requestOptions)
      .then(response => response.json())
      .then(json => this.setState({
        pedidos: json
      }))
      .catch(error => console.log(error));
  }

  reload() {
    this.ws = new WebSocket("ws://localhost:8000/ws/pedido/")

    this.ws.onopen = evt => {
      console.log("open");
      this.send();
    };

    this.ws.onclose = evt => {
      console.log('disconnected reloadiong')
      this.reload()
    };

    this.ws.onmessage = evt => {
      const message = JSON.parse(evt.data)
      this.setState({ dataFromServer: message })
      this.addNFT(message);
      this.cargarPedidos();
    };

    this.ws.onerror = evt => { console.log(JSON.stringify(evt)) };
  }

  changeComponent(id){
    this.setState({
      id:parseInt(id)
    })
  }

  render() {
    return (
      <div className="container ">
        <ReactNotification />
        <div className="row justify-content-center">
          <div class="col-lg-3 col-12">
            <Menu menu = {this.changeComponent}></Menu></div>
          <div class="col-lg-9 col-12">
            <div className="card-body">
              {this.state.id == 0 && <Pedidos datos={this.state.pedidos}></Pedidos>}
              {this.state.id == 1 && <Banner></Banner>}
              {this.state.id == 2 && <Moderadores></Moderadores>}
              </div>
          </div>
        </div>
      </div>
    );
  }

}

