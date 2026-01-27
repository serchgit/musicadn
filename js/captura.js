let objDataPad = [];

function getInfoPad () {
	return new Promise( (resolve, reject) => {
		// fetch('core/app/gCatalogos.php')
		// .then(resp=> resp.json())
		// .then(data => {
		// 	return resolve(data.response[0]);
		// });


		PADSERVICE.getEstadosInteracciones(e => {
			return resolve(e);
		})
	});
}



let setInfoPad = async () => {
	objDataPad = await getInfoPad();
	console.log(objDataPad);

	if (objDataPad) {
		document.getElementById('pad-idInteraccion').value = objDataPad?.value[0]?.idInteraccion ?? '';
		document.getElementById('li_idInteSeg').innerHTML = objDataPad?.value[0]?.idInteraccion ?? '';
	}


	if(objDataPad?.value[0]?.nombreEstado) {
		// console.log(objDataPad?.value[0]?.destino);
		if (document.getElementById('vidTipo').value == 1) {
			document.getElementById('Recordatorio1').removeAttribute('disabled');
			document.getElementById('Recordatorio2').removeAttribute('disabled');
			document.getElementById('Preferencia').removeAttribute('disabled');
		} else {
			document.querySelectorAll('.form-seg').forEach(elm => elm.removeAttribute('disabled'));
		}

		document.getElementById('Tipificacion').removeAttribute('disabled');
		document.getElementById('idTipificacion').removeAttribute('disabled');
		document.getElementById('Comentarios').removeAttribute('disabled');
		document.getElementById('btnSaveForm').removeAttribute('disabled');

		// console.log(objDataPad?.value[0]?.destino == `9${document.getElementById('prew-Celular_Paciente').value}`);
		// console.log(objDataPad?.value[0]?.destino == `9${document.getElementById('prew-Telefono_Paciente').value}`);

		// console.log(`${document.getElementById('prew-Celular_Paciente').value}`);
		

		if (objDataPad?.value[0]?.destino == '9'+document.getElementById('prew-Celular_Paciente').value) {
			console.log("cel");
			document.getElementById('btn-call-cel').setAttribute('attr-accion', 2);
			document.getElementById('btn-call-cel').classList.remove('btn-success');
			document.getElementById('btn-call-cel').classList.add('btn-danger');
		}

		if (objDataPad?.value[0]?.destino == '9'+document.getElementById('prew-Telefono_Paciente').value) {
			console.log("tel");
			document.getElementById('btn-call-tel').setAttribute('attr-accion', 2);
			document.getElementById('btn-call-tel').classList.remove('btn-success');
			document.getElementById('btn-call-tel').classList.add('btn-danger');
		}

		
		
	}

	
}


let llamarPrev = _element => {
	// console.log(_element);
	// console.log(_element.parentElement);
	// console.log(_element.parentElement.previousElementSibling.value);
	let numTelMarcar = _element.parentElement.previousElementSibling.value;
	
	if (numTelMarcar != '') {
		if (_element.getAttribute('attr-accion') == 1) {
			PADSERVICE.call(`9${numTelMarcar}`, e=> {
				if(e.code === 0) {
					toastr.success('Llamando...', "IPPad");
					setTimeout(() => {
						PADSERVICE.getEstadosInteracciones(el => {
							// console.log(el?.value[0]?.idInteraccion);
							document.getElementById('pad-idInteraccion').value = el?.value[0]?.idInteraccion ?? '';
							document.getElementById('li_idInteSeg').innerHTML = el?.value[0]?.idInteraccion ?? '';

							let formData = new FormData();
							formData.append("idRegistro", document.getElementById('prew-idRegistro').value);
							formData.append("idInteraccion", el?.value[0]?.idInteraccion);
							fetch('core/app/saveLog.php',{
								method:"POST",
								body:formData
							})
							.then(resp=>resp.json())
							.then(data=>{

							});
							
							if (document.getElementById('vidTipo').value == 1) {
								document.getElementById('Recordatorio1').removeAttribute('disabled');
								document.getElementById('Recordatorio2').removeAttribute('disabled');
								document.getElementById('Preferencia').removeAttribute('disabled');
							} else {
								// console.log("SEGGG");
								document.querySelectorAll('.form-seg').forEach(elm => elm.removeAttribute('disabled'));
							}

							document.getElementById('Tipificacion').removeAttribute('disabled');
							document.getElementById('idTipificacion').removeAttribute('disabled');
							document.getElementById('Comentarios').removeAttribute('disabled');
							document.getElementById('btnSaveForm').removeAttribute('disabled');
						});
					}, 1500);

					_element.setAttribute('attr-accion', 2);

					_element.classList.remove('btn-success');
					_element.classList.add('btn-danger');
				} else {
					toastr.warning('Error... Favor de validar IPPad', "IPPad");
				}
			});

			
		} else {
			
			PADSERVICE.cortar(document.getElementById('pad-idInteraccion').value, e=> {});
			// PADSERVICE.cerrar(document.getElementById('pad-idInteraccion').value, e=> {});

			_element.classList.add('btn-success');
			_element.classList.remove('btn-danger');
			_element.setAttribute('attr-accion', 1);
		}
	}
}

let getPreview = () => {
	let formData      = new FormData();
	formData.append("Usuario", document.getElementById('vUsuario').value);
	formData.append("Bandeja", document.getElementById('vBandeja').value);
	fetch('core/app/getPreview.php',{
		method:"POST",
		body:formData
	})
	.then(resp=>resp.json())
	.then(data=>{
		console.log(data);

		let infoPreview = data.response[0];
		for (const key in infoPreview) {
			if (document.getElementById(`prew-${key}`)) {
				document.getElementById(`prew-${key}`).value = infoPreview[key];
				
			}
		}

		setInfoPad();
	});
}

getPreview();


let catTipPrev = {
	'Contacto efectivo'   : [
		{
			'idTipificacion' : 1,
			'Subtipificación': 'Se brinda información'
		},{
			'idTipificacion' : 2,
			'Subtipificación': 'No presenta interés'
		}
	],
	'Contacto No efectivo': [
		{
			'idTipificacion' : 3,
			'Subtipificación': 'Se brinda información parcial'
		},{
			'idTipificacion' : 4,
			'Subtipificación': 'Llamar más tarde'
		},{
			'idTipificacion' : 5,
			'Subtipificación': 'Contesta tercera persona'
		},{
			'idTipificacion' : 6,
			'Subtipificación': 'Cuelga la llamada'
		}
	],
	'No contacto'         : [
		{
			'idTipificacion' : 7,
			'Subtipificación': 'Buzón de voz'
		},{
			'idTipificacion' : 8,
			'Subtipificación': 'Número inexistente o erróneo'
		},{
			'idTipificacion' : 9,
			'Subtipificación': 'Número equivocado'
		},{
			'idTipificacion' : 10,
			'Subtipificación': 'Fuera de servicio'
		}
	]
};





document.getElementById('Tipificacion').addEventListener('change', e => {
	let arrayTip = catTipPrev[e.target.value];
	
	let option = '<option selected value hidden>Seleccione una opción</option>';
	
	arrayTip.forEach(opt => option += `<option value="${opt.idTipificacion}">${opt.Subtipificación}</option>`);
	
	document.getElementById('idTipificacion').innerHTML = option;
});

document.getElementById('idTipificacion').addEventListener('change', e => {
	if (e.target.value == 1) {
		if (document.getElementById('vidTipo').value == 1) {
			document.getElementById('Recordatorio1').setAttribute('required', 'required');
			document.getElementById('Recordatorio2').setAttribute('required', 'required');
			document.getElementById('Preferencia').setAttribute('required', 'required');
		} else {
			document.querySelectorAll('.form-seg').forEach(elm => elm.setAttribute('required', 'required'));
		}
	} else {
		if (document.getElementById('vidTipo').value == 1) {
			document.getElementById('Recordatorio1').removeAttribute('required');
			document.getElementById('Recordatorio2').removeAttribute('required');
			document.getElementById('Preferencia').removeAttribute('required');
		} else {
			document.querySelectorAll('.form-seg').forEach(elm => elm.removeAttribute('required'));
		}
	}
})

document.getElementById('formOperativo').addEventListener('submit', e => {
	e.preventDefault()
	document.getElementById('btnSaveForm').setAttribute('disabled', 'disabled')
	let formData = new FormData(e.target);

	formData.append('SubTipificacion', document.querySelector('#idTipificacion option:checked').text)

	fetch('core/app/saveRegistro.php',{
		method:"POST",
		body:formData
	})
	.then(resp=>resp.json())
	.then(data=>{ 
		const wrapper = document.createElement('div');
		wrapper.innerHTML = data.response[0].Mensaje;
		swal({
			closeOnClickOutside: false,
			closeOnEsc: false,
			title: data.response[0].Mensaje,
			// content: wrapper,
			icon: data.response[0].Code == 1 ? 'success' : 'warning',
		}).then(resp => {
			PADSERVICE.cortar(document.getElementById('pad-idInteraccion').value, e=> {});
			document.querySelector(".validandoDatos").classList.remove("d-none");
			setTimeout(() => {
				document.getElementById('url-back').click();
			}, 3000);
			
		});
	});
});



// let shwitchForm = (_bool = true) => {

// 	for (const e of document.getElementById('formOperativo').elements) {
// 		if(e.id != 'btnSaveForm' && !['idStatus', 'Escenario', 'Canal', 'Tipificacion', 'Comentarios','DPD_ValidaCURP', 'DPD_ValidaNSS'].includes(e.name) && e.type != 'hidden') {
// 			console.log(e);
// 			e.value = '';
// 			if(_bool) {
// 				e.setAttribute('disabled', 'disabled');

// 				if(e.getAttribute('required')) {
// 					e.setAttribute('attr-required', 1);
// 					e.removeAttribute('required');
// 				}
// 			} else {
// 				e.removeAttribute('disabled');
// 				if(e.getAttribute('attr-required')) {
// 					e.setAttribute('required', 'required');
// 					e.removeAttribute('attr-required');
// 				}
// 			}
// 		}
// 	}

	

// 	if(!_bool) {// PROCEDENTE
// 		$('#DUE_RNT')[0].selectize.enable();
// 		document.getElementById('DUE_NombreUnidad').removeAttribute('disabled');
// 		document.getElementById('DUE_OOAD').removeAttribute('disabled');
// 	} else {
// 		if(document.querySelector('.selectize-control.form-control.form-control-sm.single') != null) {
// 			$('#DUE_RNT')[0].selectize.disable();
// 		}
// 		document.getElementById('DUE_NombreUnidad').setAttribute('disabled', 'disabled');
// 		document.getElementById('DUE_OOAD').setAttribute('disabled', 'disabled');
// 		document.getElementById('DPD_ValidaCURP').removeAttribute('required');
// 		document.getElementById('DPD_ValidaNSS').removeAttribute('required');
// 	}
// }

// shwitchForm();



// SE VALIDA QUE LA INTERACCION NO EXISTA, SI EXISTE SE GENERA UNA NUEVA
// let _chkidInteraccion = () => {
	
// 	let formData      = new FormData();
// 	let idUsuario     = document.getElementById('vidUsuario').value;
// 	let idInteraccion = document.getElementById('pidInteraccion').value
	
//     formData.append("idUsuario", idUsuario);
// 	formData.append("idInteraccion", idInteraccion);
//  	fetch('core/app/chkidInteraccion.php',{
// 		method:"POST",
// 		body:formData
// 	})
// 	.then(resp=>resp.json())
// 	.then(data=>{
// 		if(document.getElementById('stipoCaptura').value < 3) {//NUEVO
			
// 			document.getElementById('li_idInte').innerHTML    = `idInteraccion: ${data.response[0].idInteraccion.trim()}`;
// 			document.getElementById('li_idInteSeg').innerHTML = `idInteraccion: ${data.response[0].idInteraccion.trim()}`;

// 			document.getElementById('vidInteraccion').value       = data.response[0].idInteraccion.trim();
// 			document.getElementById('vidInteraccionOrigen').value = data.response[0].idInteraccion.trim();

// 			document.getElementById('idIForm').value = data.response[0].idInteraccion.trim();
// 			document.getElementById('idISForm').value = data.response[0].idInteraccion.trim();
// 			getCat();
// 		} else { //SEGUIMIENTO
// 			document.getElementById('li_idInte').innerHTML    = `idInteraccion: ${document.getElementById('sidInteraccion').value }`;
// 			document.getElementById('li_idInteSeg').innerHTML = `idInteraccionSeguimiento: ${data.response[0].idInteraccion}`;

// 			document.getElementById('idInteraccion').value    = document.getElementById('sidInteraccion').value;
// 			document.getElementById('idInteraccionSeg').value = data.response[0].idInteraccion.trim();
// 			getCat(document.getElementById('sidInteraccion').value);
// 		}
// 	});
// }

// _chkidInteraccion();


// let getRTNCat = () => {
// 	let option = '<option></option>';

// 	let _catRNT = catRNT;

// 	_catRNT.forEach(e => option += `<option value="${e.rnt}">RNT: ${e.rnt} || Nombre de Unidad: ${e.nombreUnidad} || OOAD: ${e.oaad}</option>`);

// 	document.getElementById('DUE_RNT').innerHTML = option;

// 	$("#DUE_RNT").selectize({
// 		create: true,
// 		createFilter: function(input) {
// 			return input.length >= 3;
// 		},
// 		minLength: 3,
// 		onChange: function(value) {
// 			console.log(value);
// 			let rtnBusq = catRNT.find(e => e.rnt == value);
// 			console.log(rtnBusq);
// 			document.getElementById('DUE_NombreUnidad').value = rtnBusq.nombreUnidad;
// 			document.getElementById('DUE_OOAD').value         = rtnBusq.oaad;
// 		}
// 	});

// 	$('#DUE_RNT')[0].selectize.disable();

// }
// getRTNCat();



// let getEdadCumplida = (fechaNacimientoCURP) => {
// 	let arrayData = {}

// 	let dateFormat = fechaNacimientoCURP.split('/').reverse().join('-');
// 	let fechaNacimiento = moment(dateFormat);

// 	Obtener la fecha actual
// 	let fechaActual = moment();

// 	Calcular la diferencia en años y meses
// 	let anios = fechaActual.diff(fechaNacimiento, 'years');
// 	let meses = fechaActual.diff(fechaNacimiento, 'months') % 12;

// 	arrayData = {
// 		'Anios':anios,
// 		'Meses':meses
// 	};
// 	return arrayData;
// }



// document.querySelectorAll(".input-curp").forEach(el => {
// 	el.addEventListener("input", function(event) {
// 		var input = event.target;
// 		var start = input.selectionStart;
// 		var end = input.selectionEnd;
// 		input.value = input.value.toLocaleUpperCase();
// 		input.setSelectionRange(start, end);
// 	})
// });



// document.querySelectorAll('.CURPBusq').forEach(el => {
// 	el.addEventListener('click', e => {
// 		let idElement  = el.getAttribute('attr-id');
// 		return false;
// 		let CURPBusq = document.getElementById(idElement).value.toUpperCase().replace(/[^\w{18}]/, '');
// 		let bandera = /([A-Z]{4})([0-9]{6})([M|H|X]{1})([A-Z]{2})([A-Z]{3})([A-Z0-9]{2})/.test(CURPBusq);

// 		if(idElement == 'DPD_CURP') { /// POTENCIAL DONADOR
// 			console.log(CURPBusq);
// 			if (bandera) {
// 				document.querySelector(".validandoDatos").classList.remove("d-none");
			

// 				let formData = new FormData();
// 				formData.append("curp", CURPBusq);
// 				fetch('core/app/validateCURP.php', {
// 					method: "POST",
// 					body: formData
// 				})
// 				.then(resp => resp.json())
// 				.then(data => {
// 					console.log(data);
// 					if (data.status == 200) {
// 						document.getElementById('DPD_ValidaCURP').removeAttribute('disabled');
// 						document.getElementById('DPD_ValidaCURP').setAttribute('required', 'required');

// 						let dataCURP = data.data;

// 						for (let name in dataCURP) {
// 							console.log(name, respBusq[name]);
// 							console.log(document.getElementById(`ws-${name}`), respBusq[name]);

// 							document.getElementById(`ws-${name}`) ? document.getElementById(`ws-${name}`).value = dataCURP[name] : null;
// 							document.getElementById(`ws-${name}`).value = respBusq[name];
// 						}

// 						let respEdad = getEdadCumplida(document.getElementById('ws-fechaNacimiento').value);
// 						document.getElementById('DPD_EdadAnios').value = respEdad.Anios;
// 						document.getElementById('DPD_EdadMeses').value = respEdad.Meses;

// 						document.getElementById('ws-sexo').value = Object.values(document.querySelectorAll('#wsm-sexo option')).find(e => e.value == document.getElementById('ws-sexo').value).text
// 						document.getElementById('ws-estadoNacimiento').value = Object.values(document.querySelectorAll('#wsm-estadoNacimiento option')).find(e => e.value == document.getElementById('ws-estadoNacimiento').value).text


						

						
// 					} else {

// 						swal({
// 							closeOnClickOutside: false,
// 							closeOnEsc: false,
// 							title:  'WEB SERVICE - API MARKET',
// 							text: `${data.message} - codigo ${data.status}`,
// 							icon: "warning",
// 						})

// 						document.querySelectorAll('.form-DPD').forEach(e => e.value = '');


// 						document.getElementById('DPD_ValidaCURP').removeAttribute('disabled');
// 						document.getElementById('DPD_ValidaCURP').setAttribute('readonly', 'readonly');
// 						document.getElementById('DPD_ValidaCURP').setAttribute('tabindex', '-1');
// 						document.getElementById('DPD_ValidaCURP').setAttribute('style', 'pointer-events: none');
// 						document.getElementById('DPD_ValidaCURP').value = 'Falla RENAPO';

// 						if(document.getElementById('titleCURP2').classList.contains('href-disabled')) {
// 							document.getElementById('titleCURP2').classList.remove('disabled');
// 							document.getElementById('titleCURP2').classList.remove('href-disabled');
// 							document.getElementById('titleCURP2').classList.add('href-enabled');
// 							document.getElementById('titleCURP2').parentElement.classList.remove('href-disabled-sup');
// 							document.getElementById('titleCURP2').innerHTML = document.getElementById('titleCURP2').innerHTML.replace('fa-eye-slash', 'fa-eye');
// 							document.getElementById('divDPDM_CURP').classList.add('show');
				
// 							document.getElementById('DPDM_EdadAnios').value = '';
// 							document.getElementById('DPDM_EdadMeses').value = '';
// 							document.querySelectorAll('.DPDM_CURP').forEach(e => {
// 								e.value = '';
// 								e.setAttribute('required', 'required');
// 							});
							
// 						}
// 					}
// 					document.querySelector(".validandoDatos").classList.add("d-none");
// 				})
// 				.catch((error) => {

// 					swal({
// 						closeOnClickOutside: false,
// 						closeOnEsc: false,
// 						title: 'WEB SERVICE - API MARKET',
// 						text: 'Web Service no disponible, favor de intentar más tarde',
// 						icon: "warning",
// 					})
				

// 					document.getElementById('DPD_ValidaCURP').removeAttribute('disabled');
// 					document.getElementById('DPD_ValidaCURP').setAttribute('readonly', 'readonly');
// 					document.getElementById('DPD_ValidaCURP').setAttribute('tabindex', '-1');
// 					document.getElementById('DPD_ValidaCURP').setAttribute('style', 'pointer-events: none');
// 					document.getElementById('DPD_ValidaCURP').value = 'Falla RENAPO';


// 					document.getElementById('titleCURP2').classList.remove('disabled');
// 					document.getElementById('titleCURP2').classList.remove('href-disabled');
// 					document.getElementById('titleCURP2').classList.add('href-enabled');
// 					document.getElementById('titleCURP2').parentElement.classList.remove('href-disabled-sup');
// 					document.getElementById('titleCURP2').innerHTML = document.getElementById('titleCURP2').innerHTML.replace('fa-eye-slash', 'fa-eye');
// 					document.getElementById('divDPDM_CURP').classList.add('show');
// 					document.querySelector(".validandoDatos").classList.add("d-none");
					
// 					document.getElementById('DPDM_EdadAnios').value = '';
// 					document.getElementById('DPDM_EdadMeses').value = '';
// 					document.querySelectorAll('.DPDM_CURP').forEach(e => {
// 						e.value = '';
// 						e.setAttribute('required', 'required');
// 					});

// 					document.querySelector(".validandoDatos").classList.add("d-none");
// 				});
// 				console.log(respBusq);
// 			} else {
// 				toastr.warning('CURP con formato invalido', "CRM");
// 				document.getElementById('DPD_CURP').focus();
// 			}
// 		} else { /// MEDICO
// 			if (bandera) {
// 				document.querySelector(".validandoDatos").classList.remove("d-none");
			
// 				let formData = new FormData();
// 				formData.append("curp", CURPBusq);
// 				fetch('core/app/validateCURP.php', {
// 					method: "POST",
// 					body: formData
// 				})
// 				.then(resp => resp.json())
// 				.then(data => {
// 					console.log(data);
// 					if (data.status == 200) {

// 						let dataCURP = data.data;

// 						for (let name in dataCURP) {
// 							document.getElementById(`wsm-${name}`) ? document.getElementById(`wsm-${name}`).value = dataCURP[name] : null;
// 						}

// 						document.getElementById('wsm-fechaNacimiento').value = dataCURP.fechaNacimiento.split('/').reverse().join('-') ;//moment(data.fechaNacimiento.toString()).format("YYY-MM-DD");

// 						document.querySelectorAll('.form-DME').forEach(e => {
// 							if(e.type == 'select-one') {
// 								e.classList.add('readonly-select');
// 								e.setAttribute('tabindex', '-1');
// 							}
// 							e.setAttribute('readonly', 'readonly');
// 						});
						
// 					} else {
// 						document.querySelectorAll('.form-DME').forEach(e => {
// 							e.removeAttribute('readonly', 'readonly');
// 						});

// 						document.querySelectorAll('.form-DME').forEach(e => e.value = '');
// 						swal({
// 							closeOnClickOutside: false,
// 							closeOnEsc: false,
// 							title:  'WEB SERVICE - API MARKET',
// 							text: `${data.message} - codigo ${data.status}`,
// 							icon: "warning",
// 						});
// 					}
// 					document.querySelector(".validandoDatos").classList.add("d-none");
// 				})
// 				.catch((error) => {
// 					document.querySelectorAll('.form-DME').forEach(e => e.removeAttribute('readonly', 'readonly'));
// 					document.querySelectorAll('.form-DME').forEach(e => e.value = '');
// 					swal({
// 						closeOnClickOutside: false,
// 						closeOnEsc: false,
// 						title: 'WEB SERVICE - API MARKET',
// 						text: 'Web Service no disponible, favor de intentar más tarde',
// 						icon: "warning",
// 					});

// 					document.querySelector(".validandoDatos").classList.add("d-none");
// 				});
// 			} else {
// 				toastr.warning('CURP con formato invalido', "CRM");
// 				document.getElementById('DME_CURP').focus();
// 			}
// 		}
// 	});
// });

// document.getElementById('DME_CURP').addEventListener('input', e => {
// 	console.log(e.target.value);
// 	let CURPBusq = e.target.value.toUpperCase().replace(/[^\w{18}]/, '');
// 	let bandera = /([A-Z]{4})([0-9]{6})([M|H|X]{1})([A-Z]{2})([A-Z]{3})([A-Z0-9]{2})/.test(CURPBusq);
// 	console.log(CURPBusq);
// 	if (!bandera) {
// 		document.querySelectorAll('.form-DME').forEach(e => {
// 			e.value = '';
// 			e.removeAttribute('readonly');
// 		});
// 	}
// });


// document.getElementById('DPD_CURP').addEventListener('input', e => {
// 	console.log(e.target.value);
// 	let CURPBusq = e.target.value.toUpperCase().replace(/[^\w{18}]/, '');
// 	let bandera = /([A-Z]{4})([0-9]{6})([M|H|X]{1})([A-Z]{2})([A-Z]{3})([A-Z0-9]{2})/.test(CURPBusq);
// 	console.log(CURPBusq);
// 	if (!bandera) {
// 		document.getElementById('DPD_ValidaCURP').setAttribute('disabled', 'disabled');
// 		document.getElementById('DPD_ValidaCURP').value = '';
// 		console.log('NO SE ENCONTRO');

// 		document.querySelectorAll('.form-DPD').forEach(e => e.value = '');


// 		document.getElementById('DPD_ValidaCURP').setAttribute('disabled', 'disabled');
// 		document.getElementById('DPD_ValidaCURP').removeAttribute('readonly');

// 		document.getElementById('DPD_ValidaCURP').removeAttribute('tabindex');
// 		document.getElementById('DPD_ValidaCURP').removeAttribute('style');


// 		if(document.getElementById('titleCURP2').classList.contains('href-enabled')) {
// 			document.getElementById('divDPDM_CURP').classList.remove('show');
			
// 			document.getElementById('DPDM_EdadAnios').value = '';
// 			document.getElementById('DPDM_EdadMeses').value = '';
// 			document.querySelectorAll('.DPDM_CURP').forEach(e => {
// 				e.value = '';
// 				e.removeAttribute('required');
// 			});
// 			document.getElementById('titleCURP2').classList.add('disabled');
// 			document.getElementById('titleCURP2').classList.add('href-disabled');
// 			document.getElementById('titleCURP2').classList.remove('href-enabled');
// 			document.getElementById('titleCURP2').parentElement.classList.add('href-disabled-sup');
// 			document.getElementById('titleCURP2').innerHTML = document.getElementById('titleCURP2').innerHTML.replace('fa-eye', 'fa-eye-slash');
// 		}
// 	}
// });


// document.getElementById('DPD_ValidaCURP').addEventListener('change', e => {
// 	if (e.target.value == 'Coinciden') {
// 		document.getElementById('DPD_CURP').removeAttribute('readonly');
// 		document.getElementById('btnCURPBusq').removeAttribute('disabled');
// 		if(document.getElementById('titleCURP2').classList.contains('href-enabled')) {
// 			document.getElementById('divDPDM_CURP').classList.remove('show');
			
// 			document.getElementById('DPDM_EdadAnios').value = '';
// 			document.getElementById('DPDM_EdadMeses').value = '';
// 			document.querySelectorAll('.DPDM_CURP').forEach(e => {
// 				e.value = '';
// 				e.removeAttribute('required', 'required');
// 			});
// 			document.getElementById('titleCURP2').classList.add('disabled');
// 			document.getElementById('titleCURP2').classList.add('href-disabled');
// 			document.getElementById('titleCURP2').classList.remove('href-enabled');
// 			document.getElementById('titleCURP2').parentElement.classList.add('href-disabled-sup');
// 			document.getElementById('titleCURP2').innerHTML = document.getElementById('titleCURP2').innerHTML.replace('fa-eye', 'fa-eye-slash');
// 		}
// 	} else {
// 		document.getElementById('DPD_CURP').setAttribute('readonly', 'readonly');
// 		document.getElementById('btnCURPBusq').setAttribute('disabled', 'disabled');
// 		if(document.getElementById('titleCURP2').classList.contains('href-disabled')) {
// 			document.getElementById('titleCURP2').classList.remove('disabled');
// 			document.getElementById('titleCURP2').classList.remove('href-disabled');
// 			document.getElementById('titleCURP2').classList.add('href-enabled');
// 			document.getElementById('titleCURP2').parentElement.classList.remove('href-disabled-sup');
// 			document.getElementById('titleCURP2').innerHTML = document.getElementById('titleCURP2').innerHTML.replace('fa-eye-slash', 'fa-eye');
// 			document.getElementById('divDPDM_CURP').classList.add('show');

			
// 			document.getElementById('DPDM_EdadAnios').value = '';
// 			document.getElementById('DPDM_EdadMeses').value = '';
// 			document.querySelectorAll('.DPDM_CURP').forEach(e => {
// 				e.value = '';
// 				e.setAttribute('required', 'required');
// 			});			
// 		}
// 	}
// });



// document.getElementById('DPDM_FecNacimiento').addEventListener('change', e => {
// 	console.log(e.target.value, 'change', moment(e.target.value).isValid());
// 	if(moment(e.target.value).isValid()) {
// 		let respEdad = getEdadCumplida(e.target.value);
// 		console.log(respEdad);
// 		let respEdad = getEdadCumplida(e.target.value.split('-').reverse().join('/'));
		
// 			document.getElementById('DPDM_EdadAnios').value = respEdad.Anios < 200 && respEdad.Anios > -1 ? respEdad.Anios : '';
// 			document.getElementById('DPDM_EdadMeses').value = respEdad.Anios < 200 && respEdad.Anios > -1 ? respEdad.Meses : '';
		
// 	}
// });



// document.getElementById('btnNSSBusq').addEventListener('click', e => {
// 	let NSSBusq = document.getElementById('DPD_NSS').value;

// 	if (NSSBusq == 0) {
// 		document.getElementById('DPD_NumConformado').removeAttribute('disabled');
// 		document.getElementById('DPD_NumConformado').removeAttribute('readonly');
// 		document.getElementById('DPD_NumConformado').setAttribute('required', 'required');

// 		document.getElementById('DPD_ValidaNSS').value = 'No es Derechohabiente';
// 		return false
// 	}

// 	if(/^\d{10,11}$/.test(NSSBusq)) {
// 		$('#modalNSS').modal('show');
// 		let spinner = `<div class="d-flex justify-content-center"><span class="my-2"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span></div>`;
// 		let tabla = '<table class="table table-hover" id="tablaNSS"><thead><tr><th>IDEE</th><th>NOMBRE</th><th>PATERNO</th><th>MATERNO</th><th>VIGENCIA</th><th>TURNO</th></tr></thead><tbody>';
	
// 		document.querySelector('.buscador').innerHTML = spinner;
// 		document.querySelector(".validandoDato]s").classList.remove("d-none");
// 		let formData = new FormData();
// 		NSSBusq = NSSBusq.substring(0, 10);
// 		formData.append("nss", NSSBusq);

// 		formData.append("idArea", document.getElementById('idArea').value);
// 		formData.append("Superusuario", document.getElementById('Superusuario').value);
// 		formData.append("idPerfil", document.getElementById('idPerfil').value);
// 		fetch("core/app/getNSSCIMED.php", {
// 			method: "POST",
// 			body: formData
// 		})
// 		.then(resp => resp.json())
// 		.then(data => {
// 			console.log(data);
// 			if(data.codigoError == 0){
// 				document.getElementById('nssBusq').innerHTML = data.nss;
// 				document.getElementById('umf').innerHTML = data.unidad;
	
// 				tabla += `
// 				<tr role="button" data-dismiss="#modalNSS" onclick="llenaDatCte(this);" data-vigente="${moment(data.vigenteHasta).diff(moment().format('YYYY/MM/DD')) >= 0 ? 'VIGENTE' : 'NO VIGENTE'}" data-agr-medico="${data.agregadoMedico}">
// 					<td>${data.idee}</td>
// 					<td>${data.nombre}</td>
// 					<td>${data.paterno}</td>
// 					<td>${data.materno}</td>
// 					<td>${moment(data.vigenteHasta).format("DD/MM/YYYY")}</td>
// 					<td>${data.turno == 'M' ? 'Matutino' : data.turno == 'V' ? 'Vespertino' : ''}</td>
// 				</tr>
// 				`;
				
// 				if(data.beneficiarios.length > 0){
// 					data.beneficiarios.map(i => {
// 						tabla += `
// 						<tr role="button" data-dismiss="#modalNSS" onclick="llenaDatCte(this);" data-vigente="${moment(i.vigenteHasta).diff(moment().format('YYYY/MM/DD')) >= 0 ? 'VIGENTE' : 'NO VIGENTE'}" data-agr-medico="${i.agregadoMedico}">
// 							<td>${i.idee}</td>
// 							<td>${i.nombre}</td>
// 							<td>${i.paterno}</td>
// 							<td>${i.materno}</td>
// 							<td>${moment(i.vigenteHasta).format("DD/MM/YYYY")}</td>
// 							<td>${i.turno == 'M' ? 'Matutino' : i.turno == 'V' ? 'Vespertino' : ''}</td>
// 						</tr>
// 						`;
// 					})
// 				}
	
// 				tabla += '</tbody></table>';
	
// 				document.querySelector('.buscador').innerHTML = tabla;
// 				document.querySelector('.divNoC').classList.remove('d-none');
// 				document.querySelector(".validandoDatos").classList.add("d-none");
// 			}else{
// 				document.querySelector(".validandoDatos").classList.add("d-none");
// 				document.querySelector('.buscador').innerHTML = `<div class="d-flex justify-content-center bg-danger"><h3><a href="#" class="text-white text-decoration-none" data-dismiss="modal">${data.mensajeError}<a></h3></div>`;
// 				document.getElementById('DPD_ValidaNSS').value = 'Falla ACCEDER';
// 				document.getElementById('DPD_ValidaNSS').dispatchEvent(new Event('change'));

// 			}
// 		})
// 		.catch(e => {
// 			$('#modalNSS').modal('hidde');
// 			toastr.warning('Falla ACCEDER', "CRM");
// 			document.getElementById('DPD_ValidaNSS').value = 'Falla ACCEDER';
// 			document.getElementById('DPD_ValidaNSS').dispatchEvent(new Event('change'));
// 			console.log(e);
// 		});
// 	} else {
// 		toastr.warning('NSS con formato invalido', "CRM");
// 		document.getElementById('DPD_NSS').focus();
// 	}
// });

// let llenaDatCte = (d) => {
//     document.querySelector('.buscador').innerHTML = '';
//     document.querySelector('#nssBusq').innerHTML = '';
//     document.querySelector('#umf').innerHTML = '';

// 	document.getElementById('DPD_NumConformado').value = '';

// 	document.getElementById('DPD_AgregadoMedico').value = d.getAttribute('data-agr-medico');
// 	document.getElementById('DPD_Vigencia').value =  d.getAttribute('data-vigente');

// 	if(d.getAttribute('data-vigente') == 'NO VIGENTE') {
// 		document.getElementById('DPD_NumConformado').removeAttribute('readonly')
// 	} else {
// 		document.getElementById('DPD_NumConformado').setAttribute('readonly', 'readonly');
// 	}

// 	document.getElementById('DPD_ValidaNSS').value = 'Coinciden';
// 	document.getElementById('DPD_ValidaNSS').dispatchEvent(new Event('change'));

// 	document.getElementById('DPD_ValidaNSS').removeAttribute('disabled');
// 	document.getElementById('DPD_ValidaNSS').setAttribute('required', 'required')



//     let edad = getEdadCumplida(d.getAttribute('data-fecNac'));
//     let genero = d.getAttribute('data-genero') == 'M' ? 'Masculino' : d.getAttribute('data-genero') == 'F' ? 'Femenino' : '';
    
//     document.getElementById('Nombre').value = d.getAttribute('data-nombre');
//     document.getElementById('Paterno').value = d.getAttribute('data-paterno');
//     document.getElementById('Materno').value = d.getAttribute('data-materno');
//     document.getElementById('Edad').value = edad;
//     document.getElementById('UMF').value = d.getAttribute('data-unidad');
//     document.getElementById('Genero').value = genero;

//     $("#modalNSS").modal('hide');
// }


// document.getElementById('DPD_NSS').addEventListener('input', e => {
// 	if(!/^\d{10,11}$/.test(e.target.value)) {
// 		document.getElementById('DPD_AgregadoMedico').value = '';
// 		document.getElementById('DPD_Vigencia').value = '';
// 		document.getElementById('DPD_NumConformado').value = '';
// 		document.getElementById('DPD_NumConformado').setAttribute('readonly', 'readonly');

// 		document.getElementById('DPD_ValidaNSS').setAttribute('disabled', 'disabled');
// 		document.getElementById('DPD_ValidaNSS').value = "";
// 		document.getElementById('DPD_ValidaNSS').dispatchEvent(new Event('change'));
// 	}
// });


// document.getElementById('DPD_ValidaNSS').addEventListener('change', e => {
// 	if (e.target.value == 'Coinciden' || e.target.value == '') {
// 		document.getElementById('DPD_NSS').removeAttribute('readonly');
// 		document.getElementById('btnNSSBusq').removeAttribute('disabled');

// 		if(document.getElementById('DPD_Vigencia').value == 'NO VIGENTE') {
// 			document.getElementById('DPD_NumConformado').removeAttribute('readonly')
// 		} else {
// 			document.getElementById('DPD_NumConformado').setAttribute('readonly', 'readonly');
// 		}
// 		if(document.getElementById('titleNSS2').classList.contains('href-enabled')) {
// 			document.getElementById('divDPDM_NSS').classList.remove('show');
// 			document.querySelectorAll('.DPDM_NSS').forEach(e => {
// 				e.value = '';
// 				e.removeAttribute('required');
// 			});
// 			document.getElementById('titleNSS2').classList.add('disabled');
// 			document.getElementById('titleNSS2').classList.add('href-disabled');
// 			document.getElementById('titleNSS2').classList.remove('href-enabled');
// 			document.getElementById('titleNSS2').parentElement.classList.add('href-disabled-sup');
// 			document.getElementById('titleNSS2').innerHTML = document.getElementById('titleNSS2').innerHTML.replace('fa-eye', 'fa-eye-slash');
// 		}
// 	} else {
// 		document.getElementById('DPD_NSS').setAttribute('readonly', 'readonly');
// 		document.getElementById('btnNSSBusq').setAttribute('disabled', 'disabled');
// 		document.getElementById('DPD_NumConformado').setAttribute('readonly', 'readonly');

// 		if(document.getElementById('titleNSS2').classList.contains('href-disabled')) {
// 			document.getElementById('titleNSS2').classList.remove('disabled');
// 			document.getElementById('titleNSS2').classList.remove('href-disabled');
// 			document.getElementById('titleNSS2').classList.add('href-enabled');
// 			document.getElementById('titleNSS2').parentElement.classList.remove('href-disabled-sup');
// 			document.getElementById('titleNSS2').innerHTML = document.getElementById('titleNSS2').innerHTML.replace('fa-eye-slash', 'fa-eye');
// 			document.getElementById('divDPDM_NSS').classList.add('show');
// 			document.querySelectorAll('.DPDM_NSS').forEach(e => {
// 				e.value = '';
// 				e.setAttribute('required', 'required');
// 			});

			
// 		}
// 	}

	
// });


// function process(input){
// 	let value = input.value;
// 	let numbers = value.replace(/[^0-9]/g, "");
// 	input.value = numbers;
// }

// Object.values(document.querySelectorAll('.only-numbers')).map(e => {
// 	e.addEventListener('input', el => {
// 		process(el.target);
// 	})
// });



// document.querySelectorAll('input[name="DME_OrigenDonacion"]').forEach(e => {
// 	e.addEventListener('change', el => {
// 		console.log(el.target, e.target);
// 		if(el.target.value == 'IMSS') {
// 			document.getElementById('lblOrigen').innerText = 'Matrícula';
// 			document.getElementById('input-origen').setAttribute('name', 'DME_Matricula');
// 		} else {
// 			document.getElementById('lblOrigen').innerText = 'Cédula Profesional';
// 			document.getElementById('input-origen').setAttribute('name', 'DME_CedulaProfesional');
// 		}
// 	});
// });


// document.getElementById("formOperativo").addEventListener("submit", function (e) {
// 	e.preventDefault();

// 	inRequired();
// 	let formData = new FormData(this);

// 	if(document.getElementById('DPD_ValidaNSS').value != '') {
// 		formData.set('DPD_ValidaNSS', document.getElementById('DPD_ValidaNSS').value);
// 	}

// 	fetch('core/app/saveSolicitud.php', {
// 		method: "POST",
// 		body: formData
// 	})
// 	.then(resp => resp.json())
// 	.then(data => {
// 		if (data.response[0].Permiso == 1) {
// 			console.log(data);
// 			let vFolio = data.response[0].Folio;

// 			let result = '';

// 			if(vFolio.length == 12) {
// 				result = vFolio.substring(vFolio.length - 3);
// 			} else {
// 				result = vFolio.substring(vFolio.length - 4);
// 			}

// 			let prej = vFolio.substring(0,3);

// 			let ff = prej + ' - ' + vFolio.split(prej)[1].replace(result, '') + ' - ' + result;

// 			const wrapper = document.createElement('div');
// 			if(vFolio) {
// 				wrapper.innerHTML = `Tu número de folio es: <strong>${vFolio}</strong>`;
// 			}
// 			swal({
// 				closeOnClickOutside: false,
// 				closeOnEsc: false,
// 				title: data.response[0].Mensaje,
// 				content: wrapper,
// 				icon: "success",
// 			}).then(resp => {
// 				if(vFolio) {
// 					document.getElementById('idFormSeg').submit();
// 				} else {
// 					document.getElementById('url-back').click();
// 				}
// 			});
// 		}
// 	});
// });


// document.getElementById('Escenario').addEventListener('change', e => {
// 	document.getElementById('Tipificacion').value = '';
// 	let option = '<option selected value hidden>Seleccione una opción</option>'
// 	let _cat   = {};
// 	let _esc = e.target.value;

// 	document.getElementById('Tipificacion').setAttribute('readonly', 'readonly');
// 	document.getElementById('Tipificacion').setAttribute('tabindex', '-1');
// 	document.getElementById('Tipificacion').classList.add('readonly-select');

// 	document.getElementById('inlineRadio1').checked = false;
// 	document.getElementById('inlineRadio2').checked = false;


// 	document.getElementById('lblOrigen').innerText = 'Matrícula';
// 	document.getElementById('input-origen').setAttribute('name', 'DME_Matricula');
	
// 	document.getElementById('Comentarios').setAttribute('disabled', 'disabled');
// 	document.getElementById('Comentarios').removeAttribute('required');

	

// 	if (_esc == 'PROCEDENTE') {
// 		shwitchForm(false);
// 		catTip[_esc].forEach(e => option += `<option selected value="${e.nombre}">${e.nombre}</option>`);
// 		document.getElementById('inlineRadio1').checked = true;

// 		document.getElementById('idStatus').value = 1;

// 		document.getElementById('inlineRadio1').value = 'IMSS';
// 		document.getElementById('inlineRadio2').value = 'Otras Instituciones';
		
// 	} else if(_esc == 'NO PROCEDENTE') {
// 		catTip[_esc][0][document.getElementById('Canal').value].forEach(e => option += `<option value="${e.nombre}">${e.nombre}</option>`);
// 		shwitchForm();

// 		document.getElementById('Tipificacion').removeAttribute('readonly');
// 		document.getElementById('Tipificacion').removeAttribute('tabindex');
// 		document.getElementById('Tipificacion').classList.remove('readonly-select');


// 		document.getElementById('idStatus').value = 0;
		
// 	} else {
// 		catTip[_esc].forEach(e => option += `<option selected value="${e.nombre}">${e.nombre}</option>`);
// 		shwitchForm();

// 		document.getElementById('Comentarios').setAttribute('required', 'required');

// 		document.getElementById('idStatus').value = 0;
// 	}

// 	document.getElementById('Tipificacion').innerHTML = option
// });






// document.getElementById('chkNoCoincide').addEventListener('click', e => {
// 	document.getElementById('DPD_ValidaNSS').value = 'No Coinciden';
// 	document.getElementById('DPD_ValidaNSS').dispatchEvent(new Event('change'));
// });