// $('#modal-send').modal('show') swal("Web Service IMSS!", data, "error");
//  $('#inicial').modal('show');
    // $('[data-toggle="tooltip"]').tooltip()
let muestraForm = () => {
    $('#spinner').modal('show');
    console.log(document.getElementById('folioBusq').value);
    // return false;
    setTimeout(() => {
        document.getElementById('vigencia').dispatchEvent(new Event('submit'));
    }, 500);
}
muestraForm();


//  console.log("Cargamos")


var datosFolio;

let createOption = (_catalogo) => {
    // $('#inicial').modal('hide');

	let option = '<option hidden value selected>Seleccione una opción</option>';
	for (let index = 0; index < _catalogo.length; index++) {
		if(_catalogo[index].idPadre == 0) {
			option += `<option value="${_catalogo[index].idCat}">${_catalogo[index].Nombre}</option> `;
		}
	}
	document.getElementById('dirNormativa').innerHTML = option;
	document.getElementById('otroDirNorm').innerHTML = option;

}

createOption(catalogDatosGenerales);

document.getElementById('dirNormativa').addEventListener('change', e => {
    
    let option = '<option hidden value selected>Seleccione una opción</option>';
    document.getElementById('otroDirNorm').value = e.target.value;
    // document.getElementById('rubro').removeAttribute('required');
    // document.getElementById('div-sub').classList.add('d-none');
    //name="DirNormativa"

    if(e.target.value != 46){
        for (let index = 0; index < catalogDatosGenerales.length; index++) {
            if(catalogDatosGenerales[index].idPadre == e.target.value) {
                
                option += `<option value="${catalogDatosGenerales[index].idCat}">${catalogDatosGenerales[index].Nombre}</option> `;
    
                // break;
            }
        }
        document.getElementById('rubro').innerHTML = option;
        document.getElementById('otroRubro').removeAttribute('name');
        document.getElementById('otroRubro').removeAttribute('required');
        document.getElementById('otroDirNorm').removeAttribute('name');
        document.getElementById('otroDirNorm').removeAttribute('required');
        document.getElementById('rubro').setAttribute('name',"Rubro");
        document.getElementById('rubro').setAttribute('required',true);
        document.getElementById('dirNormativa').setAttribute('name',"DirNormativa");
        document.getElementById('dirNormativa').setAttribute('required',true);
        Object.values(document.querySelectorAll('.divDirRub')).map(el => {
            el.classList.remove('d-none');
        });
        document.querySelector('.divOtroDirNorm').classList.add('d-none');
        document.querySelector('.divOtroRubro').classList.add('d-none');
    }else{
        document.getElementById('rubro').removeAttribute('name');
        document.getElementById('rubro').removeAttribute('required');
        document.getElementById('dirNormativa').removeAttribute('name');
        document.getElementById('dirNormativa').removeAttribute('required');
        document.getElementById('otroRubro').setAttribute('name',"Rubro");
        document.getElementById('otroRubro').setAttribute('required',true);
        document.getElementById('otroDirNorm').setAttribute('name',"DirNormativa");
        document.getElementById('otroDirNorm').setAttribute('required',true);
        Object.values(document.querySelectorAll('.divDirRub')).map(el => {
            el.classList.add('d-none');
        });
        document.querySelector('.divOtroDirNorm').classList.remove('d-none');
        document.querySelector('.divOtroRubro').classList.remove('d-none');
    }
});

document.getElementById('otroDirNorm').addEventListener('change', e => {
    
    let option = '<option hidden value selected>Seleccione una opción</option>';
    document.getElementById('dirNormativa').value = e.target.value;
    // document.getElementById('rubro').removeAttribute('required');
    // document.getElementById('div-sub').classList.add('d-none');
    //name="DirNormativa"

    if(e.target.value != 46){
        for (let index = 0; index < catalogDatosGenerales.length; index++) {
            if(catalogDatosGenerales[index].idPadre == e.target.value) {
                
                option += `<option value="${catalogDatosGenerales[index].idCat}">${catalogDatosGenerales[index].Nombre}</option> `;
    
                // break;
            }
        }
        document.getElementById('rubro').innerHTML = option;
        document.getElementById('otroRubro').removeAttribute('name');
        document.getElementById('otroRubro').removeAttribute('required');
        document.getElementById('otroDirNorm').removeAttribute('name');
        document.getElementById('otroDirNorm').removeAttribute('required');
        document.getElementById('rubro').setAttribute('name',"Rubro");
        document.getElementById('rubro').setAttribute('required',true);
        document.getElementById('dirNormativa').setAttribute('name',"DirNormativa");
        document.getElementById('dirNormativa').setAttribute('required',true);
        Object.values(document.querySelectorAll('.divDirRub')).map(el => {
            el.classList.remove('d-none');
        });
        document.querySelector('.divOtroDirNorm').classList.add('d-none');
        document.querySelector('.divOtroRubro').classList.add('d-none');
    }else{
        document.getElementById('rubro').removeAttribute('name');
        document.getElementById('rubro').removeAttribute('required');
        document.getElementById('dirNormativa').removeAttribute('name');
        document.getElementById('dirNormativa').removeAttribute('required');
        document.getElementById('otroRubro').setAttribute('name',"Rubro");
        document.getElementById('otroRubro').setAttribute('required',true);
        document.getElementById('otroDirNorm').setAttribute('name',"DirNormativa");
        document.getElementById('otroDirNorm').setAttribute('required',true);
        Object.values(document.querySelectorAll('.divDirRub')).map(el => {
            el.classList.add('d-none');
        });
        document.querySelector('.divOtroDirNorm').classList.remove('d-none');
        document.querySelector('.divOtroRubro').classList.remove('d-none');
    }
});


//#region Reglas CRM
document.getElementById('campo8').addEventListener('change',e => {
    if (e.target.value == "Anónimo") {
        document.querySelector('.divAnonimoProt').classList.add('d-none');
        document.querySelector('[name=Correo]').removeAttribute('required');
        document.getElementById('correoNoObl').checked = false;

        Object.values(document.querySelectorAll('[attr-req]')).map(e=>{
            e.removeAttribute('required');
        });

        Object.values(document.querySelectorAll('.divDatos')).map(e => {
            e.classList.add('d-none');
        });

        Object.values(document.querySelectorAll('.divNombre>input')).map(e => {
            e.value = 'Anónimo';
            e.setAttribute('readonly',true);
        });


    } else if (e.target.value == "Anónimo protegido") {
        document.querySelector('.divAnonimoProt').classList.remove('d-none');

        Object.values(document.querySelectorAll('[attr-req]')).map(e=>{
            e.setAttribute('required',true);
        });

        Object.values(document.querySelectorAll('.divDatos')).map(e => {
            e.classList.remove('d-none');
        });

        Object.values(document.querySelectorAll('.divNombre>input')).map(e => {
            e.value = '';
            e.removeAttribute('readonly');
        });

        document.getElementById('correoNoObl').checked = true;
        document.getElementById('correoNoObl').dispatchEvent(new Event('change'));
    } else if (e.target.value == "Promovente") {
        document.querySelector('.divAnonimoProt').classList.add('d-none');

        Object.values(document.querySelectorAll('[attr-req]')).map(e=>{
            e.setAttribute('required',true);
        });

        Object.values(document.querySelectorAll('.divDatos')).map(e => {
            e.classList.remove('d-none');
        });

        Object.values(document.querySelectorAll('.divNombre>input')).map(e => {
            e.value = '';
            e.removeAttribute('readonly');
        });

        document.getElementById('correoNoObl').checked = true;
        document.getElementById('correoNoObl').dispatchEvent(new Event('change'));
    }
})

document.getElementById('campo17').addEventListener('change',campo =>{
    let campo18 = document.getElementById('campo18');
    let campo19 = document.getElementById('campo19');
    let esObligatorio = document.getElementById('campo8').value == "Anónimo" ? false : true;

    if (campo.target.value == 'NSS') {
        campo18.setAttribute('required',esObligatorio);
        campo18.setAttribute('pattern',"^(\\d{10}|\\d{11})?$");
        campo18.setAttribute("title","Ej. 12345678901");
        campo18.classList.add('only-numbers');
        campo19.removeAttribute('disabled');
        campo18.value = '';
    } else if(campo.target.value == 'Registro Patronal') {
        campo18.setAttribute('required',esObligatorio);
        campo19.setAttribute('disabled',true);
        campo18.setAttribute('pattern',"^(.{11})?$");
        campo18.setAttribute("title","El campo debe ser alfanúmerico");
        campo18.classList.remove('only-numbers');
        campo18.value = '';
        campo19.value = '';
    }
});

document.getElementById('alcance').addEventListener('change', e => {
    if(e.target.checked){
        document.getElementById('campo33').removeAttribute('disabled');
        document.getElementById('campo33').setAttribute('required','true');
    }else{
        document.getElementById('campo33').removeAttribute('required');
        document.getElementById('campo33').setAttribute('disabled',true);
    }

});
//ELP 06/04/2022
document.getElementById('correoNoObl').addEventListener('change', e=> {
    if(e.target.checked){

        if(document.getElementById('campo8').value == "Anónimo"){
            return false;
        }

        Object.values(document.querySelectorAll('label.reqOpc')).map(lbl => {
            if(!lbl.innerHTML.includes('<strong class="isRequired divDatos">*</strong>')){
                lbl.innerHTML = lbl.innerHTML + '<strong class="isRequired divDatos">*</strong>';
            }
        });
        Object.values(document.querySelectorAll('input.reqOpc')).map(el => {
            let labelEl = el.parentNode.previousElementSibling.innerHTML;
            if(!labelEl.includes('<strong class="isRequired divDatos">*</strong>')){
                el.parentNode.previousElementSibling.innerHTML = labelEl + '<strong class="isRequired divDatos">*</strong>';
            }
        })

        Object.values(document.querySelectorAll('[attr-req]')).map(e=>{
            e.setAttribute('required',true);
        });

        Object.values(document.querySelector('.reqIni').children).map(ele=>{
            if(ele.tagName == "LABEL"){
                ele.innerHTML = ele.innerHTML.replace('<strong class="isRequired divDatos">*</strong>','');
            }else{
                ele.children[0].removeAttribute('required');
            }
        })
    }else{
        Object.values(document.querySelectorAll('label.reqOpc')).map(lbl => {
            lbl.innerHTML = lbl.innerHTML.replace('<strong class="isRequired divDatos">*</strong>','');
        });

        Object.values(document.querySelectorAll('input.reqOpc')).map(el => {
            let labelEl = el.parentNode.previousElementSibling.innerHTML;
            el.parentNode.previousElementSibling.innerHTML = labelEl.replace('<strong class="isRequired divDatos">*</strong>','');
        })

        Object.values(document.querySelectorAll('[attr-req]')).map(e=>{
            e.removeAttribute('required');
        });

        Object.values(document.querySelector('.reqIni').children).map(ele=>{
            if(ele.tagName == "LABEL"){
                if(!ele.innerHTML.includes('<strong class="isRequired divDatos">*</strong>')){
                    ele.innerHTML = ele.innerHTML + '<strong class="isRequired divDatos">*</strong>';
                    //console.log(ele.innerHTML.includes('<strong class="isRequired divDatos">*</strong>'));
                }
            }else{
                ele.children[0].setAttribute('required',true);
            }
        })
    }
});
//#endregion

document.getElementById('selectClasi').addEventListener('change', e => {
    let iniForm = new FormData();
    iniForm.append('idInteraccion', document.getElementById('input-idInteraccion').value);
    iniForm.append('LoginId', document.getElementById('input-LoginId').value);
    iniForm.append('Clasificacion',  e.target.value);
    iniForm.append('Origen', 2);
    
    fetch("../operacion/core/app/saveForm.php", {
        method: "POST",
        body: iniForm
    })
    .then(resp => resp.json())
    .then(data => {
        // console.log(data);
        if(data.response[0].Code == "0" || data.response[0].Code == "3") {
            document.querySelector('.fechaIni').innerHTML = 'Inicio: '+data.response[0].Inicio;
            $('#clasificacion').modal('hide');
            document.getElementById('Origen').value = 2;
            document.querySelector('.Tipificar').classList.remove('invisible');
        } else {
            if (![undefined, '', null].includes(data.response[0].Folio)) {
                $('#spinner').modal('show');
                
                const dataFolio = new FormData();
                dataFolio.append('Folio', data.response[0].Folio);
            
                fetch('../operacion/core/app/BuscaFolio.php', {
                    method: 'POST',
                    body: dataFolio
                })
                .then(resp=>resp.json())
                .then(dataRespFolio => {
                    // console.log(dataRespFolio);
                    datosFolio = dataRespFolio.response[0];
                    llenaForm();
                });

            } else {
                let elementMsj                = document.createElement('div');
                elementMsj.innerHTML          = `${data.response[0].Msj}`;
                elementMsj.style.marginBottom = '6rem';
			    swal({
                    closeOnClickOutside: false,
                    closeOnEsc: false,
                    title: 'OIC',
                    content: elementMsj,
                    icon: "warning",
                    buttons:false
                });
            }
        }
    });
    

});

// Busqueda en Modal Iniciar
$("#vigencia").submit(function(event) {
    event.preventDefault();
    $(".buscar").html("Buscando ...")
    $(".buscar").prop("disabled", true);
    $(".nuevo").prop("disabled", true);
    
    const data = new FormData();
    let folio = $("#folioBusq").val();

    if (folio.toUpperCase().includes('E')) {
        data.append('Origen',2);
        folio = folio.substring(1,folio.length);
    }else{
        data.append('Origen',1);
    }

    
    data.append('Folio', folio.toUpperCase());
    

    fetch('../operacion/core/app/BuscaFolio.php', {
            method: 'POST',
            body: data
        })
        .then(resp=>resp.json())
        .then(data => {
            datosFolio = data.response[0]
            llenaForm();
    
        })
        .catch(function(err) {
            console.log(err);
        });
    // END POST

})

// Object.keys(temp1).map(e=>{
//     //console.log(e,temp1[e]);
//     if(document.querySelector(`input[name="${e}"]`) != null){
//         document.querySelector(`input[name="${e}"]`).value = temp1[e];
//     }
// });





$("#respuesta").on("click", 'input[name="activar"]', function() {
    return false;
    $(".seguimientoServicio").removeClass("d-none")
    let clavePresupuestal = $(this).attr("data-clave")
    $.post("./core/umf.php", { clavePresupuestal }, function(response) {
        // console.log(response);
        if (response.response[0].Code && response.response[0].Code == 1) {
            sessionStorage.setItem('Localidad', response.response[0].Localidad)
            sessionStorage.setItem('UMF', response.response[0].UMF)
        }

    })
})


document.getElementById('organo_select').addEventListener('change', e=>{
    // console.log(e.target.value);
    let um_select  = document.getElementById('Unidad');
    let delegacion_select  = document.getElementById('Subdelegacion');

    if(e.target.value != "36"){
        um_select.removeAttribute('disabled');
        delegacion_select.removeAttribute('disabled');

        let organo = new FormData();
        organo.append('idOrgano',e.target.value);

        fetch('../operacion/core/app/getUnidades.php',{
            method: "POST",
            body: organo
        })
        .then(resp => resp.json())
        .then(data => {
            // console.log(data);return false;
            if (data.response[0].Code != 1) {
                // console.log(data.response);return false;
                let optionsSubDel = '<option value="" hidden>Seleccione una opción</option>';
                data.response[1].Subdelegaciones.map(e => {
                    optionsSubDel += `<option value="${e.Nombre}">${e.Nombre}</option>`;
                });
                delegacion_select.innerHTML = optionsSubDel;

                let optionsUniMed = '<option value="" hidden>Seleccione una opción</option>';
                data.response[2].Unidades.map(e => {
                    optionsUniMed += `<option value="${e.Nombre}">${e.Nombre}</option>`;
                });
                um_select.innerHTML = optionsUniMed;
            } else {
                toastr.warning(data.response[0].Msj, 'OIC');
            }
        })
        .catch(err => {
            console.error("Error en =>", err);
        })
    }else{
        um_select.setAttribute('disabled','true');
        um_select.value = '';

        delegacion_select.setAttribute('disabled','true');
        delegacion_select.value = '';
    }
});

document.getElementById('CP').addEventListener('blur',e => {
    let formDataCP = new FormData();
    formDataCP.append("CP",e.target.value);

    fetch('../operacion/core/app/getCP.php',{
        method: "POST",
        body: formDataCP
    })
    .then(resp => resp.json())
    .then(data => {
        if (data.response[0].Code != 1) {
            // console.log(data.response[1]);return false;
            let resp= data.response;
            document.getElementById('AlcMun').value = resp[2].Delegacion[0].Delegacion;
            document.getElementById('Estado').value = resp[1].Estado[0].Estado;

            let optionsColonia = '<option value="" hidden>Seleccione una opción</option>';
            resp[3].Colonias.map(e => {
                optionsColonia += `<option value="${e.Colonia}">${e.Colonia}</option>`;
            });
            document.getElementById("colonia_select").innerHTML = optionsColonia;
        } else {
            document.getElementById('AlcMun').value='';
            document.getElementById('Estado').value='';
            document.getElementById("colonia_select").value='';
            // document.getElementById("colonia_select").innerHTML = '<option value="" hidden>Seleccione una opción</option>';
            toastr.warning(data.response[0].Msj, 'OIC');
        }
    })
    .catch(err => {
        console.error("Error en =>", e);
    })
});

document.getElementById("colonia_select").addEventListener("change", e => {
    if (e.target.value == "OTRA") {
        Object.values(document.querySelectorAll('.otraColonia')).map(el => {
            el.classList.remove('d-none')
        });
        document.getElementById("colonia_select").removeAttribute("name");
        document.getElementById("colonia_select").removeAttribute("required");
        document.getElementById("otraColonia").setAttribute("name", "Colonia");
        document.getElementById("otraColonia").setAttribute("required", true);
    } else {
        document.getElementById("otraColonia").removeAttribute("name");
        document.getElementById("otraColonia").removeAttribute("required");
        document.getElementById("otraColonia").value = "";
        document.getElementById("colonia_select").setAttribute("name", "Colonia");
        document.getElementById("colonia_select").setAttribute("required", true);
        Object.values(document.querySelectorAll('.otraColonia')).map(el => {
            el.classList.add('d-none')
        });
    }
});

// Para mostrar el campo otra colonia
document.getElementById('otraColonia').addEventListener('input', e => {
    if(e.target.value == '') {
        Object.values(document.querySelectorAll('.colonia-select')).map(el => {
            el.classList.remove('d-none')
        });   
        document.getElementById('colonia_select').value = 'OTRA';
    } else {    
        Object.values(document.querySelectorAll('.colonia-select')).map(el => {
            el.classList.add('d-none')
        });
    }
});



// Obtiene el tamaño del textarea para el print
/* let newHeight = parseInt(document.getElementById('paso').style.height) + 150;
document.getElementById('paso').style.height = newHeight+'px';
document.getElementById('paso').value.length */ 

Object.values(document.querySelectorAll('.evento')).map(el => {
	el.addEventListener('click',e => {
		// console.log(e);
		if (e.target.classList.contains('Tipificar')) {
			document.getElementById('i-accion').value = 1;
		} else {
			document.getElementById('i-accion').value = 2;
		}
		document.getElementById('btn-save').click();
	})
});

document.getElementById('form').addEventListener('submit',e => {
    e.preventDefault();
	if(document.getElementById('i-accion').value == 1) {
        let newHeight = parseInt(document.getElementById('Paso').style.height) + 65;
        document.getElementById('Paso').style.height = newHeight+'px';
        
        let nhOtroRubro = 60;
        document.getElementById('otroRubro').style.height = nhOtroRubro+'px';
        
        ihOtroRubro = nhOtroRubro;
        iniHeight = newHeight;
    	$('#modal-final').modal('show');
	} else {
        let newHeight = parseInt(document.getElementById('Paso').style.height) + 65;
        document.getElementById('Paso').style.height = newHeight+'px';
        
        let nhOtroRubro = 60;
        document.getElementById('otroRubro').style.height = nhOtroRubro+'px';
        
        ihOtroRubro = nhOtroRubro;
        iniHeight = newHeight;

		updateForm(e.target);
	}
});


/*
  Guardar todo el formulario
*/
document.getElementById('formFinal').addEventListener('submit',e=>{
    e.preventDefault();


    //console.log(e.target);return false;
	console.log(document.getElementById('i-accion').value);

	let form = document.getElementById("form");
	let formData = new FormData(form);

	let idTipificacion = document.getElementById('tipificacion').value;
	formData.append('idTipificacion',idTipificacion);

	let textoOrgano  = document.getElementById('organo_select').options[document.getElementById('organo_select').selectedIndex].text;
	if(document.getElementById('organo_select').value != '') {
		formData.append('Organo', textoOrgano);
	}

	let DirNormativa  = document.getElementById('dirNormativa').options[document.getElementById('dirNormativa').selectedIndex].text;
	formData.set('DirNormativa', DirNormativa);

	let Rubro  = '';
    if(document.querySelector('[name=Rubro]').tagName == 'SELECT'){
        Rubro  = document.getElementById('rubro').options[document.getElementById('rubro').selectedIndex].text;
    }else{
        Rubro = document.getElementById('otroRubro').value;
    }
	formData.set('Rubro', Rubro);

	let valAlcance = document.getElementById('alcance').checked ? "1" : "0";
	formData.append('Alcance',valAlcance);


    for(var pair of formData.entries()){
        formData.set(pair[0], pair[1].trim().replace(/[{}\[\]]/g,'').replace(/\\/g,'').replace(/\</g,'').replace(/\>/g,''));  //ELP 24/03/2022
    }

	fetch("../operacion/core/app/saveForm.php",{
		method: "POST",
		body: formData
	})
	.then(resp=>resp.json())
	.then(data=>{

		if (data.response[0].Code == 0) {
			let elementMsj       = document.createElement('div');
			elementMsj.innerHTML = `Operación Exitosa!`;
			if(data.response[0].Folio != undefined) {
				elementMsj.innerHTML += `<br>Folio de captura:<strong>${data.response[0].Folio}</strong>`;
			}
			swal({
				closeOnClickOutside: false,
				closeOnEsc: false,
				title: 'OIC',
				content: elementMsj,
				icon: "success",
			});
			$('#modal-final').modal('hide');
			document.querySelector('.fechaFin').innerHTML = "Fin: "+data.response[0].Fin;
			if(data.response[0].Folio != undefined) {
				document.getElementById('folioCaptura').innerHTML = "Folio de captura: "+data.response[0].Folio;
			}
				// printHtml()
			$(".Tipificar").addClass("invisible");
			$(".printHtml").removeClass("invisible");
			// $(".enviarPDF").removeClass("invisible");
			

		}else if(data.response[0].Code == 2){
			swal({
				closeOnClickOutside: false,
				closeOnEsc: false,
				title: 'OIC',
				content: data.response[0].Msj,
				icon: "warning",
			});
		}
	})
	
});

function updateForm (_form) {
    let updateData = new FormData(_form);

    let idInteraccionSeg = document.getElementById('input-idInteraccionSeg').value;
    updateData.append('idInteraccionSeg', idInteraccionSeg);

    let textoOrgano  = document.getElementById('organo_select').options[document.getElementById('organo_select').selectedIndex].text;
	if(document.getElementById('organo_select').value != '') {
        updateData.append('Organo', textoOrgano);
    }

    let DirNormativa  = document.getElementById('dirNormativa').options[document.getElementById('dirNormativa').selectedIndex].text;
	updateData.set('DirNormativa', DirNormativa);

    let Rubro  = '';
    if(document.querySelector('[name=Rubro]').tagName == 'SELECT'){
        Rubro  = document.getElementById('rubro').options[document.getElementById('rubro').selectedIndex].text;
    }else{
        Rubro = document.getElementById('otroRubro').value;
    }
	updateData.set('Rubro', Rubro);

    let valAlcance = document.getElementById('alcance').checked ? "1" : "0";
    updateData.append('Alcance',valAlcance);

    for(var pair of updateData.entries()){
        updateData.set(pair[0], pair[1].trim().replace(/[{}\[\]]/g,'')); //ELP 24/03/2022
    }

    fetch("../operacion/core/app/updateForm.php",{
        method: "POST",
        body: updateData
    })
    .then(resp=>resp.json())
    .then(data=>{
        //console.log(data);return false;
        if (data.response[0].Code == 0) {
            swal({
                closeOnClickOutside: false,
				closeOnEsc: false,
				title: 'OIC',
				text: 'Operación Exitosa!',
				icon: "success",
            });

            // printHtml()
            $(".Actualizar").addClass("invisible");
            $(".printHtml").removeClass("invisible");
            // $(".enviarPDF").removeClass("invisible");
        }
    })
};


//#region submit jQuery
// $("#form").submit(function(event) {
//         event.preventDefault();
//         let idInteraccion = idInteraccionWeb
//         let Tipo_Num = $('input[name="tipoNum"]').val()
//         let Localidad = $('input[name="localidad"]').val()
//         let Serv_Nombre = $('input[name="nombreServ"]').val()
//         let Serv_Dir = $('input[name="direccionServ"]').val()
//         let TipoServicio = $('input[name="tipo"]').val()
//         let MotSubRoga = $('input[name="motivoSubrogacion"]:checked').val()
//         let RamoSeguro = $('input[name="ramoSeguro"]:checked').val()
//         let TipoSubroga = $('input[name="tipoDe"]').val()
//         let Vigencia = $('input[name="vigenciaDe"]').val()
//         let GrupoSubroga = $('input[name="grupoSubrogar"]:checked').val()
//         let Cantidad = $('input[name="servCantidad1"]').val()
//         let Especificar = $('input[name="especificarCantidad1"]').val()
//         let Prov_Razon = $('input[name="nombreProve"]').val()
//         let Prov_Dom = $('input[name="domProve"]').val()
//         let Prov_RFC = $('input[name="rfcProve"]').val()
//         let Prov_Tel = $('input[name="telProve"]').val()
//         let Prov_Contrato = $('input[name="contratoProve"]').val()
//         let Prov_VigenciaIni = $('input[name="vigenciaProve"]').val()
//         let Prov_VigenciaFin = $('input[name="alProve"]').val()
//         let Elaboro_Nombre = $('input[name="nombreElab"]').val()
//         let Elaboro_Matricula = $('input[name="matriculaElab"]').val()
//         let VoBo_Nombre = $('input[name="vobo1"]').val()
//         let VoBo_Matricula = $('input[name="vobo2"]').val()
//         let Director_Nombre = $('input[name="autoDirec1"]').val()
//         let Director_Matricula = $('input[name="autoDirec2"]').val()
//         let Cons_Nombre = $('input[name="nombreConstancia"]').val()
//         let Cons_Tipo = $('input[name="Cons_Tipo"]').val()
//         let Cons_Direccion = $('input[name="direccionConst"]').val()
//         let Cons_Tel = $('input[name="telConst"]').val()
//         let Diagnostico = $('textarea[name="diagnostico"]').val()
//         let idee = $('#idee').val()

//         $.post("./core/savForm.php", {
//                 idInteraccion,
//                 Tipo_Num,
//                 Localidad,
//                 Serv_Nombre,
//                 Serv_Dir,
//                 TipoServicio,
//                 MotSubRoga,
//                 RamoSeguro,
//                 TipoSubroga,
//                 Vigencia,
//                 GrupoSubroga,
//                 Cantidad,
//                 Especificar,
//                 Prov_Razon,
//                 Prov_Dom,
//                 Prov_RFC,
//                 Prov_Tel,
//                 Prov_Contrato,
//                 Prov_VigenciaIni,
//                 Prov_VigenciaFin,
//                 Elaboro_Nombre,
//                 Elaboro_Matricula,
//                 VoBo_Nombre,
//                 VoBo_Matricula,
//                 Director_Nombre,
//                 Director_Matricula,
//                 Cons_Nombre,
//                 Cons_Tipo,
//                 Cons_Direccion,
//                 Cons_Tel,
//                 Diagnostico,
//                 idee
//             },
//             function(response) {
//                 // console.log(response)
                // if (response.response[0].Code && response.response[0].Code == 1) {
                //     $('input[name="folio"]').val(response.response[0].Folio)
                //     $("#idFolio").val(response.response[0].Folio)
                //         // printHtml()
                //     $(".printHtml").removeClass("d-none")
                //         // $('#modal-send').modal('show')
                //     $("button.Guardar").hide()

                // }


//             })


//     })
    //#endregion
/** 
 *  Materno
 * */
$('input[name="ramoSeguro"]').click(function() {
    return false;
    let valor = $(this).val();

    if (valor == "MAT") {
        let materno = $(this).prop("checked")
        if (materno) {

            $("#materno").prop("disabled", false)
            $("#hospQuirur").prop("disabled", true)

            $('input[id="materno"]').prop("checked", true)
            $('input[id="hospQuirur"]').prop("checked", false)
            $('input[name="servCantidad1"]').val("1")
            $('input[name="especificarCantidad1"]').val("Atención Obstétrica")
        } else {
            $('input[id="materno"]').prop("checked", false)
            $('input[name="servCantidad1"]').val("")
            $('input[name="especificarCantidad1"]').val("")
        }
    } else if (valor == "EG2") {
        let materno = $(this).prop("checked")
        if (materno) {

            console.log(valor, materno, "Verdadero")
            $("#materno").prop("disabled", true)
            $("#hospQuirur").prop("disabled", false)

            $('input[id="hospQuirur"]').prop("checked", true)
            $('input[id="materno"]').prop("checked", false)
            $('input[name="servCantidad1"]').val("1")
            $('input[name="especificarCantidad1"]').val("Atención Médica General")
        } else {
            console.log(valor, materno, "Falso")
            $('input[id="hospQuirur"]').prop("checked", false)
            $('input[name="servCantidad1"]').val("")
            $('input[name="especificarCantidad1"]').val("")
        }
    } else {
        let materno = $(this).prop("checked")
        if (materno) {

            console.log(valor, materno, "Verdadero")
            $("#materno").prop("disabled", true)
            $("#hospQuirur").prop("disabled", false)

            $('input[id="hospQuirur"]').prop("checked", true)
            $('input[id="materno"]').prop("checked", false)
            $('input[name="servCantidad1"]').val("1")
            $('input[name="especificarCantidad1"]').val("Cirugía General")
        } else {
            console.log(valor, materno, "Falso")
            $('input[id="hospQuirur"]').prop("checked", false)
            $('input[name="servCantidad1"]').val("")
            $('input[name="especificarCantidad1"]').val("")
        }
    }
})

let iniHeight = 0;
let ihOtroRubro = 0;

function llenaForm(){

    // console.log(datosFolio);return false;    

    document.getElementById('folioCaptura').innerHTML = 'Folio de captura: '+ datosFolio.Folio;
    document.getElementById('form-Interaccion').innerHTML = 'ID: '+ datosFolio.idInteraccion;
    document.querySelector('.fechaIni').innerHTML = 'Inicio: '+ datosFolio.Inicio;
    document.querySelector('.fechaFin').innerHTML = 'Fin: '+ datosFolio.Fin;

    document.getElementById('Origen').value = datosFolio.Origen;

    document.getElementById('campo8').value = datosFolio.Campo8;
    document.getElementById('campo8').dispatchEvent(new Event('change'));

    if(datosFolio.Alcance == '1'){
        document.getElementById('alcance').setAttribute('checked',true);
        document.getElementById('alcance').dispatchEvent(new Event('change'));
        setTimeout(e=>{
            document.getElementById('campo33').value = datosFolio.Campo33;
        },1000);
    }  

    if(datosFolio.CP != ""){
        document.getElementById('CP').value = datosFolio.CP;
        document.getElementById('CP').dispatchEvent(new Event('blur'))
        setTimeout(e=>{
            document.getElementById('colonia_select').value = datosFolio.Colonia;
            if(document.getElementById('colonia_select').value == ''){

				document.getElementById('colonia_select').removeAttribute('name');
                document.querySelectorAll('.colonia-select')[0].classList.add('d-none');
                document.querySelectorAll('.colonia-select')[1].classList.add('d-none');
                document.querySelectorAll('.otraColonia')[0].classList.remove('d-none');
                document.querySelectorAll('.otraColonia')[1].classList.remove('d-none');
                //document.querySelector('.lblOtraColonia').classList.remove('d-none');
                document.getElementById('otraColonia').value = datosFolio.Colonia;
                document.getElementById('otraColonia').setAttribute('name', 'Colonia');
            }
        },1000);
    }
    
    document.getElementById('campo17').value = datosFolio.Campo17;
    document.getElementById('campo17').dispatchEvent(new Event('change'))
    setTimeout(e=>{
        if(document.getElementById('campo17').value == 'NSS'){
            //document.querySelector('.lblOtraColonia').classList.remove('d-none');
            document.getElementById('campo18').value = datosFolio.Campo18;
            document.getElementById('campo19').value = datosFolio.Campo19;
        }else{
            document.getElementById('campo18').value = datosFolio.Campo18;
        }
    },1000);    

    if(datosFolio.Correo == ""){
        document.getElementById('correoNoObl').checked = true;
        document.getElementById('correoNoObl').dispatchEvent(new Event('change'));
    }else{
        document.getElementById('correoNoObl').checked = false;
        document.getElementById('correoNoObl').dispatchEvent(new Event('change'));
        document.querySelector('[name=Correo]').value = datosFolio.Correo;
    }

    Object.values(document.getElementById('organo_select').options).map(e=>{
        if(e.text == datosFolio.Organo){ 
            e.setAttribute('selected',true); 
        }
    })

    if(datosFolio.Organo != ""){
        document.getElementById('organo_select').dispatchEvent(new Event('change'));
    
        setTimeout(e=>{
            document.getElementById('Unidad').value = datosFolio.Unidad;
            document.getElementById('Subdelegacion').value = datosFolio.Subdelegacion;
        },1000);
    }
    if(datosFolio.DirNormativa == 'Otro'){
        // document.getElementById('rubro').removeAttribute('name');
        // document.getElementById('rubro').removeAttribute('required');
        // document.getElementById('dirNormativa').removeAttribute('name');
        // document.getElementById('dirNormativa').removeAttribute('required');
        // document.getElementById('otroRubro').setAttribute('name',"Rubro");
        // document.getElementById('otroRubro').setAttribute('required',true);
        // document.getElementById('otroDirNorm').setAttribute('name',"DirNormativa");
        // document.getElementById('otroDirNorm').setAttribute('required',true);
        // Object.values(document.querySelectorAll('.divDirRub')).map(el => {
        //     el.classList.add('d-none');
        // });
        // document.querySelector('.divOtroDirNorm').classList.remove('d-none');
        // document.querySelector('.divOtroRubro').classList.remove('d-none');

        Object.values(document.getElementById('otroDirNorm').options).map(e=>{
            if(e.text == datosFolio.DirNormativa){ 
                e.setAttribute('selected',true); 
            }
        })
        document.getElementById('otroDirNorm').dispatchEvent(new Event('change'));
        setTimeout(e=>{
            document.getElementById('otroRubro').value = datosFolio.Rubro;
            // Object.values(document.getElementById('rubro').options).map(e=>{
            //     if(e.text == datosFolio.Rubro){ 
            //         e.setAttribute('selected',true); 
            //     }
            // })
        },1000);
        

    }else{
        // document.getElementById('rubro').removeAttribute('name');
        // document.getElementById('rubro').removeAttribute('required');
        // document.getElementById('dirNormativa').removeAttribute('name');
        // document.getElementById('dirNormativa').removeAttribute('required');
        // document.getElementById('otroRubro').setAttribute('name',"Rubro");
        // document.getElementById('otroRubro').setAttribute('required',true);
        // document.getElementById('otroDirNorm').setAttribute('name',"DirNormativa");
        // document.getElementById('otroDirNorm').setAttribute('required',true);
        // Object.values(document.querySelectorAll('.divDirRub')).map(el => {
        //     el.classList.add('d-none');
        // });
        // document.querySelector('.divOtroDirNorm').classList.remove('d-none');
        // document.querySelector('.divOtroRubro').classList.remove('d-none');


        Object.values(document.getElementById('dirNormativa').options).map(e=>{
            if(e.text == datosFolio.DirNormativa){ 
                e.setAttribute('selected',true); 
            }
        })

        if(datosFolio.DirNormativa != ""){
            // document.getElementById('dirNormativa').value = datosFolio.DirNormativa;
            document.getElementById('dirNormativa').dispatchEvent(new Event('change'))
            setTimeout(e=>{
                // document.getElementById('rubro').value = datosFolio.Rubro;
                Object.values(document.getElementById('rubro').options).map(e=>{
                    if(e.text == datosFolio.Rubro){ 
                        e.setAttribute('selected',true); 
                    }
                })
            },1000);
        }
    }

    document.getElementById('Paso').value = datosFolio.Paso;
    document.getElementById('Paso').dispatchEvent(new Event('input'));

    document.querySelector(".printHtml").classList.remove('invisible');

    let arrExceptions = ['LoginId','CP','Unidad','Subdelegacion','Colonia','Campo17','Campo18','Campo19','Campo8','DirNormativa','Paso','Alcance','Rubro','Campo33','Correo'];
    let arrDispatch = ['Pruebas'];

    Object.keys(datosFolio).map(e=>{
        //console.log(e,datosFolio[e]);return false;
        if(!arrExceptions.includes(e)){
            if((document.querySelector(`[name="${e}"]`) != null) ){
                document.querySelector(`[name="${e}"]`).value = datosFolio[e];
                if(arrDispatch.includes(e)){
                    document.querySelector(`#${e}`).value = datosFolio[e];
                }
            }
        }
    });

    /* Bloquea los campos para que no se editen ELP 11/08/22 */
    Object.values(document.querySelector('#form').elements).map(element => {
        if(element.getAttribute('type') != 'hidden'){
            if(element.tagName != 'BUTTON'){
                element.setAttribute('disabled',true)
            }
        }
    })

    setTimeout(e=>{
        $('#spinner').modal('hide');


		// let chars     = 5000;//Maximo de caracteres
		// let newHeight = 600;//Maximo Height con respecto a variable chars

		// let banadera = false;

		// let charsTA   = document.getElementById('Paso').value.length;

		// for (let index = chars; index > 1000; index -= 200) {
		// 	// console.log(`if(len > ${index - 500} && len <= ${index} {`);
		// 	// console.log(newHeight);

		// 	if(charsTA > (index - 200) && charsTA <= index) {
		// 		banadera = true;
		// 		break;
		// 	}

		// 	newHeight-=25;
		// 	/*if(charsTA >= index && charsTA <= index + 500) {
		// 		newHeight = index/25;
		// 		break;
		// 	}*/
		// }

		// if (!banadera) {
		// 	newHeight = 125;
		// }

		iniHeight = parseInt(document.getElementById('Paso').style.height);
		ihOtroRubro = parseInt(document.getElementById('otroRubro').style.height);
		
        // console.log('Original -> ',parseInt(document.getElementById('Paso').style.height), 'Nuevo -> ', newHeight);
        let newHeight = parseInt(document.getElementById('Paso').style.height) + 65;
        document.getElementById('Paso').style.height = newHeight+'px';
        let nhOtroRubro = 60;
        document.getElementById('otroRubro').style.height = nhOtroRubro+'px';
        
        iniHeight = newHeight;
        ihOtroRubro = nhOtroRubro;
        document.querySelector(".printHtml").dispatchEvent(new Event('click'));
    },1250)

 
}


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('/');
}

function _createTable(response) {
    //console.log(response.Code);return false;

    let tabla = `<table class="table "><thead class="thead-light"><tr><td>Nombre</td><td>Ap. paterno</td><td>Ap. materno</td><td>Folio</td><td>Accion</td></tr></thead><tbody>`;
    tabla += `<tr>`;

    if(response.Code == 1){
        tabla += `<td></td><td></td><td>${response.Msj}</td><td></td><td></td>`;
    }else{
        tabla += `<td>${response.Nombre}</td>`;
        tabla += `<td>${response.Paterno}</td>`;
        tabla += `<td>${response.Materno}</td>`;
        tabla += `<td>${response.Folio}</td>`;
        tabla += `<td><button type="button" class="btn btn-primary Editar" onclick='llenaForm()'>Editar</button></td>`;
    }
    
    tabla += `</tr>`;
    tabla += `</tbody><table>`;

    return tabla;
    
}



Object.values(document.querySelectorAll('textarea')).map(e=>{
    e.addEventListener('input', autosize);
})

function autosize() {
    let el = this;
    setTimeout(function() {
        el.style.cssText = 'height:auto; padding:0';
        el.style.cssText = 'height:' + (el.scrollHeight) + 'px';
    }, 0);
}


document.getElementById("formSend").addEventListener('submit', e => {
    e.preventDefault();
    return false;
    let formData = new FormData(e.target);
    formData.append('idInteraccion', idInteraccionWeb);
    fetch('core/sendFile.php', {
            method: 'POST',
            body: formData
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.response[0].Code == 1) {
                // console.log('Lo que se vaya a hacer');
                $("#modal-send").modal("hide")
                $("#modal-final").modal("show")
            }
        })
        .catch(e => {
            // console.log('Error en => ', e);
        })
})




function process(input){
    // console.log(input,'valor->',input.vale);
    if(input.classList.contains('only-numbers')){
        let value = input.value;
        let numbers = value.replace(/[^0-9]/g, "");
        input.value = numbers;
    }
}


document.querySelector('[name="Correo"]').addEventListener('keyup', e => {
	e.target.value = e.target.value.toLowerCase();
});