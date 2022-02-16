import './style.scss';
import React from 'react';
import { Feed } from './feed';
import { CreatePost } from './createPost';
import Cookies from 'js-cookie';
import añadir from '../../static/images/anadir.png'


export class Social extends React.Component {

	ws = new WebSocket("ws://localhost:8000/ws/socialGeneral/")

	constructor() {
		super();

		this.attrs = {
			1: "likes",
			2: "published_date",
		}

		this.order = {
			asc: "",
			desc: "-"
		}

		this.state = {
			attr: this.attrs[2],
			count: 20,
			order: this.order.desc,
			posts: []
		};

		this.update = this.update.bind(this)
	}

	componentDidMount() {
		this.requestUser();
		this.loadPosts();
		
		/* this.ws.onopen = evt => this.send(); 
		this.ws.onclose = evt => window.location.reload(); 
		this.ws.onmessage = evt => this.loadPosts();
		this.ws.onerror = evt => console.log(JSON.stringify(evt));  */
	}

	requestUser() {
		fetch('http://localhost:8000/users/api/auth/user/', {
			method: 'GET',
			credentials: 'include',
			headers: {
			},
		}).then((response) => response.json())
			.then(responseJson => {
				if(!responseJson.hasOwnProperty('email')) window.location.pathname = "/";
			}).catch(error => window.location.pathname = "/");
	}

	loadPosts() {
		fetch("http://localhost:8000/social/all_posts/" + this.state.order +this.state.attr + "/" + this.state.count+'/')
			.then(response => response.json())
			.then(json => this.setState({
				posts: json
			}))
			.catch(error => console.log(error));
	}
	

	update() {
		this.loadPosts()
	}

	send() {
		this.ws.send(JSON.stringify({
			type: "subscribe",
			id: new Date().getTime(),
			action: 'list',
			model: "social.Post"
		}))
	}

	render() {

		return (
			<div className="container">
				<CreatePost update={this.update} />
				<div className="row justify-content-center">
					<div className="col-lg-6 col-sm-8 col-12">
						<Feed modificar={this.props.modificar} posts={this.state.posts} />
					</div>
				</div>
			</div>
		);
	}
}




