import React from 'react';
import Pedido from '../Pedidos/Pedidos';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/dist/js/bootstrap.min";
import "../../../node_modules/popper.js/dist/umd/popper.min";
import "../../../node_modules/jquery/dist/jquery.slim.min";
import ban1 from '../../static/images/banner1.jpg'
import ban2 from '../../static/images/banner2.jpg'
import logo from '../../static/images/LOGOFINALBANNER.png';


export class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            promos: [],

        };

    }

    componentDidMount() {
        fetch('http://localhost:8000/banner/get_all/')
            .then(res => res.json())
            .then((data) => {
                this.setState({ promos: data })
                console.log(data)
            })
            .catch(console.log("error a l onterner imagenes del banner"))
    }
    realizarPedido() {
        window.location.pathname = "/crearPastel/";
    }


    promos = ({ promos }) => {


        return (

            <div>

                <div>
                    <div id="carouselPromos" className="carousel slide carousel-fade" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselPromos" data-slide-to="0"></li>
                            <li data-target="#carouselPromos" data-slide-to="1"></li>
                            <li data-target="#carouselPromos" data-slide-to="2"></li>
                            <li data-target="#carouselPromos" data-slide-to="3"></li>
                            <li data-target="#carouselPromos" data-slide-to="4"></li>
                        </ol>

                        <div className="carousel-inner carousel-banner">
                            
                                <div className="carousel-item active">
                                    
                                    <div className="card">
                                        <img src={ban1} alt="" className="img-banner " />
                                    </div>
                                    

                                    <div className="carousel-caption  ">
                                        <div className="text-container">
                                            <p><b>CREA TU PASTEL!!</b></p>
                                           
                                            <p>1.) ¡Registrate! </p>
                                            <p>2.) ¡Elige la crema! </p>
                                            <p>3.) ¡Selecciona el tipo de torta! </p>
                                            <p>4.) ¡Ponle el relleno! </p>
                                            <p>5.) ¡Decoralo a tu antojo! </p>
                                             <button type="button" className="btn-principal btn-mediano mx-auto d-md-block" id="comenzar" onClick={this.realizarPedido} > COMENZAR </button>
                                        </div>
                                    </div>
                                   
                                </div>
                                <div className="carousel-item">
                                
                                    <div className="card">
                                        <img src={ban2} alt="" className="img-banner " />
                                    </div>
                                    

                                    <div className="carousel-caption  ">
                                        <div className="text-container">
                                        <img  className="header-logo text-center"src={logo} alt="" />
                                            <p className="about-dreamCake">
                                                
                                                En “Dream Cake” creamos deliciosos postres y pasteles con exquisitas recetas,   
                                                ingredientes de la más alta calidad y con la más fina elaboración, consiguiendo 
                                                así que nuestros productos sean una
                                                delicia para los ojos y un capricho para el paladar, 
                                                solo tienes que segui los siguientes pasos! 
                                            </p>
                                        </div>

                                    </div>
                                </div>
                                {this.state.promos.map((promo) => (
                                    <div className="carousel-item">
                                       <div className="card">
                                       <img src={promo.image} className="img-fluid" />
                                       </div>
                                        <div className="carousel-caption">
                                            <div className="text-container">
                                                <h1>{promo.title}</h1>
                                                <h5>{promo.text}</h5>
                                            </div>
                                        </div>

                                        
                                    </div>
                                ))}
                            
                        </div>
                    </div>



                </div >

            </div >

        )
    };



    render() {
        return (
            <div style={{marginTop:10}}>
                <this.promos promos={this.state.promos} />
            </div>

        )
    }
}
