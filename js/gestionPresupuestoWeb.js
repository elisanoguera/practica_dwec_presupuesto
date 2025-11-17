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
        divDescripcion.className = "gasto-descripcion";
        divDescripcion.textContent = gasto.descripcion;
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

            let borrarEtiqueta = borrarEtiquetasHandle(gasto, etiqueta);
            spanEtiqueta.addEventListener("click", borrarEtiqueta);

            divEtiquetas.append(spanEtiqueta);
        }
        divPrincipal.append(divEtiquetas);

        let botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.className = "gasto-editar";

        let editarGasto = editarHandle(gasto);

        botonEditar.addEventListener("click", editarGasto);
        divPrincipal.append(botonEditar);

        let botonBorrar = document.createElement("button");
        botonBorrar.textContent = "Borrar";
        botonBorrar.className = "gasto-borrar";

        let borrarGasto = borrarHandle(gasto);
        
        botonBorrar.addEventListener("click", borrarGasto);
        divPrincipal.append(botonBorrar);

        let botonEditarFormulario = document.createElement("button");
        botonEditarFormulario.textContent = "Editar (formulario)";
        botonEditarFormulario.className = "gasto-editar-formulario";

        let editarGastoFormulario = editarHandleFormulario(gasto);

        botonEditarFormulario.addEventListener("click", editarGastoFormulario);
        divPrincipal.append(botonEditarFormulario);

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

function editarHandle(gasto){

    let editarGasto = {gastoActual:gasto, handleEvent:function(){
    let nuevaDescripcion = prompt("Edita la Descripción actual:", this.gastoActual.descripcion);
    if (nuevaDescripcion === null){
        nuevaDescripcion = this.gastoActual.descripcion;
    }
    this.gastoActual.actualizarDescripcion(nuevaDescripcion);

    let nuevoValor = prompt("Edita el Valor actual:", this.gastoActual.valor);
    if(nuevoValor === null){
        nuevoValor = this.gastoActual.valor;
    }
    let nuevoValorNum = Number(nuevoValor);
    this.gastoActual.actualizarValor(nuevoValorNum);

    let nuevaFecha = prompt("Edita la Fecha actual en formato internacional (yyyy-mm-dd):", this.gastoActual.fecha);
    if(nuevaFecha === null){
        nuevaFecha = this.gastoActual.fecha;
    }
    this.gastoActual.actualizarFecha(nuevaFecha);

    let nuevasEtiquetas = prompt("Edita las Etiquetas actuales para el gasto separadas por comas. Por ejemplo: Etiqueta1,Etiquetados,etc...",this.gastoActual.etiquetas);
    if(nuevasEtiquetas === null){
        nuevasEtiquetas = this.gastoActual.etiquetas;
    }
    let nuevasEtiquetasArray = nuevasEtiquetas.split(",");
    this.gastoActual.anyadirEtiquetas(nuevasEtiquetasArray);

    repintar();
    }
    }
    return editarGasto;
}

function borrarHandle(gasto) {
    let borrarGasto = {gastoActual: gasto, handleEvent: function() {
        gestionPresupuesto.borrarGasto(this.gastoActual.id);
        repintar();
    }
    };
    return borrarGasto;
}

function borrarEtiquetasHandle(gasto,etiqueta){
    let borrarEtiquetas = {gastoActual:gasto, etiquetaActual:etiqueta, handleEvent: function(){
        this.gastoActual.borrarEtiquetas(this.etiquetaActual);
        repintar();
    }}
    return borrarEtiquetas;
}

function nuevoGastoWebFormulario(){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");
    let botonAnyadir = document.getElementById("anyadirgasto-formulario");
    botonAnyadir.setAttribute("disabled", "");
    
    formulario.addEventListener("submit",function(event){
        event.preventDefault()
        let formularioActual = event.currentTarget;

        let nuevoGasto = new gestionPresupuesto.CrearGasto(
            formularioActual.querySelector("input[name=descripcion]").value,
            Number(formularioActual.querySelector("input[name=valor]").value),
            formularioActual.querySelector("input[name=fecha]").value,
            formularioActual.querySelector("input[name=etiquetas]").value
        )
    gestionPresupuesto.anyadirGasto(nuevoGasto);
    repintar();
    botonAnyadir.removeAttribute("disabled");
    
    })

    let borrarFormulario = {handleEvent: function(){
        formulario.remove();
        botonAnyadir.removeAttribute("disabled");
    }}

    formulario.querySelector("button.cancelar").addEventListener("click", borrarFormulario);
    
    let controles = document.getElementById("controlesprincipales");
    controles.appendChild(plantillaFormulario);
}
function editarHandleFormulario(gasto){
    return{
        handleEvent: function(event){
            let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
            var formulario = plantillaFormulario.querySelector("form");

            let descripcionAEditar = formulario.querySelector("input[name=descripcion]");
            let valorAEditar = Number(formulario.querySelector("input[name=valor]"));
            let fechaAEditar = formulario.querySelector("input[name=fecha]");
            let etiquetasAEditar = formulario.querySelector("input[name=etiquetas]");
            
            descripcionAEditar.value = gasto.descripcion;
            valorAEditar.value = gasto.valor;
            fechaAEditar.value = gasto.fecha;
            etiquetasAEditar.value = gasto.etiquetas;

            let botonAnyadir = document.getElementById("anyadirgasto-formulario");
            botonAnyadir.setAttribute("disabled", "");
            
            let actualizarEditado = {handleEvent:(evnt){
                evnt.preventDefault();
                
                let nuevaDescripcion = formulario.querySelector("input[name=descripcion]").value;
                let nuevoValor = Number(formulario.querySelector("input[name=valor]").value);
                let nuevaFecha = formulario.querySelector("input[name=fecha]").value;
                let nuevasEtiquetas = formulario.querySelector("input[name=etiquetas]").value;

                gasto.actualizarDescripcion = nuevaDescripcion;
                gasto.actualizarValor = nuevoValor;
                gasto.actualizarFecha = nuevaFecha;
                gasto.anyadirEtiquetas = nuevasEtiquetas.join(",");
                
                repintar();
            }}
        }
        
    } 
}

let botonPresupuesto = document.getElementById("actualizarpresupuesto");
botonPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

let botonGasto = document.getElementById("anyadirgasto");
botonGasto.addEventListener("click", nuevoGastoWeb);

let botonGastoForm = document.getElementById("anyadirgasto-formulario");
botonGastoForm.addEventListener("click", nuevoGastoWebFormulario);
