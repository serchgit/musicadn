function cargandoInfo (_bandera = true) {
	if(_bandera) {
		document.querySelector(".validandoDatos").classList.remove("d-none");
		setTimeout(() => {
			document.querySelector(".validandoDatos").classList.remove("nope");
		}, 750);
	} else {
		document.querySelector(".validandoDatos").classList.add("d-none");
		document.querySelector(".validandoDatos").classList.add("nope");
	}
}




function createBandeja(_resp) {
	let Tableinfo = '';
	if(_resp != null) {
		let hd = Object.values(_resp[0]);
		hd = hd[0][0];
		hd = Object.keys(hd);
		if (hd[0] != 0) {
			Tableinfo = `<table class="table table-striped table-inf tb-block"><thead><tr>`;
			for (let index = 0; index < hd.length; index++) {
				if (hd[index] == 'Origen') continue;
				Tableinfo += `<th scope="col">${hd[index]}</th>`;
			}
			Tableinfo += '<th scope="col">Detalle</th>';

			if(document.getElementById('tipoBande').value == '4'){
				Tableinfo += '<th scope="col">PDF</th>';
			}

			Tableinfo += `</tr></thead><tbody>`;

			let Folio         = '';

			for (let i = 0; i < _resp.length; i++) {
				serie = Object.values(_resp[i]);
				for (let j = 0; j < serie[0].length; j++) {
					let td = Object.values(serie[0][j]);
					// console.log(td);
					let origen = td.pop();
					Tableinfo += '<tr>';

					Folio         = serie[0][j].Folio;

					for (let k = 0; k < td.length; k++) {
						Tableinfo +=  `<td>${td[k]}</td>`;
						
					}
					Tableinfo += `<td><button data-folio="${Folio}" data-origen="${origen}" class="btn btn-primary btn-detalle">Ver</botton></td>`;
					if(document.getElementById('tipoBande').value == '4'){
						Tableinfo += `<td><form action="formPDF.php" method="post" target="_blank"><input type="hidden" name="folioPDF" value="${Folio}"><button type="submit" class="btn btn-info btn-detalle"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></botton></form></td>`;
					}
					Tableinfo += '</tr>';
				}
			}
			document.getElementById("table-content").innerHTML = Tableinfo;
			new DataTable(".table-inf", {
				searchable : true,
				sortable : true,
				labels : {
					placeholder : 'Filtrar',
					info : "Mostrar del {start} al {end} de un total de {rows} registros"
				},
				// truncatePager : false
			});
		
		} else {
			Tableinfo = `<table class="table table-striped table-inf"><thead><tr><th></th></tr></thead><tbody><tr><td>No hay resultados</td></tr></tbody></table>`;
			document.getElementById("table-content").innerHTML = Tableinfo;
			new DataTable(".table-inf", {
				searchable: false,
				sortable: false,
				labels :{
					info : ''
				},
				perPageSelect: false
			});
		
		}
	} else {
		Tableinfo = `<table class="table table-striped table-inf"><thead><tr><th></th></tr></thead><tbody><tr><td>No hay resultados</td></tr></tbody></table>`;
		document.getElementById("table-content").innerHTML = Tableinfo;
		new DataTable(".table-inf", {
			searchable: false,
			sortable: false,
			labels :{
				info : ''
			},
			perPageSelect: false
		});
	}

	cargandoInfo(false);
}




document.getElementById('table-content').addEventListener("click", e => {
	if(e.target.classList.contains("btn-detalle")) {
		document.getElementById('formSeg').innerHTML = ''
		document.getElementById('formSeg').innerHTML = ''

		document.getElementById('tableSeg').className  = '';
		document.getElementById('tableSeg').className  = '';

		let dataFolio         = e.target.getAttribute('data-folio');
		let dataOrigen         = e.target.getAttribute('data-Origen');

		let formData = new FormData();
		formData.append('Folio', parseInt(dataFolio.replace(/[^0-9]/g,'')));
		formData.append('Origen', dataOrigen);

		// if (dataType == 1) {
		// 	formData.append('idInteraccion', dataValue);
		// 	$('#modalData .modal-dialog').css({'max-width': '70%'});
		// 	document.getElementById('titleModalLabel').innerHTML = 'Validar';
		// } else if(dataType == 2) {
		// 	formData.append('idTarea', dataValue);
		// 	$('#modalData .modal-dialog').css({'max-width': '95%'});
		// 	document.getElementById('titleModalLabel').innerHTML = 'Historico';
		// }

		fetch("../operacion/core/app/BuscaFolio.php", {
			method: "POST",
			body:formData
		})
		.then(resp => resp.json())
		.then(data => {
			console.log(data);
			// return false;
			// let dataSegTabla = {};
		
			let typeTable = 1;
			// if(document.getElementById('tipoBandeja').value == 0) {
				typeTable = 1;
				$('#modalData .modal-dialog').css({'max-width': '95%'});
				document.getElementById('titleModalLabel').innerHTML = 'Validar';
				// dataSegTabla = data.response[0].DetalleLlamada;
			// } else {
			// 	typeTable = 2;
			// 	$('#modalData .modal-dialog').css({'max-width': '70%'});
			// 	document.getElementById('titleModalLabel').innerHTML = 'Detalle';
			// 	// dataSegTabla = data.response;
			// }
			// console.log(typeTable);

			let TableSeg = `<table class="table ${typeTable != 1 ? ' table-striped table-seg table-sm':' table-striped'}">`;
			
			// if(typeTable != 1) {//Historico
			// 	document.getElementById('tableSeg').classList.remove('tableInfoMin');
			// 	document.getElementById('tableSeg').classList.remove('col-7');
			// 	document.getElementById('formSeg').classList.remove('col-5');

			// 	document.getElementById('tableSeg').classList.add('col-12');


			// 	TableSeg += '<thead><tr>';
			// 	Object.keys(data.response[0]).forEach((indice) => {
			// 		TableSeg += `<th scope="col">${indice}</th>`;
			// 	});
			// 	TableSeg += `</tr></thead><tbody>`;
	
			// 	data.response.forEach((indice) => {
			// 		Object.keys(indice).forEach(val => {
			// 			TableSeg += `<td>${indice[val] != null ? indice[val] : '' }</td>`;
			// 		});
			// 		TableSeg += `</tr>`;
			// 	});
			// 	TableSeg += `</tbody>`;
			// } else {
				
				document.getElementById('tableSeg').classList.add('tableInfoMin');
				console.log(typeTable);
				if (typeTable == 1) {
					document.getElementById('tableSeg').classList.add('col-7');
					document.getElementById('formSeg').classList.add('col-5');
				} else {
					document.getElementById('tableSeg').classList.add('col-12');
					
				}



				
				let idInteraccion = '';
				let LoginId       = '';

				let Alcance = '';
				let vFol = '';

				let idCampania = data.response[0].idCampania != undefined ? data.response[0].idCampania : '';
				TableSeg += `<tbody ${idCampania != '' ? ' id="idCampaniaSendMail" attr-id="' + idCampania + '" ' : ''}>`;
				Object.keys(data.response[0]).forEach(element => {
					if(element != 'idCampania') {
						TableSeg += `
							<tr>
								<td>${element}</td>
								<td ${element == 'Correo' ? ' id="tblCorreo" ' : ''}>${data.response[0][element]}</td>
							</tr>`;
					}
					if(element == 'idInteraccion') {
						idInteraccion = data.response[0][element];
					}
					if(element == 'LoginId') {
						LoginId = data.response[0][element];
					}
					if(element == 'Alcance') {
						Alcance = data.response[0][element];
					}

					if(element == 'Folio') {
						vFol = data.response[0][element];
						vFol = parseInt(vFol.replace(/[^0-9]/g,'')); 
					}
				});
				TableSeg += `</tbody>`;
			// }
			document.getElementById('tableSeg').innerHTML = TableSeg;

			if(typeTable == 1) {// Formulario Validacion
				let idAg = document.getElementById('idAg').value;
				let idTarea = e.target.getAttribute('data-tarea');
				let formSave = 
					`<form class="formSegSave">
						<div class="row">
							<input type="hidden" value="${idInteraccion}" name="idInteraccion">
							<input type="hidden" value="${idAg}" name="idAgente">`;
						
				
				formSave += tipoForm(document.getElementById('tipoBande').value, Alcance, vFol);

				formSave += `
							<!-- div class="form-group col-12">
								<label for="Asignado">Asignado<span class="text-danger" id="req"></span></label>
								<select name="Asignado" id="Asignado" class="form-control">
									<option value="">Seleccione una opción</option>
									<option value="Nancy Hernandez">Nancy Hernandez</option>
									<option value="Marcos Loza">Marcos Loza</option>
									<option value="Nora Enriquez">Nora Enriquez</option>
									<option value="Silvia Millan">Silvia Millan</option>
									<option value="Aide Amaro">Aide Amaro</option>
								</select>
							</div -->

							<div class="form-group col-12">
								<label style="font-size: 12px;" for="Turno"><span class="text-danger">*</span> Campos requeridos</label>
								<button type="submit"  id="btnGuardar" class="btn btn-success float-right">Guardar</button>
							</div>
						</div>
					</form>`;


				document.getElementById('formSeg').innerHTML = formSave;

				$('#comSidec').bind('copy paste cut',function(e) {
					e.preventDefault(); return false; 
				});

				// if ([2,3,5,7].includes(parseInt(document.getElementById('tipoBande').value))) {
				if (![1].includes(parseInt(document.getElementById('tipoBande').value))) {
					getBandejaInter(document.getElementById('tipoBande').value, idInteraccion);
				}
			} else {
				document.getElementById('formSeg').innerHTML = '';
			}
			

			$('#modalData').modal('toggle');
		});
	}
});


// document.getElementById('formSeg').addEventListener('change', e => {
// 	if(e.target.id == 'Turno') {
// 		if(e.target.value == 'NC') {
// 			document.getElementById('req').innerText = '*';
// 			document.getElementById('Asignado').setAttribute('required', 'required');
// 		} else {
// 			document.getElementById('req').innerText = '';
// 			document.getElementById('Asignado').removeAttribute('required');
// 		}
// 	}
// });




document.getElementById('formSeg').addEventListener("submit", e => {
	if(e.target.classList.contains("formSegSave")) {
		e.preventDefault();
		document.getElementById('btnGuardar').setAttribute('disabled', 'disabled');
		let formData = new FormData(e.target);
		formData.append('tipoBande', document.getElementById('tipoBande').value);

		let formCheck = document.querySelectorAll('.chk-gs');
		formCheck.forEach(e => {
			if(!e.checked) {
				formData.append(e.name, e.value);
			}
		});

		fetch("core/app/sSeg.php", {
			method: "POST",
			body: formData
		})
		.then(resp => resp.json())
		.then(data => {
			document.getElementById('btnGuardar').removeAttribute('disabled', 'disabled');
			if(data.response[0].Code == 0 && ![2,6].includes(parseInt(document.getElementById('tipoBande').value))) {
				let dataResp = data.response[0];
				let elementMsj       = document.createElement('div');
				elementMsj.innerHTML = `${data.response[0].Msj}`;

				Object.keys(dataResp).forEach(e => {
					if(e.includes('Folio')) {
						elementMsj.innerHTML += `<br>${e}: <strong>${dataResp[e]}</strong>`;
					}
				});

				// elementMsj.innerHTML +='<br>Folio: <strong>'+data.response[0].FolioAAQDI+'</strong>' : ''}`;
				
				swal({
					closeOnClickOutside: false,
					closeOnEsc: false,
					content: elementMsj,
					// text: 'idInteraccion inexistente',
					icon: "success",
				}).then(resp => {
					document.getElementById('sBusTip').click();
					$('#modalData').modal('toggle');
					// location.reload();
				});
			} else if(data.response[0].Captura && data.response[0].Code == 0 && document.getElementById('tipoBande').value == 2) {
				let elementMsjTable = document.createElement('seccion');
				
				elementMsjTable.innerHTML = 
					`<div class="mb-5">
						<h4>${data.response[0].Msj}</h4>
					</div>
					<div style="overflow-x:scroll;">
						<table class="table" id="table-msj">
							<thead>
								<tr>
									<!-- th scope="col">Folio CAOD</th -->
									<th scope="col">Captura</th>
									<th scope="col">Fecha</th>
									<th scope="col">Nombre del promovente</th>
									<th scope="col">Tipificación</th>
									<th scope="col">Correo electrónico</th>
									<th scope="col">Unidad médica</th>
									<th scope="col">Subdelegación</th>
									<th scope="col">OOAD</th>
									<th scope="col">Nombre del servidor público</th>
									<th scope="col">Dirección normativa</th>
									<th scope="col">Mes</th>
									<th scope="col">Número consecutivo</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>${data.response[0].Captura ?? ''}</td>
									<td>${data.response[0].Fecha ?? ''}</td>
									<td>${data.response[0].Nombre ?? ''}</td>
									<td>${data.response[0].Tipificacion ?? ''}</td>
									<td>${data.response[0].CorreoElectronico ?? ''}</td>
									<td>${data.response[0].Unidad ?? ''}</td>
									<td>${data.response[0].Subdelegacion ?? ''}</td>
									<td>${data.response[0].OOAD ?? ''}</td>
									<td>${data.response[0].ServidorPub ?? ''}</td>
									<td>${data.response[0].DirNormativa ?? ''}</td>
									<td>${data.response[0].Mes ?? ''}</td>
									<td>${data.response[0].FolioAAQDI ?? ''}</td>
								</tr>
							</tbody>
						</table>
					<div>`;
				
				swal({
					closeOnClickOutside: false,
					closeOnEsc: false,
					content: elementMsjTable,
					className: 'swal-wide',
					icon: "success",
				}).then(resp => {
					document.getElementById('sBusTip').click();
					$('#modalData').modal('toggle');
					
				});
				
				$("#table-msj").dataTable({	
					dom: 'Bfrtip',
					language :{'url':'js/Spanish.json'},
					paging:false,
					searching: false,
					ordering: false,
					// info:false,
					buttons: [
						{ extend: 'excelHtml5', title: '', filename: 'AAQDI'},
						{ extend: 'copyHtml5', text: 'Copiar', title: ''}
					]
				});


			} else if(data.response[0].Code == 1 && document.getElementById('tipoBande').value == 6) {
				let elementMsjTable = document.createElement('seccion');
				
				elementMsjTable.innerHTML = 
					`<div class="mb-5">
						<h4>${data.response[0].Msj}</h4>
					</div>
					<div style="overflow-x:scroll;">
						<table class="table" id="table-msj">
							<thead>
								<tr>
									<!-- th scope="col">Folio CAOD</th -->
									<th scope="col">Número consecutivo</th>
									<th scope="col">Petición SIDEC</th>
									<th scope="col">Fecha Registro</th>
									<th scope="col">Notificación al peticionario</th>
									<th scope="col">Tipificación</th>
									<th scope="col">Nombre del peticionario</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>${data.response[0].FolioCAOD ?? ''}</td>
									<td>${data.response[0].PeticionSIDEC ?? ''}</td>
									<td>${data.response[0].FechaRegistro ?? ''}</td>
									<td>${data.response[0].NotificacionPet ?? ''}</td>
									<td>${data.response[0].Tipificacion ?? ''}</td>
									<td>${data.response[0].Nombre ?? ''}</td>
								</tr>
							</tbody>
						</table>
					<div>`;
				
				swal({
					closeOnClickOutside: false,
					closeOnEsc: false,
					content: elementMsjTable,
					className: 'swal-wide',
					icon: "success",
				}).then(resp => {
					document.getElementById('sBusTip').click();
					$('#modalData').modal('toggle');
					
				});
				
				$("#table-msj").dataTable({	
					dom: 'Bfrtip',
					language :{'url':'js/Spanish.json'},
					paging:false,
					searching: false,
					ordering: false,
					// info:false,
					buttons: [
						{ extend: 'excelHtml5', title: '', filename: 'CAOD 3er Nivel'},
						{ extend: 'copyHtml5', text: 'Copiar', title: ''}
					]
				});


			} else {
				swal({
					closeOnClickOutside: false,
					closeOnEsc: false,
					title: data.response[0].Msj,
					// text: 'idInteraccion inexistente',
					icon: "success",
				}).then(resp => {
					$('#modalData').modal('hide');
					document.getElementById('sBusTip').click();
					// location.reload();
				});
			}
		})
		.catch(error => console.log('error', error));
	}
});





function process(input){
	let value = input.value;
	let numbers = value.replace(/[^0-9]/g, "");
	input.value = numbers;
}



/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
let btnPreview = null;
//BÚSQUEDA DE BANDEJAS
document.getElementById('formFolioSearch').addEventListener('submit', e => {
	document.getElementById('btnResp').setAttribute('disabled', 'disabled');
	document.getElementById('btnResp').innerHTML = '<i class="fa fa-binoculars" aria-hidden="true"></i>';

	e.preventDefault()
	let formData = new FormData(e.target);
	showBandejas(formData, 1);
});


showBandejas = (_data, _bandera = 0) => {
	fetch("core/app/getBandeja.php", {
		method: "POST",
		body: _data
	})
	.then(resp => resp.json())
	.then(resp => {
		let data = resp.response;
		createBandeja(data, _bandera);

		
		if(![1,7].includes(parseInt(document.getElementById('tipoBande').value))) {
			getBandejaRegs(_data, _bandera);
			document.getElementById('btnResp').classList.remove('d-none');
		} else {
			document.getElementById('btnResp').classList.add('d-none');
		}
	});
}


getBandejaRegs = (_data, _bandera = 0) => {
	console.log(_bandera);
	fetch("core/app/getBandejaReg.php", {
		method: "POST",
		body: _data
	})
	.then(resp => resp.json())
	.then(resp => {
		let data = resp.response;
		// console.log(data);
		// document.getElementById('idTotReg').value = data[0].Registros;
		if(data[0].Registros == 0) {
			document.getElementById('btnResp').innerHTML = `<i class="fa fa-binoculars" aria-hidden="true"></i> <span class="badge badge-default"></span>`;
			document.getElementById('btnResp').setAttribute('disabled', 'disabled');
		} else {
			document.getElementById('btnResp').innerHTML = `<i class="fa fa-binoculars" aria-hidden="true"></i> <span class="badge badge-default">${data[0].Registros}</span>`;
			if(_bandera == 1) {
				document.getElementById('btnResp').removeAttribute('disabled');
			} else {
				btnPreview = setTimeout(() => {
					document.getElementById('btnResp').removeAttribute('disabled');
				}, 10000);
				
			}	 
		}

		
	});
}




document.getElementById('btnResp').addEventListener('click', e => {
	document.getElementById('btnResp').setAttribute('disabled', 'disabled');
	let formData = new FormData();
	formData.append('Bandeja', document.getElementById('tipoBande').value);
	formData.append('idAgente', document.getElementById('idAge').value);
	fetch("core/app/getBandejaAsig.php", {
		method: "POST",
		body: formData
	})
	.then(resp => resp.json())
	.then(resp => {
		let data = resp.response;
		// document.getElementById('sBusTip').click();
		
		let formDataBand = new FormData(document.getElementById('formFolioSearch'));
		showBandejas(formDataBand, 0);
		// getBandejaRegs(formData);
	});
});


/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/




document.getElementById('tipoBande').addEventListener('change', e => {
	document.getElementById('btnResp').removeAttribute('disabled');
	document.getElementById('btnResp').classList.add('d-none');

	clearTimeout(btnPreview);

	document.getElementById("table-content").innerHTML = '';
});


let evaLForm = () => {
	let gestForm = Object.values(document.querySelectorAll('.gest-form'));


	let totForm = gestForm.filter(e => {
		if(e.type == "checkbox") {
			if(e.checked) {
				return gestForm
			}
		} else if(e.value != '') {
			return gestForm
			
		}
	}).length;


	if (totForm === gestForm.length) {
		document.getElementById('Finalizador').innerHTML = `<option value="1">${[6,8].includes(parseInt(document.getElementById('tipoBande').value)) ? 'Terminado' : 'Concluido'}</option>`;
	} else {
		document.getElementById('Finalizador').innerHTML = '<option value="0">Pendiente</option>';
	}
}


document.getElementById('formSeg').addEventListener('change', e => {
	if(e.target.classList.contains('chk-gs')) {
		e.target.value = e.target.checked ? 1 : 0;

		if(e.target.getAttribute('attr-alc') != null) {
			if (e.target.checked) {
				// if(document.getElementById('sidecAux').value.search("ALC_") === -1){
					document.getElementById('SIDEC').value    = 'ALC_' + document.getElementById('SIDEC').value;
					document.getElementById('sidecAux').value = 'ALC_' + document.getElementById('sidecAux').value
				// } else {
					
				// }
			} else {
				document.getElementById('SIDEC').value    = document.getElementById('SIDEC').value.replace('ALC_', '');
				document.getElementById('sidecAux').value = document.getElementById('sidecAux').value.replace('ALC_', '');
				
			}
		}
	}
});


let tipoForm = (tipo, Alcance = '', vFol = '') => {
	let objForm = [
		{
			idForm: 1, //Bandeja
			Form: `<div class="form-group col-12">
						<label for  ="Turno">Turno<span class = "text-danger">*</span></label>
						<select name ="idTurno" id= "Turno" class = "form-control" required>
							<option hidden value>Seleccione una opción</option>
							<option value = "2">AAQDI</option>
							<option value = "3">Nivel Central</option>
							<option value = "4">CAOD</option>
							<option value = "7">Gestion</option>
						</select>
					</div>
					<div class="form-group col-12" id="divAgente"></div>`
		},{
			idForm: 2, //Bandeja AAQDI
			Form: `<div class="form-group col-12 ml-4">
						<input type="hidden" value="${vFol}" name="Folio">
						<input class="form-check-input chk-st chk-gs" type="checkbox" id="Alcance" ${Alcance == 1 ? 'checked value="1"': 'value="0"'} name="Alcance">
						<label class="form-check-label" for="Alcance">
							Alcance
						</label>
					</div>
					<div class="col-12 ml-4">
						<div class="form-group">
							<input class="form-check-input chk-st chk-gs gest-form" onchange="evaLForm()" name="Oficio" id="Oficio" value="0" type="checkbox">
							<label class="form-check-label" for="Oficio">
								Oficio elaborado
							</label>
						</div>

						<div class="form-group">
							<input class="form-check-input chk-st chk-gs gest-form" onchange="evaLForm()" name="Mail" id="Mail" value="0" type="checkbox">
							<label class="form-check-label" for="Mail">
								Correo electrónico enviado
							</label>
						</div>

						<div class="form-group">
							<input class="form-check-input chk-st chk-gs gest-form" onchange="evaLForm()" name="CPostal" id="CPostal" value="0" type="checkbox">
							<label class="form-check-label" for="CPostal">
								Correo Postal
							</label>
						</div>
					</div>
					<div class="form-group col-12">
						<label for="Asignado">Estatus<span class="text-danger" id="req"></span></label>

						<select name="Concluido" id="Finalizador" class="form-control">
							<option value="0">Pendiente</option>
						</select>
					</div>`
		},{
			idForm: 3, //Bandeja Nivel Central
			Form: `<div class="form-group col-4">
					<input type="hidden" value="${vFol}" name="Folio">
					<label  for="Turno">Medio de Capacitación</label>
					<select name="MedioCaptacion" class="form-control gest-form" onchange="evaLForm()">
						<option value="">Seleccione una opción</option>
						<option value="Oficialía de partes">Oficialía de partes</option>
						<option value="Correo">Correo</option>
						<option value="Presencial">Presencial</option>
						<option value="SFP">SFP</option>
						<option value="Centro de Contacto Ciudadano">Centro de Contacto Ciudadano</option>
					</select>
				</div>
				<div class="form-group col-8">
					<label  for="Turno">Alcance</label>
					<select name="Alcance" class="form-control" onchange="evaLForm()">
						<option value="">Seleccione una opción</option>
						<option value="Aclaración">Aclaración</option>
						<option value="Inconformidad con respuesta">Inconformidad con respuesta</option>
						<option value="La autoridad no ha respondido dentro del término establecido">La autoridad no ha respondido dentro del término establecido</option>
					</select>
				</div>
				<div class="form-group col-6">
					<label  for="Turno">Oficio de notificación a promovente</label>
					<select name="OficioNotificacion" class="form-control gest-form" onchange="evaLForm()">
						<option value="">Seleccione una opción</option>
						<option value="Correo electrónico">Correo electrónico</option>
						<option value="Correo postal">Correo postal</option>
						<option value="Pendiente">Pendiente</option>
					</select>
				</div>
				<div class="form-group col-6">
					<label  for="Turno">Notificación de respuesta al promovente </label>
					<select name="NotificacionResp" class="form-control gest-form" onchange="evaLForm()">
						<option value="">Seleccione una opción</option>
						<option value="Correo electrónico">Correo electrónico</option>
						<option value="Correo postal">Correo postal</option>
						<option value="Pendiente">Pendiente</option>
					</select>
				</div>
				<div class="col-12 ml-4">
					<div class="form-group">
						<input class="form-check-input chk-st chk-gs gest-form" onchange="evaLForm()" value="0" type="checkbox" name="SIDEC" id="SIDEC">
						<label class="form-check-label" for="SIDEC">
							Registro en SIDEC
						</label>
					</div>

					<div class="form-group">
						<input class="form-check-input chk-st chk-gs gest-form" onchange="evaLForm()" value="0" type="checkbox" name="OficioReq" id="OficioReq">
						<label class="form-check-label" for="OficioReq">
							Oficio de requerimiento
						</label>
					</div>

					<div class="form-group">
						<input class="form-check-input chk-st chk-gs gest-form" onchange="evaLForm()" value="0" type="checkbox" name="RespAutoridad" id="RespAutoridad">
						<label class="form-check-label" for="RespAutoridad">
							Respuesta de autoridad
						</label>
					</div>
				</div>
				<div class="form-group col-12">
					<label for="Asignado">Estatus<span class="text-danger" id="req"></span></label>

					<select name="Concluido" id="Finalizador" class="form-control">
						<option value="0">Pendiente</option>
					</select>
				</div>`
		},{
			idForm: 4, //Bandeja CAOUD N1
			Form: `<div class="form-group col-12 ml-4">
						<input type="hidden" value="${vFol}" name="Folio">
						<input class="form-check-input chk-st chk-gs" attr-alc="1" type="checkbox" id="Alcance" ${Alcance == 1 ? 'checked value="1"': 'value="0"'} name="Alcance">
						<label class="form-check-label" for="Alcance">
							Alcance
						</label>
					</div>
					<div class="form-group col-12">
						<label for="Turno">SIDEC</label>
						<div class="d-flex justify-content-between">
							<input type="hidden" id="sidecAux" value="${Alcance == 1 ? 'ALC_' : ''}${new Date().getFullYear()}/IMSS/PP">
							<input class="form-control mr-1" name="SIDEC" id="SIDEC" readonly value="${Alcance == 1 ? 'ALC_' : ''}${new Date().getFullYear()}/IMSS/PP">
							<input class="form-control gest-form" autocomplete="off" id="comSidec" maxlength="6" onkeyup="evaLForm()">
						</div>
					</div>
					<div class="form-group col-12">
						<label  for="Turno">Link</label>
						<input type="url" title="URL no válida" class="form-control gest-form text-lowercase" type="text" name="Link" oninput="evaLForm()" autocomplete="off">
					</div>
					<div class="form-group col-12">
						<label for="Asignado">Estatus<span class="text-danger" id="req"></span></label>

						<select name="Concluido" id="Finalizador" class="form-control">
							<option value="0">Pendiente</option>
						</select>
					</div>`
		},{
			idForm: 5, //Bandeja CAOD N2
			Form: `<div class="form-group col-12">
						<label  for="Turno">Notificación</label>
						<select name="Notificacion" class="form-control gest-form" onchange="evaLForm()">
							<option value="">Seleccione una opción</option>
							<option value="Promovente Notificado">Promovente Notificado</option>
							<option value="Pendiente">Pendiente</option>
						</select>
					</div>
					<div class="form-group col-12">
						<label  for="Turno">Link</label>
						<input type="url" title="URL no válida" class="form-control gest-form text-lowercase" type="text" name="Link" oninput="evaLForm()" autocomplete="off">
					</div>
					<div class="form-group col-12">
						<label for="Asignado">Estatus<span class="text-danger" id="req"></span></label>

						<select name="Concluido" id="Finalizador" class="form-control">
							<option value="0">Pendiente</option>
						</select>
					</div>`
		},{
			idForm: 6, //Bandeja CAOUD N3
			Form: `<div class="form-group col-12">
						<label for="Asignado">Estatus<span class="text-danger" id="req"></span></label>
						<select name="Terminado" id="Finalizador" class="form-control">
							<option value="0">Pendiente</option>
							<option value="1">Terminado</option>
						</select>
					</div>`
		},{
			idForm: 7, //Bandeja Gestion
			Form: `<div class="col-12 ml-4">
						<div class="form-group">
							<input type="hidden" name="Folio" value="${vFol}">
							<input class="form-check-input chk-st chk-gs gest-form" name="Correo" onchange="evaLForm()" value="0" type="checkbox" id="Correo">
							<label class="form-check-label" for="Correo">
								Correo electrónico
							</label>
						</div>

						<div class="form-group">
							<input class="form-check-input chk-st chk-gs gest-form" name="LlamadaSeg" onchange="evaLForm()" value="0" type="checkbox" id="LlamadaSeg">
							<label class="form-check-label" for="LlamadaSeg">
								Llamada de seguimiento
							</label>
						</div>
					</div>
					<div class="form-group col-12">
						<label  for="Turno">Link</label>
						<input type="url" title="URL no válida" class="form-control gest-form text-lowercase" type="text" name="Link" oninput="evaLForm()" autocomplete="off">
					</div>
					<div class="form-group col-12">
						<label for="Asignado">Estatus<span class="text-danger" id="req"></span></label>

						<select name="Concluido" id="Finalizador" class="form-control">
							<option value="0">Pendiente</option>
						</select>
					</div>`
		},{
			idForm: 8, //Bandeja CAOUD N4
			Form: `<div class="form-group col-12">
						<label  for="Turno">Link</label>
						<input type="url" title="URL no válida" class="form-control gest-form text-lowercase" type="text" name="Link" oninput="evaLForm()" autocomplete="off">
					</div>
					<div class="form-group col-12">
						<label for="Asignado">Estatus<span class="text-danger" id="req"></span></label>
						<select name="Terminado" id="Finalizador" class="form-control">
							<option value="0">Pendiente</option>
							<!-- option value="1">Terminado</option -->
						</select>
					</div>`
		}
	];
	
	return objForm.find(e => e.idForm == tipo).Form;
}

function process(input){
	let value = input.value;
	let numbers = value.replace(/[^0-9]/g, "");
	input.value = numbers;
}



document.getElementById('formSeg').addEventListener('input', e => {
	if (e.target.classList.contains('gest-form') && e.target.id == 'comSidec') {
		process(e.target);
		document.getElementById('SIDEC').value = document.getElementById('sidecAux').value + e.target.value;
	}
});


document.getElementById('formSeg').addEventListener('keyup', e => {
	if (e.target.classList.contains('gest-form') && e.target.name == 'Link') {
		e.target.value = e.target.value.toLowerCase();
	}
});



let getBandejaInter = (_Bandeja, _idInteraccion) => {
	let formData = new FormData();
	formData.append('Bandeja', _Bandeja);
	formData.append('idInteraccion', _idInteraccion);
	fetch("core/app/getBandejaInter.php", {
		method: "POST",
		body: formData
	})
	.then(resp => resp.json())
	.then(resp => {
		if(resp.response != null) {
			let dataResp = resp.response[0];
			Object.keys(dataResp).forEach(e => {
				// console.log(e, dataResp[e]);
				if((document.querySelector(`[name="${e}"]`) != null) ){
					document.querySelector(`[name="${e}"]`).value = dataResp[e];
					if (document.querySelector(`[name="${e}"]`).type == "checkbox") {
						document.querySelector(`[name="${e}"]`).checked = dataResp[e] == 1 ? true : false;
					}
				}
			});
		}
	});
}



let listAgentes = [];




fetch("core/app/getPermisos.php", {
	method: "GET"
})
.then(resp => resp.json())
.then(data => {
	// console.log(data);
	listAgentes = data.response;
	listAgentes = listAgentes.sort((a, b) => a.Nombre.localeCompare(b.Nombre));
});



document.getElementById('formSeg').addEventListener('change', e => {
	if (e.target.id == 'Turno') {
		if (e.target.value == 7) {
			let divAge =
				`<label for="Agentes">Agentes<span class ="text-danger">*</span></label>
				<select name="idAgenteAsignado" class="form-control" required>
					<option hidden value>Seleccione una opción</option>`;
			
			for (let index = 0; index < listAgentes.length; index++) {
				divAge += `<option value="${listAgentes[index].idAgente}">${listAgentes[index].Nombre} - ${listAgentes[index].Usuario == '' ? listAgentes[index].LoginId : listAgentes[index].Usuario}</option>`;
			}

			divAge += '</select>';

			document.getElementById('divAgente').innerHTML = divAge;
			
		} else {
			document.getElementById('divAgente').innerHTML = '';
		}
	}
});


// <label for  ="Turno">Turno<span class = "text-danger">*</span></label>
// <select name ="idTurno" id= "Turno" class = "form-control" required>
// 	<option hidden value>Seleccione una opción</option>
// 	<option value = "2">AAQDI</option>
// 	<option value = "3">Nivel Central</option>
// 	<option value = "4">CAOD</option>
// 	<option value = "7">Gestion</option>
// </select>



