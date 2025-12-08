import * as logica from "./gestionPresupuesto.js";//“logica” = toutes les fonctions de gestionPresupuesto
import * as web from "./gestionPresupuestoWeb.js";//“web” = fonctions d'affichage.

logica.actualizarPresupuesto(1500);//enoncé:Actualizar el presupuesto a 1500€ (función actualizarPresupuesto)

//Mostrar el presupuesto en el div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
web.mostrarDatoEnId("presupuesto", logica.mostrarPresupuesto());

//Crear los siguientes gastos (función crearGasto):
let gastosEjemplo = [
    logica.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"),
    logica.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"),
    logica.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"),
    logica.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"),
    logica.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"),
    logica.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros")
];
//Añadir los gastos creados (función anyadirGasto)
for (let g of gastosEjemplo)
{
    logica.anyadirGasto(g)
}
//Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
web.mostrarDatoEnId("gastos-totales", logica.calcularTotalGastos());
//Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
web.mostrarDatoEnId("balance-total", logica.calcularBalance());


// //Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
for (const g of logica.listarGastos()) {
    web.mostrarGastoWeb("listado-gastos-completo", g);
}

//Mostrar el listado de gastos realizados en septiembre de 2021 en div#listado-gastos-filtrado-1 (funciones filtrarGastos y mostrarGastoWeb)
let filtro1 = logica.filtrarGastos({ fechaDesde: "2021-09-01", fechaHasta: "2021-09-30" });
filtro1.forEach(g => web.mostrarGastoWeb("listado-gastos-filtrado-1", g));

//Mostrar el listado de gastos de más de 50€ en div#listado-gastos-filtrado-2 (funciones filtrarGastos y mostrarGastoWeb)
let filtro2=logica.filtrarGastos({valorMinimo:50});//no poener 50 entre "" dino devuelve un string!!
filtro2.forEach(g=>web.mostrarGastoWeb("listado-gastos-filtrado-2", g));

//Mostrar el listado de gastos de más de 200€ con etiqueta seguros en div#listado-gastos-filtrado-3 (funciones filtrarGastos y mostrarGastoWeb)
let filtro3=logica.filtrarGastos({valorMinimo:200, etiquetasTiene:["seguros"]});
filtro3.forEach(g=>web.mostrarGastoWeb("listado-gastos-filtrado-3",g));


//Mostrar el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€ en div#listado-gastos-filtrado-4 (funciones filtrarGastos y mostrarGastoWeb)
let filtro4=logica.filtrarGastos({valorMaximo:50,etiquetasTiene:["comida","transporte"]});
filtro4.forEach(g=>web.mostrarGastoWeb("listado-gastos-filtrado-4", g));
//Mostrar el total de gastos agrupados por día en div#agrupacion-dia (funciones agruparGastos y mostrarGastosAgrupadosWeb)
let agruparporDia=logica.agruparGastos("dia")
web.mostrarGastosAgrupadosWeb("agrupacion-dia",agruparporDia, "dia");//no ponia el ultimo dia

//Mostrar el total de gastos agrupados por mes en div#agrupacion-mes (funciones agruparGastos y mostrarGastosAgrupadosWeb)
let agruparporMes=logica.agruparGastos("mes")
web.mostrarGastosAgrupadosWeb("agrupacion-mes",agruparporMes, "mes");
//Mostrar el total de gastos agrupados por año en div#agrupacion-anyo (funciones agruparGastos y mostrarGastosAgrupadosWeb)
let agruparporAnyo=logica.agruparGastos("Anyo")
web.mostrarGastosAgrupadosWeb("agrupacion-anyo",agruparporAnyo, "anyo");


