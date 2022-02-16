import React from "react";
import Cookies from 'js-cookie';

export class Options extends React.Component {

    constructor(props){
        super(props);
        this.setCurrent = this.setCurrent.bind(this);

        this.cerrarSesion = this.cerrarSesion.bind(this);
    }

    cerrarSesion(){
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-CSRFToken':Cookies.get('csrftoken')
            },
            credentials: "include",
        };
        fetch('http://localhost:8000/users/api/auth/logout/', requestOptions)
        .then(res => res.json())
        .then(json =>{
            window.location.pathname = "/"
            window.location.reload()
        })
    }

    setCurrent(event){
        this.props.handleButton(parseInt(event.target.name));
    }
    
    render() {
        return (
            <div className="col-lg-3 col-12">
                    <button name = {0} onClick={this.setCurrent} type="button" className="btn-secundario">Mi Cuenta</button>
                    <button name = {1} onClick={this.setCurrent} type="button" className="btn-secundario">Mis Pasteles </button>
                    <button name = {2} onClick={this.setCurrent} type="button" className="btn-secundario">Mis Pedidos</button>
                    <button type="button" className="btn-secundario " onClick={this.cerrarSesion}>Cerrar Sesión</button>
                
            </div>
        );
    }

}