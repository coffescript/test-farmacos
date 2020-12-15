import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Logoutform from "./components/Logoutform";
import Sucursales from './operatives/sucursales/Sucursales';
import Proveedores from './operatives/proveedores/Proveedores';
import Clientes from './operatives/clientes/Clientes';
import Doctores from './operatives/doctores/Doctores';
import Ventas from './operatives/ventas/Ventas';
//import Productos from './operatives/productos/Pro';

export default function Routes({ setLogged }) {
    return (
		<Switch>

			<Route 
				exact 
				path="/logoutform" >
				<Logoutform 
					setLogged={setLogged}
				/>
			</Route>
			<Route 
				exact 
				path="/Sucursales" >
				<Sucursales />
			</Route>
			<Route 
				exact 
				path="/Proveedores" >
				<Proveedores />
			</Route>
			<Route 
				exact 
				path="/Clientes" >
				<Clientes />
			</Route>
			<Route 
				exact 
				path="/Ventas" >
				<Ventas />
			</Route>
			{/*<Route 
				exact 
				path="/Productos" >
				<Productos />
			</Route>*/}
			<Route 
				exact 
				path="/Doctores" >
				<Doctores />
			</Route>

		</Switch>
	)
}
