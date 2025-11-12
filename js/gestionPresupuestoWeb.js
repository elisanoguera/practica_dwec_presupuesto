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
 
export function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let contenedor = document.getElementById(idElemento);
    if (!contenedor) return;

    let divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion";

    let h1 = document.createElement("h1");
    h1.textContent = "Gastos agrupados por " + periodo;
    divAgrupacion.appendChild(h1);

    for (let clave in agrup) {
        if (agrup.hasOwnProperty(clave)) {
            let divDato = document.createElement("div");
            divDato.className = "agrupacion-dato";

            let spanClave = document.createElement("span");
            spanClave.className = "agrupacion-dato-clave";
            spanClave.textContent = clave;
            divDato.appendChild(spanClave);

            let spanValor = document.createElement("span");
            spanValor.className = "agrupacion-dato-valor";
            spanValor.textContent = Number(agrup[clave]).toFixed(2) + ' €';
            divDato.appendChild(spanValor);

            divAgrupacion.appendChild(divDato);
        }
    }

    contenedor.appendChild(divAgrupacion);
}

function repintar() {
    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

    let lista = document.getElementById("listado-gastos-completo");
    if (lista) {
        lista.innerHTML = "";
        for (let i = 0; i < gestionPresupuesto.listarGastos().length; i++) {
            let gasto = gestionPresupuesto.listarGastos()[i];
            mostrarGastoWeb("listado-gastos-completo", gasto);
        }
    }
}

function actualizarPresupuestoWeb() {
    let entrada = prompt("Introduce el nuevo presupuesto:");
    let valor = Number(entrada);
    if (!isNaN(valor) && valor >= 0) {
        gestionPresupuesto.actualizarPresupuesto(valor);
        repintar();
    }
}

function nuevoGastoWeb() {
    let descripcion = prompt("Descripción:");
    let valorStr = prompt("Valor:");
    let fecha = prompt("Fecha (yyyy-mm-dd):", new Date().toISOString().split('T')[0]);
    let etiquetasStr = prompt("Etiquetas (separadas por comas):", "");

    let valor = Number(valorStr);
    if (isNaN(valor) || valor < 0) return;

    let etiquetas = [];
    if (etiquetasStr) {
        let partes = etiquetasStr.split(",");
        for (let i = 0; i < partes.length; i++) {
            let etiqueta = partes[i].trim();
            if (etiqueta !== "") {
                etiquetas.push(etiqueta);
            }
        }
    }

    let gasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha);
    for (let i = 0; i < etiquetas.length; i++) {
        gasto.anyadirEtiquetas(etiquetas[i]);
    }

    gestionPresupuesto.anyadirGasto(gasto);
    repintar();
}

function EditarHandle(gasto) {
    this.gasto = gasto;
}
EditarHandle.prototype.handleEvent = function() {
    let descripcion = prompt("Nueva descripción:", this.gasto.descripcion);
    let valStr = prompt("Nuevo valor:", this.gasto.valor);
    let fecha = prompt("Nueva fecha (yyyy-mm-dd):", new Date(this.gasto.fecha).toISOString().split('T')[0]);
    let etiqStr = prompt("Nuevas etiquetas (coma):", this.gasto.etiquetas.join(", "));

    let valor = Number(valStr);
    if (!isNaN(valor) && valor >= 0) {
        this.gasto.actualizarValor(valor);
    }
    if (descripcion !== null) this.gasto.actualizarDescripcion(descripcion);
    if (fecha !== null) this.gasto.actualizarFecha(fecha);
    if (etiqStr !== null) {
        this.gasto.etiquetas = [];
        if (etiqStr.trim() !== "") {
            let partes = etiqStr.split(",");
            for (let i = 0; i < partes.length; i++) {
                let etiqueta = partes[i].trim();
                if (etiqueta !== "") {
                    this.gasto.anyadirEtiquetas(etiqueta);
                }
            }
        }
    }
    repintar();
};

function BorrarHandle(gasto) {
    this.gasto = gasto;
}
BorrarHandle.prototype.handleEvent = function() {
    gestionPresupuesto.borrarGasto(this.gasto.id);
    repintar();
};

function BorrarEtiquetasHandle(gasto, etiqueta) {
    this.gasto = gasto;
    this.etiqueta = etiqueta;
}
BorrarEtiquetasHandle.prototype.handleEvent = function() {
    this.gasto.borrarEtiquetas(this.etiqueta);
    repintar();
};