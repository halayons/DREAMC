import './styles.scss';
import React from 'react';
import { Report } from './report';
import { CommentsReport } from './commentsReport';
import Cookies from 'js-cookie';


export class Mod extends React.Component {

	ws = new WebSocket("ws://localhost:8000/ws/socialGeneral/")

	constructor() {
		super();

		this.state = {
			open: true,
			open1: false,
			posts: [],
		};
	}

	componentDidMount() {
		this.requestUser();
		this.loadPosts();

		this.ws.onopen = evt => this.send();
		this.ws.onclose = evt => window.location.reload();
		this.ws.onmessage = evt => this.loadPosts();
		this.ws.onerror = evt => console.log(JSON.stringify(evt));
	}

	loadPosts() {
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': Cookies.get('csrftoken')
			},
			credentials: "include",
		};
		fetch('http://localhost:8000/social/all_posts/', requestOptions)
			.then(response => response.json())
			.then(json => this.setState({
				posts: json
			}))
			.catch(error => console.log(error));
	}

	requestUser() {
		fetch('http://localhost:8000/users/api/auth/user/', {
			method: 'GET',
			credentials: 'include',
			headers: {
			},
		}).then((response) => response.json())
			.then(responseJson => {
				if(!responseJson.is_staff) window.location.pathname = "/";
			}).catch(error => console.error('Error:', error));
	}

	openComponent(name) {
		switch (name) {
			case "Report":
				this.setState({ open: !this.state.open });
				this.setState({ open1: false })
				break;
			case "Comments":
				this.setState({ open: false, open1: !this.state.open1 });
				break;
			default:
				this.setState({ open: false, open1: false });
		}
	};

	send() {
		this.ws.send(JSON.stringify({
			type: "subscribe",
			id: new Date().getTime(),
			action: 'list',
			model: "social.Post"
		}))
	}

	render() {
		const { open, open1 } = this.state;
		return (
			<div>


				<div class="d-flex justify-content-center">
					<button type="button" class="btn-navbar" onClick={() => { this.openComponent("Report") }}>
						Moderar Publicaciones </button>
					<button type="button" class="btn-navbar" onClick={() => { this.openComponent("Comments") }}>
						Moderar Comentarios </button>
				</div>

				{open && <Report datos={this.state.posts} />}
				<hr />
				{open1 && <CommentsReport datos={this.state.posts} />}

				<script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
			</div>

		)
	}
}
