import React from 'react';
import { Button } from 'react-bootstrap';

const Logout = ({ setLogged }) => {

    // function logout() {
	// 	localStorage.removeItem('token');
	// 	setLogged(false);
    //     history.push("/loginform");
    // }
  
	const logout = (e) => {
		// localStorage.removeItem("token");
		// window.location.href = '/';
		// setLogged(false);

		// return;
	}
	   
  	return (
      	<Button onClick={() => logout}> test </Button>
	)
	
}
 
export default Logout;



