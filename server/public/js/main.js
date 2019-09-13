
var frutasRepasadas = [];
var usuario = [];
var costa = [];
var sierra = [];
var preguntas = [];
var niveles = [];
var idCategoriaCosta = 1;
var idCategoriaSierra = 2;
var puntaje = 0;
var habilitarBotonSiguiente = false;
const PREGUNTA_UNO = 1;
var n_preguntas_n1 = 3;
var n_preguntas_n2 = 3;
var jsonVar, jsonText;
var totalfruta = 0;
var contarFrutasSeleccionadas = 0;
var valorFruta = 0;
var valorNivel = 2;
var nivelActual = 1;

$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: "/api/sesion",
        async: false,
        beforeSend: function (xhr) {
            if (xhr && xhr.overrideMimeType) {
                xhr.overrideMimeType('application/json;charset=utf-8');
            }
        },
        dataType: 'json',
        success: function (data) {
            usuario = data;
            console.log(usuario["id"]);
        }
    });
    //Se obtiene los id de categoria
    $.ajax({
        type: 'GET',
        url: "/api/categoria/" + "Costa",
        async: false,
        beforeSend: function (xhr) {
            if (xhr && xhr.overrideMimeType) {
                xhr.overrideMimeType('application/json;charset=utf-8');
            }
        },
        dataType: 'json',
        success: function (idCosta) {
            idCategoriaCosta = idCosta.id;
            obtenerFrutasCosta();
        }
    });
    $.ajax({
        type: 'GET',
        url: "/api/categoria/" + "Sierra",
        async: false,
        beforeSend: function (xhr) {
            if (xhr && xhr.overrideMimeType) {
                xhr.overrideMimeType('application/json;charset=utf-8');
            }
        },
        dataType: 'json',
        success: function (idSierra) {
            idCategoriaSierra = idSierra.id;
            obtenerFrutasSierra();
        }
    });
    $.ajax({
        type: 'GET',
        url: "/api/pregunta/",
        async: false,
        beforeSend: function (xhr) {
            if (xhr && xhr.overrideMimeType) {
                xhr.overrideMimeType('application/json;charset=utf-8');
            }
        },
        dataType: 'json',
        success: function (data) {
            preguntas = data;
        }
    });
    $.ajax({
        type: 'GET',
        url: "/api/nivel/",
        async: false,
        beforeSend: function (xhr) {
            if (xhr && xhr.overrideMimeType) {
                xhr.overrideMimeType('application/json;charset=utf-8');
            }
        },
        dataType: 'json',
        success: function (data) {
            niveles = data;
        }
    });
    // Obtener las frutas por categoria
    function obtenerFrutasCosta(){
        //Obtener json que genera el servidor
        $.ajax({
            type: 'GET',
            url: "/api/fruta/" + idCategoriaCosta,
            async: false,
            beforeSend: function (xhr) {
                if (xhr && xhr.overrideMimeType) {
                    xhr.overrideMimeType('application/json;charset=utf-8');
                }
            },
            dataType: 'json',
            success: function (data) {
                costa = data;
                construirFrutaCosta();
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
            success: function (data) {
                sierra = data;
                construirFrutaSierra();
            }
        });
    }
    // Ajax para obtener el total de las frutas

    $.ajax({
        type: 'GET',
        async: false,
        url: "/api/totalfruta",
        beforeSend: function (xhr) {
            if (xhr && xhr.overrideMimeType) {
                xhr.overrideMimeType('application/json;charset=utf-8');
            }
        },
        dataType: 'json',
        success: function (objTotalFruta) {
            var indexObjTotalFruta = 0;
            totalfruta = objTotalFruta[indexObjTotalFruta]["countOfFruits"];
        }
    });


    $("#btnIniciar").click(function () {
        aparecerPopupInstruc();
        $("#tituloIntro").fadeOut();
        $("#seccionIntro").fadeOut();
        $("#seccionAprendizaje").fadeIn();
    });


    var au = $('<audio src="audio/intro.mp3" autoplay type="audio/mpeg" loop="true"></audio>');
    $("body").append(au);

    $("#colorP1").css({ "color": "green" });
    $("#colorP2").css({ "color": "#eb984e" });
    $("#colorP3").css({ "color": "orange" });

    //Animación de imagen
    $("#animarImgSandia").click(function () {
        $(this).toggleClass("image-fade");
    });

    $("#animarImgDurazno").click(function () {
        $(this).toggleClass("image-fade");
    });

    $("#animarImgMandarina").click(function () {
        $(this).toggleClass("image-fade");
    });

    setearFrutasRepasadas();
    var indexArregloFrutasRepasadas = 0;

    $(".frutas").click(function () {
        var indexArregloFrutasRepasadas = 0;
        for (var key in costa["frutas"]) {
            var nombreFruta = costa["frutas"][key]["nombre"];
            if ($(this).attr("id") == nombreFruta) {
                console.log("fruta encontrada");
                $(this).hide();
                aprenderOptimizado(nombreFruta);
                frutasRepasadas[indexArregloFrutasRepasadas] = true;
                contarFrutasSeleccionadas++;
                break;
            }
            indexArregloFrutasRepasadas++;
        }

        indexArregloFrutasRepasadas = 0;
        for (var key in sierra["frutas"]) {
            var nombreFruta = sierra["frutas"][key]["nombre"];
            if ($(this).attr("id") == nombreFruta) {
                console.log("fruta encontrada");
                $(this).hide();
                aprenderOptimizado(nombreFruta);
                frutasRepasadas[indexArregloFrutasRepasadas] = true;
                contarFrutasSeleccionadas++;
                break;
            }
            indexArregloFrutasRepasadas++;
        }

        if (contarFrutasSeleccionadas == totalfruta) {
            $("#containerFrutasCosta").fadeOut();
            $("#containerFrutasSierra").fadeOut();
            $("#canasta").show();
            $("#btnEvaluar").show();
        }

    });

    $("#btnEvaluar").click(function () {
        $("#seccionAprendizaje").fadeOut();
    });
   

    function aprenderOptimizado(tipoFruta) {

        var au = $('<audio src="audio/' + tipoFruta + '.mp3" autoplay type="audio/mpeg"></audio>');
        $("body").append(au);

        $("#colgante").attr("src", "images/FRUTAS/" + tipoFruta + "Info.png");
        $("#colgante").css({ "display": "block" });

        setTimeout(function () {
            $("#colgante").css({ "display": "none" });
        }, 10000);
    }

    $("#content div").hide(); // Initially hide all content
    $("#tabs li:first").attr("id", "current"); // Activate first tab
    $("#content div:first").fadeIn(); // Show first tab content
    $('#tabs li a').click(function (e) {
        e.preventDefault();
        if ($(this).attr("id") == "current") { //detection for current tab
            return
        }
        else {
            $("#content div").hide(); //Hide all content
            $("#tabs li").attr("id", ""); //Reset id's
            $(this).parent().attr("id", "current"); // Activate this
            $($(this).attr('href')).fadeIn(); // Show content for current tab
        }
    });
    construirJuego();
});

function construirNivel(nivel, n){
    /*section Evaluación Start*/
    //center y section por cada nivel
    var imgNivel = "";
    var numNivel = "";
    var frutasNivel = [];
    if(nivel["descripcion"] == "Nivel 1"){
        frutasNivel = costa["frutas"];
        numNivel = "";
        imgNivel = "n1.png";
        n_preguntas_n1 = frutasNivel.length;
    }
    if(nivel["descripcion"] == "Nivel 2"){
        frutasNivel = sierra["frutas"];
        numNivel = "2";
        imgNivel = "n2.png";
        n_preguntas_n2 = frutasNivel.length;
    }
    var center = $("<center></center>");
    var section = $("<section></section>")
        .attr("id", "seccionEvaluacion" + numNivel);
    var divContainer = $("<div></div>")
        .attr("class", "container");    
    var divRow = $("<div></div>")
        .attr("class", "row");
    var divCol4_1 = $("<div></div>")
        .attr("class", "col-lg-4");
    var divCol4_2 = $("<div></div>")
        .attr("class", "col-lg-4");
    var divCol4_3 = $("<div></div>")
        .attr("class", "col-lg-4");
    var imgFluid = $("<img></img>")
        .attr("class", "img-fluid")
        .attr("src", "../images/OBJETOS/" + imgNivel)
        .attr("id", "tituloNivel1");
    var imgFluidCol = $("<img></img>")
        .attr("class", "img-fluid col-sm-12")
        .attr("src", "../images/ROTULOS/rotEvaluación.png")
        .attr("id", "rotEva");
    var imgFluid2 = $("<img></img>")
        .attr("class", "img-fluid")
        .attr("src", "../images/ROTULOS/rotPuntaje.png")
        .attr("id", "rotPuntaje");
    var h1Puntaje = $("<h1></h1>")
        .attr("class", "img-fluid")
        .attr("id", "puntaje"+n)
        .text("0");
    center.append(section);
    section.append(divContainer);
    divContainer.append(divRow);
    divRow.append(divCol4_1);
    divRow.append(divCol4_2);
    divRow.append(divCol4_3);
    divCol4_1.append(imgFluid);
    divCol4_2.append(imgFluidCol);
    divCol4_3.append(imgFluid2);
    divCol4_3.append(h1Puntaje);

    /*Inicio de cada pregunta*/
    for (var key in frutasNivel) {
        var fruta = frutasNivel[key];
        var pregunta = getDescripcionPregunta(fruta["preguntaid"]);
        var claseOculta = "";
        if (key == 0)
            claseOculta = "";
        else
            claseOculta = "seccionPregOculta";
        var sectionPreg1 = $("<section></section>")
            .attr("id", "seccionPreg" + n + (parseInt(key,10)+1))
            .attr("class", claseOculta);

        //Seccion imagen fruta
        var divContainerFruta = $("<div></div>")
            .attr("class", "container");    
        var divRowFruta = $("<div></div>")
            .attr("class", "row");
        var divCol4_4 = $("<div></div>")
            .attr("class", "col-lg-4");
        var divCol4_5 = $("<div></div>")
            .attr("class", "col-lg-4");
        var divCol4_6 = $("<div></div>")
            .attr("class", "col-lg-4");
        var aFruta = $("<a></a>")
            .attr("href", "#");
        var imgFruta = $("<img></img>")
            .attr("id", "animarImgSandia")
            .attr("src", fruta["url"])
            .attr("class", "img-fluid");    
        section.append(sectionPreg1);
        sectionPreg1.append(divContainerFruta);
        divContainerFruta.append(divRowFruta);
        divRowFruta.append(divCol4_4);
        divRowFruta.append(divCol4_5);
        divCol4_5.append(aFruta);
        aFruta.append(imgFruta);
        divRowFruta.append(divCol4_6);
        //Seccion pregunta fruta
        var divContainerPreg1 = $("<div></div>")
            .attr("class", "container");    
        var divRowPreg1 = $("<div></div>")
            .attr("class", "row");
        var divCol12 = $("<div></div>")
            .attr("class", "col-lg-12");
        var h2 = $("<h2></h2>")
            .attr("id", "colorP1")
            .attr("class", "espacioPreg")
            .text(pregunta["descripcion"]);    
        var div1 = $("<div></div>");
        var divContainerPreg2 = $("<div></div>")
            .attr("class", "container");    
        var divRowPreg2 = $("<div></div>")
            .attr("class", "row");
        var divCol3_1 = $("<div></div>")
            .attr("class", "col-lg-3");
        var divCol3_4 = $("<div></div>")
            .attr("class", "col-lg-3");        
        sectionPreg1.append(divContainerPreg1);
        divContainerPreg1.append(divRowPreg1);
        divRowPreg1.append(divCol12);
        divCol12.append(h2);
        divCol12.append(div1);
        divCol12.append(divContainerPreg2);
        divContainerPreg2.append(divRowPreg2);
        divRowPreg2.append(divCol3_1);
        var numErr=1;
        for (var p in pregunta["opcionRespuesta"]){
            //Se generan las opciones para el NIvel 1
            var claseBtn = "";
            if(nivel["descripcion"] == "Nivel 1"){
                claseBtn="col-lg-3";
            }
            //Se generan las opciones para el NIvel 2
            if(nivel["descripcion"] == "Nivel 2"){
                claseBtn="col-lg-2";
                $("#seccionEvaluacion2").fadeOut();
            }
            if (fruta["preguntaid"] == pregunta["opcionRespuesta"][p]["idPregunta"]){
                var idBtn;
                if (pregunta["opcionRespuesta"][p]["respuestaValida"])
                    idBtn = "btnRespuestaOk_Pregunta"+n+(parseInt(key,10)+1);
                else{
                    idBtn = "btnRespuestaErr"+numErr+"_Pregunta"+n+(parseInt(key,10)+1);
                    numErr++;
                }

                divRowPreg2.append('<div class="' + claseBtn + '">' +
                    '<button type="button" class="btn btn-secondary btn-lg" id=' 
                    + '"' + idBtn + '" data-value=' + fruta["valor"] + '>'
                    + pregunta["opcionRespuesta"][p]["descripcion"] + '</button>' + 
                    '</div>');
            }
        }
        divRowPreg2.append(divCol3_4);
    }
    /*Fin de cada pregunta*/

    /*Boton siguiente*/  
    var divContainerSgt = $("<div></div>")
        .attr("class", "container");      
    var divRowSgt = $("<div></div>")
        .attr("class", "row");
    var divCol12Sgt = $("<div></div>")
        .attr("class", "col-lg-12");
    var aSgt = $("<a></a>")
        .attr("href", "#")       
        .attr("id", "btnSiguientePregunta");
    var imgSgt = $("<img></img>")
        .attr("src", "../images/BOTONES/SIGUIENTE.png")
        .attr("class", "img-fluid center-block");
    //section.append(divContainerSgt);    
    divContainerSgt.append(divRowSgt);
    divRowSgt.append(divCol12Sgt);
    divCol12Sgt.append(aSgt);
   
    aSgt.append(imgSgt);
    $('#juego').append(center);
    //$('#juego').append(divContainerSgt);
}

function construirJuego(){
    for (var n in niveles) {
        construirNivel(niveles[n], parseInt(n,10)+1);
    }
    /*Boton siguiente*/
    var divContainerSgt = $("<div></div>")
        .attr("class", "container");    
    var divRowSgt = $("<div></div>")
        .attr("class", "row");
    var divCol12Sgt = $("<div></div>")
        .attr("class", "col-lg-12");
    var aSgt = $("<a></a>")
        .attr("href", "#")
        .attr("id", "btnSiguientePregunta");
    var imgSgt = $("<img></img>")
        .attr("src", "../images/BOTONES/SIGUIENTE.png")
        .attr("class", "img-fluid center-block");
    //section.append(divContainerSgt);
    divContainerSgt.append(divRowSgt);
    divRowSgt.append(divCol12Sgt);
    divCol12Sgt.append(aSgt);
    aSgt.append(imgSgt);
    $('#juego').append(divContainerSgt);
    EvaluarPregunta();
    eventoClicSgt();
}

function getDescripcionPregunta(preguntaid){
    for (var c in preguntas) {
        if(preguntas[c]["id"] == preguntaid){
            //console.log(preguntas[c])
            return preguntas[c];
        }
    }
    return "Pregunta no existe";
}

function evaluacionPreguntasCosta() {
    for (var c in costa["frutas"]) {
        var url = costa["frutas"][c]["url"];
        var div = $("<div></div>");
        var img = $("<img></img>")
            .attr("src", url)
            .attr("class", "img-responsive");
        div.append(img);
        $('#animarImgSandia').append(div);
    }

}



function setearFrutasRepasadas() {
    var indiceFrutaRepasada = 0;
    for (var c in costa["frutas"]) {
        frutasRepasadas[indiceFrutaRepasada] = false;
        indiceFrutaRepasada++;
    }
    for (var c in sierra["frutas"]) {
        frutasRepasadas[indiceFrutaRepasada] = false;
        indiceFrutaRepasada++;
    }
}

function construirFrutaCosta() {
    for (var c in costa["frutas"]) {
        var url = costa["frutas"][c]["url"];
        var nombreFruta = costa["frutas"][c]["nombre"];
        var div = $("<div></div>");
        var img = $("<img></img>")
            .attr("src", url)
            .attr("id", nombreFruta)
            .attr("class", "img-responsive frutas");
        var a = $("<a></a>")
            .attr("href", "#");
        a.append(img);
        div.append(a);
        $('#containerFrutasCosta').append(div);
    }
}

function construirFrutaSierra() {
    for (var c in sierra["frutas"]) {
        var url = sierra["frutas"][c]["url"];
        var nombreFruta = sierra["frutas"][c]["nombre"];
        var div = $("<div></div>");
        var img = $("<img></img>")
            .attr("src", url)
            .attr("id", nombreFruta)
            .attr("class", "img-responsive frutas");
        var a = $("<a></a>")
            .attr("href", "#");
        a.append(img);
        div.append(a);
        $('#containerFrutasSierra').append(div);
    }
}


//SECCIÓN DE EVALUACIÓN

//EvaluarPregunta();

function EvaluarPregunta() {
    var numPreguntas = 0;
    if (nivelActual == 1){
        numPreguntas = n_preguntas_n1;
    }
    if (nivelActual == 2){
        numPreguntas = n_preguntas_n2;
    }
    for (var preguntaNumero = PREGUNTA_UNO; preguntaNumero <= numPreguntas; preguntaNumero++) {
        for (var n in niveles) {
            $("#seccionPreg" + (parseInt(n,10)+1) + preguntaNumero).each(function (index) {
                var frutaOk = $("#btnRespuestaOk_Pregunta" + (parseInt(n,10)+1)  + preguntaNumero);
                var frutaErr1 = $("#btnRespuestaErr1_Pregunta" + (parseInt(n,10)+1)  + preguntaNumero);
                var frutaErr2 = $("#btnRespuestaErr2_Pregunta" + (parseInt(n,10)+1)  + preguntaNumero);
                VerificarRespuestaCorrecta(frutaOk, preguntaNumero,  parseInt(n,10)+1);
                VerificarPrimeraRespuestaErronea(frutaErr1, preguntaNumero,  parseInt(n,10)+1);
                VerificarSegundaRespuestaErronea(frutaErr2, preguntaNumero,  parseInt(n,10)+1);
            });
        }
    }
}

function VerificarRespuestaCorrecta(frutaOk, preguntaNumero, n) {

    if (frutaOk == $("#btnRespuestaOk_Pregunta" + n + preguntaNumero).on({
        click: function () {
            $(this).addClass("btn-success");
            valorFruta = $(this).data("value");
            setTimeout(function () {
                var au = $('<audio src="../audio/ganador.mp3" autoplay type="audio/mpeg"></audio>');
                $("body").append(au);
            }, 400);

            $("#btnRespuestaErr1_Pregunta" + n + preguntaNumero).prop("disabled", true);
            $("#btnRespuestaErr2_Pregunta" + n + preguntaNumero).prop("disabled", true);
            $("#btnRespuestaOk_Pregunta" + n + preguntaNumero).prop("disabled", true);
            puntaje += 5;
            //puntaje += valorFruta * valorNivel;
            $("#puntaje"+n).html("" + puntaje);
            habilitarBotonSiguiente = true;
        }

    })
    ) {
    };
}

function VerificarPrimeraRespuestaErronea(frutaErr1, preguntaNumero, n) {

    if (frutaErr1 == $("#btnRespuestaErr1_Pregunta" + n + preguntaNumero).on({
        click: function () {
            $(this).addClass("btn-danger");
            valorFruta = $(this).data("value");
            if (puntaje >= 2) {
                //puntaje -= valorFruta * valorNivel * 0,5;
                puntaje -= 2;
            } else {
                puntaje = 0;
            }
            setTimeout(function () {
                $("#btnRespuestaErr1_Pregunta" + n + preguntaNumero).prop("disabled", true);
                $("#puntaje"+n).html("" + puntaje);
                habilitarBotonSiguiente = false;
                var au = $('<audio src="../audio/oh_no.mp3" autoplay type="audio/mpeg"></audio>');
                $("body").append(au);
            }, 400);
        }
    })
    ) {
    };
}


function VerificarSegundaRespuestaErronea(frutaErr2, preguntaNumero, n) {

    if (frutaErr2 == $("#btnRespuestaErr2_Pregunta" + n + preguntaNumero).on({
        click: function () {
            $(this).addClass("btn-danger");
            valorFruta = $(this).data("value");
            if (puntaje >= 2) {
                //puntaje = puntaje - valorFruta * valorNivel / 2;
                puntaje -= 2;
            } else {
                puntaje = 0;
            }

            setTimeout(function () {
                $("#btnRespuestaErr2_Pregunta" + n + preguntaNumero).prop("disabled", true);
                $("#puntaje"+n).html("" + puntaje);
                habilitarBotonSiguiente = false;
                var au = $('<audio src="../audio/oh_no.mp3" autoplay type="audio/mpeg"></audio>');
                $("body").append(au);
            }, 400);
        }
    })
    ) {
    };
}


var contadorDePregunta = 1;
function eventoClicSgt(){
    $("#btnSiguientePregunta").on({
        click: function () {
            if (habilitarBotonSiguiente) {
                habilitarBotonSiguiente = false;
                var numPreguntas = 0;
                if (nivelActual == 1){
                    numPreguntas = n_preguntas_n1;
                    ocultarOMostrarSeccionPreguntaN1(numPreguntas);
                }else
                if (nivelActual == 2){
                    numPreguntas = n_preguntas_n2;
                    ocultarOMostrarSeccionPreguntaN2(numPreguntas);
                }
            }
        }
    });    
}
function ocultarOMostrarSeccionPreguntaN1(numPreguntas) {
    var numeroDePreguntaSiguiente = contadorDePregunta + 1;
    if (contadorDePregunta == numPreguntas) {
        valorNivel = 5;
        nivelActual++;
        contadorDePregunta = 1;
        $("#seccionPreg" + nivelActual + contadorDePregunta).show();
        $("#seccionEvaluacion").fadeOut();        
        // EvaluarPregunta();
        seccionEvaluacion2();
    }
    else {
        $("#seccionPreg" + nivelActual + contadorDePregunta).hide();
        $("#seccionPreg" + nivelActual + numeroDePreguntaSiguiente).show();
        contadorDePregunta++;
    }
}
function ocultarOMostrarSeccionPreguntaN2(numPreguntas) {
    var numeroDePreguntaSiguiente = contadorDePregunta + 1;
    if (contadorDePregunta == numPreguntas) {
        nivelActual++;
        $("#seccionPreg" + nivelActual + contadorDePregunta).show();
        $("#seccionEvaluacion2").fadeOut();
        contadorDePregunta = 1;
        aparecerPopupWinner();
    }
    else {
        $("#seccionPreg" + nivelActual + contadorDePregunta).hide();
        $("#seccionPreg" + nivelActual + numeroDePreguntaSiguiente).show();
        contadorDePregunta++;
    }
}

function seccionEvaluacion2() {
    $("#seccionEvaluacion2").show();
    $('#puntaje'+nivelActual).html("" + puntaje);
    for (i = 0; i < sierra["frutas"].length; i++) {
        var enlaceFrutasSNivel2 = $('<a href="#"><img  src="images/FRUTAS/' + sierra["frutas"][i].nombre + '" id="' + sierra["frutas"][i].id + '" class="img-responsive frutas"></a>');
        $("#containerFrutasSierraN2").append(enlaceFrutasSNivel2);
    }
}

function aparecerPopupInstruc() {
    var au = $('<audio src="audio/instrucciones.mp3" autoplay type="audio/mpeg"></audio>');
    $("body").append(au);
    var mpopup = $('#instrucmpopupBox');//Aqui lee el id del pop up que esta en el html. Si se desea crear mas pop up. Copien y peguen toda esta funcion y solo cambian el nombre de la funcion. Y reemplazan este ID aqui en el js(#mpopupBox) y en html(Deben copiar y pegar el codigo html y pegarlo en donde se quiera), cambiando el id.
    mpopup.show();//Muestra el pop up
    $(".close").on('click', function () {//Al dar click en un elemento con clase close(.close), se escondera el pop up
        mpopup.hide(); //Se esconde el pop up
        var au = $('<audio src="audio/aprendizaje.mp3" autoplay type="audio/mpeg"></audio>');
        $("body").append(au);

    });

    $(window).on('click', function (e) {//Al dar click fuera de la pantalla, se escondera el pop up
        if (e.target == mpopup[0]) {//Aqui se valida que se este dando click fuera del pop up para cerrar el pop up
            mpopup.hide();//Se esconde el pop up
            var au = $('<audio src="audio/aprendizaje.mp3" autoplay type="audio/mpeg"></audio>');
            $("body").append(au);
        }
    });
}

function aparecerPopupWinner() {
    PostUser();
    var au = $('<audio src="../audio/felicidades.mp3" autoplay type="audio/mpeg"></audio>');
    $("body").append(au);
    $('#conPuntaje').html("HAS RECOPILADO " + puntaje + " PUNTOS");
    var mpopup = $('#popwinner');//Aqui lee el id del pop up que esta en el html. Si se desea crear mas pop up. Copien y peguen toda esta funcion y solo cambian el nombre de la funcion. Y reemplazan este ID aqui en el js(#mpopupBox) y en html(Deben copiar y pegar el codigo html y pegarlo en donde se quiera), cambiando el id.
    mpopup.show();//Muestra el pop up
    $(".close").on('click', function () {//Al dar click en un elemento con clase close(.close), se escondera el pop up
        mpopup.hide(); //Se esconde el pop up
        /*  location.reload(); //me retorna al indice */
    });

    $(window).on('click', function (e) {//Al dar click fuera de la pantalla, se escondera el pop up
        if (e.target == mpopup[0]) {//Aqui se valida que se este dando click fuera del pop up para cerrar el pop up
            mpopup.hide();//Se esconde el pop up 
            $("#seccionEvaluacion").fadeOut();
            $("#despedida").fadeIn();
            var au = $('<audio src="../audio/despedida.mp3" autoplay type="audio/mpeg"></audio>');
            $("body").append(au);
        }
    });
}

function PostUser(){
    var data = {
        "puntaje": puntaje
    };
    $.ajax({
        type: 'PUT',
        url: "/api/user/" + usuario["id"],
        data: data,
        async: false,
        beforeSend: function (xhr) {
            if (xhr && xhr.overrideMimeType) {
                xhr.overrideMimeType('application/json;charset=utf-8');
            }
        },
        dataType: 'json',
        success: function (data) {
            console.log(data);
        }
    });
}
