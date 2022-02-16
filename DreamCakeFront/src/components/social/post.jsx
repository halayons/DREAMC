import './style.scss';
import React from 'react';
import { Comment } from './comment';
import Cookies from 'js-cookie';
import share from '../../static/images/share.png'
import like from '../../static/images/like.png'
import bgInfo from '../../static/images/bgInfo.jpg'

export class Post extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			comments: [],
			id:this.props.post.id,
			like:this.props.post.likes,
			liked:false,
			cake:undefined,
			loaded:false
		};

		this.onInputchange = this.onInputchange.bind(this);
        this.createComment = this.createComment.bind(this);
		this.copiarPastel = this.copiarPastel.bind(this);
	}

	componentDidMount() {
		this.cargarComentarios();
		this.getCake();
	}
	getCake(){
		
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': Cookies.get('csrftoken')
			},
			credentials: "include"
		};

		fetch('http://localhost:8000/pastel_pedido/'+this.props.post.pastel+'/', requestOptions)
			.then(res => res.json())
			.then(json => {
				this.setState({cake: json});
			})
			.catch(error => console.log(error))
			this.setState({loaded:true})
	}

	onInputchange(e){
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
   
	createComment(event){
		event.preventDefault();
		
		const requestOptions = {
            method: 'POST',
            headers: { 
				'Content-Type': 'application/json',
				'X-CSRFToken':Cookies.get('csrftoken')
			},
            credentials: "include",
            body: JSON.stringify({
				comentario : this.state.comentario,
				status : true,
				post : this.props.post.id
			})
        };
		fetch('http://localhost:8000/social/create_com/', requestOptions)
        .then(res => res.json())
        .then(json => {
			this.state.comments.push(json);

            this.setState({
				comments: this.state.comments
			})
			this.setState({comentario:''});
        })
        .catch(error => console.log(error))   
		
	}
	
	enterKey(event){
		if (event.key === "Enter") {
			this.createComment(event);
		  }
	}
	
	paintCakes(p){
		//masa[CH,VA,TL,RV]
		//relleno[AQ,NU,ML,CP]
		let masa=['Chocolate', 'Vainilla','Tres Leches','Redvelvet']
		let relleno=["Arequipe","Nutella","Mermelada", "Crema Pastelera"]
		let cobertura ="Fondant"
		let forma ="Cuadrado"

		if(p.masa=='CH') masa=masa[0]
		if(p.masa=='VA') masa=masa[1]
		if(p.masa=='TL') masa=masa[2]
		if(p.masa=='RV') masa=masa[3]
		
		if(p.relleno=='AQ') relleno=relleno[0]
		if(p.relleno=='NU') relleno=relleno[1]
		if(p.relleno=='ML') relleno=relleno[2]
		if(p.relleno=='CP') relleno=relleno[3]

		
		if(p.cobertura=='CR') cobertura ="Creama"
		if(p.forma=='CI') forma ="Circular"

		
		
		if(this.state.cake!=undefined){
			return(
				<div className="info-cake">
					<p className="">{forma}</p>
					<p className="">{relleno}</p>
					<p className="">{masa}</p>
					<p className="">{cobertura}</p>
				</div>
			);
		}else{
			return <p>Cargando.....</p>
		}
		
	}
	copiarPastel(){
		let id = this.state.cake.id

		const requestOptions = {
            method: 'PUT',
            headers: { 
				'Content-Type': 'application/json',
				'X-CSRFToken':Cookies.get('csrftoken')
			},
            credentials: "include",
        };
		fetch('http://localhost:8000/guardar_pastel/' + id + '/', requestOptions)
        .then(res => res.json())
        .then(json => {
			// alert(JSON.stringify(json))
			this.props.modificar(this.state.cake, 2)
        })
        .catch(error => console.log(error))   
	}
	
	cargarComentarios(){
		fetch("http://localhost:8000/social/comments/" + this.props.post.id+'/')
			.then(response => response.json())
			.then(json => this.setState({
				comments: json
			}))
			.catch(error => console.log(error));
	}
	sendLike(event){	
		event.preventDefault();
	
			if(this.state.liked===false){
				const requestOptions = {
					method: 'PUT',
					headers: { 
						'Content-Type': 'application/json',
						'X-CSRFToken':Cookies.get('csrftoken')
					},
					credentials: "include",
					body: JSON.stringify({
						likes:this.state.like+1
					})
				};
				fetch('http://localhost:8000/social/like/'+ this.props.post.id + "/", requestOptions)
				.then(res => res.json())
				.then(json =>this.setState({like:json.likes}))
				
				var btn = document.getElementById("likeId"+this.state.id);
				btn.style.setProperty('background','#dc3545')
				btn.style.setProperty('border-radius','50%')
				this.setState({liked:true})
			}
			
		}

	render() {
	
		
			return (
				<div class=" card-post  row justify-content-center bg-light" >
						<div class = "card ">
							
							<div className="carousel slide"  id={"post"+this.state.id} data_ride="carousel">
								<div className="carousel-inner carousel-post" >
									<img className=" carousel-item active img-fluid" src = {this.props.post.foto}></img>
									<div className=" carousel-item  bg-cake">
										{this.state.cake!=undefined ?(this.paintCakes(this.state.cake)):(<p>tenemos dificultades para asociar este pastel  {this.state.id, console.log(this.state.id)}</p>)}
									</div>
								</div>
								
								<div class="carousel-control-next" href={"#post"+this.state.id} role="button" data-slide="next">
									<spam class="carousel-control-next-icon" arial-hidden="true"></spam>
									<spam class="sr-only">Siguiente</spam>
								</div>
								<div class="carousel-control-prev" href={"#post"+this.state.id} role="button" data-slide="prev">
									<spam class="carousel-control-prev-icon" aria-hidden="true"></spam>
									<spam class="sr-only">Anterior</spam>
								</div>
							</div>
	
							
	
							<div className="card-body ">
								<div className="row justify-content-start">
									<div className= "col-lg-4 col-sm-3 col-3" >
										<span class ="badge badge-light " type ="button" data-toggle="collapse" data-target={"#cometariosPost"+this.state.id} aria-expanded="false" aria-controls="">{this.state.comments.length} Cometarios </span> 
									</div>
									<div className= "col-lg-2 col-sm-2 col-2">
										<span class ="badge  " type ="button" data-target="" >
											{this.state.like}
											<img className="likes" src="/static/media/like.115883dc.svg" alt="" />
										</span> 
										
									</div>
									
								</div>
				
								<div className="form-row d-flex">
										<input className=" form-control col-sm-8 col-lg-8 col-8" type="text" id="comentario"  placeholder = "Escribe un comentario" value={this.state.comentario}  name="comentario" onChange={this.onInputchange} onKeyPress={e=>this.enterKey(e)}/>
										<div className="  col-2 col-sm-2 col-lg-2">
											<img type="button" id={"likeId"+this.state.id} className="img-fluid  btn-outline-danger reacciones" src={like} alt="" onClick={e=>this.sendLike(e)}/>
										</div>
										<div className="  col-2 col-sm-2 col-lg-2">
										<img type="button" className="img-fluid btn-outline-primary reacciones" src={share} onClick={this.copiarPastel} alt="" />
										</div>
								</div>
								
								
								<div class="row">
										<div class="collapse multi-collapse col-sm-12 " id ={"cometariosPost"+this.state.id}>
											<hr />
											{this.state.comments.map(comment => <Comment comment={comment}></Comment>)}
											
										</div>
								</div>
							</div>
							<hr />
						</div>
					
				</div>
			);
		
	}
}