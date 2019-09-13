var opciones = [];
var preguntas = [];
var idCategoriaCosta = 1;
var selectOpction;
var selectQuestion;
var seleccion;
var url = "/api/opcionRespuesta/";
var urlPreguntas = "/api/pregunta/";

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/api/pregunta/",
        dataType: 'json',
        success: function (data) {
            preguntas = data;
            llenarComboPregunta(data);
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
            opciones = data;
            console.log(data);
            obtenerPregunta();
        }
    });    
    function obtenerPregunta(){
        $.ajax({
            type: "GET",
            url: urlPreguntas,
            dataType: 'json',
            success: function (data) {
                preguntas = data;
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
    for (var opKey in opciones) {
        var id = opciones[opKey]["id"];
        var descripcion = opciones[opKey]["descripcion"];
        var respuestaValida = opciones[opKey]["respuestaValida"];
        var idPregunta = opciones[opKey]["idPregunta"];
        var pregunta = obtenerPregunta(idPregunta);

        var p = $("<p></p>")
            .hide()
            .text(id);
        var div = $("<div></div>");
        var h2Desc = $("<h2></h2>")
            .text(id + ". " + descripcion);        
        var h3Preg = $("<h3></h3>")
            .text(pregunta);
        var h3Resp = $("<h3></h3>")
            .text(respuestaValida);

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
        div.append(h3Resp);
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
function obtenerPregunta(idPregunta){
    for (var k in preguntas){
        if (preguntas[k]["id"] == idPregunta){
            return preguntas[k]["descripcion"];
        }
    }
    return "No encontrado";
}

function contruirForm(accion, id) {
    var url_peticion = "";
    var nombre_tipo = "";
    var titulo = "Crear Nueva Opción";
    
    if (accion == "nuevo") url_peticion = url;
    if (accion == "editar") {
        url_peticion = url + id + "?_method=PUT";
        titulo = "Editar Opción";
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
    var labelVoF = $("<label></label>")
        .attr("for", "fname")
        .text("Valida:");
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

    llenarComboPregunta();
    llenarComboVoF();

    form.append(labelPregunta);
    form.append(selectQuestion);
    form.append(labelVoF);
    form.append(selectVoF);
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

function llenarComboPregunta(datosPregunta) {
    seleccion = $("<select></select>")
        .attr("class", "selectpicker")
        .attr("data-style", "btn-info")
        .attr("name", "idPregunta");

    $.each(datosPregunta, function (key, pregunta) {
        selectQuestion = seleccion.append($('<option value=' + pregunta.id + '>' + pregunta.descripcion + '</option>'));
    });
}

function llenarComboVoF() {
    seleccion = $("<select></select>")
        .attr("class", "selectpicker")
        .attr("data-style", "btn-info")
        .attr("name", "respuestaValida");
    selectVoF = seleccion.append($('<option value=true>Verdadero</option>'));
    selectVoF = seleccion.append($('<option value=false>Falso</option>'));

}