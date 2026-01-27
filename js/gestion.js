let saveInicial = () => {
	if (document.getElementById('TipoRegistro').value == 'N') {

		
		document.getElementById('idInteraccion1').innerText = `idInteraccion: ${document.getElementById('idInteraccion').value}`;
		document.getElementById('idInteraccion2').innerText = `idInteraccion: ${document.getElementById('idInteraccion').value}`;
	} else {
			
		let formDataI = new FormData();
		formDataI.append('idInteraccion', document.getElementById('idInteraccion').value)

		fetch('core/app/getidInteraccion.php', {
			method: "POST",
			// method: "GET",
			body: formDataI
		})
		.then(resp => resp.json())
		.then(data => {
			// console.log(data);

			let info = data.response[0]
			for (let name in info) {
				// console.log(name, info[name]);
				if(document.getElementById(name) != null &&
				   document.getElementById(name).getAttribute('type') != 'hidden' &&
				   document.getElementById(name).getAttribute('type') != 'select-one'
				) {
					document.getElementById(name).value = info[name];
				}
			}

			document.getElementById('ServicioDigital').innerHTML = `<option>${info.ServicioDigital}</option>`;
			document.getElementById('Tipificacion').innerHTML = `<option>${info.Tipificacion}</option>`;
			document.getElementById('Subtipificacion').innerHTML = `<option>${info.Subtipificacion}</option>`;


			let formulario = document.getElementById('formEnvio');
			let elementos = formulario.elements;
			
			for (let i = 0; i < elementos.length; i++) {
				if (elementos[i].type !== 'hidden') {
					elementos[i].disabled = true;
				}
			}

			let opcUMF = _catUMF.filter(e => e[2].includes(info['OOAD']) && e[3].includes(info['UMF']));

			if(opcUMF.length > 0) {
				$('#OOAD').selectize()[0].selectize.setValue(opcUMF[0].join(' | '));
			}


			if(document.getElementById('TipoRegistro').value != 0) {

				document.getElementById('idEstatus').removeAttribute('disabled');
				document.getElementById('Prioridad').removeAttribute('disabled');
				document.getElementById('Comentario').removeAttribute('disabled');
				document.getElementById('Comentario').value = '';
				document.getElementById('btn-hist').removeAttribute('disabled');

				if (document.getElementById('TipoRegistro').value == 1) {

					document.getElementById('idEstatus').innerHTML = 
						`<option selected hidden value>Seleccione una opción</option>
						<option value="1">Abierto</option>
						<option value="2">Seguimiento</option>
						<option value="0">Cerrado</option>`;
				} else {
					document.getElementById('idEstatus').innerHTML = 
						`<option selected hidden value>Seleccione una opción</option>
						<option value="2">Seguimiento</option>
						<option value="0">Cerrado</option>`;
				}

				document.getElementById('btn-save').removeAttribute('disabled')
				document.getElementById('idEstatus').value = info.idEstatus;
			} else {
				document.getElementById('idEstatus').innerHTML = `<option>${info.Estatus}</option>`;
				document.getElementById('btn-hist').removeAttribute('disabled');
				document.getElementById('btn-back').removeAttribute('disabled');
			}

			

			
			if(document.getElementById('TipoRegistro').value != 0) {
				document.getElementById('idInteraccion1').innerText = `idInteraccionSeguimiento: ${document.getElementById('idInteraccionSeg').value}`;
			// 	document.getElementById('idInteraccionSeg').value = data.response[0].idInteraccion.trim();

				document.getElementById('idInteraccion2').innerText = `idInteraccion: ${document.getElementById('idInteraccion').value}`;
			}
		});
		// document.getElementById('idInteraccion2').innerText = `idInteraccion: ${document.getElementById('idInteraccion').value}`;
	}
}
saveInicial();


document.getElementById('ServicioDigital').addEventListener('change', e => {
	let option = '<option selected hidden value>Seleccione una opción</option>';
	document.getElementById('Subtipificacion').innerHTML = option;


	document.getElementById('OtrosMotivos').setAttribute('disabled', 'disabled')
	document.getElementById('OtrosMotivos').value = '';

	$('#OOAD')[0].selectize.disable();
	$('#OOAD').selectize()[0].selectize.setValue('');

	document.getElementById('Turno').setAttribute('disabled', 'disabled')
	document.getElementById('Turno').value = '';

	_catTIP.filter(el => el.idPadre == e.target.value).forEach(el => option += `<option value="${el.id}">${el.Nombre}</option>`);
	document.getElementById('Tipificacion').innerHTML = option;

	
	document.getElementById('idEstatus').removeAttribute('disabled')

	if (e.target.value == 5000) {
		document.getElementById('Tipificacion').innerHTML = '<option>No procedente</option>'
		document.getElementById('Subtipificacion').innerHTML = '<option>No procedente</option>';
		document.querySelectorAll('.motivoInter').forEach(el => {
			el.setAttribute('disabled', 'disabled');
			el.value = '';
		});
		document.getElementById('idEstatus').innerHTML = 
			`<option value hidden selected>Seleccione una opción</option>
			<option value="0">Cerrado</option>`;

		document.getElementById('Prioridad').setAttribute('disabled', 'disabled')
		document.getElementById('Prioridad').value = '';
	} else {
		document.querySelectorAll('.motivoInter').forEach(el => el.removeAttribute('disabled'));
		document.getElementById('idEstatus').innerHTML = 
			`<option value hidden selected>Seleccione una opción</option>
			<option value="1">Abierto</option>
			<option value="0">Cerrado</option>`;

		document.getElementById('Prioridad').removeAttribute('disabled')
	}
});	

document.getElementById('Tipificacion').addEventListener('change', e => {
	let option = '<option selected hidden value>Seleccione una opción</option>';

	document.getElementById('OtrosMotivos').setAttribute('disabled', 'disabled')
	document.getElementById('OtrosMotivos').value = '';

	$('#OOAD')[0].selectize.disable();
	$('#OOAD').selectize()[0].selectize.setValue('');

	document.getElementById('Turno').setAttribute('disabled', 'disabled')
	document.getElementById('Turno').value = '';

	_catTIP.filter(el => el.idPadre == e.target.value).forEach(el => option += `<option value="${el.id}">${el.Nombre}</option>`);
	document.getElementById('Subtipificacion').innerHTML = option;
});


document.getElementById('Subtipificacion').addEventListener('change', () => {
	let optSubTip = document.querySelector('#Subtipificacion option:checked').text;

	if (optSubTip == 'Otros') {
		document.getElementById('OtrosMotivos').removeAttribute('disabled')
	} else {
		document.getElementById('OtrosMotivos').setAttribute('disabled', 'disabled')
		document.getElementById('OtrosMotivos').value = '';
	}

	let arrayErrorCIMED = [
		'Citas medicas no disponibles',
		'Cita médica familiar agendada por app no respetada',
		'Citas dentales no disponibles',
		'Cita dental no respetada',
		'Citas medicas no disponibles',
		'Cita médica familiar agendada por web no respetada'
	]

	if (arrayErrorCIMED.includes(optSubTip)) {
		$('#OOAD')[0].selectize.enable();
		document.getElementById('Turno').removeAttribute('disabled')

	} else {
		$('#OOAD')[0].selectize.disable();
		$('#OOAD').selectize()[0].selectize.setValue('');

		document.getElementById('Turno').setAttribute('disabled', 'disabled')
		document.getElementById('Turno').value = '';
	}
});


let optionUMF = '<option value="" hidden selected>Seleccione una opción</option>';

_catUMF.forEach(e => optionUMF += `<option>${e.join(' | ')}</option>`);

document.getElementById('OOAD').innerHTML = optionUMF;

$('#OOAD').selectize({
	placeholder: 'Seleccione una opción',
	positionDropdown :'up',
	onChange: function(value) {
		console.log(value);
		if(value != '') {
		// let rtnBusq = catRNT.find(e => e.rnt == value);
		// console.log(rtnBusq);l
			let valueText = value.split(' | ');
			console.log(valueText);

			let textOOAD = valueText[2].split(': ');
			textOOAD = textOOAD[1];

			let textUMF = valueText[3].split(': ');
			textUMF = textUMF[1];

			document.getElementById('textOOAD').value = textOOAD;
			document.getElementById('textUMF').value  = textUMF;
		} else {
			document.getElementById('textOOAD').value = '';
			document.getElementById('textUMF').value  = '';
		}
	}
});


document.getElementById('formEnvio').addEventListener('submit', e => {
	e.preventDefault();
	document.getElementById('btn-save').setAttribute('disabled', 'disabled');

	let formData = new FormData(e.target);

	let selectedTextIdEstatus = document.querySelector('#idEstatus option:checked').value !== '' ? document.querySelector('#idEstatus option:checked').text : null;

	if(selectedTextIdEstatus) {
		formData.append('Estatus', selectedTextIdEstatus);
	}

	formData.append('ServicioDigital', document.querySelector('#ServicioDigital option:checked').text);
	formData.append('Tipificacion', document.querySelector('#Tipificacion option:checked').text);
	formData.append('Subtipificacion', document.querySelector('#Subtipificacion option:checked').text);



	let formDataDIG     = new FormData();

	for (var pair of formData.entries()) {
		// console.log(pair[0], ' = ', pair[1], ' => ',pair[1] == '');
		if(pair[1] != '') {
			formDataDIG.append(pair[0], pair[1]);
		}
	}

	let _srv = '';
	if (document.getElementById('TipoRegistro').value == 'N') {
		_srv = 'saveSolicitud.php';
	} else {
		_srv = 'saveSeguimiento.php';
	}
	fetch(`core/app/${_srv}`, {
		method: "POST",
		// method: "GET",
		body: formDataDIG
	})
	.then(resp => resp.json())
	.then(data => {
		// console.log(data);
		const wrapper = document.createElement('div');
		if(data.response[0].Folio) {
			wrapper.innerHTML = `Tu número de folio es: <strong>${data.response[0].Folio}</strong>`;
		}
		swal({
			closeOnClickOutside: false,
			closeOnEsc: false,
			title: data.response[0]?.Mensaje ?? 'Operación Exitosa',
			content: wrapper,
			icon: `${data.response[0].Permiso == 1 ? 'success' : 'warning'}`,
		}).then(resp => {
			// if(vFolio) {
			// 	document.getElementById('idFormSeg').submit();
			// } else {
				document.getElementById('url-back').click();
			// }
		});
	});

	// swal({
	// 	closeOnClickOutside: false,
	// 	closeOnEsc: false,
	// 	title:  'Operación Exitosa',
	// 	icon: 'success'
	// })
});



let getHistorico = () => {
	if(TipoRegistro != 'N') {
		let formD = new FormData();
		formD.append("idInteraccion", document.getElementById('idInteraccion').value);
		fetch('core/app/getHistorico.php',{
			method:"POST",
			body:formD
		})
		.then(resp=>resp.json())
		.then(dt=> {
			let arrayDeObjetos = dt.response;
			
			arrayDeObjetos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

			document.getElementById('primerComentario').innerHTML = `<label>Primer Comentario:</label><p>${arrayDeObjetos[0].Comentario}</p>`;
		});
	}
}
getHistorico();

document.getElementById("btn-hist")?.addEventListener("click", () => {
	let formD = new FormData();
	formD.append("idInteraccion", document.getElementById('idInteraccion').value);
	fetch('core/app/getHistorico.php',{
		method:"POST",
		body:formD
	})
	.then(resp=>resp.json())
	.then(dt=> {
		let tableHist = `
			<table class="table table-hover table-sm"><thead>
				<tr>
					<th width="10%">Usuario</th>
					<th width="10%">Estatus</th>
					<th>Prioridad</th>
					<th width="20%">Fecha Movimiento</th>
					<th width="60%">Comentarios</th>
				</tr>
			</thead>
			<tbody>`;
			dt.response.forEach(element=>{
				tableHist += `<tr>
					<td>${element.Agente}</td>
					<td>${element.Estatus}</td>

					<td>${element.Prioridad}</td>
		
					<td>${element.Fecha.replace(/\T/g," ")}</td>
					<td>${element.Comentario.replace(/\</g,"&lt;").replace(/\>/g,"&gt;")}</td>
				</tr>`;
			});	
		tableHist += `	</tbody>
			</table>
		`;
		document.getElementById("table-content").innerHTML = tableHist;

		$('#modalHistorico').modal('show')
	});
});

document.getElementById('btn-back')?.addEventListener('click', () => {
	document.getElementById('url-back').click();
});