function _browserIE() {
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE ");
	var bolean = false;
	if (msie > 0) {// If Internet Explorer, return version number
		// console.log(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
		bolean = true;
	} else { // If another browser, return 0
		bolean = false
	}
	return bolean;
}



function fecthIE(method, url, data, done, typeRes) {
	var xhr = new XMLHttpRequest();
	xhr.open(method, url);
	xhr.onload = function () {

		done(null, (typeRes !== undefined && typeRes.toUpperCase() === 'JSON') ? JSON.parse(xhr.response) : xhr.response);
	};
	xhr.onerror = function () {
		done((typeRes !== undefined && typeRes.toUpperCase() === 'JSON') ? JSON.parse(xhr.response) : xhr.response);
	};
	xhr.send(data);
}