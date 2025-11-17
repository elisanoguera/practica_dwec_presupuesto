import * as gestionPresupuesto from './gestionPresupuesto.js'

export function mostrarDatoEnId(idElemento, valor) {
  let elemento = document.getElementById(idElemento)
  if (elemento) elemento.textContent = valor
}

export function mostrarGastoWeb(idElementoLista, gasto) {
  let lista = document.getElementById(idElementoLista)
  if (!lista) return


  let divGasto = document.createElement("div")
  divGasto.className = "gasto"


  let descripcion = document.createElement("div")
  descripcion.className = "gasto-descripcion"
  descripcion.textContent = gasto.descripcion
  divGasto.appendChild(descripcion)


  let fecha = document.createElement("div")
  fecha.className = "gasto-fecha"
  let fechaObj = new Date(gasto.fecha)
  let año = fechaObj.getFullYear()
  let mes = fechaObj.getMonth() + 1
  let dia = fechaObj.getDate()
  if (mes < 10) mes = "0" + mes
  if (dia < 10) dia = "0" + dia
  fecha.textContent = año + "-" + mes + "-" + dia
  divGasto.appendChild(fecha)


  let valor = document.createElement("div")
  valor.className = "gasto-valor"
  valor.textContent = gasto.valor.toFixed(2)
  divGasto.appendChild(valor)


  let divEtiquetas = document.createElement("div")
  divEtiquetas.className = "gasto-etiquetas"
  for (let i = 0; i < gasto.etiquetas.length; i++) {
    let span = document.createElement("span")
    span.className = "gasto-etiquetas-etiqueta"
    span.textContent = gasto.etiquetas[i]

    let manejadorBorrarEtiqueta = new BorrarEtiquetasHandle()
    manejadorBorrarEtiqueta.gasto = gasto
    manejadorBorrarEtiqueta.etiqueta = gasto.etiquetas[i]
    span.addEventListener("click", manejadorBorrarEtiqueta)
    divEtiquetas.appendChild(span)
  }
  divGasto.appendChild(divEtiquetas)


  let btnEditar = document.createElement("button")
  btnEditar.type = "button"
  btnEditar.className = "gasto-editar"
  btnEditar.textContent = "Editar"
  let manejadorEditar = new EditarHandle()
  manejadorEditar.gasto = gasto
  btnEditar.addEventListener("click", manejadorEditar)
  divGasto.appendChild(btnEditar)


  let btnBorrar = document.createElement("button")
  btnBorrar.type = "button"
  btnBorrar.className = "gasto-borrar"
  btnBorrar.textContent = "Borrar"
  let manejadorBorrar = new BorrarHandle()
  manejadorBorrar.gasto = gasto
  btnBorrar.addEventListener("click", manejadorBorrar)
  divGasto.appendChild(btnBorrar)

  let btnEditarFormulario = document.createElement("button")
  btnEditarFormulario.type = "button"
  btnEditarFormulario.className = "gasto-editar-formulario"
  btnEditarFormulario.textContent = "Editar (formulario)"
  let manejadorEditarFormulario = new EditarHandleFormulario()
  manejadorEditarFormulario.gasto = gasto
  btnEditarFormulario.addEventListener("click", manejadorEditarFormulario)
  divGasto.appendChild(btnEditarFormulario)

  lista.appendChild(divGasto)
}

export function repintar() {

  mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto())
  

  let totalGastos = gestionPresupuesto.calcularTotalGastos()
  mostrarDatoEnId("gastos-totales", totalGastos.toFixed(2) + " €")
  

  let balance = gestionPresupuesto.calcularBalance()
  mostrarDatoEnId("balance-total", balance.toFixed(2) + " €")
  
  let lista = document.getElementById("listado-gastos-completo")
  if (lista) {
    lista.innerHTML = ""
    let gastos = gestionPresupuesto.listarGastos()
    for (let i = 0; i < gastos.length; i++) {
      mostrarGastoWeb("listado-gastos-completo", gastos[i])
    }
  }
}

function actualizarPresupuestoWeb() {
  let entrada = prompt("Introduce el nuevo presupuesto:")
  if (entrada === null) return
  let valor = parseFloat(entrada)
  if (!isNaN(valor) && valor >= 0) {
    gestionPresupuesto.actualizarPresupuesto(valor)
    repintar()
  } else alert("Presupuesto no válido")
}

function nuevoGastoWeb() {
  let descripcion = prompt("Descripción:")
  let valorStr = prompt("Valor:")
  let fecha = prompt("Fecha (yyyy-mm-dd):")
  let etiquetasStr = prompt("Etiquetas (separadas por comas):", "")
  

  let valor = parseFloat(valorStr)
  if (isNaN(valor) || valor < 0) {
    return
  }

  let etiquetas = []
  if (etiquetasStr && etiquetasStr.trim() !== "") {
    let partes = etiquetasStr.split(",")
    for (let i = 0; i < partes.length; i++) {
      let etiqueta = partes[i].trim()
      if (etiqueta !== "") {
        etiquetas.push(etiqueta)
      }
    }
  }

  let gasto = gestionPresupuesto.crearGasto(descripcion, valor, fecha)
  for (let i = 0; i < etiquetas.length; i++) {
    gasto.anyadirEtiquetas(etiquetas[i])
  }
  gestionPresupuesto.anyadirGasto(gasto)
  repintar()
}


function EditarHandle() {
}

EditarHandle.prototype.handleEvent = function(e) {
  let descripcion = prompt("Nueva descripción:", this.gasto.descripcion)
  if (descripcion !== null) {
    this.gasto.actualizarDescripcion(descripcion)
  }
  
  let valStr = prompt("Nuevo valor:", this.gasto.valor)
  let valor = parseFloat(valStr)
  if (!isNaN(valor) && valor >= 0) {
    this.gasto.actualizarValor(valor)
  }
  
  let fechaObj = new Date(this.gasto.fecha)
  let año = fechaObj.getFullYear()
  let mes = fechaObj.getMonth() + 1
  let dia = fechaObj.getDate()
  if (mes < 10) mes = "0" + mes
  if (dia < 10) dia = "0" + dia
  let fechaActual = año + "-" + mes + "-" + dia
  let fecha = prompt("Nueva fecha (yyyy-mm-dd):", fechaActual)
  if (fecha !== null) {
    this.gasto.actualizarFecha(fecha)
  }
  
  let etiquetasTexto = ""
  for (let i = 0; i < this.gasto.etiquetas.length; i++) {
    if (i > 0) etiquetasTexto += ", "
    etiquetasTexto += this.gasto.etiquetas[i]
  }
  let etiqStr = prompt("Nuevas etiquetas (separadas por comas):", etiquetasTexto)
  if (etiqStr !== null) {
    this.gasto.etiquetas = []
    if (etiqStr.trim() !== "") {
      let partes = etiqStr.split(",")
      for (let i = 0; i < partes.length; i++) {
        let etiqueta = partes[i].trim()
        if (etiqueta !== "") {
          this.gasto.anyadirEtiquetas(etiqueta)
        }
      }
    }
  }
  
  repintar()
}


function BorrarHandle() {
}

BorrarHandle.prototype.handleEvent = function(e) {
  gestionPresupuesto.borrarGasto(this.gasto.id)
  repintar()
}

function BorrarEtiquetasHandle() {
}

BorrarEtiquetasHandle.prototype.handleEvent = function(e) {
  this.gasto.borrarEtiquetas(this.etiqueta)
  repintar()
}

function CancelarFormularioHandle() {
}

export function iniciar() {
  let btnPresupuesto = document.getElementById("actualizarpresupuesto")
  if (btnPresupuesto) btnPresupuesto.addEventListener("click", actualizarPresupuestoWeb)
  let btnAnyadir = document.getElementById("anyadirgasto")
  if (btnAnyadir) btnAnyadir.addEventListener("click", nuevoGastoWeb)
  repintar()
}
 