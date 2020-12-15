import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
import swal from 'sweetalert';
import { v4 as uuid } from 'uuid';

const url="https://farmacontrolbackend.peacsa.com/api/auth/sucursales";

class App extends Component {
	state={
		data:[],
		modalInsertar: false,
		modalEliminar: false,
		form:{
			id: '',
			uuid: '',
			nombre: '',
			domicilio: '',
			telefono1: '',
			telefono2: '',
			impresora: '',
			tipoModal: ''
		}
	}

	peticionGet = async () => {
		let myHeaders = new Headers();
		const token = JSON.parse(localStorage.getItem('jwt')).access_token;
		myHeaders.append('Authorization', `Bearer ${token}`);
		return await fetch(`${url}/index`, {
			method: 'GET',
			headers: myHeaders,
		})
		.then(async response => response.json())
		.then(async responseJSON => {
			this.setState({data: responseJSON.data});
		})
		.catch(error=>{
			console.log(error.message);
		})
	}

	peticionPost = async () => {
		delete this.state.form.id;
		const token = JSON.parse(localStorage.getItem('jwt')).access_token;
		this.state.form.uuid = uuid();
		await axios.post(`${url}/store`, this.state.form , { headers: {'Authorization': `Bearer ${token}`}})
		.then(response=>{
			this.modalInsertar();
			this.peticionGet();
		})
		.catch(error=>{
			console.log(error.response.status);
		})
	}

	peticionPut = () => {
		const token = JSON.parse(localStorage.getItem('jwt')).access_token;
		axios.put(`${url}/update/${this.state.form.id}` , 
		this.state.form , 
		{ headers: {
			'Authorization': `Bearer ${token}`
		}})
		.then(response=>{
			this.modalInsertar();
			this.peticionGet();
		})
		.catch(error=>{
			if(error.response.status === 422) swal("Error", "Imposible procesar, debe cambiar al menos un valor");
		})
	}

	peticionDelete = () => {
		const token = JSON.parse(localStorage.getItem('jwt')).access_token;
		axios.delete(`${url}/delete/${this.state.form.id}` , { headers: {'Authorization': `Bearer ${token}`}})
		.then(response=>{
			this.setState({modalEliminar: false});
			this.peticionGet();
		})
		.catch(error=>{
			console.log(error.message);
		})
	}

	modalInsertar = () => {
		this.setState({modalInsertar: !this.state.modalInsertar});
	}

	seleccionarItem=(item)=>{
		this.setState({
			tipoModal: 'actualizar',
			form: {
			id: item.id,
			nombre: item.nombre,
			domicilio: item.domicilio,
			telefono1: item.telefono1,
			telefono2: item.telefono2,
			impresora: item.impresora,
			}
		})
	}

	handleChange=async e => {
		e.persist();
		await this.setState({
		form:{
			...this.state.form,
			[e.target.name]: e.target.value
		}
		});
	}

	/**
	 *  Ver si se puede reemplazar después por useEffect 
	*/
	componentDidMount() {
		this.peticionGet();
	}

	render(){
		const {form}=this.state;
		return (
			<div className="App">
				<h3>Sucursales</h3>
				<br />

				<Table striped bordered hover size="sm">
					<thead>
						<tr>
						<th>ID</th>
						<th>Nombre</th>
						<th>Domicilio</th>
						<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{this.state.data.map(item=>{
							return(
								<tr key={item.id}>
									<td>{item.id}</td>
									<td>{item.nombre}</td>
									<td>{item.domicilio}</td>
									<td>
										
										<button className="btn btn-primary" onClick={()=>{this.seleccionarItem(item); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
										{"   "}
										<button className="btn btn-danger" onClick={()=>{this.seleccionarItem(item); this.setState({modalEliminar: true})}} ><FontAwesomeIcon icon={faTrashAlt}/></button>
										
									</td>
								</tr>
							)
						})}
					</tbody>
				</Table>

				<button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar</button>
				<br />
				<br />




				<Modal isOpen={this.state.modalInsertar}>
					<ModalHeader style={{display: 'block'}}>
						{this.state.tipoModal==='insertar' ? 'Agregar nuevo registro' : 'Editar registro' }
						<span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
					</ModalHeader>

					<ModalBody>
						<div className="form-group">
							<label htmlFor="nombre">Nombre</label> 
							<input className="form-control" type="text" name="nombre" id="nombre" onChange={this.handleChange} value={form?form.nombre: ''}/>
							<label htmlFor="nombre">Domicilio</label>
							<input className="form-control" type="text" name="domicilio" id="domicilio" onChange={this.handleChange} value={form?form.domicilio: ''}/>
							<label htmlFor="capital_bursatil">Teléfono 1</label>
							<input className="form-control" type="text" name="telefono1" id="telefono1" onChange={this.handleChange} value={form?form.telefono1:''}/>
							<label htmlFor="capital_bursatil">Teléfono 2</label>
							<input className="form-control" type="text" name="telefono2" id="telefono2" onChange={this.handleChange} value={form?form.telefono2:''}/>
							<label htmlFor="capital_bursatil">Impresora de tickets predeterminada</label>
							<input className="form-control" type="text" name="impresora" id="impresora" onChange={this.handleChange} value={form?form.impresora:''}/>
						</div>
					</ModalBody>

					<ModalFooter>
						{this.state.tipoModal==='insertar'?
							<button className="btn btn-success" onClick={()=>this.peticionPost()}>
								Insertar
							</button>
							: 
							<button className="btn btn-primary" onClick={()=>this.peticionPut()}>
								Actualizar
							</button>
						}
							<button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
					</ModalFooter>
				</Modal>


				<Modal isOpen={this.state.modalEliminar}>
					<ModalBody>
						Estás seguro que deseas eliminar {form && form.nombre} ?
					</ModalBody>
					<ModalFooter>
						<button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
						<button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
						</ModalFooter>
				</Modal>
			</div>
		);
	}
}
export default App;