

document.addEventListener("DOMContentLoaded",iniciarpageStats);

function iniciarpageStats(){
    
    "use sctrict"
    let rowsGoles = [
        {
            'nombre': "G. Blasco",
            'equipo': "FreeRonaldinho",
            'goles': 7
        },
        {
            'nombre': "O. Martinez",
            'equipo': "CA Ford",
            'goles': 5
        },
        {
            'nombre': "J. Lopez",
            'equipo': "FreeRonaldinho",
            'goles': 4
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
        let lastRow = '<tr class = "filaAdd"> <td> <input type="text" name="" class = "inAddName" id="IdInputNombre" placeholder="Nombre" required> </td>' + 
        '<td> <input type="text" name="" id="IdInputEquipo" class = "inAddTeam" placeholder="Equipo" required> </td>' +
        '<td> <input type="text" name="" id="IdInputGoles" class = "inAddGoal" placeholder="Goles" required> </td>' +
        '<td> <input type="button" value="Add" id="idBtnAdd" class = "inAddBtn" > </td> </tr>'+
        '<tr class = "rowButtons"> <td> <input type="button" value="AddX3" id="idBtnAdd3" class = "inAddBtn" > </td> ' +
        '<td> <input type="button" value="Del All" id="idDelAll" class = "inAddBtn" > </td> </tr>';

        for (let index = 0; index < rowsGoles.length; index++) {
            if((index%2) == 0){
                contentTabla = contentTabla + "<tr> <td>" + rowsGoles[index].nombre + "</td>" ;
            }else{
                contentTabla = contentTabla + '<tr class= "distinctRow" > <td>' + rowsGoles[index].nombre +
                "</td>";
            }
            contentTabla += "<td>" + rowsGoles[index].equipo + "</td>" + "<td>" + rowsGoles[index].goles +
            "</td>" + '<td><button class = '+ '"btnDel"> Del </button> </td></tr>'
        }
        document.querySelector("#idTBodyGoles").innerHTML = contentTabla + lastRow;

        document.querySelector("#idBtnAdd").addEventListener("click", addRow);
        let botones = document.querySelectorAll(".btnDel");
        for (let index = 0; index < botones.length; index++) {
            botones[index].addEventListener("click", function(){
                deleteRow(index);
            })
        }
        document.querySelector("#idBtnAdd3").addEventListener("click", add3Row);
        document.querySelector("#idDelAll").addEventListener("click", deleteAll);
    }



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

    function add3Row(){
        toAdd = {
                'nombre': "L. Quinteros",
                'equipo': "Bohemio F.C.",
                'goles': 4
            };
        rowsGoles.push(toAdd);
        toAdd = {
                'nombre': "G. Usinger",
                'equipo': "Anfield",
                'goles': 3
            };
        rowsGoles.push(toAdd);
        toAdd = {
                'nombre': "M. Nicolás",
                'equipo': "Liverfull",
                'goles': 3
            };
        rowsGoles.push(toAdd);
        mostrarTabla();
    }

    function deleteAll(){
        rowsGoles.splice(0,rowsGoles.length);
        mostrarTabla();
    }


    function deleteRow(indice){
        rowsGoles.splice(indice,1);
        console.log(rowsGoles);
        mostrarTabla();
    }

    mostrarTabla();
}




