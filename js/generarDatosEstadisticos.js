import * as libreriaGestionPresupuesto from "./gestionPresupuesto.js";
import * as libreriaGestionPresupuestoWeb from "./gestionPresupuestoWeb.js";

libreriaGestionPresupuesto.actualizarPresupuesto(1500);
libreriaGestionPresupuestoWeb.mostrarDatoEnId("presupuesto", libreriaGestionPresupuesto.mostrarPresupuesto());