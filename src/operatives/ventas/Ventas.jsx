import React, { Fragment, useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import VentasPendientes from './VentasPendientes';
import DetalleVentas from './DetalleVentas';
import Pagar from './Pagar';

const Ventas = () => {

	const [ detalleSecuencial, setDetalleSecuencial ] = useState('');
	const [ cliente, setCliente ] = useState(1);
	const [ datosCliente, setDatosCliente ] = useState('');
	const [ doctor, setDoctor ] = useState(1);
	const [ datosDoctor, setDatosDoctor ] = useState('');
	const [ pagar, setPagar ] = useState(false);

	let actualizarClienteVenta = async (id) => {
		let URL = "https://farmacontrolbackend.peacsa.com/api/auth/ventas/actualizarClienteVenta";

		let myHeaders = new Headers();
		const token = JSON.parse(localStorage.getItem('jwt')).access_token;
		myHeaders.append('Authorization', `Bearer ${token}`);
		
		let formData = new FormData();
		formData.append('cliente_id', cliente);
		formData.append('secuencial', detalleSecuencial);	
		
		return await fetch(URL, {
			method: 'POST',
			headers: myHeaders,
			body: formData,
		})
		.then(async response => response.json())
		.then(async responseJSON => {
			ventaActivaCliente();
		});
	}

	let ventaActivaCliente = async () => {
		if(detalleSecuencial > 0) {
			let myHeaders = new Headers();
			const token = JSON.parse(localStorage.getItem('jwt')).access_token;
			let URL = `https://farmacontrolbackend.peacsa.com/api/auth/ventas/ventaActivaCliente/${detalleSecuencial}`;
			myHeaders.append('Authorization', `Bearer ${token}`);
			return await fetch(URL, {
				method: 'GET',
				headers: myHeaders,
			})
			.then(async response => response.json())
			.then(async responseJSON => {
				setDatosCliente(responseJSON);
			})
			.catch(error=>{
				console.log(error.message);
			})
		}
	}

	let actualizarDoctorVenta = async (id) => {
		let URL = "https://farmacontrolbackend.peacsa.com/api/auth/ventas/actualizarDoctorVenta";

		let myHeaders = new Headers();
		const token = JSON.parse(localStorage.getItem('jwt')).access_token;
		myHeaders.append('Authorization', `Bearer ${token}`);
		
		let formData = new FormData();
		formData.append('doctor_id', doctor);
		formData.append('secuencial', detalleSecuencial);	
		
		return await fetch(URL, {
			method: 'POST',
			headers: myHeaders,
			body: formData,
		})
		.then(async response => response.json())
		.then(async responseJSON => {
			ventaActivaDoctor();
		});
	}

	let ventaActivaDoctor = async () => {
		if(detalleSecuencial > 0) {
			let myHeaders = new Headers();
			const token = JSON.parse(localStorage.getItem('jwt')).access_token;
			let URL = `https://farmacontrolbackend.peacsa.com/api/auth/ventas/ventaActivaDoctor/${detalleSecuencial}`;
			console.log("ventaActivaDoctor url: ", URL)
			myHeaders.append('Authorization', `Bearer ${token}`);
			return await fetch(URL, {
				method: 'GET',
				headers: myHeaders,
			})
			.then(async response => response.json())
			.then(async responseJSON => {
				setDatosDoctor(responseJSON);
			})
			.catch(error=>{
				console.log(error.message);
			})
		}
	}

	useEffect( () => {
		actualizarClienteVenta();
		// eslint-disable-next-line no-console
	}, [cliente]);

	useEffect( () => {
		// eslint-disable-next-line no-console
		actualizarDoctorVenta();
	}, [doctor]);

	useEffect( () => {
		ventaActivaCliente();
		ventaActivaDoctor();
	}, [detalleSecuencial]);

	// useEffect(() => {
	// 		Impresora.setImpresora("Termica");
	// 		const RUTA_API = "http://localhost:8000";
	// 		let impresora = new Impresora(RUTA_API);
	// 		impresora.cut();
	// 		impresora.end();
	// }, [])

	console.log("doctor: ", doctor);
	console.log("datosDoctor: ", datosDoctor);
	console.log("detalleSecuencial: ", detalleSecuencial);

	return ( 
		<Fragment>
			<h3>Ventas</h3>
			{
				(pagar)
				? 
					<Pagar 
						detalleSecuencial = { detalleSecuencial }
						datosCliente = { datosCliente }
						datosDoctor = { datosDoctor }
					/>
				:
					((detalleSecuencial !== '')&&(!pagar)) 
					? 
						<DetalleVentas 
							detalleSecuencial = { detalleSecuencial } 
							setDetalleSecuencial = { setDetalleSecuencial } 
							setPagar = { setPagar }
							setCliente = { setCliente }
							cliente = { cliente }
							setDoctor = { setDoctor }
							doctor = { doctor }
							datosCliente = { datosCliente }
							datosDoctor = { datosDoctor }
						/>
					:
						<>
							<VentasPendientes 
								setDetalleSecuencial = { setDetalleSecuencial } 
							/>
						</>
			}
		</Fragment>
	);
}
 
export default Ventas;