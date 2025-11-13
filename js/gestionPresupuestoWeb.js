// importa libreria
import * as gespre from './gestionPresupuesto.js';

// Muestra un valor (texto o número) dentro de un elemento HTML por su id
function mostrarDatoEnId(idElemento, valor) {
  // Busco en el documento el elemento con ese id
  let elemento = document.getElementById(idElemento);

  // Si existe el elemento 
  if (elemento) {
    // Le colocamos el valor que queremos mostrar
    elemento.textContent = valor;
    } else {
        console.error(`Elemento con id "${idElemento}" no encontrado`);
    }
  }
  



// esta funcion recibe el id del elemento contenedor y un objeto gasto (recordemos que gasto tiene: descripcion, fecha, valor, etiquetas)
function mostrarGastoWeb(idElemento, gasto) {
    // Busco el elemento contenedor
    let elementoContenedor = document.getElementById(idElemento);
    
    
    //Creo la estructura HTML del gasto
    let divGasto = document.createElement("div");
    divGasto.className = "gasto";                       // <div class="gasto">
    
    // Creo elemento para la descripción
    let divDescripcion = document.createElement("div");
    divDescripcion.className = "gasto-descripcion";
    divDescripcion.textContent = gasto.descripcion;     // <div class="gasto-descripcion">compra mercado</div>
    
    // Creo elemento para la fecha
    let divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    
    // Creo elemento para el valor
    let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.textContent = gasto.valor + " €";
    
    // Creo contenedor para etiquetas (etiquetas es un array dentro del objeto gasto)
    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";
    
    // Creo elementos para cada etiqueta
    if (gasto.etiquetas && gasto.etiquetas.length > 0) {
        for (let i = 0; i < gasto.etiquetas.length; i++) {
            let spanEtiqueta = document.createElement("span");
            spanEtiqueta.className = "gasto-etiquetas-etiqueta";
            spanEtiqueta.textContent = gasto.etiquetas[i] + "";
            divEtiquetas.appendChild(spanEtiqueta);
        }
    }

    //BOTÓN EDITAR 
    let botonEditar = document.createElement("button");
    botonEditar.type = "button";
    botonEditar.className = "gasto-editar";
    botonEditar.textContent = "Editar";
    
    //BOTÓN BORRAR  
    let botonBorrar = document.createElement("button");
    botonBorrar.type = "button";
    botonBorrar.className = "gasto-borrar";
    botonBorrar.textContent = "Borrar";

    // Asignar manejadores de eventos a los botones
    let editarHandler = new EditarHandle();
    editarHandler.gasto = gasto;
    botonEditar.addEventListener("click", editarHandler);

    let borrarHandler = new BorrarHandle();
    borrarHandler.gasto = gasto;
    botonBorrar.addEventListener("click", borrarHandler);
    
    // Ensamblar todos los elementos
    divGasto.appendChild(divDescripcion);
    divGasto.appendChild(divFecha);
    divGasto.appendChild(divValor);
    divGasto.appendChild(divEtiquetas);
     divGasto.appendChild(botonEditar);
    divGasto.appendChild(botonBorrar);  
    
    // Añadir el gasto al contenedor
    elementoContenedor.appendChild(divGasto);
}



function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
  // obtener el contenedor donde se mostrará todo
  let contenedor = document.getElementById(idElemento);

  // creo el <div> principal con clase "agrupacion"
  let divAgrupacion = document.createElement("div");
  divAgrupacion.classList.add("agrupacion");

  // traducir el texto del periodo para mostrarlo en el título
  let textoPeriodo = "";
  if (periodo === "dia") textoPeriodo = "día";
  else if (periodo === "mes") textoPeriodo = "mes";
  else if (periodo === "anyo") textoPeriodo = "año";

  // Crear el título <h1> con el texto traducido
  let titulo = document.createElement("h1");
  titulo.textContent = "Gastos agrupados por " + textoPeriodo;
  divAgrupacion.append(titulo);

  // Recorrer el objeto 'agrup'
  // Para cada propiedad (clave-valor) del objeto, crearemos un bloque <div>
  for (let clave in agrup) {
    // Creamos un div para cada dato agrupado
    let divDato = document.createElement("div");
    divDato.classList.add("agrupacion-dato");

    // Creamos el span para la clave (por ejemplo "2021-09")
    let spanClave = document.createElement("span");
    spanClave.classList.add("agrupacion-dato-clave");
    spanClave.textContent = clave + " - ";

    // Creamos el span para el valor (por ejemplo 5)
    let spanValor = document.createElement("span");
    spanValor.classList.add("agrupacion-dato-valor");
    spanValor.textContent = agrup[clave].toFixed(2) + " €";

    // Añadimos ambos <span> dentro del div
    divDato.append(spanClave);
    divDato.append(spanValor);

    // Añadimos este divDato dentro del divAgrupacion
    divAgrupacion.append(divDato);
  }

  // Pasamos la agrupación completa al contenedor principal
  contenedor.append(divAgrupacion);
}

function repintar() {
  // Mostrar el presupuesto total
  let presupuesto = gespre.mostrarPresupuesto();
  mostrarDatoEnId("presupuesto", presupuesto);

  // Para calcular y mostrar el total de gastos
  let totalGastos = gespre.calcularTotalGastos();
  mostrarDatoEnId("gastos-totales", totalGastos);

  // Para calcular y mostrar el balance actual
  let balance = gespre.calcularBalance();
  mostrarDatoEnId("balance-total", balance);

  // limpia el listado completo antes de volver a generarlo
  let divListado = document.getElementById("listado-gastos-completo");
  divListado.innerHTML = ""; // borra el contenido HTML actual

  // Para listar todos los gastos actuales
  let gastos = gespre.listarGastos();

  // muestra cada gasto en el contenedor del listado
  for (let gasto of gastos) {
    mostrarGastoWeb("listado-gastos-completo", gasto);
  }
}


// Esta función se encarga de pedir un nuevo presupuesto al usuario
function actualizarPresupuestoWeb() {
  // pedir el nuevo valor mediante un prompt
  let nuevoPresupuesto = prompt("Introduce el nuevo presupuesto: ");

// Convertimos el texto a número
 nuevoPresupuesto = Number(nuevoPresupuesto);

  // verificamos que sea un número válido
  if (isNaN(nuevoPresupuesto) || nuevoPresupuesto < 0) {
    alert("Por favor, introduce un número válido.");
    return;
  }

  // actualizamos el valor en el modelo de datos
  gespre.actualizarPresupuesto(nuevoPresupuesto);

  // repintamos la interfaz para mostrar el nuevo valor
  repintar();
}

// Asociación de eventos
// Esperamos a que el contenido del DOM esté cargado completamente

  // Obtenemos el botón con id "actualizarpresupuesto" 
  let botonActualizar = document.getElementById("actualizarpresupuesto");

  // Asignamos la función como manejadora del clic
  botonActualizar.addEventListener("click", actualizarPresupuestoWeb);



// Función manejadora para crear un nuevo gasto
function nuevoGastoWeb() {
  //Pedir los datos al usuario con prompt
  let descripcion = prompt("Introduce la descripción del gasto:");
  let valor = Number(prompt("Introduce el valor del gasto (€):"));
  let fecha = prompt("Introduce la fecha (formato yyyy-mm-dd):");
  let etiquetasTexto = prompt("Introduce las etiquetas separadas por comas (ej: casa,comida,ocio):");

  //Convertimos las etiquetas a un array
  let etiquetas = etiquetasTexto.split(",");

  //  Creamos el gasto con la función de la librería gestionPresupuesto.js
  let gasto = new gespre.CrearGasto(descripcion, valor, fecha, ...etiquetas);

  //  Lo añadimos al listado de gastos
  gespre.anyadirGasto(gasto);

  //  Repintamos todo para que se actualice la interfaz
  repintar();
}

  // Botón para añadir gasto
  let botonAnyadir = document.getElementById("anyadirgasto");
  botonAnyadir.addEventListener("click", nuevoGastoWeb);



  // Función constructora EditarHandle
function EditarHandle(gasto) {
  // Asignamos la referencia al gasto que se va a editar
  this.gasto = gasto;
}
// Definimos el método que actuará como manejador del evento click
EditarHandle.prototype.handleEvent = function (event) {
  // Pedimos los nuevos datos al usuario con los prompts
  let nuevaDescripcion = prompt("Introduce la nueva descripción:", this.gasto.descripcion);
  let nuevoValor = prompt("Introduce el nuevo valor:", this.gasto.valor);
  let nuevaFecha = prompt(
    "Introduce la nueva fecha (formato yyyy-mm-dd):",
    new Date(this.gasto.fecha).toISOString().slice(0, 10)
  );
  let nuevasEtiquetasTexto = prompt(
    "Introduce las nuevas etiquetas (separadas por comas):",
    this.gasto.etiquetas.join(",")
  );

  // Convertimos el valor a número
  nuevoValor = Number(nuevoValor);

  // Convertimos las etiquetas a array quitando espacios
  let nuevasEtiquetas;
  if (nuevasEtiquetasTexto) {
      nuevasEtiquetas = nuevasEtiquetasTexto.split(",").map(function(etiqe) {
          return etiqe.trim();
      });
  } else {
      nuevasEtiquetas = [];
  }

  // Actualizamos las propiedades del gasto
  this.gasto.actualizarDescripcion(nuevaDescripcion);
  this.gasto.actualizarValor(nuevoValor);
  this.gasto.actualizarFecha(nuevaFecha);

  // Limpiamos y añadimos nuevas etiquetas
  this.gasto.etiquetas = [];
  this.gasto.anyadirEtiquetas.apply(this.gasto, nuevasEtiquetas);

  // Repintamos la interfaz
  repintar();
};


// Función constructora BorrarHandle
function BorrarHandle(gasto) {
  // Asignamos la referencia al gasto que se va a borrar
  this.gasto = gasto;
}
// Definimos el método que actuará como manejador del evento click
BorrarHandle.prototype.handleEvent = function (event) {
  // Pedimos confirmación al usuario antes de borrar
  if (confirm("¿Estás seguro de que quieres borrar el gasto: '" + this.gasto.descripcion + "'?")) {
    // Borramos el gasto usando su id
    gespre.borrarGasto(this.gasto.id);
    
    // Repintamos la interfaz para mostrar la lista actualizada
    repintar();
  }
}



export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle
}