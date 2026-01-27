_getPerfiles();


function _getPerfiles() {
	fetch('core/app/getPerfiles.php',{
		method:'GET'
	}).then(res => res.json())
	.then(data => {
		sessionStorage.setItem("Perfiles",JSON.stringify(data.response[0].Perfiles));
		sessionStorage.setItem("PermisosPorPerfil",JSON.stringify(data.response[0].PermisosPorPerfil));
		sessionStorage.setItem("Permisos",JSON.stringify(data.response[0].Permisos));

		let perfil = '';
		data.response[0].Perfiles.forEach(valor => {
			perfil += `<a href="javascript:;" class="list-group-item list-group-item-action" data-id="${valor.idPerfil}" id="list-l${valor.idPerfil}" data-toggle="list">${valor.Perfil}</a>`;
		//  optModuls += `<a class="list-group-item list-group-item-action" data-id="list-sl${valor.idPermiso}"><i class="fa fa-check" style="color:lightgreen"></i>&nbsp;&nbsp;${valor.Permiso}</a>`;
		});
		document.getElementById("organizacionContent").innerHTML = perfil;
	});
}

document.getElementById("organizacionContent").addEventListener("click",function(event){
	if(event.target.classList.contains("list-group-item")){
		event.preventDefault();
		let dataID = event.target.getAttribute('data-id');
		let dataName = event.target.innerText;
		let optModuls = '';
		let dataModulosArray = [];
		
		document.getElementById("idPerfil").value = dataID;

		// $(".organizacionContent .collection-item").removeClass('active');

		const PermisosPorPerfil = JSON.parse(sessionStorage.getItem("PermisosPorPerfil"));
		PermisosPorPerfil.forEach((valor)=>{
			if (valor.idPerfil === parseInt(dataID)) {
				optModuls += `<a class="list-group-item list-group-item-action"><i class="fa fa-check" style="color: #02a5de;"></i>&nbsp;&nbsp;${valor.Permiso}</a>`;
				dataModulosArray.push(valor.idPermiso);
			}
		});

		document.getElementById("permisosList").innerHTML = optModuls;
		document.getElementById("modulosList").innerHTML = '';

		// let nivel1Len = document.querySelectorAll(".list-group-item-nivel1");
        // for (let i = 0; i < nivel1Len.length; i++) {
        //     nivel1Len[i].classList.remove("active");
        // }
        // event.target.classList.add("active");
		
	
		sessionStorage.setItem("dataModulos",JSON.stringify(dataModulosArray));
		if (optModuls.length === 0) {
			document.getElementById('saveModulos').classList.add('d-none');
			toastr.info(`¡No hay Permisos asignados al Perfil: ${dataName}!`,"Perfiles");
		}
		document.getElementById("editarModulos").classList.remove("d-none");


	}
});


document.getElementById("editarModulos").addEventListener("click",function(event){
	document.getElementById("saveModulos").classList.remove("d-none");

	const DataModulos = JSON.parse(sessionStorage.getItem("dataModulos"));
	const Permisos = JSON.parse(sessionStorage.getItem("Permisos"));
	
	let optionsModulos = '';
  	Permisos.forEach((valor)=>{
		let found = DataModulos.find(function(element) {
		return element === valor.idPermiso;
    });

	if (valor.idPermiso === found) {
		optionsModulos += `
				<label class="custom-control custom-checkbox list-group-item list-group-item-action" data-id="list-ul${valor.idPermiso}">
					<input type="checkbox" id="chk-${valor.idPermiso}" class="chk-st" name="idPermisos[]" value="${valor.idPermiso}" checked="checked"/>
					<label class="form-check-label ml-1" for="chk-${valor.idPermiso}">${valor.Permiso}</label>
				</label>
			
			`;
    } else {
		optionsModulos += `
			<label class="custom-control custom-checkbox list-group-item list-group-item-action" data-id="list-ul${valor.idPermiso}">
				<input type="checkbox" id="chk-${valor.idPermiso}" class="chk-st" name="idPermisos[]" value="${valor.idPermiso}"/>
				<label class="form-check-label ml-1" for="chk-${valor.idPermiso}">${valor.Permiso}</label>
			</label>
			`;
    }
  });
  document.getElementById("modulosList").innerHTML = optionsModulos;	
});



document.getElementById('buttonPlus').addEventListener('click', function() {	
	setTimeout(function(){
		document.getElementById('pNombre').focus();
	}, 250);
});


let formNuevoPerfil = document.getElementById('formNuevoPerfil');
formNuevoPerfil.addEventListener('submit', event => {
	event.preventDefault();
	let formData = new FormData(formNuevoPerfil);

	fetch('core/app/nvoPerfil.php',{
		method:'POST',
		body:formData
	}).then(res => res.json())
	.then(data => {
		if (data.response[0].Code==1) {
			toastr.success(`¡Perfil agregado!`,"Perfiles");
			document.getElementById("permisosList").innerHTML = '';
			document.getElementById("modulosList").innerHTML = '';
			document.getElementById("editarModulos").classList.add("d-none");
			document.getElementById("saveModulos").classList.add("d-none");
			eventFire(document.getElementById('buttonPlus'), 'click');
			formNuevoPerfil.reset();
			_getPerfiles();
		} else {
			toastr.warning(`¡Ocurrió un error!`,"Perfiles");
		}
	});

});


document.getElementById('saveModulos').addEventListener('click', function() {	
	// document.getElementById('formModulos').submit();
	let formData = new FormData(formModulos);
	fetch('core/app/gestPermisosPerfil.php',{
		method:'POST',
		body:formData
	}).then(res => res.json())
	.then(data => {
		if (data.response[0].Permiso==1) {
			toastr.success(`¡Cambios realizados!`,"Perfiles");

			document.getElementById("permisosList").innerHTML = '';
			document.getElementById("modulosList").innerHTML = '';
			document.getElementById("editarModulos").classList.add("d-none");
			document.getElementById("saveModulos").classList.add("d-none");
			_getPerfiles();
		  }else{
			toastr.warning(`¡Ocurrió un error!`,"Perfiles");
		  }
	});
});

// let formModulos = document.getElementById('formModulos');
// formModulos.addEventListener('submit', event => {
// 	event.preventDefault();
	
// 	let formData = new FormData(formModulos);
// 	fetch('./api/ePermisos',{
// 		method:'POST',
// 		body:formData
// 	}).then(res => res.json())
// 	.then(data => {
// 		if (data.response[0].Permiso==1) {
// 			toastr.warning(`¡Cambios realizados!`,"Perfiles");

// 			document.getElementById("permisosList").innerHTML = '';
// 			document.getElementById("modulosList").innerHTML = '';
// 			document.getElementById("editarModulos").classList.remove("d-none");
// 			document.getElementById("saveModulos").classList.remove("d-none");
// 			_getPerfiles();
// 		  }else{
// 			toastr.warning(`¡Ocurrió un error!`,"Perfiles");
// 		  }
// 	});
// });


function eventFire(el, etype){
	if (el.fireEvent) {
		el.fireEvent('on' + etype);
	} else {
		var evObj = document.createEvent('Events');
		evObj.initEvent(etype, true, false);
		el.dispatchEvent(evObj);
	}
}



