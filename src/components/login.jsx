import React, { Fragment, useState } from 'react';

const Login = ({ email, setEmail, passwd, setPasswd, login, setLogin }) => {

	const [ error, setError ] = useState(false);
	const [ errorMsg, setErrorMsg ] = useState('');
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
			setLogin(true);		
	}

	return ( 
		<Fragment>
			<h2>
				Buscador
			</h2>

			<form
				onSubmit = { submitForm }
			>

				<label>Correo electrónico</label>
				<input
					type 			= "text"
					name 			= "email"
					className 		= "u-full-width"
					placeholder 	= "Correo electrónico"
					autoComplete	= "email"
					onChange 		= { actualizaEmail }
				/>
				<br />
				<label>Contraseña</label>
				<input
					type 			= "password"
					name 			= "passwd"
					className 		= "u-full-width"
					placeholder 	= "Contraseña"
					autoComplete	= "current-password"
					onChange 		= { actualizaPwd }
				/>


				<button
					type 		= "submit"
					className 	= "u-full-width button-primary"
				>Login</button>
				

			</form>
			{ error ? <div className="cita alerta-error">
					{ errorMsg }
				</div>
				: null }
		</Fragment>

	 );
}
 
export default Login;