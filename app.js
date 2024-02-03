let numeroSecreto = 0; //se crea la variable del numero secreto (inicializada)
let intentos = 0;
let listaNumerosSorteados = []; //con esto buscamos que exista un control sobre los numeros secretos que se han sorteado durante los juegos y que no se repitan en nuevos juegos
let numeroMaximo = 10;

//Funcion para asignar texto dentro de un elemento HTML 
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento); //retorna el elemento del html que deseamos modificar
    elementoHTML.innerHTML = texto; //asignamos el texto del titulo
    return; //no retorna nada, pero es una buena practica color el return despues de terminar una funcion
}

function verificarIntento() {
    //let numeroDeUsuario = document.querySelector('input'); //en el archivo html hay una etiqueta 'input' que define al numero que ingresa el usuario en la pagina
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value); //obtenemos el valor de la etiqueta 'input' del archivo html que está definida a través del id valorUsuario
    
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`¡Acertaste el número secreto en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}!`); //modifica el parrafo anterior para mostrar el mensaje de la acertaste
        document.getElementById('reiniciar').removeAttribute('disabled'); //habilitamos el boton de "Nuevo juego"
    } else {
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    //let valorCaja = document.querySelector('#valorUsuario'); //Toma el valor de la caja donde se toma el numero que da el usuario
    //valorCaja.value = ''; // se sobre escribe en la caja un mensaje vacio para simular que se limpia
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1; //se crea el numero secreto (se debe de asignar el numero secreto a una variable global, fuera de la funcion)
    //Si ya sorteamos todos los números, cerramos el juego:
    if (listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p','Ya se sortearon todos los número posibles :)');
    } else {
        //Si el numero generado está incluido en la lista, va a generar un nuevo numero secreto, pero si este no está en la lista, permite que se juegue con este y lo agrega a la lista
        if (listaNumerosSorteados.includes(numeroGenerado)){ //includes recorre toda la lista y checa si es un True o un False
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
    
    
}

function condicionesIniciales(){
    asignarTextoElemento('h1','Juego del número secreto!'); //se modifica h1 proveniente del html que corresponde al titulo
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}:`); //modificamos el 'p' que viene del html que corresponde a un parrafo
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego(){
    //Limpiar la caja
    limpiarCaja();

    //Indicar mensaje de intervalo de numeros, generar el número secreto y reiniciar el número de intentos
    condicionesIniciales();

    //Deshabilitar el boton de "Nuevo juego"
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

condicionesIniciales();