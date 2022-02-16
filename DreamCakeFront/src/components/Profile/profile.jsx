import React from "react";
import { UserData } from './userData';
import { Footer, Header } from '../landingPage';
import { Options } from "./options";
import { Information } from "./information";
import "./style.scss";

export class Profile extends React.Component {

    constructor(props){
        super(props);

        let user = {
            pasteles: [],
            email: "admin2@admin.com",
            full_name: "",
            is_active: true,
            last_login: "2021-06-24T20:27:53.436704Z",
            is_superuser: true,
            is_staff: true,
            foto: "http://localhost:8000/media/users/default.jpg"
        }

        this.state = {
            user: user,
            datos: user,
            current: 0
        }

        this.handleButton = this.handleButton.bind(this);
    }
    
    componentDidMount() {  
        this.geUser();
    }
    geUser(){
        let requestOptions = {
            method: 'GET',
            credentials: 'include'
        };
        fetch('http://localhost:8000/users/api/auth/user/', requestOptions)
        .then((response) => response.json())
        .then(responseJson => { 
            if(responseJson.hasOwnProperty('email')){
                this.setState({
                    user: responseJson,
                    datos: responseJson
                })
            }
            else window.location.pathname = "/";
            
        })
        .catch(error => console.log(error));
    }

    getPasteles(){
        let requestOptions = {
            method: 'GET',
            credentials: 'include'
        };
        fetch(`http://localhost:8000/pasteles/`, requestOptions)
        .then((response) => response.json())
        .then(responseJson => { 
            this.setState({
                datos: responseJson,
                current: 1
            })
        })
        .catch(error => console.log(error));
    }

    getPedidos(){
        let requestOptions = {
            method: 'GET',
            credentials: 'include'
        };
        fetch(`http://localhost:8000/pedidos/`, requestOptions)
        .then((response) => response.json())
        .then(responseJson => { 
            this.setState({
                datos: responseJson,
                current: 2
            })
        })
        .catch(error => console.log(error));
    }

    handleButton(value){
        switch(value){
            case 0: 
                this.setState({
                    datos: this.state.user,
                    current: 0
                })
                break;
            case 1:
                this.getPasteles();
                break;
            case 2:
                this.getPedidos();
                break;
        }        
    }
 

    render() {
        return (
            <div className="container">
                <UserData user = {this.state.user}></UserData>
                <div className ="row div-bottom">
                    <Options handleButton={this.handleButton}></Options>
                    <Information datos={this.state.datos} current={this.state.current} modificar = {this.props.modificar}></Information>
                </div>
			</div>
        )
    }
}