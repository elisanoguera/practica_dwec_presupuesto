//import { createElement } from "react";

//importamos gestion presupuesto para poder utilizar sus funciones
import * as gpre from './gestionPresupuesto.js';

//Creamos la funcion de mostrar dato en id
function mostrarDatoEnId(idElemento, valor){

    var aux = document.getElementById(idElemento);
    if(!aux){
        return;
    }
    
    aux.textContent = String(valor);

}

function mostrarGastoWeb(idElemento, gasto){

    var aux = document.getElementById(idElemento);
    if(!aux) return;

    //Clase gasto
    var gastoDiv = document.createElement('div');
    gastoDiv.className = 'gasto';

    //Descripcion del gasto
    var descrDiv = document.createElement('div');
    descrDiv.className = 'gasto-descripcion';
    descrDiv.textContent = gasto.descripcion || '';
    gastoDiv.appendChild(descrDiv);

    //Fecha del gasto
    var fechaDiv = document.createElement('div');
    fechaDiv.className = 'gasto-fecha';
    try{
        var fechaObj;
        if(gasto && gasto.fecha){
            fechaObj = new Date(gasto.fecha);
        }else{
            fechaObj = new Date(0);
        }

        fechaDiv.textContent = fechaObj.toLocaleString();
    }catch (e){
        fechaDiv.textContent = '';
    }
    gastoDiv.appendChild(fechaDiv);

    //Valor del gasto
    var valorDiv = document.createElement('div');
    valorDiv.className = 'gasto-valor';

    var num = Number(gasto.valor);
    if(!isNaN(num)){
        valorDiv.textContent = num.toFixed(2) + ' €';
    }else{
        valorDiv.textContent = '0,00 €';
    }

    gastoDiv.appendChild(valorDiv);


    //Etiquetas del gasto
    var EtiqDiv = document.createElement('div');
    EtiqDiv.className = 'gasto-etiquetas';

   if (Array.isArray(gasto.etiquetas) && gasto.etiquetas.length > 0) {

    gasto.etiquetas.forEach(et => {
        const span = document.createElement("span");
        span.className = "gasto-etiquetas-etiqueta";
        span.textContent = et;

        // Manejador borrar etiqueta
        const manejadorEtiqueta = new BorrarEtiquetasHandle();
        manejadorEtiqueta.gasto = gasto;
        manejadorEtiqueta.etiqueta = et;

        span.addEventListener("click", manejadorEtiqueta);
        EtiqDiv.appendChild(span);
        });
        
    }else{
        var spanNone = document.createElement('span');
        spanNone.className = 'gasto-etiquetas-etiqueta';
        spanNone.textContent = 'Ninguna';
        EtiqDiv.appendChild(spanNone);
    }

    gastoDiv.appendChild(EtiqDiv);


    //Añadimos todo el gasto completo al bloque
    aux.appendChild(gastoDiv);

    const btnEditar = document.createElement("button");
    btnEditar.type = "button";
    btnEditar.className = "gasto-editar";
    btnEditar.textContent = "Editar";

    const manejadorEditar = new EditarHandle();
    manejadorEditar.gasto = gasto;

    btnEditar.addEventListener("click", manejadorEditar);
    gastoDiv.appendChild(btnEditar);

    // --- Botón Borrar ---
    const btnBorrar = document.createElement("button");
    btnBorrar.type = "button";
    btnBorrar.className = "gasto-borrar";
    btnBorrar.textContent = "Borrar";

    const manejadorBorrar = new BorrarHandle();
    manejadorBorrar.gasto = gasto;

    btnBorrar.addEventListener("click", manejadorBorrar);
    gastoDiv.appendChild(btnBorrar);

    

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    
    var cont = document.getElementById(idElemento);
    if(!cont) return;


    var agrupDiv = document.createElement('div');
    agrupDiv.className = 'agrupacion';

    var h1 = document.createElement('h1');
    var periodoTexto = 'periodo';
    if(periodo == 'dia'){
        periodoTexto = 'día';
    }else if(periodo == 'mes'){
        periodoTexto = 'mes';
    }else if(periodo == 'anyo'){
        periodoTexto = 'año';
    }

    h1.textContent = `Gastos agrupados por ${periodoTexto}`;
    agrupDiv.appendChild(h1);

    var keys = Object.keys(agrup);
    for(var i = 0; i < keys.length; i++){
        var key = keys[i];
        var val = agrup[key];

        var datoDiv = document.createElement('div');
        datoDiv.className = 'agrupacion-dato';

        var claveSpan = document.createElement('span');
        claveSpan.className = 'agrupacion-dato-clave';
        claveSpan.textContent = key;

        var valorSpan = document.createElement('span');
        valorSpan.className = 'agrupacion-dato-valor';
        if(typeof val === 'number'){
            valorSpan.textContent = val;
        }else{
            valorSpan.textContent = String(val);
        }
        
        datoDiv.appendChild(claveSpan);
        datoDiv.appendChild(valorSpan);

        agrupDiv.appendChild(datoDiv);
    }

    cont.appendChild(agrupDiv);

}

//Generamos la funcion para que cambie los textos del html cuando los modifiquemos
function repintar(){

    mostrarDatoEnId('presupuesto', gpre.mostrarPresupuesto());
    const total = gpre.calcularTotalGastos().toFixed(2) + ' €';
    mostrarDatoEnId('gastos-totales', total);


    const balance = gpre.calcularBalance().toFixed(2) + ' €';
    mostrarDatoEnId('balance-total', balance);

    const cont = document.getElementById('listado-gastos-completo');
    if(cont) cont.innerHTML = '';

    const todos = gpre.listarGastos();
    for(var i = 0; i < todos.length; i++){
        mostrarGastoWeb('listado-gastos-completo', todos[i]);
    }
}

function actualizarPresupuestoWeb(){
    var valor = prompt("Introduce el valor del presupuesto: ");

    if(valor === null){
        return;
    }

    var numero = Number(valor);
    if(isNaN(numero)){
        alert("El valor introducido no es un numero valido.");
    }

    gpre.actualizarPresupuesto(numero);

    repintar();
}

document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);


function nuevoGastoWeb(){

    const desc = prompt("Introduce la descripcion del gasto");
    if(desc === null){
        return;
    }

    const StrinValor = prompt("Introduce el valor del nuevo gasto:");
    if(StrinValor === null){
        return;
    }

    const fecha = prompt("Introduce la fecha del gasto (yyyy-mm-dd):");
    if(fecha === null){
        return;
    }

    const etiquetasStr = prompt("Introduce la etiquetas separadas por comas:");
    if(etiquetasStr === null){
        return;
    }

    const valor = Number(StrinValor);

    const etiquetas = etiquetasStr
        .split(",")
        .map(e => e.trim())
        .filter(e => e.length > 0);


    const gasto = new gpre.CrearGasto(desc, valor, fecha, etiquetas);

    gpre.anyadirGasto(gasto);

    repintar();

}

document.getElementById('anyadirgasto').addEventListener("click", nuevoGastoWeb);


//Creamos la funcion constructoro vacia
function EditarHandle(){

}

//Llamamos a la funcion constructoro con el prototipo donde se generan todos los cambios
EditarHandle.prototype.handleEvent = function(){

    var nuevaDescripcion = prompt("Introduce la nueva descripción del gasto:", this.gasto.descripcion);
    if(nuevaDescripcion === null){
        return;
    }

    var nuevoValorTexto = prompt("Introduce el nuevo valor del gasto:", this.gasto.valor);
    if(nuevoValorTexto === null){
        return;
    }

    var nuevaFecha = prompt("Introduce la fecha del nuevo gasto(yyyy-mm-dd):", this.gasto.fecha);
    if(nuevaFecha === null){
        return;
    }

    var nuevasEtiquetasTexto = prompt("Introduce las etiquetas separadas por comas:", this.gasto.etiquetas);
    if(nuevasEtiquetasTexto === null){
        return;
    }

    var nuevoValor = Number(nuevoValorTexto);

    var nuevasEtiquetas = nuevasEtiquetasTexto.split(",").map(function(et){
        return et.trim();
    });


    this.gasto.actualizarDescripcion(nuevaDescripcion);
    this.gasto.actualizarValor(nuevoValor);
    this.gasto.actualizarFecha(nuevaFecha);
    this.gasto.anyadirEtiquetas(nuevasEtiquetas);

    repintar();
}

function BorrarHandle() {}

BorrarHandle.prototype.handleEvent = function(){
    gpre.borrarGasto(this.gasto.id);

    repintar();
}

function BorrarEtiquetasHandle(){}

BorrarEtiquetasHandle.prototype.handleEvent = function() {
    this.gasto.borrarEtiquetas(this.etiqueta);

    repintar();
}





//Generamos la salida de los componentes
export{
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
}