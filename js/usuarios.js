_getusuarios();

function _getusuarios(){
    let form = new FormData();
    form.set('idUsuario',document.getElementById('User').value);

    fetch("core/app/getUsuarios.php", {
        method: "POST",
        body: form
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data);

  //       let catPerfiles = data.response[0].CatUsuarios[0].Perfiles;

  //       let optionPerf = '<option value="">Selecciona una opción</option>';
		// catPerfiles.forEach(val => {
		// 	optionPerf += `<option value="${val.idPerfil}">${val.Nombre}</option>`; 
		// });
        
  //       document.querySelectorAll('#perfilEdit,#perfilNuevo').forEach( x => x.innerHTML = optionPerf);

        // console.log(data);
        var table = '<table class="table table-hover table-striped"><thead><tr><th>Nombre</th><th>Usuario</th><th>Perfil</th><th>Estatus</th><th>Editar</th><th>Acciones</th></tr></thead><tbody>';

        $.each(data.response[0].CatUsuarios[0].Usuarios,function(indice, valor){
            table += '<tr>';
            table += `<td>${valor.Nombre+" "+valor.Paterno+" "+valor.Materno}</td>`;
            table += '<td>'+valor.Usuario+'</td>';

            // var dPerfil = valor.idPerfil ?? 0;
            // if(dPerfil != 0){
            //     $.each(data.response[0].CatUsuarios[0].Perfiles,function(index, valor){
            //         if (valor.idPerfil==dPerfil) {
            //             table += '<td>'+valor.Nombre+'</td>';
            //         }
            //     });
            // }else{
            // }
            switch(valor.idPerfil){
                case 1:
                table += '<td>Administrador</td>';
                break;
                case 2:
                table += '<td>Operación</td>';
                break;
                case 3:
                table += '<td>Reportes</td>';
                break;
            }
            


            let UsersStatus= data.response[0].CatUsuarios[0].StatusUsuario.find(x => x.idStatus == valor.Status)
       
            table += `<td>${valor.Status == 0 ? "Disponible": UsersStatus.Nombre}</td>`;
            

            

            table += `<td class="text-center">
                        <button data-id="${valor.idUsuario}"  data-Nombre="${valor.Nombre}" data-Paterno="${valor.Paterno}" data-Materno="${valor.Materno}" data-Email="${valor.Email}" data-Usuario="${valor.Usuario}" data-idPerfil="${valor.idPerfil}" data-Status="${valor.Status}" class="btn btn-primary btn-sm btnEditar" data-toggle="modal" data-target="#modal-editar" onclick="editar(this)"><span class="fa fa-edit"></span></button>
                      </td> 
                      <td class="text-center">
                        <div class="d-flex justify-content-between">
                            
                           
                                <a href="#" data-acciones="2" class="btn btn-sm btn-warning btnAccion ${[2,4,5].includes(valor.Status) ? "": "d-none"}" data-id="${valor.idUsuario}" onclick="accion(this)" title="ACTIVAR"> <i class="fa fa-unlock"></i></a>
                                <a href="#" data-acciones="3" class="btn btn-sm btn-warning btnAccion ${![2,4,5].includes(valor.Status) ? "": "d-none"}" data-id="${valor.idUsuario}" onclick="accion(this)" title="BLOQUEAR"> <i class="fa fa-lock"></i></a>
                                <a href="#" data-acciones="1" class="btn btn-sm btn-warning btnAccion ${![2,4,5].includes(valor.Status) ? "": "d-none"}" data-id="${valor.idUsuario}" onclick="accion(this)" title="BAJA"> <i class="fa fa-ban"></i></a>
                                <a href="#" data-acciones="4" class="btn btn-sm btn-warning btnAccion ${valor.Status != 3 ? "": "d-none"}" data-id="${valor.idUsuario}" onclick="accion(this)" title="CAMBIO PASSWORD"> <i class="fa fa-undo"></i></a>
                                <a href="#" data-acciones="5" class="btn btn-sm btn-warning btnAccion ${valor.Status != 0 ? "": "d-none"}" data-id="${valor.idUsuario}" onclick="accion(this)" title="CERRAR SESIÓN"> <i class="fa fa-sign-out-alt"></i></a>
                           
                        </div>
                      </td>
            </tr>`;
        });
        table += '</tbody></table>';
        $(".Tabla").html(table);
        $('.table').DataTable({
            "language": {
                "url": "js/Spanish.json"
            }
        });


    })
    .catch(e => {
        console.log(e);
    });

}

    document.getElementById('FormEdit').addEventListener('submit', e => {
        e.preventDefault();
        let formData = new FormData(e.target);

        fetch("core/app/gestUsr.php", {
        //fetch("core/app/show.php", {
            method: "POST",
            body: formData
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.response[0].Code==1) {
                toastr.success(data.response[0].Msj,"Usuarios");
                _getusuarios();
                $('#modal-editar').modal('hide');
            }else{
                toastr.warning(data.response[0].Msj,"Usuarios");
            }
        })
        .catch(e => {
            console.log(e);
        });
    })

    document.getElementById('FormNuevo').addEventListener('submit', e => {
        e.preventDefault();
        let formData = new FormData(e.target);

        fetch("core/app/gestUsr.php", {
        // fetch("core/app/showPara.php", {
            method: "POST",
            body: formData
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.response[0].Code==1) {
                toastr.success(data.response[0].Msj,"Usuarios");
                _getusuarios();
                $('#modal-nuevo').modal('hide');
                e.target.reset();
            }else{
                toastr.warning(data.response[0].Msj,"Usuarios");
            }
        })
        .catch(e => {
            console.log(e);
        });
    })

  $("#CerrarSesion").click(function(){
    var idUsuario = $("#idUsuarioS").val();
    $.post('core/closes.php',{idUsuario:idUsuario},function(data){
      if (data.response[0].Code=1) {
        toastr.success('Usuarios', data.response[0].Msj);
        $(".Cerrar").click();
        _getusuarios();
      }else{
        toastr.warning('Usuarios', data.response[0].Msj);
      }
    },'json');
  });

let editar = e => {
    let v_status = parseInt(e.getAttribute("data-Status"));

    let v_id = e.getAttribute('data-id');
    let v_Nombre = e.getAttribute('data-Nombre');
    let v_Paterno = e.getAttribute('data-Paterno');
    let v_Materno = e.getAttribute('data-Materno');
    let v_Email = e.getAttribute('data-email');
    let v_Usuario = e.getAttribute('data-Usuario');
    let v_idPerfil = e.getAttribute('data-idPerfil');
    console.log(v_Email)
    // document.querySelectorAll('.formEdit').forEach(f => {
    //     if (v_status === 5 || v_status === 4) {
    //         f.setAttribute('disabled',true);
    //     }else{
    //         f.removeAttribute('disabled',true);
    //     }    
    // });

    document.getElementById('idUser').value = v_id;
    //document.getElementById('idUsuarioS').value = v_id;
    document.getElementById('Nombre').value = v_Nombre;
    document.getElementById('Paterno').value = v_Paterno;
    document.getElementById('Materno').value = v_Materno;
    document.getElementById('inputEditUsuario').value = v_Usuario;
    document.getElementById('Email').value = v_Email;
    document.getElementById('perfilEdit').value = v_idPerfil;
    //document.getElementById('StatusEdit').value = v_status;

}

let accion = e => {
    console.log("BOTTON");
    let idUsuario = e.getAttribute('data-id');
    let Accion = e.getAttribute('data-acciones');

    let formData = new FormData();
    formData.append('idUsuario', idUsuario);

    if (Accion == 5) {
        fetch('logout.php',{
            method:'POST',
            body:formData
        }).then(res => res.json())
        .then(data =>{
            if (data.response[0].Code==1) {
                toastr.success(data.response[0].Msj,"Usuarios");
                _getusuarios();
            }else{
                toastr.warning(data.response[0].Msj,"Usuarios");
            }
        });
    } else if(Accion == 3 || Accion == 1) {
        swal({
            title: "¿Desea dar de BAJA o BLOQUEAR al usuario seleccionado?",
            icon: "info",
            buttons: {
                cancel: {
                    text      : "Regresar",
                    value     : null,
                    visible   : true,
                    className : "",
                    closeModal: true,
                },
                confirm: {
                    text      : "Continuar",
                    value     : true,
                    visible   : true,
                    className : "",
                    closeModal: true
                }
            },
            dangerMode: true,
        })
        .then(function(willDelete){
            if (willDelete) {
                formData.append('Accion', Accion);
        
                fetch('core/app/gestUsr.php',{
                    method:'POST',
                    body:formData
                }).then(res => res.json())
                .then(data =>{
                    if (data.response[0].Code==1) {
                        toastr.success(data.response[0].Msj,"Usuarios");
                        _getusuarios();
                        formNewUser.reset();
                    }else{
                        toastr.warning(data.response[0].Msj,"Usuarios");
                    }
                });
            }
        });
    } else {
        formData.append('Accion', Accion);
        
        fetch('core/app/gestUsr.php',{
            method:'POST',
            body:formData
        }).then(res => res.json())
        .then(data =>{
            if (data.response[0].Code==1) {
                toastr.success(data.response[0].Msj,"Usuarios");
                _getusuarios();
            }else{
                toastr.warning(data.response[0].Msj,"Usuarios");
            }
        });
    }
}

let showDrop = () => {
    //if (!document.querySelector(".dropdown-menu").classList.contains('show')) {
    //    document.querySelector(".dropdown-menu").classList.add("show");
    //}
    
}