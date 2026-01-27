function startTime() {
    // console.log('hora')
	var today = new Date();
	// var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	var hr = today.getHours() < 10 ? "0" + today.getHours() : today.getHours();
	var min = today.getMinutes();
	var sec = today.getSeconds();
	min = checkTime(min);
	sec = checkTime(sec);
	document.getElementById("horaActual").innerHTML = hr + ":" + min + ":" + sec;
	var time = setTimeout(function () {
		startTime()
	}, 1000);
}

function checkTime(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}

$(document).ready(function () {
	startTime();
});





document.getElementById('ServicioDigital').addEventListener('change', e => {
	let option = '<option selected hidden value>Seleccione una opción</option>';
	document.getElementById('SubTipificacion').innerHTML = option;


	document.getElementById('OtrosMotivos').setAttribute('disabled', 'disabled')
	document.getElementById('OtrosMotivos').value = '';

	$('#OOAD')[0].selectize.disable();
	$('#OOAD').selectize()[0].selectize.setValue('');

	document.getElementById('Turno').setAttribute('disabled', 'disabled')
	document.getElementById('Turno').value = '';

	_catTIP.filter(el => el.idPadre == e.target.value).forEach(el => option += `<option value="${el.id}">${el.Nombre}</option>`);
	document.getElementById('Tipificacion').innerHTML = option;

	if (e.target.value == 5000) {
		document.getElementById('Tipificacion').innerHTML = '<option>No procedente</option>'
		document.getElementById('SubTipificacion').innerHTML = '<option>No procedente</option>';
		document.querySelectorAll('.motivoInter').forEach(el => {
			el.setAttribute('disabled', 'disabled');
			el.value = '';
		});
	} else {
		document.querySelectorAll('.motivoInter').forEach(el => el.removeAttribute('disabled'));
	}
});	

document.getElementById('Tipificacion').addEventListener('change', e => {
	let option = '<option selected hidden value>Seleccione una opción</option>';

	document.getElementById('OtrosMotivos').setAttribute('disabled', 'disabled')
	document.getElementById('OtrosMotivos').value = '';

	$('#OOAD')[0].selectize.disable();
	$('#OOAD').selectize()[0].selectize.setValue('');

	document.getElementById('Turno').setAttribute('disabled', 'disabled')
	document.getElementById('Turno').value = '';

	_catTIP.filter(el => el.idPadre == e.target.value).forEach(el => option += `<option value="${el.id}">${el.Nombre}</option>`);
	document.getElementById('SubTipificacion').innerHTML = option;
});


document.getElementById('SubTipificacion').addEventListener('change', () => {
	let optSubTip = document.querySelector('#SubTipificacion option:checked').text;

	if (optSubTip == 'Otros') {
		document.getElementById('OtrosMotivos').removeAttribute('disabled')
	} else {
		document.getElementById('OtrosMotivos').setAttribute('disabled', 'disabled')
		document.getElementById('OtrosMotivos').value = '';
	}

	let arrayErrorCIMED = [
		'Citas medicas no disponibles',
		'Cita médica familiar agendada por app no respetada',
		'Citas dentales no disponibles',
		'Cita dental no respetada',
		'Citas medicas no disponibles',
		'Cita médica familiar agendada por web no respetada'
	]

	if (arrayErrorCIMED.includes(optSubTip)) {
		$('#OOAD')[0].selectize.enable();
		document.getElementById('Turno').removeAttribute('disabled')

	} else {
		$('#OOAD')[0].selectize.disable();
		$('#OOAD').selectize()[0].selectize.setValue('');

		document.getElementById('Turno').setAttribute('disabled', 'disabled')
		document.getElementById('Turno').value = '';
	}
});


let optionUMF = '<option value="" hidden selected>Seleccione una opción</option>';

_catUMF.forEach(e => optionUMF += `<option>${e.join(' | ')}</option>`);

document.getElementById('OOAD').innerHTML = optionUMF;

$('#OOAD').selectize({
	placeholder: 'Seleccione una opción'
});


document.getElementById('formEnvio').addEventListener('submit', e => {
	e.preventDefault();

	swal({
		closeOnClickOutside: false,
		closeOnEsc: false,
		title:  'Operación Exitosa',
		icon: 'success'
	})
})