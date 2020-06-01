"use sctrict"



let rowsGoles = [
    {
        nombre: "G. Blasco",
        equipo: "FreeRonaldinho",
        goles: 7
    },
    {
        nombre: "O. Martinez",
        equipo: "CA Ford",
        goles: 5
    },
    {
        nombre: "J. Lopez",
        equipo: "FreeRonaldinho",
        goles: 4
    },
    {
        nombre: "L. Quinteros",
        equipo: "Bohemio F.C.",
        goles: 4
    },
    {
        nombre: "G. Usinger",
        equipo: "Anfield",
        goles: 3
    },
    {
        nombre: "M. Nicolás",
        equipo: "Liverfull",
        goles: 3
    }
]

//Funcion que calcula la media de goles, de la tabla de goleadores
function mediaGoles(){
    let suma = 0;
    for (let index = 0; index < rowsGoles.length; index++) {
         suma = suma + rowsGoles[index].goles;
    }
    return (suma/rowsGoles.length);
}


function mostrarTabla(){
    let contentTabla = "";
    
    for (let index = 0; index < rowsGoles.length; index++) {
        if((index%2) == 0){
            contentTabla = contentTabla + "<tr> <td>" + rowsGoles[index].nombre + "</td>" + 
                                                "<td>" + rowsGoles[index].equipo + "</td>" +
                                                "<td>" + rowsGoles[index].goles + "</td>" + 
                                                '<td><button class = '+ '"btnDel"> Del </button> </td></tr>';
        }else{
            contentTabla = contentTabla + '<tr class= "distinctRow" > <td>' + rowsGoles[index].nombre + "</td>" +
                                                "<td>" + rowsGoles[index].equipo + "</td>" +
                                                "<td>" + rowsGoles[index].goles + "</td>" +
                                                '<td><button class = '+ '"btnDel"> Del </button> </td></tr>';

        }
    }
    contentTabla += '<tr class = "filaAdd"><td><input type="text" name="" class = "inAddName" id="IdInputNombre" placeholder="Nombre" required></td>' + 
    '<td><input type="text" name="" id="IdInputEquipo" class = "inAddTeam" placeholder="Equipo" required></td>' +
    '<td><input type="text" name="" id="IdInputGoles" class = "inAddGoal" placeholder="Goles" required></td>' +
    '<td><input type="button" value="Add" id="idBtnAdd" class = "inAddBtn" ></td> </tr>';
    
    document.querySelector("#idTBodyGoles").innerHTML = contentTabla;
    document.querySelector("#idBtnAdd").addEventListener("click", addRow);
    let botones = document.querySelectorAll(".btnDel");
    for (let index = 0; index < botones.length; index++) {
        botones[index].addEventListener("click", function(){
            deleteRow(index);
        })
    }
}

mostrarTabla();


function addRow(){
    let name = document.querySelector("#IdInputNombre").value;
    let team = document.querySelector("#IdInputEquipo").value;
    let goals = document.querySelector("#IdInputGoles").value;
    if(name != "" && team != "" && goals != ""){
        let newRow = {nombre: name, equipo: team, goles: goals};
        rowsGoles.push(newRow);
        rowsGoles.sort(function (a,b){return (b.goles - a.goles) });
        mostrarTabla();
    }else{
        console.log("requerido");
        document.querySelector("#IdInputNombre").classList.add("required");
        document.querySelector("#IdInputEquipo").classList.add("required");
        document.querySelector("#IdInputGoles").classList.add("required");
    }
    
}


function deleteRow(indice){
    rowsGoles.splice(indice,1);
    console.log(rowsGoles);
    mostrarTabla();
}