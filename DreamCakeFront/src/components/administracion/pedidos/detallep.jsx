import React from "react";
import logo from '../../../static/images/logo.svg';

export class Detallep extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};


  }

  render() {
    return (
      <div className="modal fade" id={'a'+this.props.row.idpedido }>
        <section className="modal-dialog" >
          <div className="modal-content">
            <div className="modal-body ">

              {console.log(this.props.row)}


              <div className="modal-body badge ">
                  <img className="img-fluid"src={this.props.row.foto} alt="" />
                  <p>Comentario:{this.props.row.comentario}</p>
                  <p>Fecha:{this.props.row.fecha_pedido}</p>
                  <p>Direccion:{this.props.row.direccion}</p>
                  <p>ID pedido:{this.props.row.idpedido}</p>
              </div>




              <div className="modal-footer justify-content-center">
                <button type="button" className="btn btn-outline-info" id="btnModal" data-dismiss="modal">Cancelar</button>
              </div>
            </div>
          </div>

        </section>

      </div>
    );
  }

}

