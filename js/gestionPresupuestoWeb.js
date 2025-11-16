
function mostrarDatoEnId(idElemento, valor) {
 document.querySelector("#" + idElemento).textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
  const contenedor = document.querySelector("#" + idElemento);

  const divGasto = document.createElement("div");
  divGasto.classList.add("gasto");

  // descripción
  const divDesc = document.createElement("div");
  divDesc.classList.add("gasto-descripcion");
  divDesc.textContent = gasto.descripcion;
  divGasto.appendChild(divDesc);

  // fecha
  const divFecha = document.createElement("div");
  divFecha.classList.add("gasto-fecha");
  divFecha.textContent = gasto.fecha;
  divGasto.appendChild(divFecha);

  // valor
  const divValor = document.createElement("div");
  divValor.classList.add("gasto-valor");
  divValor.textContent = gasto.valor + " €";
  divGasto.appendChild(divValor);

  // etiquetas
  const divEtiquetas = document.createElement("div");
  divEtiquetas.classList.add("gasto-etiquetas");
  for (let etiqueta of gasto.etiquetas) {
    const span = document.createElement("span");
    span.classList.add("gasto-etiquetas-etiqueta");
    span.textContent = etiqueta;
    divEtiquetas.appendChild(span);
  }
  divGasto.appendChild(divEtiquetas);

  contenedor.appendChild(divGasto);
}



function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}
