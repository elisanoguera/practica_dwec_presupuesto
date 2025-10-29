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

function anyadirGasto(gasto) {
	// Añadimos la propiedad idGasto
	gasto.id = idGasto;

	// Incrementa el idGasto
	idGasto++;

	// Agregar el gasto al array de gastos
	gastos.push(gasto);
}

function borrarGasto(id) {
	// Buscamos el índice cuyo id pasamos como parámetro
	const indiceGasto = gastos.findIndex((gasto) => gasto.id == id);

	if (indiceGasto != -1) {
		gastos.splice(indiceGasto, 1);
	}
}

function calcularTotalGastos() {
	let totalGastos = 0;

	gastos.forEach((gasto) => (totalGastos += gasto.valor));

	return totalGastos;
}

function calcularBalance() {
	let balance = presupuesto - calcularTotalGastos();

	return balance;
}

// filtrarGastos -
function filtrarGastos(filtro) {
	/* El método filter itera sobre cada elemento del array y lo añade al nuevo array si devuelve true la función que se define en el parámetro */
	let gastosFiltrados = gastos.filter(function (gasto) {
		// Establecemos el valor el true para que en caso de recibir un objeto vacío devuelva todos los gastos. Las condiciones del filtro serán que no se cumplan, volviéndolo false.
		let valido = true;

		// fechaDesde
		if (Date.parse(filtro.fechaDesde)) {
			const fechaDesde = Date.parse(filtro.fechaDesde); // Date.parse devuelve timestamp
			if (gasto.fecha < fechaDesde) {
				valido = false;
			}
		}

		// fechaHasta
		if (Date.parse(filtro.fechaHasta)) {
			const fechaHasta = Date.parse(filtro.fechaHasta);
			if (gasto.fecha > fechaHasta) {
				valido = false;
			}
		}

		// valorMinimo
		if (gasto.valor < filtro.valorMinimo) {
			valido = false;
		}

		// valorMaximo
		if (gasto.valor > filtro.valorMaximo) {
			valido = false;
		}

		// descripcionContiene
		if (filtro.descripcionContiene) {
			const gastoDescripcionLower = gasto.descripcion.toLowerCase();
			if (
				!gastoDescripcionLower.includes(
					filtro.descripcionContiene.toLowerCase()
				)
			) {
				valido = false;
			}
		}

		// etiquetasTiene
		if (filtro.etiquetasTiene) {
			/* Mediante .some() comprobamos cada etiqueta del gasto si está incluida en el array
			etiquetasTiene. Devolverá true si encuentra al menos una y false si no hay ninguna */
			const tieneAlgunaEtiqueta = gasto.etiquetas.some((etiqueta) =>
				filtro.etiquetasTiene.includes(etiqueta)
			);
			// Si no contiene ninguna, tieneAlgunaEtiqueta será false.
			if (!tieneAlgunaEtiqueta) {
				valido = false;
			}
		}

		return valido;
	});

	return gastosFiltrados;
}

// agruparGastos -
function agruparGastos() {}

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
	this.mostrarGasto = function () {
		let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
		return texto;
	};

	this.mostrarGastoCompleto = function () {
		let texto = `Gasto correspondiente a ${this.descripcion} con valor ${
			this.valor
		} €.\nFecha: ${new Date(
			this.fecha
		).toLocaleString()}\nEtiquetas:\n${this.listarEtiquetas()}`;
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

	this.obtenerPeriodoAgrupacion = function (periodo) {
		// Pasamos la fecha que está en timestamp a DateTime
		const fechaGasto = new Date(this.fecha);
		let fechaPeriodo;

		// Obtenemos por separado los componentes de año, mes y día de dicha fecha.
		let anyo = fechaGasto.getFullYear().toString();

		/* .padStart(2, "0") aplicado a un string hace que tenga length de 2 y añada al principio (Start) tantos caracteres "0" como necesite para llegar al length, así aseguramos el formato "09" por ejemplo.*/

		let mes = (fechaGasto.getMonth() + 1).toString().padStart(2, "0");
		let dia = fechaGasto.getDate().toString().padStart(2, "0");

		// Construimos según el parámetro el string deseado
		switch (periodo) {
			case "anyo":
				return `${anyo}`;
			case "mes":
				return `${anyo}-${mes}`;
			case "dia":
				return `${anyo}-${mes}-${dia}`;
		}
	};

	this.anyadirEtiquetas = function (...newEtiquetas) {
		// Mediante función flecha. Mediante parámetro REST y forEach se controla la ejecución de arrays vacíos sin error.
		newEtiquetas.forEach((etiqueta) => {
			if (!this.etiquetas.includes(etiqueta)) {
				this.etiquetas.push(etiqueta);
			}
		});
	};

	this.borrarEtiquetas = function (...eliminarEtiquetas) {
		eliminarEtiquetas.forEach((etiqueta) => {
			const index = this.etiquetas.indexOf(etiqueta);

			if (index != -1) {
				this.etiquetas.splice(index, 1);
			}
		});
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
	filtrarGastos,
	agruparGastos,
	CrearGasto,
};
