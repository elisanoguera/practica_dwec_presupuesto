import * as gesPres from "./gestionPresupuesto.js";
import * as manipulaDOM from "./gestionPresupuestoWeb.js";

//crear y añadir gastos
let g1 = new gesPres.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
gesPres.anyadirGasto(g1);
g1 = new gesPres.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
gesPres.anyadirGasto(g1);
g1 = new gesPres.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
gesPres.anyadirGasto(g1);
g1 = new gesPres.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
gesPres.anyadirGasto(g1);
g1 = new gesPres.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
gesPres.anyadirGasto(g1);
g1 = new gesPres.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
gesPres.anyadirGasto(g1);   

//actualizar presupuesto
gesPres.actualizarPresupuesto(1500);
manipulaDOM.mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());
//gastos totales
manipulaDOM.mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());
//balance total
manipulaDOM.mostrarDatoEnId("balance-total", gesPres.calcularBalance());

//Listado completo de gastos
for (let g of gesPres.listarGastos()){
    manipulaDOM.mostrarGastoWeb("listado-gastos-completo",g);
}

//filtros
for(let g of gesPres.filtrarGastos({fechaDesde: "2021-09-01",fechaHasta: "2021-09-30"})){
    manipulaDOM.mostrarGastoWeb("listado-gastos-filtrado-1",g);
}
for(let g of gesPres.filtrarGastos({valorMinimo: 50})){
    manipulaDOM.mostrarGastoWeb("listado-gastos-filtrado-2",g);    
}
for(let g of gesPres.filtrarGastos({valorMinimo: 200, etiquetaTiene: ["seguros"]})){
    manipulaDOM.mostrarGastoWeb("listado-gastos-filtrado-3",g);
}
for(let g of gesPres.filtrarGastos({valorMaximo: 50, etiquetaTiene: ["comida","transporte"]})){
    manipulaDOM.mostrarGastoWeb("listado-gastos-filtrado-4",g);
}

//Total de gastos agrupados por períodos:
manipulaDOM.mostrarGastosAgrupadosWeb("agrupacion-dia", gesPres.agruparGastos("dia"), "dia");
manipulaDOM.mostrarGastosAgrupadosWeb("agrupacion-mes", gesPres.agruparGastos("mes"), "mes");
manipulaDOM.mostrarGastosAgrupadosWeb("agrupacion-anyo", gesPres.agruparGastos("anyo"), "anyo");