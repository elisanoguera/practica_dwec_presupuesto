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

export function nuevoGastoWebFormulario(event)
    {
       let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);

       var formulario = plantillaFormulario.querySelector("form");
    
    //handler del submit
    formulario.addEventListener("submit", function(event) {event.preventDefault();

        let form = event.currentTarget;

        let descripcion = form.descripcion.value;
        let valor = Number(form.valor.value);
        let fecha = form.fecha.value;
        let etiquetas = form.etiquetas.value.split(",").map(e => e.trim());

        let nuevo =new logica.CrearGasto(descripcion, valor, fecha, ...etiquetas);
        logica.anyadirGasto(nuevo);

//mettre repintar() ici!
    repintar();

    // réactiva le boton
        document.getElementById("anyadirgasto-formulario").disabled = false;

        // quitar el form
          form.remove();
           });

      function CancelarHandle() {}
    CancelarHandle.prototype.handleEvent = function(event)
    {
        formulario.remove();
        document.getElementById("anyadirgasto-formulario").disabled = false;
    };

let btnCancelar = formulario.querySelector("button.cancelar");
btnCancelar.addEventListener("click", new CancelarHandle());
   
 document.getElementById("anyadirgasto-formulario").disabled = true;

  document.getElementById("controlesprincipales").appendChild(formulario);

}

export function mostrarGastoWebCompat(gasto) {
    // detectar capa existente
    let capa =
        document.getElementById("listado-gastos-completo") ||
        document.getElementById("listado-gastos") ||
        document.getElementById("listado-regexp");

    if (!capa) return;

    mostrarGastoWeb(capa.id, gasto);
}

export function /*pintar*/mostrarGastoWeb(idElemento, gasto)
    {
        if (gasto === undefined) {
                gasto = idElemento;               // le gasto est en réalité le premier paramètre
                idElemento = "listado-gastos";    // la capa que Cypress utilise
            }


        let gastobyid=document.getElementById(idElemento);//pour le rattacher lors de  l appel dans generarDatosEstatico

if (!gasto) return;

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

let btnEditarForm=document.createElement("button");
btnEditarForm.textContent="Editar Formulario";
btnEditarForm.className="gasto-editar-formulario"

let handlerEditForm= new EditarHandleFormulario(gasto);
btnEditarForm.addEventListener("click", handlerEditForm);

divGasto.appendChild(btnEditarForm);

    gastobyid.appendChild(divGasto);
    }

/*export function mostrarGastoWeb(a, b) {
    if (b === undefined) {
        // Appel Cypress → un seul argument
        pintarmostrarGastoWeb("listado-gastos-completo", a);
    } else {
        // Appel normal → 2 arguments
        pintarmostrarGastoWeb(a, b);
    }
}*/


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
export function filtrarGastosWeb(event)
{
event.preventDefault();//  Empêcher le rechargement de la page

// Lire les valeurs du formulaire
let descri=document.getElementById("formulario-filtrado-descripcion").value.trim();//trim=quitar espacios
let valMin=document.getElementById("formulario-filtrado-valor-minimo").value;//value = ce que l’utilisateur tape dans ce champ: <input type="text" id="formulario-filtrado-descripcion">
let valMax=document.getElementById("formulario-filtrado-valor-maximo").value;
let fechaDesde=document.getElementById("formulario-filtrado-fecha-desde").value;
let fechaHasta=document.getElementById("formulario-filtrado-fecha-hasta").value;
let etiquetasTexto=document.getElementById("formulario-filtrado-etiquetas-tiene").value;

let filtros={};// Construire l’objet filtros (seulement les valeurs remplies)

if(descri !=="")filtros.descripcionContiene=descri;
if(valMin !=="")filtros.valorMinimo=Number(valMin);
if(valMax !=="")filtros.valorMaximo=Number(valMax);
if(fechaDesde !=="")filtros.fechaDesde=fechaDesde;
if(fechaHasta !=="")filtros.fechaHasta=fechaHasta;

if(etiquetasTexto.trim() !=="")filtros.etiquetasTiene=logica.transformarListadoEtiquetas(etiquetasTexto);

let lista=logica.filtrarGastos(filtros);//Appliquer le filtrado

let capa =
    document.getElementById("listado-gastos-completo") ||
    document.getElementById("listado-gastos") ||
    document.getElementById("listado-regexp");

if (!capa) return; // Effacer l’affichage précédent= « Remplace tout le HTML de cette div par rien du tout. »
 capa.innerHTML = "";
lista.forEach(g=>mostrarGastoWebCompat(g)); //Afficher les résultats filtrés
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

        let nuevoGasto=new logica.CrearGasto(descripcion,valor,fecha, ...etiquetas)

        logica.anyadirGasto(nuevoGasto);

        repintar();
    }


export function EditarHandleFormulario(gasto) {
    this.gasto = gasto;
}

export function guardarGastosWeb() {
    let datos = JSON.stringify(logica.listarGastos());
    localStorage.setItem("GestorGastosDWEC", datos);
}

export function cargarGastosWeb() {
    let datos = localStorage.getItem("GestorGastosDWEC");

    if (!datos) {
        logica.cargarGastos([]);  // rien stocké → lista vide
    } else {
        let array = JSON.parse(datos);
        logica.cargarGastos(array);  // rehídratar
    }

    repintar();
}



EditarHandleFormulario.prototype.handleEvent = function(event) {
    event.currentTarget.disabled = true;
    let botonEditarFormulario = event.currentTarget;
    // Clonar el template
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);

    let formulario = plantillaFormulario.querySelector("form");

    // Relleñar con datos existantes
    formulario.descripcion.value = this.gasto.descripcion;
    formulario.valor.value = this.gasto.valor;
    formulario.fecha.value = this.gasto.fecha;
    formulario.etiquetas.value = this.gasto.etiquetas.join(",");

    // Handler submit - objeto
    function SubmitEditarHandle() {}
    SubmitEditarHandle.prototype.handleEvent = function(event) {event.preventDefault();

        let form = event.currentTarget;

        this.gasto.actualizarDescripcion(form.descripcion.value);
        this.gasto.actualizarValor(Number(form.valor.value));
        this.gasto.actualizarFecha(form.fecha.value);

        this.gasto.etiquetas = [];
        form.etiquetas.value.split(",").map(e => e.trim()).forEach(etiq =>
            this.gasto.anyadirEtiquetas(etiq)
        );

        repintar();

        form.remove();
    };

    let submitHandler = new SubmitEditarHandle();
    submitHandler.gasto = this.gasto;

    formulario.addEventListener("submit", submitHandler);

    // Handler Cancelar = réutilisar
    function CancelarHandle() {}
    CancelarHandle.prototype.handleEvent = function(event) {
        formulario.remove();
        //event.currentTarget.parentNode.querySelector(".gasto-editar-formulario").disabled = false;
        this.boton.disabled = false;
    };

    let cancelHandler = new CancelarHandle();
    cancelHandler.boton = botonEditarFormulario;

    formulario.querySelector("button.cancelar")
        .addEventListener("click", cancelHandler);

    // Ajouter au DOM
    //document.getElementById("controlesprincipales").appendChild(formulario);
    event.currentTarget.parentNode.appendChild(formulario);
};


let botonActualizar=document.getElementById("actualizarpresupuesto");
botonActualizar.addEventListener("click", actualizarPresupuestoWeb);//no poner () a actualisar porq sino de lanza directamente});

let bontoNuevoGasto=document.getElementById("anyadirgasto");
bontoNuevoGasto.addEventListener("click",nuevoGastoWeb);

let btnForm = document.getElementById("anyadirgasto-formulario");
btnForm.addEventListener("click", nuevoGastoWebFormulario);

document.getElementById("formulario-filtrado")//practica 7: Ajouter le LISTENER du formulaire
        .addEventListener("submit", filtrarGastosWeb);


document.getElementById("guardar-gastos")
    .addEventListener("click", guardarGastosWeb);

document.getElementById("cargar-gastos")
    .addEventListener("click", cargarGastosWeb);

