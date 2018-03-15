


var bandera = 0;
var bandera_freeze=1;
var bandera_freeze2=0;

$(document).ready(function(){

    var calibracion_1 =  $('#calib').val();


    var free =$('#free_aux').val();
    var uu = $('#fb_aux').val();
    var mark = $('#marka').val();
    var gi = $("#giff").val();
    var fbb = $('#fb_aux').val();
    

    if(fbb == "0"){
        $('#fb_msg').hide();
    }else{
        $('#fb_msg').show();
    }
    if(gi == "0"){

        $("#gif180").show();
        $("#gif360").hide();
    }else{
        
        $("#gif180").hide();
        $("#gif360").show();
    }

    if(calibracion_1 == "0"){
        $("#checkboxThreeInput").removeAttr("checked");
        $("#si_no").text("NO estan calibradas");
        location.href="http://localhost/gif_360_web/gui/loadingScreen.php";
        //$("#email").attr("checked", "checked");
    }
    if(calibracion_1 == "1"){
        //$("#checkboxThreeInput").removeAttr("checked");
        $("#si_no").text("SI estan calibradas");
        $("#checkboxThreeInput").attr("checked", "checked");
    }
    if(calibracion_1 == "0"){
        
        console.log("cargando");
        //location.href="http://localhost/gif_360_web/gui/limbo.php";
       
        //$("#frm2").load('http://localhost/gif_360_web/gui/limbo.php');
        
    }
    
    
    if(mark == "1"){
        $("#WATERMARKON").attr("src","images/WATERMARKON.png");
        $('#rutas').show();
    }
    if(mark == "0"){
        $("#WATERMARKON").attr("src","images/WATERMARKOFF.png");
        $('#rutas').hide();
    }

    if(free == "1"){
        //activado
        $("#freeze_png").attr("src","images/FREEZE-ON.png");
        $("#delay_png").attr("src","images/DELAY-OFF.png");
        bandera_freeze = 0;
    }else{
        $("#freeze_png").attr("src","images/FREEZE-OFF.png");
        $("#delay_png").attr("src","images/DELAY-OFF.png");
        bandera_freeze2 =0;
        bandera_freeze = 1;
    }

    if(uu == "1"){
        $("#facebook").attr("checked", "checked");
        $("#fb").attr("src","images/FB-ON.png");

        //$("#email2").attr("checked", "checked");

    }
    if(uu == "0"){
        $("#fb").attr("src","images/FB-OFF.png");
        $("#facebook").removeAttr("checked");
        //$("#email2").removeAttr("checked");

    }


    if(bandera == 0){
        $("#barra").prop('disabled', true);
    }else{
        $("#barra").prop('disabled', false);
    }

    //$('#texto_delay').html($("#barra").val());
    $('#barra').change(function() {
        var delay = $("#barra").val();
        if(bandera == 1){
            $('#texto_delay').html($(this).val());
            $('#aux_delay').val(delay);
        }
        if(bandera == 2){
            $('#texto_fps').html($(this).val());
            $('#aux_fps').val(delay);
        }
        if(bandera == 3){
            $('#texto_quality').html($(this).val());
            $('#aux_quality').val(delay);
        }

    });

});
$('#checkboxThreeInput').click(function(){
    if (this.checked){
        $('#calib').val("1");
        $("#si_no").text("");
    }else{
        $('#calib').val("0");
        $("#si_no").text("");
    }
  });

function regresar(){
    window.location.href = "http://localhost/gif_360_web/gui/";
}

function trigger(){
    $('#trigger').trigger('click');
}

function aplicar(){
    
    $('#enviar').trigger('click');

    /*alert("este es el valor -- > "+ calibracion_1);

    if(calibracion_1 == "1"){
        alert("es uno");
        $('#enviar').trigger('click');
    }else{
        alert("es 0");
        location.href="http://localhost/gif_360_web/gui/loadingScreen.php";
    }*/

}
function regresar2(){
    home();
}


function aplicar2(){
    var bandera_1=0;
    var iso = $('#iso').val();
    var shutter = $('#Shutter').val();
    var Aperture = $("#Aperture").val();
    var Format = $("#Format").val();
    //$(".error").remove();
    //alert(shutter +" - "+ iso +" - "+ Aperture +" - "+ Format);
    var dataString = 'data='+"hola como estas";

    if(shutter == "-1"){
        alert("falta shutter");
        $("#enviar").focus().after("<span class='error'>falta Shutter</span>");
        bandera_1 = 1;
    }else{
        $('#shut').val(shutter);
    }
    if(iso == "-1"){
        alert("falta iso");
        $("#iso").focus().after("<span class='error'>falta ISO</span>");
        bandera_1 = 1;
    }else{
        $('#isoo').val(iso);
    }
    if(Aperture == "-1"){
        alert("falta Aperture");
        $("#Aperture").focus().after("<span class='error'>falta Aperture</span>");
        bandera_1 = 1;
    }
    if(Format == "-1"){
        alert("falta image Format");
        $("#Format").focus().after("<span class='error'>falta Image Format</span>");
        bandera_1 = 1;
    }
    if(bandera_1 == 0){
        $('#enviar2').click();
    }

}

function home(){
    //window.location.href = "http://localhost/gif_360_web/gui/";
    mostrartodo();
    $('#conf').hide();
    $('#calibracion_camaras').hide();
    $('#logos').show();
    $('#logos2').hide();
}
function calibrar(){
    ocultatodo();
    $('#calibracion_camaras').show();
    $('#conf').hide();
    $('#logos').show();
    $('#logos2').hide();
}
function configuracio(){
    ocultatodo();
    $('#calibracion_camaras').hide();
    $('#conf').show();
    $('#logos').hide();
    $('#logos2').show();
    //window.location.href = "http://localhost/gif_360_web/gui/conf.php";
}
function ocultatodo(){

    $('#freez').hide();
    $('#conf1').hide();
    $('#rangos_1').hide();
    $('#correo_1').hide();
    $('#video_1').hide();

}

function mostrartodo(){

    $('#freez').show();
    $('#conf1').show();
    $('#rangos_1').show();
    $('#correo_1').show();
    $('#video_1').show();

}
function freeze(){
    //alert("freezee");
    if(bandera_freeze == 0){
        $("#freeze_png").attr("src","images/FREEZE-OFF.png");
        $("#delay_png").attr("src","images/DELAY-OFF.png");
        $('#free_aux').val("0");
        bandera_freeze2 = 0;
        bandera_freeze = 1;
    }else{

        $("#freeze_png").attr("src","images/FREEZE-ON.png");
        $("#delay_png").attr("src","images/DELAY-OFF.png");
        $('#free_aux').val("1");
        $("#texto_delay").text("null");
        if(bandera == 1){
            $("#barra").prop('disabled', true);
            $("#barra").val(0);

        }


        bandera_freeze2 =1;
        bandera_freeze = 0;
    }

}

function delay(){
    if(bandera_freeze2 == 0){
        $("#texto_delay").text($('#aux_delay').val());
        $("#barra").val($('#aux_delay').val());
        $("#delay_png").attr("src","images/DELAY-ON.png");
        $("#fps_png").attr("src","images/FPS-OFF.png");
        $("#QUALITYON_png").attr("src","images/QUALITYOFF.png");
        if(bandera == 0){
            $("#barra").prop('disabled', false);
        }
        bandera = 1;
    }

}

function fps(){
    $("#barra").val($('#aux_fps').val());
    $("#delay_png").attr("src","images/DELAY-OFF.png");
    $("#fps_png").attr("src","images/FPS-ON.png");
    $("#QUALITYON_png").attr("src","images/QUALITYOFF.png");
    if(bandera == 0){
        $("#barra").prop('disabled', false);
    }
    $("#barra").prop('disabled', false);
    bandera = 2;
}

function QUALITYON(){
    $("#barra").val($('#aux_quality').val());
    $("#delay_png").attr("src","images/DELAY-OFF.png");
    $("#fps_png").attr("src","images/FPS-OFF.png");
    $("#QUALITYON_png").attr("src","images/QUALITYON.png");
    if(bandera == 0){
        $("#barra").prop('disabled', false);
    }
    $("#barra").prop('disabled', false);
    bandera = 3;
}
function mrkagua(){
    //alert("hola");
    //$('#aux_file').trigger('click');
    //var nombre_img = (document.getElementById("aux_file").files[0].name);
    //alert(nombre_img);

    var mk_agua = $('#marka').val();
    if(mk_agua == "0"){
        $("#WATERMARKON").attr("src","images/WATERMARKON.png");
        $('#marka').val("1");
        $('#rutas').show();
    }
    if(mk_agua == "1"){
        $("#WATERMARKON").attr("src","images/WATERMARKOFF.png");
        $('#marka').val("0");
        $('#rutas').hide();
    }

    //$('#nombreim').val(nombre_img);
}








function FB(){

    var fbb = $('#fb_aux').val();
    
    if(fbb == "1"){
        //alert("esta ck");
        $("#facebook").removeAttr("checked");
        $('#fb_aux').val("0");
        $("#fb").attr("src","images/FB-OFF.png");
        $('#fb_msg').hide();
    }
    if(fbb == "0"){
        //alert("no esta");
        $("#facebook").attr("checked", "checked");
        $('#fb_aux').val("1");
        $("#fb").attr("src","images/FB-ON.png");
        $('#fb_msg').show();
    }



}



function GO(){
    //alert("go");
    var calibracion_1 =  $('#calib').val();
    var p = $('#correo').val();
   /* if(calibracion_1 == "1"){

    }else{
        location.href="http://localhost/gif_360_web/gui/loadingScreen.php";
    }*/
    if(p  == ""){
        //alert("esta vacio");
        $("#email").removeAttr("checked");
        $('#email2').val("0");
    }
    if(p != ""){
        //alert("esta lleno");
        $('#email2').val("1");
        $("#email").attr("checked", "checked");
    }
    $('#enviar').trigger('click');


}
function gif1(){
    $("#gif180").hide();
    $("#gif360").show();
    $("#giff").val("1");
}
function gif2(){
    $("#gif180").show();
    $("#gif360").hide();
    $("#giff").val("0");
}
