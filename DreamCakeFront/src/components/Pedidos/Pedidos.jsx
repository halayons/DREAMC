import React from 'react';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";
import {SliderPicker} from 'react-color';
import { Register } from '../login/register';
import { Login } from '../login/login';
import Cookies from 'js-cookie';



export class Pedido extends React.Component{
    
    render()    {
        return(
            <div>
                <Index></Index>
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
                color: '#6610f200',
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
        btn.style.setProperty('background','var(--color-boton)')
        btn.style.setProperty('color','white')
     }
    seleccionM =(event)=> {
        this.setState({masa:event.target.id});
        var btn = document.getElementById('dropdownMenuMasa');
        btn.textContent =event.target.textContent;
        btn.style.setProperty('background','var(--color-boton)')
        btn.style.setProperty('color','white')
     }
    seleccionR =(event)=> {
        this.setState({relleno:event.target.id});
        var btn = document.getElementById('dropdownMenuRelleno');
        btn.textContent =event.target.textContent;
        btn.style.setProperty('background','var(--color-boton)')
        btn.style.setProperty('color','white')
    }
    seleccionC =(event)=> {
        this.setState({cobertura:event.target.id});
        var btn = document.getElementById('dropdownMenuCubierta');
        btn.textContent =event.target.textContent;
        btn.style.setProperty('background','var(--color-boton)')
        btn.style.setProperty('color','white')
    }
    seleccionP =(event)=> {
        this.setState({porciones:parseInt(event.target.id)});
        var btn = document.getElementById('dropdownMenuPorciones');
        btn.textContent =event.target.textContent;
        btn.style.setProperty('background','var(--color-boton)')
        btn.style.setProperty('color','white')
    }
    //seleccionT =(event)=> {this.setState({Tematica:event.target.id})}
    seleccionColor =(event)=> {this.setState({color:event.target.id});}
    getData=(info)=>{
        this.setState({Mensaje:info.Men});
        this.setState({Observaciones:info.Obs});
        return this.state;
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

    
     
    handleChangeComplete = (color) => {
        this.setState({ color: color.hex });
    };

    
     
    render() {
        let color =this.state.color;   
        const f =this.state.forma;
        if(this.state.cobertura =="FD"){
            document.documentElement.style.setProperty('--color-pastel',color);
            document.documentElement.style.setProperty('--textura-pastel2','');
        }else if(this.state.cobertura =="CR"){
            document.documentElement.style.setProperty('--color-pastel','#eee8c9');
            document.documentElement.style.setProperty('--textura-pastel2',"url(http://www.transparenttextures.com/patterns/zig-zag.png)");
        }
        
        this.actualizar()
        

        return (
            

            <div className ="pastelPadding container" >
                <div className="row  justify-content-center ">
                                   
                    <div className ="opciones col-lg-4  col-sm-6 ">
                        <div style ={{margin:5+'px'}}>
                            <div class="dropdown">
                                <button class="btn-secundario dropdown-toggle" style ={{width:11+'em'}} type="button" id="dropdownMenuForma" data-toggle="dropdown" aria-expanded="false">
                                    Forma
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" required>
                                    <li><a class="dropdown-item"   onClick= {this.seleccionF} id="CI" selected>Redondo</a></li>
                                    <li><a class="dropdown-item" onClick= {this.seleccionF} id="CU"> Cuadrado</a></li>
                                </ul>
                            </div>
                            
                        </div>
                        <div style ={{margin:5+'px'}}>
                            <div class="dropdown">
                                <button class="btn-secundario  btn-reserva dropdown-toggle" style ={{width:11+'em'}} type="button" id="dropdownMenuMasa" data-toggle="dropdown" aria-expanded="false">
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
                                <button class="btn-secundario  btn-reserva dropdown-toggle" style ={{width:11+'em'}} type="button" id="dropdownMenuRelleno" data-toggle="dropdown" aria-expanded="false">
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
                                <button class="btn-secundario  dropdown-toggle" style ={{width:11+'em'}} type="button" id="dropdownMenuCubierta" data-toggle="dropdown" aria-expanded="false">
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
                                <button class="btn-secundario dropdown-toggle" style ={{width:11+'em'}} type="button" id="dropdownMenuPorciones" data-toggle="dropdown" aria-expanded="false">
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
                    <div className="col-lg-4  col-sm-12 " style ={{marginTop:10+'px'}}>
                        <Mensaje getData={this.getData}  Pastel={this.state} ></Mensaje> 
                        
                    </div>
                   
                    <div className="boxLoader" id="boxLoader">
                        <div className="loader"></div>
                    </div>
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
                    <div className="pastelCubierta1 "></div>
                    <div className="pastelCubierta1 "></div>
                    <div className="pastelCubierta2 "></div>
                    <div className="pastelCubierta4 "></div>
                    <div className="pastelCubierta3 "></div>
                    <div className="pastelCubierta5 "></div>
                    
                </div>
            
        )
    }
}
export  class PastelC extends React.Component{
    render(){
     
        return(
            <div class="draw">
                <div className="bandejaCuadrada"></div>
                <div className="sideUpRelleno caraRelleno"></div>
                <div className="sideRightRelleno caraRelleno "></div>
                <div className="sideFrontRelleno caraRelleno"></div> 

                <div className="sideUp caraMasa"></div>
                <div className="sideRight caraMasa"></div>
                <div className="sideFront caraMasa"></div>


                <div className="cubiertaFront cubierta"></div>
                <div className="cubiertaUp cubierta"></div>
                <div className="cubiertaUp2 cubierta"></div>
                    
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



export class Mensaje extends Index{
    constructor(props) {
        super(props);
        this.state={
            Men:'',
            Obs:'',
            log:'1',
            user:'',
            pastel:-1,
            form: false
        };
    }
    getM=(e)=>{
       this.setState({Men: e.target.value})
    }
    getO=(e)=>{
        this.setState({Obs: e.target.value})
       
     }
    componentDidMount = () => {

        let requestOptions ={
            method: 'GET',
            //headers: { 'Content-Type': 'application/json', 'Authorization':"Bearer "+Cookies.get("csrftoken"),"Host":"localhost"},
            credentials:'include'
        };
        let load = document.getElementById('boxLoader');

        
        if(this.state.user===''){
            fetch('http://localhost:8000/users/api/auth/user/',requestOptions)
            .then((response) => response.json())
            .then(responseJson => {  
                console.log("estamos comprobando si se inicio una sesion"); 
                load.style.visibility = 'visible';

            
                if(responseJson.email!=undefined){
                   
                    console.log("efectivamente hay una cuenta")
                    this.setState({log:'0',user:responseJson.email})
                    load.style.visibility = 'hidden';
                } else{
                    console.log("no hay cuentas iniciadas");
                    load.style.visibility = 'hidden';
                }
            }
            );
        }
    }
    
    postear = () => {
        this.componentDidMount();
        if(this.state.user!=''){
            this.postearPastel();
        }else{
            <LoginRegister></LoginRegister>
        }
    }
    postearPastel(e) {
        let load = document.getElementById('boxLoader');
        load.style.visibility = 'visible';
        

        if(this.state.pastel ==-1){
            fetch('http://localhost:8000/crear_pastel/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken':Cookies.get('csrftoken')
                },
                credentials:'include',
                body: JSON.stringify(this.props.Pastel)
            }).then((response) => response.json())
            .then(response =>{
                if(response.id != undefined){
                    this.setState({pastel:response.id})
                    this.setState({form:true})
                }
                  
            });
        }
        load.style.visibility = 'hidden';
    }
    
   
    render(){
        let mensaje="Por favor seleccione y llene todos los campos de lo contrario el pedido no se realizara con exito.";
        const f =this.state.log;
        const {getData}= this.props;
        return(
            
        <div>
            <form className ="tituloPrincipal">
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
                
                <button type="button" onClick={()=>getData(this.state),this.postear.bind(this)} href ="#emergente" className="btn-principal" style={{ width:11+'em'}} data-toggle ="modal">Continuar</button>
                
                
                <div className="modal fade" id="emergente">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            
                            <div className="modal-body">
                               
                            {f=='1' ?(<LoginRegister></LoginRegister>):(this.state.form==false ?(<p>{mensaje}</p>): ( <Formulario datos={this.state}></Formulario>)) }
                                
                            </div>

                            <div className="modal-footer">
                                <button type="button" className=" btn-secundario btn-mini" id="btnModal" data-dismiss="modal">Cerrar</button>
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
        
        

        fetch('http://localhost:8000/crear_pedido/', {
            method: 'POST',
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'X-CSRFToken':Cookies.get('csrftoken')
                
            },
            credentials:'include',
            body: form_data
            // body: JSON.stringify(this.state)
        }).then((response) => response.json())
        .then(response =>{console.log(response.idpedido)
           
            if (response.idpedido!=undefined){
               
                window.location.pathname ="/";    
            }else{
               
               <Popup info="Fallas en el pedido por favor vuelva a intentar"></Popup>
            }
            console.log(response)
        });

        

       
    }
    obtenerDatos(){
       var {datos}=this.props;
        console.log(datos);
        this.setState({ pasteles:datos.pastel, comentario:datos.Obs, user:datos.user});
      }
    enviar(e){
        this.obtenerDatos();
        this.postearPedido();
        e.preventDefault();
        e.stopPropagation();
    }
    
    ver=()=>(this.state);
    

    render(){

        return(
            <form className ="form">
                <div className=" form-row">
                   
                        <label for="direccion" className="tituloPrincipal"> Dirección </label>
                        <input type = "text" className= "form-control" id="direccion" required onChange={(e)=>{this.setState({direccion:e.target.value});this.obtenerDatos()}} placeholder="Ingrese dirección" ></input>
                    
                </div>
                <br />
                
                <div className="form-group justify-content-around">
                    <label for="imgfile"  className="btn-secundario col-5"><span>Foto</span></label>
                    <input type ="file" className="col-sm "  id="imgfile" onChange={(e)=>this.setState({foto:e.target.files[0]})} accept="image/*"></input>

                        

                    <label className="btn  col-5 form-data" for ="domicilio" > ¿Domicilio?
                        <select name="domicilio "  id="domicilio" onChange={(e)=>{this.setState({domiciliario:e.target.value})}}>
                            <option selected value={true}>Si</option>
                            <option  value={false} >No</option>
                        </select>
                    </label>
                </div>
                
                    
                <button  className="btn-principal" id="enviar" onClick={(this.enviar.bind(this))}>Enviar</button>
                

                
               
            </form>


        )
    }
}
export class LoginRegister extends React.Component{
    render(){
        return(
            <div>
                
                <button type="button" className="btn-principal" data-toggle="modal" data-target="#login" value="login" data-backdrop="false" y data-dismiss="modal">Iniciar Sesión</button>
                <button type="button" className="btn-secundario   " data-toggle="modal" data-target="#register" value="register" data-backdrop="false" data-dismiss="modal" >Registrarse</button>
                       
                        <Register />                       
                        <Login />
            </div>
        )
    }
}
 export class Popup extends React.Component{
  render(){
      let btnMensaje= document.getElementById("mensajePop");
      btnMensaje.click();
      return(
            <div>
                <button type="button" className="btn-secundario" data-toggle="modal" data-target="#popup" value="popup" data-backdrop="false" data-dismiss="modal"  id="mensajePop">Error!!!</button>
               
                
                    <div className="modal fade" id ="popup">
                        <section className=" modal-dialog">
                            <div className=" modal-content">
                                <div className=" modal-body">
                                    {this.props.info}
                                </div>
                                <div className="modal-footer justify-content-center">
                                    <button type="button" className="btn-secundario btn-mini" id="btnModal" data-dismiss="modal">Cerrar</button>
                                </div>
                            </div>
                        </section>
                    </div>
                
            </div>
      )
  }
 }
