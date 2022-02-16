import './style.scss';
import React from 'react';
import { Post } from './post';
import Cookies from 'js-cookie';

export class Feed extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			pasteles:undefined
		}
	}
	componentDidMount(){
		this.getCakes();
	}
	getCakes(){
		
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': Cookies.get('csrftoken')
			},
			credentials: "include"
		};

		fetch('http://localhost:8000/pasteles/', requestOptions)
			.then(res => res.json())
			.then(json => {
				this.setState({pasteles: json})
			})
			.catch(error => console.log(error))
	}

	render() {
		if(this.state.pasteles!= undefined){
			return (
					this.props.posts.map(post =><Post modificar={this.props.modificar} post={post}></Post>) 	
			);
		}else{
			return(<div>Cargando...</div>)
		}
	}
}
