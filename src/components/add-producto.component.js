import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

import UploadProductoService from '../services/producto.service'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import { Container } from 'react-bootstrap';

//var imagenProd;

export default class AddProducto extends Component {    
    constructor(props) {
        super(props);
        this.onChangeidCatProd = this.onChangeidCatProd.bind(this);
        this.onChangeDescripcion = this.onChangeDescripcion.bind(this);
        this.onChangeNombre = this.onChangeNombre.bind(this);        
        this.handleImageChange = this.handleImageChange.bind(this);
        this.onChangePrecioProd = this.onChangePrecioProd.bind(this);
        this.onChangeTemporada = this.onChangeTemporada.bind(this);
        this.upload = this.upload.bind(this);
        this.retrieveTemporadas = this.retrieveTemporadas.bind(this);
        this.retrieveCatProd = this.retrieveCatProd.bind(this);
        
        this.state = {
            idProducto: null,
            categoriaProd: "",
            descripcionProd: "",
            nombreProd: "",
            imagenProd: "",
            precioProd: "",
            temporada: "",
            created_at: null,

            imgPreview: '',

            idCatProd: "",
            idTemporada: "",

            temporadas: [],
            categoriasProd: [],

            submitted: false,
        }
    }
    

    componentDidMount() {
        this.retrieveTemporadas();
        this.retrieveCatProd();
    }

    onChangeidCatProd(e) {
        const categoriaProd = e.target.value;
        let id = -1;
        this.state.categoriasProd.map( res => {
            if (res.nombreCatP ===  categoriaProd) {
                id = res.idCategoriaCatP;
            }
        })
        this.setState({
            categoriaProd: categoriaProd,
            idCatProd: id,
        });
    }

    onChangeDescripcion(e) {
        const descripcionProd = e.target.value;
        this.setState({
            descripcionProd: descripcionProd
        });
    }

    onChangeNombre(e) {
        const nombreProd = e.target.value;
        this.setState({
            nombreProd: nombreProd
        });
    }    

    handleImageChange = (e) => {
        //imagenProd = e.target.files[0];
        let imageAsBase64 = URL.createObjectURL(e.target.files[0]);
        let imageAsFiles = e.target.files[0];
        this.setState({
            imagenProd: imageAsFiles,
            imgPreview: imageAsBase64,
        })
        console.log(this.state.imagenProd);
    };

    onChangePrecioProd(e) {
        const precioProd = e.target.value;
        this.setState({
            precioProd: precioProd
        });
    }

    onChangeTemporada(e) {
        const temporada = e.target.value;
        let id = -1;
        this.state.temporadas.map( res => {
            if (res.nombreTemp ===  temporada) {
                id = res.id;
            }
        })
        this.setState({
            temporada: temporada,
            idTemporada: id,
        });
    }

    upload() {
        let formData = new FormData();
        formData.set('idProducto', this.state.idProducto);
        formData.set('idCategoriaProd', this.state.idCatProd);
        formData.set('descripcionProd', this.state.descripcionProd);        
        formData.set('nombreProd', this.state.nombreProd);   
        /*for( var i = 0; i < this.state.imagenProd.length; i++ ) {
            let file = this.state.imagenProd[i];
            formData.append('imgProd[' + i + ']', file);
        }*/
        formData.append('imgProd', this.state.imagenProd, this.state.imagenProd.name);     
        formData.set('precioProd', this.state.precioProd);
        formData.set('temporada', this.state.idTemporada);
        formData.set('created_at', this.state.created_at);                

        UploadProductoService.upload(formData).then(res => {
            console.log(res.data);
            this.setState({
                submitted: true
            });
        }).catch(err => console.log(err));
    };

    retrieveTemporadas() {
        UploadProductoService.getAllTemporadas().then(res => {
            this.setState({
                temporadas: res.data
            });
            console.log(res.data);
        }).catch(e => {
            console.log(e);
        })
    }

    retrieveCatProd() {
        UploadProductoService.getAllCatProd().then(res => {
            this.setState({
                categoriasProd: res.data
            });
            console.log(res.data);
        }).catch(e => {
            console.log(e);
        })
    }

    render() {
        //const { temporadas, categoriasProd } = this.state;
        const temporadas = this.state.temporadas;
        const categoriasProd = this.state.categoriasProd;
        return (
            <div>
                { this.state.submitted ? (
                    <div>
                        <h4>¡El producto se subió con éxito!</h4>
                    </div>
                ) : (
                    <div>
                        <Form>
                            <Form.Group>
                                <Form.Label>
                                    Selecciona la categoría
                                </Form.Label>
                                <Form.Control 
                                    as="select"                                    
                                    value={this.state.categoriaProd}
                                    onChange={this.onChangeidCatProd} 
                                    required
                                >
                                    <option>-</option>
                                    { categoriasProd &&
                                        categoriasProd.map((catProd, id) => (
                                            <option key={id}>
                                                {catProd.nombreCatP}
                                            </option>
                                        ))                                            
                                    }                                    
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>                                    
                                <Form.Control 
                                    type="text"
                                    name="descripcionProducto"
                                    placeholder="Descripción"
                                    value={this.state.descripcionProd} 
                                    onChange={this.onChangeDescripcion} 
                                    required 
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control 
                                    type="text"
                                    name="nombreProducto"
                                    placeholder="Nombre"
                                    value={this.state.nombreProd} 
                                    onChange={this.onChangeNombre} 
                                    required 
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control 
                                    type="text"
                                    name="precioProducto"
                                    placeholder="Precio"
                                    value={this.state.precioProd} 
                                    onChange={this.onChangePrecioProd} 
                                    required 
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    Selecciona la temporada
                                </Form.Label>
                                <Form.Control 
                                    as="select"
                                    value={this.state.temporada} 
                                    onChange={this.onChangeTemporada} 
                                    required
                                >
                                    <option>-</option>
                                    { temporadas &&
                                        temporadas.map((temporada, id) => (
                                            <option key= {id}>
                                                {temporada.nombreTemp}
                                            </option>
                                        ))                                            
                                    }
                                </Form.Control>
                            </Form.Group>   
                            <Form.Group>
                                <Form.File 
                                    id="imagenProd"
                                    label="Selecciona foto"
                                    data-browse="Selecciona imagen"
                                    accept="image/png, image/jpeg, image/jpg"
                                    onChange={this.handleImageChange}
                                    required
                                />
                            </Form.Group> 
                        </Form>  
                        <Container>
                            <Image 
                                src={this.state.imgPreview}
                                roundedCircle
                            />
                        </Container>
                        <>
                            <Button
                                variant="primary"
                                onClick={this.upload}
                            >
                                Subir
                            </Button>
                        </>                                                                   
                    </div>
                    )
                }
            </div>
        )
    }

 

}
