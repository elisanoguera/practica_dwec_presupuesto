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
    
    // Ensamblar todos los elementos
    divGasto.appendChild(divDescripcion);
    divGasto.appendChild(divFecha);
    divGasto.appendChild(divValor);
    divGasto.appendChild(divEtiquetas);
    
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
  gespre.mostrarDatoEnId("presupuesto", presupuesto.toFixed(2) + " €");

  // Para calcular y mostrar el total de gastos
  let totalGastos = gespre.calcularTotalGastos();
  gespre.mostrarDatoEnId("gastos-totales", totalGastos.toFixed(2) + " €");

  // Para calcular y mostrar el balance actual
  let balance = gespre.calcularBalance();
  gespre.mostrarDatoEnId("balance-total", balance.toFixed(2) + " €");

  // limpia el listado completo antes de volver a generarlo
  let divListado = document.getElementById("listado-gastos-completo");
  divListado.innerHTML = ""; // borra el contenido HTML actual

  // Para listar todos los gastos actuales
  let gastos = gespre.listarGastos();

  // muestra cada gasto en el contenedor del listado
  for (let gasto of gastos) {
    gespre.mostrarGastoWeb("listado-gastos-completo", gasto);
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





export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb
}