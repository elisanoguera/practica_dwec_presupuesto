// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupesto=0;

function actualizarPresupuesto()
    {
        // TODO
        let introducir=prompt("intro el coste")
        let valor=Number(introducir)
        if(isNaN(valor)||valor<0)
            {
                alert("error")
                return -1;
            }
            presupuesto=valor;
            return presupuesto;
    }
    function mostrarPresupuesto() {
    
    return "Tu presupesto actual es de ${presupuesto} €";
}
function CrearGasto(descripcion,valor)
{
    

    if(typeof valor!== "number"|| valor<0)
    {
        valor=0;

    }
    //propriedades
this.descripcion=descripcion;
this.valor=valor;

//metodos
this.mostrarGastos=function()
{
    return "Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €";
}
this.actualizarDescription=function(newDescripcion)
{
    this.descripcion=nuevaDescripcion
    return this.descripcion;
}
this.actualizarValor=function(newValor)
{
    if (typeof newValor=="number" && newvalor>=0)
    this.valor=newvalor;
    return this.valor;
}
}

function listarGastos()
{}
function anyadirGasto()
{}
function borrarGasto()
{}
function calcularTotalGastos()
{}
function calcularBalance()
{}

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