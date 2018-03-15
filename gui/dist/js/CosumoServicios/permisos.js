var usuarios = [];
var bandera = 0; 
var userId = 0;
var token;

$('document').ready(function() { 
    token = sessionStorage.getItem('TOKEN_ID');
    $('#name').html(sessionStorage.getItem('PROFILE_NAME'));
    //$('#sucursales1').DataTable();
    $('#contRFc').hide();
    $("#seleccionRFc").hide();
    var R = sessionStorage.getItem('rfc');
    var M = sessionStorage.getItem('merchant');
    
    if (R == -1 &&  M == -1) {
        $("#seleccionRFc").show('slow');
    }
    
    $('#noAc').hide();
    $('#contAfi').hide();

    $('#activeUser').hide();
    $('#formularioEditar').hide();
    $('#eliminarUsers').hide();
    $('#formulario').hide();
    $('#dyna').hide();
	$('.botonF1').hide();
	$('.botonF2').hide();
    $('#editarUser').hide();

    $('#mensaje').hide();
    $('.botonF1').hover(function(){
        $('.btn2').addClass('animacionVer');
	});
    
    $('.botonF2').hover(function(){
        $('.btn2').addClass('animacionVer');
	});
    
    $('.botones').hover(function(){
        $('.btn2').addClass('animacionVer');
    });
    
	$('.contenedor').mouseleave(function(){
        $('.btn2').removeClass('animacionVer');
	});
    
    $("#busquedaRFC").on("keyup", elimanarfilas);
    $("#busquedaRFCini").on("keyup", getRFCs);
    $("#cabeza").html('Seleccionar RFC');
    //confusion();
    //getUsersAll()
	//getUsersnoActivos();

});



/*function verificar(){
 
  if(sessionStorage.getItem('PROFILE_NAME')){
   //alert('sesion iniciada');
   //alert(sessionStorage.getItem("tipouser"));
   if (sessionStorage.getItem("tipouser")==1) {
      //alert('alerta');
   }else{
    alert('no eres usuario Administrador');
    window.location.href = 'index.html';
     cerrarsesion();
   }
  }else{
     window.location.href = 'index.html';
     cerrarsesion();
    //alert('inicia sesion');
  }
}*/
function viewAdinUser(){
    /*$('#Nivel1TA').hide();
  $('#Nivel2TA').hide();
  $('#Nivel2VA').hide();
  $('#proyeccion').hide();
    $('#contAfi').hide();*/
  $('#princi').show();
  $('#dyna').show();
  /*$('#noAc').hide();
  $('.redacta').hide()
    $('#formulario').hide();
    $('#formularioEditar').hide();
    $('#eliminarUsers').hide();*/
    $('#cabeza').html("Administrar usuarios");
  $('.botonF2').show();
}
function cerrarsesion(){
 //signOut(); 
  sessionStorage.clear();
  window.location.href = 'index.html';
  //alert('cerrarsesion');
  
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}
function nuevo(){
      $('#princi').show();
     $('#dyna').hide();
     $('#noAc').hide();
     $('.botonF2').hide()
     $('.list_user').hide();
      $('#formularioEditar').hide();
    $('#formulario').show('fast');

  
}
function actualiza(){
    $('#princi').show();
     $('#dyna').hide();
     $('#noAc').hide();
     $('.redacta').hide()
    $('#formulario').hide();
    $('#formularioEditar').show('slow');
  
}
function viewdelete(){
    $('#princi').show();
     $('#dyna').hide();
     $('#noAc').hide();
     $('.redacta').hide()
    $('#formulario').hide();
    $('#formularioEditar').hide();
    $('#eliminarUsers').show('slow');
  
}
 
function  getUsersnoActivos(){
    ocultarTodasSecciones();
    $('#Nivel1T').show();
    
    $('#Nivel1TA').hide();
    $('#Nivel2TA').hide();
    $('#Nivel2VA').hide();
    $('#proyeccion').hide();
    $('#contAfi').hide();
    $('#AdminTickets').hide();
    $('#AdminReportes').hide();
    //$("#contAfi").show("slow");
    
    $('#dyna').hide();
    $('#noAc').show();
    $('.redacta').hide()
    $('#busquedaAfi').attr('disabled', 'disabled');
    $('#seleccionRFc').hide()
    $('#formularioEditar').hide();
    $('#eliminarUsers').hide();
    $('#formulario').hide();
    $('.list_user').show();
    
    $('#Panelconfig').hide();
    $('.botonF2').show();
    
   /*
    elegirOpcion('btnUsuarios');
    $('#princi').show();
    $("#contAfi").show("slow");*/
    $("#btnUsuarios").addClass("mSelected");
    $("#btnTickets").removeClass("mSelected");
    $("#btnTickets").addClass("m");
    $("#btnReportes").removeClass("mSelected");
    $("#btnReportes").addClass("m");
    $("#btnConfigurarJuegos").removeClass("mSelected");
    $("#btnConfigurarJuegos").addClass("m");
    

    var html='';
    var datos = {
        action:'getUsers',
        userType:'noapproved',
        token:token};
    alert('No hay datos por el momento');
    /*$.ajax({
        url: "http://onikom.technology:8080/MiDataNet/user",
        data: JSON.stringify(datos),
        type: 'POST',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
           // console.log(data);
            usuarios = data;
           getId();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
        }
    });*/
}



function getId(){
    var b = [];
    
    for(var i=0;i<usuarios.length;i++){
        var u = { Foto: '<div class=" image"><img src="images/user.png" class="img-avatar" alt="User Image"></div>',
                 Nombre: usuarios[i]['name'], 
                 Email:usuarios[i]['email'], 
                 Estatus: ' <button  value='+i+' class="activar" id=eliminar'+i+'><span id="sta" class="sta glyphicon glyphicon glyphicon-ok"  aria-hidden="true"></span></button>',
                 Edit: ' <button  value='+i+' class="editar" id=eliminar'+i+'><span id="sta" class="sta glyphicon glyphicon glyphicon-pencil"  aria-hidden="true"></span></button>',
                 Delete: ' <button  value='+i+' class="editar" id=eliminar'+i+'><span id="sta" class="sta glyphicon glyphicon glyphicon-remove"  aria-hidden="true"></span></button>'
                };
        
        b[i] = u;
    }
    
    
    $('#unoActivo').dynatable({dataset: {records: b}});
    
    getUserall();
    /*$('.activar').on('click',function(){
         var i = $(this).val();
        userId=usuarios[i]['userId'];
      //alert(userId)
        activar();
      //alert('hok');

    });*/
    
    $('.users').on('click',function(){
        if (bandera == 1) {
            bandera = 0;
            //alert('existe un lemento seleccionado');
        }else{
            bandera = 1;
        }
    });    
}



function activar(){
    //var i = $(this).index();
    //alert(i);
    //alert(userId);
    var datos = {
        action:'activateUser',
        userId:userId,
        active:"1",
        token:token};
    $.ajax({
        url: "http://onikom.technology:8080/MiDataNet/user",
        data: JSON.stringify(datos),
        type: 'POST',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            alert('usuario activado');
            getUsersnoActivos();
            //usuarios=data;
            //otro();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //window.location.href = 'error.html';
            console.log(XMLHttpRequest);
            //aux=0;
        }
    });
}



function buscarRFC(){
    var datos = {
        rfc:$('#busquedaRFC').val(),
        token:token
    };

    $.ajax({
        url: "http://onikom.technology:8080/MiDataNet/rfc",
        data: JSON.stringify(datos),
        type: 'POST',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            //console.log(data['rfc'][0]['rfc']);
            for(d in data['rfc']){ 
                // console.log(data['rfc'][d]['rfc']);
                var tds = $("#tablaRFc tr:first td").length;
                var trs = $("#tablaRFc tr").length;

                for(var i=0;i<tds;i++){
                    nuevaFila = "<tr>";
                    nuevaFila+= "<td>" + (data['rfc'][d]['rfc']) + "</td>";
               
                    nuevaFila+= "<td>" + ('<button  value=' +d +' class="activar1" id=select'+i+'><span id="sta" class="sta glyphicon glyphicon glyphicon-ok"  aria-hidden="true"></span></button>') + "</td>";
                }  
                $("#tablaRFc tbody").append(nuevaFila);       
            }
            $('.activar1').on('click',function(){
                var i = $(this).val();
                // alert(i);
                var rfc=data['rfc'][i]['rfc'];
                if($('#destina').val().trim()===''){
                    var destinatario=rfc;
                }else{
                  var destinatario=$('#destina').val()+';'+rfc;
                }
                $('#destina').val(destinatario);             
            });
            //$('#tablaRFc').DataTable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //window.location.href = 'error.html';
            console.log(XMLHttpRequest);
            //aux=0;
        }
    });
}

function busquedaRFCini(){
    var datos = {
        rfc:$('#busquedaRFCini').val(),
        token:token
    };

    $.ajax({
        url: "http://onikom.technology:8080/MiDataNet/rfc",
        data: JSON.stringify(datos),
        type: 'POST',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            //console.log(data['rfc'][0]['rfc']);
            for(d in data['rfc']){ 
                // console.log(data['rfc'][d]['rfc']);
                var tds = $("#tablaRFCprin tr:first td").length;
                var trs = $("#tablaRFCprin tr").length;

                for(var i = 0;i < tds;i++){
                    nuevaFila = "<tr>";
                    nuevaFila+= "<td>" + (data['rfc'][d]['rfc']) + "</td>";
               
                    nuevaFila+="<td>"+('<button  value='+d+' class="rfcSelect" id=select'+i+'><span id="sta" class="sta glyphicon glyphicon glyphicon-ok"  aria-hidden="true"></span></button>')+"</td>"; 
                }  
                $("#tablaRFCprin tbody").append(nuevaFila);       
            }
            $('.rfcSelect').on('click',function(){
                var i = $(this).val();
                // alert(i);
                var rfc=data['rfc'][i]['rfc'];
                sessionStorage.setItem("rfc",rfc);
                //var e=sessionStorage.getItem('newRFC');
                elimanarfilass();
                $('#MensajesS').html('Ha seleccionado un RFC, ahora puede realizar sus operaciones');
                $('#MensajesS').show("slow",function() {
                    setTimeout(function() {
                        $("#MensajesS").fadeOut(1500);
                        $('#seleccionRFc').hide()
                        //getMerchant()
                        //viewAdinUser();
                        //firmar(correo,contrasena);
                    },4000);
                  
                    $(":text").each(function(){ 
                        $($(this)).val('');
                    });
                }); 
            });
            //$('#tablaRFc').DataTable();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //window.location.href = 'error.html';
            console.log(XMLHttpRequest);
            //aux=0;
        }
    });
}


function elimanarfilas(){   
    var trs = $("#tablaRFc tr").length;
    if(trs>1){
        // Eliminamos la ultima columna
        $("#tablaRFc tr").remove();
    }
    if ($('#busquedaRFC').val().length>=3) {
        buscarRFC();
    }      
}


function elimanarfilass(){
    //$("#contAfi").show("slow");
    var trs=$("#tablaRFCprin tr").length;
    if(trs>1){  
        // Eliminamos la ultima columna
        $("#tablaRFCprin tr").remove();
    }
}


function getRFCs(){
    var trs = $("#tablaRFCprin tr").length;
    
    if(trs>1){
        // Eliminamos la ultima columna
        $("#tablaRFCprin tr").remove();
    }
    if ($('#busquedaRFCini').val().length>=3) {
        busquedaRFCini();
    }
}



function  getUsersEmail(){

 // var html='';
   //limpiartabla();
  var datos={
  action:"getUsers",
  email:$('#busquedaEmail').val(),
  token:token};
console.log(JSON.stringify(datos));
  $.ajax({
        url: "http://onikom.technology:8080/MiDataNet/user",
         
        data: JSON.stringify(datos),
        type: 'POST',
        crossDomain: true,
        dataType: 'json',
         success: function (data) {
          usuarios=data
          console.log(data);
           for(d in data){ 
              console.log(data[d]['email']);
            var tds=$("#tablaEmail tr:first td").length;
            var trs=$("#tablaEmail tr").length;

           for(var i=0;i<tds;i++){
                if (data[d]['active']==1) {
                 nuevaFila="<tr>";
                 nuevaFila+="<td>"+('Sí')+"</td>";
                 nuevaFila+="<td>"+(data[d]['email'])+"</td>";
                 nuevaFila+="<td>"+(data[d]['merchantId'])+"</td>";
                 nuevaFila+="<td>"+(data[d]['name'])+"</td>";
                 nuevaFila+="<td>"+(data[d]['rfc'])+"</td>";
                 nuevaFila+="<td>"+(' <button  value='+d+' class="botones" id=eliminar'+d+'><span id="sta" class="sta glyphicon glyphicon glyphicon-remove"  aria-hidden="true"></span></button> <button  value='+d+' class="editar"  id=eliminar'+d+'><span id="sta" class="sta glyphicon glyphicon glyphicon-pencil"  aria-hidden="true"></span></button>')+"</td>";
                nuevaFila+="</tr>"
                }else{

                  nuevaFila="<tr>";
                 nuevaFila+="<td>"+("No")+"</td>";
                 nuevaFila+="<td>"+(data[d]['email'])+"</td>";
                 nuevaFila+="<td>"+(data[d]['merchantId'])+"</td>";
                 nuevaFila+="<td>"+(data[d]['name'])+"</td>";
                 nuevaFila+="<td>"+(data[d]['rfc'])+"</td>";
                 nuevaFila+="<td>"+(' <button  value='+d+' class="botones"  id=eliminar'+d+'><span id="sta" class="sta glyphicon glyphicon glyphicon-remove"  aria-hidden="true"></span></button> <button  value='+d+' class="editar"  id=eliminar'+d+'><span id="sta" class="sta glyphicon glyphicon glyphicon-pencil"  aria-hidden="true"></span></button>')+"</td>";
                nuevaFila+="</tr>"
                }
                 
                
            }  
            $('#busquedaEmail').val('');
             $("#tablaEmail tbody").append(nuevaFila);       
          }
          getUserall();
         },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //window.location.href = 'error.html';
           
            console.log(XMLHttpRequest);
             //aux=0;
        }
    });
}

function limpiartabla(){
	usuarios=[];
	html='';
	//alert('limpiare la tabla')
	$("#unoActivo").remove();
}
function limpiartabla2(){
	usuarios=[];
	html='';
	//alert('limpiare la tabla')
	$("#noAc").hide();
}
function getUserall(){

  

$('.editar').on('click',function(){

  $('#noAc').hide();

	 var i = $(this).val();
	userId=usuarios[i]['userId'];
  var email=usuarios[i]['email'];
  var name=usuarios[i]['name'];
  var tipo=usuarios[i]['profileId'];
  var rfc=usuarios[i]['rfc'];
  var merchant=usuarios[i]['merchantId'];
 
  $('.emailclass').val(email);
  $('.nombreUpdate').val(name);
  if(tipo==1){
    $('.tipoclass').val('Administrador');
  }else
  {
    if(tipo==2){
     $('.tipoclass').val('Propietario');
    }else{
      if(tipo==3){
    $('.tipoclass').val('Gerente');
  }
    }
  }
   
   $('.rfcclass').val(rfc);
   $('.merchantclass').val(merchant);
    if (usuarios[i]['active']==0) {
    $('#activeUser').show();
  }
        
   actualiza();
});
$('.botones').on('click',function(){
    $('#noAc').hide();
    var i = $(this).val();
  userId=usuarios[i]['userId'];
   viewdelete();

});
  
      $('.users').on('click',function(){
      
       
      if (bandera==1) {
      	bandera=0;
      	
        }else{
        bandera=1;
    }
      });    
}

function actualizar(){

  if( $('#activar').prop('checked') ) {
          //var tipo=2;
         var activar=1;
    //alert('Seleccionado');
    }else{
      //var tipo=3;
      var activar=usuarios[d]['active'];
    }

   var datos={
  action:"updateUser",
  userId:userId,
  name:$('.nombreUpdate').val(),
   merchantId:$('.merchantclass').val(),
   rfc:$('.rfcclass').val(),
  active:activar,
  token:token};
console.log(JSON.stringify(datos));
  $.ajax({
        url: "http://onikom.technology:8080/MiDataNet/user",
         
        data: JSON.stringify(datos),
        type: 'POST',
        crossDomain: true,
        dataType: 'json',
         success: function (data) {
          //usuarios=data
          console.log(data['success']);
          if (data['success']==true) {
           // alert('saludos');
             $('#updateconfirma').html('El usuario ha sido actualizado');
                $('#updateconfirma').show("slow",function() {
                      setTimeout(function() {
                       $("#updateconfirma").fadeOut(1500);
                       viewAdinUser();
                       //firmar(correo,contrasena);
                      },4000);
                  
                   $(":text").each(function(){ 
                          $($(this)).val('');
                  });
                });
          }
        
          
         },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //window.location.href = 'error.html';
           
            console.log(XMLHttpRequest);
             //aux=0;
        }
    });
  //window.location.href="permisos.html";
}
function eleminarUser(){
   var datos={
  action:"updateUser",
  userId:userId,
  active:0,
  token:token};
console.log(JSON.stringify(datos));
  $.ajax({
        url: "http://onikom.technology:8080/MiDataNet/user",
         
        data: JSON.stringify(datos),
        type: 'POST',
        crossDomain: true,
        dataType: 'json',
         success: function (data) {
          //usuarios=data
          console.log(data['success']);
          if (data['success']==true) {
            //alert('saludos');
             $('#deleteconfirma').html('El usuario ha sido Eliminado');
                $('#deleteconfirma').show("slow",function() {
                      setTimeout(function() {
                       $("#deleteconfirma").fadeOut(1500);
                       viewAdinUser();
                       //firmar(correo,contrasena);
                      },4000);
                  
                   $(":text").each(function(){ 
                          $($(this)).val('');
                  });
                });
          }
        
          
         },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //window.location.href = 'error.html';
           
            console.log(XMLHttpRequest);
             //aux=0;
        }
    });
}

function register(){
    var aux=0;
    var correo= $('#email').val();
    var nombre= $("#nombre").val();
    var contrasena= $('#contrasena').val();
    var validar= $("#validar").val();
     var rfc= $('#rfc').val();
   
    //var todos=$('#todos').prop('checked')
    if( $('#todos').prop('checked') ) {
         var merchant="0";
    //alert('Seleccionado');
    }else{
      var merchant= $("#mercahnt").val();
    }
    // alert(contrasena);
   
    
   if(contrasena==validar){
    var datos={
      action:"signup",
      name:nombre,
      pass:contrasena,
      email:correo,
      merchantId:merchant,
      rfc:rfc,
      signupType:'normal',
      tokenTwo:"token"
    };
console.log(JSON.stringify(datos));
   // ValidaRfc(rfc);
    
    //alert('aunxiliar'+aux);
    
       $.ajax({
        url: "http://onikom.technology:8080/MiDataNet/user",
        data: JSON.stringify(datos),
        type: 'POST',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            if(data.success==true){
             window.location.href = 'permisos.html';
            }
            console.log(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //window.location.href = 'error.html';
            console.log(XMLHttpRequest);
        }
        }); 
    //}else{
        //alert('El RFC introducido no Existe en la base');
   // }
    $(":text").each(function(){ 
            $($(this)).val('');
    });
     $('#email').val("");
     
   }else{
      $('#mensaje').show();
   }
    
    //console.log(datos);
    
}
function ValidaRfc(rfcStr) {
  //alert(rfcStr);
    var strCorrecta;
    strCorrecta = rfcStr;   

     //aux=validarmerchant();

    if (rfcStr.length == 12){
    var valid = '^(([A-Z]|[a-z]){3})([0-9]{6})((([A-Z]|[a-z]|[0-9]){3}))';
    }else{
    var valid = '^(([A-Z]|[a-z]|\s){1})(([A-Z]|[a-z]){3})([0-9]{6})((([A-Z]|[a-z]|[0-9]){3}))';
    }
    var validRfc=new RegExp(valid);
    var matchArray=strCorrecta.match(validRfc);
    if (matchArray==null) {
        alert('Introduce un RFC valido');

        return false;
    }
    else
    {
        //alert('Cadena correcta:' + strCorrecta);
        return true;
    }
    
}