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

