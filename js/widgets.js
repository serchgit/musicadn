$('.widget').click(function (event) {
	// console.log(this.getAttribute('data-id'));
	$('.widget h1').css({ 'font-size': '18px', 'margin-top': '5px' });
	$('.widget h3').css({ 'font-size': '14px', 'margin-top': '5px' });
	$('.widget i').css({ 'font-size': '2rem' });
	$('.cont-widg').addClass('d-flex justify-content-around align-items-center');


	document.querySelectorAll('.fa-4x').forEach(e => {
		e.classList.add('fa-2x');
		e.classList.remove('fa-4x');
	});


	let color = rgbtohex(window.getComputedStyle(this).getPropertyValue("background-color"))
	// console.log(rgbtohex(window.getComputedStyle(this).getPropertyValue("background-color")));

	// console.log(this);

	document.getElementById('widget-select').setAttribute('style', `color:${color}`);
	document.getElementById('widget-select').innerText = `Widget seleccionado: ${this.getAttribute('data-name')}`

	// document.getElementById('Bandeja').value = this.getAttribute('data-id');

	// if (this.getAttribute('data-total') > 0) {
	// 	setTimeout(() => {
	// 		document.getElementById('saveInicial').submit();
	// 	}, 1000);
	// } else {
	// 	toastr.info('No existen registros', "Mensaje");
	// }



	// document.getElementById('saveInicial').submit();

	getGridWidget(this.getAttribute('data-id'));
});


let componentToHex = (val) => {
	const a = Number(val).toString(16);
	//        ^^^^^^^^^^^
	return a.length === 1 ? "0" + a : a;
}

let rgbtohex = (rgb) => {
	return '#' + rgb
		.match(/\d+/g)
		.map(componentToHex)
		.join('');
  }


let getWidget = () => {
	let formData = new FormData();
	
	// formData.append("Usuario", document.getElementById('vUsuario').value);
	// formData.append("Superusuario", document.getElementById('Superusuario').value);
	// formData.append("idPerfil", document.getElementById('idPerfil').value);

	fetch('core/app/getWidgets.php', {
		// method: "POST",
		method: "GET",
		// body: formData
	})
		.then(resp => resp.json())
		.then(data => {
			// if (data.response[0].Permiso == 1) {
				document.querySelector(".totalAbiertos").innerHTML     = data.response[0].Abierto;
				document.querySelector(".totalSeguimientos").innerHTML = data.response[0].Seguimineto;
				document.querySelector(".totalCerrados").innerHTML     = data.response[0].Cerrado;
		

				// document.querySelector(".totalCerrados").innerHTML = data.response[0].Cerrado;
			// }
		});
}
getWidget();
setInterval(() => { getWidget() }, 10000);


document.getElementById('searchFolio').addEventListener("submit", e => {
	e.preventDefault();
	document.querySelector(".validandoDatos").classList.remove("d-none");
	let formData = new FormData(e.target);

	formData.set('Folio', formData.get('Folio').trim());

	fetch('core/app/searchFolio.php',{
	method: "POST",
	body:formData
	})
	.then(resp=>resp.json())
	.then(data => {
		
		if (data.response == null) {
			document.getElementById("tableWidget").innerHTML = '';
			document.getElementById("tableWidget").classList.add('d-none');
			toastr.info('No existen registros', "Mensaje");
			document.querySelector(".validandoDatos").classList.add("d-none");
			return false;
		}
		let idWidEstatus = data.response[0].Estatus == 'Abierto' ? 1 :
							   data.response[0].Estatus == 'Seguimiento' ? 2 : 0
		let table = 
			`<table class="table w-100 stripe table-lg">
				<thead>
					<tr>
						<th># Folio</th>
						<th>Fecha Llegada</th>
						<th>Hora Llegada</th>
						<th>Nombre de Usuario</th>
						<th>Usuario</th>
						<th>Canal</th>
						<th>Servicio digital reportado</th>
						<th>Estatus del caso</th>
						<th>Prioridad</th>
						<th class="text-center">${idWidEstatus == 0 ? 'Ver' : 'Gestión'}</th>
					</tr>
				</thead><tbody>`;
			data.response.forEach((element, index) => {
				
				table += 
					`<tr>
						<td>${element.Folio ?? ''}</td>
						<td>${element.FechaLlegada ?? ''}</td>
						<td>${element.HoraLlegada ?? ''}</td>
						<td>${element.NombreUsuario ?? ''}</td>
						<td>${element.Usuario ?? ''}</td>
						<td>${element.Canal ?? ''}</td>
						<td>${element.ServicioDigital ?? ''}</td>
						<td>${element.Estatus ?? ''}</td>
						<td>${element.Prioridad ?? ''} 
								${!element.Prioridad ? '-' : 
									element.Prioridad.toLowerCase() == 'no urgente' ? '<i class="text-primary fas fa-clock" aria-hidden="true"></i>' : 
									element.Prioridad.toLowerCase() == 'prioritario' ? '<i class="text-warning fas fa-exclamation" aria-hidden="true"></i>' : 
									element.Prioridad.toLowerCase() == 'urgente' ? '<i class="text-danger fas fa-exclamation-triangle" aria-hidden="true"></i>' : '-'
							}
						</td>						
						<td attr-data="fin" class="text-center">
							<form class="form-seg" method="post">
								<input type="hidden" name="idInteraccion" value="${element.idInteraccion}">
								<input type="hidden" name="LoginId" value="${document.getElementById('vUsuario').value}">
								<input type="hidden" name="idUsuario" value="${document.getElementById('vidUsuario').value}">
								<input type="hidden" name="TipoRegistro" value="${idWidEstatus}">
								<button class="btn ${idWidEstatus == 0 ? 'btn-primary' : 'btn-info'} btn-sm">
								${idWidEstatus == 0 ? '<i class="fa fa-angle-double-right" aria-hidden="true"></i>' : 
											'<i class="fa fa-arrow-right" aria-hidden="true"></i>'}
								</button>
							</form>
						</td>
					</tr>`;
			});
			table += `</tbody></table>`;
		document.getElementById("tableWidget").innerHTML = table;
		document.getElementById("tableWidget").classList.remove('d-none');
		$('.table').DataTable({
			// scrollY:        "400px",
			scrollX:        true,
			scrollCollapse: true,

			pageLength: 10,

			lengthMenu: [10, 20, 50, 100],
			
			fixedColumns: {
				left: 0,
				right: 2
			},

			
			language:{url:'js/Spanish2.json'}
		})
		.responsive.recalc();
		// new DataTable(".table");
		document.querySelector(".validandoDatos").classList.add("d-none");
	});
});



let getGridWidget = id => {
	document.querySelector(".validandoDatos").classList.remove("d-none");
	let formData = new FormData();
	formData.append("idDetalle", id);

	// formData.append("idArea", document.getElementById('idArea').value);
	// formData.append("Superusuario", document.getElementById('Superusuario').value);
	// formData.append("idPerfil", document.getElementById('idPerfil').value);
	fetch('core/app/ggridwidget.php', {
		method: "POST",
		body: formData
	})
	.then(resp => resp.json())
	.then(data => {
	
		if (data.response == null) {
			document.getElementById("tableWidget").innerHTML = '';
			document.getElementById("tableWidget").classList.add('d-none');
			toastr.info('No existen registros', "Mensaje");
			document.querySelector(".validandoDatos").classList.add("d-none");
			return false;
		}
		let table = 
			`<table class="table w-100 stripe table-lg">
				<thead>
					<tr>
						<th># Folio</th>
						<th>Fecha Llegada</th>
						<th>Hora Llegada</th>
						<th>Nombre de Usuario</th>
						<th>Usuario</th>
						<th>Canal</th>
						<th>Servicio digital reportado</th>
						<th>Estatus del caso</th>
						<th>Prioridad</th>
						<th class="text-center">${id == 0 ? 'Ver' : 'Gestión'}</th>
					</tr>
				</thead><tbody>`;
			data.response.forEach((element, index) => {
				table += 
					`<tr>
						<td>${element.Folio ?? ''}</td>
						<td>${element.FechaLlegada ?? ''}</td>
						<td>${element.HoraLlegada ?? ''}</td>
						<td>${element.NombreUsuario ?? ''}</td>
						<td>${element.Usuario ?? ''}</td>
						<td>${element.Canal ?? ''}</td>
						<td>${element.ServicioDigital ?? ''}</td>
						<td>${element.Estatus ?? ''}</td>
						<td>${element.Prioridad ?? ''} 
								${!element.Prioridad ? '-' : 
									element.Prioridad.toLowerCase() == 'no urgente' ? '<i class="text-primary fas fa-clock" aria-hidden="true"></i>' : 
									element.Prioridad.toLowerCase() == 'prioritario' ? '<i class="text-warning fas fa-exclamation" aria-hidden="true"></i>' : 
									element.Prioridad.toLowerCase() == 'urgente' ? '<i class="text-danger fas fa-exclamation-triangle" aria-hidden="true"></i>' : '-'
							}
						</td>						
						<td attr-data="fin" class="text-center">
							<form class="form-seg" method="post">
								<input type="hidden" name="idInteraccion" value="${element.idInteraccion}">
								<input type="hidden" name="LoginId" value="${document.getElementById('vUsuario').value}">
								<input type="hidden" name="idUsuario" value="${document.getElementById('vidUsuario').value}">
								<input type="hidden" name="TipoRegistro" value="${id}">
								<button class="btn ${id == 0 ? 'btn-primary' : 'btn-info'} btn-sm">
								${id == 0 ? '<i class="fa fa-angle-double-right" aria-hidden="true"></i>' : 
									        '<i class="fa fa-arrow-right" aria-hidden="true"></i>'}
								</button>
							</form>
						</td>
					</tr>`;
			});
			table += `</tbody></table>`;
			document.getElementById("tableWidget").innerHTML = table;
			document.getElementById("tableWidget").classList.remove('d-none');
			$('.table').DataTable({
				// scrollY:        "400px",
				scrollX:        true,
				scrollCollapse: true,

				pageLength: 10,

				lengthMenu: [10, 20, 50, 100],
				
				fixedColumns: {
					left: 0,
					right: 1
				},
				"language": {
					url: 'js/Spanish2.json'
				}
			})
			// .columns.adjust()
			.responsive.recalc();
			// new DataTable(".table");
		
		document.querySelector(".validandoDatos").classList.add("d-none");
	});

}


// $('[data-toggle="tooltip"]').tooltip();


let saveInicial = () => {
	//EN INBOUND
	if (document.getElementById('ModoGestion').value == 2) {
		let formData = new FormData(document.getElementById('saveInicial'))
	
		fetch('core/app/saveInicial.php', {
			method: "POST",
			body: formData
		})
		.then(resp => resp.json())
		.then(data => {

		});
	}
}

// saveInicial();



// document.getElementById('btnPreview').addEventListener('click', e => {
// 	if (document.getElementById('Bandeja').value != "") {
// 		// swal("Selecciona una opción", {
// 		// 	closeOnClickOutside: false,
// 		// 	dangerMode: true,
// 		// 	buttons: {
// 		// 		btn1:{
// 		// 			text: "Inbound",
// 		// 			value: "1",
// 		// 			className: "btn btn-success"},
// 		// 		btn2: {
// 		// 			text:"Outbound",
// 		// 			value: "2",
// 		// 			className: "btn btn-success"},
// 		// 		btn3: {
// 		// 			text:"WhatsApp",
// 		// 			value:"3",
// 		// 			className: "btn btn-success"}
// 		// 		},
// 		// })
// 		// .then((val) => {
// 		// 	document.getElementById('pidCanal').value = val;
// 		// 	document.getElementById('saveInicial').submit();
// 		// });
// 		// $('.swal-footer').addClass('d-flex justify-content-center');
// 		document.getElementById('saveInicial').submit();
// 	} else {
// 		toastr.info('Favor de seleccionar un Marcador', "Mensaje");
// 	}
// });

let fnSeg = (_indice, _tipo) => {
	// console.log(_indice, _tipo, document.getElementById('ModoGestion').value);

	if (_tipo == 3) {
		document.getElementById(`form-fin-${_indice}`).submit();
		return false;
	}

	if (document.getElementById('ModoGestion').value == 1) {
		// console.log("ENTRE");
		swal("Selecciona una opción", {
			closeOnClickOutside: false,
			dangerMode: true,
			buttons: {
				btn1:{
					text: "Inbound",
					value: "1",
					className: "btn btn-success"},
				btn2: {
					text:"Outbound",
					value: "2",
					className: "btn btn-success"},
				btn3: {
					text:"WhatsApp",
					value:"3",
					className: "btn btn-success"},
			
			},
		})
		.then((val) => {
			if (_tipo == 1) {
				document.getElementById(`pidCanal-${_indice}`).value = val;
				document.getElementById(`form-seg-${_indice}`).submit();
			} else {
				document.getElementById(`2pidCanal-${_indice}`).value = val;
				document.getElementById(`form-fin-${_indice}`).submit();
			}
		});
		$('.swal-footer').addClass('d-flex justify-content-center');
	} else {
		if (_tipo == 1) {
			document.getElementById(`form-seg-${_indice}`).submit();
		} else {
			document.getElementById(`form-fin-${_indice}`).submit();
		}
	}
}




// if (document.getElementById('btnTrans') != null) {
// 	var padre = $('.py-2.my-2').parent('div');
// 	padre.addClass('col-lg-2');
// 	padre.removeClass('col-lg-4');
// 	$('.py-2.my-2 h1').css({ 'font-size': '18px', 'margin-top': '5px' });
// 	$('.py-2.my-2 h3').css({ 'font-size': '14px', 'margin-top': '5px' });
// 	$('.py-2.my-2 i').css({ 'font-size': '2rem' });
// 	$('.cont-widg').addClass('d-flex justify-content-around align-items-center');

	
// 	let catSkills = [
// 		{id: 1, Nombre: "SANBORNS", idPadre: 0},
// 		{id: 2, Nombre: "SEARS", idPadre: 0},
// 		{id: 3, Nombre: "CLARO SHOP", idPadre: 0},
// 		{id: 375, Nombre: "ClaroShop Linea Roja", idPadre: 3},
// 		{id: 387, Nombre: "Asesoria Portal", idPadre: 3},
// 		{id: 388, Nombre: "Atencion Clientes", idPadre: 3},
// 		{id: 389, Nombre: "Autorizaciones", idPadre: 3},
// 		{id: 390, Nombre: "Aclaraciones", idPadre: 3},
// 		{id: 391, Nombre: "Reembolso", idPadre: 3},
// 		{id: 392, Nombre: "Cancelaciones", idPadre: 3},
// 		{id: 393, Nombre: "Devoluciones", idPadre: 3},
// 		{id: 443, Nombre: "Facturaciones", idPadre: 3},
// 		{id: 444, Nombre: "Garantias", idPadre: 3},
// 		{id: 351, Nombre: "Libros Electronicos", idPadre: 1},
// 		{id: 353, Nombre: "Devoluciones", idPadre: 1},
// 		{id: 354, Nombre: "Cancelacion y reembolso", idPadre: 1},
// 		{id: 355, Nombre: "Garantias", idPadre: 1},
// 		{id: 356, Nombre: "Facturacion", idPadre: 1},
// 		{id: 357, Nombre: "Informacion tdc", idPadre: 1},
// 		{id: 358, Nombre: "Quejas del servicio Sanborns", idPadre: 1},
// 		{id: 359, Nombre: "Quejas del servicio tiendas", idPadre: 1},
// 		{id: 362, Nombre: "Asesoria Compra", idPadre: 1},
// 		{id: 363, Nombre: "Atencion a clientes", idPadre: 1},
// 		{id: 377, Nombre: "Sanborns Linea Roja", idPadre: 1},
// 		{id: 364, Nombre: "Asesoria Portal", idPadre: 2},
// 		{id: 366, Nombre: "LACS", idPadre: 2},
// 		{id: 369, Nombre: "Autorizaciones", idPadre: 2},
// 		{id: 370, Nombre: "Facturacion", idPadre: 2},
// 		{id: 371, Nombre: "Cancelacion y reembolso", idPadre: 2},
// 		{id: 372, Nombre: "Devoluciones", idPadre: 2},
// 		{id: 373, Nombre: "Garantias", idPadre: 2},
// 		{id: 374, Nombre: "Atencion Clientes", idPadre: 2},
// 		{id: 376, Nombre: "Sears Linea Roja", idPadre: 2},
// 		{id: 397, Nombre: "Quejas del servicio Sears", idPadre: 2}
// 	]


// 	let opPortal = ''
// 	catSkills.filter(e => e.idPadre == 0).forEach(e => {
// 		opPortal += `<option ${document.getElementById('sidOrigen').value == e.id ? 'selected':''} value="${e.id}">${e.Nombre}</option>`;
// 	});
// 	document.getElementById('idPortal').innerHTML = opPortal;



// 	let opSkill = '';
// 	catSkills.filter(e => e.idPadre == document.getElementById('sidOrigen').value).forEach(e => {
// 		opSkill += `<option ${document.getElementById('sOpcionIVR').value == e.id ? 'selected':''} value="${e.id}">${e.Nombre}</option>`;
// 	});
// 	document.getElementById('idSkill').innerHTML = opSkill;


// 	document.getElementById('idPortal').addEventListener('change', e => {
// 		let opSkillDrop = '<option selected hidden value>Selecciona una opción</option>';
// 		// console.log(e.target.id);
// 		catSkills.filter(el => el.idPadre == e.target.value).forEach(ele => {
// 			opSkillDrop += `<option value="${ele.id}">${ele.Nombre}</option>`;
// 		});

// 		document.getElementById('idSkill').innerHTML = opSkillDrop;
// 	});




// 	document.getElementById('saveTransfer').addEventListener('submit', e => {
// 		e.preventDefault();
// 		let formData = new FormData();
// 		formData.append('idInteraccion', document.getElementById('sidInteraccion').value);
// 		formData.append('idOrigenTRN', document.getElementById('idPortal').value);

// 		formData.append('idSkill', document.getElementById('idSkill').value);

// 		formData.append('Skill', document.getElementById('idSkill').options[document.getElementById('idSkill').selectedIndex].text);


// 		fetch('core/app/saveTrans.php', {
// 			method: "POST",
// 			body: formData
// 		})
// 		.then(resp => resp.json())
// 		.then(data => {
// 			swal({
// 				closeOnClickOutside: false,
// 				closeOnEsc: false,
// 				title:  data.response[0].Mensaje,
// 				icon: data.response[0].Codigo == 0 ? "success" : "warning",
// 			}).then(resp => { 
				
// 				var win = window.open("about:blank", "_self");
// 				win.close();
				
// 			});
// 		});

// 	});

// 	// idSkill
// }
 



document.getElementById('btnNuevo').addEventListener('click', e => {
	e.target.setAttribute('disabled', 'disabled');
	let formData = new FormData();
	formData.append('idUsuario', document.getElementById('vidUsuario').value);

	fetch("core/app/getInteraccionCRM.php", {
		method: "POST",
		body: formData
	})
	.then(resp => resp.json())
	.then(data => {
		// console.log(data);
		let {idInteraccion} = data.response[0];
		let urlCrm = `gestion.php?idInteraccion=${idInteraccion.trim()}&LoginId=${document.getElementById('vUsuario').value}`;
		// window.open(urlCrm);
		// console.log(urlCrm);
		location.href = urlCrm;
	})
	.catch(e => {
		console.log(e);
	});
});

document.getElementById('tableWidget').addEventListener('submit', e => {
	if (e.target.classList.contains('form-seg')) {
		e.preventDefault()

		let formData = new FormData(e.target);

		fetch("core/app/getInteraccionCRM.php", {
			method: "POST",
			body: formData
		})
		.then(resp => resp.json())
		.then(data => {
			let {idInteraccion} = data.response[0];
			let urlCrm = `gestion.php?idInteraccion=${formData.get('idInteraccion').trim()}&idInteraccionSeg=${idInteraccion}&LoginId=${document.getElementById('vUsuario').value}&TipoRegistro=${formData.get('TipoRegistro')}`;
			// window.open(urlCrm);
			console.log(urlCrm);
			location.href = urlCrm;
		});		
	}
});

function process(input){
	let value = input.value;
	let numbers = value.replace(/[^0-9]/g, "");
	input.value = numbers;
}

Object.values(document.querySelectorAll('.only-numbers')).map(e => {
	e.addEventListener('input', el => {
		process(el.target);
	})
});
