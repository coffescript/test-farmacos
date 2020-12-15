import React, { Fragment, useState } from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import Logo from "../assets/Logo.jpg";
import jsonwebtoken from "jsonwebtoken";
import { Impresora } from '../operatives/ventas/Impresora';

const Loginform = ({ setLogged }) => {

	const [ error, setError ] = useState(false);
	const [ errorMsg, setErrorMsg ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ passwd, setPasswd ] = useState('');

	let actualizaEmail = e => { setEmail(e.target.value) }
	let actualizaPwd = e => { setPasswd(e.target.value) }

	const submitForm = e => {
		e.preventDefault();
		if(email.trim() === '') {
			setError(true);
			setErrorMsg('El correo electrónico de usuario es obligatorio');
			return;
		}
		if(passwd.trim() === '') {
			setError(true);
			setErrorMsg('La contraseña es obligatoria');
			return;
		}

		setError(false);
		setErrorMsg('');
		validateUser();

	}

	const validateUser = async () => {
		
		const URL = "https://farmacontrolbackend.peacsa.com/api/auth/login";
		var formData = new FormData();

		formData.append('email', email);
		formData.append('password', passwd);	

		return await fetch(URL, {
			method: 'POST',
			body: formData,
		}).then(async response => response.json())
		.then(async responseJSON => {
			let dateNow = new Date();
			let decodedToken=jsonwebtoken.decode(responseJSON.access_token, {complete: true});
			if( (responseJSON.error === "Unauthorized" ) ) {
				setLogged(false);
				setError(true);
				setErrorMsg("Usuario o contraseña equivocados");
				return;
			}
			if( (responseJSON.error === "Forbidden" ) ) {
				setLogged(false);
				setError(true);
				setErrorMsg("Acceso no permitido");
				return;
			}
			if( (typeof decodedToken === 'undefined') || (decodedToken === null ) ) {
				setLogged(false);
				setError(true);
				setErrorMsg("Usuario o contraseña equivocados");
				return;
			}
			if((decodedToken.payload.exp*1000) > dateNow.getTime()) {
				localStorage.setItem('jwt', JSON.stringify(responseJSON));
				setImpresora();
				setLogged(true);
			}
		})
	}

	const setImpresora = async () => {
		let myHeaders = new Headers();
		const token = JSON.parse(localStorage.getItem('jwt')).access_token;
		const sucursal = JSON.parse(localStorage.getItem('jwt')).sucursal;
		console.log("ESTA sucursal: ", sucursal);
		let URL = `https://farmacontrolbackend.peacsa.com/api/auth/sucursales/show/${sucursal}`;
		myHeaders.append('Authorization', `Bearer ${token}`);
		return await fetch(URL, {
			method: 'GET',
			headers: myHeaders,
		})
		.then(async response => response.json())
		.then(async responseJSON => {
			localStorage.setItem('default_printer', JSON.stringify(responseJSON.data.impresora));
			const operative_sistem = getOs();
			console.log("operative_sistem: ", operative_sistem);
			if(operative_sistem==='Windows') {
				Impresora.setImpresora(responseJSON.data.impresora);
			}
		})
		.catch(error=>{
			console.log(error.message);
		})
	}

	const getOs = () => {
		const os = ['Windows', 'Linux', 'Mac', 'Android', 'iOS']; // add your OS values
		return os.find(v=>navigator.appVersion.indexOf(v) >= 0);
	 }

	return ( 
		<Fragment>
			<Row className="justify-content-md-center">
			<div style={{width:320}}>
				<img src={Logo} alt="Logo" style={{width:350, justifyContent:'center', alignItems:'center'}}></img>
				</div>
				</Row>
		<br />

		{(error) ? (<h3>{errorMsg}</h3>) : null }
	

			<Form onSubmit = { submitForm } >
				<Form.Group>
					<Form.Label>Correo electrónico</Form.Label>
					<Form.Control 
						type="email" 
						placeholder="foo@bar" 
						onChange = { actualizaEmail }
					/>
				</Form.Group>

				<Form.Group>
					<Form.Label>Contraseña</Form.Label>
					<Form.Control 
						type="password" 
						placeholder="MiContraseñaSecreta"
						onChange = { actualizaPwd } 
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
			<br />
		</Fragment>
	 );
}
 
export default Loginform;



