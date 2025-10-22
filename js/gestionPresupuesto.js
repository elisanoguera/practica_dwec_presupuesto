// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;


function actualizarPresupuesto() {
    // TODO
}

function mostrarPresupuesto() {
    // TODO
}

function CrearGasto(descripcion, valor) {
    this.descripcion = String(descripcion);

    // Si el tipo de dato valor es de tipo numero y es mayor o igual a 0 y no es null
        if (typeof valor === 'number' && valor >= 0 && !isNaN(valor)) {
            this.valor = valor;
        } else {
            this.valor = 0;
        };
    // Métodos
    this.mostrarGasto = function() {
        return 'Gasto correspondiente a ' + this.descripcion + ' con valor ' + this.valor + ' €';
    }
    // La descripcion sienpre sera una cadena 
    this.actualizarDescripcion = function(newDescripcion) {
        this.descripcion = String(newDescripcion);
    }
    // Actualiza el valor del gasto si el nuevo valor es un número válido y no es un numero negativo
    this.actualizarValor = function(newValor) {
        if (typeof newValor === 'number' && newValor >= 0 && !isNaN(newValor)) {
            this.valor = newValor;
        }   

}

//objeto gasto
let gasto1 = new CrearGasto('Compra semanal', 50);
gasto1.descripcion; // 'Compra semanal'
gasto1.valor; // 50


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
