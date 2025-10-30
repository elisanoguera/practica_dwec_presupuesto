// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;

function actualizarPresupuesto(valor) {
    if ( valor < 0 ){//corregido
        console.log (`El valor no es válido ${valor}`);
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

function CrearGasto(descripcion, valor) {
    this.descripcion = descripcion; //almaceno la descripcion

    if ( valor >= 0 ) {
        this.valor = valor;
    }
    else {
        this.valor = 0; //si es negativo sera cero
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
