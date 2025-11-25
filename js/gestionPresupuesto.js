// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    // TODO
    if (!isNaN(valor) && (valor >= 0)) {
        presupuesto = valor;
        //Devuelve presupuesto para confirmar que no hay error
        return presupuesto;
    } else {
        //alert daba error y lo cambio por console.log
        console.log('Error');
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    // TODO

    this.descripcion = (typeof descripcion === 'string') ? descripcion : null;

    this.valor = (!isNaN(valor) && (valor >= 0)) ? valor : 0;

    //Si ...etiquetas no se pasa a la función se crea un array vacío igual.
    this.etiquetas = [...etiquetas];

    if (!isNaN(Date.parse(fecha))) {
        this.fecha = new Date().getTime();
    } else {
        this.fecha = Date.parse(fecha);
    }

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.mostrarGastoCompleto = function() {
        return `Gasto correspondiente a ${descripcion} con valor ${valor} €.
        Fecha: ${date.toString()}
        Etiquetas:
        ${this.listarEtiquetas()}`
    }

    this.listarEtiquetas = function() {
        let listaEtiquetas = '';
        for (let etiqueta of this.etiquetas) {
            listaEtiquetas += ` - ${etiqueta}\n`;
        }
        return listaEtiquetas;
    }

    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }

    this.actualizarValor = function(nuevoValor) {
        if (nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    }
    
    this.actualizarFecha = function(nuevaFecha) {
        if (!isNaN(Date.parse(nuevaFecha))) {
            this.fecha = nuevaFecha;
        }
    }

    this.anyadirEtiquetas = function(...nuevasEtiquetas) {
        for (let nuevaEtiqueta of nuevasEtiquetas) {
            let esDuplicada = false;

            for (let etiqueta of this.etiquetas) {
                if (etiqueta == nuevaEtiqueta) {
                    esDuplicada = true;
                    break;
                }
            }
            if (!esDuplicada) {
                this.etiquetas.push(nuevaEtiqueta);
            }
        }
    }

    this.borrarEtiquetas = function(...etiquetasParaBorrar) {
        for (let etiquetaParaBorrar of etiquetasParaBorrar) {
            for (let etiqueta of this.etiquetas) {
                if (etiqueta == etiquetaParaBorrar) {
                    indiceBorrar = this.etiquetas.indexOf(etiqueta);
                    this.etiquetas.splice(indiceBorrar, 1);
                    break;
                }
            }
        }
    }
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(id, gasto) {
    this.id = idGasto;
    idGasto++;
    gastos.push(gasto); 
}

function borrarGasto(id) {
    let indexGastoEliminar = undefined;
    for (let gasto of gastos) {
        if (gasto.id === id) {
        indexGastoEliminar = gastos.indexOf(gasto);
            break;
        }
    }
    
    if (indexGastoEliminar !== undefined) {
        gastos.splice(indexGastoEliminar, 1);
    }
}

function calcularTotalGastos() {
    let totalGastos = 0;
    for (let gasto of gastos) {
        totalGastos += gasto.value;
    }
    return totalGastos;
}

function calcularBalance() {
    return (presupuesto - calcularTotalGastos());
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo

export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
