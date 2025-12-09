// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;


// Función actualizarPresupuesto
function actualizarPresupuesto(nuevoPresupuesto) {
    if ((typeof nuevoPresupuesto === 'number') && (nuevoPresupuesto >= 0)) {
        presupuesto = nuevoPresupuesto;
        return presupuesto;
    } else {
        console.error('El presupuesto debe ser un número positivo.');
        //alert('El presupuesto debe ser un número positivo.'); //Los alerts dan error con los tests
        return -1;
    }
}

// Función mostrarPresupuesto
function mostrarPresupuesto() {
    let mensaje = `Tu presupuesto actual es de ${presupuesto} €`;
    console.log(mensaje);
    return mensaje;
}

// Función CrearGasto
function CrearGasto(descripcion, valor) {
    this.descripcion = descripcion;

    // Validación del valor
    if ((typeof valor === 'number') && (valor >= 0)) {
        this.valor = valor;
    } else {
        console.error('El valor del gasto debe ser un número positivo.');
        this.valor = 0;
    }

    // Método mostrarGasto
    this.mostrarGasto = function() {
        let mensaje = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        console.log(mensaje);
        return mensaje;
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
