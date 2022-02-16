
import like from '../../static/images/like.svg';
import React from 'react';


export class Social extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }
    funtion(a) {
        var l = a.length;
        var ll = a.substring(1, l)
        return ll;
    }
    fecha(a) {
        return a;
    }
    usuarios(e) {
        return(
                <div className="col-lg-4 col-12 col-sm-6">
                    <div className="card card-social d-flex flex-column justify-content-between" >
                        <div>
                            <img src={e.foto} className="img-fluid"></img>
                        </div>
                       
                        <div>
                            <h4 className="customer-title justify-content-center"> {e.usuario}</h4> 
                            
                            <div className="row justify-content-around">
                                 <span className="badge text-secondary align-items-end">{this.fecha(e.published_date)}</span>
                                 <span className="badge">{e.likes}<img src={like} style={{width:3+'rem'}}></img></span>
                             </div>
                        </div>
                    
                </div>
                </div>

           
            );

       

    }

    componentDidMount = () => {

        fetch('http://localhost:8000/social/all_posts/-likes/3/', { method: 'GET' })
            .then((response) => response.json())
            .then(responseJson => { this.setState({ data: responseJson }) }
            );
    }

    render() {
        return (
            
                <div className="">
                    {console.log(this.state.data)}
                    <div className="d-flex flex-wrap">
                        {this.state.data.map(e => this.usuarios(e))}
                    </div>
                    
                    
                    <div className="pastelPadding row justify-content-center">
                        <a href="/social">
                            <button className="btn-principal" >Ver mas</button>
                        </a>
                    </div>
                    <br />
                </div>

            
        )
    }

}