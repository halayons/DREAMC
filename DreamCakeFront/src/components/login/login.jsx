import './style.scss';
import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import logo from '../../static/images/LOGOFINAL.png';
import swal from 'sweetalert';

class Login extends Component {

  constructor() {
    super()

    this.state = {};

    this.onInputchange = this.onInputchange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  onSubmitForm = async () => {
    let response = await fetch('http://localhost:8000/users/api/auth/login/', {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state)
    })

    if (response.statusText === 'OK') {
      let json = await response.json();
      console.log(json);
      window.location.pathname = "/";
    }
    else {
      let js = await response.json()
      if (response.status === 400) {
        console.log("credenciales incorrectas")
         swal({icon:"error",
        text:'Credenciales incorrectas'});
      } else if (response.status === 403) {
        console.log("sesion ya iniciada " + JSON.stringify(js))
      } else {
        console.log("otro error: " + JSON.stringify(js) + JSON.stringify(response))
      }
    }
        
  }

  onInputchange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const responseGoogle = (response) => {
      console.log(response);
      console.log(response.profileObj);
    }
    const responseFacebook = (response) => {
      console.log(response);
    }

    const componentClicked = () => {
      alert('Evento onClick');
    }

    return (
     <div className="modal fade" id ="login">
        <section className=" modal-dialog">
        <div className=" modal-content">
          <div className=" modal-body ">
            

            <div className="modal-header row justify-content-center">
              <img src={logo} className=" row img-logo col-3" />
            </div>

            <label htmlFor="correo" className ="modalText">Correo:</label>
            <input id="correo"className="form-control " placeholder="Correo" name="email" type="email" value={this.state.email} onChange={this.onInputchange} />
            
            <label htmlFor="contraseña" className="modalText">Contraseña:</label>
            <input id="correo" className="form-control"placeholder="Contraseña" name="password" type="password" value={this.state.password} onChange={this.onInputchange} />
            <br />
            <button className="btn-principal col-12" onClick={this.onSubmitForm} >Continuar</button>
            
            {/*<div className="btn">
              <GoogleLogin
                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                buttonText="Iniciar con Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
          </div>
            {/*<div className="btn">
              <FacebookLogin
                appId="942968703190705"
                autoLoad={false}
                icon="fa-facebook"
                callback={responseFacebook}

                render={renderProps => (
                  <button className="btn btn-outline-primary"  onClick={renderProps.onClick}>Facebook</button>
                )} />
                
            </div>*/}

              <div className="modal-footer justify-content-center">
                 <button type="button" className="btn-secundario btn-mini" id="btnModal" data-dismiss="modal">Cerrar</button>
              </div>
          </div>
        </div>
        
      </section>
    
     </div>
      );
  }
}
export { Login };