import React from "react";
import dateFormat from 'dateformat';
import { Update } from "./update";
import Cookies from 'js-cookie';

export class Account extends React.Component {

  constructor(props) {
    super(props);
  }
  deleteUser(event){
    event.preventDefault()
    const requestOptions = {
  method: 'PUT',
  headers: {
    'X-CSRFToken': Cookies.get('csrftoken')
  },
  credentials: "include",
};
    fetch('http://localhost:8000/users/api/auth/user/disable/', requestOptions)
    .then(res => res.json())
    .then(json => { 
        // console.log(json);
        window.location.pathname ="/";
        // window.location.reload()
    })
    .catch(error => console.log(error));
}


  render() {
    return (
      <div className="">
        <div class="col-12 col-lg-6 ">

        <label className="title">Nombre:  </label>
        <label className="field" > {this.props.datos.full_name == " " ? ' Sin nombre' : this.props.datos.full_name}.</label>
        <br></br>
        <br></br>
        <label className="title">Correo: </label>
        <label className="field" > {this.props.datos.email}.</label>
        <br></br>
        <br></br>
        <label className="title">Último inicio: </label>
        <label className="field">  {dateFormat(this.props.datos.last_login, " mm/dd/yyyy")}.</label>
        <br></br>
        <br></br>
        <label className="title">Número de Pasteles Creados: </label>
        <label className="field" > {this.props.datos.pasteles.length}.</label>
        <br></br>
        <br></br>
        </div>

        <div class="col-12 col-lg-3">
        
        <button type="button"  href="#update" className="btn-principal" style={{ width: 11 + 'em' }} data-toggle="modal">Actualizar Datos</button>
        <button  type="button "className="   btn-secundario" style={{ width: 11 + 'em' }} onClick={this.deleteUser}>Eliminar Cuenta</button>
        </div>

        <div className="modal fade" id="update">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-body">
                <Update datos = {this.props.datos}></Update>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secundario btn-pequeño" id="btnModal" data-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}