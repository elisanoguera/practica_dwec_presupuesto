export function mostrarDatoEnId(idElemento, valor)
    {
        // TODO
        let element=document.getElementById(idElemento);
        element.textContent=valor;
    }

// Mostrar un gasto completo dentro de un contenedor
export function mostrarGastoWeb(idElemento, gasto)
    {
        let gastobyid=document.getElementById(idElemento);//pour le rattacher lors de  l appel dans generarDatosEstatico

        //crear el div principal
        let divGasto=document.createElement("div");
        divGasto.className="gasto";

        //creer clas gasto descriptio
        let divGDescripcion=document.createElement("div");
        divGDescripcion.className="gasto-descripcion";
        divGDescripcion.textContent=gasto.descripcion;

        //creer clas gasto fecha
        let divGFecha=document.createElement("div");
        divGFecha.className="gasto-fecha";
        divGFecha.textContent=new Date(gasto.fecha).toLocaleDateString();//error de frappe= attention bien mettre le . entre gasto y fecha

        //crear gasto valor
        let divGValor=document.createElement("div");
        divGValor.className="gasto-valor";
        divGValor.textContent=gasto.valor;
        
        //crear div gasto etiquetas
        let divGetiquetas=document.createElement("div");
        divGetiquetas.className="gasto-etiquetas";
        /*divGetiquetas=gasto.etiquetas;
        //ahora el span etiqueta
        let spanGetiqueta=document.createElement("span");
        spanGetiqueta.className="gasto-etiquetas-etiqueta";*/  // no funciona
        //je dois parcourir toutes les étiquettes du gasto

        gasto.etiquetas.forEach(etiqueta => {
            let spanGetiqueta=document.createElement("span")
             spanGetiqueta.className="gasto-etiquetas-etiqueta";
             spanGetiqueta.textContent = etiqueta;
             divGetiquetas.appendChild(spanGetiqueta)});

    divGasto.appendChild(divGDescripcion);
    divGasto.appendChild(divGFecha);
    divGasto.appendChild(divGValor);
    divGasto.appendChild(divGetiquetas);

    gastobyid.appendChild(divGasto);

        
    }

// Mostrar los gastos agrupados (resultado de agruparGastos)

export function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
    {
        // TODO
      
  let agrupById=document.getElementById(idElemento);

        let divGagrup=document.createElement("div");
        divGagrup.className="agrupacion";

      
//tengo q crear el h1- no olvidar

    let Gh1 = document.createElement("h1");
    Gh1.textContent = `Gastos agrupados por ${periodo}`;//RENVOI A LA PERIDOE CHOISIE
    divGagrup.appendChild(Gh1);
// important: Object.entries(obj) transforme un objet en un tableau de paires [clé, valeur].
Object.entries(agrup).forEach(([clave,valor])=>
        {
            let divGagrupDatos=document.createElement("div");
            divGagrupDatos.className="agrupacion-dato";

            let spanGagrupDatoClave=document.createElement("span");
            spanGagrupDatoClave.className="agrupacion-dato-clave";
            spanGagrupDatoClave.textContent = clave;

            let spanGagrupDatoValor=document.createElement("span");
            spanGagrupDatoValor.className="agrupacion-dato-valor";
            spanGagrupDatoValor.textContent = valor;

            
            divGagrupDatos.appendChild(spanGagrupDatoClave);
            divGagrupDatos.appendChild(spanGagrupDatoValor);
            divGagrup.appendChild(divGagrupDatos);
        });
agrupById.appendChild(divGagrup);//no olvidar lo ni poner lo dentro del foreach
    }


