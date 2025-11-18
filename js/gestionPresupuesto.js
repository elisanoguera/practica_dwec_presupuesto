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

    this.obtenerPeriodoAgrupacion = function (periodo) {

        if (fecha != undefined) {
            let fechaGasto = new Date(fecha)
            let anyo = fechaGasto.getFullYear();
            let mes = fechaGasto.getMonth() + 1;
            let dia = fechaGasto.getDate();

            if (mes < 10){
                mes = "0" + mes;
            }

             if (dia < 10){
                dia = "0" + dia;
            }

            switch (periodo) {
                case "dia":
                    return `${anyo}-${mes}-${dia}`;
                case "día":
                    return `${anyo}-${mes}-${dia}`;
                case "mes":
                    return `${anyo}-${mes}`;
                case "anyo":
                    return `${anyo}`;
                case "año":
                    return `${anyo}`;
                default:
                    return -1;
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


function filtrarGastos(datosFiltro) {
    return gastos.filter(function(gasto){

        let resultado = true

        if (Object.keys(datosFiltro).length === 0){
            return resultado = true;
        }
        if (datosFiltro.fechaDesde && gasto.fecha < Date.parse(datosFiltro.fechaDesde)){
            return resultado = false;
        }
        if (datosFiltro.fechaHasta && gasto.fecha > Date.parse(datosFiltro.fechaHasta)){
            return resultado = false;
        }
        if (datosFiltro.valorMinimo && gasto.valor < datosFiltro.valorMinimo){
            return resultado = false;
        }
        if (datosFiltro.valorMaximo && gasto.valor > datosFiltro.valorMaximo){
            return resultado = false;
        }
        if (datosFiltro.descripcionContiene && !gasto.descripcion.toLowerCase().includes(datosFiltro.descripcionContiene.toLowerCase())){
            return resultado = false;
        }
        if (datosFiltro.etiquetasTiene) {
            let coincide = false;
            for (let etiqueta of datosFiltro.etiquetasTiene) {
                if (gasto.etiquetas.includes(etiqueta)) {
                    coincide = true;
                }
            }
            if (!coincide) return resultado = false;
        }

        return resultado;
    })
}


function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta) {

    let gastosFiltrados = filtrarGastos({ etiquetasTiene: etiquetas, fechaDesde: fechaDesde, fechaHasta: fechaHasta });

    return gastosFiltrados.reduce(function (acc, gasto) {
        let periodoGasto = gasto.obtenerPeriodoAgrupacion(periodo);

        if (acc[periodoGasto]) {
            acc[periodoGasto] = acc[periodoGasto] + gasto.valor;
        } else {
            acc[periodoGasto] = gasto.valor;
        }
        return acc;
    }, {});
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
    calcularBalance,
    filtrarGastos,
    agruparGastos
}
