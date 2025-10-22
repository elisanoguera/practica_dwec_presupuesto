// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

let presupuesto = 0;

function actualizarPresupuesto(valor) {
	// Debe cumplir dos condiciones: que sea número y que sea mayor o igual que 0
	// Number.isFinite(valor) comprueba si el parámetro que pasamos es un número además de otras comprobaciones como NaN e infinito.
	if (Number.isFinite(valor) && valor >= 0) {
		presupuesto = valor;
		return presupuesto;
	} else {
		return -1;
	}
}

function mostrarPresupuesto() {
	let texto = `Tu presupuesto actual es de ${presupuesto} €`;
	return texto;
}

function CrearGasto() {}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export { mostrarPresupuesto, actualizarPresupuesto, CrearGasto };
