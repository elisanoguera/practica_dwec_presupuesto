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
  




function mostrarGastoWeb(idElemento, gasto) {
    // Busco el elemento contenedor
    let elementoContenedor = document.getElementById(idElemento);
    
    
    //Creo la estructura HTML del gasto
    let divGasto = document.createElement("div");
    divGasto.className = "gasto";
    
    // Creo elemento para la descripción
    let divDescripcion = document.createElement("div");
    divDescripcion.className = "gasto-descripcion";
    divDescripcion.textContent = gasto.descripcion;
    
    // Creo elemento para la fecha
    let divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    
    // Creo elemento para el valor
    let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.textContent = gasto.valor + " €";
    
    // Creo contenedor para etiquetas
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



export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}