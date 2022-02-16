import React from 'react';
import Cookies from 'js-cookie';
import '../style.scss';
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

export class CreateBanner extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			file: '',
			imagePreviewUrl: '',
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleImageChange = this.handleImageChange.bind(this);
	}

	handleChange(event) {
		let name = event.target.name
		console.log(name)

		if (name == "titulo") this.setState({ title: event.target.value })
		if (name == "texto") this.setState({ text: event.target.value })
		if (name == "abstract") this.setState({ abstract: event.target.value })
		if (name == "status") this.setState({ status: event.target.value })
	}

	handleImageChange(e) {
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			this.setState({
				file: file,
				imagePreviewUrl: reader.result,
			});
		}

		reader.readAsDataURL(file)
	}


	crearBanner(e) {
		console.log(this.state)
		let form_data = new FormData()
		form_data.append('title', this.state.title)
		form_data.append('text', this.state.text)
		form_data.append('abstract', this.state.abstract)
		form_data.append('status', this.state.status)
		form_data.append('image', this.state.file)

		const requestOptions = {
			method: 'POST',
			headers: {
				'X-CSRFToken': Cookies.get('csrftoken')
			},
			credentials: "include",
			body: form_data
		};

		fetch('http://localhost:8000/banner/create/', requestOptions)
			.then(res => res.json())
			.then(json => {
				// this.props.update()
			})
			.catch(error => console.log(error))

	}


	handleSubmit(event) {
		this.crearBanner(event);
		event.preventDefault();
	}



	render() {

		if (!this.props.open) {
			return null;
		}

		return (

			<div>
				<form onSubmit={this.handleSubmit} className="container">
					<div className="form-group">
						<label className="btn-secundario btn-mini" for="file"><span>Imagen</span></label>
						<input type="file" className="col-sm " id="file" onChange={this.handleImageChange} accept="image/*"></input>
					</div>

					<input type="file" className="col-sm " id="file" onChange={this.handleImageChange} accept="image/*"></input>
					<input name="titulo" type="text" placeholder="Titulo" onChange={this.handleChange} ></input>
					<input name="texto" type="text" placeholder="Texto" onChange={this.handleChange}></input>
					<input name="abstract" type="text" placeholder="Abstract" onChange={this.handleChange}></input>
				
						<label for="estado">Estado activo</label>
						
							<input id="estado" name="status" type="checkbox" placeholder="status" onChange={this.handleChange}></input>
						
					
					<div className="col-4">
						<button className="btn-principal btn-mediano" type="submit" value="Crear">Crear</button>
					</div>
				</form>
				<button className="btn-secundario btn-mini" onClick={this.props.onClose}>Salir</button>

			</div>

		);
	}
}