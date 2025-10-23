// Variables Globales ----------------------------------------------------------------------------
let presupuesto = 0;

// gastos - Almacenará el listado de gastos que vaya introduciendo el usuario.
let gastos = [];

// idGasto - Se utiliza para almacenar el identificador actual de cada gasto que se vaya añadiendo.
let idGasto = 0;

// Funciones --------------------------------------------------------------------------------------
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

function CrearGasto(descripcion, valor) {
	// PROPIEDADES ----------------------------------
	this.descripcion = descripcion;

	// Debemos validar que es un número no negativo
	if (Number.isFinite(valor) && valor >= 0) {
		this.valor = valor;
	} else {
		this.valor = 0;
	}

	// MÉTODOS ---------------------------------------
	this.mostrarGasto = function () {
		let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
		return texto;
	};

	this.actualizarDescripcion = function (texto) {
		this.descripcion = texto;
	};

	this.actualizarValor = function (newValor) {
		if (Number.isFinite(newValor) && newValor >= 0) {
			this.valor = newValor;
		}
	};
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export { mostrarPresupuesto, actualizarPresupuesto, CrearGasto };
