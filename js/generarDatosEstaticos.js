// Fichero que contiene un programa de ejemplo para generar un conjunto de gastos y mostrar la información relacionada con estos

// Importación
import { mostrarDatoEnId, mostrarGastoWeb, mostrarGastosAgrupadosWeb, repintar } from "./gestionPresupuestoWeb.js";
import { mostrarPresupuesto, actualizarPresupuesto, listarGastos, anyadirGasto, borrarGasto, calcularTotalGastos, calcularBalance, filtrarGastos, agruparGastos, CrearGasto } from "./gestionPresupuesto.js";

// 1. Actualizar presupuesto y mostrarlo
actualizarPresupuesto(1500);
mostrarDatoEnId("presupuesto", mostrarPresupuesto());

// 2. Creación de gastos
let gasto1 = new CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new CrearGasto("Bonobús", 18.6, "2020-05-26", "transporte");
let gasto4 = new CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

anyadirGasto(gasto1);
anyadirGasto(gasto2);
anyadirGasto(gasto3);
anyadirGasto(gasto4);
anyadirGasto(gasto5);
anyadirGasto(gasto6);

// 3. Mostrar gastos totales y balance total
mostrarDatoEnId("gastos-totales", calcularTotalGastos());
mostrarDatoEnId("balance-total", calcularBalance());

// 4. Mostrar el listado de gastos completo
let gastos = listarGastos();
gastos.forEach((gasto) => mostrarGastoWeb("listado-gastos-completo", gasto));

// 5. Mostrar lista de gastos filtrados
// 5.1. En primer lugar obtenemos el array de gastos filtrados, ya que la funcion mostrarGastoWeb pide UN ÚNICO objeto tipo gasto como parámetro
let filtrado1 = filtrarGastos({ fechaDesde: "2021-09-01", fechaHasta: "2021-09-30" });
// 5.2. Hacemos un bucle que agrege cada uno de los gastos que se encuentran en el array resultante
filtrado1.forEach((gasto) => mostrarGastoWeb("listado-gastos-filtrado-1", gasto));

let filtrado2 = filtrarGastos({ valorMinimo: 50 });
filtrado2.forEach((gasto) => mostrarGastoWeb("listado-gastos-filtrado-2", gasto));

let filtrado3 = filtrarGastos({ valorMinimo: 200, etiquetas: ["seguros"] });
filtrado3.forEach((gasto) => mostrarGastoWeb("listado-gastos-filtrado-3", gasto));

let filtrado4 = filtrarGastos({ valorMaximo: 50, etiquetas: ["comida", "transporte"] });
filtrado4.forEach((gasto) => mostrarGastoWeb("listado-gastos-filtrado-4", gasto));

// 6. Agrupaciones
let agrup1 = agruparGastos("dia");
mostrarGastosAgrupadosWeb("agrupacion-dia", agrup1, "día");

let agrup2 = agruparGastos();
mostrarGastosAgrupadosWeb("agrupacion-mes", agrup2, "mes");

let agrup3 = agruparGastos("anyo");
mostrarGastosAgrupadosWeb("agrupacion-anyo", agrup3, "año");
