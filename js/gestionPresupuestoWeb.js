// Contiene las utilidades necesarias para mostrar los datos de la aplicación en la página interaccionHTML.html. Interacción con el DOM

/* Importacion por módulos */
import * as gestion from "./gestionPresupuesto.js"; // gestion es el nombre de módulo

/* mostrarDatoEnId -
    idElemento - id del elemento HTML donde se insertará la estructura generada
    valor - Valor que se escribirá y se mostrará en el elemento con el Id idElemento
*/
function mostrarDatoEnId(idElemento, valor) {
	// 1. Seleccionamos el elemento HTML donde insertaremos el valor
	let elementoGeneral = document.getElementById(idElemento);

	// 2. Al ser el parámetro valor un string y estar trabajando con divs, lo insertamos directamente
	elementoGeneral.textContent = valor;
}

/* mostrarGastoWeb - 
    idElemento - id del elemento HTML donde se insertará la estructura HTML generada
    gasto - Objeto gasto
*/
function mostrarGastoWeb(idElemento, gasto) {
	// 1. Seleccionamos el elemento HTML donde insertaremos la estructura
	let elementoGeneral = document.getElementById(idElemento);

	// 2. Generamos los elementos a insertar
	let divGasto = document.createElement("div");
	divGasto.classList.add("gasto");

	let gastoDescripcion = document.createElement("div");
	gastoDescripcion.classList.add("gasto-descripcion");
	gastoDescripcion.textContent = gasto.descripcion;

	let gastoFecha = document.createElement("div");
	gastoFecha.classList.add("gasto-fecha");
	gastoFecha.textContent = new Date(gasto.fecha).toLocaleDateString(); // Necesitamos mostrarlo en formato de fecha

	let gastoValor = document.createElement("div");
	gastoValor.classList.add("gasto-valor");
	gastoValor.textContent = gasto.valor;

	let gastoEtiquetas = document.createElement("div");
	gastoEtiquetas.classList.add("gasto-etiquetas");

	// Agregamos las etiquetas a su contenedor en caso de que existan
	if (gasto.etiquetas.length > 0) {
		gasto.etiquetas.forEach((etiqueta) => {
			let spanEtiqueta = document.createElement("span");
			spanEtiqueta.classList.add("gasto-etiquetas-etiqueta");
			spanEtiqueta.textContent = etiqueta;
			gastoEtiquetas.appendChild(spanEtiqueta);
		});
	} else {
		gastoEtiquetas.textContent = "Sin etiquetas agregadas";
	}

	// Manejador de etiquetas
	let etiquetasManejador = Object.create(BorrarEtiquetasHadle);
	etiquetasManejador.gasto = gasto;
	gastoEtiquetas.addEventListener("click", etiquetasManejador);

	// Botón editar
	let botonEditar = document.createElement("button");
	botonEditar.type = "button";
	botonEditar.classList.add("gasto-editar");
	botonEditar.textContent = "Editar";
	let editarManejador = Object.create(EditarHandle);
	editarManejador.gasto = gasto;
	botonEditar.addEventListener("click", editarManejador);

	let botonEditarFormulario = document.createElement("button");
	botonEditarFormulario.type = "button";
	botonEditarFormulario.classList.add("gasto-editar-formulario");
	botonEditarFormulario.textContent = "Editar (formulario)";
	let editarFormularioManejador = Object.create(EditarHandleFormulario);
	editarFormularioManejador.gasto = gasto;
	botonEditarFormulario.addEventListener("click", editarFormularioManejador);

	// Botón borrar
	let botonBorrar = document.createElement("button");
	botonBorrar.type = "button";
	botonBorrar.classList.add("gasto-borrar");
	botonBorrar.textContent = "Borrar";
	let borrarManejador = Object.create(BorrarHandle);
	borrarManejador.gasto = gasto;
	botonBorrar.addEventListener("click", borrarManejador);

	// 3. Agregamos los elementos generados al contenedor padre
	divGasto.appendChild(gastoDescripcion);
	divGasto.appendChild(gastoFecha);
	divGasto.appendChild(gastoValor);
	divGasto.appendChild(gastoEtiquetas);

	divGasto.appendChild(botonEditar);
	divGasto.appendChild(botonBorrar);
	divGasto.appendChild(botonEditarFormulario);

	// 4. Por último, lo agregamos al elemento que nos pasan por parámetro
	elementoGeneral.appendChild(divGasto);
}

/* mostrarGastosAgrupadosWeb - 
    idElemento - id del elemento HTML donde se insertará la estructura HTML generada
    agrup - Objeto que contendrá el resultado de ejecutar agruparGastos()
    periodo - Periodo de agrupación: dia, mes o anyo
*/
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
	// 1. Seleccionamos el elemento HTML donde insertaremos la estructura
	let elementoGeneral = document.getElementById(idElemento);

	// 2. Generamos los elementos a insertar
	let divAgrupacion = document.createElement("div");
	divAgrupacion.classList.add("agrupacion");

	let titulo = document.createElement("h1");
	titulo.textContent = `Gastos agrupados por ${periodo}`;
	divAgrupacion.appendChild(titulo);

	// 2.1. Realizamos un bucle por cada pareja clave-valor.
	for (const clave in agrup) {
		// 2.1.1. Creamos el contenedor
		let agrupacionDato = document.createElement("div");
		agrupacionDato.classList.add("agrupacion-dato");

		// 2.1.2. Creamos los span con la clave y el valor
		let datoClave = document.createElement("span");
		datoClave.classList.add("agrupacion-dato-clave");
		datoClave.textContent = clave;

		let datoValor = document.createElement("span");
		datoValor.classList.add("agrupacion-dato-valor");
		datoValor.textContent = agrup[clave];

		// 2.1.3. Generamos la estructura
		agrupacionDato.appendChild(datoClave);
		agrupacionDato.appendChild(datoValor);
		divAgrupacion.appendChild(agrupacionDato);
	}

	elementoGeneral.appendChild(divAgrupacion);
}

/* repintar - Función que recarga la página cada vez que se carga, modifica o borra un dato */
function repintar() {
	// 1. Mostrar el presupuesto
	mostrarDatoEnId("presupuesto", gestion.mostrarPresupuesto());

	// 2. Mostrar gastos totales
	mostrarDatoEnId("gastos-totales", gestion.calcularTotalGastos());

	// 3. Mostrar balance
	mostrarDatoEnId("balance-total", gestion.calcularBalance());

	// 4. Borrado de gastos
	// Al ejecutar .replaceChildren sin parámetros, elimina todos los nodos hijos del elemento
	document.getElementById("listado-gastos-completo").replaceChildren();

	// 5. Listado de gastos
	let gastos = gestion.listarGastos();
	gastos.forEach((gasto) => {
		mostrarGastoWeb("listado-gastos-completo", gasto);
	});
}

/* Manejadores de eventos */
/* actualizarPresupuestoWeb */
function actualizarPresupuestoWeb() {
	// 1. Pedir el nuevo presupuesto y pasarlo a float
	let nuevoPresupuesto = parseFloat(prompt("Introduzca el nuevo presupuesto:"));

	gestion.actualizarPresupuesto(nuevoPresupuesto);

	repintar();
}

/* nuevoGastoWeb */
function nuevoGastoWeb() {
	// 1. Datos del gasto
	let descripcion = prompt("Descripción: ");
	let valor = parseFloat(prompt("Valor: "));
	let fecha = prompt("Fecha: ", "yyyy-mm-dd");
	let etiquetas = prompt("Introduzca las etiquetas separadas por ',': ");

	// 2. Pasamos las etiquetas a un array
	etiquetas = etiquetas.split(",");

	// 3. Crear nuevo gasto
	/* Al colocar los ... delante de etiquetas, estamos propagando (Spread)
	los valores que se encuentran dentro del array etiquetas. De este modo se pasan
	correctamente como parámetros REST. */
	let nuevoGasto = new gestion.CrearGasto(descripcion, valor, fecha, ...etiquetas);

	// 4. Añadimos el gasto al array de gastos y repintamos
	gestion.anyadirGasto(nuevoGasto);
	repintar();
}

/* confirmarAnyadir */
function confirmarAnyadir(evento) {
	//  Evitamos el envío automático
	evento.preventDefault();

	//  Colección de los elementos del form sin incluir los labels
	let elementos = evento.currentTarget.elements;
	let descripcion = elementos.descripcion.value;
	let valor = parseFloat(elementos.valor.value);
	let fecha = elementos.fecha.value;
	let etiquetas = elementos.etiquetas.value.split(",");

	// Creamos el nuevo gasto, añadimos y repintamos
	let nuevoGasto = new gestion.CrearGasto(descripcion, valor, fecha, ...etiquetas);
	gestion.anyadirGasto(nuevoGasto);

	// Volver al estado anterior
	evento.currentTarget.remove();
	document.getElementById("anyadirgasto-formulario").disabled = false;

	repintar();
}

/* cancelarAnyadir */
function cancelarAnyadir(evento) {
	// El evento se produce en el botón, por lo que debemos eliminar el nodo padre (form)
	evento.currentTarget.parentNode.remove();
	document.getElementById("anyadirgasto-formulario").disabled = false;
	repintar();
}

/* nuevoGastoWebFormulario */
function nuevoGastoWebFormulario() {
	// Desactivamos el propio botón
	this.disabled = true;

	let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
	let formulario = plantillaFormulario.querySelector("form");
	let botonCancelar = formulario.querySelector(".cancelar");
	document.getElementById("controlesprincipales").append(plantillaFormulario);

	formulario.addEventListener("submit", confirmarAnyadir);
	botonCancelar.addEventListener("click", cancelarAnyadir);
}

/* EditarHandle  - Empieza con mayúscula al ser una funcion constructora */
let EditarHandle = {
	// Esto es un objeto literal, no una función constructora.
	handleEvent: function (evento) {
		// 1. Datos del gasto
		let descripcion = prompt("Descripción: ");
		let valor = parseFloat(prompt("Valor: "));
		let fecha = prompt("Fecha: ", "yyyy-mm-dd");
		let etiquetas = prompt("Introduzca las etiquetas separadas por ',': ");
		etiquetas = etiquetas.split(",");

		// 2. Actualización de datos del gasto
		this.gasto.actualizarDescripcion(descripcion);
		this.gasto.actualizarValor(valor);
		this.gasto.actualizarFecha(fecha);
		this.gasto.anyadirEtiquetas(...etiquetas);

		repintar();
	},
};

/* BorrarHandle */ // Esto es un objeto literal, no una función constructora.
let BorrarHandle = {
	handleEvent: function (evento) {
		gestion.borrarGasto(this.gasto.id);

		repintar();
	},
};

/* BorrarEtiquetasHandle */
let BorrarEtiquetasHadle = {
	handleEvent: function (evento) {
		// Detectamos la etiqueta pulsada
		const etiquetaEliminar = evento.target.textContent;
		this.gasto.borrarEtiquetas(etiquetaEliminar);
		repintar();
	},
};

/* confirmarEditar */
let ConfirmarEditarHandle = {
	handleEvent: function (evento) {
		// Evitar envío automático
		evento.preventDefault();

		// Modificar los valores guardados en el gasto. No se pone el this ya que vendrá como parámetro cuando asignemos la función manejadora al botón
		this.gasto.descripcion = evento.currentTarget.elements.descripcion.value;
		this.gasto.valor = parseFloat(evento.currentTarget.elements.valor.value);
		this.gasto.fecha = new Date(evento.currentTarget.elements.fecha.value).getTime();

		let etiquetas = evento.currentTarget.elements.etiquetas.value.split(",");
		this.gasto.etiquetas = etiquetas;

		repintar();
	},
};

/* cancelarEditar */
function cancelarEditar(evento) {
	evento.currentTarget.parentNode.remove();
	repintar();
}

let EditarHandleFormulario = {
	handleEvent: function (evento) {
		// Desactivamos el resto de botones del gasto
		let nodoPadre = evento.currentTarget.parentNode;
		nodoPadre.querySelector(".gasto-editar").disabled = true;
		nodoPadre.querySelector(".gasto-borrar").disabled = true;
		evento.currentTarget.disabled = true;

		// Mostramos el template y guardamos las referencias
		let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
		let formulario = plantillaFormulario.querySelector("form");
		let botonCancelar = formulario.querySelector(".cancelar");

		// A la hora de crear el formulario debe rellenar los campos con los datos existentes
		formulario.elements.descripcion.value = this.gasto.descripcion;
		formulario.elements.valor.value = this.gasto.valor;

		// Debemos escribir la fecha guardada en formato timestamp en un string aceptado por el campo
		const fechaGasto = new Date(this.gasto.fecha);
		const anyo = fechaGasto.getFullYear();
		const mes = (fechaGasto.getMonth() + 1).toString().padStart(2, "0");
		const dia = fechaGasto.getDate().toString().padStart(2, "0");
		formulario.elements.fecha.value = `${anyo}-${mes}-${dia}`;

		formulario.elements.etiquetas.value = this.gasto.etiquetas;

		// Añadimos los objetos manejadores
		let confirmarEditarHandle = Object.create(ConfirmarEditarHandle);
		confirmarEditarHandle.gasto = this.gasto;
		formulario.addEventListener("submit", confirmarEditarHandle);
		botonCancelar.addEventListener("click", cancelarEditar);

		nodoPadre.append(plantillaFormulario);
	},
};

// Asignación de manejadores
// Botón actualizarpresupuesto
document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);

// Botón anyadirgasto
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);

// Botón anyadirgasto-formulario
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);

/* ----------------------------------------------------------------------------------------------- */
/* Funciones de almacenamiento */

function guardarGastosWeb() {
	localStorage.GestorGastosDWEC = JSON.stringify(gestion.listarGastos());
}

function cargarGastosWeb() {
	let gastosCargados = [];

	// Al estar en el condicional, cualquier truthy ejecuta la carga
	if (localStorage.GestorGastosDWEC) {
		gastosCargados = JSON.parse(localStorage.GestorGastosDWEC);
	}

	gestion.cargarGastos(gastosCargados);

	repintar();
}

// Asignación de manejadores
// Botón guardar-gastos
document.getElementById("guardar-gastos").addEventListener("click", guardarGastosWeb);

// Botón cargar-gastos
document.getElementById("cargar-gastos").addEventListener("click", cargarGastosWeb);

/* Exportación */
export { mostrarDatoEnId, mostrarGastoWeb, mostrarGastosAgrupadosWeb, repintar };
