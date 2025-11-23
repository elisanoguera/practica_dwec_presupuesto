import * as libreriaGestionPresupuesto from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento);

    elemento.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto){
    // 1. Buscar el elemento donde se añadirá el gasto
  let elemento = document.getElementById(idElemento);

    // 2. Crear el div principal del gasto
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
  for (let etiqueta of gasto.etiquetas){
    let spanEtiqueta = document.createElement("span");
    spanEtiqueta.className = "gasto-etiquetas-etiqueta";
    spanEtiqueta.textContent = etiqueta + " ";
    divEtiquetas.appendChild(spanEtiqueta);
  }
  div.appendChild(divEtiquetas);
  div.appendChild(document.createElement("br"));

    // 7. Insertar todo en el contenedor final
  elemento.appendChild(div);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

  let periodoTexto = periodo;
  if (periodo == "dia"){
    periodoTexto = "día";
  }
  if (periodo == "anyo"){
    periodoTexto = "año";
  }

  let elemento = document.getElementById(idElemento);
  let div = document.createElement("div");
  div.className = "agrupacion";
  div.innerHTML = `<h1>Gastos agrupados por ${periodoTexto}</h1>`;

  for (let [clave, valor] of Object.entries(agrup)){
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

function repintar(){
  // Mostrar el presupuesto en div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
  libreriaGestionPresupuesto.mostrarPresupuesto();
  mostrarDatoEnId("presupuesto", libreriaGestionPresupuesto.mostrarPresupuesto());
  
  // Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
  mostrarDatoEnId("gastos-totales", libreriaGestionPresupuesto.calcularTotalGastos());
  
  // Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
  mostrarDatoEnId("balance-total", libreriaGestionPresupuesto.calcularBalance());
  
  // Borrar el contenido de div#listado-gastos-completo, para que el paso siguiente no duplique la información. Puedes utilizar innerHTML para borrar el contenido de dicha capa.
  let listadoGastosCompleto = document.getElementById("listado-gastos-completo");
  listadoGastosCompleto.innerHTML = "";
  
  // Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
  for (let gasto of libreriaGestionPresupuesto.listarGastos()){
    mostrarGastoWeb("listado-gastos-completo", gasto);
  }
}


function actualizarPresupuestoWeb(){
  let nuevoPresupuesto = prompt("Introduzca un presupuesto:");
  nuevoPresupuesto = Number(nuevoPresupuesto);
  if (nuevoPresupuesto >= 0){
    libreriaGestionPresupuesto.actualizarPresupuesto(nuevoPresupuesto);
    repintar();
  }
}

let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb(){
  let gastoDescripcion = prompt("Introduzca la DESCRIPCIÓN del gasto:");
  let gastoValor = Number(prompt("Introduzca el VALOR del gasto:"));
  let gastoFecha = prompt("Introduzca la FECHA del gasto (yyyy-mm-dd):");
  let gastoEtiquetas = prompt("Introduzca las ETIQUETAS del gasto separadas por coma (etiqueta1,etiqueta2,etiqueta3):").split(",");

  let gasto = new libreriaGestionPresupuesto.CrearGasto(gastoDescripcion, gastoValor, gastoFecha, gastoEtiquetas);
  libreriaGestionPresupuesto.anyadirGasto(gasto);
  repintar();
}

document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}