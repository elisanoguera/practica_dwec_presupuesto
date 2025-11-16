import * as libreriaGestionPresupuesto from "./gestionPresupuesto";
import * as libreriaGestionPresupuestoWeb from "./gestionPresupuestoWeb";

libreriaGestionPresupuesto.actualizarPresupuesto(1500);
libreriaGestionPresupuestoWeb.mostrarDatoEnId("presupuesto", libreriaGestionPresupuesto.mostrarPresupuesto());