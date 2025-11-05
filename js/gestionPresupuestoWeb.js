function mostrarDatoEnId(idElemento, valor) {
    var elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = valor;
    }
}

function mostrarGastoWeb(idElemento, gasto) {
    var contenedor = document.getElementById(idElemento);
    if (!contenedor) return;

    var divGasto = document.createElement("div");
    divGasto.className = "gasto";

    var divDescripcion = document.createElement("div"); 
    divDescripcion.className = "gasto-descripcion";
    divDescripcion.textContent = gasto.descripcion;
    divGasto.appendChild(divDescripcion);

    var divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    divFecha.textContent = new Date(gasto.fecha).toLocaleString();
    divGasto.appendChild(divFecha);

    var divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.textContent = gasto.valor.toFixed(2) + " €";
    divGasto.appendChild(divValor); 

    var divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";
    for (var i = 0; i < gasto.etiquetas.length; i++) {
        var spanEtiqueta = document.createElement("span");
        spanEtiqueta.className = "gasto-etiquetas-etiqueta";
        spanEtiqueta.textContent = gasto.etiquetas[i];
        divEtiquetas.appendChild(spanEtiqueta);
    }
    divGasto.appendChild(divEtiquetas);

    contenedor.appendChild(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    var contenedor = document.getElementById(idElemento);
    if (!contenedor) return;

    var divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion";

    var h1 = document.createElement("h1");
    h1.textContent = "Gastos agrupados por " + periodo;
    divAgrupacion.appendChild(h1);

    for (var clave in agrup) {
        if (agrup.hasOwnProperty(clave)) {
            var divDato = document.createElement("div");
            divDato.className = "agrupacion-dato";

            var spanClave = document.createElement("span");
            spanClave.className = "agrupacion-dato-clave";
            spanClave.textContent = clave;
            divDato.appendChild(spanClave);

            var spanValor = document.createElement("span");
            spanValor.className = "agrupacion-dato-valor";
            spanValor.textContent = Number(agrup[clave]).toFixed(2) + ' €';
            divDato.appendChild(spanValor);

            divAgrupacion.appendChild(divDato);
        }
    }

    contenedor.appendChild(divAgrupacion);
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};