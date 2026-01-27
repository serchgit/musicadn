let catBandejas = [{
    "id": 1,
    "Nombre": "General",
    "Activo": 1
  },
  {
    "id": 2,
    "Nombre": "AAQDI",
    "Activo": 1
  },
  {
    "id": 3,
    "Nombre": "Nivel Central",
    "Activo": 1
  },
  {
    "id": 4,
    "Nombre": "CAOD N1",
    "Activo": 1
  },
  {
    "id": 5,
    "Nombre": "CAOD N2",
    "Activo": 1
  },
  {
    "id": 6,
    "Nombre": "CAOD N3",
    "Activo": 1
  },
  {
    "id": 8,
    "Nombre": "CAOD N4",
    "Activo": 1
  },
  {
    "id": 7,
    "Nombre": "Gestion",
    "Activo": 1
  }
];


let dataUsu = [];
let showPermisos = () => {
  $.post('core/app/getPermisos.php',{},function(data){
    // console.log(data); return false;
    if (data.response!=null) {
      dataUsu = data.response;
      // $(".spinner").css("width","0%");
      $(".lds-roller").css("display","none");
      var Table = '<table class="table table-hover table-sm table-bordered"><thead><tr>';
      Table += '<th>Nombre</th>';
      Table += '<th>Usuario</th>';
      Table += '<th>LoginId</th>';
      Table += '<th>Reportes</th>';
      Table += '<th>Permisos</th>';
      Table += '<th>Dashboard</th>';
      Table += '<th>Bandejas</th>';
      Table += '<th>Editar</th>';
      Table += '</tr><tbody>';
      data.response.forEach(val => {
        if(val.idAgente == document.getElementById('agenteSesion').value) return;
        Table += `<tr>
                      <td>${val.Nombre}</td>
                      <td>${val.Usuario}</td>
                      <td>${val.LoginId}</td>
                      <td>${val.Reportes == '1' ? 'SI' : 'NO'}</td>
                      <td>${val.Permisos == '1' ? 'SI' : 'NO'}</td>
                      <td>${val.Dashboard == '1' ? 'SI' : 'NO'}</td>`;
        
        let badge = '';
        let arrB = val.Bandejas.split(',');
        for (let i = 0; i < arrB.length; i++) {
            catBandejas.forEach(bval => {
                if(bval.id == arrB[i]){ 
                  badge += `<span class="badge badge-success">${bval.Nombre}</span>&nbsp;`
                }
            })
            
        }
        // console.log(badge);
        Table += `<td>${badge}</td>`;
        
        Table += `<td class="text-center"><button class="btn btn-sm btn-info btnEditar" data-toggle="modal" data-target="#modalEditar" onclick="getPermisos(${val.idAgente})"><i class="fa fa-edit"></i></button></td></tr>`;
      });
      Table += '</tbody></table>';
      $(".Tabla").html(Table);
      $('.table').DataTable();
    }else{
      //  $(".spinner").css("width","0%");
      // $(".lds-roller").css("display","none");
      toastr.info("No hay datos","Permisos");
    }
  },'json');
}
showPermisos();

let getPermisos = (agente) => {
  let objUsu = dataUsu.find(e => e.idAgente == agente);
  // console.log(objUsu);

  Object.values(document.querySelectorAll('.chkBand')).map(chk => {
      // chk.removeAttribute('checked');
      chk.checked = false;//GPJ 06/07/2022
  });

  document.getElementById('agente').value = objUsu.idAgente;

  if(objUsu.Reportes === '1'){
    document.querySelector('#chkReportes').value = "1";
    // document.querySelector('#chkReportes').setAttribute('checked',true);
    document.querySelector('#chkReportes').checked = true;
    document.querySelector('.lblRep').innerHTML = "SI";
  }else{
    document.querySelector('#chkReportes').value = "0";
    // document.querySelector('#chkReportes').removeAttribute('checked');
    document.querySelector('#chkReportes').checked = false;
    document.querySelector('.lblRep').innerHTML = "NO";
  }

  if(objUsu.Permisos == '1'){
    document.querySelector('#chkPermisos').value = "1";
    // document.querySelector('#chkPermisos').setAttribute('checked',true);
    document.querySelector('#chkPermisos').checked = true;
    document.querySelector('.lblPer').innerHTML = "SI";
  }else{
    document.querySelector('#chkPermisos').value = "0";
    // document.querySelector('#chkPermisos').removeAttribute('checked');
    document.querySelector('#chkPermisos').checked = false;
    document.querySelector('.lblPer').innerHTML = "NO";
  }

  if(objUsu.Dashboard == '1'){
    document.querySelector('#chkDashboard').value = "1";
    document.querySelector('#chkDashboard').checked = true;
    document.querySelector('.lblDash').innerHTML = "SI";
  }else{
    document.querySelector('#chkDashboard').value = "0";
    document.querySelector('#chkDashboard').checked = false;
    document.querySelector('.lblDash').innerHTML = "NO";
  }
  // console.log(objUsu.Bandejas.split(','));return false;
  let arrBandeja = objUsu.Bandejas.split(',');
  console.log(arrBandeja);
  for (let i = 0; i < arrBandeja.length; i++) {
    const element = arrBandeja[i];
    if(element != 0){
      // document.querySelector(`#chk${element}`).setAttribute('checked',true);
      document.querySelector(`#chk${element}`).checked = true;//GPJ 06/07/2022
    }
  }
}


let cambiaLbl = (el) => {
  if(el.value == '1') el.nextElementSibling.innerHTML = 'SI'
  else el.nextElementSibling.innerHTML = 'NO';
}

document.getElementById('chkReportes').addEventListener('change',e=>{
  if(e.target.checked){
    e.target.value = '1'
    cambiaLbl(e.target);
  }else{
    e.target.value = '0'
    cambiaLbl(e.target);
  }
})
document.getElementById('chkPermisos').addEventListener('change',e=>{
  if(e.target.checked){
    e.target.value = '1'
    cambiaLbl(e.target);
  }else{
    e.target.value = '0'
    cambiaLbl(e.target);
  }
})
document.getElementById('chkDashboard').addEventListener('change',e=>{
  if(e.target.checked){
    e.target.value = '1'
    cambiaLbl(e.target);
  }else{
    e.target.value = '0'
    cambiaLbl(e.target);
  }
})

document.getElementById('formFinal').addEventListener('submit', ev => {
  ev.preventDefault();
  
  let arrBand = [];
  Object.values(document.querySelectorAll('.chkBand')).map(chk => {
    if(chk.checked){
      arrBand.push(chk.value);
    }
  });

  let frm = new FormData(ev.target);

  frm.set('Bandejas',arrBand.join(','));

  // console.log(arrBand.join(','));return false;

  fetch("core/app/saveAgentePermisos.php", {
    method: "POST",
    body: frm
  })
  .then(resp => resp.json())
  .then(data => {
    $('#modalEditar').modal('hide');
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      title: 'OIC',
      text: 'Operación Exitosa!',
      icon: "success"
    });
    showPermisos();
  })
})