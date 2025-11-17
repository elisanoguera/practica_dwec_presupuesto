import * as libreriaGestionPresupuesto from "./gestionPresupuesto.js";
import * as libreriaGestionPresupuestoWeb from "./gestionPresupuestoWeb.js";

libreriaGestionPresupuesto.actualizarPresupuesto(1500);
libreriaGestionPresupuestoWeb.mostrarDatoEnId("presupuesto", libreriaGestionPresupuesto.mostrarPresupuesto());

let gasto1 = libreriaGestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = libreriaGestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = libreriaGestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = libreriaGestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = libreriaGestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = libreriaGestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

libreriaGestionPresupuesto.anyadirGasto(gasto1);
libreriaGestionPresupuesto.anyadirGasto(gasto2);
libreriaGestionPresupuesto.anyadirGasto(gasto3);
libreriaGestionPresupuesto.anyadirGasto(gasto4);
libreriaGestionPresupuesto.anyadirGasto(gasto5);
libreriaGestionPresupuesto.anyadirGasto(gasto6);