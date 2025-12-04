import * as libreriaGestionPresupuesto from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor) {
  let elemento = document.getElementById(idElemento);
  elemento.textContent = valor;
}


function mostrarGastoWeb(idElemento, gasto) {
  // 1. Buscar el elemento donde se añadirá el gasto
  let elemento = document.getElementById(idElemento);

  // 2. Div principal del gasto
  let div = document.createElement("div");
  div.className = "gasto";

  // 3. Descripción
  let divDescripcion = document.createElement("div");
  divDescripcion.className = "gasto-descripcion";
  divDescripcion.innerHTML = gasto.descripcion;
  div.appendChild(divDescripcion);

  // 4. Fecha
  let divFecha = document.createElement("div");
  divFecha.className = "gasto-fecha";
  divFecha.innerHTML = new Date(gasto.fecha).toLocaleString();
  div.appendChild(divFecha);

  // 5. Valor
  let divValor = document.createElement("div");
  divValor.className = "gasto-valor";
  divValor.innerHTML = gasto.valor;
  div.appendChild(divValor);

  // 6. Etiquetas
  let divEtiquetas = document.createElement("div");
  divEtiquetas.className = "gasto-etiquetas";

  for (let etiqueta of gasto.etiquetas) {
    let spanEtiqueta = document.createElement("span");
    spanEtiqueta.className = "gasto-etiquetas-etiqueta";
    spanEtiqueta.textContent = etiqueta + " ";

    //Evento eliminar etiqueta
    let objBorrarEtiquetas = new BorrarEtiquetasHandle();
    objBorrarEtiquetas.gasto = gasto;
    objBorrarEtiquetas.etiqueta = etiqueta;
    spanEtiqueta.addEventListener("click", objBorrarEtiquetas);

    divEtiquetas.appendChild(spanEtiqueta);
  }

  div.appendChild(divEtiquetas);

  //Botón editar
  let btnEditar = document.createElement("button");
  btnEditar.setAttribute("type", "button");
  btnEditar.className = "gasto-editar";
  btnEditar.textContent = "Editar";

  let objEditar = new EditarHandle();

  objEditar.gasto = gasto;

  btnEditar.addEventListener("click", objEditar);

  div.appendChild(btnEditar);

  //Botón borrar
  let btnBorrar = document.createElement("button");
  btnBorrar.setAttribute("type", "button");
  btnBorrar.className = "gasto-borrar";
  btnBorrar.textContent = "Borrar";

  let objBorrar = new BorrarHanlde();
  objBorrar.gasto = gasto;

  btnBorrar.addEventListener("click", objBorrar);
  div.appendChild(btnBorrar);

  //Botón editar-formulario
  let btnEditarConFormulario = document.createElement("button");
  btnEditarConFormulario.setAttribute("type", "button");
  btnEditarConFormulario.className = "gasto-editar-formulario";
  btnEditarConFormulario.textContent = "Editar (formulario)";

  let objEditarForm = new EditarHandleFormulario();
  objEditarForm.gasto = gasto;
  btnEditarConFormulario.addEventListener("click", objEditarForm);
  div.appendChild(btnEditarConFormulario);


  //Espacio entre gastos
  div.appendChild(document.createElement("br"));
  div.appendChild(document.createElement("br"));

  //Insertar todo en el contenedor final
  elemento.appendChild(div);
}


function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {

  let periodoTexto = periodo;
  if (periodo == "dia") {
    periodoTexto = "día";
  }
  if (periodo == "anyo") {
    periodoTexto = "año";
  }

  let elemento = document.getElementById(idElemento);
  let div = document.createElement("div");
  div.className = "agrupacion";
  div.innerHTML = `<h1>Gastos agrupados por ${periodoTexto}</h1>`;

  for (let [clave, valor] of Object.entries(agrup)) {
    let divAgrupacionDato = document.createElement("div");
    divAgrupacionDato.className = "agrupacion-dato";

    let spanClave = document.createElement("span");
    spanClave.className = "agrupacion-dato-clave";
    spanClave.innerHTML = clave;
    divAgrupacionDato.appendChild(spanClave);

    document.createTextNode(": ");
    divAgrupacionDato.appendChild(document.createTextNode(": "));

    let spanValor = document.createElement("span");
    spanValor.className = "agrupacion-dato-valor";
    spanValor.innerHTML = valor;
    divAgrupacionDato.appendChild(spanValor);

    //Se añade el dato al div principal "agrupacion"
    div.appendChild(divAgrupacionDato);
  }

  elemento.appendChild(div);
}


function repintar() {
  // Mostrar el presupuesto en div#presupuesto
  libreriaGestionPresupuesto.mostrarPresupuesto();
  mostrarDatoEnId("presupuesto", libreriaGestionPresupuesto.mostrarPresupuesto());

  // Mostrar los gastos totales en div#gastos-totales
  mostrarDatoEnId("gastos-totales", libreriaGestionPresupuesto.calcularTotalGastos());

  // Mostrar el balance total en div#balance-total
  mostrarDatoEnId("balance-total", libreriaGestionPresupuesto.calcularBalance());

  // Borrar el contenido de div#listado-gastos-completo, para que el paso siguiente no duplique la información.
  let listadoGastosCompleto = document.getElementById("listado-gastos-completo");
  listadoGastosCompleto.innerHTML = "";

  // Mostrar el listado completo de gastos en div#listado-gastos-completo
  for (let gasto of libreriaGestionPresupuesto.listarGastos()) {
    mostrarGastoWeb("listado-gastos-completo", gasto);
  }
}


//FUNCIONALIDAD BOTÓN "Actualizar presupuesto"
function actualizarPresupuestoWeb() {
  let nuevoPresupuesto = prompt("Introduzca un presupuesto:");
  nuevoPresupuesto = Number(nuevoPresupuesto);
  if (nuevoPresupuesto >= 0) {
    libreriaGestionPresupuesto.actualizarPresupuesto(nuevoPresupuesto);
    repintar();
  }
}

let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);


//FUNCIONALIDAD BOTÓN "Añadir gasto"
function nuevoGastoWeb() {
  let gastoDescripcion = prompt("Introduzca la DESCRIPCIÓN del gasto:");
  let gastoValor = Number(prompt("Introduzca el VALOR del gasto:"));
  let gastoFecha = prompt("Introduzca la FECHA del gasto (yyyy-mm-dd):");
  let gastoEtiquetas = prompt("Introduzca las ETIQUETAS del gasto separadas por coma (etiqueta1,etiqueta2,etiqueta3):").split(",");

  let gasto = new libreriaGestionPresupuesto.CrearGasto(gastoDescripcion, gastoValor, gastoFecha, gastoEtiquetas);
  libreriaGestionPresupuesto.anyadirGasto(gasto);
  repintar();
}

document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);


//FUNCIONALIDAD BOTÓN "Añadir gasto (formulario)"
function nuevoGastoWebFormulario() {
  let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
  let formulario = plantillaFormulario.querySelector("form");

  //Añadir el fragmento de documento para que se muestre en la página
  let contenedor = document.getElementById("controlesprincipales");
  contenedor.appendChild(plantillaFormulario);

  //Desactivar el botón anyadirgasto-formulario.
  document.getElementById("anyadirgasto-formulario").disabled = true;

  //Manejador de evento para el evento "submit" del formulario (botón "Enviar")
  formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    let descripcion = event.currentTarget.elements.descripcion.value; //event.currentTarget --> formulario
    let valor = Number(event.currentTarget.elements.valor.value);
    let fecha = event.currentTarget.elements.fecha.value;
    let etiquetas = event.currentTarget.elements.etiquetas.value;
    let gasto = new libreriaGestionPresupuesto.CrearGasto(descripcion, valor, fecha, etiquetas);
    libreriaGestionPresupuesto.anyadirGasto(gasto);

    repintar();

    //Reactivar el botón anyadirgasto-formulario
    document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
  });

  //Manejador de evento el botón Cancelar
  let objCancelar = new ManejadorCancelar();
  formulario.querySelector("button.cancelar").addEventListener("click", objCancelar);
}

let botonAnyadirgastoFormulario = document.getElementById("anyadirgasto-formulario");
botonAnyadirgastoFormulario.addEventListener("click", nuevoGastoWebFormulario);



// FUNCIONES CONSTRUCTORAS DE OBJETOS MANEJADORES DE EVENTOS
function EditarHandle() {
  this.handleEvent = function (e) {
    let gastoDescripcion = prompt("Introduzca la nueva DESCRIPCIÓN del gasto:", this.gasto.descripcion);
    let gastoValor = Number(prompt("Introduzca el VALOR del gasto:", this.gasto.valor));
    let gastoFecha = new Date(prompt("Introduzca la FECHA del gasto (yyyy-mm-dd):", new Date(this.gasto.fecha).toLocaleDateString())).toLocaleString;
    let gastoEtiquetas = prompt("Introduzca las ETIQUETAS a añadir del gasto separadas por coma (etiqueta1,etiqueta2,etiqueta3):").split(",");

    this.gasto.actualizarDescripcion(gastoDescripcion);
    this.gasto.actualizarValor(gastoValor);
    this.gasto.actualizarFecha(gastoFecha);
    this.gasto.anyadirEtiquetas(gastoEtiquetas);

    repintar();
  }
}


function BorrarHanlde() {
  this.handleEvent = function (e) {
    confirm("¿Desea eliminar este gasto?") ? libreriaGestionPresupuesto.borrarGasto(this.gasto.id) : null;
    repintar();
  }
}


function BorrarEtiquetasHandle() {
  this.handleEvent = function (e) {
    this.gasto.borrarEtiquetas(this.etiqueta);

    repintar();
  }
}


//Función constructora de objeto para manejador de evento del botón "Cancelar" del boton "Añadir gasto (formulario)"
function ManejadorCancelar() {
  this.handleEvent = function (e) {
    e.currentTarget.form.remove();
    document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
  }
}


function EditarHandleFormulario() {
  this.handleEvent = function (e) {
    //Crear formulario con plantilla
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");
    //Desactivar el botón Editar (formulario)
    e.currentTarget.setAttribute("disabled", "true");
    //Rellenar formulario con datos del gasto
    formulario.elements.descripcion.value = this.gasto.descripcion;
    formulario.elements.valor.value = this.gasto.valor;
    formulario.elements.fecha.value = this.gasto.fecha;
    formulario.elements.etiquetas.value = this.gasto.etiquetas;
    //Manejador "submit"
    let objManejadorEditarGastoForm = new ManejadorEditarGastoForm();
    objManejadorEditarGastoForm.gasto = this.gasto;
    formulario.addEventListener("submit", objManejadorEditarGastoForm);
    //Manejador "cancelar"
    let objManejadorCancelarGastoForm = new ManejadorCancelar();
    formulario.querySelector("button.cancelar").addEventListener("click", objManejadorCancelarGastoForm);
    //Insertar formulario debajo del gasto
    let contenedor = e.currentTarget.parentNode;
    contenedor.appendChild(plantillaFormulario);
  }
}


function ManejadorEditarGastoForm() {
  this.handleEvent = function (event) {
    event.preventDefault();

    let descripcion = event.currentTarget.elements.descripcion.value;
    let valor = Number(event.currentTarget.elements.valor.value);
    let fecha = new Date(event.currentTarget.elements.fecha.value).toDateString();
    let etiquetas = event.currentTarget.elements.etiquetas.value;

    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarValor(valor);
    this.gasto.actualizarFecha(fecha);
    this.gasto.anyadirEtiquetas(etiquetas.split(","));

    repintar();
  }
}



export {
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb
}