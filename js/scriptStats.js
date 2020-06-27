

document.addEventListener("DOMContentLoaded",iniciarpageStats);

function iniciarpageStats(){
    "use sctrict"

    let urlBase = "https://web-unicen.herokuapp.com/api/groups/099/goleadores";
    

    //Funcion que calcula la media de goles, de la tabla de goleadores
    function mediaGoles(){
        let suma = 0;
        for (let index = 0; index < rowsGoles.length; index++) {
            suma = suma + parseInt(rowsGoles[index].thing.goles);
        }
        return (suma/rowsGoles.length);
    }

    function mostrarTabla(){

        
        '<input type="text" class="input' + index + ' value=" ' + rowsGoles[index].thing.equipo +  ' " readonly>'

        fetch(urlBase,{
            "method": "GET",
            "headers": {"Content-Type": "application/json"}
        })
        .then(function(respuesta){ 
            return respuesta.json()
        })
        .then(function(json) {
            rowsGoles = json.goleadores;
            let contentTabla = "";
            let lastRow = '<tr class = "filaAdd"> <td> <input type="text" name="" class = "inAddName" id="IdInputNombre" placeholder="Nombre" required> </td>' + 
            '<td> <input type="text" name="" id="IdInputEquipo" class = "inAddTeam" placeholder="Equipo" required> </td>' +
            '<td> <input type="number" name="" id="IdInputGoles" class = "inAddGoal" placeholder="Goles" required> </td>' +
            '<td> <input type="button" value="Add" id="idBtnAdd" class = "inAddBtn" > </td> </tr>'+
            '<tr class = "rowButtons"> <td> <input type="button" value="AddX3" id="idBtnAdd3" class = "inAddBtn" > </td> ' +
            '<td> <input type="button" value="Del All" id="idDelAll" class = "inAddBtn" > </td> </tr>';
            
            let clase ="";
            for (let index = 0; index < rowsGoles.length; index++) {
                if((index%2) == 0){
                    //Aplico estilo diferente si los goles superan la media
                    
                    if (rowsGoles[index].thing.goles >= mediaGoles(rowsGoles)){
                        contentTabla = contentTabla + '<tr class= "moreThanMedia"> <td>' + rowsGoles[index].thing.nombre + "</td>" ;
                    }else{
                        contentTabla = contentTabla + '<tr> <td>' + rowsGoles[index].thing.nombre + "</td>" ;
                    }
                }else{
                    if (rowsGoles[index].thing.goles >= mediaGoles()){
                        contentTabla = contentTabla + '<tr class= "moreThanMedia distinctRow"> <td>' + rowsGoles[index].thing.nombre + "</td>" ;
                    }else{
                        contentTabla = contentTabla + '<tr class= "distinctRow"> <td>' + rowsGoles[index].thing.nombre + "</td>" ;
                    }
                }
                contentTabla += "<td>" + rowsGoles[index].thing.equipo + "</td>" + "<td>" + rowsGoles[index].thing.goles +
                "</td>" + '<td><button class = '+ '"btnDel" id="' + rowsGoles[index]._id  + '"> Del </button> </td></tr>'
            }
            document.querySelector("#idTBodyGoles").innerHTML = contentTabla + lastRow;

            document.querySelector("#idBtnAdd").addEventListener("click", addRow);
            let botones = document.querySelectorAll(".btnDel");
            for (let index = 0; index < botones.length; index++) {
                botones[index].addEventListener("click", function(){
                    deleteRow(index, botones[index].id, rowsGoles);
                })
            }
            document.querySelector("#idBtnAdd3").addEventListener("click", add3Row);
            document.querySelector("#idDelAll").addEventListener("click", deleteAll);
        }) 
    }



    function addRow(){
        let name = document.querySelector("#IdInputNombre").value;
        let team = document.querySelector("#IdInputEquipo").value;
        let goals = document.querySelector("#IdInputGoles").value;
        if(name != "" && team != "" && goals != ""){
            let newRow = {nombre: name, equipo: team, goles: goals};
            rowsGoles.push(newRow);
            let toAdd = {
                "thing": newRow
            }
            let idAdded ="";
            fetch(urlBase,{
                "method": "POST",
                "body": JSON.stringify(toAdd),
                "headers": {"Content-Type": "application/json"}
            })

            .then(function(r){
                return r.json()
             })
             .then(function(json) {
                //Funcion clausurada
                //rowsGoles.sort(function (a,b){return (b.goles - a.goles) });
                //console.log(json);
             })
             .catch(function(e){
                console.log(e)
             })   
            
        }else{
            document.querySelector("#IdInputNombre").classList.add("required");
            document.querySelector("#IdInputEquipo").classList.add("required");
            document.querySelector("#IdInputGoles").classList.add("required");
        }
        mostrarTabla();
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
        rowsGoles.sort(function (a,b){return (b.goles - a.goles) });
        mostrarTabla();
    }

    function deleteAll(){
        rowsGoles.splice(0,rowsGoles.length);
        mostrarTabla();
    }

    function deleteRow(indice,id,rowsGoles){
        rowsGoles.splice(indice,1);
        delAllServicio(id);
        mostrarTabla();
    }

    //mostrarTabla();



    //Cosas del servicio--------------------------------------------------------------------
    //Cosas del servicio--------------------------------------------------------------------
    //Cosas del servicio--------------------------------------------------------------------


    /* //Funcion que agrega en el objeto del servicio
    function agregarAServicio(newItem){
        fetch(urlBase,{
            "method": "POST",
            "body": JSON.stringify(newItem),
            "headers": {"Content-Type": "application/json"}
        })
        .then(function(r){
            return r.json()
         })
         .then(function(json) {
            //id del thing agregado
            id = json.information._id;
         })
         .catch(function(e){
            console.log(e)
         })   
   
    } */

    //Funcion que borra un elemento del objeto del servicio
    function delAllServicio(toDel){
        let newa = urlBase +"/" + toDel;
        console.log(newa);
        fetch(newa,{
            "method": "DELETE",
            "headers": {"Content-Type": "application/json"}
        })
    }
    
    
    //mostrarTabla();

}




