// Contiene las utilidades necesarias para mostrar los datos de la aplicación en la página interaccionHTML.html

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

	// 3. Agregamos los elementos generados al contenedor padre
	divGasto.appendChild(gastoDescripcion);
	divGasto.appendChild(gastoFecha);
	divGasto.appendChild(gastoValor);
	divGasto.appendChild(gastoEtiquetas);

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

// Exportación
export { mostrarDatoEnId, mostrarGastoWeb, mostrarGastosAgrupadosWeb };
