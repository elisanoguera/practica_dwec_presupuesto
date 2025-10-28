// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

//Variables globales
let presupuesto = 0;
let gastos = [];
let idGasto = 0;


function actualizarPresupuesto(valor) {

    if (valor >= 0) {
        presupuesto = valor;
        return presupuesto;
    } else {
        console.log("Error. No es un número válido.");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    this.valor = (valor >= 0) ? valor : 0;  // En caso de que el valor introducido no sea un núḿero no negativo, se asigna el valor 0.
    this.fecha = (isNaN(Date.parse(fecha))) ? new Date().getTime() : Date.parse(fecha);
    this.etiquetas = (etiquetas.length > 0) ? etiquetas : [];

    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }

    this.actualizarValor = function (nuevoValor) {
        if (nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    }

    this.mostrarGastoCompleto = function () {
        let texto =
            `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:\n`;
        for (let etiqueta of this.etiquetas) {
            texto += `- ${etiqueta}\n`
        }
        return texto
    }

    this.actualizarFecha = function (fecha) {
        if (!isNaN(Date.parse(fecha))) {    //Si no se puede transformar la fecha a timestamp, devuelve NaN.
            this.fecha = Date.parse(fecha);
        }
    }

    this.anyadirEtiquetas = function (...nuevasEtiquetas) {
        //Deberá comprobar que no se creen duplicados.
        for (let etiqueta of nuevasEtiquetas) {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        }
    }

    this.borrarEtiquetas = function (...etiquetasBorrar) {
        for (let etiqueta of etiquetasBorrar) {
            if (this.etiquetas.indexOf(etiqueta) != -1) {    //Con 'indexOF()' si no se encuentra el valor en el array, devuelve -1.
                this.etiquetas.splice(this.etiquetas.indexOf(etiqueta), 1);
            }
        }
    }
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(indice) {
    let i = gastos.findIndex(gasto => gasto.id == indice);
    if (i != -1) {
        gastos.splice(i, 1);
    }
}

function calcularTotalGastos() {
    let total = 0;
    for (let i = 0; i < gastos.length; i++) {
        total += gastos[i].valor;
    }
    return total;
}

function calcularBalance() {
    let balance = presupuesto - calcularTotalGastos();
    return balance;
}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
