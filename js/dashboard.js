// console.log("HOLA");
// getDash.php
const milSec  = 1000;
let cVerde    = '#a0e9c1';
let cAMarillo = '#f9e199';
let cRojo     = '#ff9c9c';


let cVerdeText    = '#037f3c';
let cAMarilloText = '#b98b00';
let cRojoText     = '#FF0000';


let vTiempo   = (60 * 5) * milSec;

// console.log(vTiempo);


setInterval(() => {
	// createElementsDash();
	document.getElementById('botonChart').click();
	// console.log("5 MIN");
}, vTiempo);


let createElementsDash = () => {

	

	fetch("core/app/getDash.php", {
		method: "GET"
	})
	.then(resp => resp.json())
	.then(resp => {
		// console.log(resp);

		document.getElementById('clockDash').innerHTML = resp.response.clock;

		let allBandejas = resp.response[0].Bandejas;
		let allAgentes = resp.response[1].Agentes ?? [];

		const groupsBand = allBandejas.reduce((Bandejas, item) => {
			const Bandeja = (Bandejas[item.Bandeja] || []);
			Bandeja.push(item);
			Bandejas[item.Bandeja] = Bandeja;
			return Bandejas;
		}, {});


		let filtros = Object.values(document.querySelectorAll('.input-filtros'));

		let tipo0 = filtros[0].nextElementSibling.children[0].value;
		let tipo1 = filtros[1].nextElementSibling.children[0].value;
		// let tipo2 = filtros[2].nextElementSibling.children[0].value;

		let timepo1  = parseInt(tipo0 == 1 ? filtros[0].value : filtros[0].value * 24)
		   ,timepo2 = parseInt(tipo1 == 1 ? filtros[1].value : filtros[1].value * 24);

		// console.log(groupsBand);

		
		let arrayTbl = [{
			Titulo  : 'General',
			divTbl  : 'dTbGen1',
			divGrap : 'dPieGen1',
			divGrap2: 'dPieGen1G',
			Total   : 0
		},{
			Titulo  : 'AAQDI',
			divTbl  : 'dTbGen2',
			divGrap : 'dPieGen2',
			divGrap2: 'dPieGen2G',
			Total   : 0
		},{
			Titulo  : 'Nivel Centra',
			divTbl  : 'dTbGen3',
			divGrap : 'dPieGen3',
			divGrap2: 'dPieGen3G',
			Total   : 0
		},{
			Titulo  : 'CAOD',
			divTbl  : 'dTbGen4',
			divGrap : 'dPieGen4',
			divGrap2: 'dPieGen4G',
			Total   : 0
		},{
			Titulo  : 'Gestion',
			divTbl  : 'dTbGen5',
			divGrap : 'dPieGen5',
			divGrap2: 'dPieGen5G',
			Total   : 0
		}];
		Object.keys(groupsBand).forEach(e => {
			// console.log(e);

			let Band    = '';
			let titulo  = '';
			let divTbl  = '';
			let divGrap = '';
			let divGrap2 = '';

			if (e == 'General') {
				Band = e
				titulo  = 'BANDEJA GENERAL';
				divTbl  = 'dTbGen1';
				divGrap = 'dPieGen1';
				divGrap2 = 'dPieGen1G';

				arrayTbl[0].Total = groupsBand[Band].length;
				
			} else if (e == 'AAQDI') {
				Band = e
				titulo  = e;
				divTbl  = 'dTbGen2';
				divGrap = 'dPieGen2';
				divGrap2 = 'dPieGen2G';

				arrayTbl[1].Total = groupsBand[Band].length;
				
			} else if (e == 'Nivel Central') {
				Band = e
				titulo  = 'NIVEL CENTRAL';
				divTbl  = 'dTbGen3';
				divGrap = 'dPieGen3';
				divGrap2 = 'dPieGen3G';

				arrayTbl[2].Total = groupsBand[Band].length;
				
			} else if (e == 'CAOD') {
				Band = e
				titulo  = e;
				divTbl  = 'dTbGen4';
				divGrap = 'dPieGen4';
				divGrap2 = 'dPieGen4G';

				arrayTbl[3].Total = groupsBand[Band].length;
				
			} else if (e == 'Gestion') {
				Band = e
				titulo  = 'GESTIÓN';
				divTbl  = 'dTbGen5';
				divGrap = 'dPieGen5';
				divGrap2 = 'dPieGen5G';

				arrayTbl[4].Total = groupsBand[Band].length;
			}
		
			if(Band == '') return;

			// console.log(timepo1, timepo2, timepo3);

			// totVista += `<tr><th>${titulo}</th><th>${groupsBand[Band].length}</th></tr>`;
			// document.getElementById('listDetall').innerHTML = totVista;
			

			let gA = groupsBand[Band].filter(e => e.Tiempo >= 0 && e.Tiempo <= timepo1).length;
			let gB = groupsBand[Band].filter(e => e.Tiempo > timepo1 && e.Tiempo <= timepo2 ).length;
			let gC = groupsBand[Band].filter(e => e.Tiempo > timepo2).length;

			setTimeout(() => {
				createPieChart(gA, gB, gC, divGrap, titulo, 1);
			}, 1500);
			setTimeout(() => {
				createPieChart(gA, gB, gC, divGrap2, titulo);
			}, 1500);
		
			


			let tbl = 
				`<span class="mt-4 badge" style="background-color:#F4D6D6; color:black; font-size: 13px!important;">${titulo}</span>
				<table class="table table-sm w-auto small table-striped"  id="t-${divTbl}">
					<thead>
						<tr>
							<th>FOLIO</th>
							<th>DIRECCION JURIDICA</th>
							<th>RUBRO</th>
							<th>TIEMPO</th>
							${titulo != 'BANDEJA GENERAL' ? '<th>ATENCION</th>' : ''}
							${titulo != 'BANDEJA GENERAL' ? '<th>TIMPO AT</th>' : ''}
						</tr>
					</thead>
					<tbody>`;
			groupsBand[Band].forEach(v => {
				tbl +=
					`<tr>
						<td>${v.Folio}</td>
						<td>${v.DirNormativa}</td>
						<td>
							${v.Rubro.length > 100 ? v.Rubro.substring(0,100)+'... <a class="tool" data-trigger="hover" data-animation="false" data-placement="left" title="'+v.Rubro+'" href="javascript:;">ver más</a>' : v.Rubro}
						</td>
						<td>${getDaysAndHours(v.Tiempo)}</td>

						${titulo != 'BANDEJA GENERAL' ? '<td>'+v.Atencion+'</td>' : ''}
						${titulo != 'BANDEJA GENERAL' ? '<td>'+getDaysAndHours(v.TiempoAT)+'</td>' : ''}
					</tr>`;
			});
			
			tbl += '</tbody></table>';

			document.getElementById(divTbl).innerHTML = tbl;

			$(`#t-${divTbl}`).dataTable({
				language :{'url':'js/Spanish.json'},
				pageLength : 5,
				bLengthChange :false
			});

			$('.tool').tooltip({trigger:'click', delay: {show: 200, hide: 3000}});
		});

		// console.log(arrayTbl);

		let tblTot = '<tr><td></td><td>CASOS</td></tr>';

		let styleCount = 1;
		let style      = '';
		arrayTbl.forEach(e => {
			tblTot += `<tr><td>${e.Titulo}</td><td>${e.Total}</td></tr>`;
			
			if(styleCount < 3) {
				style = '-4rem';
			} else {
				style = '-1rem';
			}

			if (e.Total == 0) {
				document.getElementById(e.divGrap).classList.add('d-none');
				document.getElementById(e.divGrap2).classList.add('d-none');
				document.getElementById(e.divTbl).classList.add('d-none');
			}
			// document.getElementById(e.divGrap).style.marginTop  = style;
			document.getElementById(e.divGrap2).style.marginTop = style;
			// document.getElementById(e.divTbl).style.marginTop   = style;

			styleCount++;
		});

		document.getElementById('listDetall').innerHTML = tblTot;

		/*************************************************** TABLERO AGENTES******************************************************************** */
		let tbAgeData =
			`<table class="table table-sm w-auto small table-striped" id="tbl-Age">
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Folios Pendientes</th>
						<th>AAQDI</th>
						<th>CAOD</th>
						<th>Gestión</th>
						<th>Nivel Central</th>
					</tr>
				</thead>
				<tbody>`;
		if(allAgentes.length > 0) {
			allAgentes.forEach(v => {
				tbAgeData +=
					`<tr>
						<td>${v.Atencion == 0 ? '' : v.Atencion}</td>
						<td>${v.Pendientes == 0 ? '' : v.Pendientes}</td>
						<td>${v.AAQDI == 0 ? '' : v.AAQDI}</td>
						<td>${v.CAOD == 0 ? '' : v.CAOD}</td>
						<td>${v.Gestion == 0 ? '' : v.Gestion}</td>
						<td>${v.NivelCentral == 0 ? '' : v.NivelCentral}</td>
					</tr>`;
			});

			tbAgeData += '</tbody></table>';

			document.getElementById('dAge').innerHTML = tbAgeData;

			$(`#tbl-Age`).dataTable({
				language :{'url':'js/Spanish.json'},
				pageLength : 5,
				bLengthChange :false
			});
		}

		if(allBandejas.length > 0) {
			let tblAllAge = 
				`<table class="table table-sm w-auto small table-striped"  id="t-AgeAll">
					<thead>
						<tr>
							<th>NOMBRE</th>
							<th>FOLIO</th>
							<th>DIRECCIÓN</th>
							<th>TURNO</th>
							<th>TIEMPO</th>
							<th>TIEMPO AT</th>
						</tr>
					</thead>
					<tbody>`;
			allBandejas.forEach(v => {
				tblAllAge +=
					`<tr>
						<td>${v.Atencion}</td>
						<td>${v.Folio}</td>
						<td>${v.DirNormativa}</td>
						<td>${v.Bandeja}</td>
						<td>${getDaysAndHours(v.Tiempo)}</td>
						<td>${getDaysAndHours(v.TiempoAT)}</td>
					</tr>`;
			});
			document.getElementById('dTbAge').innerHTML = tblAllAge;

			$(`#t-AgeAll`).dataTable({
				language :{'url':'js/Spanish.json'},
				pageLength : 5,
				bLengthChange :false
			});

			// console.log(allBandejas);


			let gGA = allBandejas.filter(e => e.Tiempo >= 0 && e.Tiempo <= timepo1).length;
			let gGB = allBandejas.filter(e => e.Tiempo > timepo1 && e.Tiempo <= timepo2 ).length;
			let gGC = allBandejas.filter(e => e.Tiempo > timepo2).length;

			createPieChart(gGA, gGB, gGC, 'dPieGenAge', '', 1);

		}
		// 
		// 

		// console.log(arrayTbl);
	});

	$(".spinner").css("width","0%");
	$(".lds-roller").css("display","none");

	$("#myTabContent").slideUp(300).delay(1000).fadeIn(1000);
}



createElementsDash();


createPieChart = (_dataA, _dataB, _dataC, _div, Titulo, General = 0) => {
	am4core.options.autoDispose = true;
	var chart = am4core.create(_div, am4charts.PieChart);
	

	let Tot = _dataA + _dataB +_dataC;

	// console.log(Tot);

	// console.log((_dataA / Tot) * 100, Math.round((_dataA / Tot) * 100), _dataA);
	// console.log((_dataB / Tot) * 100, Math.round((_dataB / Tot) * 100), _dataB);
	// console.log((_dataC / Tot) * 100, Math.round((_dataC / Tot) * 100), _dataC);

	// console.log(Math.round((_dataA / Tot) * 100) + Math.round((_dataB / Tot) * 100) + Math.round((_dataC / Tot) * 100));
	// console.log((_dataA / Tot * 100) + (_dataB / Tot * 100) + (_dataC / Tot * 100));

	// console.log("--------------------------------------------------------------------");
	
	let dataTot  = [];

	if (_dataA > 0) {
		chart.data.push({
			"horas": _dataA,
			"total": Math.round((_dataA / Tot) * 100),
			// "total": Math.round((_dataA / Tot) * 100),
			"color": am4core.color(cVerde)
		});
		dataTot.push(Math.round((_dataA / Tot) * 100));


	}

	if (_dataB > 0) {
		chart.data.push({
			"horas": _dataB ,
			"total": Math.round((_dataB / Tot) * 100),
			// "total": Math.round((_dataB / Tot) * 100),
			"color": am4core.color(cAMarillo)
				
		});

		dataTot.push(Math.round((_dataB / Tot) * 100));

	}

	if (_dataC > 0) {
		chart.data.push({
			"horas": _dataC,
			"total": Math.round((_dataC / Tot) * 100),
			// "total": Math.round((_dataC / Tot) * 100),
			"color": am4core.color(cRojo)
		});

		dataTot.push(Math.round((_dataC / Tot) * 100));


	}

	// console.log(dataTot);

	let sumArray = dataTot.reduce((b, a) => b + a, 0);
	let totMax   = 0;

	if (sumArray > 100) {
		// console.log(chart.data);
		totMax = Math.max.apply(null, dataTot);
		// console.log(totMax);
		// console.log(posChart);

		let newData = totMax - (sumArray - 100);

		let objIndex = chart.data.findIndex((obj => obj.total == totMax));
		chart.data[objIndex].total = newData;

		// console.log(sumArray);
		// console.log(totMax);
		// console.log(posChart);
		// console.log(newData);

		// console.log(chart.data);


	}

	// console.log(_dataA/100, _div);
	// console.log(_dataB/100, _div);
	// console.log(_dataC/100, _div);

	if(chart.data.length > 0) {


		// Add and configure Series
		var pieSeries = chart.series.push(new am4charts.PieSeries());
		chart.responsive.enabled = true;
		pieSeries.dataFields.value = "total";
		pieSeries.dataFields.category = "horas";
		pieSeries.tooltip.disabled = true;

		// pieSeries.ticks.template.disabled = true;
		// pieSeries.alignLabels = false;
		if (General == 1) {
			pieSeries.labels.template.html = "<strong>{value}%<br>{category}</strong>";
		} else {
			pieSeries.labels.template.html = "<strong>{value}%</strong>";
		}
		
		// pieSeries.labels.template.radius = am4core.percent(-50);
		// pieSeries.labels.template.relativeRotation = 90;

		pieSeries.ticks.template.disabled = true;
		pieSeries.alignLabels = false;
		pieSeries.labels.template.radius = am4core.percent(-70);
		// pieSeries.labels.template.radius = am4core.percent(-40);
		if(General == 1) {//DETALLE
			pieSeries.labels.template.fontSize = 12;
		} else {
			var title = chart.titles.create();
			title.html = `<span class="mt-4 badge" style="background-color:#F4D6D6; color:black; font-size: 13px!important;">${Titulo}</span>`;
			title.fontSize = 14;
			// title.marginBottom = 30;
		}

		pieSeries.labels.template.adapter.add("radius", function(radius, target) {
			if (target.dataItem && (target.dataItem.values.value.percent < 10)) {
				return 0;
			}
			return radius;
		});
		
		pieSeries.labels.template.adapter.add("fill", function(color, target) {
			if (target.dataItem && (target.dataItem.values.value.percent < 10)) {
			//   return am4core.color("#000");
			}
			return color;
		});

		pieSeries.slices.template.propertyFields.fill = "color";
		// pieSeries.slices.template.adapter.fill = "labelColor"
	} else {
		// console.log(chart.data.length, _div);
		// console.log("AAAAAAAAAAAAAAAA");
		// document.getElementById(_div).classList.add('d-none');
	}
}









$('.paginate_button').click(function(e) {
	// $('.tool').tooltip({trigger:'click', delay: {show: 200, hide: 3000}});
	$('.tool').not(this).hide();
});

$('body').on('mouseenter', 'a,table *,.container', function(e) {
	$('.tool').tooltip('hide');
});

let getDaysAndHours = _horas => {

	let days = Math.floor(_horas / 24);
	let hours = Math.floor(_horas) % 24;

	let textDia = '';
	if (days == 1) {
		textDia = `${days} día`;
	} else if(days > 1) {
		textDia = `${days} días`;
	} else {
		textDia = '0 días';
	}


	let textHoras = '';
	if (hours == 1) {
		textHoras = `${hours} hora`;
	} else if(hours > 1) {
		textHoras = `${hours} horas`;
	} else {
		textHoras = '0 horas';
	}


	let filtros = Object.values(document.querySelectorAll('.input-filtros'));

		let tipo0 = filtros[0].nextElementSibling.children[0].value;
		let tipo1 = filtros[1].nextElementSibling.children[0].value;
		

		let timepo1 = parseInt(tipo0 == 1 ? filtros[0].value : filtros[0].value * 24)
			,timepo2 = parseInt(tipo1 == 1 ? filtros[1].value : filtros[1].value * 24);

	let respuesta = '';

	if (_horas >= 0 && _horas <= timepo1) {
		respuesta = `<label style="color:${cVerdeText};font-weight:bold;">${textDia} ${textHoras}</label>`;
	} else if (_horas > timepo1 && _horas <= timepo2) {
		respuesta = `<label style="color:${cAMarilloText};font-weight:bold;">${textDia} ${textHoras}</label>`;
	} else if(_horas > timepo2) {
		respuesta = `<label style="color:${cRojoText};font-weight:bold;">${textDia} ${textHoras}</label>`;
	} else {
		respuesta = `<label style="color:#black;font-weight:bold;">${textDia} ${textHoras}</label>`;
	}
	
	return respuesta;
}



function process(input){
	let value = input.value;
	let numbers = value.replace(/[^0-9]/g, "");
	input.value = numbers;
}

Object.values(document.querySelectorAll('.input-filtros')).forEach(e => {
	e.addEventListener('input', el => process(el.target));
});

document.getElementById('botonChart').addEventListener('click', e => {


	
		
	

	// console.log(e);
	let filtros = Object.values(document.querySelectorAll('.input-filtros'));

	let tipo0 = filtros[0].nextElementSibling.children[0].value;
	let tipo1 = filtros[1].nextElementSibling.children[0].value;


	let v1 = parseInt(tipo0 == 1 ? filtros[0].value : filtros[0].value * 24)
	   ,v2 = parseInt(tipo1 == 1 ? filtros[1].value : filtros[1].value * 24);

	// if (v2 >= v3) {
	// 	console.log(v2,v3);
	// 	toastr.warning('"Tiempo 2" debe ser menor al "Tiempo 3"', 'OIC');
	// 	return false;
	// }

	if (v1 >= v2) {
		// console.log(v1,v2);
		toastr.warning('"Tiempo 1" debe ser menor al "Tiempo 2"', 'OIC');
		return false;
	}
	
	$(".spinner").css("width","100%");
	$(".lds-roller").css("display","inline-block");

	Object.values(document.querySelectorAll('.dashGen')).forEach(e => {
		e.innerHTML = '';
	});
	setTimeout(() => {
		createElementsDash();
	}, 1500);
});


Object.values(document.querySelectorAll('.custom-select')).forEach(e => {
	e.addEventListener('change', el => {
		// console.log(el.target);
		// console.log(el.target.value);
		if (el.target.value == 1) {
			el.target.parentElement.previousElementSibling.value = el.target.parentElement.previousElementSibling.getAttribute('attr-value-h');
		} else {
			el.target.parentElement.previousElementSibling.value = el.target.parentElement.previousElementSibling.getAttribute('attr-value-d');
		}
		// console.log(el.target.parentElement.previousElementSibling.getAttribute('attr-value'));
	});
});


console.clear();