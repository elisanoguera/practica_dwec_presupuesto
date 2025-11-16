// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

let presupuesto = 0;
let gastos = [];
let idgasto = 0;

function actualizarPresupuesto(nvoPresupuesto) {
  if (nvoPresupuesto >= 0) {
    presupuesto = nvoPresupuesto;
    return nvoPresupuesto;
  } else {
    console.log("Presupuesto no válido");
    return -1;
  }
}

function mostrarPresupuesto() {
  return `Tu presupuesto actual es de ${presupuesto} €`;
}

// Etiquetas va con los ... porque no viene de ningun parametro, sino de una lista variable de parametros, por lo tanto a partir del 4to parametro, se introducen dentro de un array que se llamara etiquetas.

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    // Métodos
  this.mostrarGasto = function () {
    return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
  };
  
  this.actualizarDescripcion = function (nvaDescripcion) {
    this.descripcion = nvaDescripcion;
  };

  this.actualizarValor = function (nvoValor) {
    if (nvoValor >= 0) {
      this.valor = nvoValor;
    }
  };

  this.mostrarGastoCompleto = function () {
    let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        texto += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
        texto += `Etiquetas:\n`;
//   primero lo convierto a fecha con newdate y luego a string con tolocalestring()

    for (let etiqueta of this.etiquetas) {
      texto += `- ${etiqueta}\n`
    }
    return texto;
  };

  this.actualizarFecha = function(nuevaFecha) {
        let fechaConvertida = Date.parse(nuevaFecha);
        if (fechaConvertida) {
            this.fecha = fechaConvertida;
        }
    };
// primero chequeo que no exista la etiqueta para añadirla

    this.anyadirEtiquetas = function(...etiquetasNuevas) {
        for (let etiqueta of etiquetasNuevas) {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        }
    };

    this.borrarEtiquetas = function(...etiquetasAEliminar) {
        this.etiquetas = this.etiquetas.filter(function(etiqueta) {
            return !etiquetasAEliminar.includes(etiqueta);
        });
    };


  //Propiedades:
    if (valor >= 0) {
    this.valor = valor;
  } else {
    this.valor = 0;
  }

  this.descripcion = descripcion;

  let f = Date.parse(fecha);
  if (f) {
    this.fecha = f;
  } else {
    this.fecha = Date.parse(new Date());
    //   Si la fecha no es correcta o no hay fecha, la fecha sera la actual
  }

  this.etiquetas=[];
  this.anyadirEtiquetas(...etiquetas);
}


function listarGastos() {
  return gastos;
}

function anyadirGasto() {}

function borrarGasto() {}

function calcularTotalGastos() {}

function calcularBalance() {}

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
};
