var preguntas = [];
var categorias = [];
var idCategoriaCosta = 1;
var selectOpction;
var selectCategoria;
var seleccion;
var url = "/api/nivel/";
var urlCategoria = "/api/categoria/";

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: urlCategoria,
        dataType: 'json',
        success: function (data) {
            categorias = data;
            llenarComboCategorias(data);
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
            obtenerCategoria();
        }
    });    
    function obtenerCategoria(){
        $.ajax({
            type: "GET",
            url: urlCategoria,
            dataType: 'json',
            success: function (data) {
                categorias = data;
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
        var valor = preguntas[opKey]["valor"];
        var idCategoria = preguntas[opKey]["categoriaid"];
        var categoria = obtenerCategoria(idCategoria);

        var p = $("<p></p>")
            .hide()
            .text(id);
        var div = $("<div></div>");
        var h2Desc = $("<h2></h2>")
            .text(id + ". " + descripcion);
        var h3Preg = $("<h3></h3>")
            .text("Categoría: " + categoria);
        var h3Valor = $("<h3></h3>")
            .text("Valor: " + valor);
            
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
        div.append(h3Valor);
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
function obtenerCategoria(idCategoria){
    for (var k in categorias){
        if (categorias[k]["id"] == idCategoria){
            return categorias[k]["nombre"];
        }
    }
    return "No encontrado";
}

function contruirForm(accion, id) {
    var url_peticion = "";
    var nombre_tipo = "";
    var titulo = "Crear Nuevo Nivel";
    
    if (accion == "nuevo") url_peticion = url;
    if (accion == "editar") {
        url_peticion = url + id + "?_method=PUT";
        titulo = "Editar Nivel";
    }
        

    $("#divform").empty();
    $("#divform").append("<h2 id='game-page-title'>" + titulo + "</h2>");
    var form = $("<form></form>")
        .attr("action", url_peticion)
        .attr("enctype", "multipart/form-data")
        .attr("method", "POST");

    var labelCategoria = $("<label></label>")
        .attr("for", "fname")
        .text("Categoria:");
    var labelDesc = $("<label></label>")
        .attr("for", "fname")
        .text("Descripción:");
    var inputDesc = $("<input></input>")
        .attr("type", "text")
        .attr("id", "fname")
        .attr("name", "descripcion")
        .attr("placeholder", "Descripción de " + nombre_tipo + "...")
        .prop('required', true);
    var labelValor = $("<label></label>")
        .attr("for", "fname")
        .text("Valor:");
    var inputValor = $("<input></input>")
        .attr("type", "text")
        .attr("id", "fname")
        .attr("name", "valor")
        .attr("placeholder", "Valor de " + nombre_tipo + "...")
        .prop('required', true);

    var submit = $("<input></input>")
        .attr("type", "submit")
        .attr("value", "Guardar");
    var btnCancel = $("<button></button>")
        .attr("id", "btnCancel")
        .attr("class", "btn btn-default btn-block")
        .text("Cancelar");

    llenarComboCategorias();

    form.append(labelCategoria);
    form.append(selectCategoria);
    form.append(labelDesc);
    form.append(inputDesc);
    form.append(labelValor);
    form.append(inputValor);

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

function llenarComboCategorias(datos) {
    seleccion = $("<select></select>")
        .attr("class", "selectpicker")
        .attr("data-style", "btn-info")
        .attr("name", "categoriaid");

    $.each(datos, function (key, cat) {
        selectCategoria = seleccion.append($('<option value=' + cat.id + '>' + cat.nombre + '</option>'));
    });
}