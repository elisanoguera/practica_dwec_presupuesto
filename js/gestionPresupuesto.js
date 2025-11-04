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

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`; //corregido el texto

}

//agrego nuevas funciones vacias 
//funcion q devuelve gastos
function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;        //añado id a gastoy su valor sera idGasto

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
        suma += gasto.valor;        //agrego el valor del gasto a la suma
    }
    return suma;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}




//objeto gasto - propiedades descripcion y valor
function CrearGasto(descripcion, valor, fecha,...etiquetas) {
    this.descripcion = descripcion; //almaceno la descripcion

    if ( typeof valor === "number" && valor >= 0 ) {
        this.valor = valor;
    }
    else {
        this.valor = 0;
    }

    //metodos
    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
    };

    this.actualizarValor = function(nuevoValor){
        if (typeof nuevoValor === "number" && nuevoValor >= 0) {//son tres iguales
                this.valor = nuevoValor; 
            }
    
    };

    //fecha 
        if (typeof fecha === "string" && !isNaN(Date.parse(fecha))) {
            this.fecha = Date.parse(fecha);     //si valida se guarda en formato timestamp
        }
        else {
            this.fecha = Date.now();            //si no fecha actual
        }
      
    //etiquetas
    this.etiquetas = [];                        //si no lo indica array vacio

    this.anyadirEtiquetas = function(...etiquetasNuevas) {
        etiquetasNuevas.forEach(etq => {        //por cada etiqueta nueva hacer que etq compruebe si
            if (typeof etq === "string" && !this.etiquetas.includes(etq)) { //es un string-cadena y etq no esta incluida en etiquetas
                this.etiquetas.push(etq);       //inserta al final
            }
        });
    
    };

    //uso de metodo anyadirEtiquetas
    this.anyadirEtiquetas(...etiquetas);

    //añado gasto completo
    this.mostrarGastoCompleto = function() {
        const fechaLocal = new Date(this.fecha).toLocaleString();
        let textoEtiquetas = "Etiquetas:";     //texto inicial

        if (this.etiquetas.length) {           //compruebo en la cadena de etiquetas
            textoEtiquetas += "\n" + this.etiquetas.map(etiq => ` - ${etiq}`).join("\n"); //si etiquetas creo una linea
        }
        else {
            textoEtiquetas += "\n (sin etiquetas)";
        }
        

        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.  //del objeto actual
        Fecha: ${fechaLocal}
        ${textoEtiquetas}`;
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
    calcularBalance
}
