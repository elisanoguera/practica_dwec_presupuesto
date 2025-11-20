// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

import eslintPluginCypress from "eslint-plugin-cypress";

// TODO: Variable global

let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(parametro) {
    // TODO

    if(parametro >= 0){
        presupuesto = parametro;
        return presupuesto;
    }
    else{

        console.log('Error valor no valido');
        return -1;
        
    }

    
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;

}

function CrearGasto(descripcion, valor, fecha, etiquetas) {
    // TODO

    valor = Number(valor);
if (isNaN(valor) || valor <= 0) {
    this.valor = 0;
} else {
    this.valor = valor;
}


    //Le añadimos las propiedades
    this.descripcion = descripcion;

    //Creamos los metodos
    //metodo para mostrar el gasto
    this.mostrarGasto = function(){
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
    }

    //Metodo para actualizar la descripcion
    this.actualizarDescripcion = function(nuevaDescripcion){
        this.descripcion = nuevaDescripcion;
    }

    //Metodo para actualizar el valor del objeto
    this.actualizarValor = function(nuevoValor){
        if(nuevoValor > 0){
            this.valor = nuevoValor;  
        }
        else{
            console.log("Valor introducido negativo. Introduzca otro valor");
        }
    } 
    
    //Añadimos los nuevos archivos a la funcion.
    //Parametro para añadir la fecha en la que se ha registrado el gasto
    var t = new Date(fecha);
    if (t === t) {
        this.fecha = t;
    } else {
        this.fecha = new Date(0);
    }
    //Propiedad para añadir varias etiquetas y categorizar un gasto
    this.etiquetas = [];

    if (Array.isArray(etiquetas)) {
    for (var i = 0; i < etiquetas.length; i++) {
        if (etiquetas[i]) this.etiquetas.push(etiquetas[i]);
    }
    } else {
        // Si se pasan varios parámetros como etiquetas, empezando desde el 3er índice
        for (var i = 3; i < arguments.length; i++) {
            if (arguments[i]) this.etiquetas.push(arguments[i]);
        }
    }

    //Funciones
    this.mostrarGastoCompleto = function() {

        var texto = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €.\n";

        var fechaGasto = new Date(this.fecha);
        texto = texto + "Fecha: " + fechaGasto.toLocaleString() + "\n";

        texto = texto + "Etiquetas:\n";
        //Si el numero de etiquecas es 0 indicamos ninguna
        if(this.etiquetas.length === 0){
            texto = texto + " Ninguna";
        }else{
            for(var i = 0; i < this.etiquetas.length; i++){
                texto += "- " + this.etiquetas[i] + "\n";
            }
        } 

        return texto;
    }

    this.actualizarFecha = function(nuevaFecha){
        var lineaTiempo = Date.parse(nuevaFecha);
        if (lineaTiempo === lineaTiempo){
            this.fecha = lineaTiempo;
        }
    }

    this.anyadirEtiquetas = function() {
        for(var i = 0; i < arguments.length; i++){
            var et = arguments[i];
        
            var existe = false;

            for(var j = 0; j < this.etiquetas.length; j++){
                if(this.etiquetas[j] === et){
                existe = true;
                break;
                }
            }
            if(!existe) {
            this.etiquetas.push(et);
            }
        }

    }

    this.borrarEtiquetas = function(){
        var nuevasetiquetas = [];

        for(var i = 0; i < this.etiquetas.length; i++){
            var actual = this.etiquetas[i];
            var borrar = false;

            for(var j = 0; j < arguments.length; j++){
                if(actual === arguments[j]){
                    borrar = true;
                    break;
                }
            }

            if(!borrar){
            nuevasetiquetas.push(actual);
            }
        }

        this.etiquetas = nuevasetiquetas;
    }

    this.obtenerPeriodoAgrupacion = function(periodo){

        var fecha = this.fecha;
        var year = fecha.getFullYear();
        var month = (fecha.getMonth() + 1).toString().padStart(2, '0');
        var day = fecha.getDate().toString().padStart(2, '0');

        if(periodo === "dia"){
            return year + "-" + month + "-" + day;
        }else if(periodo === "mes"){
            return year + "-" + month;
        }else if(periodo === "anyo"){
            return year.toString();
        }else{
            return null;
        }

    }

}

//Creamos las funciones vacias despues de añadirlas al objeto export

function listarGastos() {

    return gastos;
}

//Error estaba pasando como parametro la variable global gastos.
function anyadirGasto(gasto) {

    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);

}

function borrarGasto(id) {

    //creamos una nueva lista para ir añadiendo los valores que no coincidan con el id
    var nuevos = [];
    var i;

    //recorremos la lista
    for(i = 0; i < gastos.length; i++){
        //realizamos la comparacion para que el id no sea igual y lo añadimos a la lista nueva
        if(gastos[i].id !== id){
            nuevos.push(gastos[i])
        }
    }

    //modificamos la lista gastos cambiandola con los valores añadidos que no coincidian con el id
    gastos = nuevos;

}

function calcularTotalGastos() {

    var total = 0;

    for(var i = 0; i < gastos.length; i++){
        total = total + gastos[i].valor;
    }

    return total;

}

//Estaba intentando restar la funcion calcular total gastos sin añadirlo a una variable, tambien me faltaba el parentesis...=>
//despues de llamar a la funcion.
function calcularBalance() {

    var total = calcularTotalGastos();

    return presupuesto - total;

}

function filtrarGastos(filtros){
    
    //devovemos los gastos filtrados ejecutados en la funcion.
    return gastos.filter(function(gasto){

        //Filtamos desde la fecha desde
        if(filtros.fechaDesde){
            var fechaMin = Date.parse(filtros.fechaDesde);
            //si la fecha del gasto es menor a la fecha minima no se contabiliza
            if(gasto.fecha < fechaMin){
                return false;
            }
        }

        //si la fecha del gasto es mayor a la fecha maxima no se contabiliza
        if(filtros.fechaHasta){
            var fechaMax = Date.parse(filtros.fechaHasta);
            if(gasto.fecha > fechaMax){
                return false;
            }
        }

        //Si el gasto es menor al valor minimo no se contabiliza
        if(filtros.valorMinimo !== undefined){
            if(gasto.valor < filtros.valorMinimo){
                return false;
            }
        }

        //Si el gasto es mayor al valor maximo no se contabiliza
        if(filtros.valorMaximo !== undefined){
            if(gasto.valor > filtros.valorMaximo){
                return false;
            }
        }

        if(filtros.descripcionContiene){
            //Pasamos las descripciones a minusculas
            var desc = gasto.descripcion.toLowerCase();
            var texto = filtros.descripcionContiene.toLowerCase();
            //Comprobamos que se contiene la descripcion, sino se devuelve vacio.
            if(desc.toLowerCase().indexOf(texto.toLowerCase()) === -1){
                return false;
            }
        }

        //Comprobación de que el array contiene etiquetas
        if (Array.isArray(filtros.etiquetasTiene) && filtros.etiquetasTiene.length > 0) {

            //Mapeamos las etiquetas para ver cuales son y pasarlas a minusculas.
            var etiquetasFiltro = filtros.etiquetasTiene.map(e => e.toLowerCase());
            var etiquetasGasto = gasto.etiquetas.map(e => e.toLowerCase());

            //Recorremos las etiquetas para comprobar que esta dentro la que buscamos
            var encontrado = etiquetasGasto.some(e => etiquetasFiltro.includes(e));

            //sino son iguales no se añaden
            if (!encontrado) {
                return false;
            }
        }

        return true;
    })

}

//funcion con los cuatro parametros y el periodo mes por defecto
function agruparGastos(periodo = "mes", etiquetas = [], fechaDesde, fechaHasta){

    //creamos filtrados para pasar el filtro
    var filtrados = filtrarGastos({
        fechaDesde: fechaDesde,
        fechaHasta: fechaHasta,
        etiquetasTiene: etiquetas
    });
    
    //creamos la funcion reduce a traves de la variable resultado
    var resultado = filtrados.reduce(function(acc, gasto) {

        //añadimos los gastos a traves del periodo a la variable vacia clave
        var clave = gasto.obtenerPeriodoAgrupacion(periodo);

        //si el acumulado es diferente de la clave le inciamos 0
        if (!acc[clave]) {
            acc[clave] = 0;
        }

        //Sino le añadimos al acumulador el valor del gasto.
        acc[clave] += gasto.valor;

        //Devolvemos el acumulador a resultado
        return acc;

    }, {}); 

    //Por ultimo devolvemos el resultado.
    return resultado;

}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    filtrarGastos,
    agruparGastos,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
    
}
