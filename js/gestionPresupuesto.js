// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0; 

function actualizarPresupuesto(valor) {
    // TODO
    if (!(isNaN(valor)) && (valor >= 0)) {
        presupuesto = valor;
        //Devuelve presupuesto para confirmar que no hay error
        return presupuesto;
    } else {
        //alert daba error y lo cambio por console.log
        console.log('Error');
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`
}

function CrearGasto(valor, descripcion) {
    // TODO
    if (valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }

    this.descripcion = descripcion;

    this.mostrarGasto = function() {
        `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`
    }

    this.actuaizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }

    this.actualizarValor = function(nuevoValor) {
        if (valor >= 0) {
            this.valor = nuevoValor;
        }
    }

    let gasto = new CrearGasto (prompt('Introduzca valor del gasto:'), 
        prompt('Introduzca descripción del gasto'));
    
    return gasto;
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo

export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
