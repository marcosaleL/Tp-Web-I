"use strict"

//llamamos a la funcion generador para que genere un captcha ni bien se carga la pagina
document.querySelector("#captchaH4").innerHTML = generador();
//pusimos como evento "submit" para cuando se quiere enviar el formulario se valide el captcha
document.querySelector("#idForm").addEventListener("submit", validar);

//funcion que genera el captcha
function generador() {
    //creamos dos variables que almacenen una cadena de caracteres
    let codigo = "";
    let abecedario = "abcdefghijklmnopqrstuvwxyz0123456789";
    //la variable nroRand nos va a seleccionar un caracter de la variable abecedario
    let nroRand;
    //mediante el for hacemos 6 calculos de posicion aleatoria para asi siempre
    //obtenemos un captcha diferente y al azar.
    for (let index = 0; index <= 5; index++) {
        nroRand = Math.floor(Math.random() * 36);
        codigo += abecedario.substr(nroRand, 1);
    }
    //retornamos el captcha que se genero
    return codigo;
}

//esta funcion verifica si el captcha que ingresa el usuario es correcto o si no es correcto
function validar(event) {
    if (document.querySelector("#captchaH4").innerHTML != document.querySelector("#captchaIng").value) {
        document.querySelector("#idParrafoError").innerHTML = "Captcha incorrecto";
        document.querySelector("#captchaH4").innerHTML = generador();
        event.preventDefault();
    }
}

