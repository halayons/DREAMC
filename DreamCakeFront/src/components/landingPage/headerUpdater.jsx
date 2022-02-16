import React from 'react';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import campana from "../../static/images/campana.svg"
import { Notifications } from "./notifications/notifications"
import { Register } from '../login/register';
import { Login } from '../login/login';
import Cookies from 'js-cookie';
import logo from '../../static/images/LOGOFINALBANNER.png';

export class HeaderUpdater extends React.Component {
    constructor() {
        super();
        this.state = {
            userInfo: null,
            open: true,
            open1: true,
            notification: ''
        }
        //this.userInfo = null;
    }

    componentDidMount(e) {
        

        fetch('http://localhost:8000/users/api/auth/user/', {
            method: 'GET',
            credentials: 'include',
            headers: {
            },
        }).then((response) => response.json())
            .then(responseJson => {
               this.setState({ userInfo: responseJson })
            }).catch(error => console.error('Error:', error));
    }

    registrarse() {
        window.location.pathname = "/accounts/signup/"
    }

    iniciarSesion() {
        this.openModal();
    }

    openModal = (e) => {
        let mod = document.getElementById(e.target.value);
        mod.append("body")
        console.log(e.target.value);
    };

    putData = (e) => {
        this.setState({ notification: e });
    }
    
    logOut(e){
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-CSRFToken':Cookies.get('csrftoken')
            },
            credentials: "include",
            body: JSON.stringify({
                likes:this.state.like+1
            })
        };
        fetch('http://localhost:8000/users/api/auth/logout/', requestOptions)
        .then(res => res.json())
        .then(json =>{
            window.location.pathname = "/"
            window.location.reload()
        })
        
    }
    


    render() {
        // <Notification putData={this.putData}/> 
        //var user_name = this.state.userInfo.short_name;
        console.log(this.props)
        console.log('isNull?' + this.state.userInfo == null);
        if (this.state.userInfo == null || this.state.userInfo.hasOwnProperty('detail')) {
            return (
               <div>
                    <nav class="navbar  navbar-dark jumbotron-header navbar-expand-md fixed-top justify-content-around " >
                        <a class = "navbar-brand" href = "/">
                                    <img class="img-fluid rounded-circle header-logo" src={logo} alt="logo DreamCake"/>
                        </a>

                        <button className="navbar-toggler" type ="button" data-toggle ="collapse" data-target ="#navbarSupportedContend" aria-controls="navbarNavDropdown"  aria-expanded="false" aria-label="Toggle navigation">
                            <spam className ="navbar-toggler-icon"/>
                        </button>
                                <div class = "collapse navbar-collapse text-center" id ="navbarSupportedContend">
                                    <ul class ="navbar-nav mr-auto ">
                                    <li class =" nav-item"><a class="navbarText" href ="/">Inicio</a></li>
                                    <li class =" nav-item"><a class="navbarText" href ="/crearPastel/">Crear Pastel</a></li>
                                    </ul>

                                    <button type="button" className="btn-principal btn-pequeño align-self-end" data-toggle="modal" data-target="#login" value="login" data-backdrop="false" y data-dismiss="modal">Iniciar Sesión</button>
                                    <button type="button" className="btn-secundario  btn-pequeño" data-toggle="modal" data-target="#register" value="register" data-backdrop="false" data-dismiss="modal" >Registrarse</button>
                                </div> 
        
                      
                        <Register />                       
                        <Login />
                    </nav>
               </div>
            );
        }
        else {
            return (
                
                   <div > 
                  



                        <nav class="navbar navbar-dark  jumbotron-header navbar-expand-md fixed-top justify-content-around  " >
                        
                            <a class = "navbar-brand" href = "/">
                                <img class="img-fluid rounded-circle header-logo" src={logo} alt="one piece"/>
                            </a>
                                   
                                <button class ="navbar-toggler" type ="button" data-toggle ="collapse" data-target ="#navbarSupportedContend" aria-controls="navbarNavDropdown"  aria-expanded="false" aria-label="Toggle navigation">
                                    <spam class ="navbar-toggler-icon"/>
                                </button>
                                <div class = "collapse navbar-collapse text-center  " id ="navbarSupportedContend">
                                        <ul class ="navbar-nav mr-auto ">
                                        <li class =" nav-item"><a class="navbarText" href ="/">Inicio</a></li>
                                        <li class =" nav-item"><a class="navbarText" href ="/crearPastel/">Crear Pastel</a></li>
                                        <li class =" nav-item"><a class="navbarText" href ="/social">Posts</a></li>
                                        <li class =" nav-item"><a class="navbarText" href ="/profile">Perfil</a></li>
                                        <li class =" nav-item"><a class="navbarText" href="#" onClick ={e=>this.logOut(e)}>Salir</a></li>
                                        
                                        
                                        </ul>

                                        {/* barra notificaciones*/}
                                        <div className="collapse multi-collapse  fade pop-notification" id="notification">
                                            <Notifications  notifications = {this.props.notifications}></Notifications>
                                        </div>

                                        <img type="button" className="campana-icon img-fluid rounded-circle" src={campana} alt="notificacion" data-toggle="collapse" data-target="#notification" aria-expanded="false" aria-controls="" />
                                        <a href ="/profile">
                                            <img className=" rounded-circle header-profile" src={this.state.userInfo.foto} />
                                        </a>
                                           
                                </div> 
                               
                             
                        </nav>

                    </div>
                    
        
            );
        }
    }
}
export default HeaderUpdater;