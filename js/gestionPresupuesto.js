// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

let presupuesto = 0;

function actualizarPresupuesto(valor) {

    if (valor >= 0) {
        presupuesto = valor;
        return presupuesto;
    } else {
        console.log("El presupuesto no es positivo")
        return valor = -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    this.valor = (valor >= 0) ? valor : 0;
    let fechaCorrecta = Date.parse(fecha);
    this.fecha = isNaN(fechaCorrecta) ? Date.now() : fechaCorrecta;
    this.etiquetas = (etiquetas.length > 0) ? [...etiquetas] : [];

    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`
    }
    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }
    this.actualizarValor = function (valor) {
        this.valor = (valor >= 0) ? valor : this.valor;
    }
    this.mostrarGastoCompleto = function () {
        let fechaLocalizada = new Date(this.fecha).toLocaleString();
        let textoEtiquetas = this.etiquetas.map(etiqueta => `- ${etiqueta}`).join('\n');

        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n` +
            `Fecha: ${fechaLocalizada}\n` +
            `Etiquetas:\n${textoEtiquetas}`;
    }
    this.actualizarFecha = function (nuevaFecha) {
        let fechaCorrecta = Date.parse(nuevaFecha);
        if (!isNaN(fechaCorrecta)) {
            this.fecha = fechaCorrecta
        }
    }
    this.anyadirEtiquetas = function (...nuevasEtiquetas) {
        nuevasEtiquetas.forEach(etiqueta => {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        })
    }
    this.borrarEtiquetas = function (...etiquetasBorrar) {
        this.etiquetas = this.etiquetas.filter(etiqueta => !etiquetasBorrar.includes(etiqueta));
    }
}
let gastos = [];
let idGasto = 0;


function listarGastos() {
    return gastos
}

function anyadirGasto(nuevoGasto) {
    nuevoGasto.id = idGasto;
    idGasto++;
    gastos.push(nuevoGasto);
}

function borrarGasto(idGastoBorrar) {
    gastos = gastos.filter(gasto => gasto.id !== idGastoBorrar);
}

function calcularTotalGastos() {
    return gastos.reduce((total, gasto) => total + gasto.valor, 0);
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
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
