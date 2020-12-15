import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';

//import "./App.css";
import jsonwebtoken from "jsonwebtoken";

import Menubar from './components/Menubar';
import Loginform from "./components/Loginform";

function App() {

	const [ logged, setLogged ] = useState(false);
	const [ permisosUsuario, setPermisosUsuario ] = useState([]);
	const [ venta, setVenta ] = useState([]);

	function checkToken() {
		let isExpired = true;
		const jwt = JSON.parse(localStorage.getItem('jwt'));
		if( (typeof jwt === 'undefined') || (jwt === null ) ) {
			return;
		}else{
			const token = jwt.access_token;
			let dateNow = new Date();
			let decodedToken=jsonwebtoken.decode(token);
			if( (typeof token === 'undefined') || (token === null ) ) {
				return;
			} else {
				if((decodedToken.exp*1000) > dateNow.getTime() ) {
					setLogged(true);
					isExpired = false;
				}
			}
		}
		if(isExpired) {
			setLogged(false);
		}
	}
	
	const permisos = async () => {
		const jwt = JSON.parse(localStorage.getItem('jwt'));
		if( (typeof jwt === 'undefined') || (jwt === null ) ) {
			setLogged(false);
			localStorage.removeItem('jwt');
			window.location.href = '/';
			return;
		}
		setPermisosUsuario(jwt.permissions);
		// let URL = "https://farmacontrolbackend.peacsa.com/api/auth/user-profile";
		// let myHeaders = new Headers();
		// const token = localStorage.getItem('token');
		// myHeaders.append('Authorization', `Bearer ${token}`);
		// return await fetch(URL, {
		// 	method: 'GET',
		// 	headers: myHeaders,
		// }).then(async response => response.json())
		// .then(async responseJSON => {
		// 	let permissions=responseJSON.permissions;
		// 	if( (responseJSON.error === "Unauthorized" ) ) {
		// 		setLogged(false);
		// 		localStorage.removeItem('token');
		// 		localStorage.removeItem('name');
		// 		localStorage.removeItem('permissions');
		// 		return;
		// 	}
		// 	if( (typeof permissions === 'undefined') || (permissions === null ) ) {
		// 		setLogged(false);
		// 		localStorage.removeItem('token');
		// 		localStorage.removeItem('name');
		// 		localStorage.removeItem('permissions');
		// 		return;
		// 	}
		// 	setPermisosUsuario(permissions);
		// })
	}

	function logout() {
		localStorage.removeItem('jwt');
		window.location.href = '/';
		setLogged(false);
	}

	useEffect(() => {
		checkToken();
	});

	useEffect(() => {
		if(logged) {
			permisos();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if(logged) {
			permisos();
		}
	}, [logged]);









	return (
		<div className="App">

			<Navbar bg="primary" variant="dark" >
				<Navbar.Brand href="#home">Farma Control</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse>
					<Nav className="mr-auto">
					<Menubar 
						permisosUsuario={permisosUsuario}
					/>
					{(logged)
						? <Nav.Link onClick = { logout }>Cerrar sesión</Nav.Link>
						: null
						}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
							
			  

			<div><br /></div>
			
			<div id="content">
				<Container>

				<Router>
					<Routes 
						setLogged = { setLogged }
						venta = { venta }
						setVenta = { setVenta }
					/>
				</Router>

					{(logged) 
						? null 
						: <Loginform 
							setLogged={setLogged}
						/> 
					}
				</Container>
			</div>
		</div>
	);
}

export default App;
