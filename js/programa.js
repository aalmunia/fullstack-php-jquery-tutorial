var b_GLOBAL_Debug = true;
var o_GLOBAL_Gatos = null;

function renderTablaTodosLosGatos(oDatosGatos) {
    var sHTMLAdd = "<table width='100%' border='1' class='tblGatos'>";
    sHTMLAdd += "<thead><td></td><td>NOMBRE</td><td>RAZA</td><td>COLOR</td><td>EDAD</td><td></td></thead>";
    for (var i = 0; i < oDatosGatos.length; i++) {
        sHTMLAdd += "<tr>";
        sHTMLAdd += "<td><input class='chkUUIDGato' type='checkbox' id='gato_" + oDatosGatos[i][0] + "' /></td>";
        // Comenzamos por el elemento 1 para obviar la columna UUID
        for (var j = 1; j < oDatosGatos[i].length; j++) {
            sHTMLAdd += "<td>" + oDatosGatos[i][j] + "</td>";
        }
        sHTMLAdd += "<td><button class='btn-primary'  onclick='cargarDatosEdit(" + i + ")'>Editar</button></td>";
        sHTMLAdd += "</tr>";
    }
    sHTMLAdd += "</table><br />";
    return sHTMLAdd;
}

function handleAjaxError(oXMLHTTPReq, sStatusText, sErrorThrown) {
    console.log('Entrando en error');
    console.log(oXMLHTTPReq);
    if(sStatusText == 'timeout') {
        toastr.info('La request AJAX no ha respondido a tiempo (timeout de 5 segundos)');
    } else {
        toastr.error(sErrorThrown);
    }
}

function handleAjaxComplete(oXMLHTTPReq, sTextStatus) {
    console.log('Entrando en complete... ');
    console.log('Objeto XMLHTTPRequest');
    console.log(oXMLHTTPReq);
    console.log('TextStatus: ' + sTextStatus);
    if(b_GLOBAL_Debug) {
        toastr.info('Petición AJAX totalmente finalizada');        
    }        
}


/**
 * Esta función carga todos los datos y los renderiza llamando a renderTablasTodosLosGatos().
 * success es el callback a ejecutar (callback es una función) cuando se recibe un código
 * HTTP 200 - OK, y error es el callback a ejecutar  cuando se recibe un código HTTP 4XX o 5XX 
 * (generalmente, varía por navegador)
 */
function cargarTodosLosGatos() {
    $.ajax({       
        url: 'php/read_gato.php',
        method: 'GET',
        dataType: 'json',
        timeout: 5000,
        success: function (oDatosGatos) {
            if(b_GLOBAL_Debug) {                
                toastr.success("Datos de gatos cargados");                
            }
            o_GLOBAL_Gatos = oDatosGatos;
            var sHTMLAdd = renderTablaTodosLosGatos(oDatosGatos);            
            $("#contenidoTodosLosGatos").html(sHTMLAdd);            
        },
        error: handleAjaxError,        
        complete: handleAjaxComplete
    });
}

function insertarNuevoGato() {

    var oDatosGato = {
        nombre: $("#nombreNuevoGato").val(),
        raza: $("#razaNuevoGato").val(),
        color: $("#colorNuevoGato").val(),
        edad: $("#edadNuevoGato").val()
    };

    console.log('Datos de nuevo gato a enviar: ');
    console.log(oDatosGato);

    $.ajax({
        url: 'php/create_gato.php',
        method: 'POST',
        data: oDatosGato,
        dataType: 'json',
        success: function (oRespuestaInsercion) {
            console.log(oRespuestaInsercion);
            if (oRespuestaInsercion.error == false && oRespuestaInsercion.code == "OK") {
                toastr.success("Inserción de nuevo gato correctamente realizada. Recargando tabla de gatos... ");
                document.getElementById('frmNuevoGato').reset();
                cargarTodosLosGatos();
            }
        },
        error: handleAjaxError,
        complete: handleAjaxComplete
    });
}

function editarGato() {
    var oDatosEdit = {
        uuid: $("#uuidEditGato").val(),
        nombre: $("#nombreEditGato").val(),
        raza: $("#razaEditGato").val(),
        color: $("#colorEditGato").val(),
        edad: $("#edadEditGato").val()
    };
    $.ajax({
        url: 'php/edit_gato.php',
        method: 'POST',
        data: oDatosEdit,
        dataType: 'json',
        success: function(oRespuestaEdit) {
            if (oRespuestaEdit.error == false && oRespuestaEdit.code == "OK") {
                toastr.success("Edición de gato correctamente realizada. Recargando tabla de gatos... ");
                document.getElementById('frmEditGato').reset();
                cargarTodosLosGatos();
                $("#containerEdit").hide();
            }
        },
        error: handleAjaxError,
        complete: handleAjaxComplete
    });
}

function cargarDatosEdit(iGato) {
    $("#uuidEditGato").val(o_GLOBAL_Gatos[iGato][0]);
    $("#nombreEditGato").val(o_GLOBAL_Gatos[iGato][1]);
    $("#razaEditGato").val(o_GLOBAL_Gatos[iGato][2]);
    $("#colorEditGato").val(o_GLOBAL_Gatos[iGato][3]);
    $("#edadEditGato").val(o_GLOBAL_Gatos[iGato][4]);    
    $("#containerEdit").show();
}

function deleteGatos() {
    var aSelected = $(".chkUUIDGato:checked");
    var oDataSend = {
        uuids_delete: []        
    };
    for(i = 0; i < aSelected.length; i++) {
        var uuidReal = aSelected[i].id.replace('gato_', '');
        oDataSend.uuids_delete.push(uuidReal);
    }
    
    console.log(oDataSend);
    
    $.ajax({
        url: 'php/delete_gato.php',
        method: 'POST',
        data: oDataSend,        
        dataType: 'json',
        success: function(oRespuestaDelete) {
            if (oRespuestaDelete.error == false && oRespuestaDelete.code == "OK") {
                toastr.success("Registros correctamente eliminados. Recargando tabla de gatos... ");
                document.getElementById('frmEditGato').reset();
                cargarTodosLosGatos();                
            }
        },
        error: handleAjaxError,
        complete: handleAjaxComplete
    });
}