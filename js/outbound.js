window.onbeforeunload = function(e) {
	return "Run";
};

let catalogo = [{
	"idPadre": 0,
	"idCat": 1,
	"Nombre": "EXPEDIENTE"
},
{
	"idPadre": 0,
	"idCat": 2,
	"Nombre": "EXPEDIENTE DE IDENTIFICACIÓN"
},
{
	"idPadre": 0,
	"idCat": 3,
	"Nombre": "FCT"
},
{
	"idPadre": 0,
	"idCat": 4,
	"Nombre": "NORMATIVO"
},
{
	"idPadre": 0,
	"idCat": 5,
	"Nombre": "PREVALIDA"
},
{
	"idPadre": 0,
	"idCat": 6,
	"Nombre": "PROMOCIÓN DE AHORRO VOLUNTARIO"
},
{
	"idPadre": 0,
	"idCat": 7,
	"Nombre": "TRASPASO APP"
},
{
	"idPadre": 4,
	"idCat": 8,
	"Nombre": "65 Y MAS"
},
{
	"idPadre": 4,
	"idCat": 9,
	"Nombre": "CAMBIO DE SIEFORE"
},
{
	"idPadre": 4,
	"idCat": 10,
	"Nombre": "INSTITUTOS CRUZADOS"
},
{
	"idPadre": 4,
	"idCat": 11,
	"Nombre": "LIQUIDACIÓN DE DOMICILIACIÓN"
},
{
	"idPadre": 4,
	"idCat": 12,
	"Nombre": "LIQUIDACIÓN IMSS PARCIAL"
},
{
	"idPadre": 4,
	"idCat": 13,
	"Nombre": "LIQUIDACIÓN IMSS TOTAL"
},
{
	"idPadre": 4,
	"idCat": 14,
	"Nombre": "LIQUIDACIÓN ISSSTE PARCIAL"
},
{
	"idPadre": 4,
	"idCat": 15,
	"Nombre": "LIQUIDACIÓN ISSSTE PROGRAMADOS"
},
{
	"idPadre": 4,
	"idCat": 16,
	"Nombre": "LIQUIDACIÓN ISSSTE TOTAL"
},
{
	"idPadre": 4,
	"idCat": 17,
	"Nombre": "LIQUIDACIÓN POR REDES COMERCIALES"
},
{
	"idPadre": 4,
	"idCat": 18,
	"Nombre": "LIQUIDACIÓN VOLUNTARIA"
},
{
	"idPadre": 4,
	"idCat": 19,
	"Nombre": "MODIFICACIÓN DE DATOS"
},
{
	"idPadre": 4,
	"idCat": 20,
	"Nombre": "OTROS"
},
{
	"idPadre": 4,
	"idCat": 21,
	"Nombre": "PENSIÓN MÍNIMA GARANTIZADA"
},
{
	"idPadre": 4,
	"idCat": 22,
	"Nombre": "PLAN PRIVADO DE PENSIÓN"
},
{
	"idPadre": 4,
	"idCat": 23,
	"Nombre": "PRE-REGISTRO POR INTERNET"
},
{
	"idPadre": 4,
	"idCat": 24,
	"Nombre": "PRE-SOLICITUD DE AHORRO VOLUNTARIO"
},
{
	"idPadre": 4,
	"idCat": 25,
	"Nombre": "RE-AGENDACIÓN DE CITAS"
},
{
	"idPadre": 4,
	"idCat": 26,
	"Nombre": "RECHAZOS"
}];

document.getElementById('interaccion').innerHTML = document.getElementById('UCID').value;
document.getElementById('agenteM').innerHTML = document.getElementById('Agente').value;
document.getElementById('numero-get').innerHTML = document.getElementById('ANI').value;


let createOption = (_catalogo) => {
	let option = '<option hidden value selected>Seleccione una opción</option>';
	for (let index = 0; index < _catalogo.length; index++) {
		if(_catalogo[index].idPadre == 0) {
			option += `<option value="${_catalogo[index].idCat}">${_catalogo[index].Nombre}</option> `;
		}
	}
	document.getElementById('campania').innerHTML = option;
}

createOption(catalogo);


document.getElementById('campania').addEventListener('change', e => {
	let option = '<option hidden value selected>Seleccione una opción</option>';
	document.getElementById('subcategoria').removeAttribute('required');
	document.getElementById('div-sub').classList.add('d-none');

	for (let index = 0; index < catalogo.length; index++) {
		// console.log(e.getAttribute(''));
		if(catalogo[index].idPadre == e.target.value) {
			console.log(catalogo[index].idPadre+" == "+e.target.value);
			
				// console.log("TIENE DATOS");
				document.getElementById('subcategoria').setAttribute('required', 'required');
				document.getElementById('div-sub').classList.remove('d-none');
			
			option += `<option value="${catalogo[index].idCat}">${catalogo[index].Nombre}</option> `;

			// break;
		}
	}
	document.getElementById('subcategoria').innerHTML = option;
});


let formData = new FormData();
formData.append('UCID', document.getElementById('UCID').value);
formData.append('Agente', document.getElementById('Agente').value);
formData.append('ANI', document.getElementById('ANI').value);
fetch("core/app/saveOut.php", {
	method: "POST",
	body: formData
})
.then(resp => resp.json())
.then(resp => {
	console.log(resp);
});


/*

*/

document.getElementById('form').addEventListener('submit', e=> {
	e.preventDefault();
	let formData = new FormData(e.target);

	let campania = document.getElementById('campania');
	let textoCampania  = campania.options[campania.selectedIndex].text;
	formData.set('Campania', textoCampania);

	let subcategoria = document.getElementById('subcategoria');
	if(subcategoria.value != '') {
		let textoSubcategoria  = subcategoria.options[subcategoria.selectedIndex].text;
		formData.set('Subcategoria', textoSubcategoria);
	}

	let resultadoMarcacion = document.getElementById('resultadoMarcacion');
	let textoResultadoMarcacion  = resultadoMarcacion.options[resultadoMarcacion.selectedIndex].text;
	formData.set('Resultado_marcacion', textoResultadoMarcacion);


	let estado_select = document.getElementById('estado_select');
	if(estado_select.value != '') {
		let textoestado_select  = estado_select.options[estado_select.selectedIndex].text;
		formData.set('Estado', textoestado_select);
	}


	fetch("core/app/saveOut.php", {
		method: "POST",
		body: formData
	})
	.then(resp => resp.json())
	.then(resp => {
		if (resp.response[0].Code != undefined) {
			swal({
				closeOnClickOutside: false,
				closeOnEsc: false,
				title: 'Tipificador-ISSSTE',
				text: "Operación exitosa",
				icon: "success"
			}).then(resp => {
				//location.reload();
				document.querySelector(".validandoDatos").classList.remove("d-none");
				setTimeout(() => {
					document.querySelector(".validandoDatos").classList.remove("nope");
				}, 750);
				// console.log(idInteraccion);


				setTimeout(() => {
					window.onbeforeunload = null;
					var win = window.open("about:blank", "_self");
					win.close();  // CIERRA VENTANA
				}, 3500);
				
			});
		} else {
            swal({
				closeOnClickOutside: false,
				closeOnEsc: false,
				title: 'Tipificador-ISSSTE',
				text: "Ocurrio un error, favor de validar",
				icon: "warning"
			});
        }
	});

});



document.getElementById('estado_select').addEventListener('change', e => {
	let formData = new FormData();
	formData.append('idEstado', e.target.value);
	fetch("core/app/getMun.php", {
		method: "POST",
		body: formData
	})
	.then(resp => resp.json())
	.then(resp => {
		let catMun = resp.response;
		let option = '<option hidden value selected>Seleccione una opción</option>';
		for (let index = 0; index < catMun.length; index++) {
			option += `<option value="${catMun[index].Municipio}">${catMun[index].Municipio}</option>`
		}

		document.getElementById("mun_select").innerHTML = option;
		document.getElementById("mun_select").setAttribute('required', 'required');
	});
	// estado_select
	// mun_select
});