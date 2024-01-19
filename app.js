/*
    Primera clase:
    Que se realiza:
    - Se enseño el objeto document en cual es un puente entre el JS y el HTML.
    - Por medio de los metodos de este objeto podemos manipular el DOM de la paguina
    - Creando una variable podemos almacenar el objeto y esta variable ya toma atributos de objeto.
    - La variable de tipo objeto en este caso "module titulo let titulo: HTMLHeadingElement " adquiere metodos que dados de document para realizar acciones
    - por meido de .innerHTML podemos ingresar texto al HTML por medio de la etiqua selecionada en le querySelector
    HTML:
    - en le HTML Podemos usagnar eventos usando el on dentro de la etiqueta "<button onclick="alert('click2')"
    - Dentro de este evente se espero codigo JS
    - Se realizo un funcion por medio de la palabra reservada function para que esta ejecutara una accion haciendo depsues de hacer click en el boton en el cual se accion el evento
*/
/*
    Asigna texto en un Elemento HTML
    - Hosting: JavaScript es un lenguaje que ejecuta de forma secuencial. Va leyendo de arriba hacia abajo. Línea 1, línea 2, línea 3, etc. En el caso de las funciones, lo primero que hace es ver si hay funciones declaradas o definidas. Las lee las funciones y las deja disponibles en algún lugar por si son llamadas en cualquier momento. Esto significa que independientemente de la función ser declarada o definida arriba o al final, igual va a funcionar. Puedo, en este caso, llamar a asignarTextoElemento() encima de la función. Este es un concepto llamado hoisting (Elevación) que existe en JavaScript. 
    - Funcion generica: por medio de los parametros la funcion va cambiar dependiento de los parametros que ingresen en ella
    Que se realizao en clases:
    Se tomo todos las diferentes declaraciones de variables para encasulaplar en una funcion generica, para poder hacer el la manipulacion del DOM haciendo uso del llamado de la funcion generica asignando en los parametros los diferentes elementos que queremos modificar
    esto hace que un codigo sea escalable a futuro
    el nombre de las funciones tienen que se auto descriptivas
*/

/* 
    Para llamar la funcion es el nombre y los parentesis, se puede realizar en JS y en HTML pero solo en eventos
    Ejemplo del Hosting llame la funcion antes de la funcion pero de igual manera funciona
*/

let numeroSecreto; // variable de ambito global
let intentos = 0; // se inicializa en uno porque almenos una vez debe jugar
let listaNumerosSorteados = []; //almacena los numeros que ya fueron jugados
let numeroMaximo = 10; //Ctrl+f para buscar en el codigo
let intentosMaximos = 3;
/*
    Funcion generica asigando paremetros que van dirigir el comportamiento de la función
    Parametros:
    - elemento: el tipo de etiqueta/elemento que se va modificar 
    - texto: El tenxto que se va mostrar al usuario
    Ya no se usa las comillas dentro del parametro de .querySelector y el .innerHTML, porque ya no es un valor literal es una variable.
*/

function asiganarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento); //Es una variable objeto que esta capturando el h1 del HTML para poder manipularlo
  elementoHTML.innerHTML = texto;
}
/*
    Funciones que Retornar un valor : las funcines pueden retornar un valor el cual puede ser usado dentro del codigo.
    - aunque el codigo no esta retornando nada es de buena practica asignar el return en las funciones.
    Alcance o Ambito de la variable: 
    - Ambito o alcanze Global: esta por fuera de cualqueier estructura puede ser llamada encualquier parte del codigo
    - Ambito o alcanze bloque: esta dentro de una estructura 

*/
function generarNumeroSecreto() {
  let numeroRegenerado = Math.floor(Math.random() * numeroMaximo) + 1; // singnica que cuando ejecutemos nos va retornar un valor
  console.log(numeroRegenerado);
  console.log(listaNumerosSorteados);
  console.log(intentos);
  //Si ya sorteamos todos los numeros, es una la condicion de salida o base para salir de la recursividad
  if (listaNumerosSorteados.length == numeroMaximo) {
    asiganarTextoElemento("p", "Ya se sortearon todos los números posibles");
    document.querySelector("#jugar").setAttribute("disabled", true);
  } else {
    //Si el nuemero generado esta incluido en la lista
    if (listaNumerosSorteados.includes(numeroRegenerado)) {
      return generarNumeroSecreto(); //recursividad se llama asi misma en el caso que el nuero que se genero ya esta dentro de la lista
    } else {
      listaNumerosSorteados.push(numeroRegenerado);
      return numeroRegenerado;
    }
  }
}

/*
    Elementos de input de HTML:
    conectamos el id de input por meido del getElmentById, y por meido del evento onclick que esta en el boton de intentar recuperamos el valor ingresado en el la etiqueta de input
    === : el triple igual es como una validación a más para decirle "mira, tiene que ser igual en valor e igual en tipo de datos". 
    Que se realizo en la clase
    - se obtuvo la informaicon por meido del id en input por meido del getElementById,
    - se retorno valores de las funciones
    - Se vio la diferente entre variables globales y variables de bloque
*/
function verificarIntento() {
  let numeroDeUsuario = parseInt(
    document.getElementById("valor_usuario").value
  );

  //por medio del getElementById podemos buscar por medio del id en HTML, retorna el objeto
  //Al realizar otra invocacion con el "." salen mas metodos para usar en este caso se usa el value

  if (numeroDeUsuario === numeroSecreto) {
    asiganarTextoElemento(
      "p",
      `¡Acertaste el número! 🥳🎉, en ${intentos} ${
        intentos === 1 ? "ves" : " veces"
      }`
    ); //mandar template strint como parametro
    document.getElementById("reiniciar").removeAttribute("disabled"); //.remoAttribute para eliminar el atributo
  } else {
    console.log(intentos);
    if (numeroDeUsuario < numeroSecreto) {
      asiganarTextoElemento("p", "Número secreto es mayor 🤐");
    } else {
      asiganarTextoElemento("p", "Número secreto es menor 🤐");
    }
    intentos++;
    limpiarCaja();
  }
  if (intentos == intentosMaximos) {
    console.log(intentos);
    asiganarTextoElemento("p", `Llegaste al limite de intentos ${intentos}`);
    document.querySelector("#jugar").setAttribute("disabled", true);
    document.querySelector("#reiniciar").removeAttribute("disabled");
  }
  return; // por buena practica se ve cololar el return en una funcion, así esta no vaya a retornar nada
}
function limpiarCaja() {
  document.querySelector("#valor_usuario").value = ""; //uso del querySelectro para buscar con Id
  //por medio del value limpiamos el objeto mandado un cadena vacia
}

function condicionesIniciales() {
  asiganarTextoElemento("p", `Indica un numero del 1 al ${numeroMaximo}`);
  asiganarTextoElemento("h1", "Juego del número secreto");
  numeroSecreto = generarNumeroSecreto();
  intentos = 1;
}

function reiniciarJuego() {
  //Limpiar la caja
  limpiarCaja();
  //Indicar mensaje de intervalo de numeros
  //Generar el número aletorio
  //Inicializar el número de intentos
  condicionesIniciales();
  //Deshabilitar el botón de nuevo juego
  document.querySelector("#reiniciar").setAttribute("disabled", true); //por medio del setAttribute podemos agregar un elemento, espero dos parametros el parametro que vamos agregar y ademas el valor que va tener este prametro en este caso el true nos dice qu esta activado
  intentos = 0;
  document.querySelector("#jugar").removeAttribute("disabled");
}
condicionesIniciales();
