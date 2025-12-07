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
            
                for(let j=this.etiquetas.length-1;j>=0;j--)//je parcoure les etiquettes de dçr a gche
                {
                    if (this.etiquetas[j] === Etiq)
                        {
                        this.etiquetas.splice(j, 1);//borrar
                        }
                }
        }
    };

    this.obtenerPeriodoAgrupacion=function(periodo)//comand para probar: node js/gestionPresupuesto.js
    {
        let d= new Date(this.fecha)
        let annee=d.getFullYear();
        let mois=String(d.getMonth()+1).padStart(2,"0");//m cone pone avril= 3 con let mois=d.getMonth() debo ponr +1?
        //poner padstart para q empieze por 0 si hay solo un caracter !! si padstar = añadir string
        let jour=String(d.getDate()).padStart(2,"0");

        if (periodo==="dia")
            {
                return `${annee}-${mois}-${jour}`;
            }
        else if(periodo==="mes")
            {
                return `${annee}-${mois}`
            }
        else if(periodo==="anyo")
            {
                return `${annee}`
            }
        else
            {
                return null;
            }

    }
    
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
function calcularTotalGastos()
{
  let total=0; //j initialise total avec  valeur 0
  for(let g of gastos)//je parcours la liste gastos avec for...of
    {
        total+=g.valor;
    }//là a chaque gasto represente par g on ajoute sa valeur
    return total
}
function calcularBalance()//balance est ce qu il reste!! pas un moyenne
{
    return presupuesto-calcularTotalGastos();
}

//JS3
//function filtrarGastos(filtre)
function filtrarGastos(filtre = {})// on met filtre = {} :Parce que ça donne une valeur par défaut si aucun objet n'est passé.
{  
    let fechaDesde=filtre.fechaDesde;
    let fechaHasta=filtre.fechaHasta;
    let valorMinimo=filtre.valorMinimo;
    let valorMaximo=filtre.valorMaximo;
    let descripcionContiene=filtre.descripcionContiene;
    let etiquetasTiene=filtre.etiquetasTiene;
return gastos.filter(g =>// funcion g 
        {
            if(fechaDesde)
                {
                    let dfd=Date.parse(filtre.fechaDesde);//dfd=date fecha desde
                if(g.fecha<dfd)
                    {
                        return false;
                    }
                }
            if(fechaHasta)
                {
                    let dfh=Date.parse(filtre.fechaHasta);//dfh=date fecha hasta
                    if(g.fecha>dfh)
                    {
                        return false;
                    }
                }
            if(valorMinimo!==undefined)
                {
                    if(valorMinimo>g.valor)
                    {
                        return false
                    }
                }
            if(valorMaximo!==undefined)
                {
                    if(valorMaximo<g.valor)
                    {
                        return false
                    }
                }
            if(descripcionContiene)//pour la casse tolower comme en c#
                {
                    let text=filtre.descripcionContiene.toLowerCase();
                    if(!g.descripcion.toLowerCase().includes(text))
                    {
                        return false;
                    }           
                }
            if(etiquetasTiene)
                {
                     if (typeof etiquetasTiene === "string")
                        {
                         etiquetasTiene = [etiquetasTiene];// je sois le normaliser: si c'est une chaîne → je dois le convertir en tableau
                        }
                    let etiquetasGastotoLower=g.etiquetas.map(eti=>eti.toLowerCase())// Étiquettes du gasto en minuscules

                    let coincide = false;// Variable pour savoir si AU - 1 étiquette correspond

                    for(let etiqueta of etiquetasTiene)
                    {// j ai du tout remodifier c est un tableau on ne peut utliser tolower q sur une methode
                        let etiLower=etiqueta.toLowerCase();
                   // if(!g.etiquetas.includes(etiqueta))
                   if(etiquetasGastotoLower.includes(etiLower))
                        {
                            coincide=true;
                            break;
                        }
                 
                    }

                    if (!coincide)
                        {
                            return false;
                        }
                }

    
            return true;
    });
} 


function agruparGastos(periodo="mes", etiquetas=[],fechaDesde, fechaHasta=Date.now())
{
    let filtros={};
    if(fechaDesde)//si existe
    {
        filtros.fechaDesde=fechaDesde;
    }
    if(fechaHasta)//si existe sino date du jour
    {
        filtros.fechaHasta=fechaHasta;
    }
    else
    {
        filtros.fechaHasta=new Date().toISOString();//para no devolver cadena de caracteres
    }
    if(etiquetas&&etiquetas.length>0)
    {
        filtros.etiquetasTiene=etiquetas;
    }
    let gastosFiltrados = filtrarGastos(filtros);

let res = gastosFiltrados.reduce((acc, gasto) => {

    
    let clave = gasto.obtenerPeriodoAgrupacion(periodo);// je dois Obtenir la clé de regroupement (exemple: "2021-10") l enoince me dit periodo

    //il faut Ajouter la valeur du gasto dans la bonne catégorie
    acc[clave] = (acc[clave] || 0) + gasto.valor;//   - Si acc[clave] existe → on ajoute /acc accumule//   - Sinon acc[clave] vaut 0 → on initialise et on ajoute
    
   

    return acc; // On return  l’accumulateur qui s est modifié à chaque étape (un peut comme un count)

}, {}); // 4. L’accumulateur debe siempre commence comme un objet vide  !! important ne plus l oublier

  return res;//ne pas oublier le resultat que l on veut renvoyer!! y no confundir con acc
}



let testGasto = new CrearGasto("Test", 50, "2024-04-05");

console.log("DIA:", testGasto.obtenerPeriodoAgrupacion("dia"));
console.log("MES:", testGasto.obtenerPeriodoAgrupacion("mes"));
console.log("ANYO:", testGasto.obtenerPeriodoAgrupacion("anyo"));
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
