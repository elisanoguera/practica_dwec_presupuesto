//import { createElement } from "react";

//importamos gestion presupuesto para poder utilizar sus funciones
import * as gpre from 'js/gestionPresupuesto.js';

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

    if(Array.isArray(gasto.etiquetas) && gasto.etiquetas.length > 0){
        for (var i = 0; i < gasto.etiquetas.length; i++){
            var span = document.createElement('span');
            span.className = 'gasto-etiquetas-etiqueta';
            span.textContent = gasto.etiquetas[i];
            EtiqDiv.appendChild(span);
        }
        
    }else{
        var spanNone = document.createElement('span');
        spanNone.className = 'gasto-etiquetas-etiqueta';
        spanNone.textContent = 'Ninguna';
        EtiqDiv.appendChild(spanNone);
    }

    gastoDiv.appendChild(EtiqDiv);


    //Añadimos todo el gasto completo al bloque
    aux.appendChild(gastoDiv);

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

document.getElementById("actualizarpresupuesto")
        .addEventListener("click", actualizarPresupuestoWeb);


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


    const gasto = new gpre.CrearGasto(des, valor, fecha, etiquetas);

    gpre.anyadirGasto(gasto);

    repintar();

}

document.getElementById('anyadirgasto').addEventListener("click", nuevoGastoWeb);



//Generamos la salida de los componentes
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
}