"use strict"


document.querySelector("#captchaH4").innerHTML = generador();

document.querySelector("#idForm").addEventListener("submit", validar);


function generador() {
    
    let codigo = "";
    let abecedario = "abcdefghijklmnopqrstuvwxyz0123456789";
    
    let nroRand;
    
    
    for (let index = 0; index <= 5; index++) {
        nroRand = Math.floor(Math.random() * 36);
        codigo += abecedario.substr(nroRand, 1);
    }
    
    return codigo;
}


function validar(event) {
    if (document.querySelector("#captchaH4").innerHTML != document.querySelector("#captchaIng").value) {
        document.querySelector("#idParrafoError").innerHTML = "Captcha incorrecto";
        document.querySelector("#captchaH4").innerHTML = generador();
        event.preventDefault();
    }
}


//esto tendria que pasar cuando se carga la página
//Corresponde al responsive de inscripcion

let mostrado = 1;
let botonesChange = document.querySelectorAll(".botonSig");
let aMostrar = "";
for (let index = 0; index < botonesChange.length; index++) {
    botonesChange[index].addEventListener("click", function(event){
        event.preventDefault();
        aMostrar = '.jug' + mostrado;
        document.querySelector(aMostrar).classList.toggle("mostrarJug");
        mostrado +=1;
        aMostrar = '.jug' + mostrado;
        document.querySelector(aMostrar).classList.toggle("mostrarJug");
    })
}

botonesChange = document.querySelectorAll(".botonAnt");
for (let index = 0; index < botonesChange.length; index++) {
    botonesChange[index].addEventListener("click", function(event){
        event.preventDefault();
        aMostrar = '.jug' + mostrado;
        document.querySelector(aMostrar).classList.toggle("mostrarJug");
        mostrado -=1;
        aMostrar = '.jug' + mostrado;
        document.querySelector(aMostrar).classList.toggle("mostrarJug");
    })
}