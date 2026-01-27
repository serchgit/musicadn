$('#FechaInicio').datepicker({
    language: 'es',
    format: "yyyy-mm-dd",
    weekStart: 7,
	setDate: 'today',
	clearBtn:true,
	toggleActive:true,
	// todayBtn:true,
	todayHighlight:true,
	showButtonPanel: true,
    //         changeYear: true,
    // startDate:  moment().subtract(15, 'days').format('DD-MM-YYYY'),
    // endDate:    moment().format('YYYY-MM-DD')
  }).on('changeDate', function(e) {
      moment.updateLocale('es-MX',null);
      // console.log(e.delegateTarget.value);

      /* si mi fecha es mayor a endDate manda solo endDate */
      var fecha = e.delegateTarget.value;
      console.log(fecha);
      var date = moment(fecha, 'YYYY-MM-DD');
      var now = moment();
      var diff = now.diff(date, 'days');
      console.log(moment(fecha).add(diff < 7 ? diff : 7,'days').format('YYYY-MM-DD'));

      $('#FechaFinal').datepicker('destroy');
      $('#FechaFinal').val('');
      $('#FechaFinal').datepicker({
		  todayHighlight:true,
          language: 'es',
          format: "yyyy-mm-dd",
          weekStart: 7,
		  clearBtn:true,
          startDate:  moment(fecha, 'YYYY-MM-DD').format('YYYY-MM-DD'),
          endDate:    moment(fecha, 'YYYY-MM-DD').add(diff < 7 ? diff : 7,'days').format('YYYY-MM-DD')
      });

  });

  let getListReportes = () =>{
	fetch('core/app/getCampaniaReport.php',{
		method:"GET"
	})
	.then(resp=>resp.json())
	.then(data=>{
		console.log(data);
		let optionsList = '<option selected hidden value>Selecciona una opción</option>';
		data.response.forEach(element=>{
			
			optionsList += `<option value="${element.id}">${element.Nombre}</option>`;
		});
		document.getElementById("tipoRep").innerHTML = optionsList;
	});
}
getListReportes();


document.getElementById('formReportes').addEventListener('submit', e => {
	e.preventDefault();

	let formData = new FormData(e.target);
	fetch("core/app/getPSTReportes.php", {
		method: "POST",
		body: formData
	})
	.then(resp => resp.json())
	.then(data => {	
		console.log(data);
		// return false;
		if (data.response[0].Code == 1) {


			location.href = "core/app/reportes/" + data.response[0].fileName;

			let formDataDel = new FormData();

			formDataDel.append('fileName',data.response[0].fileName);
			fetch('core/downloadRep.php',{
				method: "POST",
				body:formDataDel
			})
			.then( res => res.json() )
			.then( data => {
				
				console.log("REPORTE -> ", data);
			});


		} else {
			toastr.warning("No se encontraron resultados","Reportes Código Infarto");
		}
	});
});