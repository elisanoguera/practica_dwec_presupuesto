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
}