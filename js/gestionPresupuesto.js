let presupuesto = 0;
let gastos = [];
let idGasto = 0;

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
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    this.valor = (valor >= 0) ? valor : 0;
    let fechaCorrecta = Date.parse(fecha);
    if (fechaCorrecta) {
        this.fecha = fechaCorrecta;
    } else {
        this.fecha = Date.parse(new Date());
    }
    this.etiquetas = (etiquetas.length > 0) ? [...etiquetas] : [];

    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
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
            `Etiquetas:\n${textoEtiquetas}\n`;
    }
    this.actualizarFecha = function (nuevaFecha) {
        let fechaCorrecta = Date.parse(nuevaFecha);
        if (fechaCorrecta) {
            this.fecha = fechaCorrecta;
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

    this.obtenerPeriodoAgrupacion = function (periodo) {
        let fecha = new Date(this.fecha);
        let anyo = fecha.getFullYear();
        let mes = String(fecha.getMonth() + 1).padStart(2, '0');
        let dia = String(fecha.getDate()).padStart(2, '0');

        switch (periodo) {
            case 'dia':
                return `${anyo}-${mes}-${dia}`;
            case 'mes':
                return `${anyo}-${mes}`;
            case 'anyo':
                return `${anyo}`;
            default:
                return 'Periodo invalido'
        }

    }

}

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

function filtrarGastos(filtros = {}) {
    return gastos.filter(gasto => {

        if (filtros.fechaDesde !== undefined) {
            let fechaDesde = Date.parse(filtros.fechaDesde);
            if (isNaN(fechaDesde)) return false;
            if (gasto.fecha < fechaDesde) return false;
        }
        if (filtros.fechaHasta !== undefined) {
            let fechaHasta = Date.parse(filtros.fechaHasta);
            if (isNaN(fechaHasta)) return false;

            let fechaHastaFinDia = new Date(fechaHasta);
            fechaHastaFinDia.setHours(23, 59, 59, 999);
            if (gasto.fecha > fechaHastaFinDia.getTime()) return false;
        }

        if (filtros.valorMinimo !== undefined) {
            if (gasto.valor < filtros.valorMinimo) return false;
        }


        if (filtros.valorMaximo !== undefined) {
            if (gasto.valor > filtros.valorMaximo) return false;
        }


        if (filtros.descripcionContiene !== undefined) {
            let texto = filtros.descripcionContiene.toLowerCase();
            if (!gasto.descripcion.toLowerCase().includes(texto)) return false;
        }


        if (filtros.etiquetasTiene !== undefined && Array.isArray(filtros.etiquetasTiene)) {
            let etiquetasBuscadas = filtros.etiquetasTiene.map(e => e.toLowerCase());
            let tieneAlguna = gasto.etiquetas.some(etiqueta =>
                etiquetasBuscadas.includes(etiqueta.toLowerCase())
            );
            if (!tieneAlguna) return false;
        }
        return true;
    });
}

function agruparGastos(
    periodo = "mes",
    etiquetas = [],
    fechaDesde = undefined,
    fechaHasta = undefined
) {
    let periodosValidos = ["dia", "mes", "anyo"];
    if (!periodosValidos.includes(periodo)) {
        periodo = "mes";
    }

    let filtros = {};
    if (fechaDesde !== undefined) filtros.fechaDesde = fechaDesde;
    if (fechaHasta !== undefined) filtros.fechaHasta = fechaHasta;
    if (etiquetas.length > 0) filtros.etiquetasTiene = etiquetas;

    let gastosFiltrados = filtrarGastos(filtros);

    return gastosFiltrados.reduce((acc, gasto) => {
        let clave = gasto.obtenerPeriodoAgrupacion(periodo);

        if (!(clave in acc)) {
            acc[clave] = 0;
        }
        acc[clave] += gasto.valor;

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
