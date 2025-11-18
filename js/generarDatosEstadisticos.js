import * as libreriaGestionPresupuesto from "./gestionPresupuesto.js";
import * as libreriaGestionPresupuestoWeb from "./gestionPresupuestoWeb.js";

//Presupuesto
libreriaGestionPresupuesto.actualizarPresupuesto(1500);
libreriaGestionPresupuestoWeb.mostrarDatoEnId("presupuesto", libreriaGestionPresupuesto.mostrarPresupuesto());

//Gastos
let gasto1 = new libreriaGestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new libreriaGestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new libreriaGestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new libreriaGestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new libreriaGestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new libreriaGestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

libreriaGestionPresupuesto.anyadirGasto(gasto1);
libreriaGestionPresupuesto.anyadirGasto(gasto2);
libreriaGestionPresupuesto.anyadirGasto(gasto3);
libreriaGestionPresupuesto.anyadirGasto(gasto4);
libreriaGestionPresupuesto.anyadirGasto(gasto5);
libreriaGestionPresupuesto.anyadirGasto(gasto6);

libreriaGestionPresupuestoWeb.mostrarDatoEnId("gastos-totales", libreriaGestionPresupuesto.calcularTotalGastos());

//Balance
libreriaGestionPresupuestoWeb.mostrarDatoEnId("balance-total", libreriaGestionPresupuesto.calcularBalance());


//Listado de gastos
for(let gasto of libreriaGestionPresupuesto.listarGastos()) {
    libreriaGestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto);
}

//Listado de gastos realizados en septiembre de 2021

let parametrosFiltro = {
    fechaDesde: "2021-09-01",
    fechaHasta: "2021-09-30"
}

let gastosFiltrados = libreriaGestionPresupuesto.filtrarGastos(parametrosFiltro);

for(let gasto of gastosFiltrados) {
    libreriaGestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}

//Listado de gastos > 50€

parametrosFiltro = {
    valorMinimo: 50
}

gastosFiltrados = libreriaGestionPresupuesto.filtrarGastos(parametrosFiltro);

for(let gasto of gastosFiltrados) {
    libreriaGestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}

//Listado de gastos > 200€ con etiqueta "seguros"

parametrosFiltro = {
    valorMinimo: 200,
    etiquetasTiene: ["seguros"]
}

gastosFiltrados = libreriaGestionPresupuesto.filtrarGastos(parametrosFiltro);

for(let gasto of gastosFiltrados) {
    libreriaGestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}


