import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';

function Buscar ({ setModalIsOpenToFalse, detalleSecuencial, setDetalleSecuencial }) {

	const [ texto, setTexto ] = useState('');
	const [ resultado, setResultado ] = useState([]);
	const [ venta2, setVenta2 ] = useState([]);

	let actualizaTexto = e => { setTexto(e.target.value) }

	const agregarProducto = async (id) =>
	{
		let contador;

		if(venta2) {
			contador = countInArray(venta2, id);
		} else {
			contador = 0;
		}

		if(contador) {

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
			})
			.then(async response => response.json())
			.then(async responseJSON => {
				ventaActivaDetallesBuscar();
				setModalIsOpenToFalse();
			})

		} else {
			
			let URL = "https://farmacontrolbackend.peacsa.com/api/auth/ventas/insertarUnProducto";

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
				setDetalleSecuencial(responseJSON.data.secuencial);
				ventaActivaDetallesBuscar();
				setModalIsOpenToFalse();
			})
		}
	}

	function countInArray(arr, val) {
		let contador = 0;
		arr.map(item=>{
			if(item.id === val) contador++;
		})
		return contador;
	}

	let busquedaContinua = async () => {
		if (texto.length) {
			let URL = `https://farmacontrolbackend.peacsa.com/api/auth/productos/dynamicSearch?value=${texto}`;
			let myHeaders = new Headers();
			const token = JSON.parse(localStorage.getItem('jwt')).access_token;
			myHeaders.append('Authorization', `Bearer ${token}`);
			return await fetch(URL, {
				method: 'GET',
				headers: myHeaders,
			})
			.then(async response => response.json())
			.then(async responseJSON => {
				setResultado(responseJSON);
			})
			.catch(error=>{
				console.log(error.message);
			})
		}
	}

	let ventaActivaDetallesBuscar = async () => {
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
			setVenta2(responseJSON);
		})
		.catch(error=>{
			console.log(error.message);
		})
	}

	useEffect( () => {
		ventaActivaDetallesBuscar();
	}, []);

	useEffect( () => {
		busquedaContinua();
	}, [texto] );
	
	const submitHandler = (e) => {
		e.preventDefault();
	}

        return (
            <>
				<ModalHeader style={{display: 'block'}}>
					<h3>Buscar productos o servicios
					<span style={{float: 'right'}} onClick={setModalIsOpenToFalse}>x</span>
					</h3>
				</ModalHeader>

				<ModalBody>
					<form onSubmit={submitHandler}>

					<div className="form-group">
						<label htmlFor="texto">Texto a buscar</label> 
						<input
							type 			= "text"
							name 			= "texto"
							className 		= "form-control"
							onChange 		= { actualizaTexto }
						/>

					</div>
						{
						((typeof resultado === 'undefined') || (resultado === null ))
							? null
							: (resultado.length)
								? 
								<Table striped bordered hover size="sm">
									<thead>
										<tr>
										<th style={{ textAlign: 'center'}}>Descripción</th>
										<th style={{ textAlign: 'center'}}>Acción</th>
										</tr>
									</thead>
									<tbody>
									{resultado.map(item=>{
										return(
											<tr key={item.id}>
												<td>{item.id} {item.descripcion_corta}</td>
												<td style={{ textAlign: 'center'}}>
													<button 
														className="btn btn-success"
														onKeyDown = "return event.key != 'Enter';" 
														onClick={()=>{agregarProducto(item.id)}}
													>
														<FontAwesomeIcon icon={faPlusSquare}/>
													</button>
												</td>
											</tr>
										)
									})}
									</tbody>
								</Table>
								: null
						}
					<div>

					</div>
					</form>

				</ModalBody>

				<ModalFooter>
						{/* <button className="btn btn-success" >
							Insertar
						</button>
						<button className="btn btn-danger" >Cancelar</button> */}
				</ModalFooter>
            </>
        )

}

export default Buscar