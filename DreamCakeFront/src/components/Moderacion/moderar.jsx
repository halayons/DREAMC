import React from "react";
import Cookies from 'js-cookie';
export class Moderar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          status: !this.props.datos.status
        };

        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onSubmitForm() {
        const requestOptions = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
          },
          credentials: "include",
          body:JSON.stringify(this.state)
        };

        fetch('http://localhost:8000/social/mod_post/' + this.props.datos.id +'/', requestOptions)
          .then(response => response.json())
          .then(json => this.setState({
            status: !this.state.status
          }))
          .catch(error => console.log(error));
      }

    render() {
        if (this.props.open) {
            return null;
        }
       
        
        return (
            <button class="btn-moderar" onClick={this.onSubmitForm} >Continuar</button>
        );
    }
}