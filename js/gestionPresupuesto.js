// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

var presupuesto = 0;

function actualizarPresupuesto(presupuesto) {
    // TODO
    var parametro = presupuesto;

    if(parametro < 0){
        parametro = -1;
        alert('Error valor no valido');
        return parametro
    }

    return parametro;
}

function mostrarPresupuesto() {
    // TODO
    var valor = presupuesto;

    let texto = 'El valor de la variable es ' + valor;

    return texto;

}

function CrearGasto(descripcion, valor) {
    // TODO

    //Comprobamos que el valor introducido sea mayor a 0, por lo que no sera un numero negativo
    if(valor < 0){
        valor = 0;
    }

    //Creamos el objeto gasto
    let gasto = {
        //Le añadimos las propiedades
        descripcion: descripcion,
        valor: valor,


        //Creamos los metodos
        //metodo para mostrar el gasto
        mostrarGasto: function(){
            alert("Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €.")
        },

        //Metodo para actualizar la descripcion
        actualizarDescripcion: function(nuevaDescripcion){
            this.descripcion = nuevaDescripcion;
        },

        //Metodo para actualizar el valor del objeto
        actualizarValor: function(nuevoValor){
            if(nuevoValor < 0){
              this.valor = nuevoValor;  
            }
            else{
                alert("Valor introducido negativo. Introduzca otro valor");
            }
        },
    }

    //Devolvemos el objeto gasto
    return gasto;

    

}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
