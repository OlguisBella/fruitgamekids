var preguntas = [];
var niveles = [];
var idCategoriaCosta = 1;
var selectOpction;
var selectNivel;
var seleccion;
var url = "/api/pregunta/";
var urlNivel = "/api/nivel/";

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: urlNivel,
        dataType: 'json',
        success: function (data) {
            niveles = data;
            llenarComboNivel(data);
        },
        error: function (data) {
            alert('error');
        }
    });
    $("#btnNuevaFrutaC").click(function () {
        contruirForm("nuevo", "");
    });
    
    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        beforeSend: function (xhr) {
            if (xhr && xhr.overrideMimeType) {
                xhr.overrideMimeType('application/json;charset=utf-8');
            }
        },
        dataType: 'json',
        success: function (data) {
            preguntas = data;
            console.log(data);
            obtenerNivel();
        }
    });    
    function obtenerNivel(){
        $.ajax({
            type: "GET",
            url: urlNivel,
            dataType: 'json',
            success: function (data) {
                niveles = data;
                //llenarComboPregunta(data);
                construirLista();
            },
            error: function (data) {
                alert('error');
            }
        });
    }
});


//Crea la lista de frutas al cargar json, al inicio
function construirLista() {
    for (var opKey in preguntas) {
        var id = preguntas[opKey]["id"];
        var descripcion = preguntas[opKey]["descripcion"];
        var idNivel = preguntas[opKey]["idnivel"];
        var nivel = obtenerNivel(idNivel);

        var p = $("<p></p>")
            .hide()
            .text(id);
        var div = $("<div></div>");
        var h2Desc = $("<h2></h2>")
            .text(id + ". " + descripcion);        
        var h3Preg = $("<h3></h3>")
            .text(nivel);
            
        var imgEdit = $("<img></img>")
            .attr("src", "./images/BOTONES/EDITAR.png")
            .attr("id", "btnEdit" + id)
            .attr("data-value", id)
            .addClass("img-fluid");
        var aEdit = $("<a></a>")
            .attr("href", "#divform");
        var imgDel = $("<img></img>")
            .attr("src", "./images/BOTONES/ELIMINAR.png")
            .attr("id", "btnDel" + id)
            .attr("data-value", id)
            .addClass("img-fluid");
        var aDel = $("<a></a>")
            .attr("href", "#");

        var divBoton = $("<div></div>");

        aEdit.append(imgEdit);
        divBoton.append(aEdit);
        aDel.append(imgDel);
        divBoton.append(aDel);

        div.append(h2Desc);
        div.append(h3Preg);
        div.append(divBoton);

        $('#lista').append(div);
        $('#lista').append(p);
        //ELIMINAR

        $("#btnDel" + id).on('click', function (e) {
            var id = $(this).data("value");
            $.ajax({
                url: url + id,
                type: 'DELETE',
                success: function (result) {
                    //location.reload();
                }
            });
            location.reload();
        });

        //EDITAR
        $("#btnEdit" + id).on('click', function (e) {
            var id = $(this).data("value");
            console.log("clic" + id);
            contruirForm("editar", id)
        });
    };
}
function obtenerNivel(idPregunta){
    for (var k in niveles){
        if (niveles[k]["id"] == idPregunta){
            return niveles[k]["descripcion"];
        }
    }
    return "No encontrado";
}

function contruirForm(accion, id) {
    var url_peticion = "";
    var nombre_tipo = "";
    var titulo = "Crear Nueva Pregunta";
    
    if (accion == "nuevo") url_peticion = url;
    if (accion == "editar") {
        url_peticion = url + id + "?_method=PUT";
        titulo = "Editar Pregunta";
    }
        

    $("#divform").empty();
    $("#divform").append("<h2 id='game-page-title'>" + titulo + "</h2>");
    var form = $("<form></form>")
        .attr("action", url_peticion)
        .attr("enctype", "multipart/form-data")
        .attr("method", "POST");

    var labelPregunta = $("<label></label>")
        .attr("for", "fname")
        .text("Pregunta:");
    var labelDesc = $("<label></label>")
        .attr("for", "fname")
        .text("Descripción:");
    var inputDesc = $("<input></input>")
        .attr("type", "text")
        .attr("id", "fname")
        .attr("name", "descripcion")
        .attr("placeholder", "Descripción de " + nombre_tipo + "...")
        .prop('required', true);

    var submit = $("<input></input>")
        .attr("type", "submit")
        .attr("value", "Guardar");
    var btnCancel = $("<button></button>")
        .attr("id", "btnCancel")
        .attr("class", "btn btn-default btn-block")
        .text("Cancelar");

    llenarComboNivel();

    form.append(labelPregunta);
    form.append(selectNivel);
    form.append(labelDesc);
    form.append(inputDesc);

    var br = $("</br>");
    form.append(br);
    form.append(submit);
    form.append(btnCancel);
    $('#divform').append(form);

    //ELIMINAR
    $("#btnCancel").on('click', function (e) {
        $("#divform").empty();
    });
}

function llenarComboNivel(datos) {
    seleccion = $("<select></select>")
        .attr("class", "selectpicker")
        .attr("data-style", "btn-info")
        .attr("name", "idnivel");

    $.each(datos, function (key, nvl) {
        selectNivel = seleccion.append($('<option value=' + nvl.id + '>' + nvl.descripcion + '</option>'));
    });
}