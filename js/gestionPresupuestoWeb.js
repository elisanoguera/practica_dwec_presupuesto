import * as gesPres from "./gestionPresupuesto.js";


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
  const contenedor = document.querySelector("#" + idElemento);

  const divAgrup = document.createElement("div");
  divAgrup.classList.add("agrupacion");

  let periodoTexto = periodo;
  if (periodo === "dia") periodoTexto = "día";
  if (periodo === "anyo") periodoTexto = "año";

  const titulo = document.createElement("h1");
  titulo.textContent = "Gastos agrupados por " + periodoTexto;
  divAgrup.appendChild(titulo);

  for (let clave in agrup) {
    const divDato = document.createElement("div");
    divDato.classList.add("agrupacion-dato");

    const spanClave = document.createElement("span");
    spanClave.classList.add("agrupacion-dato-clave");
    spanClave.textContent = clave;

    const spanValor = document.createElement("span");
    spanValor.classList.add("agrupacion-dato-valor");
    spanValor.textContent = agrup[clave];

    divDato.appendChild(spanClave);
    divDato.appendChild(spanValor);
    divAgrup.appendChild(divDato);
  }

  contenedor.appendChild(divAgrup);
}

function repintar() {
  
  mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());

  mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());

  mostrarDatoEnId("balance-total", gesPres.calcularBalance());

  //Borrar el contenido de div#listado-gastos-completo, para que el paso siguiente no duplique la información. Puedes utilizar innerHTML para borrar el contenido de dicha capa.
  document.getElementById("listado-gastos-completo").innerHTML = "";

  // Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
  let lista = gesPres.listarGastos();
  for (let gasto of lista) {
    mostrarGastoWeb(gasto);
  }
}



export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}
