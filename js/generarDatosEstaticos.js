import * as Presupuesto from './gestionPresupuesto.js';
import * as Web from './gestionPresupuestoWeb.js';

Presupuesto.actualizarPresupuesto(1500);

Web.mostrarDatoEnId("presupuesto", Presupuesto.mostrarPresupuesto());

var gasto1 = new Presupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
var gasto2 = new Presupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
var gasto3 = new Presupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
var gasto4 = new Presupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
var gasto5 = new Presupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
var gasto6 = new Presupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

Presupuesto.anyadirGasto(gasto1);
Presupuesto.anyadirGasto(gasto2);
Presupuesto.anyadirGasto(gasto3);
Presupuesto.anyadirGasto(gasto4);
Presupuesto.anyadirGasto(gasto5);
Presupuesto.anyadirGasto(gasto6);

Web.mostrarDatoEnId("gastos-totales", Presupuesto.calcularTotalGastos() + " €");
Web.mostrarDatoEnId("balance-total", Presupuesto.calcularBalance() + " €");

var listadoCompleto = Presupuesto.listarGastos();
for (var i = 0; i < listadoCompleto.length; i++) {
    Web.mostrarGastoWeb("listado-gastos-completo", listadoCompleto[i]);
}

var filtro1 = Presupuesto.filtrarGastos({ fechaDesde: "2021-09-01", fechaHasta: "2021-09-30" });
for (var i = 0; i < filtro1.length; i++) {
    Web.mostrarGastoWeb("listado-gastos-filtrado-1", filtro1[i]);
}

var filtro2 = Presupuesto.filtrarGastos({ valorMinimo: 50 });
for (var i = 0; i < filtro2.length; i++) {
    Web.mostrarGastoWeb("listado-gastos-filtrado-2", filtro2[i]);
}

var filtro3 = Presupuesto.filtrarGastos({ valorMinimo: 200, etiquetasTiene: ["seguros"] });
for (var i = 0; i < filtro3.length; i++) {
    Web.mostrarGastoWeb("listado-gastos-filtrado-3", filtro3[i]);
}

var filtro4 = Presupuesto.filtrarGastos({ valorMaximo: 49, etiquetasTiene: ["comida", "transporte"] });
for (var i = 0; i < filtro4.length; i++) {
    Web.mostrarGastoWeb("listado-gastos-filtrado-4", filtro4[i]);
}

var agrupDia = Presupuesto.agruparGastos("dia");
Web.mostrarGastosAgrupadosWeb("agrupacion-dia", agrupDia, "día");

var agrupMes = Presupuesto.agruparGastos("mes");
Web.mostrarGastosAgrupadosWeb("agrupacion-mes", agrupMes, "mes");

var agrupAnyo = Presupuesto.agruparGastos("anyo");
Web.mostrarGastosAgrupadosWeb("agrupacion-anyo", agrupAnyo, "año");