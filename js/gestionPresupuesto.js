// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;
let gastos = [];
let idGastos = 0;

function actualizarPresupuesto(valor) {
    if ( typeof valor !== "number" || valor < 0 ){//corregido
        console.error (`El valor no es válido ${valor}`);
        return -1;   
    }
    else { 
        presupuesto = valor;//actualizo
        return presupuesto;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`; //corregido el texto

}

//agrego nuevas funciones vacias 
//funcion q devuelve gastos
function listarGastos () {
    return gastos;
}

function anyadirGasto () {

}

function borrarGasto () {

}

function calcularTotalGastos () {

}

function calcularBalance () {

}


//objeto gasto - propiedades descripcion y valor
function CrearGasto(descripcion, valor, fecha) {
    this.descripcion = descripcion; //almaceno la descripcion

    if ( typeof valor === "number" && valor >= 0 ) {
        this.valor = valor;
    }
    else {
        this.valor = 0;
    }

    //metodos
    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
        //return this.descripcion;
    };

    this.actualizarValor = function(nuevoValor){
        if (typeof nuevoValor === "number" && nuevoValor >= 0) {//son tres iguales
                this.valor = nuevoValor; 
            }
    
    };


    //fecha 
        if (typeof fecha === "string" && !NaN(Date.parse(fecha))) {
            this.fecha = Date.parse(fecha); //si valida se guarda en formato timestamp
        }
        else {
            this.fecha = Date.now(); //si no fecha actual
        }


    
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
