// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto=0;

function actualizarPresupuesto(presup)
    {
        // TODO
        //let introducir=prompt("intro el coste") el enunciado no lo pide
        let valor=Number(presup);
        if(isNaN(valor)||valor<0)
            {
                console.log("error  con el presupuesto");
                //alert("error con el presupuesto")
                return -1;
            }
            presupuesto=valor;
            return presupuesto;
    }
    function mostrarPresupuesto() {
    
    return `Tu presupuesto actual es de ${presupuesto} €`;
}
function CrearGasto(descripcion,valor,fecha, ...etiquetas)
{
    

    if(typeof valor!== "number"|| valor<0)//validar el valor introducido
    {
        valor=0;
    }
    let fechaok=Date.parse(fecha);
    if( isNaN(fechaok))
    {
        this.fecha=Date.now();//define en timestamp
    }
    else 
        {
        this.fecha=fechaok;
    }
    //propriedades
this.descripcion=descripcion;
this.valor=valor;
this.etiquetas=[];
//this.fecha=Date.now();//NO SE DEBE PONER AQUI PORQUE ÉCRASE LO QUE HE HECHO ANTES

//metodos
    this.mostrarGasto=function()
    {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }
    this.actualizarDescripcion=function(nuevaDescripcion)
    {
        this.descripcion=nuevaDescripcion
        //return this.descripcion;
    }
    this.actualizarValor=function(nuevoValor)
    {
        if (typeof nuevoValor=="number" && nuevoValor>=0)
        this.valor=nuevoValor;
        //return this.valor;
    }
    this.anyadirEtiquetas=function(...neuvastiqueta)
    {
        this.etiquetas.push(newtiqueta);// no se puede poner this.etiquetas.add(newtiqueta) estoy mezclando con c#
    }

}

let gastos= []; // para mi no se puede usar new list[] como en c#
let idGastos=0;

function listarGastos()
{
    return gastos;
}

function anyadirGasto(gasto)
{
    gasto.id=idGasto;//aniadir el id al gasto
    idGasto++;
    gastos.push(gasto);
}
function borrarGasto(id)
{gasto.delete;
    idGasto--;
}
function calcularTotalGastos()//en cours a teminar
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