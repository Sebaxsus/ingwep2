function traerInformacion() {
    $.ajax(
        {
            url:"https://g2e09ee6deb0680-pfdb.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/estudiantes/estudiantes",
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuesta(respuesta.items);
            }
        }
    );
}
function pintarRespuesta(items1) {
    $("#resultado").empty();
    let items = items1.sort((a, b) => (a.id > b.id) ? 1 : (a.id < b.id) ? -1: 0);
    let myTable="<table class='responsive-table responsive-table-input-matrix'>";
    myTable += "<tr><th>id</th><th>Nombre</th><th>Apellido</th><th>Edad</th></tr>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].id+"</td>";
        myTable+="<td>"+items[i].nombre+"</td>";
        myTable+="<td>"+items[i].apellido+"</td>";
        myTable+="<td>"+items[i].edad+"</td>";
        myTable+="<td><button onclick='borrarElmento("+items[i].id+")'style='background: brown; color: white; border-color: white; border-radius: 5px; border-style: dotted; cursor: help;'>Borrar</button></td>";
        myTable+="</tr>";
    }
    
    myTable += "</table>";
    $("#resultado").append(myTable);
}

function guardarInformacion() {
    let myData = {nombre:$("#nombre").val(),apellido:$("#apellido").val(),edad:$("#edad").val()};
    let dataToSend = JSON.stringify(myData);
    console.log(dataToSend);
    console.log(myData);
    $.ajax(
        {
            url:"https://g2e09ee6deb0680-pfdb.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/estudiantes/estudiantes",
            type:"POST",
            data: dataToSend,
            datatype:"JSON",
            content:'application/json',
            success:function(respuesta, status){
                console.log(respuesta, status);
                alert("Insercion Exitosa");
                traerInformacion();
            },
            error:function(xhr,status) {
                alert("Operacion no completada, "+ xhr.status)
            }
        }
    );
}

function editarInformacion() {
    let myData = {id:$("#id").val(), nombre:$("#nombre").val(),apellido:$("#apellido").val(),edad:$("#edad").val()};
    let dataToSend = JSON.stringify(myData);

    $.ajax(
        {
            url:"https://g2e09ee6deb0680-pfdb.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/estudiantes/estudiantes",
            type:"PUT",
            data: dataToSend,
            datatype:"JSON",
            contentType:'application/json',
            success:function(respuesta, status){
                console.log(respuesta, status);
                alert("Actualizacion Exitosa");
                traerInformacion();
            },
            error:function(xhr,status) {
                alert("Operacion no completada, "+ xhr.status)
            }
        }
    );
}

function borrarElmento(id1) {
    let myData = {id: id1};
    let dataToSend = JSON.stringify(myData);
    
    $.ajax(
        {
            url:"https://g2e09ee6deb0680-pfdb.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/estudiantes/estudiantes",
            type:"DELETE",
            data: dataToSend,
            datatype:"JSON",
            contentType:'application/json',
            success:function(respuesta, status){
                console.log(respuesta, status);
                alert("Borrado Exitoso");
                traerInformacion();
            },
            error:function(xhr,status) {
                alert("Operacion no completada, "+ xhr.status)
            }
        }
    );
}