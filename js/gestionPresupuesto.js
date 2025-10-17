// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valorActualizado) {
    // TODO
    if(valorActualizado >= 0){
        presupuesto = valorActualizado;
        return presupuesto;
    }
    else{
        console.log("El presupuesto no puede ser negativo");
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return "Tu presupuesto actual es de " + presupuesto + " €";
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
    for(let i = 0; i < gastos.length; i++){
        if(gastos[i].id === id){
            gastos.splice(i, 1);
        }
}

function calcularTotalGastos(){
    let totalGastos = 0;
    for(let i = 0; i < gastos.length; i++){
        totalGastos += gastos[i].valor;
    }
    return totalGastos;
}

function calcularBalance() {
    let total= calcularTotalGastos();
    let Balance = presupuesto - total;
    return Balance;
}

function CrearGasto(descripcion, valor, fecha, etiquetas) {
    // TODO
    this.descripcion = descripcion;

    if(valor >= 0){
        this.valor = valor;
    }
    else{
        this.valor = 0;
    };

    this.mostrarGasto = function() {
        return("Gasto correspondiente a " + descripcion + " con valor " + valor + " €");
    };

    this.actualizarDescripcion = function(descripcionActualizada) {
        this.descripcion = descripcionActualizada;
    };
    
    this.actualizarValor = function(valorActualizado) {
        if(valorActualizado >= 0){
            this.valor = valorActualizado;
        }else{
            this.valor = this.valor;
        }
    };

    if(etiquetas == null){
        this.etiquetas = [];
    }else{
        this.etiquetas = etiquetas;
    }

    if(fecha == null || isNan(Date.parse(fecha))){
        this.fecha = new Date().getTime();
    }else{
        this.fecha = new Date(fecha).getTime();
    }
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
