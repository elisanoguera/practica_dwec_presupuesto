// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

import eslintPluginCypress from "eslint-plugin-cypress";

// TODO: Variable global

let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(parametro) {
    // TODO

    if(parametro >= 0){
        presupuesto = parametro;
        return presupuesto;
    }
    else{

        console.log('Error valor no valido');
        return -1;
        
    }

    
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;

}

function CrearGasto(descripcion, valor, fecha, etiquetas) {
    // TODO

    valor = Number(valor);
    //Comprobamos que el valor introducido sea mayor a 0, por lo que no sera un numero negativo
    if(valor > 0){
        this.valor = valor;
    }
    else{
        this.valor = 0;
    }


    //Le añadimos las propiedades
    this.descripcion = descripcion;

    //Creamos los metodos
    //metodo para mostrar el gasto
    this.mostrarGasto = function(){
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
    }

    //Metodo para actualizar la descripcion
    this.actualizarDescripcion = function(nuevaDescripcion){
        this.descripcion = nuevaDescripcion;
    }

    //Metodo para actualizar el valor del objeto
    this.actualizarValor = function(nuevoValor){
        if(nuevoValor > 0){
            this.valor = nuevoValor;  
        }
        else{
            console.log("Valor introducido negativo. Introduzca otro valor");
        }
    } 
    
    //Añadimos los nuevos archivos a la funcion.
    //Parametro para añadir la fecha en la que se ha registrado el gasto
    var t = Date.parse(fecha);
    if(t === t){
        this.fecha = t;
    }
    else{
        this.fecha = 0;
    }
    //Propiedad para añadir varias etiquetas y categorizar un gasto
    this.etiquetas = [];

    if(Array.isArray(etiquetas)){
        for(var a = 0; a < etiquetas.length; a++){
            this.etiquetas.push(etiquetas[a]);
        }
    }

    //Funciones
    this.mostrarGastoCompleto = function() {

        var texto = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €.\n";

        var fechaGasto = new Date(this.fecha);
        texto = texto + "Fecha: " + fechaGasto.toLocaleDateString() + "\n";

        texto = texto + "Etiquetas:";
        //Si el numero de etiquecas es 0 indicamos ninguna
        if(this.etiquetas.length === 0){
            texto = texto + " Ninguna";
        }
        //recorremos todas las etiquetas y las vamos añadiendo con un salto de linea
        else{
            for(var i = 0; i < this.etiquetas.length; i++){
                texto = texto + "\n" + this.etiquetas[i];
            }
        } 

        return texto;
    }

    this.actualizarFecha = function(nuevaFecha){
        var lineaTiempo = Date.parse(nuevaFecha);
        if (lineaTiempo === lineaTiempo){
            this.fecha = lineaTiempo;
        }
    }

    this.anyadirEtiquetas = function() {
        for(var i = 0; i < arguments.length; i++){
            var et = arguments[i];
        
            var existe = false;

            for(var j = 0; j < this.etiquetas.length; j++){
                if(this.etiquetas[j] === et){
                existe = true;
                break;
                }
            }
            if(!existe) {
            this.etiquetas.push(et);
            }
        }

    }

    this.borrarEtiquetas = function(){
        var nuevasetiquetas = [];

        for(var i = 0; i < this.etiquetas.length; i++){
            var actual = this.etiquetas[i];
            var borrar = false;

            for(var j = 0; j < arguments.length; j++){
                if(actual === arguments[j]){
                    borrar = true;
                    break;
                }
            }

            if(!borrar){
            nuevasetiquetas.push(actual);
            }
        }

        this.etiquetas = nuevasetiquetas;
    }

}

//Creamos las funciones vacias despues de añadirlas al objeto export

function listarGastos() {

    return gastos;
}

function anyadirGasto(gastos) {

    gastos.id = idGasto;
    idGasto++;
    this.gastos.push(gastos.id);

}

function borrarGasto(id) {

    //creamos una nueva lista para ir añadiendo los valores que no coincidan con el id
    var nuevos = [];
    var i;

    //recorremos la lista
    for(i = 0; i < gastos.length; i++){
        //realizamos la comparacion para que el id no sea igual y lo añadimos a la lista nueva
        if(gastos[i].id !== id){
            nuevos.push(gastos[i])
        }
    }

    //modificamos la lista gastos cambiandola con los valores añadidos que no coincidian con el id
    gastos = nuevos;

}

function calcularTotalGastos() {

    var total = 0;

    for(var i = 0; i < gastos.length; i++){
        total = total + gastos[i].valor;
    }

    return total;

}

function calcularBalance() {

    return presupuesto - calcularTotalGastos;

}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
    
}
