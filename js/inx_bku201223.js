$('.Fechas').datepicker({
  format: "dd/mm/yyyy",
  todayBtn: "linked",
  language: "es",
  autoclose: true
});

$('#exampleModal').modal({
  backdrop:'static',
  show:true,
  keyboard:false
});

let _saveInicial = () => {
  document.querySelector('.date').innerHTML = moment().format("DD-MM-YYYY HH:mm:ss");
  let form = new FormData();

  form.set('idInteraccion',document.querySelector('.idInteraccionOculto').value);
  form.set('LoginId',document.querySelector('.LoginIdOculto').value);
  form.set('ANI',document.querySelector('.ANIOculto').value);
  form.set('Skill',document.querySelector('.SkillOculto').value);

  fetch("core/app/saveInicial.php", {
    method: "POST",
    body: form
  })
  .then(resp => resp.json())
  .then(data => {
    
    if(data.response[0].Code == 2){
      const wrapper = document.createElement('div');
  
      wrapper.innerHTML = data.response[0].Mensaje;

      swal({
        closeOnClickOutside: false,
        closeOnEsc: false,
        title: 'IMSS DPES',
        content: wrapper,
        icon: "warning"
      }).then(() => {
        location.reload();
      })
    }

    

  })
  .catch(e => {
    console.log(e);
  });
}

_saveInicial();

var _catalogos = null;
document.getElementById('campaniaModal').addEventListener('change', action =>{
  document.getElementById('campaniaModal').classList.remove('is-invalid');
  document.querySelector('.invalid-feedback').classList.add('d-none');

  if(action.target.value == 5){
    document.querySelectorAll('.divELSSA').forEach(x => {
      x.classList.remove('d-none');
    });

    document.querySelectorAll('.divELSSA > [attr-req').forEach(x => {
      x.setAttribute('required',true);
    });

    document.querySelector('.campoTip').classList.add('d-none');
    document.querySelector('#tip_select').setAttribute('attr-req',true);
    document.querySelector('#tip_select').removeAttribute('required');

    document.querySelector('.campoFolio').classList.remove('d-none');
    document.querySelector('.campoTelefono').classList.remove('d-none');
    document.querySelector('#bfolio').setAttribute('required',true);
    document.querySelector('#bFecha').setAttribute('required',true);
  }else if(action.target.value != 5){
    document.querySelectorAll('.divELSSA').forEach(x => {
      x.classList.add('d-none');
    });

    document.querySelectorAll('.divELSSA > [attr-req]').forEach(x => {
      x.removeAttribute('required');
    });

    document.querySelector('.campoTip').classList.remove('d-none');
    document.querySelector('#tip_select').setAttribute('required',true);

    document.querySelector('.campoFolio').classList.remove('d-none');
    document.querySelector('.campoTelefono').classList.remove('d-none');
    document.querySelector('#bfolio').setAttribute('required',true);
    document.querySelector('#bFecha').setAttribute('required',true);
  }
  
  if(action.target.value == 6){
    document.querySelector('#formOperativo').classList.add('d-none');
    document.querySelectorAll('#formOperativo [required]').forEach(fo => {
      fo.setAttribute('attr-req',true);
      fo.removeAttribute('required');
    });

    document.querySelector('#formOperativoNP').classList.remove('d-none');
    document.querySelectorAll('#formOperativoNP [attr-req]').forEach(ar => {
      ar.setAttribute('required',true);
    });

    document.querySelector('.campoFolio').classList.add('d-none');
    document.querySelector('.campoTelefono').classList.add('d-none');
    document.querySelector('#bfolio').removeAttribute('required');
    document.querySelector('#bFecha').removeAttribute('required');

  }else{
    document.querySelector('#formOperativo').classList.remove('d-none');
    document.querySelectorAll('#formOperativo [required]').forEach(fo => {
      fo.setAttribute('required',true);      
    });

    document.querySelector('#formOperativoNP').classList.add('d-none');
    document.querySelectorAll('#formOperativoNP [attr-req]').forEach(ar => {
      ar.removeAttribute('required');
    });

    document.querySelector('.campoFolio').classList.remove('d-none');
    document.querySelector('.campoTelefono').classList.remove('d-none');
    document.querySelector('#bfolio').setAttribute('required',true);
    document.querySelector('#bFecha').setAttribute('required',true);
  }

  let formCat = new FormData();

  formCat.set('idCampania',action.target.value);

  fetch("core/app/getcatalogos.php", {
    method: "POST",
    body: formCat
  })
  .then(resp => resp.json())
  .then(data => {
    _catalogos = data.response;

    if(action.target.value == 6){
      const inxMotLL = data.response.findIndex(x => x.Nombre == 'Motivo de la llamada');
      let options = '<option hidden value max selected>Seleccione una opción</option>';

      let catMotLL = data.response.filter(x => x.idPadre == data.response[inxMotLL].id);
      
      catMotLL.forEach(i => {
        options += `<option value="${i.id}">${i.Nombre}</option>`;
      });

      document.querySelector('#motivo_selectNP').innerHTML = options;

    }else{
      const inxTpoRep = data.response.findIndex(x => x.Nombre == 'Tipo de reporte');
      const inxMotLL = data.response.findIndex(x => x.Nombre == 'Motivo de la llamada');
      const inxResult = data.response.findIndex(x => x.Nombre == 'Resultado interacción');

      let catRepTpo = data.response.filter(x => x.idPadre == data.response[inxTpoRep].id);
      let options = '<option hidden value max selected>Seleccione una opción</option>';

      catRepTpo.forEach(i => {
        options += `<option value="${i.id}">${i.Nombre}</option>`;
      });

      document.querySelector('#tporep_select').innerHTML = options;

      let catMotLL = data.response.filter(x => x.idPadre == data.response[inxMotLL].id);
      options = '<option hidden value max selected>Seleccione una opción</option>';
      
      catMotLL.forEach(i => {
        options += `<option value="${i.id}">${i.Nombre}</option>`;
      });

      document.querySelector('#motivo_select').innerHTML = options;

      let catResult = data.response.filter(x => x.idPadre == data.response[inxResult].id);
      options = '<option hidden value max selected>Seleccione una opción</option>';
      
      catResult.forEach(i => {
        options += `<option value="${i.id}">${i.Nombre}</option>`;
      });

      document.querySelector('#resultado_select').innerHTML = options;
    }

    

    
  })
  .catch(e => {
    console.log(e);
  });
});

let titulo = null;
let muestraCampana = () => {
  idCampania = document.getElementById('campaniaModal').value;

  if(idCampania == 2){
    document.querySelector('.campoTip').classList.add('d-none');
    document.querySelector('#tip_select').setAttribute('attr-req',true);
    document.querySelector('#tip_select').removeAttribute('required');
  }

  if(idCampania == ""){
    document.getElementById('campaniaModal').classList.add('is-invalid');        
    document.querySelector('.invalid-feedback').classList.remove('d-none');
    return false;
  }

  titulo = document.getElementById('campaniaModal').options[document.getElementById('campaniaModal').selectedIndex].text;

  if(idCampania == 6){
    document.querySelector('#idCampaniaNP').value = idCampania;
  }else{
    document.querySelector('#idCampania').value = idCampania;
  }

  document.getElementById('tituloServicio').innerHTML = "DPES | "+titulo;
  document.getElementById('formServicio').classList.remove('d-none');

}

document.querySelector('.btnNuevo').addEventListener('click', e => {
  let campanha = document.getElementById('campaniaModal');
  if(campanha.value != ""){
    $("#exampleModal").modal('hide');
    muestraCampana();
  }else{
    campanha.classList.add('is-invalid');        
    document.querySelector('.invalid-feedback').classList.remove('d-none');
  }
});

document.querySelector('#motivo_select').addEventListener('change', e => {
  let idCampania = document.getElementById('campaniaModal').value;

  // if([2,5].includes(idCampania)){
  //   document.querySelector('.campoTip').classList.add('d-none');
  //   // document.querySelector('#tip_select').setAttribute('attr-req',true);
  //   document.querySelector('#tip_select').removeAttribute('required',true);
  // }

  if(idCampania == 4 && parseInt(e.target.value) == 65){
    document.querySelectorAll('.velatoriosCont').forEach( v => {
      v.classList.remove('d-none');
    });

    document.querySelectorAll('.velatoriosCont > [attr-req]').forEach( req => {
      req.setAttribute('required',true);
    });
  }else {
    document.querySelectorAll('.velatoriosCont').forEach( v => {
      v.classList.add('d-none');
    });

    document.querySelectorAll('.velatoriosCont > [attr-req]').forEach( req => {
      req.removeAttribute('required');
    });
  }

  if(idCampania == 3 && parseInt(e.target.value) == 60){
    document.querySelector('.campoTip').classList.add('d-none');
    document.querySelector('#tip_select').setAttribute('attr-req',true);
    document.querySelector('#tip_select').removeAttribute('required');
    

  }else if(idCampania != 2 && idCampania != 5){
    document.querySelector('.campoTip').classList.remove('d-none');
    // document.querySelector('#tip_select').setAttribute('attr-req',true);
    document.querySelector('#tip_select').setAttribute('required',true);
  }

  
  
  let catTip = _catalogos.filter(x => x.idPadre == e.target.value);
  options = '<option hidden value max selected>Seleccione una opción</option>';

  
    
  catTip.forEach(i => {
    options += `<option value="${i.id}">${i.Nombre}</option>`;
  });

  document.querySelector('#tip_select').innerHTML = options;

});

var _fomulario = null;
document.querySelector('.btnBuscar').addEventListener('click',e => {
  e.preventDefault();
  document.querySelector('.btnBuscar').setAttribute('disabled',true);

  let idCampania = document.getElementById('campaniaModal').value;
  if(idCampania == ""){
    document.getElementById('campaniaModal').classList.add('is-invalid');
    document.querySelector('.invalid-feedback').classList.remove('d-none');
    document.querySelector('.btnBuscar').removeAttribute('disabled');
    return false;
  }

  let bfolio = "";
  let bFecha = "";

  if( document.getElementById('bfolio').value != ""){
      bfolio = document.getElementById('bfolio').value;
      document.getElementById('bFecha').removeAttribute("required");
      document.getElementById('bfolio').setAttribute("required",true);
  }else if(document.getElementById('bFecha').value != ""){
      bFecha = document.getElementById('bFecha').value;
      bFecha = bFecha.split('/').reverse().join('-');
      document.getElementById('bfolio').removeAttribute("required");
      document.getElementById('bFecha').setAttribute("required",true);
  }

  let searchForm = new FormData();

  
  searchForm.set('idCampania',idCampania);

  searchForm.set('Folio',bfolio);
  searchForm.set('Fecha',bFecha);


  muestraCampana();  
    // console.log('start');
  fetch("core/app/search.php",{
    method: "POST",
    body: searchForm
  })
  .then(resp=>resp.json())
  .then(data=>{
      // console.log(data);
      
      // return false
      $(".tableFolio").html('');
      if(data.response == null){
        swal("Lo siento","Al parecer no hay datos");
        document.querySelector('.btnBuscar').removeAttribute('disabled');
        return false;
      }

      if(data.response.length > 0){
        _fomulario = data.response;
        let tableFolio = '<table class="table tableFolioCont table-hover table-bordered table-sm"><thead>';
        tableFolio += '<tr><th>Folio</th><th>Fecha de Captura</th><th>Nombre Completo</th><th>No. Telefónico</th><th>Accion</th></tr>';
        tableFolio += '</thead><tbody>';
        data.response.map(e=>{
            tableFolio += '<tr>';
            tableFolio += `<td>${e.Folio != null ? e.Folio : '-'}</td>`;
            tableFolio += '<td>'+e.Fecha+'</td>';
            tableFolio += `<td>${e.Nombre+' '+e.Paterno+' '+e.Materno}</td>`;
            tableFolio += '<td>'+e.ANI+'</td>';
            tableFolio += `<td><button class="btn btn-info btnFolio btn-sm" title="Ver Formulario" data-id="${e.idInteraccion}"><i class="fa fa-arrow-right" aria-hidden="true"></i></button></td>`;
            tableFolio += '</tr>';
        });

        tableFolio += '</tbody></table>';

        // console.log(tableFolio);
        $(".tableFolio").html(tableFolio);
        new DataTable(".tableFolioCont",{
            perPageSelect: [5]
        });

        document.querySelector('.tableFolio').removeAttribute('style');
        document.querySelector('.btnBuscar').removeAttribute('disabled');

      }
      /*else if(data.response[0].Formulario !== undefined){
        if(data.response[0].Formulario == null){
          swal("Lo siento","Al parecer no hay datos");
          document.querySelector('.btnBuscar').removeAttribute('disabled');
          return false;
        }

        formularioGlob = data.response[0].Formulario[0];
        historicoGlob = data.response[0].Historico;
        $('#exampleModal').modal('hide');          

        setTimeout(e=>{
          $("form input, form select,form textarea, form button").attr("disabled",true);
          //_llenado(formulario,Historico);
          document.querySelector(".buttonSubmit").removeAttribute("disabled");
        },100);
      }*/


  });

});


document.querySelector('#exampleModal').addEventListener('submit',e => {
  e.preventDefault();
  let id = document.querySelector('.btnFolio').getAttribute('data-id');
  const formData = _fomulario.filter(i => i.idInteraccion == id);
  setTimeout(e=>{
    $('#exampleModal').modal('hide');
    $("form input, form select,form textarea, form button").attr("disabled",true);
    document.querySelector('.buttonSubmit').setAttribute('disabled',true);
    // //_llenado(formulario,Historico);
    document.querySelector(".btnRegresar").classList.remove('d-none');
    document.querySelector(".btnRegresar").removeAttribute('disabled');
  },100);

  Object.keys(formData[0]).map(k => {
    // console.log(k,formData[0][k]);
    let eleForm = document.querySelector(`[name=${k}]`);
    if(k == 'idTipoReporte'){
      document.getElementById('tporep_select').value = formData[0][k];
    }

    if(k == 'idMotivoLlamada'){
      document.getElementById('motivo_select').value = formData[0][k];
      document.getElementById('motivo_select').dispatchEvent(new Event('change'));
    }

    if(k == 'idTipificacion'){
      document.getElementById('tip_select').value = formData[0][k];
    }
    
    if(k == 'idResultadoInteraccion'){
      document.getElementById('resultado_select').value = formData[0][k];
    }
    
    if(k == 'Fecha'){
      document.getElementById('FecLlamadaVL').value = formData[0][k];
    }

    if(k == 'Hora'){
      document.getElementById('HoraLlamadaVL').value = formData[0][k];
    }

    if(eleForm != undefined){
      eleForm.value = formData[0][k];
    }

    
  })
});

document.querySelector('.btnRegresar').addEventListener('click', e => {
  location.reload();
});

document.getElementById('formOperativoNP').addEventListener('submit', f=> {
  f.preventDefault();

  let elMotLL = document.getElementById('motivo_selectNP');
  let textMotLL = elMotLL.options[elMotLL.selectedIndex].text;

  let formOp = new FormData(f.target);
  
  formOp.set("idMotivoLlamada", elMotLL.value);
  formOp.set("MotivoLlamada", textMotLL);

  fetch("core/app/saveCampanias.php", {
    method: "POST",
    body: formOp
  })
  .then(resp => resp.json())
  .then(data => {
    console.log(data);
    let {Folio,Mensaje,Code} = data.response[0];
    const wrapper = document.createElement('div');

    if(Code == 0){
      swal({
        closeOnClickOutside: false,
        closeOnEsc: false,
        title: 'IMSS DPES',
        message: 'Lo sentimos. Ocurrio un Error',
        icon: "warning",
        buttons: false
      })
    }

    if(Folio != null)
      wrapper.innerHTML = `${Mensaje}<br>Tu folio es: <strong>${Folio}</strong>`;
    else
      wrapper.innerHTML = `${Mensaje}`;

    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      title: 'IMSS DPES',
      content: wrapper,
      icon: "success"
    }).then(() => {
        document.querySelector('.infinite').parentElement.classList.remove('d-none')
        document.querySelector('.i-spin').parentElement.classList.add('d-none')
        $('#spinner').modal('show')
        setTimeout(() => {
          $('#spinner').modal('hide')
        }, 1750);
        // console.log(idInteraccion);


        setTimeout(() => {
            window.onbeforeunload = null;
            var win = window.open("about:blank", "_self");
            win.close();  // CIERRA VENTANA
        }, 2000);
    })
  })
  .catch(e => {
    console.log(e);
  });


})

document.getElementById('formOperativo').addEventListener('submit', f => {
  f.preventDefault();

  let elTpoRep = document.getElementById('tporep_select');
  let textTpoRep = elTpoRep.options[elTpoRep.selectedIndex].text;

  let elMotLL = document.getElementById('motivo_select');
  let textMotLL = elMotLL.options[elMotLL.selectedIndex].text;

  let elTip, textTip;

  let elResultado = document.getElementById('resultado_select');
  let textResultado = elResultado.options[elResultado.selectedIndex].text;
  
  let formOp = new FormData(f.target);
  
  formOp.set("idTipoReporte", elTpoRep.value);
  formOp.set("TipoReporte", textTpoRep);
  formOp.set("idMotivoLlamada", elMotLL.value);
  formOp.set("MotivoLlamada", textMotLL);

  if(![2,5].includes(document.getElementById('idCampania').value)){
    elTip = document.getElementById('tip_select');
    textTip = elTip.options[elTip.selectedIndex].text;
    formOp.set("idTipificacion", elTip.value);
    formOp.set("Tipificacion", textTip);
  }

  formOp.set("idResultadoInteraccion", elResultado.value);
  formOp.set("ResultadoInteraccion", textResultado);

  fetch("core/app/saveCampanias.php", {
    method: "POST",
    body: formOp
  })
  .then(resp => resp.json())
  .then(data => {
    console.log(data);
    let {Folio,Mensaje,Code} = data.response[0];
    const wrapper = document.createElement('div');

    if(Code == 0){
      swal({
        closeOnClickOutside: false,
        closeOnEsc: false,
        title: 'IMSS DPES',
        message: 'Lo sentimos. Ocurrio un Error',
        icon: "warning",
        buttons: false
      })
    }

    if(Folio != null)
      wrapper.innerHTML = `${Mensaje}<br>Tu folio es: <strong>${Folio}</strong>`;
    else
      wrapper.innerHTML = `${Mensaje}`;

    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      title: 'IMSS DPES',
      content: wrapper,
      icon: "success"
    }).then(() => {
        document.querySelector('.infinite').parentElement.classList.remove('d-none')
        document.querySelector('.i-spin').parentElement.classList.add('d-none')
        $('#spinner').modal('show')
        setTimeout(() => {
          $('#spinner').modal('hide')
        }, 1750);
        // console.log(idInteraccion);


        setTimeout(() => {
            window.onbeforeunload = null;
            var win = window.open("about:blank", "_self");
            win.close();  // CIERRA VENTANA
        }, 2000);
    })
  })
  .catch(e => {
    console.log(e);
  });

})

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