const PADSERVICE = {
	getVariable: (callBack) => {
		CALLPAD(
			"getVariable", 
			[{ key: "Nombre", value: "LoginID"}],
			res => {callBack(res);}
		);
	},

	getANI: (idInteraccion, callBack) => {
		CALLPAD(
			"getVariable", 
			[{key:"idInteraccion", value: idInteraccion}, { key: "Nombre", value: "ANI"}],
			res => {callBack(res);}
		);
	},

	getEstadosInteracciones: (callback) => {
		CALLPAD("getEstadosInteracciones", null, callback);
	},

	getEstadoAgente: (callback) => {
		CALLPAD("getEstadoAgente", null, callback);
	},

	// call: (idInteraccion, IdNumero, callback) => {
	// 	CALLPAD(
	// 		"llamar",
	// 		[{key: "IdNumero", value: IdNumero},{key:"idInteraccion", value: idInteraccion}],
	// 		// [{key: "numero", value: index}],
	// 		callback
	// 	);
	// },

	call: (index, callback) => {
        CALLPAD(
			"llamar", 
			[{ key: "numero", value: index }],
			callback
		);
	},
	
	cortar: (idInteraccion, callback) => {
		CALLPAD(
			"cortar",
			[{key: "idInteraccion", value: idInteraccion}],
			callback
		);
	},

	cerrar: (idInteraccion, callback) => {
		CALLPAD(
			"cerrar",
			[{key: "idInteraccion",value: idInteraccion}],
			callback
		);
	},

	hold: (idInteraccion, callback) => {
		CALLPAD(
			"hold",
			[{key: "idInteraccion", value: idInteraccion}],
			callback
		);
	},

	retrieve: (idInteraccion, callback) => {
		CALLPAD(
			"retrieve",
			[{key: "idInteraccion", value: idInteraccion}],
			callback
		);
	},
	logout: (callback) => {
		CALLPAD("logout", null, callback);
	},

	login: (LoginId, Password, callback) => {
		CALLPAD(
			"login",
			[{
				key: "LoginId",
				value: LoginId
			},{
				key: "Password",
				value: Password
			}], 
			callback
		);
	},

	transferirANumero: (numero, idInteraccion, callback) => {
		CALLPAD(
			"transferirANumero",
			[{
				key: "numero",
				value: numero
			}, {
				key: "idInteraccion",
				value: idInteraccion
			}],
			callback
		);
	},

	setEstadoAgente: (idStatus, callback) => {
		CALLPAD(
			"setEstadoAgente",
			[{key: "IdEstadoAgente", value: idStatus}],
			callback
		);
	},

	abrirTarea: (IdCampania, IdLote, IdTarea, callback) => {
		CALLPAD(
			'abrirTarea',
			[{
				key:"IdCampania",
				value: IdCampania
			}, {
				key: "IdLote",
				value: IdLote
			}, {
				key: "IdTarea",
				value: IdTarea
			}],
			callback
		)
	},

	programarNumeroTarea: (IdInteraccion, idNumero, /*fechaTicksFromEpoch,*/ callback) => {
		CALLPAD(
			'programarNumeroTarea',
			[{
				key: "IdInteraccion",
				value: IdInteraccion
			}, {
				key: "idNumero",
				value: idNumero
			}, {
				key: "fechaTicksFromEpoch",
				value: getDateTicks()
			}],
			callback
		)
	},

	agregarNumeroTarea: (idInteraccion, Numero, callback) => {
		CALLPAD(
			'agregarNumeroTarea',
			[{
				key: "IdInteraccion",
				value: idInteraccion
			}, {
				key: "Numero",
				value: Numero
			}, {
				key: "idTipo",
				value: 0
			}],
			callback
		)
	},

	setGestion: (idInteraccion, idResultadoGestionInterno, tiempo, callback) => {
		CALLPAD(
			'setGestion',
			[{
				key: "idInteraccion",
				value: idInteraccion
			}, {
				key: "idResultadoGestionInterno",
				value: idResultadoGestionInterno
			}, {
				key: "tiempo",
				value: tiempo
			}],
			callback
		)
	},

	agendarTarea: (idInteraccion, callback) => {
		CALLPAD(
			'agendarTarea',
			[{
				key: "idInteraccion",
				value: idInteraccion
			}],
			callback
		)
	},

	// getIdInteraccion: function () { return parseLocation(window.location.search)["idinteraccion"]; }
};


const CALLPAD = (method, parameters, callBack) => {
	//const RESPONSE = JSON.parse('{"code":"false", "response":"Error"}');	
	const MPADURL = "http://127.0.0.1:8546/api/";

	let params = '';
	
	if (parameters !== null) {
		parameters.forEach((v) => {	
			params += encodeURIComponent(v.key) + "=" + encodeURIComponent(v.value) + "&";
		});
	}

	let url = MPADURL + method + '?' + params + "format=json&";

	fetch(url, { method: "GET" })
		.then(resp => resp.json())
		.then(data => {
			callBack(data);
		})
		.catch(() => {
			callBack(JSON.parse('{"code":false, "response":"Error loading page"}'));
		});
}
	
	//   getvals().then(response => console.log(response));
// let _config = null;
// function getConfig(response) {
// 	_config = response;
// };	
	

	

// console.log(window.location.hostname);


/**********************************************************************************************************************************************************************/
let StatusIPPad;
let idEstado = '';

let btnUserPP = document.getElementById('btnUserPP');

const STATUSLOGIN = () => {
	let flagIn  = localStorage.getItem('flagIn') == '1' ? true : false;
	let flagOut = localStorage.getItem('flagOut') == '1' ? true : false;
	PADSERVICE.getVariable(res1 => {
		if (res1.code !== false && res1.code == 0) {// Logeado
			
			if(flagIn) {
				PADSERVICE.getEstadoAgente(res3 => {
					//console.log(res3.value.idEstadoActual);
					if (res3.value.idEstadoActual != document.getElementById('btnAction').getAttribute('attr-id') && res3.value.idEstadoActual != 5 && res3.value.idEstadoActual != 6) {
						var estadoIPPAD = document.querySelectorAll('.estadoIPPAD');
						for (let index = 0; index < estadoIPPAD.length; index++) {
							if (estadoIPPAD[index].getAttribute('attr-id') == res3.value.idEstadoActual) {
								CHANGESTATUS(estadoIPPAD[index].getAttribute('attr-id'), estadoIPPAD[index].innerHTML, estadoIPPAD[index].getAttribute('attr-text'));
							}
						}
					} else if (res3.value.idEstadoActual == 5 && document.getElementById('btnAction').getAttribute('attr-id') != 5) {
						CHANGESTATUS('5', '<i class="fa fa-circle text-danger">', 'Conectado');
						document.querySelector('.user-controls').classList.remove('hideControls');
					} else if (res3.value.idEstadoActual == 6 && document.getElementById('btnAction').getAttribute('attr-id') != 6) {
						CHANGESTATUS('6', '<i class="fa fa-circle text-pause">', 'Retenido');
						document.querySelector('.user-controls').classList.remove('hideControls');
						btnUserPP.setAttribute('attr-id', 1);
						btnUserPP.classList.remove('btn-warning');
						btnUserPP.classList.remove('fa-pause');
						btnUserPP.classList.add('btn-info');
						btnUserPP.classList.add('fa-play');
					}
				});
			}

			if (!flagIn) {
				localStorage.setItem('flagIPPad', 1);
				let nombreAgente = '';
				let LoginId = '';
				PADSERVICE.getEstadoAgente(res3 => {
					nombreAgente = res3.value.nombreAgente;
					LoginId      = res3.value.loginId;
				});
				setTimeout(() => {
					localStorage.setItem('nombreAgente', LoginId);
					localStorage.setItem('LoginId', LoginId);
					let formData = new FormData();
					formData.append('usuario', LoginId);
					formData.append('LoginId', LoginId);
					
					fetch("core/app/login.php", {
						method: "POST",
						body: formData
					})
					.then(resp => resp.json())
					.then(data => {
						
						// console.log(flag);
						

						setTimeout(() =>{							
							localStorage.removeItem('flagIPPad');
							localStorage.setItem('flagIn', 1);
							localStorage.removeItem('flagOut');
							location.reload();
						},1500);
					})
					.catch(error => console.log('error', error));
				}, 1000);
			}
		} else {// No Logeado o Close IPPAD
			// console.log(localStorage.getItem('flagOut'), " => ", !flagOut);
			/*if (!flagOut) {
				fetch("core/app/logout.php", {
					method: "POST",
				})
				.then(resp => resp.json())
				.then(data => {
					localStorage.clear();
					localStorage.setItem('flagOut', 1);
					// alert();
					location.reload();
					// console.log(flag);
				})
				.catch(error => console.log('error', error));
			}*/
			
		}
	});
}

let btnUserEnd = document.getElementById('btnUserEnd');
if (btnUserEnd != null) {
	btnUserEnd.addEventListener('click', event => {
		terminaLlamada();
	});
}

let terminaLlamada = () => {
	if (localStorage.getItem("flagTipificacion") == null) {
		clearInterval(timeCall);
		document.getElementById('tiempoLlamada').innerHTML = '';
		localStorage.removeItem("horaInicoLlamada");
		PADSERVICE.getEstadoAgente(re => {
			if(re.code == 0) {
				if (re.value.idEstadoActual == 7) { //ACW
					// console.log("ACW");
					PADSERVICE.cerrar(document.getElementById('idInteraccion').value, res => {
						if(res.code == 0) {

							/***************************************/
							validaDatosOverlay('hide');
							$('#modalTipificacion').modal('hide');
							$("#formTipi :submit").attr("disabled", false);
							whoTab(1);
							/***************************************/

							document.querySelector('.user-controls').classList.add('hideControls');
							btnUserPP.classList.remove('btn-info');
							btnUserPP.classList.remove('fa-play');
							btnUserPP.classList.add('btn-warning');
							btnUserPP.classList.add('fa-pause');
						}
					});
				} else {// OTHER
					// console.log(re.value.idEstadoActual);
					PADSERVICE.cortar(document.getElementById('idInteraccion').value, resp => {
						if(resp.code == 0) {
							setTimeout(() => {
								PADSERVICE.cerrar(document.getElementById('idInteraccion').value, res => {
									if(res.code == 0) {

										/***************************************/
										validaDatosOverlay('hide');
										$('#modalTipificacion').modal('hide');
										$("#formTipi :submit").attr("disabled", false);
										whoTab(1);
										/***************************************/
										
										document.querySelector('.user-controls').classList.add('hideControls');
										btnUserPP.classList.remove('btn-info');
										btnUserPP.classList.remove('fa-play');
										btnUserPP.classList.add('btn-warning');
										btnUserPP.classList.add('fa-pause');	
									}
								});
							}, 500);
						}
					});
				}
			}
		});
	} else {
		toastr.warning('Es obligatorio tipificar la llamada', "Aviso");
	}
}

if (btnUserPP != null) {	
	btnUserPP.addEventListener('click', event => {
		if(btnUserPP.getAttribute('attr-id') == 0) {
			btnUserPP.setAttribute('attr-id', 1);
			PADSERVICE.hold(document.getElementById('idInteraccion').value, res => {});
			btnUserPP.classList.remove('btn-warning');
			btnUserPP.classList.remove('fa-pause');
			btnUserPP.classList.add('btn-info');
			btnUserPP.classList.add('fa-play');
		} else {
			btnUserPP.setAttribute('attr-id', 0);
			PADSERVICE.retrieve(document.getElementById('idInteraccion').value, res => {});
			btnUserPP.classList.remove('btn-info');
			btnUserPP.classList.remove('fa-play');
			btnUserPP.classList.add('btn-warning');
			btnUserPP.classList.add('fa-pause');
		}
	});
}

