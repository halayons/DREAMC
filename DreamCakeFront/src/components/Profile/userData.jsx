import React from "react";

export class UserData extends React.Component {

	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div className="card">
				<div className="user_data">
					<div class = "div_image">
					<img className="img_profile" src ={this.props.user.foto}></img>
					</div>
					<div className = "div_text ">
						<p className ="user-name ">¡Bienvenido,  {this.props.user.full_name == "" ? 'Caker' : this.props.user.full_name/*.substr(0, this.props.user.full_name.indexOf(" "))*/}!</p>
					</div>
				</div>
			</div>
		);
	}
}
