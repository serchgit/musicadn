/*
1 -> Vigencia de derechos
2 -> Semanas Cotizadas
3 -> Asignación o localización de NSS
4 -> Cita médica familiar
5 -> No Procedente
*/

const _catTIP = [
	{	//1 -> Vigencia de derechos
		id:1,
		idPadre:1000,
		Nombre: 'Vigencia de derechos APP'
	},{ //1 -> Vigencia de derechos
		id:2,
		idPadre:1000,
		Nombre: 'Vigencia de derechos Web'
	},{ //2 -> Semanas Cotizadas
		id:3,
		idPadre:2000,
		Nombre: 'Constancia de semanas cotizadas APP'
	},{ //2 -> Semanas Cotizadas
		id:4,
		idPadre:2000,
		Nombre: 'Constancia de semanas cotizadas en el IMSS Web'
	},{ //3 -> Asignación o localización de NSS
		id:5,
		idPadre:3000,
		Nombre: 'Asignación o localización de NSS Web'
	},{ //3 -> Asignación o localización de NSS
		id:6,
		idPadre:3000,
		Nombre: 'Asignación o localización de NSS APP'
	},{ //2 -> Cita médica familiar
		id:7,
		idPadre:4000,
		Nombre: 'Cita Médica Familiar APP'
	},{ //2 -> Cita médica familiar
		id:8,
		idPadre:4000,
		Nombre: 'Cita dental APP'
	},{ //2 -> Cita médica familiar
		id:9,
		idPadre:4000,
		Nombre: 'Cita Médica Familiar WEB'
	},
	
	
	{
		id:10,
		idPadre:1,
		Nombre: 'Servidor está tardando más de lo normal, intente más tarde'
	},
	{
		id:11,
		idPadre:1,
		Nombre: 'Ocurrió un error al consultar la cabeza de grupo familiar'
	},
	{
		id:12,
		idPadre:1,
		Nombre: 'Ocurrió un error al generar la vigencia de derechos'
	},
	{
		id:13,
		idPadre:1,
		Nombre:'Excediste los intentos permitidos'
	},
	{
		id:14,
		idPadre:1,
		Nombre:'Token inválido'
	},
	{
		id:15,
		idPadre:1,
		Nombre:'Este token ya ha sido utilizado'
	},
	{
		id:16,
		idPadre:1,
		Nombre:'Error 500 – internal server error'
	},
	{
		id:17,
		idPadre:1,
		Nombre:'CURP no localizada en RENAPO'
	},
	{
		id:18,
		idPadre:1,
		Nombre:'Los datos registrados en el IMSS asociados a la CURP, presentan una inconsistencia, para resolverlos acude a tu subdelegación. Más información al teléfono: 8006232323'
	},
	{
		id:19,
		idPadre:1,
		Nombre:'Esta CURP ya está asociada a otro correo electrónico'
	},
	{
		id:20,
		idPadre:1,
		Nombre:'Ocurrió un error al generar el reporte de vigencia'
	},
	{
		id:21,
		idPadre:1,
		Nombre:'Excediste los intentos permitidos'
	},
	{
		id:22,
		idPadre:1,
		Nombre:'Debido a una falla técnica no se pudo verificar tu CURP ante el registro nacional de población. En este momento no podemos continuar con tu solicitud, por  lo que te pedimos intentar más tarde'
	},
	{
		id:23,
		idPadre:1,
		Nombre:'Página en blanco'
	},
	{
		id:24,
		idPadre:1,
		Nombre:'No se visualiza el captcha'
	},
	{
		id:25,
		idPadre:1,
		Nombre:'No llega el correo electrónico (ya pasaron 2 horas)'
	},
	{
		id:26,
		idPadre:1,
		Nombre:'No llega el correo electrónico, lo acabo de solicitar y no me ha llegado'
	},
	{
		id:27,
		idPadre:1,
		Nombre:'Aparece con vigencia sin embargo, ya no cotiza'
	},
	{
		id:28,
		idPadre:1,
		Nombre:'NSS no localizado'
	},
	{
		id:29,
		idPadre:1,
		Nombre:'Sin vigencia de derechos'
	},
	{
		id:30,
		idPadre:1,
		Nombre:'Sin vigencia de derechos por unificación de NSS'
	},
	{
		id:31,
		idPadre:1,
		Nombre:'Requiere actualizar'
	},
	{
		id:32,
		idPadre:1,
		Nombre:'Orientación en proceso para obtener vigencia de derechos'
	},
	{
		id:33,
		idPadre:1,
		Nombre:'Otros'
	},
	{
		id:34,
		idPadre:2,	
		Nombre:'Servidor esta tardando más de lo normal, intente más tarde'
	},
	{
		id:35,
		idPadre:2,
		Nombre:'Ocurrió un error al consultar la cabeza de grupo familiar'
	},
	{
		id:36,
		idPadre:2,
		Nombre:'Ocurrió un error al generar la vigencia de derechos'
	},
	{
		id:37,
		idPadre:2,
		Nombre:'Excediste los intentos permitidos'
	},
	{
		id:38,
		idPadre:2,
		Nombre:'Token inválido'
	},
	{
		id:39,
		idPadre:2,
		Nombre:'Este token ya ha sido utilizado'
	},
	{
		id:40,
		idPadre:2,
		Nombre:'Error 500 – internal server error'
	},
	{
		id:41,
		idPadre:2,
		Nombre:'CURP no localizada en RENAPO'
	},
	{
		id:42,
		idPadre:2,
		Nombre:'Los datos registrados en el IMSS asociados a la CURP, presentan una inconsistencia, para resolverlos acude a tu subdelegación. Más información al teléfono: 8006232323'
	},
	{
		id:43,
		idPadre:2,
		Nombre:'Esta CURP ya está asociada a otro correo electrónico'
	},
	{
		id:44,
		idPadre:2,
		Nombre:'Ocurrió un error al generar el reporte de vigencia'
	},
	{
		id:45,
		idPadre:2,
		Nombre:'Excediste los intentos permitidos'
	},
	{
		id:46,
		idPadre:2,
		Nombre:'Debido a una falla técnica no se pudo verificar tu CURP ante el registro nacional de población. En este momento no podemos continuar con tu solicitud, por  lo que te pedimos intentar más tarde'
	},
	{
		id:47,
		idPadre:2,
		Nombre:'Página en blanco'
	},
	{
		id:48,
		idPadre:2,
		Nombre:'No se visualiza el captcha'
	},
	{
		id:49,
		idPadre:2,
		Nombre:'No llega el correo electrónico (ya pasaron 2 horas) '
	},
	{
		id:50,
		idPadre:2,
		Nombre:'No llega el correo electrónico, lo acabo de solicitar y no me ha llegado'
	},
	{
		id:51,
		idPadre:2,
		Nombre:'Requiere actualizar'
	},
	{
		id:52,
		idPadre:2,
		Nombre:'Orientación en proceso para obtener vigencia de derechos'
	},
	{
		id:53,
		idPadre:2,
		Nombre:'Requiere actualizar'
	},
	{
		id:54,
		idPadre:2,
		Nombre:'Orientación en proceso para obtener vigencia de derechos'
	},
	{
		id:55,
		idPadre:2,
		Nombre:'Otros'
	},	{
		id:56,
		idPadre:3,
		Nombre: 'Orientación para la obtención de la constancia de semanas cotizadas'
	},
	{
		id:57,
		idPadre:3,
		Nombre: 'Dudas sobre qué es el reporte detallado'
	},
	{
		id:58,
		idPadre:3,
		Nombre: 'Dificultad para  leer las letras del captcha'
	},
	{
		id:59,
		idPadre:3,
		Nombre: 'El (sic) proporcionado no fue localizado en la entidad externa RENAPO'
	},
	{
		id:60,
		idPadre:3,
		Nombre: 'Los datos registrados en el IMSS asociados a la CURP, presentan una inconsistencia, para resolverlos acude a tu subdelegación. Más información al teléfono: 8006232323'
	},
	{
		id:61,
		idPadre:3,
		Nombre: 'Ocurrió un error al invocar el servicio de Vigencia'
	},
	{
		id:62,
		idPadre:3,
		Nombre: 'No llega  correo electrónico '
	},
	{
		id:63,
		idPadre:3,
		Nombre: 'En el buzón del correo del trabajador  Se ha detectado que el correo electrónico que estás ingresando no está confirmado, requerimos que accedas a la siguiente liga para confirmar tu correo electrónico'
	},
	{
		id:64,
		idPadre:3,
		Nombre: 'Servidor esta tardando más de lo normal, intente más tarde'
	},
	{
		id:65,
		idPadre:3,
		Nombre: 'Otros'
	},{
		id:66,
		idPadre:4,
		Nombre:'Orientación para la obtención de la constancia de semanas cotizadas'
	},{
		id:67,
		idPadre:4,
		Nombre:'Problemas con el captcha'
	},{
		id:68,
		idPadre:4,
		Nombre:'No se localizó información en RENAPO con la CURP capturada'
	},{
		id:69,
		idPadre:4,
		Nombre:'No llega el documento al  correo electrónico '
	},{
		id:70,
		idPadre:4,
		Nombre:'Ocurrió un error al invocar el servicio de Vigencia'
	},{
		id:71,
		idPadre:4,
		Nombre:'Debido a una falla técnica no se pudo verificar tu CURP ante el registro nacional de población. En este momento no podemos continuar con tu solicitud, por  lo que te pedimos intentar más tarde'
	},{
		id:72,
		idPadre:4,
		Nombre:'Los datos registrados en el IMSS asociados a la CURP, presentan una inconsistencia, para resolverlos acude a tu subdelegación. Más información al teléfono: 8006232323'
	},{
		id:73,
		idPadre:4,
		Nombre:'NSS no localizado'
	},{
		id:74,
		idPadre:4,
		Nombre:'Portal digital en mantenimiento'
	},{
		id:75,
		idPadre:4,
		Nombre:'Error 500 – internal server error'
	},{
		id:76,
		idPadre:4,
		Nombre:'El token ya fue utilizado'
	},{
		id:77,
		idPadre:4,
		Nombre:'¡Error!Error loading object from URL'
	},{
		id:78,
		idPadre:4,
		Nombre:'Solo aparece una pantalla de código'
	},{
		id:79,
		idPadre:4,
		Nombre:'Otros'
	},{
		id:80,
		idPadre:5,
		Nombre:'Orientación para asignar un NSS'
	},{
		id:81,
		idPadre:5,
		Nombre:'Orientación para localizar un NSS'
	},{
		id:82,
		idPadre:5,
		Nombre:'Portal digital en mantenimiento'
	},{
		id:83,
		idPadre:5,
		Nombre:'No se localizó información en RENAPO con la CURP capturada'
	},{
		id:84,
		idPadre:5,
		Nombre:'Debido a una falla técnica no se pudo verificar tu CURP ante el registro nacional de población. En este momento no podemos continuar con tu solicitud, por  lo que te pedimos intentar más tarde'
	},{
		id:85,
		idPadre:5,
		Nombre:'Los datos registrados en el IMSS asociados a la CURP, presentan una inconsistencia, para resolverlos acude a tu subdelegación. Más información al teléfono: 800 623 23 23'
	},{
		id:86,
		idPadre:5,
		Nombre:'Captcha (varios problemas) '
	},{
		id:87,
		idPadre:5,
		Nombre:'Servidor está tardando más de lo normal, intente más tarde'
	},{
		id:88,
		idPadre:5,
		Nombre:'No llega el documento al  correo electrónico '
	},{
		id:89,
		idPadre:5,
		Nombre:'Error 500 – internal server error'
	},{
		id:90,
		idPadre:5,
		Nombre:'Otros'
	},{
		id:91,
		idPadre:6,
		Nombre:'Orientación para asignar un NSS'
	},{
		id:92,
		idPadre:6,
		Nombre:'Orientación para localizar un NSS'
	},{
		id:93,
		idPadre:6,
		Nombre:'Hizo unificación de NSS, en la app sigue apareciendo el NSS anterior'
	},{
		id:94,
		idPadre:6,
		Nombre:'No se localizó información en RENAPO con la CURP capturada'
	},{
		id:95,
		idPadre:6,
		Nombre:'Debido a una falla técnica no se pudo verificar tu CURP ante el registro nacional de población. En este momento no podemos continuar con tu solicitud, por  lo que te pedimos intentar más tarde'
	},{
		id:96,
		idPadre:6,
		Nombre:'Los datos registrados en el IMSS asociados a la CURP, presentan una inconsistencia, para resolverlos acude a tu subdelegación. Más información al teléfono: 800 623 23 23'
	},{
		id:97,
		idPadre:6,
		Nombre:'Captcha (varios problemas) '
	},{
		id:98,
		idPadre:6,
		Nombre:'Servidor está tardando más de lo normal, intente más tarde'
	},{
		id:99,
		idPadre:6,
		Nombre:'Otros'
	},{

		id:100,
		idPadre:7,
		Nombre:'Orientación para agendar cita médica'
	},{
		id:101,
		idPadre:7,
		Nombre:'Citas medicas no disponibles'
	},{
		id:102,
		idPadre:7,
		Nombre:'Orientación para visualizar las citas agendadas'
	},{
		id:103,
		idPadre:7,
		Nombre:'Orientación para cancelar una cita agendada'
	},{
		id:104,
		idPadre:7,
		Nombre:'Calendario no disponible (pantalla en blanco) '
	},{
		id:105,
		idPadre:7,
		Nombre:'El correo que ingresó ya se encuentra asociado a otro CURP'
	},{
		id:106,
		idPadre:7,
		Nombre:'La CURP no es correcta, por favor verifícala'
	},{
		id:107,
		idPadre:7,
		Nombre:'La CURP proporcionado no fue localizado en la entidad externa RENAPO'
	},{
		id:108,
		idPadre:7,
		Nombre:'Error 1 Sistema no disponible'
	},{
		id:109,
		idPadre:7,
		Nombre:'Los datos registrados en el IMSS asociados a la CURP, presentan una inconsistencia, para resolverlos acude a tu subdelegación. Más información al teléfono: 8006232323'
	},{
		id:110,
		idPadre:7,
		Nombre:'Ha expirado tu petición, intenta nuevamente o verifica la configuración de tu dispositivo'
	},{
		id:111,
		idPadre:7,
		Nombre:'Tu situación de vigencia de derechos no permite realizar la solicitud'
	},{
		id:112,
		idPadre:7,
		Nombre:'Al agendar aparece un número de seguridad social anterior'
	},{
		id:113,
		idPadre:7,
		Nombre:'No tienes clínica asignada, realiza el trámite Alta de Clínica por este medio para continuar '
	},{
		id:114,
		idPadre:7,
		Nombre:'Cita médica familiar agendada por app no respetada'
	},{
		id:115,
		idPadre:7,
		Nombre:'El sistema arroja clínica anterior'
	},{
		id:116,
		idPadre:7,
		Nombre:'Queja sobre el servicio médico'
	},{
		id:117,
		idPadre:7,
		Nombre:'Otros'
	},{
		id:118,
		idPadre:8,
		Nombre:'Módulos no disponibles acude directamente a la clínica'
	},{
		id:119,
		idPadre:8,
		Nombre:'Citas dentales no disponibles'
	},{
		id:120,
		idPadre:8,
		Nombre:'No hay comunicación con la clínica '
	},{
		id:121,
		idPadre:8,
		Nombre:'Cita dental no respetada'
	},{
		id:122,
		idPadre:8,
		Nombre:'Otros'
	},{
		id:123,
		idPadre:9,
		Nombre:'Orientación para agendar cita médica'
	},{
		id:124,
		idPadre:9,
		Nombre:'Citas medicas no disponibles'
	},{
		id:125,
		idPadre:9,
		Nombre:'Orientación para visualizar las citas agendadas'
	},{
		id:126,
		idPadre:9,
		Nombre:'Orientación para cancelar una cita agendada'
	},{
		id:127,
		idPadre:9,
		Nombre:'Calendario no disponible (pantalla en blanco) '
	},{
		id:128,
		idPadre:9,
		Nombre:'El correo que ingresó ya se encuentra asociado a otro CURP'
	},{
		id:129,
		idPadre:9,
		Nombre:'La CURP no es correcta, por favor verifícala'
	},{
		id:130,
		idPadre:9,
		Nombre:'La CURP proporcionado no fue localizado en la entidad externa RENAPO'
	},{
		id:131,
		idPadre:9,
		Nombre:'Servidor esta tardando más de lo normal, intente más tarde'
	},{
		id:132,
		idPadre:9,
		Nombre:'Error 1 Sistema no disponible'
	},{
		id:133,
		idPadre:9,
		Nombre:'Servicio temporalmente  no disponible. Intenta mas tarde'
	},{
		id:134,
		idPadre:9,
		Nombre:'Error 500 – internal server error'
	},{
		id:135,
		idPadre:9,
		Nombre:'Los datos registrados en el IMSS asociados a la CURP, presentan una inconsistencia, para resolverlos acude a tu subdelegación. Más información al teléfono: 8006232323'
	},{
		id:136,
		idPadre:9,
		Nombre:'Portal digital en mantenimiento'
	},{
		id:137,
		idPadre:9,
		Nombre:'Tu situación de vigencia de derechos no permite realizar la solicitud'
	},{
		id:138,
		idPadre:9,
		Nombre:'Al agendar aparece un número de seguridad social anterior'
	},{
		id:139,
		idPadre:9,
		Nombre:'No tienes clínica asignada, realiza el trámite Alta de Clínica por este medio para continuar '
	},{
		id:140,
		idPadre:9,
		Nombre:'Cita médica familiar agendada por web no respetada'
	},{
		id:141,
		idPadre:9,
		Nombre:'El sistema arroja clínica anterior'
	},{
		id:142,
		idPadre:9,
		Nombre:'Queja sobre el servicio médico'
	},{
		id:143,
		idPadre:9,
		Nombre:'Otros'
	}
];


