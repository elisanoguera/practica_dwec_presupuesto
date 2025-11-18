import * as gestionPresupuesto from './gestionPresupuesto.js'

export function mostrarDatoEnId(idElemento, valor) {
  const elemento = document.getElementById(idElemento)
  if (elemento) elemento.textContent = valor
}

export function mostrarGastoWeb(idElementoLista, gasto) {
  const lista = document.getElementById(idElementoLista)
  if (!lista) return

  const contenedor = document.createElement('div')
  contenedor.className = 'gasto'

  const descripcion = document.createElement('div')
  descripcion.className = 'gasto-descripcion'
  descripcion.textContent = gasto.descripcion
  contenedor.appendChild(descripcion)

  const fecha = document.createElement('div')
  fecha.className = 'gasto-fecha'
  const fechaObj = new Date(gasto.fecha)
  const year = fechaObj.getFullYear()
  let month = fechaObj.getMonth() + 1
  let day = fechaObj.getDate()
  if (month < 10) month = '0' + month
  if (day < 10) day = '0' + day
  fecha.textContent = `${year}-${month}-${day}`
  contenedor.appendChild(fecha)

  const valor = document.createElement('div')
  valor.className = 'gasto-valor'
  valor.textContent = gasto.valor.toFixed(2)
  contenedor.appendChild(valor)

  const divEtiquetas = document.createElement('div')
  divEtiquetas.className = 'gasto-etiquetas'
  for (let i = 0; i < gasto.etiquetas.length; i++) {
    const span = document.createElement('span')
    span.className = 'gasto-etiquetas-etiqueta'
    span.textContent = gasto.etiquetas[i]
    const manejadorBorrar = new BorrarEtiquetasHandle()
    manejadorBorrar.gasto = gasto
    manejadorBorrar.etiqueta = gasto.etiquetas[i]
    span.addEventListener('click', manejadorBorrar)
    divEtiquetas.appendChild(span)
  }
  contenedor.appendChild(divEtiquetas)

  const btnEditar = document.createElement('button')
  btnEditar.type = 'button'
  btnEditar.className = 'gasto-editar'
  btnEditar.textContent = 'Editar'
  const manejadorEditar = new EditarHandle()
  manejadorEditar.gasto = gasto
  btnEditar.addEventListener('click', manejadorEditar)
  contenedor.appendChild(btnEditar)

  const btnBorrar = document.createElement('button')
  btnBorrar.type = 'button'
  btnBorrar.className = 'gasto-borrar'
  btnBorrar.textContent = 'Borrar'
  const manejadorBorrar = new BorrarHandle()
  manejadorBorrar.gasto = gasto
  btnBorrar.addEventListener('click', manejadorBorrar)
  contenedor.appendChild(btnBorrar)

  const btnEditarFormulario = document.createElement('button')
  btnEditarFormulario.type = 'button'
  btnEditarFormulario.className = 'gasto-editar-formulario'
  btnEditarFormulario.textContent = 'Editar (formulario)'
  const manejadorEditarFormulario = new EditarHandleFormulario()
  manejadorEditarFormulario.gasto = gasto
  btnEditarFormulario.addEventListener('click', manejadorEditarFormulario)
  contenedor.appendChild(btnEditarFormulario)

  lista.appendChild(contenedor)
}

export function repintar() {
  mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto())
  const total = gestionPresupuesto.calcularTotalGastos()
  mostrarDatoEnId('gastos-totales', total.toFixed(2) + ' €')
  const balance = gestionPresupuesto.calcularBalance()
  mostrarDatoEnId('balance-total', balance.toFixed(2) + ' €')

  const lista = document.getElementById('listado-gastos-completo')
  if (!lista) return
  lista.innerHTML = ''
  const gastos = gestionPresupuesto.listarGastos()
  for (let i = 0; i < gastos.length; i++) {
    mostrarGastoWeb('listado-gastos-completo', gastos[i])
  }
}

function actualizarPresupuestoWeb() {
  const entrada = prompt('Introduce el nuevo presupuesto:')
  if (entrada === null) return
  const valor = parseFloat(entrada)
  if (!isNaN(valor) && valor >= 0) {
    gestionPresupuesto.actualizarPresupuesto(valor)
    repintar()
  } else {
    alert('Presupuesto no válido')
  }
}

function recogerEtiquetas(texto) {
  const resultado = []
  if (!texto || texto.trim() === '') return resultado
  const partes = texto.split(',')
  for (let i = 0; i < partes.length; i++) {
    const etiqueta = partes[i].trim()
    if (etiqueta !== '') resultado.push(etiqueta)
  }
  return resultado
}

function nuevoGastoWeb() {
  const descripcion = prompt('Descripción:')
  const valorStr = prompt('Valor:')
  const fecha = prompt('Fecha (yyyy-mm-dd):')
  const etiquetasTexto = prompt('Etiquetas (separadas por comas):', '')
  const valor = parseFloat(valorStr)
  if (isNaN(valor) || valor < 0) return
  const etiquetas = recogerEtiquetas(etiquetasTexto)
  const gasto = gestionPresupuesto.crearGasto(descripcion, valor, fecha)
  for (let i = 0; i < etiquetas.length; i++) gasto.anyadirEtiquetas(etiquetas[i])
  gestionPresupuesto.anyadirGasto(gasto)
  repintar()
}

function obtenerFormularioDesdePlantilla() {
  const template = document.getElementById('formulario-template')
  if (!template) return null
  const fragmento = template.content.cloneNode(true)
  const formulario = fragmento.querySelector('form')
  if (!formulario) return null
  return { fragmento, formulario }
}

function nuevoGastoWebFormulario(evento) {
  const boton = evento ? evento.currentTarget : null
  if (boton) boton.disabled = true
  const datos = obtenerFormularioDesdePlantilla()
  if (!datos) {
    if (boton) boton.disabled = false
    return
  }
  const { fragmento, formulario } = datos
  const campoFecha = formulario.querySelector('input[name="fecha"]')
  if (campoFecha) campoFecha.value = new Date().toISOString().split('T')[0]

  formulario.addEventListener('submit', function (event) {
    event.preventDefault()
    const form = event.currentTarget
    const descripcion = form.descripcion ? form.descripcion.value : ''
    const valor = form.valor ? parseFloat(form.valor.value) : NaN
    const fecha = form.fecha ? form.fecha.value : ''
    if (isNaN(valor) || valor < 0) return

    const etiquetas = recogerEtiquetas(form.etiquetas ? form.etiquetas.value : '')
    const gasto = gestionPresupuesto.crearGasto(descripcion, valor, fecha)
    for (let i = 0; i < etiquetas.length; i++) gasto.anyadirEtiquetas(etiquetas[i])
    gestionPresupuesto.anyadirGasto(gasto)
    repintar()

    form.remove()
    const botonFormulario = document.getElementById('anyadirgasto-formulario')
    if (botonFormulario) botonFormulario.disabled = false
  })

  const btnCancelar = formulario.querySelector('button.cancelar')
  if (btnCancelar) {
    const manejadorCancelar = new CancelarFormularioHandle()
    manejadorCancelar.formulario = formulario
    manejadorCancelar.boton = boton || document.getElementById('anyadirgasto-formulario')
    btnCancelar.addEventListener('click', manejadorCancelar)
  }

  const contenedor = document.getElementById('controlesprincipales')
  if (contenedor) contenedor.appendChild(fragmento)
  else if (boton) boton.disabled = false
}

function EditarHandle() {}
EditarHandle.prototype.handleEvent = function () {
  const descripcion = prompt('Nueva descripción:', this.gasto.descripcion)
  if (descripcion !== null) this.gasto.actualizarDescripcion(descripcion)
  const valorStr = prompt('Nuevo valor:', this.gasto.valor)
  const valor = parseFloat(valorStr)
  if (!isNaN(valor) && valor >= 0) this.gasto.actualizarValor(valor)
  const fechaObj = new Date(this.gasto.fecha)
  const year = fechaObj.getFullYear()
  let month = fechaObj.getMonth() + 1
  let day = fechaObj.getDate()
  if (month < 10) month = '0' + month
  if (day < 10) day = '0' + day
  const fechaActual = `${year}-${month}-${day}`
  const fecha = prompt('Nueva fecha (yyyy-mm-dd):', fechaActual)
  if (fecha !== null) this.gasto.actualizarFecha(fecha)
  const etiquetasTexto = prompt('Nuevas etiquetas (separadas por comas):', this.gasto.etiquetas.join(', '))
  if (etiquetasTexto !== null) {
    this.gasto.etiquetas = []
    const nuevas = recogerEtiquetas(etiquetasTexto)
    for (let i = 0; i < nuevas.length; i++) this.gasto.anyadirEtiquetas(nuevas[i])
  }
  repintar()
}

function EditarHandleFormulario() {}
EditarHandleFormulario.prototype.handleEvent = function (evento) {
  const boton = evento ? evento.currentTarget : null
  if (boton) boton.disabled = true
  const datos = obtenerFormularioDesdePlantilla()
  if (!datos) {
    if (boton) boton.disabled = false
    return
  }
  const { fragmento, formulario } = datos

  if (formulario.descripcion) formulario.descripcion.value = this.gasto.descripcion || ''
  if (formulario.valor) formulario.valor.value = this.gasto.valor.toFixed(2)
  if (formulario.fecha) {
    const fechaObj = new Date(this.gasto.fecha)
    const year = fechaObj.getFullYear()
    let month = fechaObj.getMonth() + 1
    let day = fechaObj.getDate()
    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day
    formulario.fecha.value = `${year}-${month}-${day}`
  }
  if (formulario.etiquetas) formulario.etiquetas.value = this.gasto.etiquetas.join(', ')

  const manejadorSubmit = new EditarFormularioSubmitHandle()
  manejadorSubmit.gasto = this.gasto
  manejadorSubmit.boton = boton
  formulario.addEventListener('submit', manejadorSubmit)

  const btnCancelar = formulario.querySelector('button.cancelar')
  if (btnCancelar) {
    const manejadorCancelar = new CancelarFormularioHandle()
    manejadorCancelar.formulario = formulario
    manejadorCancelar.boton = boton
    btnCancelar.addEventListener('click', manejadorCancelar)
  }

  if (boton && boton.parentNode) boton.parentNode.appendChild(fragmento)
  else {
    const contenedor = document.getElementById('controlesprincipales')
    if (contenedor) contenedor.appendChild(fragmento)
  }
}

function EditarFormularioSubmitHandle() {}
EditarFormularioSubmitHandle.prototype.handleEvent = function (event) {
  event.preventDefault()
  if (!this.gasto) return
  const form = event.currentTarget

  if (form.descripcion) this.gasto.actualizarDescripcion(form.descripcion.value)

  if (form.valor) {
    const valor = parseFloat(form.valor.value)
    if (!isNaN(valor) && valor >= 0) this.gasto.actualizarValor(valor)
  }

  if (form.fecha && form.fecha.value) this.gasto.actualizarFecha(form.fecha.value)

  this.gasto.etiquetas = []
  const nuevas = recogerEtiquetas(form.etiquetas ? form.etiquetas.value : '')
  for (let i = 0; i < nuevas.length; i++) this.gasto.anyadirEtiquetas(nuevas[i])

  form.remove()
  if (this.boton) this.boton.disabled = false
  repintar() 
}

function BorrarHandle() {}
BorrarHandle.prototype.handleEvent = function () {
  gestionPresupuesto.borrarGasto(this.gasto.id)
  repintar()
}

function BorrarEtiquetasHandle() {}
BorrarEtiquetasHandle.prototype.handleEvent = function () {
  this.gasto.borrarEtiquetas(this.etiqueta)
  repintar()
}

function CancelarFormularioHandle() {}
CancelarFormularioHandle.prototype.handleEvent = function (event) {
  event.preventDefault()
  if (this.formulario) this.formulario.remove()
  if (this.boton) this.boton.disabled = false
}

export function iniciar() {
  const btnPresupuesto = document.getElementById('actualizarpresupuesto')
  if (btnPresupuesto) btnPresupuesto.addEventListener('click', actualizarPresupuestoWeb)

  const btnAnyadir = document.getElementById('anyadirgasto')
  if (btnAnyadir) btnAnyadir.addEventListener('click', nuevoGastoWeb)

  const btnAnyadirFormulario = document.getElementById('anyadirgasto-formulario')
  if (btnAnyadirFormulario) btnAnyadirFormulario.addEventListener('click', nuevoGastoWebFormulario)

  repintar()
}