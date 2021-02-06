import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card'

import UploadProductoService from '../services/producto.service'

export default class ListaProductos extends Component {
    constructor(props) {
        super(props);
        this.retrieveProductos = this.retrieveProductos.bind(this);

        this.state = {
            productos: []
        }
    }

    componentDidMount() {
        this.retrieveProductos();
    }

    retrieveProductos() {
        UploadProductoService.getAllProductos().then(res => {
            this.setState({
                productos: res.data
            });
            console.log(res.data);
        }).catch(e => {
            console.log(e);
        });
    }

    render() {
        const productos = this.state.productos;
        return (
            <div>
                {productos &&
                    productos.map((producto, index) => (
                        <Card style={{ width: '30rem'}} key={index}>
                            <Card.Img 
                                variant="top"
                                src={producto.imgProd}
                            />
                            <Card.Title>
                                {producto.nombreProd}
                            </Card.Title>
                            <Card.Text>
                                {producto.descripcionProd}
                            </Card.Text>
                            <Card.Footer>
                                ${producto.precioProd}
                            </Card.Footer>
                        </Card>
                    ))
                }
            </div>
        )
    }
}