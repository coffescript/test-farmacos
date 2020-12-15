import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks } from '@fortawesome/free-solid-svg-icons';

const VentasPendientes = ({ setDetalleSecuencial }) => {

	const [ ventas, setVentas ] = useState([]);
	const user_name = JSON.parse(localStorage.getItem('jwt')).name;

	let ventasActivasUsuario = async () => {
		let myHeaders = new Headers();
		const token = JSON.parse(localStorage.getItem('jwt')).access_token;
		const user_id = JSON.parse(localStorage.getItem('jwt')).user_id;
		let URL = `https://farmacontrolbackend.peacsa.com/api/auth/ventas/ventasActivas/${user_id}`;
		myHeaders.append('Authorization', `Bearer ${token}`);
		return await fetch(URL, {
			method: 'GET',
			headers: myHeaders,
		})
		.then(async response => response.json())
		.then(async responseJSON => {
			setVentas(responseJSON);
		})
		.catch(error=>{
			console.log(error.message);
		})
	}

	const irDetalleVentas = secuencial => setDetalleSecuencial(secuencial);
	
	useEffect( () => {
		ventasActivasUsuario();
	}, []);

	console.log("ventas: ", ventas);

	return ( 
		<>
			<Table striped bordered hover size="sm">
				<thead>
					<tr>
						<th colSpan="3" >
							Ventas pendientes del usuario {user_name}
						</th>
					</tr>
					<tr>
					<th style={{ textAlign: 'center'}}>Venta</th>
					<th style={{ textAlign: 'center'}}>Monto</th>
					<th style={{ textAlign: 'center'}}>Acción</th>
					</tr>
				</thead>
				<tbody>
				{
					( (typeof ventas === 'undefined') || (ventas === null ) || (ventas.length === 0) )
						? null
						: <>
							{ventas.map(item=>{
								return(
									<tr key={item.secuencial}>
										<td>{item.secuencial}</td>
										<td>
											<NumberFormat thousandSeparator={true} displayType={'text'} prefix={'$ '} value={item.monto} />
										</td>
										<td style={{ textAlign: 'center'}}>
										<button className="btn btn-primary" onClick={()=>irDetalleVentas(item.secuencial)}><FontAwesomeIcon icon={faTasks}/></button>
										</td>
									</tr>
								)
							})}			
						</>
				}
				</tbody>
			</Table>
			<button className="btn btn-primary" onClick={()=>irDetalleVentas(0)}>Nueva venta</button>
		</>
	);
}

export default VentasPendientes;