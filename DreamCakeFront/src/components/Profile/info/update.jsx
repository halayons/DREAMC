import React from "react";
import Cookies from 'js-cookie';
import foto from '../../../static/images/foto1.png';


export class Update extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            full_name: this.props.datos.full_name,
            foto: ''
        };

        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    onSubmitForm(event){
        event.preventDefault()
        console.log(this.state.full_name)
        
        let form_data = new FormData();
            form_data.append('foto', this.state.foto);
            form_data.append('full_name', this.state.full_name);
        const requestOptions = {
			method: 'PUT',
			headers: {
				'X-CSRFToken': Cookies.get('csrftoken')
			},
			credentials: "include",
            body: form_data
		};
        fetch('http://localhost:8000/users/api/auth/user/', requestOptions)
        .then(res => res.json())
        .then(json => { 
            console.log(json);
            window.location.pathname ="/profile"; 
        })
        .catch(error => console.log(error));
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
            window.location.reload()
        })
        .catch(error => console.log(error));
    }

    render(){
       
        
        return(
            <form className ="form">
                <div className=" form-group">
                    <div className="update form-group">
                        <label for="update-nombre"> Nombre </label>
                        <input type = "text" className= "update-name form-control" id="update-nombre"  onChange={(e)=>{this.setState({full_name: e.target.value})}} placeholder="Ingresar Nombre"  ></input>
                    </div>
                </div>
                <div className="form-group justify-content-center">
                    <label for="update-photo"  className=" btn-secundario">
                        Escoger foto <img className="foto" src={foto}/>
                    </label>
                    <input type ="file" className="update-photo"  id="update-photo" onChange={(e)=>this.setState({foto:e.target.files[0]})} accept="image/*"></input>
                    <div id="draw"></div>
                </div>
                    
                <div className="row justify-content-center">
                    {/* <button  className="btn btn-outline-info" onClick={this.deleteUser}>Borrar</button> */}
                    <button className="btn-principal btn-mediano" onClick = {this.onSubmitForm}>Actualizar datos</button>
                </div>
            </form>
        )
    }

}
