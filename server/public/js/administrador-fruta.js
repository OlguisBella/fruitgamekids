var costa = [];
var sierra = [];
var idCategoriaCosta = 1;
var idCategoriaSierra = 2;
var selectOpction;
var selectQuestion;
var seleccion;

$(document).ready(function () {

    // Ajax para obtener las categorías de las frutas

    $.ajax({
        type: "GET",
        url: "/api/categoria/",
        dataType: 'json',
        success: function (data) {
            llenarComboCategoria(data);
        },
        error: function (data) {
            alert('error');
        }
    });
    
    $.ajax({
        type: "GET",
        url: "/api/pregunta/",
        dataType: 'json',
        success: function (data) {
            llenarComboPregunta(data);
        },
        error: function (data) {
            alert('error');
        }
    });


    var datosEnviar = {
        "categoriaid": "1",
        "nombre": "",
        "url": "otra url"
    };

    //NUEVO FRUTA COSTA
    $("#btnNuevaFrutaC").click(function () {
        contruirForm("FrutaCosta", "nuevo", "");
    });

    //NUEVO FRUTA SIERRA
    $("#btnNuevaFrutaS").click(function () {
        contruirForm("FrutaSierra", "nuevo", "");
    });

    //Se obtiene los id de categoria
    $.ajax({
        type: 'GET',
        url: "/api/categoria/" + "Costa",
        data: datosEnviar,
        async: false,
        beforeSend: function (xhr) {
            if (xhr && xhr.overrideMimeType) {
                xhr.overrideMimeType('application/json;charset=utf-8');
            }
        },
        dataType: 'json',
        success: function (idCosta) {
            console.log(idCosta);
            idCategoriaCosta = idCosta.id;
            obtenerFrutasCosta();
        }
    });    
    $.ajax({
        type: 'GET',
        url: "/api/categoria/" + "Sierra",
        data: datosEnviar,
        async: false,
        beforeSend: function (xhr) {
            if (xhr && xhr.overrideMimeType) {
                xhr.overrideMimeType('application/json;charset=utf-8');
            }
        },
        dataType: 'json',
        success: function (idSierra) {
            console.log(idSierra);
            idCategoriaSierra = idSierra.id;
            obtenerFrutasSierra();
        }
    });
});

// Obtener las frutas por categoria
function obtenerFrutasCosta(){
    //Obtener json que genera el servidor
    $.ajax({
        type: 'GET',
        url: "/api/fruta/" + idCategoriaCosta,
        //data: datosEnviar,
        async: false,
        beforeSend: function (xhr) {
            if (xhr && xhr.overrideMimeType) {
                xhr.overrideMimeType('application/json;charset=utf-8');
            }
        },
        dataType: 'json',
        success: function (frutasCosta) {
            construirLista(frutasCosta, "costa");
        }
    });
}
function obtenerFrutasSierra(){
    $.ajax({
        type: 'GET',
        url: "/api/fruta/" + idCategoriaSierra,
        async: false,
        beforeSend: function (xhr) {
            if (xhr && xhr.overrideMimeType) {
                xhr.overrideMimeType('application/json;charset=utf-8');
            }
        },
        dataType: 'json',
        success: function (frutasSierra) {
            construirLista(frutasSierra, "sierra");
        }
    });
}

//Crea la lista de frutas al cargar json, al inicio
function construirLista(frutas, tipo) {
    var url_peticion = "/api/fruta/";
    var url_apiDelete = "/api/fruta/";
    var nombre_tipo = "";
    var titulo = "";
    switch (tipo) {
        case "costa":
            url_peticion = url_peticion + idCategoriaCosta;
            nombre_tipo = "FrutaCosta";
            break;
        case "sierra":
            url_peticion = url_peticion + idCategoriaSierra;
            nombre_tipo = "FrutaSierra";
            break;
        default:
        // code block
    }


    for (var fruta in frutas["frutas"]) {
        var idFruta = frutas["frutas"][fruta]["id"];
        var urlFruta = frutas["frutas"][fruta]["url"];
        var nombreFruta = frutas["frutas"][fruta]["nombre"];
        var p = $("<p></p>")
            .hide()
            .text(idFruta);
        var div = $("<div></div>");

        var imgFruta = $("<img></img>")
            .attr("src", urlFruta)
            .addClass("img-fluid");
        var aFruta = $("<a></a>");
        var imgEdit = $("<img></img>")
            .attr("src", "./images/BOTONES/EDITAR.png")
            .attr("id", "btnEdit" + nombre_tipo + nombreFruta + idFruta)
            .attr("data-value", idFruta)
            .addClass("img-fluid");
        var aEdit = $("<a></a>")
            .attr("href", "#divform");
        var imgDel = $("<img></img>")
            .attr("src", "./images/BOTONES/ELIMINAR.png")
            .attr("id", "btnDel" + nombre_tipo + nombreFruta + idFruta)
            .attr("data-value", idFruta)
            .addClass("img-fluid");
        var aDel = $("<a></a>")
            .attr("href", "#");

        var divBoton = $("<div></div>");
        var divFruta = $("<div></div>");
        titulo = nombreFruta;
        var h2 = $("<h2></h2>")
            .text(titulo);
        aFruta.append(imgFruta);
        divFruta.append(aFruta);
        aEdit.append(imgEdit);
        divBoton.append(aEdit);
        aDel.append(imgDel);
        divBoton.append(aDel);

        div.append(h2);
        div.append(divFruta);
        div.append(divBoton);

        $('#lista' + nombre_tipo).append(div);
        $('#lista' + nombre_tipo).append(p);
        //ELIMINAR

        $("#btnDel" + nombre_tipo + nombreFruta + idFruta).on('click', function (e) {
            var id = $(this).data("value");
            $.ajax({
                url: url_apiDelete + id,
                type: 'DELETE',
                success: function (result) {
                    location.reload();
                }
            });
            location.reload();
        });

        //EDITAR
        $("#btnEdit" + nombre_tipo + nombreFruta + idFruta).on('click', function (e) {
            var id = $(this).data("value");
            console.log("clic" + id);
            contruirForm(nombre_tipo, "editar", id)
        });
    };
}

//Crea Formulario para guardar y editar fruta

function contruirForm(tipo, accion, id) {

    var url_peticion = "";
    var nombre_tipo = "";
    var titulo;
    switch (tipo) {
        case "FrutaCosta":
            titulo = "Crear Nueva Fruta Costa";
            if (accion == "nuevo") url_peticion = "/api/fruta/";
            if (accion == "editar") {
                url_peticion = "/api/fruta/" + id + "?_method=PUT";
                titulo = "Editar Fruta Costa";
            }
            break;
        case "FrutaSierra":
            titulo = "Crear Nueva Fruta Sierra";
            if (accion == "nuevo") url_peticion = "/api/fruta";
            if (accion == "editar") {
                url_peticion = "/api/fruta/" + id + "?_method=PUT";
                titulo = "Editar Fruta Sierra";
            }
            break;
        default:
        // code block
    }

    $("#divform").empty();
    $("#divform").append("<h2 id='game-page-title'>" + titulo + "</h2>");
    var form = $("<form></form>")
        .attr("action", url_peticion)
        .attr("enctype", "multipart/form-data")
        .attr("method", "POST");

    var labelCategoria = $("<label></label>")
        .attr("for", "fname")
        .text("Categoría:");

    var labelPregunta = $("<label></label>")
        .attr("for", "fname")
        .text("Pregunta:");

    var labelNombre = $("<label></label>")
        .attr("for", "fname")
        .text("Nombre:");
    var inputNombre = $("<input></input>")
        .attr("type", "text")
        .attr("id", "fname")
        .attr("name", "nombre")
        .attr("placeholder", "Nombre de " + nombre_tipo + "...")
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

    var labelImagen = $("<label></label>")
        .attr("for", "lname")
        .text("Imagen:");
    var inputImagen = $("<input></input>")
        .attr("type", "file")
        .attr("id", "fname")
        .attr("name", "url")
        .attr("placeholder", "Imagen de " + nombre_tipo + "...")
        .prop('required', true);

    var submit = $("<input></input>")
        .attr("type", "submit")
        .attr("value", "Guardar");
    var btnCancel = $("<button></button>")
        .attr("id", "btnCancel")
        .attr("class", "btn btn-default btn-block")
        .text("Cancelar");

    llenarComboCategoria();
    llenarComboPregunta();

    form.append(labelCategoria);
    form.append(selectOpction);
    form.append(labelPregunta);
    form.append(selectQuestion);
    form.append(labelNombre);
    form.append(inputNombre);
    form.append(labelValor);
    form.append(inputValor);
    form.append(labelImagen);
    form.append(inputImagen);

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

function llenarComboCategoria(datosCategoria) {
    seleccion = $("<select></select>")
        .attr("class", "selectpicker")
        .attr("data-style", "btn-info")
        .attr("name", "categoriaid");

    $.each(datosCategoria, function (key, categoria) {
        selectOpction = seleccion.append($('<option value=' + categoria.id + '>' + categoria.nombre + '</option>'));
    });
}


function llenarComboPregunta(datosPregunta) {
    seleccion = $("<select></select>")
        .attr("class", "selectpicker")
        .attr("data-style", "btn-info")
        .attr("name", "preguntaid");

    $.each(datosPregunta, function (key, pregunta) {
        selectQuestion = seleccion.append($('<option value=' + pregunta.id + '>' + pregunta.descripcion + '</option>'));
    });
}