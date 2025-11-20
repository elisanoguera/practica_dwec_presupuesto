import * as gesPres from "./gestionPresupuesto.js";


function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.querySelector("#" + idElemento);
    if (elemento) elemento.innerHTML = valor;
}

//Manejadores:
const EditarHandle = {
    handleEvent: function(e) {
        let d = prompt("Descripción:", this.gasto.descripcion);
        let v = prompt("Valor:", this.gasto.valor);      
        let fechaStr = new Date(this.gasto.fecha).toISOString().substring(0, 10);
        let f = prompt("Fecha (yyyy-mm-dd):", fechaStr);
        let et = prompt("Etiquetas (separadas por comas):", this.gasto.etiquetas.join(","));
    
        // CONVERSIÓN A NÚMERO (FLOAT) porque en el prompt siempre se recibe un string
        let valorNumerico = parseFloat(v);

        // Actualizamos el objeto gasto 
        this.gasto.actualizarDescripcion(d);
        this.gasto.actualizarValor(valorNumerico);
        this.gasto.actualizarFecha(f);
        
        // Convertimos etiquetas de string a array
        if (et) {
            this.gasto.anyadirEtiquetas(...et.split(","));
        }

        repintar();
    }
};

const BorrarHandle = {
    handleEvent: function(e) {
        gesPres.borrarGasto(this.gasto.id);
        repintar();
    }
};

const BorrarEtiquetasHandle = {
    handleEvent: function(e) {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
};

function actualizarPresupuestoWeb() {
    let nuevoPres = prompt("Introduzca nuevo presupuesto:");
    
    if (nuevoPres) {
        let presupuestoNum = parseFloat(nuevoPres);
        gesPres.actualizarPresupuesto(presupuestoNum);
        repintar();
    }
}

function nuevoGastoWeb() {
    let d = prompt("Descripción:");
    let v = prompt("Valor:");
    let fecha = prompt("Fecha (yyyy-mm-dd):");
    let et = prompt("Etiquetas separadas por comas:");
    let valorNum = parseFloat(v);
    let etiquetasArray = et ? et.split(",") : [];

    // Creao un nuevo gasto y lo añado a la gestión de presupuesto
    let newGasto = new gesPres.CrearGasto(d, valorNum, fecha, ...etiquetasArray);
    gesPres.anyadirGasto(newGasto);
    repintar();
}

function mostrarGastoWeb(idElemento, gasto) {
  const contenedor = document.querySelector("#" + idElemento);

  const divGasto = document.createElement("div");
  divGasto.classList.add("gasto");

  // descripción
  const divDesc = document.createElement("div");
  divDesc.classList.add("gasto-descripcion");
  divDesc.textContent = gasto.descripcion;
  divGasto.appendChild(divDesc);

  // fecha
  const divFecha = document.createElement("div");
  divFecha.classList.add("gasto-fecha");
  let fechaObj = new Date(gasto.fecha);
      if (!isNaN(fechaObj.getTime())) {
      divFecha.textContent = fechaObj.toISOString().substring(0,10);
    } else {
            divFecha.textContent = gasto.fecha;
          }
    divGasto.appendChild(divFecha);

  // valor
  const divValor = document.createElement("div");
  divValor.classList.add("gasto-valor");
  divValor.textContent = gasto.valor;
  divValor.textContent = gasto.valor.toFixed(2); 
  divGasto.appendChild(divValor);

  // etiquetas
  const divEtiquetas = document.createElement("div");
  divEtiquetas.classList.add("gasto-etiquetas");
  for (let etiqueta of gasto.etiquetas) {
    const span = document.createElement("span");
    span.classList.add("gasto-etiquetas-etiqueta");
    span.textContent = etiqueta;
   
    let handleEtiqueta = Object.create(BorrarEtiquetasHandle);
        handleEtiqueta.gasto = gasto;      // Vinculamos el gasto
        handleEtiqueta.etiqueta = etiqueta; // Vinculamos la etiqueta concreta
        span.addEventListener("click", handleEtiqueta, false);

        divEtiquetas.appendChild(span);
    }
    divGasto.appendChild(divEtiquetas);
    
   
    const btnEditar = document.createElement("button");
    btnEditar.type = "button";
    btnEditar.className = "gasto-editar";
    btnEditar.textContent = "Editar"; 
    let handleEdicion = Object.create(EditarHandle);
    handleEdicion.gasto = gasto;
    btnEditar.addEventListener("click", handleEdicion, false);
    divGasto.appendChild(btnEditar);

   
    const btnBorrar = document.createElement("button");
    btnBorrar.type = "button";
    btnBorrar.className = "gasto-borrar";
    btnBorrar.textContent = "Borrar";   
    let handleBorrado = Object.create(BorrarHandle);
    handleBorrado.gasto = gasto;
    btnBorrar.addEventListener("click", handleBorrado, false);
    divGasto.appendChild(btnBorrar);

    // Añadir al DOM
    contenedor.appendChild(divGasto);
}
  
  function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
  const contenedor = document.querySelector("#" + idElemento);
  if(!contenedor) return;

  // Limpiamos el contenedor antes de pintar para que no se acumulen si llamamos varias veces
  contenedor.innerHTML = ""; 

  const divAgrup = document.createElement("div");
  divAgrup.classList.add("agrupacion");

    for (let clave in agrup) {
    const divDato = document.createElement("div");
    divDato.classList.add("agrupacion-dato");

    // Estilos visuales extra
    divDato.style.marginBottom = "5px"; 
    divDato.style.borderBottom = "1px solid #eee";

    const spanClave = document.createElement("span");
    spanClave.classList.add("agrupacion-dato-clave");
    spanClave.style.fontWeight = "bold";
    spanClave.textContent = clave + " : ";


    const spanValor = document.createElement("span");
    spanValor.classList.add("agrupacion-dato-valor");
   spanValor.textContent = agrup[clave].toFixed(2) + " €";

    divDato.appendChild(spanClave);
    divDato.appendChild(spanValor);
    divAgrup.appendChild(divDato);
  }

  contenedor.appendChild(divAgrup);
}

function repintar() {
  
  mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());
  
    let divPres = document.getElementById("presupuesto");
  if (divPres) {
      divPres.style.marginBottom = "20px"; 
  }
  let totalGastos= gesPres.calcularTotalGastos();
  mostrarDatoEnId("gastos-totales", "<strong> Total Gastos: </strong> " + totalGastos.toFixed(2) + " €");

  let balance = gesPres.calcularBalance();
  mostrarDatoEnId("balance-total", "<strong> Balance: </strong>" + balance.toFixed(2) + " €");


   // Borrar contenido anterior
    let listadoDiv = document.getElementById("listado-gastos-completo");
    if (listadoDiv) {
      listadoDiv.innerHTML = ""; 
      
      
      let lista = gesPres.listarGastos();
      for (let gasto of lista) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
      }
  }
}

let btnActPresupuesto = document.getElementById("actualizarpresupuesto");
if(btnActPresupuesto) {
    btnActPresupuesto.addEventListener("click", actualizarPresupuestoWeb, false);
}

let btnAnyadirGasto = document.getElementById("anyadirgasto");
if(btnAnyadirGasto) {
    btnAnyadirGasto.addEventListener("click", nuevoGastoWeb, false);
}


export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    }
