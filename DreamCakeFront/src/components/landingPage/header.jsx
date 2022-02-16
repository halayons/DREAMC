import React from 'react';
import HeaderUpdater from './headerUpdater';
import logo from '../../static/images/logo3.svg';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

export class Header extends React.Component{

    
    render(){
            return(
            <header>
                <div className="jumbotron-header "> 
                         <HeaderUpdater  notifications = {this.props.notifications}/>                                     
                </div>

            </header>
            );
        }
}



