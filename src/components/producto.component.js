import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

import UploadProductoService from '../services/producto.service'

export default class Producto extends Component {
    constructor(props) {
        super(props);
        this.retrieveProductos = this.retrieveProductos.bind(this);

        this.state = {
            idProducto: "",
            idCategoriaProd: "",
            descripcionProd: "",
            nombreProd: "",
            imgProd: "",
            precioProd: "",
            temporada: "",
            created_at: "",
        }
    }

    componentDidMount() {
        
    }
}