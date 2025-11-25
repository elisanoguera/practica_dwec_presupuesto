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

function mostrarPresupuesto()
    {
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
if (etiquetas.length > 0)//“Si on a reçu au moins une étiquette dans le constructeur, alors on exécute le bloc de code { ... }.”
     {
        etiquetas.forEach(e => {
            if (!this.etiquetas.includes(e)) {
                this.etiquetas.push(e);
            }
        });
    }
   
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
        for (let i = 0; i < neuvastiqueta.length; i++)
        {//verificar q etiqueta no existe ya
            if(!this.etiquetas.includes(neuvastiqueta[i]))
            {
            this.etiquetas.push(neuvastiqueta[i]);
            }// no se puede poner this.etiquetas.add(newtiqueta) estoy mezclando con c#
        }
    }

    this.mostrarGastoCompleto = function()
   {
        let texto = "Gasto correspondiente a " + this.descripcion +
                " con valor " + this.valor + " €.\n";

                texto += "Fecha: " + new Date(this.fecha).toLocaleString() + "\n";
    texto += "Etiquetas:\n";
   if (this.etiquetas.length === 0)
        {
        texto += "\n (No hay gasto)";
        }
    else
        {
        for (let i = 0; i < this.etiquetas.length; i++)
            {
            texto += "- " + this.etiquetas[i]+"\n";
                        }
        }
        return texto;
    }
    

    this.actualizarFecha = function(nuevaFecha)
    {
    let fechavalid = Date.parse(nuevaFecha);
    if (!isNaN(fechavalid))
        {
        this.fecha = fechavalid;
        }
    }

    this.borrarEtiquetas=function(...EtiqBorrar)
    {
    for(let i=0;i<EtiqBorrar.length;i++)
        {
         let Etiq=EtiqBorrar[i];   //etiqueta que quiero borrar [[i] position dans la liste]
            
                for(let j=this.etiquetas.length-1;j>=0;j--)//je parcoure les etiquettes de dr a gche
                {
                    if (this.etiquetas[j] === Etiq)
                        {
                        this.etiquetas.splice(j, 1);//borrar
                        }
                }
        }
    };
    
}


let gastos= []; // para mi no se puede usar new list[] como en c#
let idGasto=0;

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
{
    for( let i=0;i<gastos.length;i++)
    {
    if(gastos[i].id===id)
        {gastos.splice(i,1);//por supprimer (i,1) i=indice domnde se esta el gastp , 1= borra un elemento}
    return;
        }
    }
}
function calcularTotalGastos()//en cours a teminar
{
  let total=0; //j initialise total avec  valeur 0
  for(let g of gastos)//je parcours la liste gastos avec for...of
    {total+=g.valor;}//la a chaque gasto represente par g on ajoute sa valeur
    return total
}
function calcularBalance()//balance est ce qu il reste!! pas un moyenne
{
    return presupuesto-calcularTotalGastos();
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

