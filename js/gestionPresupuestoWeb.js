// importa libreria
import * as gespre from './gestionPresupuesto.js';

// Muestra un valor (texto o número) dentro de un elemento HTML por su id
function mostrarDatoEnId(idElemento, valor) {
  // Busco en el documento el elemento con ese id
  let elemento = document.getElementById(idElemento);

  // Si existe el elemento 
  if (elemento) {
    // Le colocamos el valor que queremos mostrar
    elemento.textContent = valor;
    } else {
        console.error(`Elemento con id "${idElemento}" no encontrado`);
    }
  }
  

//nueva prueba

// esta funcion recibe el id del elemento contenedor y un objeto gasto (recordemos que gasto tiene: descripcion, fecha, valor, etiquetas)
function mostrarGastoWeb(idElemento, gasto) {
    let elementoContenedor = document.getElementById(idElemento);
    
    let divGasto = document.createElement("div");
    divGasto.className = "gasto";
    
    // Creo elemento para la descripción
    let divDescripcion = document.createElement("div");
    divDescripcion.className = "gasto-descripcion";
    divDescripcion.textContent = gasto.descripcion;
    
    // Creo elemento para la fecha
    let divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    
    // Creo elemento para el valor
    let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.textContent = gasto.valor;
    
    // Creo contenedor para etiquetas
    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";
    
    // Creo elementos para cada etiqueta
    if (gasto.etiquetas && gasto.etiquetas.length > 0) {
        for (let i = 0; i < gasto.etiquetas.length; i++) {
            let spanEtiqueta = document.createElement("span");
            spanEtiqueta.className = "gasto-etiquetas-etiqueta";
            spanEtiqueta.textContent = gasto.etiquetas[i];
              
            // CREAR MANEJADOR PARA BORRAR ETIQUETA
            let borrarEtiquetaHandler = new BorrarEtiquetasHandle();
            borrarEtiquetaHandler.gasto = gasto;
            borrarEtiquetaHandler.etiqueta = gasto.etiquetas[i];
            spanEtiqueta.addEventListener("click", borrarEtiquetaHandler);
            divEtiquetas.appendChild(spanEtiqueta);
        }
    }

    // BOTÓN EDITAR (prompts)
    let botonEditar = document.createElement("button");
    botonEditar.type = "button";
    botonEditar.className = "gasto-editar";
    botonEditar.textContent = "Editar";
    
    // BOTÓN BORRAR
    let botonBorrar = document.createElement("button");
    botonBorrar.type = "button";
    botonBorrar.className = "gasto-borrar";
    botonBorrar.textContent = "Borrar";

    // ✅ NUEVO: BOTÓN EDITAR CON FORMULARIO
    let botonEditarFormulario = document.createElement("button");
    botonEditarFormulario.type = "button";
    botonEditarFormulario.className = "gasto-editar-formulario";
    botonEditarFormulario.textContent = "Editar (formulario)";

    // Asignar manejadores de eventos a los botones
    let editarHandler = new EditarHandle();
    editarHandler.gasto = gasto;
    botonEditar.addEventListener("click", editarHandler);

    let borrarHandler = new BorrarHandle();
    borrarHandler.gasto = gasto;
    botonBorrar.addEventListener("click", borrarHandler);
    
    // ✅ NUEVO: Manejador para editar con formulario
    let editarFormularioHandler = new EditarHandleFormulario();
    editarFormularioHandler.gasto = gasto;
    botonEditarFormulario.addEventListener("click", editarFormularioHandler);
    
    // Ensamblar todos los elementos
    divGasto.appendChild(divDescripcion);
    divGasto.appendChild(divFecha);
    divGasto.appendChild(divValor);
    divGasto.appendChild(divEtiquetas);
    divGasto.appendChild(botonEditar);
    divGasto.appendChild(botonBorrar);
    divGasto.appendChild(botonEditarFormulario); // ✅ Añadir nuevo botón
    
    // Añadir el gasto al contenedor
    elementoContenedor.appendChild(divGasto);
}

// ✅ NUEVO: Función constructora para editar con formulario
function EditarHandleFormulario() {}

EditarHandleFormulario.prototype.handleEvent = function(event) {
    // 1. Crear copia del formulario desde el template
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    
    // 2. Acceder al elemento <form> dentro del fragmento
    let formulario = plantillaFormulario.querySelector("form");
    
    // 3. RELLENAR FORMULARIO CON DATOS DEL GASTO
    formulario.querySelector("#descripcion").value = this.gasto.descripcion;
    formulario.querySelector("#valor").value = this.gasto.valor;
    
    let fechaFormateada = new Date(this.gasto.fecha).toISOString().slice(0, 10);
    formulario.querySelector("#fecha").value = fechaFormateada;
    
    formulario.querySelector("#etiquetas").value = this.gasto.etiquetas.join(", ");
    
    // 4. CREAR MANEJADOR PARA SUBMIT
    function SubmitHandle() {}
    
    SubmitHandle.prototype.handleEvent = function(event) {
        event.preventDefault();
        
        // Acceder a los campos del formulario
        let descripcion = this.formulario.querySelector("#descripcion").value;
        let valor = parseFloat(this.formulario.querySelector("#valor").value);
        let fecha = this.formulario.querySelector("#fecha").value;
        let etiquetasTexto = this.formulario.querySelector("#etiquetas").value;
        
        // Convertir etiquetas a array
        let etiquetas = etiquetasTexto.split(",").map(function(e) {
            return e.trim();
        }).filter(function(e) {
            return e !== "";
        });
        
        // ACTUALIZAR EL GASTO EXISTENTE
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        
        // Actualizar etiquetas
        this.gasto.borrarEtiquetas(...this.gasto.etiquetas);
        if (etiquetas.length > 0) {
            this.gasto.anyadirEtiquetas(...etiquetas);
        }
        
        // Eliminar formulario
        this.formulario.remove();
        
        // Repintar para mostrar datos actualizados
        repintar();
    };
    
    let submitHandler = new SubmitHandle();
    submitHandler.formulario = formulario;
    submitHandler.gasto = this.gasto;
    
    formulario.addEventListener("submit", submitHandler);
    
    // 5. CREAR MANEJADOR PARA CANCELAR
    let botonCancelar = formulario.querySelector("button.cancelar");
    
    function CancelarEditHandle() {}
    
    CancelarEditHandle.prototype.handleEvent = function(event) {
        // Eliminar formulario
        this.formulario.remove();
        
    };
    
    let cancelarHandler = new CancelarEditHandle();
    cancelarHandler.formulario = formulario;
    
    
    botonCancelar.addEventListener("click", cancelarHandler);
    
    // 6. AÑADIR FORMULARIO DENTRO DEL GASTO
    let gastoDiv = event.currentTarget.closest('.gasto');
    
    // OCULTAR el contenido actual del gasto
    let elementosOcultar = gastoDiv.querySelectorAll('.gasto-descripcion, .gasto-fecha, .gasto-valor, .gasto-etiquetas, .gasto-editar, .gasto-borrar, .gasto-editar-formulario');
    elementosOcultar.forEach(function(elemento) {
        elemento.style.display = 'none';
    });

     let botonQueAbrioFormulario = event.currentTarget;
    botonQueAbrioFormulario.setAttribute("disabled", "disabled");
    
    // AÑADIR FORMULARIO dentro del gasto
    gastoDiv.appendChild(formulario);
};



function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
  // obtener el contenedor donde se mostrará todo
  let contenedor = document.getElementById(idElemento);

  // creo el <div> principal con clase "agrupacion"
  let divAgrupacion = document.createElement("div");
  divAgrupacion.classList.add("agrupacion");

  // traducir el texto del periodo para mostrarlo en el título
  let textoPeriodo = "";
  if (periodo === "dia") textoPeriodo = "día";
  else if (periodo === "mes") textoPeriodo = "mes";
  else if (periodo === "anyo") textoPeriodo = "año";

  // Crear el título <h1> con el texto traducido
  let titulo = document.createElement("h1");
  titulo.textContent = "Gastos agrupados por " + textoPeriodo;
  divAgrupacion.append(titulo);

  // Recorrer el objeto 'agrup'
  // Para cada propiedad (clave-valor) del objeto, crearemos un bloque <div>
  for (let clave in agrup) {
    // Creamos un div para cada dato agrupado
    let divDato = document.createElement("div");
    divDato.classList.add("agrupacion-dato");

    // Creamos el span para la clave (por ejemplo "2021-09")
    let spanClave = document.createElement("span");
    spanClave.classList.add("agrupacion-dato-clave");
    spanClave.textContent = clave + " - ";

    // Creamos el span para el valor (por ejemplo 5)
    let spanValor = document.createElement("span");
    spanValor.classList.add("agrupacion-dato-valor");
    spanValor.textContent = agrup[clave].toFixed(2) + " €";

    // Añadimos ambos <span> dentro del div
    divDato.append(spanClave);
    divDato.append(spanValor);

    // Añadimos este divDato dentro del divAgrupacion
    divAgrupacion.append(divDato);
  }

  // Pasamos la agrupación completa al contenedor principal
  contenedor.append(divAgrupacion);
}

function repintar() {
  // Mostrar el presupuesto total
  let presupuesto = gespre.mostrarPresupuesto();
  mostrarDatoEnId("presupuesto", presupuesto);

  // Para calcular y mostrar el total de gastos
  let totalGastos = gespre.calcularTotalGastos();
  mostrarDatoEnId("gastos-totales", totalGastos);

  // Para calcular y mostrar el balance actual
  let balance = gespre.calcularBalance();
  mostrarDatoEnId("balance-total", balance);

  // limpia el listado completo antes de volver a generarlo
  let divListado = document.getElementById("listado-gastos-completo");
  divListado.innerHTML = ""; // borra el contenido HTML actual

  // Para listar todos los gastos actuales
  let gastos = gespre.listarGastos();

  // muestra cada gasto en el contenedor del listado
  for (let gasto of gastos) {
    mostrarGastoWeb("listado-gastos-completo", gasto);
  }
}


// Esta función se encarga de pedir un nuevo presupuesto al usuario
function actualizarPresupuestoWeb() {
  // pedir el nuevo valor mediante un prompt
  let nuevoPresupuesto = prompt("Introduce el nuevo presupuesto: ");

// Convertimos el texto a número
 nuevoPresupuesto = Number(nuevoPresupuesto);

  // verificamos que sea un número válido
  if (isNaN(nuevoPresupuesto) || nuevoPresupuesto < 0) {
    alert("Por favor, introduce un número válido.");
    return;
  }

  // actualizamos el valor en el modelo de datos
  gespre.actualizarPresupuesto(nuevoPresupuesto);

  // repintamos la interfaz para mostrar el nuevo valor
  repintar();
}

// Asociación de eventos
// Esperamos a que el contenido del DOM esté cargado completamente

  // Obtenemos el botón con id "actualizarpresupuesto" 
  let botonActualizar = document.getElementById("actualizarpresupuesto");

  // Asignamos la función como manejadora del clic
  botonActualizar.addEventListener("click", actualizarPresupuestoWeb);



// Función manejadora para crear un nuevo gasto
function nuevoGastoWeb() {
  //Pedir los datos al usuario con prompt
  let descripcion = prompt("Introduce la descripción del gasto:");
  let valor = Number(prompt("Introduce el valor del gasto (€):"));
  let fecha = prompt("Introduce la fecha (formato yyyy-mm-dd):");
  let etiquetasTexto = prompt("Introduce las etiquetas separadas por comas (ej: casa,comida,ocio):");

  //Convertimos las etiquetas a un array
  let etiquetas = etiquetasTexto.split(",");

  //  Creamos el gasto con la función de la librería gestionPresupuesto.js
  let gasto = new gespre.CrearGasto(descripcion, valor, fecha, ...etiquetas);

  //  Lo añadimos al listado de gastos
  gespre.anyadirGasto(gasto);

  //  Repintamos todo para que se actualice la interfaz
  repintar();
}

  // Botón para añadir gasto
  let botonAnyadir = document.getElementById("anyadirgasto");
  botonAnyadir.addEventListener("click", nuevoGastoWeb);



  // Función constructora EditarHandle
function EditarHandle(gasto) {
  // Asignamos la referencia al gasto que se va a editar
  this.gasto = gasto;
}
// Definimos el método que actuará como manejador del evento click
EditarHandle.prototype.handleEvent = function (event) {
  // Pedimos los nuevos datos al usuario con los prompts
  let nuevaDescripcion = prompt("Introduce la nueva descripción:", this.gasto.descripcion);
  let nuevoValor = prompt("Introduce el nuevo valor:", this.gasto.valor);
  let nuevaFecha = prompt(
    "Introduce la nueva fecha (formato yyyy-mm-dd):",
    new Date(this.gasto.fecha).toISOString().slice(0, 10)
  );
  let nuevasEtiquetasTexto = prompt(
    "Introduce las nuevas etiquetas (separadas por comas):",
    this.gasto.etiquetas.join(",")
  );

  // Convertimos el valor a número
  nuevoValor = Number(nuevoValor);

  // Convertimos las etiquetas a array quitando espacios
  let nuevasEtiquetas;
  if (nuevasEtiquetasTexto) {
      nuevasEtiquetas = nuevasEtiquetasTexto.split(",").map(function(etiqe) {
          return etiqe.trim();
      });
  } else {
      nuevasEtiquetas = [];
  }

  // Actualizamos las propiedades del gasto
  this.gasto.actualizarDescripcion(nuevaDescripcion);
  this.gasto.actualizarValor(nuevoValor);
  this.gasto.actualizarFecha(nuevaFecha);

  // Limpiamos y añadimos nuevas etiquetas
  this.gasto.etiquetas = [];
  this.gasto.anyadirEtiquetas.apply(this.gasto, nuevasEtiquetas);

  // Repintamos la interfaz
  repintar();
};


// Función constructora BorrarHandle
function BorrarHandle(gasto) {
  // Asignamos la referencia al gasto que se va a borrar
  this.gasto = gasto;
}
// Definimos el método que actuará como manejador del evento click
BorrarHandle.prototype.handleEvent = function (event) {
  // Pedimos confirmación al usuario antes de borrar
  if (confirm("¿Estás seguro de que quieres borrar el gasto: '" + this.gasto.descripcion + "'?")) {
    // Borramos el gasto usando su id
    gespre.borrarGasto(this.gasto.id);
    
    // Repintamos la interfaz para mostrar la lista actualizada
    repintar();
  }
}

// Función constructora para borrar etiquetas
function BorrarEtiquetasHandle() {
  // Constructor vacío
}
BorrarEtiquetasHandle.prototype.handleEvent = function (event) {
  // Pedir confirmación antes de borrar la etiqueta
  if (confirm("¿Estás seguro de que quieres borrar la etiqueta: '" + this.etiqueta + "'?")) {
    // Borrar la etiqueta específica
    this.gasto.borrarEtiquetas(this.etiqueta);
    
    // Repintar la interfaz
    repintar();
  }
};


// objeto para boton cancelar formulario
let FormuClose = {
  handleEvent: function(e){
    this.formulario.remove(); // eliminar el formulario
    this.botonEditar.removeAttribute("disabled"); // reactivar el botón editar

  }
}
  

// Función manejadora para crear el manejador del formulario, recibe el evento submit
function crearHandleFormulario(event) {
  event.preventDefault(); // Evitar el envío del formulario

  // Vamos leyendo los campos del formulario
  // Podemos acceder a la propiedad currentTarget del evento ya que lo hemos recibido como parámetro
  let descripcion =event.currentTarget.descripcion.value;
  let valor = Number(event.currentTarget.valor.value);
  let fecha = event.currentTarget.fecha.value;
  let etiquetas = event.currentTarget.etiquetas.value;

  // Llamamos a la función para crear el gasto
  let gasto = new gespre.CrearGasto(descripcion, valor, fecha, ...etiquetas.split(","));

  // Lo añadimos al array de gastos
  gespre.anyadirGasto(gasto);
  // Repintamos la interfaz
  repintar();
  // Cerramos el formulario
  document.querySelector("form").remove(); 

  // Volvemos a activar el botón de añadir gasto
  document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
}


function nuevoGastoWebFormulario(event) {
  let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
  let formulario = plantillaFormulario.querySelector("form");

  // Añadir el evento al botón y llamar a esta función
  formulario.addEventListener("submit", crearHandleFormulario);

  // Evento para botón cancelar el formulario
  let cancelarHandler = Object.create(FormuClose);
  cancelarHandler.formulario = formulario;
  cancelarHandler.botonEditar = event.currentTarget;
  formulario.querySelector("button.cancelar").addEventListener("click", cancelarHandler);

  // desactivar el botón de añadir mientras el formulario está abierto
  event.currentTarget.disabled = true;  

  // Añadir el formulario al documento
  event.target.parentNode.append(plantillaFormulario);
}
// Asignar el evento al botón de añadir gasto mediante formulario
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);



export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
    nuevoGastoWebFormulario,
    crearHandleFormulario,
}