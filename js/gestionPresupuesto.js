// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    if ( typeof valor !== "number" || valor < 0 ){//corregido
        console.error (`El valor no es válido ${valor}`);
        return -1;   
    }
    else { 
        presupuesto = valor;//actualizo
        return presupuesto;
    }
}

//funcion que devuelve presupuesto
function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`; //corregido el texto
}


//funcion q devuelve gastos
function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;        //añado id a gasto y su valor sera idGasto
    idGasto++;                 //incremento valor
    gastos.push(gasto);        //añado a gastos el gasto
}

function borrarGasto(id) {
    const indice = gastos.findIndex (gasto => gasto.id === id);     //busco si el indice ya ha sido pasado 

    if ( indice !== -1){
        gastos.splice(indice, 1)        //elimina un gasto de la global gastos
    }
}

function calcularTotalGastos() {
    let suma = 0;                   //guardo en suma
    for (let gasto of gastos) {     //recorro gastos y coge gasto en cada vuelta
        if (typeof gasto.valor === "number") {
        suma += gasto.valor;        //agrego el valor del gasto a la suma
        }
    }
    return suma;
}


function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}


//funcion agruparGastos - obtiene los gastos creados en esas fechas y alguna de las etiquetas pasadas
function agruparGastos(periodo = "mes", etiquetas = [], fechaDesde, fechaHasta) {
  // Validar periodo
  const periodosValidos = ["dia", "mes", "anyo"];
  let per = "mes";

  if (periodosValidos.includes(periodo)) {
    per = periodo;
  }

  // Fechas
  let fechaDesdeNum = null;
  if (fechaDesde) {
    fechaDesdeNum = Date.parse(fechaDesde);
  }

  let fechaHastaNum;
  if (fechaHasta) {
    fechaHastaNum = Date.parse(fechaHasta);
  } else {
    fechaHastaNum = Date.now();
  }

  // 1. Filtrar gastos
  const gastosFiltrados = gastos.filter(function (gasto) {
    // FILTRO POR ETIQUETAS
    if (etiquetas && etiquetas.length > 0) {
      // Si el gasto NO tiene etiquetas, fuera
      if (!gasto.etiquetas || gasto.etiquetas.length === 0) {
        return false;
      }

      let coinciden = false;

      // Buscar si alguna etiqueta coincide
      for (let i = 0; i < gasto.etiquetas.length; i++) {
        if (etiquetas.includes(gasto.etiquetas[i])) {
          coinciden = true;
        }
      }

      // Si ninguna etiqueta coincide → no pasa el filtro
      if (!coinciden) {
        return false;
      }
    }

    // FILTRO POR FECHAS
    const fechaGastoNum = Date.parse(gasto.fecha);

    if (isNaN(fechaGastoNum)) {
      return false;
    }

    if (fechaDesdeNum !== null) {
      if (fechaGastoNum < fechaDesdeNum) {
        return false;
      }
    }

    if (fechaHastaNum !== null) {
      if (fechaGastoNum > fechaHastaNum) {
        return false;
      }
    }

    return true;
  });

  // 2. AGRUPACIÓN
  const resultado = {};

  gastosFiltrados.forEach(function (gasto) {
    const clave = gasto.obtenerPeriodoAgrupacion(per);
    let valor = Number(gasto.valor);

    if (isNaN(valor)) {
      valor = 0;
    }

    if (!resultado[clave]) {
      resultado[clave] = 0;
    }

    resultado[clave] = resultado[clave] + valor;
  });

  return resultado;
}



//uso de filter
function filtrarGastos(filtros) {
    if (!filtros || typeof filtros !== "object") {
        return gastos;      //global
    }

    let fechaMinima = null;
    if (typeof filtros.fechaDesde === "string" && !isNaN(Date.parse(filtros.fechaDesde))) {
        fechaMinima = Date.parse(filtros.fechaDesde);
    }

    let fechaMaxima = null;
    if (typeof filtros.fechaHasta === "string" && !isNaN(Date.parse(filtros.fechaHasta))) {
        fechaMaxima = Date.parse(filtros.fechaHasta);
    }

    const tieneValorMinimo = (typeof filtros.valorMinimo === "number");
    const tieneValorMaximo = (typeof filtros.valorMaximo === "number");

    //descripcion no disntingue mayus o minus tolower.case
    let trozo = null;
    if (typeof filtros.descripcionContiene === "string") {
        trozo = filtros.descripcionContiene.toLowerCase();
    }

    //etiquetas no disntingue mayus o minus tolower.case
    let arrayEtiquetas = null;
    if (Array.isArray(filtros.etiquetasTiene)) {
        arrayEtiquetas = filtros.etiquetasTiene.map(function(et)
    {
        return String(et).toLowerCase();
    });

    } 
    
    //filtrado con filter
    return gastos.filter(function(gasto) {
        if (fechaMinima !== null && gasto.fecha < fechaMinima) {
            return false;
        }

        if (fechaMaxima !== null && gasto.fecha > fechaMaxima) {
            return false;
        }


        if (tieneValorMinimo && gasto.valor < filtros.valorMinimo) {
            return false;
        }

        if (tieneValorMaximo && gasto.valor > filtros.valorMaximo) {
            return false;
        }

        if (trozo !==  null) {
            let desc = "";
            if (typeof gasto.descripcion === "string") {
                desc = gasto.descripcion.toLowerCase();
            }
            if (desc.indexOf(trozo) === -1) {
                return false;
            }
        }

        //etiquetasTiene debe tener al menos una de las etiquetas y devolver su resultado
        if (arrayEtiquetas !== null) {
            let etiquetasGasto = [];        //PRIMERO VACIO

            if (Array.isArray (gasto.etiquetas)) {
                etiquetasGasto = gasto.etiquetas.map(function(et) {
                    return String(et).toLowerCase();
                });
             }

            let coincideAlguna = false;
            for (let i = 0; i < arrayEtiquetas.length && !coincideAlguna; i++) {
                const etq = arrayEtiquetas[i];
                if (etiquetasGasto.indexOf(etq) !== -1) {
                    coincideAlguna = true;
                }
            }
            if (!coincideAlguna) {
                  return false;
            }
        }

        return true;        //SI PASA LOS FILTROS SE QUEDA

    });

}



//funcion constructora
function CrearGasto(descripcion, valor, fecha,...etiquetas) {
    this.descripcion = descripcion; //almaceno la descripcion

    if ( typeof valor === "number" && valor >= 0 ) {
        this.valor = valor;
    }
    else {
        this.valor = 0;
    }

    //validacion de fecha
    if (typeof fecha === "number" && !Number.isNaN(fecha)) {
        this.fecha = fecha; //si valida se guarda en formato timestamp
    }
    else if (typeof fecha === "string" && !Number.isNaN(Date.parse(fecha))) {
        this.fecha = Date.parse(fecha);
    } else {
        this.fecha = Date.now(); //si no fecha actual
    }



     //añadir etiquetas
    this.etiquetas = [];                        //si no lo indica array vacio
    this.anyadirEtiquetas = function(...etiquetasNuevas) {
        etiquetasNuevas.forEach(etq => {        //por cada etiqueta nueva hacer que etq compruebe si
            if (typeof etq === "string" && !this.etiquetas.includes(etq)) { //es un string-cadena y etq no esta incluida en etiquetas
                this.etiquetas.push(etq);       //inserta al final
            }
        });
    
    };

     //borrar etiquetas
    this.borrarEtiquetas = function(...eliminarEtiquetas){
        eliminarEtiquetas.forEach(etq => {
            const indice = this.etiquetas.indexOf(etq);
                if (indice !== -1){
                    this.etiquetas.splice(indice, 1);
                }
            
        });
    }

    //mostrar gasto
    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    //añado gasto completo
    this.mostrarGastoCompleto = function() {
        const fechaLocal = new Date(this.fecha).toLocaleString();
        let textoEtiquetas = "Etiquetas:";     //texto inicial

        if (this.etiquetas.length) {           //compruebo en la cadena de etiquetas
            textoEtiquetas += "\n" + this.etiquetas.map(etiq => `- ${etiq}`).join("\n"); //si etiquetas creo una linea
        }
        else {
            textoEtiquetas += "\n(sin etiquetas)";
        }

return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${fechaLocal}
${textoEtiquetas}\n`;
};

    
    //actualizar descripcion
    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
    };

    //actualizar valor
    this.actualizarValor = function(nuevoValor){
        if (typeof nuevoValor === "number" && nuevoValor >= 0) {//son tres iguales
                this.valor = nuevoValor; 
            }
    };


    //actualizar fecha 
    this.actualizarFecha = function(nuevaFecha){
        if (typeof nuevaFecha === "string") {
            const fec = Date.parse(nuevaFecha);
            if (!Number.isNaN(fec)) {
                this.fecha = fec;
            }
           

    }
};
    
    //uso de metodo anyadirEtiquetas
    this.anyadirEtiquetas(...etiquetas);

    //agrupacion de periodo y fecha de gasto
    this.obtenerPeriodoAgrupacion = function(periodo) {
        const fechaObj = new Date(this.fecha);

        const anyo = String(fechaObj.getFullYear());
        const mes = String(fechaObj.getMonth() + 1).padStart(2, "0"); //meses empiezan en 0
        const dia = String(fechaObj.getDate()).padStart(2, "0");       

        if (periodo === "dia") {
            return `${anyo}-${mes}-${dia}`;
        }
        if (periodo === "mes") {
            return `${anyo}-${mes}`;
        }
        if (periodo === "anyo") {
            return `${anyo}`;
        }
        return "";
};



    
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
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
