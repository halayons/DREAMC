import React from 'react';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";
import {SliderPicker} from 'react-color';
import { Social, Footer, Header} from "../landingPage/index";
import {Login} from '../login/login'
import {Register} from '../login/register'
import Cookies from 'js-cookie';
import { event, get } from 'jquery';


export class ModPedido extends React.Component{
    
    render()    {
        return(
            <div>
                <Header></Header>
                <Index></Index>
                <Footer></Footer>
            </div>
    
        )
    }
}

export  class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                masa: 'TL',
                relleno: '',
                cobertura: '',
                color: '#FFFFFF',
                porciones: 1,
                forma:'CI',    
                mensaje:'',
                status_pastel:true,
                num_pisos:1,
                costo:0,

               // Tematica:'',
               // Observaciones:''
        };
    }

    /*componentDidMount(){   
        let userInfo =  null;
        fetch('http://localhost:8000/users/api/auth/user/',{
            method: 'GET',
            credentials:'include',
            headers: {                
            },  
        }).then((response) => response.json())
            .then(responseJson => { 
                console.log('Esta es la info del usuario');
                userInfo = responseJson
                console.log(userInfo)})
            .catch(error => console.error('Error:', error));    
            
        
        fetch('http://localhost:8000/modificar_pastel/2/', {
            method: 'GET',
            credentials:'include',
            headers: {                
            },            
        }).then((response) =>{
            console.log('Esta es la info del pastel del usuario');
            console.log(response.json());
        } )
        .catch(error => console.error('Error:', error));        
    } */
    
    actualizar(){
        let chocolate ='url("https://www.transparenttextures.com/patterns/45-degree-fabric-dark.png")';
        let vainilla ='url("https://www.transparenttextures.com/patterns/asfalt-dark.png")';
        let leches = ' url("https://www.transparenttextures.com/patterns/ravenna.png")';
        let velvet =  'url("https://www.transparenttextures.com/patterns/crisp-paper-ruffles.png")';
        let textura = "";
        let color = "";
        let colorCubierta = "";

        if(this.state.masa === 'RV'){
            textura = velvet;
        }
        else if(this.state.masa === 'TL'){
            textura = leches;
        }
        else if(this.state.masa === 'VA'){
            textura = vainilla;
        }
        else if(this.state.masa === 'CH'){
            textura = chocolate;
        }
        document.documentElement.style.setProperty('--textura-pastel',textura);

        if(this.state.relleno === 'AQ'){
            color = "#995c2e";
        }
        else if(this.state.relleno === 'NU'){
            color = "#69391d";
        }
        else if(this.state.relleno === 'ML'){
            color = "#5c0c15b5";
        }
        else if(this.state.relleno === 'CP'){
            color = "#e4cc8ba1";
        }
        document.documentElement.style.setProperty('--color-pastel2',color);

        if(this.state.cobertura === 'FD'){
            colorCubierta = "#39caf7";
        }
        else if(this.state.cobertura === 'CR'){
            colorCubierta = "#e0d8cd";
        }
        document.documentElement.style.setProperty('--color-pastel3',colorCubierta);

    }
    
    seleccionF =(event)=> {
        this.setState({forma:event.target.id});
        let btn = document.getElementById('dropdownMenuForma');
        btn.textContent=event.target.textContent;
        btn.style.setProperty('background','#17a2b859')
     }
    seleccionM =(event)=> {
        this.setState({masa:event.target.id});
        var btn = document.getElementById('dropdownMenuMasa');
        btn.textContent =event.target.textContent;
        btn.style.setProperty('background','#17a2b859')
     }
    seleccionR =(event)=> {
        this.setState({relleno:event.target.id});
        var btn = document.getElementById('dropdownMenuRelleno');
        btn.textContent =event.target.textContent;
        btn.style.setProperty('background','#17a2b859')
    }
    seleccionC =(event)=> {
        this.setState({cobertura:event.target.id});
        var btn = document.getElementById('dropdownMenuCubierta');
        btn.textContent =event.target.textContent;
        btn.style.setProperty('background','#17a2b859')
    }
    seleccionP =(event)=> {
        this.setState({porciones:parseInt(event.target.id)});
        var btn = document.getElementById('dropdownMenuPorciones');
        btn.textContent =event.target.textContent;
        btn.style.setProperty('background','#17a2b859')
    }
    //seleccionT =(event)=> {this.setState({Tematica:event.target.id})}
    seleccionColor =(event)=> {this.setState({color:event.target.id});}
    getData=(info)=>{
        this.setState({Mensaje:info.Men})
        this.setState({Observaciones:info.Obs})
    }
   
    postearPastel() {
        console.log("vamos a postear el pastel");
        console.log(Cookies.get('csrftoken'))
       fetch('http://localhost:8000/crear_pastel/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken':Cookies.get('csrftoken')
                
            },
            credentials:'include',
            body: JSON.stringify(this.state)
        }).then((response) => response.json())
        .catch(error => console.error('Error:', error));
        
    }
    editarPastel() {
        console.log("vamos a editar el pastel");
       fetch('http://localhost:8000/midificar_pastel/'+this.state.id+'/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken':Cookies.get('csrftoken')
                
            },
            credentials:'include',
            body: JSON.stringify(this.state)
        }).then((response) => response.json())
        .catch(error => console.error('Error:', error));
        
    }

    
     
    handleChangeComplete = (color) => {
        this.setState({ color: color.hex });
        
    };

    
     
    render() {
        let color =this.state.color;   
        const f =this.state.forma;
        document.documentElement.style.setProperty('--color-pastel',color);
        this.actualizar()
        

        return (
            

            <div className ="container row d-flex f-wrap justify-content-center ">
                
                                   
                    <div className ="opciones col-lg-3  col-sm-6 ">
                        <div style ={{margin:5+'px'}}>
                            <div class="dropdown">
                                <button class="btn btn-outline-info  btn-reserva dropdown-toggle" style ={{width:11+'em'}} type="button" id="dropdownMenuForma" data-toggle="dropdown" aria-expanded="false">
                                    Forma
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a class="dropdown-item"   onClick= {this.seleccionF} id="CI" selected>Redondo</a></li>
                                    <li><a class="dropdown-item" onClick= {this.seleccionF} id="CU"> Cuadrado</a></li>
                                </ul>
                            </div>
                            
                        </div>
                        <div style ={{margin:5+'px'}}>
                            <div class="dropdown">
                                <button class="btn btn-outline-info  btn-reserva dropdown-toggle" style ={{width:11+'em'}} type="button" id="dropdownMenuMasa" data-toggle="dropdown" aria-expanded="false">
                                    Masa
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a class="dropdown-item"   onClick= {this.seleccionM} id="RV">RedVelvet</a></li>
                                    <li><a class="dropdown-item" onClick= {this.seleccionM} id="TL"> Tres Leches</a></li>
                                    <li><a class="dropdown-item" onClick= {this.seleccionM} id="VA"> Vainilla </a></li>
                                    <li><a class="dropdown-item" onClick= {this.seleccionM} id="CH">  Chocolate</a></li>
                                </ul>
                            </div>
                            
                        </div>

                        <div style ={{margin:5+'px'}}>
                            <div class="dropdown">
                                <button class="btn btn-outline-info  btn-reserva dropdown-toggle" style ={{width:11+'em'}} type="button" id="dropdownMenuRelleno" data-toggle="dropdown" aria-expanded="false">
                                    Relleno
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a class="dropdown-item"   onClick= {this.seleccionR} id="AQ">Arequipe</a></li>
                                    <li><a class="dropdown-item" onClick= {this.seleccionR} id="NU"> Nutella</a></li>
                                    <li><a class="dropdown-item" onClick= {this.seleccionR} id="ML"> Mermelada  </a></li>
                                    <li><a class="dropdown-item" onClick= {this.seleccionR} id="CP"> CremaPastelera </a></li>

                                </ul>
                            </div>
                            
                        </div>
                        <div style ={{margin:5+'px'}}>
                            <div class="dropdown">
                                <button class="btn btn-outline-info  btn-reserva dropdown-toggle" style ={{width:11+'em'}} type="button" id="dropdownMenuCubierta" data-toggle="dropdown" aria-expanded="false">
                                    Cubierta
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a class="dropdown-item"   onClick= {this.seleccionC} id="FD">Fondant </a></li>
                                    <li><a class="dropdown-item" onClick= {this.seleccionC} id="CR">Crema</a></li>
                                   {/* <li><a class="dropdown-item" onClick= {this.seleccionC} id="Crema de Chantilly"> Crema de Chantilly </a></li>
                                    <li><a class="dropdown-item" onClick= {this.seleccionC} id="Crema de Mantequilla"> Crema de Mantequilla </a></li>
                                       <li><a class="dropdown-item" onClick= {this.seleccionC} id="Sin Cobertura"> Sin Cobertura </a></li>*/}
                                </ul>
                            </div>
                            
                        </div> 
                        <div style ={{margin:5+'px'}}>
                            <div class="dropdown">
                                <button class="btn btn-outline-info  btn-reserva dropdown-toggle" style ={{width:11+'em'}} type="button" id="dropdownMenuPorciones" data-toggle="dropdown" aria-expanded="false">
                                    Porciones
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a class="dropdown-item"   onClick= {this.seleccionP} id="15">1-35 </a></li>
                                    <li><a class="dropdown-item" onClick= {this.seleccionP} id="2">35-60 </a></li>
                                    <li><a class="dropdown-item" onClick= {this.seleccionP} id="3"> 60-100</a></li>
                                </ul>
                            </div>
                            
                        </div> 
                        
                        <div style ={{margin:10+'px', width:10.5+'em',marginLeft:'auto',marginRight:'auto'}}>
                            <SliderPicker color = {this.state.color}
                            onChangeComplete ={this.handleChangeComplete}>
                            </SliderPicker>
                        </div>
                        
                    </div>
                    <div className= " col-lg-4 col-sm-6 " >
                        
                       {f=='CI' ?(<Pastel2></Pastel2>,<Pastel></Pastel>) : (<PastelC></PastelC>)}
                    </div>
                    <div className=" col-lg-4  col-sm-12 " style ={{marginTop:10+'px'}}>
                        <Mensaje getData={this.getData}   Pastel={this.state} ></Mensaje> 
                        
                    </div>
                   
                    
            </div>
               
                        
        )
    }

}

export  class Pastel extends React.Component{
    render(){
        return(
            
                <div className ='draw'> 
                    <div className="bandeja"></div>
                    <div className="pastel " > </div>
                    <div className="pastelB tapas">
                        <div className="pastel pasteltwo " ></div>
                        <div className="pastelT pastelTtwo"></div>
                        <div className="pastelB pastelBtwo"></div>
                    </div>
                    <div className="pastelT tapas"></div>
                    <div className="pastelCubierta1 cubierta"></div>
                    <div className="pastelCubierta2 cubierta"></div>
                    <div className="pastelCubierta3 cubierta"></div>
                    <div className="pastelCubierta4 "></div>
                    <div className="pastelCubierta5 "></div>
                    <div className="pastelTCubierta "></div>
                    
                </div>
            
        )
    }
}
export  class PastelC extends React.Component{
    render(){
     
        return(
            <div class="contenedor">

                    <div class="cubo">
                      <div class="uno"></div>
                      <div class="dos"></div>
                      <div class="tres"></div>
                      <div class="cuatro"></div>
                      <div class="cinco"></div>
                      <div class="seis"></div>
                  </div>
                  </div>
                
        )    
    
}
}
export class Pastel2 extends React.Component{
    
    render(){
        

        return(
            <div>
                <canvas className="canvas"></canvas>
                <input type="color" id ="color"/> 
                <input type="range" id ="grosor"  min="1" max="5" value="1"/>
            </div>

        );
    }
}
export class LoginOrRegister extends React.Component{
    render(){
        return(
            <div>
                <ul class="nav nav-tabs" id ="myTab" role ="tablist">
                    <li class ="nav-item">
                        <a class ="nav-link active badge badge-info" id ="login-tab" data-toggle ="tab" href ="#login" role ="tab" aria-controls ="login" aria-selected = "true"><span>Login</span> </a>
                    </li>
                    <li class ="nav-item">
                        <a class ="nav-link badge badge-info" id ="register-tab" data-toggle ="tab" href ="#register" role ="tab" aria-controls ="resgister" aria-selected ="false"><span>Register</span></a>
                    </li>
                </ul>

                <div class ="tab-content " id ="myTabContent">
                    <div class="tab-pane fade  show active " id ="login" role="tabpanel" aria-labelledby="login-tab">
                        <div class="card  ">
                            <Login></Login>
                        </div>
                    </div>
                    <div class="tab-pane fade " id ="register" role ="tabpanel" aria-labelledby ="register-tab">
                        <div class="card ">
                           <Register></Register>
                        </div>
                    </div>
                </div>
                
                
            </div>
            

        )
    }
}


export class Mensaje extends Index{
    constructor(props) {
        super(props);
        this.state={
            Men:'',
            Obs:'',
            log:'1',
            user:'',
            pastel:-1,
        };
    }
    getM=(e)=>{
       this.setState({Men: e.target.value})
    }
    getO=(e)=>{
        this.setState({Obs: e.target.value})
        console.log(this.state, this.props.pastel)

     }
    componentDidMount = () => {

        let requestOptions ={
            method: 'GET',
            //headers: { 'Content-Type': 'application/json', 'Authorization':"Bearer "+Cookies.get("csrftoken"),"Host":"localhost"},
            credentials:'include'
         
        };
        
        fetch('http://localhost:8000/users/api/auth/user/',requestOptions)
            .then((response) => response.json())
            .then(responseJson => {  if(responseJson.email!=undefined){this.setState({log:'0',user:responseJson.email})} }
            );
    }
    userExist = () => {

        let requestOptions ={
            method: 'GET',
            //headers: { 'Content-Type': 'application/json', 'Authorization':"Bearer "+Cookies.get("csrftoken"),"Host":"localhost"},
            credentials:'include'
         
        };
        console.log("el usuario automatico=")
        fetch('http://localhost:8000/users/api/auth/user/',requestOptions)
            .then((response) => response.json())
            .then(responseJson => { console.log("email:"+responseJson.email); if(responseJson.email!=undefined){this.setState({log:'0'})} }
            );
    }
    postearPastel() {

      if (this.state.pastel == -1){
        fetch('http://localhost:8000/crear_pastel/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken':Cookies.get('csrftoken')
                
            },
            credentials:'include',
            body: JSON.stringify(this.props.Pastel)
        }).then((response) => response.json())
        .catch(error => console.error('Error:', error))
        .then(response =>( console.log("Pastel "+response.data.id), this.setState({pastel:response.data.id}))  );
      }
    }
    
   
    
   
    render(){
        const f =this.state.log;
        const {getData}= this.props;
        return(
            
        <div>
            <form className ="" style ={{border:'#17a2b8', color:'#17a2b8'}}>
                <div className="form-row">
                    <label for ="mensaje">Mensaje</label>
                    <textarea required value={this.state.Men}  onChange={this.getM} type="text" className="form-control" ref={this.mensaje} id ="mensaje "placeholder="Mensaje" rows="2"></textarea>
                </div>
                <div className="form-row">
                    <label for ="observaciones">Comentarios</label>
                    <textarea required value={this.state.Obs}  onChange={this.getO} type ="text" className="form-control" ref={this.observaciones}id ="observaciones" placeholder ="Comentarios sobre el pedido" rows="3"></textarea>
                </div>
            </form>

            <div class="formulario" style ={{marginTop:10+'px'}} >
                <button type="button" onClick={()=>getData(this.state),this.userExist,this.postearPastel.bind(this)} href ="#emergente" className="btn btn-info btn" style={{ width:11+'em'}} data-toggle ="modal">Continuar</button>
                <div className="modal fade" id="emergente">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            
                            <div className="modal-body">
                            {f=='0' ? ( <Formulario datos={this.state}></Formulario>):(<LoginOrRegister></LoginOrRegister>) }
                                
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-info" data-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         
        </div>
        
         )
    }
}

export class Formulario extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
                foto:'',
                direccion: 'Sin direccion',
                costo: -1,
                aceptado: false,
                domiciliario:true,
                estado: '1',
                comentario: '',    
                pasteles:'',
                user:''
        };
    }
   
    postearPedido(e) {
       

        let form_data = new FormData();
        form_data.append('foto', this.state.foto);
        form_data.append('direccion', this.state.direccion);
        form_data.append('costo', this.state.costo);
        form_data.append('aceptado', this.state.aceptado);
        form_data.append('domiciliario', this.state.domiciliario);
        form_data.append('estado', this.state.estado);
        form_data.append('comentario', this.state.comentario);
        form_data.append('pasteles', this.state.pasteles);
        form_data.append('user', this.state.user);
        
        

        fetch('http://localhost:8000crear_pedido/', {
            method: 'POST',
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'X-CSRFToken':Cookies.get('csrftoken')
                
            },
            credentials:'include',
            body: form_data
            // body: JSON.stringify(this.state)
        }).then((response) => response.json())
        .catch(error => console.error('Error:', error))
        .then(response =>( console.log(response))  );

        console.log("se posteo el pastel")

       
    }
    obtenerDatos(){
        console.log("vamoas a obtener los datos")
        var {datos}=this.props;
        console.log(datos);
        this.setState({ pasteles:datos.pastel, comentario:datos.Obs, user:datos.user});
        console.log("se obtivieron los datos")
    }
    enviar(e){
        this.obtenerDatos();
        this.postearPedido();
        e.preventDefault();
        e.stopPropagation();
    }
    
    ver=()=>console.log(this.state);
    

    render(){

        return(
            <form className ="container">
                <div className=" form-row">
                    <div className=" form-group">
                        <label for="direccion"> Dirección </label>
                        <input type = "text" class= "form-control" id="direccion" required onChange={(e)=>{this.setState({direccion:e.target.value});this.obtenerDatos()}} placeholder="Ingrese dirección" ></input>
                    </div>
                </div>
                <div className="form-group">
                    <label for="file"><span>Foto</span></label>
                    <input type ="file" className="col-sm "  id="file" onChange={(e)=>this.setState({foto:e.target.files[0]})} accept="image/*"></input>
                    <div id="draw"></div>
                    
                </div>
                <div className ="form-group">
                    <label for ="domicilio" > ¿Desea domicilio?</label><br />
                        <select name="domicilio"  id="domicilio" onChange={(e)=>{this.setState({domiciliario:e.target.value})}}>
                            <option selected value={true}>Si</option>
                            <option  value={false} >No</option>
                        </select>
                </div>
                    
                <button  className="btn btn-dark" id="enviar" onClick={this.enviar.bind(this)}>Enviar</button>
                <button className="btn btn-dark" onClick={this.ver} onChange={this.handleChange}>ver estado</button>

                
               
            </form>


        )
    }
}

