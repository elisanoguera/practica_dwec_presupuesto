import * as gp from './gestionPresupuesto.js';
import * as web from './gestionPresupuestoWeb.js';

function main(){
    gp.actualizarPresupuesto(1500);

    console.log('Presupuesto:', gp.mostrarPresupuesto());
    web.mostrarDatoEnId('presupuesto', gp.mostrarPresupuesto());

    

    var g1 = new gp.CrearGasto("Comprar carne", 23.44, "2021-10-06", ["casa","comida"]);
    var g2 = new gp.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06",["supermercado", "comida"]);
    var g3 = new gp.CrearGasto("Bonobus", 18.60, "2020-05-26", ["transporte"]);
    var g4 = new gp.CrearGasto("Gasolina", 60.42, "2021-10-08", ["transporte", "gasolina"]);
    var g5 = new gp.CrearGasto("Seguro hogar", 206.45, "2021-09-26", ["casa", "seguros"]);
    var g6 = new gp.CrearGasto("Seguro coche", 195.78, "2021-10-06", ["transporte", "seguros"]);

    gp.anyadirGasto(g1);
    gp.anyadirGasto(g2);
    gp.anyadirGasto(g3);
    gp.anyadirGasto(g4);
    gp.anyadirGasto(g5);
    gp.anyadirGasto(g6);

    web.mostrarDatoEnId('gastos-totales', gp.calcularTotalGastos().toFixed(2) + ' €');
    web.mostrarDatoEnId('balance-total', gp.calcularBalance().toFixed(2) + ' €');

    var todos = gp.listarGastos();

    var contListado = document.getElementById('listado-gastos-completo');
    if(contListado) contListado.innerHTML = '';
    for(var i = 0; i<todos.length; i++){
        web.mostrarGastoWeb('listado-gastos-completo', todos[i]);
    }

    var sep2021 = gp.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta:"2021-09-30"});
    var contSep = document.getElementById('listado-gastos-filtrado-1');
    if(contSep) contSep.innerHTML = '';
    for(var j = 0; j < sep2021.length; j++){
        web.mostrarGastoWeb('listado-gastos-filtrado-1', sep2021[j]);
    }

    var mayores50 = gp.filtrarGastos({valorMinimo: 50});
    var cont50 = document.getElementById('listado-gastos-filtrado-2');
    if(cont50) cont50.innerHTML = '';
    for(var k = 0; k < mayores50.length; k++){
        web.mostrarGastoWeb('listado-gastos-filtrado-2', mayores50[k]);
    }

    var mayores200Seguros = gp.filtrarGastos({valorMinimo: 200, etiquetasTiene: ['seguros']});
    var cont3 = document.getElementById('listado-gastos-filtrado-3');
    if(cont3) cont3.innerHTML = '';
    for(var m = 0; m < mayores200Seguros.length; m++){
        web.mostrarGastoWeb('listado-gastos-filtrado-3', mayores200Seguros[m]);
    }

    var filtroComidaTrans = gp.filtrarGastos({valorMaximo: 50, etiquetasTiene: ['comida', 'transporte']});
    var cont4 = document.getElementById('listado-gastos-filtrado-4');
    if(cont4) cont4.innerHTML = '';
    for( var n = 0; n < filtroComidaTrans.length; n++){
        web.mostrarGastoWeb('listado-gastos-filtrado-4', filtroComidaTrans[n]);
    }

    var agrupDia = gp.agruparGastos('dia', [], "1970-01-01", undefined);
    web.mostrarGastosAgrupadosWeb('agrupacion-dia', agrupDia, 'dia');

    var agrupMes = gp.agruparGastos('mes', [], undefined, undefined);
    web.mostrarGastosAgrupadosWeb('agrupacion-mes', agrupMes, 'mes');

    var agrupAnyo = gp.agruparGastos('anyo', [], undefined, undefined);
    web.mostrarGastosAgrupadosWeb('agrupacion-anyo', agrupAnyo, 'anyo');


    
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
} else {
    main();
}