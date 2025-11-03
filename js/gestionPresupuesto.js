// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

let presupuesto = 0;
let gastos = [];
let idGasto = 0;

// TODO: Variable global

function actualizarPresupuesto(nuevoPresupuesto) {
    if (typeof nuevoPresupuesto === 'number' && nuevoPresupuesto >= 0) {
        presupuesto = nuevoPresupuesto;
        return presupuesto;
    } else {
        console.log("Error: El presupuesto debe ser un número no negativo");
        return -1;
    }
}

function CrearGasto(descripcion, valor, fecha) {

    if (typeof valor != 'number' || valor < 0) {
        valor = 0;
    }

    var timestamp = Date.parse(fecha);
    if (isNaN(timestamp)) {
        timestamp = Date.now();
    }

    this.descripcion = descripcion || '';
    this.valor = valor;
    this.fecha = timestamp;
    this.etiquetas = [];

    for (var i = 3; i < arguments.length; i++) {
        this.etiquetas.push(arguments[i]);
    }

    this.mostrarGasto = function() {
        return 'Gasto correspondiente a ' + this.descripcion + ' con valor ' + this.valor + ' €';
    };

    this.mostrarGastoCompleto = function() {
        var texto = 'Gasto correspondiente a ' + this.descripcion + ' con valor ' + this.valor + ' €.\n';
        texto += 'Fecha: ' + new Date(this.fecha).toLocaleString() + '\n';
        texto += 'Etiquetas:\n';
        for (var i = 0; i < this.etiquetas.length; i++) {
            texto += '- ' + this.etiquetas[i] + '\n';
        }
        return texto;
    };

    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion || '';
    };

    this.actualizarValor = function(nuevoValor) {
        if (typeof nuevoValor == 'number' && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    };

    this.actualizarFecha = function(nuevaFecha) {
        var timestamp = Date.parse(nuevaFecha);
        if (!isNaN(timestamp)) {
            this.fecha = timestamp;
        }
    };

    this.anyadirEtiquetas = function() {
        for (var i = 0; i < arguments.length; i++) {
            var etiqueta = arguments[i];
            var existe = false;
            for (var j = 0; j < this.etiquetas.length; j++) {
                if (this.etiquetas[j] == etiqueta) {
                    existe = true;
                    break;
                }
            }
            if (!existe) {
                this.etiquetas.push(etiqueta);
            }
        }
    };

    this.borrarEtiquetas = function() {
        for (var i = 0; i < arguments.length; i++) {
            var etiqueta = arguments[i];
            for (var j = 0; j < this.etiquetas.length; j++) {
                if (this.etiquetas[j] == etiqueta) {
                    this.etiquetas.splice(j, 1);
                    break;
                }
            }
        }
    };

    this.obtenerPeriodoAgrupacion = function(periodo) {
        var fecha = new Date(this.fecha);
        var año = fecha.getFullYear();
        var mes = fecha.getMonth() + 1;
        var dia = fecha.getDate();

        if (mes < 10) mes = "0" + mes;
        if (dia < 10) dia = "0" + dia;

        if (periodo === "mes") {
            return año + "-" + mes;
        }
        if (periodo === "anyo") {
            return año + "";
        }
        return año + "-" + mes + "-" + dia;
    };
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id === id) {
            gastos.splice(i, 1);
            return;
        } 
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
    return presupuesto - calcularTotalGastos(); 
}

function filtrarGastos(opciones) {
    var resultado = [];
    
    for (var i = 0; i < gastos.length; i++) {
        var gasto = gastos[i];
        var incluir = true;

        if (opciones && opciones.fechaDesde) {
            var fechaDesde = Date.parse(opciones.fechaDesde);
            if (gasto.fecha < fechaDesde) incluir = false;
        }

        if (opciones && opciones.fechaHasta) {
            var fechaHasta = Date.parse(opciones.fechaHasta);
            if (gasto.fecha > fechaHasta) incluir = false;
        }

        if (opciones && opciones.valorMinimo !== undefined) {
            if (gasto.valor < opciones.valorMinimo) incluir = false;
        }

        if (opciones && opciones.valorMaximo !== undefined) {
            if (gasto.valor > opciones.valorMaximo) incluir = false;
        }

        if (opciones && opciones.descripcionContiene) {
            var desc = gasto.descripcion.toLowerCase();
            var busqueda = opciones.descripcionContiene.toLowerCase();
            if (desc.indexOf(busqueda) === -1) incluir = false;
        }

        if (opciones && opciones.etiquetasTiene && opciones.etiquetasTiene.length > 0) {
            var tieneEtiqueta = false;
            if (gasto.etiquetas && gasto.etiquetas.length > 0) {
                for (var j = 0; j < opciones.etiquetasTiene.length; j++) {
                    var etiquetaBuscada = opciones.etiquetasTiene[j].toLowerCase();
                    for (var k = 0; k < gasto.etiquetas.length; k++) {
                        if (gasto.etiquetas[k].toLowerCase() === etiquetaBuscada) {
                            tieneEtiqueta = true;
                            break;
                        }
                    }
                    if (tieneEtiqueta) break;
                }
            }
            if (!tieneEtiqueta) {
                incluir = false;
            }
        }

        if (incluir) {
            resultado.push(gasto);
        }
    }

    return resultado;
}

function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta) {
    var opciones = {};
    if (fechaDesde) opciones.fechaDesde = fechaDesde;
    if (fechaHasta) opciones.fechaHasta = fechaHasta;
    if (etiquetas && etiquetas.length > 0) opciones.etiquetasTiene = etiquetas;

    var gastosFiltrados = filtrarGastos(opciones);
    var resultado = {};

    for (var i = 0; i < gastosFiltrados.length; i++) {
        var gasto = gastosFiltrados[i];
        var clave = gasto.obtenerPeriodoAgrupacion(periodo || 'mes');

        if (!resultado[clave]) {
            resultado[clave] = 0;
        }
        resultado[clave] += gasto.valor;
    }

    return resultado;
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export{
    actualizarPresupuesto,
    mostrarPresupuesto, 
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    CrearGasto,
    filtrarGastos, 
    agruparGastos
};
