// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = []; //Es un array vacío [] que ira almacenando todos los objetos de gasto que cree más adelante
let idGasto = 0; // Se ira incrementando cada vez que cree un nuevo gasto, para asignarle un identificador único


function actualizarPresupuesto(presupuestoActualizado) {

    if (typeof presupuestoActualizado === 'number' && presupuestoActualizado >= 0 && !isNaN(presupuestoActualizado)) {
        presupuesto = presupuestoActualizado;
        return presupuesto;
    } else {
        console.error("El presupuesto debe ser un número válido mayor o igual a 0");
        return -1;
    }
}

function mostrarPresupuesto() {
    return 'Tu presupuesto actual es de ' + presupuesto + ' €';
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
// Propiedades
    this.descripcion = String(descripcion);

    // Si el tipo de dato valor es de tipo numero y es mayor o igual a 0 y no es null
    this.valor = valor;
        if (typeof valor === 'number' && valor >= 0 && !isNaN(valor)) {
            this.valor = valor;
        } else {
            this.valor = 0;
        };

    // Fecha
    // Parse me devuelve un número si el formato de fecha es valido, si no es valido devuelve NaN osea false
    // Si la fecha no es valida se asigna la fecha actual
    let fech = Date.parse(fecha);
    if (!isNaN(fech)){
        this.fecha = fech;
    } else {
        this.fecha = Date.parse(new Date());
    };

    // Etiquetas
    // Creo un array vacio y utilizo esta función que ya comprueba que no haya etiquetas repetidas
    this.etiquetas = [];
    

    

// Métodos
    this.mostrarGasto = function() {
        return 'Gasto correspondiente a ' + this.descripcion + ' con valor ' + this.valor + ' €';
    }
    
    // La descripcion siempre sera una cadena 
    this.actualizarDescripcion = function(newDescripcion) {
        this.descripcion = String(newDescripcion);
    }
    
    // Actualiza el valor del gasto si el nuevo valor es un número válido y no es un numero negativo
    this.actualizarValor = function(newValor) {
        if (typeof newValor === 'number' && newValor >= 0 && !isNaN(newValor)) {
            this.valor = newValor;
        } 
    }

    // Actualizar fecha
    // Recibe fecha en formato texto y la convierte a formato timestamp con Date.parse
    this.actualizarFecha = function (fecha){
        let fechaNueva = Date.parse (fecha);
    // Si la fecha es valida (no es NaN) se actualiza la propiedad fecha
        if (!isNaN(fechaNueva)){
            this.fecha = fechaNueva;
        }
    }


    // Añadir etiquetas: recorro el listado de etiquetas pasadas como parametro, si no existe en el array etiquetas lo añado.
    // Uso indexof para comprobar si existe la etiqueta en el array
    this.anyadirEtiquetas = function (...nuevasEtiquetas){ 
        for(let etiq of nuevasEtiquetas){
            if(this.etiquetas.indexOf(etiq) === -1)
            this.etiquetas.push(etiq);
        }
    }

    // Borrar etiqueta
    this.borrarEtiquetas = function(...etiqe){
    let newEtiquetas = [];
        for(let eti of this.etiquetas){
            if(etiqe.indexOf(eti) === -1){
                newEtiquetas.push(eti);
            }
        }
        this.etiquetas = newEtiquetas;
    }

    // obtenerPeriodoAgrupacion sirve para agrupar gastos por año, mes o día según el formato de la fecha
    this.obtenerPeriodoAgrupacion = function(periodo) {
        let fech = new Date(this.fecha);  // Crear objeto fecha
        let isoFecha = fech.toISOString();  // Convertir a cadena ISO
    
                if (periodo === "anyo") {
                return isoFecha.slice(0,4); // extrae los 4 primeros caracteres, que corresponden al año
            }
                if (periodo === "mes") {
                return isoFecha.slice(0,7); // extrae los 7 primeros caracteres, da el año y mes, para agrupar por meses
            }
                if (periodo === "dia") {
                return isoFecha.slice(0,10); // extrae los 10 primeros caracteres, da el año, mes y día, para agrupar por día
            }
            return isoFecha.slice(0,7); // Si el parámetro periodo no coincide con ninguno de los anteriores,
                                        // la función devuelve el mes por defecto
    }


        
    // Mostrará la suma de todos los gastos, devuelve texto multilinea
    // Creamos el objeto fecha con new Date pasandole como parametro fecha, El formato de la fecha con toLocaleString
    // Recorremos el array etiquetas para mostrarlas en lineas separadas
    this.mostrarGastoCompleto = function() {
    let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
    texto += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
    texto += `Etiquetas:\n`;
    
    for (let etiq of this.etiquetas) {
        texto += `- ${etiq}\n`;
    }
    
    return texto;
    }

    this.anyadirEtiquetas(...etiquetas);
}

// Funciones 
function listarGastos() {
    return gastos;
}


function anyadirGasto(gasto) {
// Incrementar el contador para el próximo gasto, modifica la variable GLOBAL idGasto, esto lo gestiona la aplicación no el usuario
    gasto.id = idGasto++;
    gastos.push(gasto);
}



function borrarGasto(id) {
    let indice = -1;
    
    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id === id) {
            indice = i;
        }
    }
    
    if (indice !== -1) {
        gastos.splice(indice, 1);
    }
}   


function calcularTotalGastos() {
let total = 0;
    for (let gas of gastos) {
        // for (let i = 0; i < gastos.length; i++) {
        total = total + gas.valor;
    }
    return total;
}


function calcularBalance() {
return presupuesto - calcularTotalGastos();
}


// Este "filtro" será un objeto con posibles propiedades (fechaDesde, valorMinimo, etc.)
function filtrarGastos(filtro) {
    // Usamos filter  Este método devuelve un nuevo array con solo los elementos que cumplen las condiciones.
    return gastos.filter(function(gasto) {
        let cumple = true; // asumimos que el gasto cumple con todos los criterios

    // Comprobamos si la fecha del gasto es posterior o igual a esa fecha.
    if (filtro.fechaDesde) {
        if (new Date(gasto.fecha) < new Date(filtro.fechaDesde)) {
        cumple = false;
        }
    }

    // Fecha máxima
    if (filtro.fechaHasta) {
        if (new Date(gasto.fecha) > new Date(filtro.fechaHasta)) {
        cumple = false;
        }
    }

    // Valor mínimo
    if (filtro.valorMinimo) {
        if (gasto.valor < filtro.valorMinimo) {
        cumple = false;
        }
    }

    // Valor máximo
    if (filtro.valorMaximo) {
        if (gasto.valor > filtro.valorMaximo) {
        cumple = false;
        }
    }

    // Descripción que contiene (sin distinguir mayúsculas/minúsculas)
    if (filtro.descripcionContiene) {
        let texto = filtro.descripcionContiene.toLowerCase();
        let descripcion = gasto.descripcion.toLowerCase();
        if (descripcion.indexOf(texto) === -1) {
            cumple = false;
        }
    }
    if (filtro.etiquetasTiene) {
      // Queremos que el gasto tenga al menos UNA etiqueta de las indicadas.
      // Usamos some() para comprobar si alguna etiqueta del gasto coincide.
        cumple = cumple && gasto.etiquetas.some(eti =>
        filtro.etiquetasTiene.some(e =>
            eti.toLowerCase() === e.toLowerCase()
        )
        );
    }
    // true el gasto cumple todas las condiciones y se incluye en el nuevo array.
    // false el gasto no cumple alguna condición y se descarta.
    return cumple;
});

}


// La función va a sumar los valores (valor) de todos los gastos que pertenezcan al mismo mes dia o año
function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta) {
    // Filtrar gastos según criterios
    let gastosFiltrados = filtrarGastos({
        etiquetasTiene: etiquetas,
        fechaDesde: fechaDesde,
        fechaHasta: fechaHasta
    });

    // Usamos reduce para agrupar los valores por período
    return gastosFiltrados.reduce(function(acumulador, gasto) {

    // Obtenemos el período correspondiente (día, mes o año)
    let per = gasto.obtenerPeriodoAgrupacion(periodo);
        
    // Si ya existe esa clave en el acumulador, sumamos el valor
    if (acumulador[per]) {
        acumulador[per] = acumulador[per] + gasto.valor;
    } else {
    // Si no existe, la creamos como el valor inicial
        acumulador[per] = gasto.valor;
    }

    // Devolvemos el acumulador (el objeto resultado)
    return acumulador;
  }, {}); // Valor inicial: objeto vacío
}



//objeto gasto
let gasto1 = new CrearGasto('Compra semanal', 50);
gasto1.descripcion; // 'Compra semanal'
gasto1.valor; // 50


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos
}
