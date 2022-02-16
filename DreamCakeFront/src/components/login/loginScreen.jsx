import React from "react";
import {Login} from "./login.jsx";
import { Button } from 'react-bootstrap';


export class LoginScreen extends React.Component {

  state = {
    open: false
};

openModal = (e) => {
    e.preventDefault();
    this.setState({
        open: !this.state.open
    });
};

render() {
    return (
        <main>
           {/*  <section>
                <h1>React-Modal</h1>
                <button
                    onClick={(e) => {
                        this.openModal(e);
                    }}>
                    Open Modal
                </button>
            </section>

            <Login open={this.state.open} onClose={this.openModal} /> */}
        </main>
    );
}
}






