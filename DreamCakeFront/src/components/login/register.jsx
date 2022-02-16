import React from "react";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import logo from '../../static/images/LOGOFINAL.png';
import { Login } from "./login";
import swal from 'sweetalert';

export class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.onInputchange = this.onInputchange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onInputchange(e) {
        this.setState({
            [e.target.name]: e.target.value,

        })
    }

    onSubmitForm(event) {
        event.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify(this.state)
        };

        fetch('http://localhost:8000/users/api/auth/registration/', requestOptions)
            .then(res => {
                return res.json()
            })
            .then(json => {
                this.login()
            })
            .catch(error => console.log(error))
    }

    login = async () => {
        console.log(this.state)
        let response = await fetch('http://localhost:8000/users/api/auth/login/', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })

        if (response.statusText === 'OK') {
            let json = await response.json();
            console.log(json);
            swal({icon:"success",
            text:'Registro exitoso'});
            
        }
        else {
            let js = await response.json()
            if (response.status === 400) {
                console.log("credenciales incorrectas")
                swal({icon:"error",
                text:'Datos incorrectos'});
            } else if (response.status === 403) {
                console.log("sesion ya iniciada " + JSON.stringify(js))
                swal({icon:"error",
                text:'sesion ya iniciada',
                });
            } else {
                console.log("otro error: " + JSON.stringify(js) + JSON.stringify(response))
                swal({icon:"error",
                text:"otro error: " + JSON.stringify(js) + JSON.stringify(response)});
            }
        }

        

    }

    render() {

        const responseGoogle = (response) => {
            console.log(response);
            console.log(response.profileObj);
        }
        const responseFacebook = (response) => {
            console.log(response);
        }


        return (
            <div>

                <div className="modal fade" id="register" aria-hidden="true">
                    <div className="modal-dialog" >
                        <div className="modal-content" role="document">
                            <div className="modal-body ">
                                <div className="modal-header row justify-content-center">
                                    <img src={logo} className=" row img-logo col-3" />

                                </div>
                                <div className="form">
                                    {/* <input placeholder= "Nombre" value={this.state.name} onChange={this.onChange.bind(this)} name="name" id="name" type="text" /> */}
                                    <label className="modalText" htmlFor="email">Correo:</label>
                                    <input className="form-control" placeholder="Correo" value={this.state.email} onChange={this.onInputchange} name="email" id="email" type="email" />
                                    {/* <input placeholder= "Usuario" value={this.state.username} onChange={this.onChange.bind(this)} name="username" id="username" type="text" /> */}
                                    <label className="modalText" htmlFor="password1">Contraseña:</label>
                                    <input className="form-control " placeholder="Contraseña" value={this.state.password} onChange={this.onInputchange} name="password" id="password1" type="password" />
                                    <label className="modalText" htmlFor="password2">Confirmar contraseña:</label>
                                    <input className="form-control" placeholder="Confirmar contraseña" value={this.state.password2} onChange={this.onInputchange} name="password2" id="password2" type="password" />
                                    <br />
                                    {/*<p>{JSON.stringify(this.state)}</p>*/}
                                    <button className="btn-principal" onClick={this.onSubmitForm}>Registrarse</button>
                                    {/* <spam>{this.state.message}</spam> */}
                                    <br />
                                    {/*
                                    <div className="btn col-12">
                                        <GoogleLogin
                                            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                                            buttonText="Iniciar con Google"
                                            onSuccess={responseGoogle}
                                            onFailure={responseGoogle}
                                            cookiePolicy={'single_host_origin'}
                                        />
                                    </div>
                                    <br />
                                    <div className="btn col-12  ">
                                        <FacebookLogin
                                            appId="942968703190705"
                                            autoLoad={false}
                                            icon="fa-facebook"
                                            callback={responseFacebook}

                                            render={renderProps => (
                                                <button className="facebook btn btn-outline-primary" onClick={renderProps.onClick}>Facebook</button>
                                            )} />
                                            </div>*/}


                                    <div className="modal-footer">
                                        <button type="button" className="btn-secundario btn-mini" id="btnModal" data-dismiss="modal">Cerrar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <script src="node_modules/jquery/dist/jquery.slim.min.js"></script>
                <script src="node_modules/popper.js/dist/umd/popper.min.js"></script>
                <script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
            </div>
        );
    }
}