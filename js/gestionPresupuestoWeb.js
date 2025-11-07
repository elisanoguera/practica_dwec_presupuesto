import * as gestionPresupuesto from "./gestionPresupuesto.js";

export function mostrarDatoEnId(idElemento, valor) {
    let elementoSeleccionado = document.getElementById(idElemento);

    if (!elementoSeleccionado) {
        console.log("Elemento con id " + idElemento + " no existe.");
    }else {
        elementoSeleccionado.textContent = valor;
    }
}
export function mostrarGastoWeb(idElemento, gasto) {
    let elementoSeleccionado = document.getElementById(idElemento);
    if (!elementoSeleccionado) {
        console.log("Elemento con id " + idElemento + " no existe.");
    } else {
        let divPrincipal = document.createElement("div");
        divPrincipal.className = "gasto";
        

        let divDescripcion = document.createElement("div");
        divDescripcion .className = "gasto-descripcion";
        divDescripcion .textContent = gasto.descripcion;
        divPrincipal.append(divDescripcion);

        let divFecha = document.createElement("div");
        divFecha.className = "gasto-fecha";
        divFecha.textContent = gasto.fecha;
        divPrincipal.append(divFecha);

        let divValor = document.createElement("div");
        divValor.className = "gasto-valor";
        divValor.textContent = gasto.valor;
        divPrincipal.append(divValor);

        let divEtiquetas = document.createElement("div");
        divEtiquetas.className = "gasto-etiquetas";
    
        for (let etiqueta of gasto.etiquetas){
            let spanEtiqueta = document.createElement ("span");
            spanEtiqueta.className = "gasto-etiquetas-etiqueta";
            spanEtiqueta.textContent = etiqueta;
            divEtiquetas.append(spanEtiqueta);
        }
        divPrincipal.append(divEtiquetas);
        elementoSeleccionado.append(divPrincipal);
    }
}
export function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let elementoSeleccionado = document.getElementById(idElemento);

    let divPrincipal = document.createElement("div");
    divPrincipal.className = "agrupacion";

    let h1 = document.createElement("h1");
    if(periodo === "anyo"){
        periodo = "año";
    }else{
        if(periodo === "mes"){
            periodo = "mes";
        }else{
            if(periodo === "dia"){
                periodo = "día";
            }
        }
    }
    h1.textContent = "Gastos agrupados por " + periodo;
    divPrincipal.append(h1);

    for (let [gastoActual, valor] of Object.entries(agrup)){
        let divGrupo = document.createElement("div")
        divGrupo.className = "agrupacion-dato";

        let spanGastoActual = document.createElement("span");
        spanGastoActual.className = "agrupacion-dato-clave";
        spanGastoActual.textContent = gastoActual;

        let spanValor = document.createElement("span");
        spanValor.className = "agrupacion-dato-valor";
        spanValor.textContent = valor;

        divGrupo.append(spanGastoActual,spanValor);
        divPrincipal.append(divGrupo);
    }

    elementoSeleccionado.append(divPrincipal);
}

function repintar(){
    mostrarDatoEnId("presupuesto",gestionPresupuesto.mostrarPresupuesto());
    
    mostrarDatoEnId("gastos-totales",gestionPresupuesto.calcularTotalGastos());

    mostrarDatoEnId("balance-total",gestionPresupuesto.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML="";
    for(let gasto of gestionPresupuesto.listarGastos()){
        mostrarGastoWeb("listado-gastos-completo",gasto);
    }

}

function actualizarPresupuestoWeb(){
    let promptUsuario = prompt("Introduzca un valor para el presupuesto");
    let numeroUsuario = Number(promptUsuario);

    gestionPresupuesto.actualizarPresupuesto(numeroUsuario);

    repintar();
}

function nuevoGastoWeb(){
    let promptDescripcion = prompt("Introduzca una Descripción para el gasto");
    let promptValor = prompt("Introduzca un Valor para el gasto");
    let promptFecha = prompt("Introduzca una Fecha para el gasto en formato internacional (yyyy-mm-dd)");
    let promptEtiquetas = prompt("Introduzca la o las Etiquetas para el gasto separadas por comas. Por ejemplo: Etiqueta1,Etiquetados,etc...");

    let numeroValor = Number(promptValor);
    let arrayEtiquetas = promptEtiquetas.split(",");

    let gastoNuevo = new gestionPresupuesto.CrearGasto(promptDescripcion, numeroValor, promptFecha, arrayEtiquetas);

    gestionPresupuesto.anyadirGasto(gastoNuevo);

    repintar();

}


let botonPresupuesto = document.getElementById("actualizarpresupuesto");
botonPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

let botonGasto = document.getElementById("anyadirgasto");
botonGasto.addEventListener("click", nuevoGastoWeb);