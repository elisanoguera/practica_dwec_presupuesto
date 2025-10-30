// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;

function actualizarPresupuesto(valor) {
    //TODO
    if (typeof valor !== "number" || isNaN(valor) || valor < 0 ){//corregido
        console.error (`El valor no es válido ${valor}`);
        return -1;
    }
    presupuesto = valor;//actualizo
    return presupuesto;

}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es: ${presupuesto} €`;

}

function CrearGasto() {
    // TODO
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
