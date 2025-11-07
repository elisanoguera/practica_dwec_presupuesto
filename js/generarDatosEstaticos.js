// 1. Importar las librerías
import * as gestor from './gestionPresupuesto.js';
import * as web from './gestionPresupuestoWeb.js';

// 2. Actualizar el presupuesto a 1500€
gestor.actualizarPresupuesto(1500);

// 3. Mostrar el presupuesto en el div#presupuesto
let textoPresupuesto = gestor.mostrarPresupuesto();
web.mostrarDatoEnId("presupuesto", textoPresupuesto);

// 4. Crear los gastos
let gasto1 = new gestor.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestor.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestor.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestor.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestor.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestor.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

// 5. Añadir los gastos creados
gestor.anyadirGasto(gasto1);
gestor.anyadirGasto(gasto2);
gestor.anyadirGasto(gasto3);
gestor.anyadirGasto(gasto4);
gestor.anyadirGasto(gasto5);
gestor.anyadirGasto(gasto6);

// 6. Mostrar los gastos totales en div#gastos-totales
let totalGastos = gestor.calcularTotalGastos();
web.mostrarDatoEnId("gastos-totales", "Total gastos: " + totalGastos + " €");

// 7. Mostrar el balance total en div#balance-total
let balance = gestor.calcularBalance();
web.mostrarDatoEnId("balance-total", "Balance total: " + balance + " €");

// 8. Mostrar el listado completo de gastos en div#listado-gastos-completo
let todosLosGastos = gestor.listarGastos();
for (let i = 0; i < todosLosGastos.length; i++) {
    web.mostrarGastoWeb("listado-gastos-completo", todosLosGastos[i]);
}

// 9. Mostrar gastos de septiembre de 2021 en div#listado-gastos-filtrado-1
let gastosSeptiembre2021 = gestor.filtrarGastos({
    fechaDesde: "2021-09-01",
    fechaHasta: "2021-09-30"
});
for (let i = 0; i < gastosSeptiembre2021.length; i++) {
    web.mostrarGastoWeb("listado-gastos-filtrado-1", gastosSeptiembre2021[i]);
}

// 10. Mostrar gastos de más de 50€ en div#listado-gastos-filtrado-2
let gastosMas50 = gestor.filtrarGastos({
    valorMinimo: 50
});
for (let i = 0; i < gastosMas50.length; i++) {
    web.mostrarGastoWeb("listado-gastos-filtrado-2", gastosMas50[i]);
}

// 11. Mostrar gastos de más de 200€ con etiqueta "seguros" en div#listado-gastos-filtrado-3
let gastosSeguros200 = gestor.filtrarGastos({
    valorMinimo: 200,
    etiquetasTiene: ["seguros"]
});
for (let i = 0; i < gastosSeguros200.length; i++) {
    web.mostrarGastoWeb("listado-gastos-filtrado-3", gastosSeguros200[i]);
}

// 12. Mostrar gastos con etiquetas "comida" o "transporte" de menos de 50€ en div#listado-gastos-filtrado-4
let gastosComidaTransporteMenos50 = gestor.filtrarGastos({
    etiquetasTiene: ["comida", "transporte"],
    valorMaximo: 50
});
for (let i = 0; i < gastosComidaTransporteMenos50.length; i++) {
    web.mostrarGastoWeb("listado-gastos-filtrado-4", gastosComidaTransporteMenos50[i]);
}

// 13. Mostrar total de gastos agrupados por día en div#agrupacion-dia
let agrupacionDia = gestor.agruparGastos("dia");
web.mostrarGastosAgrupadosWeb("agrupacion-dia", agrupacionDia, "dia");

// 14. Mostrar total de gastos agrupados por mes en div#agrupacion-mes
let agrupacionMes = gestor.agruparGastos("mes");
web.mostrarGastosAgrupadosWeb("agrupacion-mes", agrupacionMes, "mes");

// 15. Mostrar total de gastos agrupados por año en div#agrupacion-anyo
let agrupacionAnyo = gestor.agruparGastos("anyo");
web.mostrarGastosAgrupadosWeb("agrupacion-anyo", agrupacionAnyo, "anyo");