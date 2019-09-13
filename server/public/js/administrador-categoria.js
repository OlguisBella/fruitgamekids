var categorias = [];
var idCategoriaCosta = 1;
var selectOpction;
var selectCategoria;
var seleccion;
var url = "/api/categoria/";

$(document).ready(function () {
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
            categorias = data;
            console.log(data);
            construirLista();
        }
    });    
});


//Crea la lista de frutas al cargar json, al inicio
function construirLista() {
    for (var opKey in categorias) {
        var id = categorias[opKey]["id"];
        var nombre = categorias[opKey]["nombre"];

        var p = $("<p></p>")
            .hide()
            .text(id);
        var div = $("<div></div>");
        var h2Nombre = $("<h2></h2>")
            .text(id + ". " + nombre);
            
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

        div.append(h2Nombre);
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

function contruirForm(accion, id) {
    var url_peticion = "";
    var nombre_tipo = "";
    var titulo = "Crear Nueva Categoría";
    
    if (accion == "nuevo") url_peticion = url;
    if (accion == "editar") {
        url_peticion = url + id + "?_method=PUT";
        titulo = "Editar Categoría";
    }
        

    $("#divform").empty();
    $("#divform").append("<h2 id='game-page-title'>" + titulo + "</h2>");
    var form = $("<form></form>")
        .attr("action", url_peticion)
        .attr("enctype", "multipart/form-data")
        .attr("method", "POST");

    var labelNombre = $("<label></label>")
        .attr("for", "fname")
        .text("Nombre:");
    var inputNombre = $("<input></input>")
        .attr("type", "text")
        .attr("id", "fname")
        .attr("name", "nombre")
        .attr("placeholder", "Nombre de " + nombre_tipo + "...")
        .prop('required', true);
     

    var submit = $("<input></input>")
        .attr("type", "submit")
        .attr("value", "Guardar");
    var btnCancel = $("<button></button>")
        .attr("id", "btnCancel")
        .attr("class", "btn btn-default btn-block")
        .text("Cancelar");

    form.append(labelNombre);
    form.append(inputNombre);

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