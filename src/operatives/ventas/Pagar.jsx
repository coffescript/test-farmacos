import React, { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMinusSquare, faPlusSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Table, Input } from 'reactstrap';
import { Impresora } from './Impresora';

const Pagar = ({ detalleSecuencial, datosCliente, datosDoctor }) => {

	const RUTA_API = "http://localhost:8000";

	const [ sumaVenta, setSumaVenta ] = useState(0);
	const [ error, setError ] = useState(false);
	// const [ sumaPago, setSumaPago ] = useState(0);

	const [ efectivo, setEfectivo ] = useState();
	const [ tcredito, setTcredito ] = useState();
	const [ tdebito, setTdebito ] = useState();
	const [ suma, setSuma ] = useState(0);

	const [ venta, setVenta ] = useState([]);

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
			const res = (Math.round((responseJSON) * 100) / 100).toFixed(2)
			setSumaVenta(res);
		})
		.catch(error=>{
			console.log(error.message);
		})
	}

	const [ pago, actualizarPago ] = useState({
		efectivo: 0,
		tcredito: 0,
		tdebito: 0,
	});

	const actualizarState = (e) => {
		actualizarPago({
			...pago,
			[e.target.name]: parseFloat(e.target.value)
		});
		suma_pagos(pago);
	}

	const suma_pagos = (pago) => {
		const { efectivo, tcredito, tdebito } = pago;
		const newTotal = (Math.round((parseFloat(efectivo) + parseFloat(tcredito) + parseFloat(tdebito)) * 100) / 100).toFixed(2);
		setSuma(newTotal);
	} 

	const registrarPago = (detalleSecuencial, efe, tc, td) => {
		alert(`Registar pago: ${detalleSecuencial} ${efe}, ${tc}, ${td}`);
	}
	const generarTicket = (detalleSecuencial, efe, tc, td) => {


		
		let impresora = new Impresora(RUTA_API);
		
		// impresora.setFontSize(1, 1);
		// impresora.write("Fuente 1,1\n");
		// impresora.setFontSize(1, 2);
		// impresora.write("Fuente 1,2\n");
		// impresora.setFontSize(2, 2);
		// impresora.write("Fuente 2,2\n");
		// impresora.setFontSize(2, 1);
		// impresora.write("Fuente 2,1\n");
		// impresora.setFontSize(1, 1);
		// impresora.setEmphasize(1);
		// impresora.write("Emphasize 1\n");
		// impresora.setEmphasize(0);
		// impresora.write("Emphasize 0\n");
		// impresora.setAlign("center");
		// impresora.write("Centrado\n");
		// impresora.setAlign("left");
		// impresora.write("Izquierda\n");
		// impresora.setAlign("right");
		// impresora.write("Derecha\n");
		// impresora.setFont("A");
		// impresora.write("Fuente A\n");
		// impresora.setFont("B");
		// impresora.write("Fuente B\n");
		// impresora.feed(2);
		// impresora.write("Separado por 2\n");
		// impresora.cutPartial(); // Pongo este y también cut porque en ocasiones no funciona con cut, solo con cutPartial
		// impresora.cut();

		impresora.feed(2);
		impresora.setFont("B");
		impresora.setFontSize(2, 2);
		impresora.setAlign("center");
		impresora.write("Ticket de venta");
		impresora.feed(1);
		impresora.write("------------------------------");
		impresora.feed(1);
		impresora.setFontSize(1, 1);
		const sucursal = JSON.parse(localStorage.getItem('jwt')).sucursal;
		impresora.write(`Ticket: ${sucursal}-${detalleSecuencial}\n`);
		impresora.write("Atiende: \n");
		impresora.write(`Cliente: ${removeAccents(datosCliente.razon_social)}\n`);
		if(datosDoctor.id > 1) {
			impresora.write(`Doctor: ${removeAccents(datosDoctor.nombre)}`)
			impresora.feed(1);
		}  
		impresora.setFontSize(2, 2);
		impresora.write("------------------------------");
		
		impresora.feed(2);
		impresora.setFontSize(1, 1);
		impresora.setAlign("left");
		impresora.write(`${columnaIzquierda("Producto", 33)}`);
		impresora.write(`${columnaDerecha("Cant", 8)}`);
		impresora.write(`${columnaDerecha("P.Unit", 9)}`);
		impresora.write(`${columnaDerecha("Total", 10)}`);
		impresora.write("+---------------------------------+------+--------+--------+");
		impresora.feed(1);

		venta.forEach(item => {
			let unitario = (Math.round((item.precio_total / item.cantidad) * 100) / 100).toFixed(2);
			let precio_total = (Math.round((item.precio_total) * 100) / 100).toFixed(2);
			impresora.setAlign("left");
			impresora.write(`${columnaIzquierda(removeAccents(item.descripcion_corta), 33)}`);
			impresora.write(`${columnaDerecha(item.cantidad, 8)}`);
			impresora.write(`${columnaDerecha(unitario, 9)}`);
			impresora.write(`${columnaDerecha(precio_total, 10)}`);
			impresora.feed(1);
		});
		let sumaV = (Math.round((sumaVenta) * 100) / 100).toFixed(2);
		impresora.setFontSize(2, 2);
		impresora.write("------------------------------");
		impresora.write(`TOTAL:`);
		impresora.write(`${columnaDerecha(sumaV, 24)}`);
		impresora.feed(1);
		impresora.write("------------------------------");
		impresora.feed(2);

		impresora.setAlign("center");
		impresora.write(`Forma de pago`);
		impresora.feed(1);
		impresora.setAlign("left");
		if( (efe === sumaV)&&(tc === 0)&&(td === 0) ) {
			impresora.write(`EFECTIVO:`);
			impresora.write(`${columnaDerecha(sumaV, 21)}`);
		}else if( (efe === 0)&&(tc === sumaV)&&(td === 0) ) {
				impresora.write(`Tarjeta de crédito:`);
			impresora.write(`${columnaDerecha(sumaV, 12)}`);
		}

		impresora.feed(3);
		impresora.cut();
		impresora.end();
	}

	const submitPago = e => {
		e.preventDefault();
		console.log("e: ", e)
		// let efe = e.efectivo.value;
		// let tc = e.tcredito.value;
		// let td = e.tdebito.value;
		const operative_sistem = getOs();
		// if(operative_sistem==='Windows') {
		// 	generarTicket(detalleSecuencial, efe, tc, td);
		// }
		// registrarPago(detalleSecuencial, efe, tc, td);
	}

	const pagarConEfectivo = () => {
		setEfectivo(sumaVenta);
		setTcredito(0);
		setTdebito(0);
		suma_pagos(pago);
		const operative_sistem = getOs();
		if(operative_sistem==='Windows') {
			generarTicket(detalleSecuencial, sumaVenta, 0, 0);
		}
		registrarPago(detalleSecuencial, sumaVenta, 0, 0);
	}
	const pagarConCredito = () => {
		setEfectivo(0);
		setTcredito(sumaVenta);
		setTdebito(0);
		suma_pagos(pago);
		const operative_sistem = getOs();
		if(operative_sistem==='Windows') {
			generarTicket(detalleSecuencial, 0, sumaVenta, 0);
		}
		registrarPago(detalleSecuencial, 0, sumaVenta, 0);
	}
	const pagarConDebito = () => {
		setEfectivo(0);
		setTcredito(0);
		setTdebito(sumaVenta);
		suma_pagos(pago);
		const operative_sistem = getOs();
		if(operative_sistem==='Windows') {
			generarTicket(detalleSecuencial, 0, 0, sumaVenta);
		}
		registrarPago(detalleSecuencial, 0, 0, sumaVenta);
	}

	const removeAccents = (str) => {
		return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	} 

	const columnaIzquierda = ( str, width ) => {
		let str0 = str.substring(0, width);
		return str0.padEnd(width, ' ');
	}

	const columnaDerecha = ( str, width ) => {
		let str0 = str.substring(0, width);
		return str0.padStart(width, ' ');
	}

	const formatMoney = (n) => {
		return (Math.round(n * 100) / 100).toLocaleString();
	}

	const getOs = () => {
		const os = ['Windows', 'Linux', 'Mac', 'Android', 'iOS']; 
		return os.find(v=>navigator.appVersion.indexOf(v) >= 0);
	}

	useEffect( () => {
		sumaTotalVenta();
		ventaActivaDetalles();
	}, []);

	useEffect( () => {
		suma_pagos(pago);
	}, [pago] )

	return ( 
	<div>

		{ error ? <p className="alerta-error">Los valores no corresponden al total de la venta</p> : null }

		<form
			onSubmit = {submitPago}
		>
			<Table striped bordered hover size="sm">	
				<thead>
					<tr>
						<th colSpan="3">
							Detalle de la venta {detalleSecuencial}
						</th>
					</tr>
					<tr>
						<th colSpan="3">
							Cliente: {datosCliente.razon_social}
						</th>
					</tr>
					{datosDoctor 
					?
						<tr>
							<th colSpan="3" >
								Doctor: {datosDoctor.nombre}
							</th>
						</tr>
					: 
						null
					}

					<tr>
						<th colSpan="3">
							&nbsp;
						</th>
					</tr>
					<tr>
						<th colSpan="3">
							Por pagar: <NumberFormat thousandSeparator={true} displayType={'text'} prefix={'$ '} value={sumaVenta} />
						</th>
					</tr>
					<tr>
						<th colSpan="3">
							&nbsp;
						</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td>
							Efectivo
						</td>
						<td>
							<Input
								type 		= "number"
								name 		= "efectivo"
								step		= ".01"
								onChange 	= {actualizarState}
								value 		= {efectivo}
							/>
						</td>
						<td>
							<button
								type 		= "button"
								onClick 	= {() => { if (window.confirm('Esta seguro que desea pagar con efectivo?')) pagarConEfectivo(detalleSecuencial); } }
								className 	= "btn btn-info"
							>Pagar todo con efectivo</button>
						</td>
					</tr>

					<tr>
						<td>
							Tarjeta de crédito
						</td>
						<td>
							<Input
								type 		= "number"
								name 		= "tcredito"
								step		= ".01"
								onChange 	= {actualizarState}
								value 		= {tcredito}
							/>
						</td>
						<td>
							<button
								type 		= "button"
								onClick 	= {() => { if (window.confirm('Esta seguro que desea pagar con tarjeta de crédito?')) pagarConCredito(detalleSecuencial); } }
								className 	= "btn btn-danger"
							>Pagar todo con crédito</button>
						</td>
					</tr>

					<tr>
						<td>
							Tarjeta de débito
						</td>
						<td>
							<Input
								type 		= "number"
								name 		= "tdebito"
								step		= ".01"
								onChange 	= {actualizarState}
								value 		= {tdebito}
							/>
						</td>
						<td>
							<button
								type 		= "button"
								onClick 	= {() => { if (window.confirm('Esta seguro que desea pagar con tarjeta de débito?')) pagarConDebito(detalleSecuencial); } }
								className 	= "btn btn-warning"
							>Pagar todo con débito</button>
						</td>
					</tr>

					<tr>
						<td>
							<b>SUMA</b>
						</td>
						<td colSpan="2">
							<b>
								<NumberFormat thousandSeparator={true} displayType={'text'} prefix={'$ '} value={(Math.round((sumaVenta) * 100) / 100).toFixed(2)} />
							</b>
						</td>
					</tr>
					<tr>
						<td>
							(diferencia)
						</td>
						<td colSpan="2">
							<NumberFormat thousandSeparator={true} displayType={'text'} prefix={'$ '} value={(Math.round((suma - sumaVenta) * 100) / 100).toFixed(2)} />
						</td>
					</tr>

					<tr>
						<td colSpan="3">
							{(sumaVenta === suma)
								?
								<button
									type 		= "submit"
									className 	= "btn btn-success"
								>Pagar</button>
								:
								<button
									type 		= "submit"
									className 	= "btn btn-success"
									disabled
								>Pagar</button>
							}
						</td>
					</tr>

				</tbody>

			</Table>
		</form>
		<br />
		<br />
	</div> 
	);
}
 
export default Pagar;