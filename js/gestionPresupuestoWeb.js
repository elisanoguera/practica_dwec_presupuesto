import * as gestionPresupuesto from './gestionPresupuesto.js';

export function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = valor;
    }
}

export function mostrarGastoWeb(idElementoLista, gasto) {
    let lista = document.getElementById(idElementoLista);
    if (!lista) return;

    let divGasto = document.createElement("div");
    divGasto.className = "gasto";


let descripcion = document.createElement("div");
    descripcion.className = "gasto-descripcion";
    descripcion.textContent = gasto.descripcion;
    divGasto.appendChild(descripcion);

let fecha = document.createElement("div");
    fecha.className = "gasto-fecha";
    fecha.textContent = new Date(gasto.fecha).toLocaleString();
    divGasto.appendChild(fecha);

    let valor = document.createElement("div");
    valor.className = "gasto-valor";
    valor.textContent = gasto.valor.toFixed(2) + " €";
    divGasto.appendChild(valor);

    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";

    for (let i = 0; i < gasto.etiquetas.length; i++) {
        let etiqueta = gasto.etiquetas[i];
        let span = document.createElement("span");
        span.className = "gasto-etiquetas-etiqueta";
        span.textContent = etiqueta;

        let manejadorBorrarEtiqueta = new BorrarEtiquetasHandle(gasto, etiqueta);
        span.addEventListener("click", manejadorBorrarEtiqueta);

        divEtiquetas.appendChild(span);
    }
    divGasto.appendChild(divEtiquetas);

    let btnEditar = document.createElement("button");
        btnEditar.type = "button";
        btnEditar.className = "gasto-editar";
        btnEditar.textContent = "Editar";

    let manejadorEditar = new EditarHandle(gasto);
        btnEditar.addEventListener("click", manejadorEditar);
        divGasto.appendChild(btnEditar);

    let btnBorrar = document.createElement("button");
    btnBorrar.type = "button";
    btnBorrar.className = "gasto-borrar";
    btnBorrar.textContent = "Borrar";

    let manejadorBorrar = new BorrarHandle(gasto);
    btnBorrar.addEventListener("click", manejadorBorrar);
    divGasto.appendChild(btnBorrar);

    lista.appendChild(divGasto);
}
