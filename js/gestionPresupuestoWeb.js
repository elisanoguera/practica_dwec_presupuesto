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
            spanEtiqueta.textContent = gasto.etiquetas[i];
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
    // Busca el elemento contenedor
    let elementoContenedor = document.getElementById(idElemento);
    
    //Verifico que el elemento existe
    if (!elementoContenedor) {
        console.error(`Elemento con id "${idElemento}" no encontrado`);
        return;
    }
    
    //Creo el contenedor principal de agrupación
    let divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion";
    
    
    
    // Obtener todas las claves (períodos) del objeto agrup
    let claves = Object.keys(agrup);
    
    // Creo un elemento por cada período en la agrupación
    for (let i = 0; i < claves.length; i++) {
        let clave = claves[i];
        let valor = agrup[clave];
        
        // Creo un contenedor del dato
        let divDato = document.createElement("div");
        divDato.className = "agrupacion-dato";
        
        // Crear span para la clave (período)
        let spanClave = document.createElement("span");
        spanClave.className = "agrupacion-dato-clave";
        spanClave.textContent = clave;
        
        // Crear span para el valor (total)
        let spanValor = document.createElement("span");
        spanValor.className = "agrupacion-dato-valor";
        spanValor.textContent = valor + " €";
        
        // Ensamblar
        divDato.appendChild(spanClave);
        divDato.appendChild(spanValor);
        divAgrupacion.appendChild(divDato);
    }
    
    // Añadido la agrupación completa al contenedor
    elementoContenedor.appendChild(divAgrupacion);
}




export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}