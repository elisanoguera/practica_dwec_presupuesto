// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;

function actualizarPresupuesto(nvoPresupuesto) {
    if (nvoPresupuesto>=0)
        {
            presupuesto = nvoPresupuesto;
            return nvoPresupuesto;
        }else {
            console.log ("Presupuesto no válido");
            return -1;
        }
    }

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor) {
    if (valor >= 0) {
                    this.valor= valor;
    } else {
           this.valor=0;
    }
    this.descripcion= descripcion;

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }   
    this.actualizarDescripcion = function(nvaDescripcion) {
        this.descripcion = nvaDescripcion;
    }   
    this.actualizarValor = function(nvoValor) {
        if (nvoValor >= 0) {
            this.valor = nvoValor;
        } 
    }
}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
