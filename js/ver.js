//SE VALIDA QUE LA INTERACCION NO EXISTA, SI EXISTE SE GENERA UNA NUEVA
let _chkidInteraccion = () => {
	
	if(document.getElementById('mismaInteraccion').value == 0) {
		let formData      = new FormData();
		let idUsuario     = document.getElementById('vidUsuario').value;
		let idInteraccion = document.getElementById('pidInteraccion').value
		
		formData.append("idUsuario", idUsuario);
		formData.append("idInteraccion", idInteraccion);
		fetch('core/app/chkidInteraccion.php',{
			method:"POST",
			body:formData
		})
		.then(resp=>resp.json())
		.then(data=>{
			// if(document.getElementById('stipoCaptura').value < 3) {//NUEVO
				
			document.getElementById('li_idInte').innerHTML    = `idInteraccionSeguimiento: ${data.response[0].idInteraccion.trim()}`;
			// document.getElementById('li_idInteSeg').innerHTML = `idInteraccion: ${data.response[0].idInteraccion.trim()}`;

			document.getElementById('vidInteraccion').value       = data.response[0].idInteraccion.trim();
			// document.getElementById('vidInteraccionOrigen').value = data.response[0].idInteraccion.trim();

		});
	} else {
		document.getElementById('li_idInte').innerHTML = `idInteraccionSeguimiento: ${document.getElementById('pidInteraccion').value}`;
		document.getElementById('vidInteraccion').value = document.getElementById('pidInteraccion').value;
	}
}

_chkidInteraccion();


let objAdjuntos = [];



let _banderaReadOnlyOrgTej = false;

let tabDef = 0;
let tabCar = 0;
let tabOyT = 0;

let histRechazosAll = {};


let _getidInteraccion = () => {
	let formData      = new FormData();
	let idUsuario     = document.getElementById('vidUsuario').value;
	let idInteraccion = document.getElementById('idInOr').value
	
    formData.append("idUsuario", idUsuario);
	formData.append("idInteraccion", idInteraccion);
 	fetch('core/app/getidInteraccion.php',{
		method:"POST",
		body:formData
	})
	.then(resp=>resp.json())
	.then(data=>{
		// console.log(data);

		document.getElementById('Folio').innerText = `Folio: ${data.response[0].Folio}`;
		document.getElementById('CanalOrigen').innerText = `Canal: ${data.response[0].Canal}`;

		

		let Generales = data.response[0].Generales[0];
		
		for (let name in Generales) {
			if(name != 'idInteraccion') {
				document.getElementById(`${name}`) ? document.getElementById(`${name}`).value = Generales[name] : null;
			}
		}

		let Defuncion = data.response[0].Defuncion;
		if (Defuncion) {
			Defuncion = Defuncion[0];
			for (let name in Defuncion) {
				if(!['idUsuario', 'idInteraccion', 'idTipoDonacion', 'Usuario'].includes(name)) {
					if (document.getElementById(`${name}`)) {
						if (document.getElementById(`${name}`).type == 'select-one') {
							document.getElementById(`${name}`).innerHTML = `<option>${Defuncion[name]}</option>`;
						} else {
							document.getElementById(`${name}`).value = Defuncion[name];
						}						
					}
				}
			}
			// console.log("NO CAT CIE");
		}
		


		if(data.response[0].TipoCaso) {
			document.getElementById('TipoCaso').value = data.response[0].TipoCaso;
			


			if(document.getElementById('titleDOC1').classList.contains('href-disabled')) {
				document.getElementById('titleDOC1').classList.remove('disabled');
				document.getElementById('titleDOC1').classList.remove('href-disabled');
				document.getElementById('titleDOC1').classList.add('href-enabled');
				document.getElementById('titleDOC1').parentElement.classList.remove('href-disabled-sup');
				document.getElementById('titleDOC1').innerHTML = document.getElementById('titleDOC1').innerHTML.replace('fa-eye-slash', 'fa-eye');
				document.getElementById('titleDOC1').click();
			}

			if(data.response[0].TipoCaso == 'MÉDICO - LEGAL') {
				if(document.getElementById('titleDOC2').classList.contains('href-disabled')) {
					document.getElementById('titleDOC2').classList.remove('disabled');
					document.getElementById('titleDOC2').classList.remove('href-disabled');
					document.getElementById('titleDOC2').classList.add('href-enabled');
					document.getElementById('titleDOC2').parentElement.classList.remove('href-disabled-sup');
					document.getElementById('titleDOC2').innerHTML = document.getElementById('titleDOC2').innerHTML.replace('fa-eye-slash', 'fa-eye');
					document.getElementById('titleDOC2').click();
				}
			}
		}


		let Adjuntos = data.response[0].Adjuntos;
		if (Adjuntos) {
			// console.log(Adjuntos);

			for (let index = 0; index < Adjuntos.length; index++) {
				let objAux = {};
				for (let name in Adjuntos[index]) {
					if(['id', 'Nombre', 'Adjunto', 'idEstatus', 'Observaciones', 'Usuario', 'Fecha', 'UsuarioStat', 'FechaStat', 'idInteraccionSegStat', 'nombreDescarga'].includes(name)) {
						objAux[name] = Adjuntos[index][name];
					}
				}
				objAdjuntos.push(objAux);
			}



			// console.log(Math.max(...objAdjuntos.filter(e => e.id < 31).map(o => o.id)) + 1);
			// console.log(objAdjuntos.filter(e => e.id < 31));

			if (objAdjuntos.filter(e => e.id > 30).length > 0) {
				createTableFiles(objAdjuntos.filter(e => e.id > 30), 2, true);

				if(objAdjuntos.filter(e => e.id == 31).length == 1) {
					document.getElementById('formOperativoCarpeta2_1').classList.add('d-none');
				}

				if(objAdjuntos.filter(e => e.id == 32).length == 1) {
					document.getElementById('formOperativoCarpeta2_2').classList.add('d-none');
				}
			}

			if (objAdjuntos.filter(e => e.id < 31).length > 0) {
				createTableFiles(objAdjuntos.filter(e => e.id < 30), 1, true);
			}

		


			if(data.response[0].CtrlSolicitud[0].Documentos) {
				document.querySelectorAll('.formOperativoCarpeta').forEach(e => {
					e.classList.add('d-none');
				});
			}

			// createTableFiles(objAdjuntos, objAdjuntos.filter(e => e.id < 31).length == 1 ? 1 : 0 );
			// createTableFiles(objAdjuntos, objAdjuntos.filter(e => e.id > 30).length == 1 ? 1 : 0);
		}

		document.getElementById('idDonador').value = data.response[0].idDonador;
	
		document.getElementById('FecHoraQuirofano').value      = data.response[0].FecHoraQuirofano;
		document.getElementById('FecHoraPinzAortico').value    = data.response[0].FecHoraPinzAortico;
		document.getElementById('FecHoraAsistolia').value      = data.response[0].FecHoraAsistolia;
		document.getElementById('FecHoraParadaCardiaca').value = data.response[0].FecHoraParadaCardiaca;


		formOrganos(
			data.response[0].Organos, // Array de organos
			data.response[0].NumOrganos, // Numero de organos capturados en campo
		);

		formTejidos(
			data.response[0].Tejidos, // Array de tejidos
			data.response[0].NumTejidos, // Numero de tejidos capturados en campo
		);

		histRechazosAll.HistOrganos = data.response[0].HistOrganos ?? [];
		histRechazosAll.HistTejidos = data.response[0].HistTejidos ?? [];

		// if (data.response[0].CtrlSolicitud[0].OrganosTejidos == 1) {
			document.getElementById('divOrgTej').nextElementSibling.nextElementSibling.classList.remove('d-none');
			document.getElementById('btn-save-org').classList.add('d-none');
			document.getElementById('btn-save-tej').classList.add('d-none');

			_banderaReadOnlyOrgTej = true;
			

			for (const e of document.getElementById('saveOrg').elements) {
				e.setAttribute('disabled', 'disabled');
			}

			for (const e of document.getElementById('saveTej').elements) {
				e.setAttribute('disabled', 'disabled');
			}
		// }

		tabDef = data.response[0].CtrlSolicitud[0].DatosDefuncion ?? 0;
		tabCar = data.response[0].CtrlSolicitud[0].Documentos ?? 0;
		tabOyT = data.response[0].CtrlSolicitud[0].OrganosTejidos ?? 0;

		document.getElementById('NumOrganos').setAttribute('disabled', 'disabled');
		document.getElementById('NumTejidos').setAttribute('disabled', 'disabled');
		document.getElementById('idDonador').setAttribute('disabled', 'disabled');
		document.getElementById('FecHoraQuirofano').setAttribute('disabled', 'disabled');
		document.getElementById('FecHoraPinzAortico').setAttribute('disabled', 'disabled');
		document.getElementById('FecHoraAsistolia').setAttribute('disabled', 'disabled');
		document.getElementById('FecHoraParadaCardiaca').setAttribute('disabled', 'disabled');

		// console.log(tabDef, tabCar, tabOyT);
		// console.log((tabDef + tabCar + tabOyT) == 3);



		// getRTNCatSeg();



		
		// console.log(Generales);

	});
}
_getidInteraccion();



let getCatDefuncion = () => {
	let optiCat = '<option selected value hidden>Selecciona una opción</option>';
	let catCIE = '<option></option>';


	let _catTipoIngreso = ''; 
	catTpo.forEach(e => _catTipoIngreso += `<option value="${e.nombre}">${e.nombre}</option>`);
	document.getElementById('TipoIngreso').innerHTML = optiCat + _catTipoIngreso;
	
	let _catModoMuerte = ''; 
	catModoMuerte.forEach(e => _catModoMuerte += `<option value="${e.nombre}">${e.nombre}</option>`);
	document.getElementById('ModoMuerte').innerHTML = optiCat + _catModoMuerte;
	
	let _catTipoDefuncion = ''; 
	catTpoDefuncion.forEach(e => _catTipoDefuncion += `<option value="${e.nombre}">${e.nombre}</option>`);
	document.getElementById('TipoDefuncion').innerHTML = optiCat + _catTipoDefuncion;
	
	let _catTipoDonador = ''; 
	catTpoDonador.forEach(e => _catTipoDonador += `<option value="${e.nombre}">${e.nombre}</option>`);
	document.getElementById('TipoDonador').innerHTML = optiCat + _catTipoDonador;
	
	let _catTipoDonacion = ''; 
	catTpoDonacion.forEach(e => _catTipoDonacion += `<option value="${e.id}">${e.nombre}</option>`);
	document.getElementById('TipoDonacion').innerHTML = optiCat + _catTipoDonacion;



	let _catCIE = '';
	_cCIE.forEach(el => _catCIE += `<option value="${el.e}">${el.e}</option>`);
	document.getElementById('CIE_Ingreso').innerHTML = catCIE +_catCIE;
	
	$("#CIE_Ingreso").selectize();

	document.getElementById('CIE_Defuncion').innerHTML = catCIE +_catCIE;
	
	$("#CIE_Defuncion").selectize();

}
// getCatDefuncion();



document.getElementById("formOperativoDef").addEventListener("submit", function (e) {
	e.preventDefault();
	// inRequired();
	let formData = new FormData(this);

	let formDataGeneral = new FormData(document.getElementById('form-gen'));
	for (var pair of formDataGeneral.entries()) {
		formData.append(pair[0], pair[1]);
	}

	formData.append('TipoDonacion', document.querySelector('#TipoDonacion').options[document.querySelector('#TipoDonacion').selectedIndex].text);

	formData.append('TIPO_SRV', 1)

	fetch('core/app/saveSeguimiento.php', {
		method: "POST",
		body: formData
	})
	.then(resp => resp.json())
	.then(data => {
		swal({
			closeOnClickOutside: false,
			closeOnEsc: false,
			title: 'Operación exitosa',
			// content: wrapper,
			icon: "success",
		}).then(resp => {
			location.reload();
		});
	})
});


let getNameFile = (e) => {
	// console.log(e.files.item(0).name);
	let idText = e.id.split('-');
	console.log(idText);
	if (idText.length == 2) {
		document.getElementById(`${idText[0]}-nfile`).value = e.files.item(0).name;
		document.getElementById(`${idText[0]}-idEstatus`).value = 0;
		document.getElementById(`${idText[0]}-idEstatus`).dispatchEvent(new Event('change'));
	} else {
		document.getElementById('n_file').value = e.files.item(0).name;
	}
}

let getNameFile2 = (e, _num) => {
	// console.log(e.files.item(0).name);
	if (_num == 1) {
		document.getElementById('n_file2_1').value = 	e.files.item(0).name;
	} else {
		document.getElementById('n_file2_2').value = 	e.files.item(0).name;
	}
}


document.querySelectorAll(".formOperativoCarpeta").forEach(el => {
	el.addEventListener("submit", function (e) {
		e.preventDefault();
		// inRequired();
		let formData = new FormData(this);

		let formDataGeneral = new FormData(document.getElementById('form-gen'));
		for (var pair of formDataGeneral.entries()) {
			formData.append(pair[0], pair[1]);
		}

		formData.append('TIPO_SRV', 3)

		fetch('core/app/saveSeguimiento.php', {
			method: "POST",
			body: formData
		})
		.then(resp => resp.json())
		.then(data => {
			objAdjuntos = data.response[0].Adjuntos;
			swal({
				closeOnClickOutside: false,
				closeOnEsc: false,
				title: 'Operación exitosa',
				// content: wrapper,
				icon: "success",
			}).then(respt => {
				document.getElementById('n_id').value = objAdjuntos.filter(e => e.id < 31).length == 0 ? 1 : Math.max(...objAdjuntos.filter(e => e.id < 31).map(o => o.id)) + 1;

				// console.log(Math.max(...objAdjuntos.filter(e => e.id < 31).map(o => o.id)) + 1);
				// console.log(objAdjuntos.filter(e => e.id < 31));

				if (objAdjuntos.filter(e => e.id > 30).length > 0) {
					createTableFiles(objAdjuntos.filter(e => e.id > 30), 2);

					if(objAdjuntos.filter(e => e.id == 31).length == 1) {
						document.getElementById('formOperativoCarpeta2_1').classList.add('d-none');
					}

					if(objAdjuntos.filter(e => e.id == 32).length == 1) {
						document.getElementById('formOperativoCarpeta2_2').classList.add('d-none');
					}
				}

				if (objAdjuntos.filter(e => e.id < 31).length > 0) {
					createTableFiles(objAdjuntos.filter(e => e.id < 30), 1);
				}

					
				if (
					(document.getElementById('TipoCaso').value == 'MÉDICO - LEGAL' && (objAdjuntos.filter(e => e.id < 31).length > 0 && objAdjuntos.filter(e => e.id > 30).length > 0)) ||
					(document.getElementById('TipoCaso').value == 'MÉDICO' && objAdjuntos.filter(e => e.id < 31).length > 0)
				) {
					document.getElementById('divCierreCarpeta').classList.remove('d-none');
				}
				
				document.querySelector('.formOperativoCarpeta').reset();
			});
		})
	});
});

let saveSegDoc = _valor => {
	// console.log(document.getElementById(`${_valor}-idEstatus`).value);
	// console.log(document.getElementById(`${_valor}-Observaciones`).value);
	// console.log(document.getElementById(`${_valor}-Adjunto`)?.value);
	// e.preventDefault();
	// inRequired();df
	let formData = new FormData();

	if (document.getElementById(`${_valor}-idEstatus`).value == 2 &&  document.getElementById(`${_valor}-Observaciones`).value.trim() == '') {
		
		toastr.info('El campo Observaciones es requerido', "Carpeta de donación");
		document.getElementById(`${_valor}-Observaciones`).focus();
		return false
	}

	let formDataGeneral = new FormData(document.getElementById('form-gen'));
	for (var pair of formDataGeneral.entries()) {
		formData.append(pair[0], pair[1]);
	}

	formData.append('idEstatus', document.getElementById(`${_valor}-idEstatus`).value);
	if (document.getElementById(`${_valor}-idEstatus`).value == 2) {
		formData.append('Observaciones', document.getElementById(`${_valor}-Observaciones`).value);
	} else {
		formData.append('Observaciones', '');
	}

	formData.append('id', _valor);

	if(document.getElementById(`${_valor}-Adjunto`)?.value) {
		formData.append('Adjunto', document.getElementById(`${_valor}-Adjunto`).files[0]);
		formData.append('AdjuntoOrginal', document.getElementById(`${_valor}-nfileOriginal`).value);
	}

	formData.append('TIPO_SRV', 4)

	fetch('core/app/saveSeguimiento.php', {
		method: "POST",
		body: formData
	})
	.then(resp => resp.json())
	.then(data => {
		objAdjuntos = data.response[0].Adjuntos;
		swal({
			closeOnClickOutside: false,
			closeOnEsc: false,
			title: 'Operación exitosa',
			// content: wrapper,
			icon: "success",
		}).then(respt => {
			document.getElementById('n_id').value = objAdjuntos.filter(e => e.id < 31).length == 0 ? 1 : Math.max(...objAdjuntos.filter(e => e.id < 31).map(o => o.id)) + 1;

				// console.log(Math.max(...objAdjuntos.filter(e => e.id < 31).map(o => o.id)) + 1);
				// console.log(objAdjuntos.filter(e => e.id < 31));

			if (objAdjuntos.filter(e => e.id > 30).length > 0) {
				createTableFiles(objAdjuntos.filter(e => e.id > 30), 2);

				if(objAdjuntos.filter(e => e.id == 31).length == 1) {
					document.getElementById('formOperativoCarpeta2_1').classList.add('d-none');
				}

				if(objAdjuntos.filter(e => e.id == 32).length == 1) {
					document.getElementById('formOperativoCarpeta2_2').classList.add('d-none');
				}
			}

			if (objAdjuntos.filter(e => e.id < 31).length > 0) {
				createTableFiles(objAdjuntos.filter(e => e.id < 30), 1);
			}

			
			if (
				(document.getElementById('TipoCaso').value == 'MÉDICO - LEGAL' && (objAdjuntos.filter(e => e.id < 31).length > 0 && objAdjuntos.filter(e => e.id > 30).length > 0)) ||
				(document.getElementById('TipoCaso').value == 'MÉDICO' && objAdjuntos.filter(e => e.id < 31).length > 0)
			) {
				document.getElementById('divCierreCarpeta').classList.remove('d-none');
			}

			document.querySelector('.formOperativoCarpeta').reset();

			
			

		});
	})
}

let createTableFiles = (_obj, _doc, readonly = false) => {
	// console.log(_doc);
	let table = '';
	if(!readonly) {
		table =
			` <table id="infoTable" class="table tb-sm table-striped">
				<thead>
					<tr>
						<th width="15%">Nombre Documento</th>
						<th width="25%">Archivo</th>
						<th>Estatus</th>
						<th width="35%">Observaciones</th>
						<th width="5%">Guardar</th>
					</tr>
					</thead>
				<tbody>`;

		_obj.forEach(e => {
			table += 
				`<tr attr-id="${e.id}">
					<td>${e.Nombre }</td>
					<td>${inputFileDoc(e.id, e.Adjunto, e.idEstatus, e.nombreDescarga)}</td>
					<td>
						${e.idEstatus != 1 ? `
							<select id="${e.id}-idEstatus" class="form-control form-control-sm estatus-files" onchange="cambiaEstaDoc(this.value, ${e.id})">
								<option value="0" ${e.idEstatus == 0 ? 'selected' : ''}>POR VALIDAR</option>
								<option value="1" ${e.idEstatus == 1 ? 'selected' : ''}>VÁLIDO</option>
								<option value="2" ${e.idEstatus == 2 ? 'selected' : ''}>NO VÁLIDO</option>
							</select>` : 'VÁLIDO'}
					</td>
					<td>
					 	<textarea id="${e.id}-Observaciones" class="form-control form-control-sm ${e.idEstatus != 2 ? 'd-none' : ''}">${e.Observaciones??''}</textarea>
					</td>
					<td>
						${e.idEstatus != 1 ? '<button onclick="saveSegDoc('+e.id+')" class="btn btn-success btn-sm fa fa-save"></button></form>' : ''}
					</td>
				</tr>`;
		});

		table += '</tbody></table>';
	} else {
		table =
			` <table id="infoTable" class="table tb-sm table-striped">
				<thead>
					<tr>
						<th>Nombre Documento</th>
						<th>Archivo</th>
						<th>Estatus</th>
						<th width="40%">Observaciones</th>
					</tr>
					</thead>
				<tbody>`;

		_obj.forEach(e => {
			table += 
				`<tr attr-id="${e.id}">
					<td>${e.Nombre }</td>
					<td>
						<div class="input-group input-group-sm">
							<label class="input-group-append" style="margin-bottom: 0rem;cursor:pointer;" onclick="fileDown(this)">
								<span class="btn btn-${e.idEstatus == 0 ? 'info' : e.idEstatus == 1 ? 'success' : 'warning'} btn-sm">
									<i class="fa fa-download" aria-hidden="true"></i>
								</span>
							</label>
							<input type="text" class="form-control form-control-sm" readonly attr-down="${e.Adjunto}" value="${e.nombreDescarga}">
						</div>
					</td>
					<td>
						${e.idEstatus == 0 ? 'POR VALIDAR' : ''}
						${e.idEstatus == 1 ? 'VÁLIDO' : ''}
						${e.idEstatus == 2 ? 'NO VÁLIDO' : ''}
					</td>
					<td>
						${e.Observaciones ?? ''}
					</td>
				</tr>`;
		});

		table += '</tbody></table>';
	}

	if (_doc == 1) {
		document.getElementById('divTblDocs').innerHTML = table;
	} else {
		document.getElementById('divTblDocs2').innerHTML = table;
	}
	

}

let cambiaEstaDoc = (_value, _id) =>  {
	console.log(_value, _id);
	if (_value == 2) {
		document.getElementById(`${_id}-Observaciones`).classList.remove('d-none');
	} else {
		document.getElementById(`${_id}-Observaciones`).classList.add('d-none');
	}
}

let inputFileDoc = (_id, _name, _estatus) => {
	// console.log(_id, _name, _estatus);
	let input =
		`<div class="input-group input-group-sm">
			<label class="input-group-append" style="margin-bottom: 0rem;cursor:pointer;" onclick="fileDown(this)">
				<span class="btn btn-${_estatus == 0 ? 'info' : 'success'} btn-sm">
					<i class="fa fa-download mr-2" aria-hidden="true"></i>Descargar
				</span>
			</label>
			<input type="text" class="form-control form-control-sm" readonly value="${_name}">
		</div>`;

	if(_estatus == 2) {
		// console.log("ENTRE IN");
		input = 
			`<div class="input-group input-group-sm">
				<div class="input-group-prepend" style="">
			  	<button aria-expanded="false" aria-haspopup="true" data-toggle="dropdown" type="button" class="btn btn-warning btn-sm dropdown-toggle"><i class="fa fa-file"></i></button>
			  	<div class="dropdown-menu">
					<label class="dropdown-item" style="margin-bottom: 0rem;cursor:pointer;">
						<i class="fa fa-upload mr-2" aria-hidden="true"></i>
						Adjuntar
						<input type="file" onchange="getNameFile(this)" id="${_id}-Adjunto" style="display: none;">
					</label>

					<button class="dropdown-item" onclick="fileDown('${_name}' ,1)" ><i class="fa fa-download mr-2" aria-hidden="true"></i>Descargar</button>
			  </div>
			</div>
			<input type="hidden" id="${_id}-nfileOriginal" value="${_name}">
			<input type="text" id="${_id}-nfile" class="form-control form-control-sm" readonly value="${_name}">
		  </div>`
	}
	
	return input;
}

let fileDown = (el, _tipo = 0, _fileDown) => {
	console.clear();
	// console.log(el.nextElementSibling.value);
	// window.location = 'file.doc';
	// console.log(el.previousElementSibling);
	let anchor = document.createElement('a');
	anchor.href = `core/carpeta/${document.getElementById('idInOr').value}/${_tipo == 0 ? el.nextElementSibling.getAttribute('attr-down') : el}`;
	anchor.target="_blank";
	anchor.download = _tipo == 0 ? el.nextElementSibling.value : _fileDown;
	anchor.click();
	anchor.delete;
}



let createBTN = (_tipo, _obj) => {
	let btns = '';
	
	if (_tipo == 'o') {
		_obj.forEach((e, _in) => {
			btns +=
				`<label class="btn btn-success ${_in > 0 ? 'ml-2' : ''}" style="cursor: pointer;">
					<input type="radio" name="options-org" value="${e.Organo}" onchange="llenaFormOrganos(this)" autocomplete="off">${e.Organo}
				</label>`;
			document.querySelector(`#listOrg option[value='${e.Organo}']`)?.remove();
		});
		document.getElementById('btn-organos').innerHTML = btns;
	} else {
		_obj.forEach((e, _in) => {
			btns +=
				`<label class="btn btn-success ${_in > 0 ? 'ml-2' : ''}" style="cursor: pointer;">
					<input type="radio" name="options-tej" value="${e.Tejido}" onchange="llenaFormTejidos(this)" autocomplete="off">${e.Tejido}
				</label>`;
			document.querySelector(`#listOrg option[value='${e.Tejido}']`)?.remove();
		});
		document.getElementById('btn-tejidos').innerHTML = btns;
	}
}










/********************************************************************** REGLAS TEJIDOS**********************************************************************/
/********************************************************************** REGLAS TEJIDOS**********************************************************************/



document.getElementById("formOperativoFinal").addEventListener("submit", function (e) {
	e.preventDefault();
	// inRequired();
	let formData = new FormData(this);

	let formDataGeneral = new FormData(document.getElementById('form-gen'));
	for (var pair of formDataGeneral.entries()) {
		formData.append(pair[0], pair[1]);
	}


	formData.append('TIPO_SRV', 10)

	fetch('core/app/saveSeguimiento.php', {
		method: "POST",
		body: formData
	})
	.then(resp => resp.json())
	.then(data => {
		swal({
			closeOnClickOutside: false,
			closeOnEsc: false,
			title: 'Operación exitosa',
			// content: wrapper,
			icon: "success",
		}).then(resp => {
			document.getElementById('url-back').click();
		});
	})
});



document.getElementById("btnHistorico").addEventListener("click",function(event) {
	let formD = new FormData();
	formD.append("idInteraccion", document.getElementById('idInOr').value);
	formD.append("idUsuario", document.getElementById('vidUsuario').value);
	fetch('core/app/getHistorico.php',{
		method:"POST",
		body:formD
	})
	.then(resp=>resp.json())
	.then(dt=>{
		$('#modalHistorico').modal('show');
		let tableHist = `
			<table class="table table-hover table-sm"><thead>
				<tr>
					<th>Canal</th>
					<th>Movimiento</th>
					<th>Fecha Movimiento</th>
					<th>Usuario</th>
					<th>Comentarios</th>
				</tr>
			</thead>
			<tbody>`;
			dt.response.forEach(element=>{
				tableHist += `<tr>
					<td>${element.Canal}</td>
					<td>${element.Tipificacion}</td>
					<td>${element.FechaMov?.replace('T', ' ').replace(/\.\d{3}/, ' ') ?? '-'}</td>
					<td>${element.Usuario}</td>
					<td>${element.Comentarios?.replace(/\</g,"&lt;").replace(/\>/g,"&gt;") ?? '-'}</td>
				</tr>`;
			});	
		tableHist += `	</tbody>
			</table>
		`;
		document.getElementById("modalTable").innerHTML = tableHist;

	});
});



let objectSelectiza = (_status, _element = '') => {
	if (_status == 1) {

		let option = '<option></option>';

		let _catRNT = catRNT;

		_catRNT.forEach(e => option += `<option value="${e.rnt}">RNT: ${e.rnt} || Nombre de Unidad: ${e.nombreUnidad}</option>`);

		document.getElementById('o-RNT').innerHTML = option;
		document.getElementById('t-RNT').innerHTML = option;
	
		$(`#o-RNT`).selectize({
			placeholder: 'Seleccione una opción',
			onChange: function(value) {
				if(value != '') {
					let rtnBusq = catRNT.find(e => e.rnt == value);
					document.getElementById(`o-NombreUnidad`).value = rtnBusq.nombreUnidad;
				}
			}
		});

		$(`#t-RNT`).selectize({
			placeholder: 'Seleccione una opción',
			onChange: function(value) {
				if(value != '') {
					let rtnBusq = catRNT.find(e => e.rnt == value);
					document.getElementById(`t-NombreUnidad`).value = rtnBusq.nombreUnidad;
				}
			}
		});
		
		return false;
	}


	let $select = $(`#${_element}`).selectize();
	let control = $select[0].selectize;
	
	if(_status == 2) {
		control.clear();
	} else if(_status == 3) {
		control.disable();
	} else {
		control.destroy();
	}
}

objectSelectiza(1);



document.getElementById('navOrTe').addEventListener('click', () => {
	objectSelectiza(3, 'o-RNT')
	objectSelectiza(3, 't-RNT')

	if(document.getElementById('btnHistRechazosOrg')) {
		document.getElementById('btnHistRechazosOrg').removeAttribute('disabled');
	}
})