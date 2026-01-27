// Función que convierte letras en mayusculas y sin acentos aceptando la tilde de la letra Ñ
function quitarAcentos(str) {
	 str = str.replace(/ñ/g, "__enie__").replace(/Ñ/g, "__ENIE__");
	 str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	 return str
	   .replace(/__enie__/g, "ñ")
	   .replace(/__ENIE__/g, "Ñ").toUpperCase();
	}

$("input[type='text']").on('keyup', function(event) {
	event.preventDefault();
	this.value = quitarAcentos(this.value);

});

// Funcion solo numeros en input text
function process(input){
	let value = input.value;
	let numbers = value.replace(/[^0-9]/g, "");
	input.value = numbers;
}

Object.values(document.querySelectorAll('.only-numbers')).map(e => {
	e.addEventListener('input', el => {
		process(el.target);
	})
});