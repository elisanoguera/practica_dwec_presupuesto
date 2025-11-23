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
  mostrarGastoWeb("listado-gastos-completo", libreriaGestionPresupuesto.listarGastos());
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

/*
Función nuevoGastoWeb y botón anyadirgasto

Esta función se utilizará como manejadora de eventos del botón anyadirgasto del código HTML. 
Realizará las siguientes tareas:

    Pedir al usuario la información necesaria para crear un nuevo gasto mediante sucesivas preguntas
     con prompt (por orden: descripción, valor, fecha y etiquetas). Por simplicidad, 
     de momento no se comprobará la validez de dichos datos. 
    La fecha vendrá dada en formato internacional (yyyy-mm-dd) y las etiquetas se introducirán en un único
     cuadro de texto como una lista separada por comas (por ejemplo, etiqueta1,etiqueta2,etiqueta3).
    Convertir el valor a número (recuerda que prompt siempre devuelve un string).
    Convertir la cadena de texto de etiquetas devuelta por prompt a un array.
    Crear un nuevo gasto (función crearGasto). ¡Ojo con la manera de pasar el parámetro ~etiquetas~!
    Añadir el gasto a la lista (función anyadirGasto).
    Llamar a la función repintar para que se muestre la lista con el nuevo gasto.

Una vez definida la función, se añadirá como manejadora del evento click del botón anyadirgasto 
mediante addEventListener. Para ello habrá que obtener el elemento botón correspondiente previamente.
*/ 

function nuevoGastoWeb(){
  let gastoDescripcion = prompt("Introduzca la DESCRIPCIÓN del gasto:");
  let gastoValor = prompt("Introduzca el VALOR del gasto:");
  let gastoFecha = prompt("Introduzca la FECHA del gasto (yyyy-mm-dd):");
  let gastoEtiquetas = prompt("Introduzca las ETIQUETAS del gasto separadas por coma (etiqueta1,etiqueta2,etiqueta3):");

  gastoValor = Number(gastoValor);
  gastoEtiquetas = gastoEtiquetas.split(",");

  let gasto = libreriaGestionPresupuesto.CrearGasto(gastoDescripcion, gastoValor, gastoFecha, gastoEtiquetas);
  libreriaGestionPresupuesto.anyadirGasto(gasto);
  repintar();
}

document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}