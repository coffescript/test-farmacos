import React, { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare, faPlusSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Modal, Table } from 'reactstrap';

import Buscar from './Buscar';
import Clientes from './Clientes';
import Doctores from './Doctores';

const DetalleVentas = ({ 
	detalleSecuencial
	, setDetalleSecuencial 
	, setPagar 
	, setCliente 
	, cliente 
	, setDoctor 
	, doctor 
	, datosCliente
	, datosDoctor
	 }) => {

	const [ venta, setVenta ] = useState([]);
	const [ modalIsOpen, setModalIsOpen ] = useState(false);
	const [ modalCliente, setModalCliente ] = useState(false);
	const [ modalDoctor, setModalDoctor ] = useState(false);
	const [ sumaVenta, setSumaVenta ] = useState(0);

	const setModalIsOpenToTrue = () => {
        setModalIsOpen(true);
	}
	const setModalIsOpenToFalse = () => {
        setModalIsOpen(false);
	}
	const abrirModalCliente = () => {
		setModalCliente(true);
	}
	const cerrarModalCliente = () => {
		setModalCliente(false);
	}
	const abrirModalDoctor = () => {
		setModalDoctor(true);
	}
	const cerrarModalDoctor = () => {
		setModalDoctor(false);
	}

	let ventaActivaDetalles = async () => {
		let myHeaders = new Headers();
		const token = JSON.parse(localStorage.getItem('jwt')).access_token;
		let URL = `https://farmacontrolbackend.peacsa.com/api/auth/ventas/ventaActivaDetalles/${detalleSecuencial}`;
		myHeaders.append('Authorization', `Bearer ${token}`);
		return await fetch(URL, {
			method: 'GET',
			headers: myHeaders,
		})
		.then(async response => response.json())
		.then(async responseJSON => {
			setVenta(responseJSON);
		})
		.catch(error=>{
			console.log(error.message);
		})
	}

	let sumaTotalVenta = async () => {
		let myHeaders = new Headers();
		const token = JSON.parse(localStorage.getItem('jwt')).access_token;
		let URL = `https://farmacontrolbackend.peacsa.com/api/auth/ventas/ventaActivaDetallesSuma/${detalleSecuencial}`;
		myHeaders.append('Authorization', `Bearer ${token}`);
		return await fetch(URL, {
			method: 'GET',
			headers: myHeaders,
		})
		.then(async response => response.json())
		.then(async responseJSON => {
			setSumaVenta(responseJSON);
		})
		.catch(error=>{
			console.log(error.message);
		})
	}

	let sumarProducto = async (id) => {
		let URL = "https://farmacontrolbackend.peacsa.com/api/auth/ventas/agregarProductoEnVenta";

		let myHeaders = new Headers();
		const token = JSON.parse(localStorage.getItem('jwt')).access_token;
		const user_id = JSON.parse(localStorage.getItem('jwt')).user_id;
		myHeaders.append('Authorization', `Bearer ${token}`);
		
		let formData = new FormData();
		formData.append('user_id', user_id);
		formData.append('producto_id', id);	
		formData.append('secuencial', detalleSecuencial);	
		
		return await fetch(URL, {
			method: 'POST',
			headers: myHeaders,
			body: formData,
		}).then(async response => response.json())
		.then(async responseJSON => {
			ventaActivaDetalles();
			sumaTotalVenta();
		});
	}

	let restarProducto = async (id) => {
		let URL = "https://farmacontrolbackend.peacsa.com/api/auth/ventas/restarProductoEnVenta";

		let myHeaders = new Headers();
		const token = JSON.parse(localStorage.getItem('jwt')).access_token;
		const user_id = JSON.parse(localStorage.getItem('jwt')).user_id;
		myHeaders.append('Authorization', `Bearer ${token}`);
		
		let formData = new FormData();
		formData.append('user_id', user_id);
		formData.append('producto_id', id);	
		formData.append('secuencial', detalleSecuencial);	
		
		return await fetch(URL, {
			method: 'POST',
			headers: myHeaders,
			body: formData,
		}).then(async response => response.json())
		.then(async responseJSON => {
			ventaActivaDetalles();
			sumaTotalVenta();
		});
	}

	let restarProductoCompelto = async (id) => {
		let URL = "https://farmacontrolbackend.peacsa.com/api/auth/ventas/restarProductoCompletoEnVenta";

		let myHeaders = new Headers();
		const token = JSON.parse(localStorage.getItem('jwt')).access_token;
		const user_id = JSON.parse(localStorage.getItem('jwt')).user_id;
		myHeaders.append('Authorization', `Bearer ${token}`);
		
		let formData = new FormData();
		formData.append('user_id', user_id);
		formData.append('producto_id', id);	
		formData.append('secuencial', detalleSecuencial);	
		
		return await fetch(URL, {
			method: 'POST',
			headers: myHeaders,
			body: formData,
		})
		.then(async response => response.json())
		.then(async responseJSON => {
			ventaActivaDetalles();
			sumaTotalVenta();
		});
	}

	const irPagar = () =>
	{
		setDetalleSecuencial(detalleSecuencial);
		setPagar(true);
	}

	useEffect( () => {
		ventaActivaDetalles();
		sumaTotalVenta();
	}, []);

	useEffect( () => {
		ventaActivaDetalles();
		sumaTotalVenta();
	}, [modalIsOpen]);

	return ( 
		<>
			<button className="btn btn-secondary" onClick={abrirModalCliente}>Asignar cliente</button>{"  "}
			<button className="btn btn-info" onClick={abrirModalDoctor}>Asignar doctor</button>{"  "}
			<button className="btn btn-primary" onClick={setModalIsOpenToTrue}>Buscar productos</button>
			<br />
			<br />
			<Modal isOpen={modalIsOpen} style={{width:'80%'}}>
				<Buscar
					setModalIsOpenToFalse = { setModalIsOpenToFalse }
					detalleSecuencial = { detalleSecuencial }
					setDetalleSecuencial = { setDetalleSecuencial }
				/>
			</Modal>
			<Modal isOpen={modalCliente} style={{width:'80%'}}>
				<Clientes
					cerrarModalCliente = { cerrarModalCliente }
					setCliente = { setCliente }
				/>
			</Modal>
			<Modal isOpen={modalDoctor} style={{width:'80%'}}>
				<Doctores
					cerrarModalDoctor = { cerrarModalDoctor }
					setDoctor = { setDoctor }
				/>
			</Modal>
			<Table striped bordered hover size="sm">
				<thead>
					<tr >
						<th colSpan="5" >
							Detalle de la venta {detalleSecuencial}
						</th>
					</tr>
					<tr >
						<th colSpan="5" >
							Cliente: {datosCliente.razon_social}
						</th>
					</tr>
					{datosDoctor.id > 1 
					?
						<tr >
							<th colSpan="5" >
								Doctor: {datosDoctor.nombre}
							</th>
						</tr>
					: 
						null
					}
					<tr >
						<th colSpan="5" >
							&nbsp;
						</th>
					</tr>
					<tr>
					<th>Nombre</th>
					<th>Cantidad</th>
					<th>Precio unitario</th>
					<th>Sub Total</th>
					<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{
					( (typeof venta === undefined) || (venta === null) )
					? null
					: (venta.map( item => {
						return(
							<tr key={item.uuid}>
								<td>{item.descripcion_corta}</td>
								<td>{item.cantidad}</td>
								<td>
									<NumberFormat thousandSeparator={true} displayType={'text'} prefix={'$ '} value={(Math.round((item.precio_total / item.cantidad) * 100) / 100).toFixed(2)} />
								</td>
								<td>
									<NumberFormat thousandSeparator={true} displayType={'text'} prefix={'$ '} value={item.precio_total} />
								</td>
								<td>
									<button className="btn btn-danger" onClick={()=>{restarProductoCompelto(item.id)}}><FontAwesomeIcon icon={faTrash}/></button>
									{"   "}
									<button className="btn btn-warning" onClick={()=>{restarProducto(item.id)}}><FontAwesomeIcon icon={faMinusSquare}/></button>
									{"   "}
									<button className="btn btn-success" onClick={()=>{sumarProducto(item.id)}} ><FontAwesomeIcon icon={faPlusSquare}/></button>
								</td>
							</tr>
						)
					}))
					}
					<tr>
						<td colSpan="3">
							Total
						</td>
						<td colSpan="2">
							<NumberFormat thousandSeparator={true} displayType={'text'} prefix={'$ '} value={sumaVenta} />
						</td>
					</tr>
				</tbody>
			</Table>
			{(sumaVenta)
			? <button className="btn btn-success" onClick={()=>irPagar()}>Pagar</button>
			: <button className="btn btn-success" disabled>Pagar</button>
			}
			<br />
			<br />
		</> 
	);
}
 
export default DetalleVentas;