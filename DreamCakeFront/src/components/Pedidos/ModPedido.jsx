import React from 'react';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";
import { SliderPicker } from 'react-color';
import { Social, Footer, Header } from "../landingPage/index";
import { Login } from '../login/login'
import { Register } from '../login/register'
import Cookies from 'js-cookie';
import textura from '../../media/img/texturaCobertura.jpg';
import { event, get } from 'jquery';
import { ResponsiveEmbed } from 'react-bootstrap';
import { FcElectronics } from 'react-icons/fc';


export class ModPedido extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.pastel.id,
            masa: props.pastel.masa,
            relleno: props.pastel.relleno,
            cobertura: props.pastel.cobertura,
            color: props.pastel.color,
            porciones: props.pastel.porciones,
            forma: props.pastel.forma,
            mensaje: props.pastel.mensaje,
            status_pastel: props.pastel.status_pastel,
            num_pisos: props.pastel.num_pisos,
            costo: props.pastel.costo,
        }
    }

    componentDidMount() {
        this.setState({
            id: this.props.pastel.id,
            masa: this.props.pastel.masa,
            relleno: this.props.pastel.relleno,
            cobertura: this.props.pastel.cobertura,
            color: this.props.pastel.color,
            porciones: this.props.pastel.porciones,
            forma: this.props.pastel.forma,
            mensaje: this.props.mensaje,
            status_pastel: this.props.pastel.status_pastel,
            num_pisos: this.props.pastel.num_pisos,
            costo: this.props.pastel.costo,
        })
    }

    render() {

        return (
            <div>
                <Index //verificar las props para que coincidadn con el state de Index 
                    id={this.state.id}
                    masa={this.state.masa}
                    relleno={this.state.relleno}
                    cobertura={this.state.cobertura}
                    porciones={this.state.porciones}
                    forma={this.state.forma}
                    color={this.state.color}
                    mensaje={this.state.mensaje}
                    status_pastel={this.state.status_pastel}
                    num_pisos={this.state.num_pisos}
                    costo={this.state.costo}
                    origen={this.props.origen}               ></Index>
            </div>

        )
    }
}

export class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //Poner esto  con props  
            id: props.id,
            masa: props.masa,
            relleno: props.relleno,
            cobertura: props.cobertura,
            color: props.color,
            porciones: props.porciones,
            forma: props.forma,
            mensaje: props.mensaje,
            status_pastel: props.status_pastel,
            num_pisos: props.num_pisos,
            costo: props.costo,
        };
    }

    /*componentDidMount(){   
        fetch('http://localhost:8000/copiar_pastel/2/', {
            method: 'GET',
            credentials:'include',
            headers: {                
            },            
        }).then((response) =>{
            console.log('Esta es la info del pastel del usuario');
            console.log('PASTEEEEEEEL',response.json());
        } )
        .catch(error => console.error('Error:', error));        
    } */
    actualizar() {
        let chocolate = 'url("https://www.transparenttextures.com/patterns/45-degree-fabric-dark.png")';
        let vainilla = 'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")';
        let leches = ' url("https://www.transparenttextures.com/patterns/ravenna.png")';
        let velvet = 'url("https://www.transparenttextures.com/patterns/crisp-paper-ruffles.png")';
        let textura = "";
        let color = "";
        let colorCubierta = "";


        if (this.state.masa === 'RV') {
            textura = velvet;
        }
        else if (this.state.masa === 'TL') {
            textura = leches;
        }
        else if (this.state.masa === 'VA') {
            textura = vainilla;
        }
        else if (this.state.masa === 'CH') {
            textura = chocolate;
        }
        document.documentElement.style.setProperty('--textura-pastel', textura);

        if (this.state.relleno === 'AQ') {
            color = "#995c2e";
        }
        else if (this.state.relleno === 'NU') {
            color = "#69391d";
        }
        else if (this.state.relleno === 'ML') {
            color = "#5c0c15b5";
        }
        else if (this.state.relleno === 'CP') {
            color = "#e4cc8ba1";
        }
        document.documentElement.style.setProperty('--color-pastel2', color);

        if (this.state.cobertura === 'FD') {
            colorCubierta = "#39caf7";
        }
        else if (this.state.cobertura === 'CR') {
            colorCubierta = "#e0d8cd";
        }
        document.documentElement.style.setProperty('--color-pastel3', colorCubierta);

    }


    seleccionF = (event) => {
        this.setState({ forma: event.target.id });
        let btn = document.getElementById('dropdownMenuForma');
        btn.textContent = event.target.textContent;
        btn.style.setProperty('background','var(--color-boton)')
        btn.style.setProperty('color','white')
    }
    seleccionM = (event) => {
        this.setState({ masa: event.target.id });
        var btn = document.getElementById('dropdownMenuMasa');
        btn.textContent = event.target.textContent;
        btn.style.setProperty('background','var(--color-boton)')
        btn.style.setProperty('color','white')
    }
    seleccionR = (event) => {
        this.setState({ relleno: event.target.id });
        var btn = document.getElementById('dropdownMenuRelleno');
        btn.textContent = event.target.textContent;
        btn.style.setProperty('background','var(--color-boton)')
        btn.style.setProperty('color','white')
    }
    seleccionC = (event) => {
        this.setState({ cobertura: event.target.id });
        var btn = document.getElementById('dropdownMenuCubierta');
        btn.textContent = event.target.textContent;
        btn.style.setProperty('background','var(--color-boton)')
        btn.style.setProperty('color','white')
    }
    seleccionP = (event) => {
        this.setState({ porciones: parseInt(event.target.id) });
        var btn = document.getElementById('dropdownMenuPorciones');
        btn.textContent = event.target.textContent;
        btn.style.setProperty('background','var(--color-boton)')
        btn.style.setProperty('color','white')
    }
    //seleccionT =(event)=> {this.setState({Tematica:event.target.id})}
    seleccionColor = (event) => { this.setState({ color: event.target.id }); }
    getData = (info) => {
        this.setState({ Mensaje: this.pastel.mensaje.Men });
        this.setState({ Observaciones: info.Obs });
        return this.state;
    }


    postearPastel() {
        console.log("vamos a postear el pastel");
        console.log(Cookies.get('csrftoken'))
        fetch('http://localhost:8000/copiar_pastel/' + this.state.id + '/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')

            },
            credentials: 'include',
            body: JSON.stringify(this.state)
        }).then((response) => response.json())
            .catch(error => console.error('Error:', error));

    }
    editarPastel() {
        console.log("vamos a editar el pastel");
        fetch('http://localhost:8000/midificar_pastel/' + this.state.id + '/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')

            },
            credentials: 'include',
            body: JSON.stringify(this.state)
        }).then((response) => response.json())
            .catch(error => console.error('Error:', error));

    }



    handleChangeComplete = (color) => {
        this.setState({ color: color.hex });
        document.documentElement.style.setProperty('--color-pastel', color.hex);
    };


    render() {
        //poner constantes según condiciones, para los botones        
        let formaP = '';
        let masaP = '';
        let rellenoP = '';
        let cubiertaP = "";
        let porcionesP = '';

        if (this.state.masa === 'RV') {
            masaP = 'RedVelvet';
        }
        else if (this.state.masa === 'TL') {
            masaP = 'Tres Leches';
        }
        else if (this.state.masa === 'VA') {
            masaP = 'Vainilla';
        }
        else if (this.state.masa === 'CH') {
            masaP = 'Chocolate';
        }

        if (this.state.relleno === 'AQ') {
            rellenoP = "Arequipe";
        }
        else if (this.state.relleno === 'NU') {
            rellenoP = "Nutella";
        }
        else if (this.state.relleno === 'ML') {
            rellenoP = "Mermelada";
        }
        else if (this.state.relleno === 'CP') {
            rellenoP = "CremaPastelera";
        }

        if (this.state.cobertura === 'FD') {
            cubiertaP = "Fondant";
        }
        else if (this.state.cobertura === 'CR') {
            cubiertaP = "Crema";
        }

        if (this.state.forma === 'CI') {
            formaP = "Redondo";
        }
        else if (this.state.forma === 'CU') {
            formaP = "Cuadrado";
        }

        if (this.state.porciones === 15) {
            porcionesP = "1-35";
        }
        else if (this.state.porciones === 2) {
            porcionesP = "35-60";
        }
        else if (this.state.porciones === 3) {
            porcionesP = "60-100";
        }


        ////////////////////////////////////////////////////////////   

        let color = this.state.color;
        const f = this.state.forma;
        if (this.state.cobertura == "FD") {
            document.documentElement.style.setProperty('--color-pastel', color);
            document.documentElement.style.setProperty('--textura-pastel2', '');
        } else if (this.state.cobertura == "CR") {
            document.documentElement.style.setProperty('--color-pastel', '#eee8c9');
            document.documentElement.style.setProperty('--textura-pastel2', "url(http://www.transparenttextures.com/patterns/zig-zag.png)");
        }

        this.actualizar();

        return (


            <div className ="pastelPadding container" >
            <div className="row  justify-content-center ">

                <div className="opciones col-lg-3  col-sm-6 ">
                    <div style={{ margin: 5 + 'px' }}>
                        <div class="dropdown">
                            <button class="btn-secundario  btn-reserva dropdown-toggle" style={{ width: 11 + 'em' }} type="button" id="dropdownMenuForma" data-toggle="dropdown" aria-expanded="false">
                                {formaP}
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" required>
                                <li><a class="dropdown-item" onClick={this.seleccionF} id="CI" selected>Redondo</a></li>
                                <li><a class="dropdown-item" onClick={this.seleccionF} id="CU"> Cuadrado</a></li>
                            </ul>
                        </div>

                    </div>
                    <div style={{ margin: 5 + 'px' }}>
                        <div class="dropdown">
                            <button class="btn-secundario  btn-reserva dropdown-toggle" style={{ width: 11 + 'em' }} type="button" id="dropdownMenuMasa" data-toggle="dropdown" aria-expanded="false">
                                {masaP}
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a class="dropdown-item" onClick={this.seleccionM} id="RV">RedVelvet</a></li>
                                <li><a class="dropdown-item" onClick={this.seleccionM} id="TL"> Tres Leches</a></li>
                                <li><a class="dropdown-item" onClick={this.seleccionM} id="VA"> Vainilla </a></li>
                                <li><a class="dropdown-item" onClick={this.seleccionM} id="CH">  Chocolate</a></li>
                            </ul>
                        </div>

                    </div>

                    <div style={{ margin: 5 + 'px' }}>
                        <div class="dropdown">
                            <button class="btn-secundario  btn-reserva dropdown-toggle" style={{ width: 11 + 'em' }} type="button" id="dropdownMenuRelleno" data-toggle="dropdown" aria-expanded="false">
                                {rellenoP}
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a class="dropdown-item" onClick={this.seleccionR} id="AQ">Arequipe</a></li>
                                <li><a class="dropdown-item" onClick={this.seleccionR} id="NU"> Nutella</a></li>
                                <li><a class="dropdown-item" onClick={this.seleccionR} id="ML"> Mermelada  </a></li>
                                <li><a class="dropdown-item" onClick={this.seleccionR} id="CP"> CremaPastelera </a></li>

                            </ul>
                        </div>

                    </div>
                    <div style={{ margin: 5 + 'px' }}>
                        <div class="dropdown">
                            <button class="btn-secundario  btn-reserva dropdown-toggle" style={{ width: 11 + 'em' }} type="button" id="dropdownMenuCubierta" data-toggle="dropdown" aria-expanded="false">
                                {cubiertaP}
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a class="dropdown-item" onClick={this.seleccionC} id="FD">Fondant </a></li>
                                <li><a class="dropdown-item" onClick={this.seleccionC} id="CR">Crema</a></li>
                                {/* <li><a class="dropdown-item" onClick= {this.seleccionC} id="Crema de Chantilly"> Crema de Chantilly </a></li>
                                    <li><a class="dropdown-item" onClick= {this.seleccionC} id="Crema de Mantequilla"> Crema de Mantequilla </a></li>
                                       <li><a class="dropdown-item" onClick= {this.seleccionC} id="Sin Cobertura"> Sin Cobertura </a></li>*/}
                            </ul>
                        </div>

                    </div>
                    <div style={{ margin: 5 + 'px' }}>
                        <div class="dropdown">
                            <button class="btn-secundario  btn-reserva dropdown-toggle" style={{ width: 11 + 'em' }} type="button" id="dropdownMenuPorciones" data-toggle="dropdown" aria-expanded="false">
                                {porcionesP}
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a class="dropdown-item" onClick={this.seleccionP} id="15">1-35 </a></li>
                                <li><a class="dropdown-item" onClick={this.seleccionP} id="2">35-60 </a></li>
                                <li><a class="dropdown-item" onClick={this.seleccionP} id="3"> 60-100</a></li>
                            </ul>
                        </div>

                    </div>

                    <div style={{ margin: 10 + 'px', width: 10.5 + 'em', marginLeft: 'auto', marginRight: 'auto' }}>
                        <SliderPicker color={this.state.color}
                            onChangeComplete={this.handleChangeComplete}>
                        </SliderPicker>
                    </div>

                </div>
                <div className=" col-lg-4 col-sm-6 " >

                    {f == 'CI' ? (<Pastel2></Pastel2>, <Pastel></Pastel>) : (<PastelC></PastelC>)}
                </div>
                <div className=" col-lg-4  col-sm-12 " style={{ marginTop: 10 + 'px' }}>
                    <Mensaje origen={this.props.origen} getData={this.getData} Pastel={this.state} mensaje={this.state.mensaje} id={this.state.id}></Mensaje>

                </div>

                <div className="boxLoader" id="boxLoader">
                    <div className="loader"></div>
                </div>
                </div>                      
            </div>


        )
    }

}

export class Pastel extends React.Component {
    render() {
        return (

            <div className='draw'>
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
export class PastelC extends React.Component {
    render() {

        return (
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
export class Pastel2 extends React.Component {

    render() {


        return (
            <div>
                <canvas className="canvas"></canvas>
                <input type="color" id="color" />
                <input type="range" id="grosor" min="1" max="5" value="1" />
            </div>

        );
    }
}
export class LoginOrRegister extends React.Component {
    render() {
        return (
            <div>
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active badge badge-info" id="login-tab" data-toggle="tab" href="#login" role="tab" aria-controls="login" aria-selected="true"><span>Login</span> </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link badge badge-info" id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="resgister" aria-selected="false"><span>Register</span></a>
                    </li>
                </ul>

                <div class="tab-content " id="myTabContent">
                    <div class="tab-pane fade  show active " id="login" role="tabpanel" aria-labelledby="login-tab">
                        <div class="card  ">
                            <Login></Login>
                        </div>
                    </div>
                    <div class="tab-pane fade " id="register" role="tabpanel" aria-labelledby="register-tab">
                        <div class="card ">
                            <Register></Register>
                        </div>
                    </div>
                </div>


            </div>


        )
    }
}


export class Mensaje extends Index {
    constructor(props) {
        super(props);
        this.state = {
            Men: props.mensaje,
            Obs: '',
            log: '1',
            user: '',
            pastel: -1,
            id: props.id
        };
    }
    getM = (e) => {
        this.setState({ Men: e.target.value })
    }
    getO = (e) => {
        this.setState({ Obs: e.target.value })

    }
    componentDidMount = () => {

        let requestOptions = {
            method: 'GET',
            //headers: { 'Content-Type': 'application/json', 'Authorization':"Bearer "+Cookies.get("csrftoken"),"Host":"localhost"},
            credentials: 'include'
        };
        let load = document.getElementById('boxLoader');


        if (this.state.user === '') {
            fetch('http://localhost:8000/users/api/auth/user/', requestOptions)
                .then((response) => response.json())
                .then(responseJson => {
                    console.log("estamos comprobando si se inicio una sesion");
                    load.style.visibility = 'visible';


                    if (responseJson.email != undefined) {

                        console.log("efectivamente hay una cuenta")
                        this.setState({ log: '0', user: responseJson.email })
                        load.style.visibility = 'hidden';
                    } else {
                        console.log("no hay cuentas iniciadas");
                        load.style.visibility = 'hidden';
                    }
                }
                );
        }
    }
    continuar = () => {

    }
    postear = () => {
        this.componentDidMount();
        if (this.state.user != '') {
            this.postearPastel();
        } else {
            <LoginOrRegister></LoginOrRegister>
        }
    }
    postearPastel(e) {
        let load = document.getElementById('boxLoader');
        load.style.visibility = 'visible';


        if (this.state.pastel == -1) {
            fetch('http://localhost:8000/copiar_pastel/' + this.state.id + '/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': Cookies.get('csrftoken')
                },
                credentials: 'include',
                body: JSON.stringify(this.props.Pastel)
            }).then((response) => response.json())
                .then(response => {
                    this.setState({ pastel: response.id })
                    console.log(response)
                });
        }
        load.style.visibility = 'hidden';
    }


    render() {
        const f = this.state.log;
        const { getData } = this.props;
        return (

            <div>
                <form className="tituloPrincipal">
                    <div className="form-row">
                        <label for="mensaje">Mensaje</label>
                        <textarea required value={this.state.Men} onChange={this.getM} type="text" className="form-control" ref={this.mensaje} id="mensaje " placeholder="Mensaje" rows="2"></textarea>
                    </div>
                    <div className="form-row">
                        <label for="observaciones">Comentarios</label>
                        <textarea required value={this.state.Obs} onChange={this.getO} type="text" className="form-control" ref={this.observaciones} id="observaciones" placeholder="Comentarios sobre el pedido" rows="3"></textarea>
                    </div>
                </form>

                <div class="formulario" style={{ marginTop: 10 + 'px' }} >

                    <button type="button" onClick={() => getData(this.state), this.postear.bind(this)} href="#emergente" className="btn-principal" style={{ width: 11 + 'em' }} data-toggle="modal">Continuar</button>


                    <div className="modal fade" id="emergente">
                        <div className="modal-dialog">
                            <div className="modal-content">

                                <div className="modal-body">
                                    {f == '0' ? (<Formulario origen={this.props.origen} datos={this.state}></Formulario>) : (<LoginOrRegister></LoginOrRegister>)}

                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn-secundario btn-mini" id="btnModal" data-dismiss="modal">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}

export class Formulario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foto: '',
            direccion: 'Sin direccion',
            costo: -1,
            aceptado: false,
            domiciliario: true,
            estado: '1',
            comentario: '',
            pasteles: '',
            user: '',
            pedido: ''
        };
    }
    componentDidMount = () => {
        this.loadPedido();
        console.log()
    }

    loadPedido() {
        fetch("http://localhost:8000/pedidos/", { credentials: 'include' })
            .then(response => response.json())
            .then(json => (this.setState({ pedidos: json }), this.filtrarPedido())
            )
            .catch(error => console.log(error));
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

        console.log(this.state.pedido)

        let dir = this.props.origen == 1 ?
            'http://localhost:8000/editar_pedido/' + parseInt(this.state.pedido) + '/'
            : 'http://localhost:8000/crear_pedido/'
        fetch(dir, {
            method: this.props.origen == 1 ? 'PUT' : 'POST',
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'X-CSRFToken': Cookies.get('csrftoken')

            },
            credentials: 'include',
            body: form_data
            // body: JSON.stringify(this.state)
        }).then((response) => response.json())
            .then(response => {
                if (response.idpedido != undefined) {
                    console.log(response);
                    // alert(response);
                    // alert("se posteo correctamente")
                    window.location.pathname = "/social"
                } else {
                    alert(JSON.stringify(response))
                    window.location.pathname = "/social"
                }
                console.log(response)
            });




    }
    obtenerDatos() {
        var { datos } = this.props;
        console.log(datos);
        this.setState({ pasteles: datos.pastel, comentario: datos.Obs, user: datos.user });
    }
    filtrarPedido = () => {
        this.state.pedidos.map(e => {
            if (e.pasteles == this.props.datos.id) this.setState({ pedido: e.idpedido })
        })
    }
    enviar(e) {
        this.obtenerDatos();

        this.postearPedido();

        e.preventDefault();
        e.stopPropagation();

    }

    ver = () => (this.state);


    render() {

        return (
            <form className="form">
                <div className=" form-row">

                    <label for="direccion" className="tituloPrincipal"> Dirección </label>
                    <input type="text" class="form-control" id="direccion" required onChange={(e) => { this.setState({ direccion: e.target.value }); this.obtenerDatos() }} placeholder="Ingrese dirección" ></input>

                </div>
                <br />

                <div className="form-group">
                    <label for="imgfile" className="btn-secundario col-5"><span>Foto</span></label>
                    <input type="file" className="col-sm " id="imgfile" onChange={(e) => this.setState({ foto: e.target.files[0] })} accept="image/*"></input>

                

                
                    <label className="btn  col-5 form-data" for="domicilio" > ¿Domicilio?
                        <select name="domicilio " id="domicilio" onChange={(e) => { this.setState({ domiciliario: e.target.value }) }}>
                            <option selected value={true}>Si</option>
                            <option value={false} >No</option>
                        </select>
                    </label>


                </div>

                <button className="btn-principal" id="enviar" onClick={(this.enviar.bind(this))}>Enviar</button>



            </form>


        )


    }
}


