// Muestra un valor (texto o número) dentro de un elemento HTML por su id
function mostrarDatoEnId(idElemento, valor) {
  // Busco en el documento el elemento con ese id
  let elemento = document.getElementById(idElemento);

  // Si existe el elemento 
  if (elemento) {
    // Le colocamos el valor que queremos mostrar
    elemento.textContent = valor;
  }
}



function mostrarGastoWeb(idElemento, gasto) {
  // Busco el contenedor donde voy a insertar el gasto
  let contenedor = document.getElementById(idElemento);

  // Creo el bloque principal del gasto
  let divGasto = document.createElement("div");
  divGasto.classList.add("gasto");

  // Creo y relleno el div para la descripción
  let divDescripcion = document.createElement("div");
  divDescripcion.classList.add("gasto-descripcion");
  divDescripcion.textContent = gasto.descripcion;

  // Creo y relleno el div para la fecha
  let divFecha = document.createElement("div");
  divFecha.classList.add("gasto-fecha");
  divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();

  // Creo y relleno el div para el valor
  let divValor = document.createElement("div");
  divValor.classList.add("gasto-valor");
  divValor.textContent = gasto.valor + " €";

  // Creo el div para las etiquetas
  let divEtiquetas = document.createElement("div");
  divEtiquetas.classList.add("gasto-etiquetas");

  // Recorro todas las etiquetas del gasto y creo spans
  for (let etiq of gasto.etiquetas) {
    let spanEtiqueta = document.createElement("span");
    spanEtiqueta.classList.add("gasto-etiquetas-etiqueta");
    spanEtiqueta.textContent = etiq;
    divEtiquetas.append(spanEtiqueta);
  }

  // Añado todos los sub-elementos al div principal del gasto
  divGasto.append(divDescripcion);
  divGasto.append(divFecha);
  divGasto.append(divValor);
  divGasto.append(divEtiquetas);

  //inserto el gasto completo en el contenedor
  contenedor.append(divGasto);
}





export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}