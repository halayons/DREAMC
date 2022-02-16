import React from 'react';
import face from '../../static/images/face.png';
import insta from '../../static/images/Instagram.png';
import tel from '../../static/images/Telefono.png';
import what from '../../static/images/whatsap.png';
export class Footer extends React.Component {


    render() {
        return (
            <div className="footer ">
                
                <div className="principalF d-flex f-wrap justify-content-center">
                
                    <a className="redes-footer" href="https://www.facebook.com/DreamCakeOFICIAL1/"><img src={face} alt="" ></img></a>
                    <a className="redes-footer" href="https://web.whatsapp.com/"><img src={what} alt="" ></img></a>
                    <a className="redes-footer" href="#"><img src={tel} alt="" ></img></a>
                    <a className="redes-footer" href="#"><img src={insta} alt="" ></img></a>
                    
                </div>
                   
                
                    <div className="text-center">
                     <div className="row">
                    
                        <div class="col-md-4 col-lg-4 col-xl-4 smx-auto mb-4">
                            <h6 class="footer-text-title">Productos</h6>
                            <hr className="hr-footer mb-4 mt-0 d-inline-block mx-auto"/>
                            <p><a href="#!" class="footer-text fw-normal">Tres Leches</a></p>
                            <p><a href="#!" class="footer-text">Vainilla</a></p>
                            <p><a href="#!" class="footer-text">RedVelvet</a></p>
                            <p><a href="#!" class="footer-text">Chocolate</a></p>
                        </div>
                        <div class="col-md-4 col-lg-4 col-xl-4 mx-auto mb-4">
                        <h6 class="footer-text-title">Atajos</h6>
                            <hr className="hr-footer mb-4 mt-0 d-inline-block mx-auto"/>
                            <p><a href="#!" class="footer-text">Tu cuenta</a></p>
                            <p><a href="#!" class="footer-text">Registrate</a></p>
                            <p><a href="#!" class="footer-text">Ordena tu pastel</a> </p>
                            <p><a href="#!" class="footer-text">Ayuda</a> </p>
                        </div>
                        <div class="col-md-4 col-lg-4 col-xl-4 mx-auto mb-md-0 mb-4">
                        <h6 class="footer-text-title">Contacto</h6>
                            <hr className="hr-footer mb-4 mt-0 d-inline-block mx-auto"/>
                            <p class="footer-text"> Cra 45, Bogotá</p>
                            <p class="footer-text">dreamcake@gmail.com</p>
                            <p class="footer-text"> +57 300 612 6830</p>
                            <p class="footer-text"> +57 301 567 8923</p>
                        </div>
                    </div>
                </div>
          
                <div className="copyright-bar">
                    <span className="copyright">
                        ©2021 DreamCake - Todos los Derechos reservados
                    </span>
                </div>
            </div>
        );
    }
}
