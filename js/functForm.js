localStorage.clear();
let saveData = () => {
    setTimeout(()=> {
        localStorage.setItem('asign__idInteraccion', document.getElementById('interaccion').innerHTML);
        localStorage.setItem('asign__idAgente',document.getElementById('agente').innerHTML); 
        localStorage.setItem('asign__NSS',document.getElementById('nss').value); 
        localStorage.setItem('asign__idee',document.getElementById('idee').value); 
        localStorage.setItem('asign__Agregado',document.getElementById('agregadoMedico').value); 
        localStorage.setItem('asign__Nombre',document.querySelector('.nombreNotasMF').innerHTML); 
        localStorage.setItem('asign__CURP',document.getElementById('curp').value); 
        localStorage.setItem('asign__Delegacion',document.getElementById('deleg-busqueda').innerHTML); 
        localStorage.setItem('asign__Unidad',document.getElementById('umf-busqueda').innerHTML); 
        localStorage.setItem('asign__ClavePresupuestal',document.getElementById('clavePresupuestal').value); 
        localStorage.setItem('asign__Consultorio',document.getElementById('consultorio').value); 
        localStorage.setItem('asign__Turno',document.getElementById('turno').value); 
    },1000)
}
let saveDataSurvey = () => {
	let idInteraccion     = localStorage.getItem('asign__idInteraccion');
	let idAgente          = localStorage.getItem('asign__idAgente');
	let NSS               = localStorage.getItem('asign__NSS');
	let idee              = localStorage.getItem('asign__idee');
	let Agregado          = localStorage.getItem('asign__Agregado');
	let Nombre            = localStorage.getItem('asign__Nombre');
	let CURP              = localStorage.getItem('asign__CURP');
	let Delegacion        = localStorage.getItem('asign__Delegacion');
	let Unidad            = localStorage.getItem('asign__Unidad');
	let ClavePresupuestal = localStorage.getItem('asign__ClavePresupuestal');
	let Consultorio       = localStorage.getItem('asign__Consultorio');
	let Turno             = localStorage.getItem('asign__Turno');
	let formData = new FormData();
		formData.append("idInteraccion",idInteraccion)
		formData.append("idAgente",idAgente)
		formData.append("NSS",NSS)
		formData.append("idee",idee)
		formData.append("Agregado",Agregado)
		formData.append("Nombre",Nombre)
		formData.append("CURP",CURP)
		formData.append("Delegacion",Delegacion)
		formData.append("Unidad",Unidad)
		formData.append("ClavePresupuestal",ClavePresupuestal)
		formData.append("Consultorio",Consultorio)
		formData.append("Turno",Turno)
	fetch('core/saveFormSurvey.php', {
			method: "POST",
			body: formData
		})
		.then(resp => resp.json())
		.then(data => {
			if (data.response[0].Code == 1) {
        // let msj = data.response[0].Mensaje;
        localStorage.setItem('asign__Folios', JSON.stringify(data.response[0].Folios));
        swal('Guardado correcto','Reedireccionando a ENCUESTA','success')
				setTimeout(()=>{
					location.href = 'encuesta.php';
				},1750);
			} else {
        swal('¡Ocurrió un error!',"Ocurrio un error durante el proceso...favor de verificar",'warning');
      }
		})
}
let saveForm = (reloading) => {
    if ($('#tercero').is(':checked')) {
        var referencia = $('#referencia').val();
        var nombreReferencia = $('#nombreReferencia').val();
      } else {
        var referencia = '';
        var nombreReferencia = '';
      }
      var clavePresupuestal = $('#clavePresupuestal').val()

      // loader.appendTo('.area-info');
      var nss = $('#nss').val();
      var tel = $('#telefono').val();
      var nombre = $('#nombre').val();
      var vigencia = $('#vigencia').val();
      var idee = $('#idee').val();
      var umf = $('#umf').val();
      var paterno = $('#aPaterno').val();
      var materno = $('#aMaterno').val();
      var genero = $('#genero').val();
      var correo = $('#email').val();
      var idCIE = $('#clave-cie').val();
      var idTipificacioncveIMSS = $('#tipificacion option:selected').attr('data-cveIMSS');
      var idTipificacion = $('#tipificacion option:selected').val();
      var idDestino = $("#CATDestinos").val();
      var generoCita = $('#generoCita').val();
      var comentarios = $('#comentarios').val();
      var dxComplentario = $('#dxComplentario').val();
      if ($('#agenteM').text() == '') {
        var idAgente = $('#agente').text();
      } else {
        var idAgente = $('#agenteM').text();
      }
      var idInteraccion = $('#interaccion').text();
      var idEscenario = $('#escenarios option:selected').val();
      var idEscenariocveIMSS = $('#escenarios option:selected').attr('data-cveIMSS');

      // var loader = $('<div class="loader"></div>');

      // if (sessionStorage.getItem("Fin")) {
      //   var Inicio = sessionStorage.getItem("Fin");
      //   // console.log("Fin");
      // }else{
      //   var Inicio = sessionStorage.getItem("Inicio");
      //   // console.log("Inicio");
      // }
      var inicio = sessionStorage.getItem('inicio');
      var fechaFin = $('#fechaActual').text().split('/').reverse().join('-');
      var horaFin = $('#horaActual').text();
      sessionStorage.setItem("Fin", fechaFin + ' ' + horaFin);

      var Fin = sessionStorage.getItem("Fin", fechaFin + ' ' + horaFin);
      var tipificacionCIE10 = $("#tipificacion option:selected").attr('data-cie');
      var ClaveIMSSCategorias = $("#ClaveIMSSCategorias").val();

      var agregadoMedico = $("#agregadoMedico").val();
      var fechaNacimiento = $("#fechaNacimiento").val();
      var curp = $("#curp").val();
      var consultorio = $("#consultorio").val();
      var conDerechoSm = $("#conDerechoSm").val();
      var idPersona = $("#idPersona").val();
      var turno = $("#turno").val();

      // console.log(inicio);
      console.log({
        idEscenario: idEscenario,
        idDestino: idDestino,
        idCIE: idCIE,
        tipificacionCIE10: tipificacionCIE10
      });
      if (!_browserIE()) {
        $.post('core/guardaRegistro.php', {
          nss: nss,
          tel: tel,
          nombre: nombre,
          vigencia: vigencia,
          idee: idee,
          umf: umf,
          paterno: paterno,
          materno: materno,
          genero: genero,
          correo: correo,
          inicio: inicio,
          Fin: Fin,
          idTipificacion: idTipificacion,
          generoCita: generoCita,
          comentarios: comentarios,
          dxComplentario: dxComplentario,
          idInteraccion: idInteraccion,
          idAgente: idAgente,
          referencia: referencia,
          nombreReferencia: nombreReferencia,
          clavePresupuestal: clavePresupuestal,
          idEscenario: idEscenario,
          idDestino: idDestino,
          idCIE: idCIE,
          tipificacionCIE10: tipificacionCIE10,
          ClaveIMSSCategorias: ClaveIMSSCategorias,
          agregadoMedico: agregadoMedico,
          fechaNacimiento: fechaNacimiento,
          curp: curp,
          consultorio: consultorio,
          conDerechoSm: conDerechoSm,
          idPersona: idPersona,
          turno: turno,
          idTipificacioncveIMSS: idTipificacioncveIMSS,
          idEscenariocveIMSS: idEscenariocveIMSS
        }, function (response) {
          if (response.response[0].Permiso == 1) {
            toastr.success('',response.response[0].Mensaje);
            if (reloading) {
              setTimeout(function () {
                $(location).attr('href', './index.php');
              }, 1500);
            }else{
              saveDataSurvey();
            }
          } else {
            toastr.warning('',response.response[0].Msj);
          }
        }, "JSON");
      } else {
        var formData = new FormData();

        formData.append('nss', nss);
        formData.append('tel', tel);
        formData.append('nombre', nombre);
        formData.append('vigencia', vigencia);
        formData.append('idee', idee);
        formData.append('umf', umf);
        formData.append('paterno', paterno);
        formData.append('materno', materno);
        formData.append('genero', genero);
        formData.append('correo', correo);
        formData.append('inicio', inicio);
        formData.append('Fin', Fin);
        formData.append('idTipificacion', idTipificacion);
        formData.append('generoCita', generoCita);
        formData.append('comentarios', comentarios);
        formData.append('dxComplentario', dxComplentario);
        formData.append('idInteraccion', idInteraccion);
        formData.append('idAgente', idAgente);
        formData.append('referencia', referencia);
        formData.append('nombreReferencia', nombreReferencia);
        formData.append('clavePresupuestal', clavePresupuestal);
        formData.append('idEscenario', idEscenario);

        formData.append('idDestino', idDestino);
        formData.append('idCIE', idCIE);
        formData.append('tipificacionCIE10', tipificacionCIE10);
        formData.append('ClaveIMSSCategorias', ClaveIMSSCategorias);
        formData.append('agregadoMedico', agregadoMedico);
        formData.append('fechaNacimiento', fechaNacimiento);
        formData.append('curp', curp);
        formData.append('consultorio', consultorio);
        formData.append('conDerechoSm', conDerechoSm);
        formData.append('idPersona', idPersona);
        formData.append('turno', turno);
        formData.append('idTipificacioncveIMSS', idTipificacioncveIMSS);
        formData.append('idEscenariocveIMSS', idEscenariocveIMSS);





        fecthIE('POST', 'core/guardaRegistro.php', formData, function (err, response) {
          if (response.response[0].Permiso == 1) {
            toastr.success('',response.response[0].Mensaje);
            if (reloading) {
              setTimeout(function () {
                $(location).attr('href', './index.php');
              }, 1500);
            }else{
              saveDataSurvey();
            }
          } else {
            toastr.warning('',response.response[0].Msj);
          }
        }, 'JSON');
      }
}

document.getElementById('escenarios').addEventListener('change', e => {
    if (e.target.value == 1 || e.target.value == 2 || e.target.value == 3) {
        document.getElementById('buttonFormSurvey').classList.remove('d-none')
    }else{
        document.getElementById('buttonFormSurvey').classList.add('d-none')
    }
})

document.getElementById('buttonFormSurvey').addEventListener('click', e => {
  
    if (document.getElementById('genero').value == '') {
        toastr.warning('','Falta llenar campo GENERO');
        return false;
    }
    if (document.getElementById('telefono').value == '') {
        toastr.warning('','Falta llenar campo TELEFONO');
        return false;
    }
    if (document.getElementById('nombre').value == '') {
        toastr.warning('','Falta llenar campo NOMBRE');
        return false;
    }
    if (document.getElementById('aPaterno').value == '') {
        toastr.warning('','Falta llenar campo A. PATERNO');
        return false;
    }
    // if (document.getElementById('aMaterno').value == '') {
    //     toastr.warning('','Falta llenar campo A. MATERNO');
    //     return false;
    // }
    if (document.getElementById('escenarios').value == '') {
        toastr.warning('','Falta llenar campo ESCENARIOS');
        return false;
    }
    if (document.getElementById('tipificacion').value == '') {
        toastr.warning('','Falta llenar campo TIPIFICACION');
        return false;
    }
    if (document.getElementById('comentarios').value == '') {
        toastr.warning('','Falta llenar campo COMENTARIOS');
        return false;
    }
    if (document.getElementById('CATDestinos').value == '') {
        toastr.warning('','Falta llenar campo DESTINOS');
        return false;
    }
    if (document.getElementById('generoCita').value == '') {
        toastr.warning('','Falta llenar campo SE GENERO UNA CITA');
        return false;
    }
    if (document.getElementById('dxComplentario').value == '') {
        toastr.warning('','Falta llenar campo DX COMPLENTARIO');
        return false;
    }
    
    if(document.querySelector('#tercero').checked){
      if (document.getElementById('referencia').value == '') {
        toastr.warning('','Falta llenar campo REFERENCIA');
        return false;
    }
    if (document.getElementById('nombreReferencia').value == '') {
        toastr.warning('','Falta llenar campo NOMBRE REFERENCIA');
        return false;
    }
}
    console.log('saveFormSurvey');
    saveForm(false);
    // saveDataSurvey();
    // 
});