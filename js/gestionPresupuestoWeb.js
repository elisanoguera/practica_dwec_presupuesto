import { agruparGastos } from "./gestionPresupuesto.js";

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
  let elemento = document.getElementById(idElemento);
  let div = document.createElement("div");
  div.className = "agrupacion";
  div.innerHTML = `<h1>Gastos agrupados por ${periodo}</h1>`;

  agrup = agruparGastos(periodo);

  for (let [clave, valor] of Object.entries(agrup)){
    let divAgrupacionDato = document.createElement("div");
    divAgrupacionDato.className = "agrupacion-dato";

    let spanClave = document.createElement("span");
    spanClave.className = "agrupacion-dato-clave";
    spanClave.innerHTML = clave;
    divAgrupacionDato.appendChild(spanClave);

    let spanValor = document.createElement("span");
    spanValor.className = "agrupacion-dato-valor";
    spanValor.innerHTML = valor;
    divAgrupacionDato.appendChild(spanValor);

      //Se añade el dato al div principal "agrupacion"
    div.appendChild(divAgrupacionDato);
  }
  
  elemento.appendChild(div);
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}