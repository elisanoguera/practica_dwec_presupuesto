// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

let presupuesto = 0;

function actualizarPresupuesto(valor) {

    if (valor >= 0) {
        presupuesto = valor;
        return presupuesto;
    } else {
        console.log("El presupuesto no es positivo")
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`
}

function CrearGasto(descripcion, val) {
    this.descripcion = descripcion;
    this.valor = (val >=0) ? val:0;

    this.mostrarGasto = function(){
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`
    }
    this.actualizarDescripcion = function(nuevaDescripcion){
        this.descripcion = nuevaDescripcion;
    }
    this.actualizarValor = function(valor){
        this.valor = (valor >=0) ? valor: this.valor;
    }
}
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
