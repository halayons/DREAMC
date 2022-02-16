import './style.scss';
import React from 'react';

export class Comment extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			data:this.props.comment,
			date:this.props.comment.fecha.substr(0,10),
		}
	}
	

	render(){
		return  (
			<div className="row">
				<div className="col-lg-3 col-sm-3 col-3">
					<img className="img-perfil" src="http://localhost:8000/media/postImages/321_jbjNKPP.png" alt="perfil" />
				</div>
				<div className= "col-lg-9 col-sm-9 col-9">
					<div className="badge badge-light item-comments text-wrap">
						<b><span>{this.state.data.usuario}:</span> </b><br />
						<p>{this.state.data.comentario}</p><br />
					</div>
					<p className="fecha">{this.state.date}</p>
				</div>
				
				
			</div>

		);
	}
}