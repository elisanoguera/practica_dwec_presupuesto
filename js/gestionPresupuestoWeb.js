

function mostrarDatosEnId(idElemento, valor) {

    document.querySelector("#" + idElemento).textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {

    var divGasto = document.createElement("div");
    divGasto.className = "gasto";

    var divDescripcion = document.createElement("div");
    divDescripcion.className = "gasto-descripcion";
    divDescripcion.textContent = gasto.descripcion;
    divGasto.appendChild(divDescripcion);

    var divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    divFecha.textContent = new Date(gasto.fecha).toISOString().substr(0, 10);
    divGasto.appendChild(divFecha);

    var divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.textContent = gasto.valor;
    divGasto.appendChild(divValor);

    var divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";
    divGasto.appendChild(divEtiquetas);

    for (let etiqueta of gasto.etiquetas) {
        let divEtiqueta = document.createElement("span");
        divEtiqueta.className = "gasto-etiquetas-etiqueta";
        divEtiqueta.textContent = etiqueta;
        divEtiquetas.appendChild(divEtiqueta);
    }

    document.getElementById(idElemento).appendChild(divGasto);
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {

    let periodoTexto = "";
    switch (periodo) {
        case "anyo":
            periodoTexto = "año";
            break;
        case "mes":
            periodoTexto = "mes";
            break;
        case "dia":
        default:
            periodoTexto = "día";
            break;
    }
    
    var divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion"

    var tituloAgrup = document.createElement("h1");
    tituloAgrup.textContent = `Gastos agrupados por ${periodoTexto}`;
    divAgrupacion.appendChild(tituloAgrup);

    for (let clave in agrup) {
        var divDato = document.createElement('div');
        divDato.className = 'agrupacion-dato';
        divAgrupacion.appendChild(divDato);

        var spanClave = document.createElement('span');
        spanClave.className = 'agrupacion-dato-clave';
        spanClave.textContent = clave;
        divDato.appendChild(spanClave);

        var spanValor = document.createElement('span');
        spanValor.className = 'agrupacion-dato-valor';
        spanValor.textContent = agrup[clave];
        divDato.appendChild(spanValor);
    }
    var divPeriodo = document.getElementById(idElemento);
    divPeriodo.innerHTML = "";

    divPeriodo.appendChild(divAgrupacion);
}

export {
    mostrarDatosEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}