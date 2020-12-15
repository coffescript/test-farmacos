import React, { useEffect, useState } from 'react';
import { Impresora } from '../operatives/ventas/Impresora';

const Impresoras = () => {

	let impresoraSeleccionada;

	const [lista, setlista] = useState([]);

	const obtenerListaDeImpresoras = () => {
		Impresora.getImpresoras()
		.then(listaDeImpresoras => {
			refrescarNombreDeImpresoraSeleccionada();
			console.log("dentro conts", listaDeImpresoras)
			limpiarLista();
			setlista(...lista, listaDeImpresoras);
		});
		// let temporal = [ ...new Set(listaDeImpresoras) ];
		// console.log("temporal: ", temporal)
		// setlista(temporal);
		// listaDeImpresoras.forEach(element => {
		// 	console.log("keys ", element.key)
		// });
	}

	const limpiarLista = () => {
		if( (typeof lista === 'undefined') || (lista === null ) ) {
			return;
		}else{
			// remover los vacíos
			// for (let i = listaDeImpresoras.length; i >= 0; i--) {
			// 	listaDeImpresoras.splice(i, 1);
			// }
			// uniq(listaDeImpresoras);
		}

	};

	const refrescarNombreDeImpresoraSeleccionada = () => {
		Impresora.getImpresora()
		.then(nombreImpresora => {
			if( (typeof impresoraSeleccionada === 'undefined') || (impresoraSeleccionada === null ) ) {
				return;
			}else{
				impresoraSeleccionada.textContent = nombreImpresora;
			}
		});
	}

	useEffect(() => {
		obtenerListaDeImpresoras();
		refrescarNombreDeImpresoraSeleccionada();
		console.log("lista: ", lista)
	}, []);


	return ( 
	<>
		<strong>Impresora seleccionada: </strong>
		<p id="impresoraSeleccionada"></p>
		<div class="form-group">
			<select class="form-control" id="listaDeImpresoras"></select>
			{console.log("lista desde el return ", lista)}
			{console.log("lista desde el return length ", lista.length)}
			{
				(lista.length === 0)
					? null
					: <> 
						{lista.map(item=>{
							return(
								// <option value="{item.}"
								console.log("valores ", item)
							)
						})}			
					</>
			}
		</div>

		<button class="btn btn-primary btn-sm" id="btnRefrescarLista">Refrescar lista</button>
		<button class="btn btn-primary btn-sm" id="btnEstablecerImpresora">Establecer como predeterminada</button>
	</>
		);
}
 
export default Impresoras;