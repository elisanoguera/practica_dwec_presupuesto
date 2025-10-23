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

function listarGastos() {
	return gastos;
}

function anyadirGasto() {}

function borrarGasto() {}

function calcularTotalGastos() {}

function calcularBalance() {}

// Función Constructora del objeto Gasto
// Pasamos los parámetros a partir del tercero como un array a las etiquetas
function CrearGasto(descripcion, valor = 0, fecha, ...etiquetas) {
	// PROPIEDADES ----------------------------------
	this.descripcion = descripcion;

	// Valor - Debemos validar que es un número no negativo
	if (Number.isFinite(valor) && valor >= 0) {
		this.valor = valor;
	} else {
		this.valor = 0;
	}

	// Analizamos si entra por parámetro una fecha correcta, en caso contrario se guarda la fecha de creación del objeto
	if (fecha) {
		// Creamos un objeto Date con el parámetro fecha y lo convertimos a timestamp. Será NaN si es incorrecto
		const fechaParametro = new Date(fecha).getTime();

		if (Number.isNaN(fechaParametro)) {
			// En caso de que sea NaN, guardamos la fecha de creación del gasto
			this.fecha = new Date().getTime();
		} else {
			// Si no es NaN, significa que es correcta y la asignamos
			this.fecha = fechaParametro;
		}
	} else {
		this.fecha = new Date().getTime();
	}

	// Controlamos que ocurre si no se pasa ninguna etiqueta.
	if (etiquetas.length > 0) {
		this.etiquetas = etiquetas;
	} else {
		this.etiquetas = [];
	}

	// MÉTODOS ---------------------------------------
	this.mostrarGastoCompleto = function () {
		let texto = `Gasto correspondiente a ${this.descripcion} con valor ${
			this.valor
		} €.\nFecha: ${new Date(this.fecha).toLocaleString(
			"es-ES"
		)}\nEtiquetas:\n${this.listarEtiquetas()}`;
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

	this.actualizarFecha = function (newFecha) {
		let parseFecha = Date.parse(newFecha);
		// Devuelve directamente un timestamp. Devuelve NaN si el string no es válido.

		// Comprueba si se convierte correctamente.
		if (!Number.isNaN(parseFecha)) {
			this.fecha = parseFecha;
		}
	};

	// Método que genera la lista de etiquetas asociadas al gasto
	this.listarEtiquetas = function () {
		let texto = "";

		if (this.etiquetas.length > 0) {
			this.etiquetas.forEach(function (etiqueta) {
				texto += `- ${etiqueta}\n`;
			});
		} else {
			texto += "Sin etiquetas asignadas";
		}

		return texto;
	};
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
	mostrarPresupuesto,
	actualizarPresupuesto,
	listarGastos,
	anyadirGasto,
	borrarGasto,
	calcularTotalGastos,
	calcularBalance,
	CrearGasto,
};
