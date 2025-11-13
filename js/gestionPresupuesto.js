// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

var presupuesto = 0;

function actualizarPresupuesto(presupuesto) {
    // TODO
    var parametro = presupuesto;

    if(parametro < 0){
        parametro = -1;
        alert('Error valor no valido');
        return parametro
    }

    return parametro;
}

function mostrarPresupuesto(presupuesto) {
    // TODO
    var valor = presupuesto;

    let texto = 'El valor de la variable es ' + valor;

    return texto;

}

function CrearGasto() {
    // TODO

    let gasto = new Object();

}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
