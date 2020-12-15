import React, { Fragment } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Menubar = ({permisosUsuario}) => {
	return ( 
		<Fragment>
			{ (permisosUsuario.includes(1)
				|| (permisosUsuario.includes(2))
				|| (permisosUsuario.includes(3))
				|| (permisosUsuario.includes(4))
				|| (permisosUsuario.includes(5))
				|| (permisosUsuario.includes(6))
				|| (permisosUsuario.includes(7))
				|| (permisosUsuario.includes(8))
				|| (permisosUsuario.includes(9))
				|| (permisosUsuario.includes(10))
				) ?
				(
					<NavDropdown title="Administración" >
					{ (permisosUsuario.includes(1)) ? (<NavDropdown.Item href="/Sucursales">Sucursales</NavDropdown.Item>) : null }
					{ (permisosUsuario.includes(2)) ? (<NavDropdown.Item href="/Proveedores">Proveedores</NavDropdown.Item>) : null }
					{ (permisosUsuario.includes(3)) ? (<NavDropdown.Item href="/Clientes">Clientes</NavDropdown.Item>) : null }
					{ (permisosUsuario.includes(4)) ? (<NavDropdown.Item href="/Productos">Productos</NavDropdown.Item>) : null }
					{ (permisosUsuario.includes(5)) ? (<NavDropdown.Item href="/Doctores">Doctores</NavDropdown.Item>) : null }
					{ (permisosUsuario.includes(6)) ? (<NavDropdown.Item href="#">Acción 6</NavDropdown.Item>) : null }
					{ (permisosUsuario.includes(7)) ? (<NavDropdown.Item href="#">Acción 7</NavDropdown.Item>) : null }
					{ (permisosUsuario.includes(8)) ? (<NavDropdown.Item href="#">Acción 8</NavDropdown.Item>) : null }
					{ (permisosUsuario.includes(9)) ? (<NavDropdown.Item href="#">Acción 9</NavDropdown.Item>) : null }
					{ (permisosUsuario.includes(10)) ? (<NavDropdown.Item href="#">Acción 10</NavDropdown.Item>) : null }
					</NavDropdown>
				) 
				: null 
			}
			{ permisosUsuario.includes(11) ? <Nav.Link href="/Ventas" >Ventas</Nav.Link> : null }

			{/* { (permisosUsuario.includes(11)
				|| (permisosUsuario.includes(12))
				|| (permisosUsuario.includes(13))
				|| (permisosUsuario.includes(14))
				|| (permisosUsuario.includes(15))
				|| (permisosUsuario.includes(16))
				|| (permisosUsuario.includes(17))
				|| (permisosUsuario.includes(18))
				|| (permisosUsuario.includes(19))
				|| (permisosUsuario.includes(20))
				) ?
				(
					<NavDropdown title="Ventas" >
					{ (permisosUsuario.includes(11)) ? (<NavDropdown.Item href="/Sucursales">Nueva venta</NavDropdown.Item>) : null }
					{ (permisosUsuario.includes(12)) ? (<NavDropdown.Item href="/Proveedores">Reporte del día</NavDropdown.Item>) : null }
					{ (permisosUsuario.includes(13)) ? (<NavDropdown.Item href="/Clientes">Clientes</NavDropdown.Item>) : null }
					{ (permisosUsuario.includes(14)) ? (<NavDropdown.Item href="#">Productos</NavDropdown.Item>) : null }
					{ (permisosUsuario.includes(15)) ? (<NavDropdown.Item href="#">Almacenes</NavDropdown.Item>) : null }
					{ (permisosUsuario.includes(16)) ? (<NavDropdown.Item href="#">Acción 6</NavDropdown.Item>) : null }
					{ (permisosUsuario.includes(17)) ? (<NavDropdown.Item href="#">Acción 7</NavDropdown.Item>) : null }
					{ (permisosUsuario.includes(18)) ? (<NavDropdown.Item href="#">Acción 8</NavDropdown.Item>) : null }
					{ (permisosUsuario.includes(19)) ? (<NavDropdown.Item href="#">Acción 9</NavDropdown.Item>) : null }
					{ (permisosUsuario.includes(20)) ? (<NavDropdown.Item href="#">Acción 10</NavDropdown.Item>) : null }
					</NavDropdown>
				) 
				: null 
			} */}
		</Fragment>
	);
}


// <Dropdown.Item as="a">Another action</Dropdown.Item>
// <Dropdown.Item as="a">Something else here</Dropdown.Item>
// <Dropdown.Divider />
// <Dropdown.Header>Navbar header</Dropdown.Header>
// <Dropdown.Item as="a">Seperated link</Dropdown.Item>
// <Dropdown.Item as="a">One more seperated link</Dropdown.Item>


/**


				<ul class="navbar-nav mr-auto">
					<li className="nav-item dropdown">
						<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Administración
						</a>
					</li>
					<div className="dropdown-menu" aria-labelledby="navbarDropdown">
						<a className="dropdown-item" href="#">Action</a>
						{ (permisosUsuario.includes(1)) ? (<a className="dropdown-item" href="/Sucursales">Sucursales</a>) : null }
						{ (permisosUsuario.includes(2)) ? (<a className="dropdown-item">Action 2</a>) : null }
						{ (permisosUsuario.includes(3)) ? (<a className="dropdown-item">Action 3</a>) : null }
						{ (permisosUsuario.includes(4)) ? (<a className="dropdown-item">Action 4</a>) : null }
						{ (permisosUsuario.includes(5)) ? (<a className="dropdown-item">Action 5</a>) : null }
						{ (permisosUsuario.includes(6)) ? (<a className="dropdown-item">Action 6</a>) : null }
						{ (permisosUsuario.includes(7)) ? (<a className="dropdown-item">Action 7</a>) : null }
						{ (permisosUsuario.includes(8)) ? (<a className="dropdown-item">Action 8</a>) : null }
						{ (permisosUsuario.includes(9)) ? (<a className="dropdown-item">Action 9</a>) : null }
						{ (permisosUsuario.includes(10)) ? (<a className="dropdown-item">Action 10</a>) : null }
					</div>
				</ul>	


									<NavDropdown title="Dropdown 222" >
						<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
					</NavDropdown>

 */

export default Menubar;