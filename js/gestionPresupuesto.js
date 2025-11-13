// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;
let gasto;
let idgasto = 0;

function actualizarPresupuesto(parametro) {
    // TODO

    if(parametro >= 0){
        presupuesto = parametro;
        return presupuesto;
    }
    else{

        console.log('Error valor no valido');
        return -1
        
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

}

//Creamos las funciones vacias despues de añadirlas al objeto export

function listarGastos() {

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
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
}
