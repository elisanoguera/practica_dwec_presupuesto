// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

//Variable global
let presupuesto = 0;

function actualizarPresupuesto(valor) {

    if (valor >= 0) {
        presupuesto = valor;
        return presupuesto;
    } else if (valor === undefined) {
        return presupuesto;
    } else {
        alert("Error. El presupuesto no puede ser negativo");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(valor) {
    this.descripcion = "Descripción del gasto en formato cadena";
    this.valor = (valor >= 0) ? valor : 0;  // En caso de que el valor introducido no sea un núḿero no negativo, se asigna el valor 0.
    this.mostrarGasto = function () {
        alert(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    };
    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };
    this.actualizarValor = function (nuevoValor) {
        if (nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    };
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
