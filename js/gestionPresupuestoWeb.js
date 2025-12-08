import*as logica from "./gestionPresupuesto.js";

//hay que definir Editarhandle  antes de crera el boton!


//  HANDLER EDITAR
export function EditarHandle(gasto)// funcion constructora
    {
this.gasto = gasto;// chaque handler a son propio gasto
    }
/*prototype sert à :
définir les méthodes partagées par toutes les instances créées avec new EditarHandle(...)
éviter dupliquer des fonctions dans chaque objet
définir le “comportement” commun du type EditarHandle*/
    EditarHandle.prototype.handleEvent = function(event)//def su metodo
    {
    let nuevaDesc = prompt("Descripción:", this.gasto.descripcion);
    let nuevoValor = Number(prompt("Valor:", this.gasto.valor));
    let nuevaFecha = prompt("Fecha:", this.gasto.fecha);

    let nuevasEtiquetas = prompt("Etiquetas:", this.gasto.etiquetas.join(",")).split(",").map(e => e.trim());
    //split(",") : découpe la string en tableau
// map(...) : nettoie chaque élément
// résultat final : un array propre d’étiquettes

    this.gasto.actualizarDescripcion(nuevaDesc);
    this.gasto.actualizarValor(nuevoValor);
    this.gasto.actualizarFecha(nuevaFecha);

    this.gasto.etiquetas = [];
    nuevasEtiquetas.forEach(etiq => this.gasto.anyadirEtiquetas(etiq));

        repintar();
    }


/*HANDLER borrar*/
export function BorrarHandle(gasto)
    {
        this.gasto = gasto; // hase referencia al gasto a borrar
    }
    BorrarHandle.prototype.handleEvent = function(event)
    {
    // Borrar el gasto usando su id
    logica.borrarGasto(this.gasto.id);

    // Repintar la página para actualizar la lista
    repintar();
    };

//HANDLER BORRAR ETIQUETAS


export function BorrarEtiquetasHandle(gasto, etiqueta)
{
    this.gasto = gasto;
    this.etiqueta = etiqueta;
}

BorrarEtiquetasHandle.prototype.handleEvent = function(event)
{
    this.gasto.borrarEtiquetas(this.etiqueta);
    repintar();
};
//*fin de borraretiqeutas
export function mostrarDatoEnId(idElemento, valor)

    {
        // TODO
        let element=document.getElementById(idElemento);
        element.textContent=valor;
    }

export function mostrarGastoWeb(idElemento, gasto)
    {
        let gastobyid=document.getElementById(idElemento);//pour le rattacher lors de  l appel dans generarDatosEstatico

        //crear el div principal
        let divGasto=document.createElement("div");
        divGasto.className="gasto";

        //creer clas gasto descriptio
        let divGDescripcion=document.createElement("div");
        divGDescripcion.className="gasto-descripcion";
        divGDescripcion.textContent=gasto.descripcion;

        //creer clas gasto fecha
        let divGFecha=document.createElement("div");
        divGFecha.className="gasto-fecha";
        divGFecha.textContent=new Date(gasto.fecha).toLocaleDateString();//error de frappe= attention bien mettre le . entre gasto y fecha

        //crear gasto valor
        let divGValor=document.createElement("div");
        divGValor.className="gasto-valor";
        divGValor.textContent=gasto.valor;
        
        //crear div gasto etiquetas
        let divGetiquetas=document.createElement("div");
        divGetiquetas.className="gasto-etiquetas";
        /*divGetiquetas=gasto.etiquetas;
        //ahora el span etiqueta
        let spanGetiqueta=document.createElement("span");
        spanGetiqueta.className="gasto-etiquetas-etiqueta";*/  // no funciona
        //je dois parcourir toutes les étiquettes du gasto

        gasto.etiquetas.forEach(etiqueta => {
            let spanGetiqueta=document.createElement("span")
             spanGetiqueta.className="gasto-etiquetas-etiqueta";
             spanGetiqueta.textContent = etiqueta;
             //Habia olvidado el manejador para borrar etiqueta
             let handlerBorrarEtiqueta = new BorrarEtiquetasHandle(gasto, etiqueta);
                 spanGetiqueta.addEventListener("click", handlerBorrarEtiqueta);

             divGetiquetas.appendChild(spanGetiqueta)});

    divGasto.appendChild(divGDescripcion);
    divGasto.appendChild(divGFecha);
    divGasto.appendChild(divGValor);
    divGasto.appendChild(divGetiquetas);


//Boton editar
let btnEditar = document.createElement("button");//tiene que venir aqui y no fuera
btnEditar.textContent = "Editar";
btnEditar.className = "gasto-editar";

// Crear objeto manejador con el gasto asociado
let handlerEditar = new EditarHandle(gasto);

// lo asocio el evento
btnEditar.addEventListener("click", handlerEditar);

// Añado el botón al div principal
divGasto.appendChild(btnEditar);

// ----- BOTÓN BORRAR -----
let btnBorrar = document.createElement("button");
btnBorrar.textContent = "Borrar";
btnBorrar.className = "gasto-borrar";

let handlerBorrar = new BorrarHandle(gasto);
btnBorrar.addEventListener("click", handlerBorrar);

divGasto.appendChild(btnBorrar);

    gastobyid.appendChild(divGasto);
    }

// Mostrar los gastos agrupados (resultado de agruparGastos)

export function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
    {
        // TODO
      
  let agrupById=document.getElementById(idElemento);

        let divGagrup=document.createElement("div");
        divGagrup.className="agrupacion";

      
//tengo q crear el h1- no olvidar

    let Gh1 = document.createElement("h1");
    Gh1.textContent = `Gastos agrupados por ${periodo}`;//RENVOI A LA PERIDOE CHOISIE
    divGagrup.appendChild(Gh1);
// important: Object.entries(obj) transforme un objet en un tableau de paires [clé, valeur].
Object.entries(agrup).forEach(([clave,valor])=>
        {
            let divGagrupDatos=document.createElement("div");
            divGagrupDatos.className="agrupacion-dato";

            let spanGagrupDatoClave=document.createElement("span");
            spanGagrupDatoClave.className="agrupacion-dato-clave";
            spanGagrupDatoClave.textContent = clave;

            let spanGagrupDatoValor=document.createElement("span");
            spanGagrupDatoValor.className="agrupacion-dato-valor";
            spanGagrupDatoValor.textContent = valor;

            
            divGagrupDatos.appendChild(spanGagrupDatoClave);
            divGagrupDatos.appendChild(spanGagrupDatoValor);
            divGagrup.appendChild(divGagrupDatos);
        });
agrupById.appendChild(divGagrup);//no olvidar lo ni poner lo dentro del foreach
    }


export function repintar()//!! cuidadado si la pongo primera en el archivo= NO RECONOCE LAS QUE USA
{
//debemos mostrar el resultado en la página HTML. Recordemos que la aplicación debe mostrar:

// El presupuesto
    mostrarDatoEnId("presupuesto", logica.mostrarPresupuesto());
//  El total de gastos
    mostrarDatoEnId("gastos-totales", logica.calcularTotalGastos());
//  El balance actual
    mostrarDatoEnId("balance-total", logica.calcularBalance());
  //  El listado con los gastos y sus datos
   // Otra información (agrupaciones de gastos, etc.)

    //antes de l afficher = lo tengo q vaciar

    document.getElementById("listado-gastos-completo").innerHTML="";
    // -->afficher de nuevo
    logica.listarGastos().forEach(g =>
        mostrarGastoWeb("listado-gastos-completo", g)
    )

}

export function actualizarPresupuestoWeb()
    {
        let aprietar=prompt("Introduce el nuevo presupesto:");
        //if
        let valor=Number(aprietar);

        logica.actualizarPresupuesto(valor);

        repintar();//para actualizar el print
    }


//el bonton lo tengo q hacer aqui no en el HTML
//no se carga
//lo intento en una funcion
//export function
/*window.addEventListener("DOMContentLoaded", () => {*/
let botonActualizar=document.getElementById("actualizarpresupuesto");
botonActualizar.addEventListener("click", actualizarPresupuestoWeb);//no poner () a actualisar porq sino de lanza directamente});

export function nuevoGastoWeb()
    {
        //let aprietar=prompt("Introduce el nuevo gasto:");
        let descripcion= prompt("Descripción del gasto:");
        let valorString=prompt("Valor del gasto:");
        if (isNaN(valorString)) {
    valor = 0;  // o lanzar un error, pero 0 evita romper el test
}
        let fecha=prompt("Fecha (yyyy-mm-dd):");
        let etiquetasString=prompt("Etiquetas (tiene que ser separadas por comas):")
        let valor=Number(valorString);

        let etiquetas=[];
        //if(etiquetascomas)
        if (etiquetasString && etiquetasString.trim() !== "") {
        etiquetas = etiquetasString.split(",").map(e => e.trim());
    }

        let nuevoGasto=logica.CrearGasto(descripcion,valor,fecha, ...etiquetas)

        logica.anyadirGasto(nuevoGasto);

        repintar();
    }

let bontoNuevoGasto=document.getElementById("anyadirgasto");
bontoNuevoGasto.addEventListener("click",nuevoGastoWeb);




