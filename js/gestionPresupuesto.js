// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

import eslintPluginCypress from "eslint-plugin-cypress";

// TODO: Variable global

let presupuesto = 0;
let gasto = [];
let idgasto = 0;

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

function CrearGasto(descripcion, valor) {
    // TODO

    //Comprobamos que el valor introducido sea mayor a 0, por lo que no sera un numero negativo
    if(valor > 0){
        this.valor = valor;
    }
    else{
        this.valor = 0;
    }


    //Le añadimos las propiedades
    this.descripcion = descripcion,

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
    this.fecha = Date.now();
    //Propiedad para añadir varias etiquetas y categorizar un gasto
    this.etiquetas = [];

    //Funciones
    this.mostrarGastoCompleto = function() {

        var texto;

        texto = "Gasto correspondiente a " + descripcion + " con valor " + valor + " € \n";
        texto = texto + "Fecha: " + this.fecha.toLocaleString + "\n";
        texto = texto + "Etiquetas: ";
        //Si el numero de etiquecas es 0 indicamos ninguna
        if(this.etiquetas.length === 0){
            texto = texto + " Ninguna"
        }
        //recorremos todas las etiquetas y las vamos añadiendo con un salto de linea
        else{
            this.etiquetas.forEach(etiquetas => {
                texto = texto + "\n - " + etiquetas; 
            })
        } 
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
        }

        if(!existe) {
            this.etiquetas.push(et)
        }

    }

    this.borrarEtiquetas = function(){
        for(var i = 0; i < arguments.length; i++){
            var etiquetasBorrar = arguments[i];
            var nuevaLista = [];

            for(var j = 0; j < this.etiquetas.length; j++){
                if(this.etiquetas[j] !== etiquetasBorrar){
                    nuevaLista.push(this.etiquetas[j]);
                }
            }

            this.etiquetas = nuevaLista;
        }
    }

    this.borrarEtiqueta = function(){
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
        }

        if(!borrar){
            nuevasetiquetas.push(actual);
        }
    }

}

//Creamos las funciones vacias despues de añadirlas al objeto export

function listarGastos() {

    return gasto;
}

function anyadirGasto() {

}

function borrarGasto() {

}

function calcularTotalGastos() {

}

function calcularBalance() {

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
