import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';

const Cliente = ({ cerrarModalCliente, setCliente }) => {

	const [ texto, setTexto ] = useState('');
	const [ resultado, setResultado ] = useState([]);

	let actualizaTexto = e => { setTexto(e.target.value) }

	let busquedaContinua = async () => {
		if (texto.length) {
			let URL = `https://farmacontrolbackend.peacsa.com/api/auth/clientes/dynamicSearch?value=${texto}`;
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

	const definirCliente = (id) => {
		// console.log("cliente: ", id);
		setCliente(id);
		cerrarModalCliente();
	}

	useEffect( () => {
		busquedaContinua();
	}, [texto] );

	const submitHandler = (e) => {
		e.preventDefault();
	}

	return ( 
		<>
		<ModalHeader style={{display: 'block'}}>
			<h3>Buscar cliente
			<span style={{float: 'right'}} onClick={cerrarModalCliente}>x</span>
			</h3>
		</ModalHeader>

		<ModalBody>
			<form onSubmit={submitHandler}>

			<div className="form-group">
				<label htmlFor="texto">Nombre a buscar</label> 
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
							<th style={{ textAlign: 'center'}}>Nombre</th>
							<th style={{ textAlign: 'center'}}>Acción</th>
							</tr>
						</thead>
						<tbody>
						{resultado.map(item=>{
							return(
								<tr key={item.id}>
									<td>{item.id} {item.razon_social}</td>
									<td style={{ textAlign: 'center'}}>
										<button 
											className="btn btn-success"
											onKeyDown = "return event.key != 'Enter';" 
											onClick={()=>{definirCliente(item.id)}}
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
);
}
 
export default Cliente;