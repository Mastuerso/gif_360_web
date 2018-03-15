 var usuarios=[];
var bandera=0; 
var userId=0;
$('document').ready(function()
{ 
  verificar();
   $('#name').html(sessionStorage.getItem('PROFILE_NAME'));
	//$('#sucursales1').DataTable();
  //$('#unoActivo').hide();
  $('#formulario').hide();
  $('#dyna').hide();
	$('.botonF1').hide();
	$('.botonF2').hide();
  $('#editarUser').hide();
  $('#mensaje').hide();
   $('.botonF1').hover(function(){
  $('.btn2').addClass('animacionVer');
	})
   $('.botonF2').hover(function(){
  $('.btn2').addClass('animacionVer');
	})
     $('.botones').hover(function(){
  $('.btn2').addClass('animacionVer');
	})
	$('.contenedor').mouseleave(function(){
	  $('.btn2').removeClass('animacionVer');
	})

//confusion();
 //getUsersAll()
	getUsersnoActivos();

});

function verificar(){
  if(sessionStorage.getItem('PROFILE_NAME')){
   //alert('sesion iniciada');
   //alert(sessionStorage.getItem("tipouser"));
   if (sessionStorage.getItem("tipouser")==1) {
      //alert('alerta');
   }else{
    window.location.href = 'index.html';
     cerrarsesion();
   }
  }else{
     window.location.href = 'index.html';
     cerrarsesion();
    //alert('inicia sesion');
  }
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
     $('#dyna').hide();
     $('#noAc').hide();
     $('.redacta').hide()
    $('#formulario').show('fast');
  
}
function  getUsersnoActivos(){
$('#dyna').hide();
$('#noAc').show();
$('.redacta').hide()

  var html='';
  //limpiartabla2();
  var datos={
  action:'getUsers',
  user_type:'noapproved'};
  $.ajax({
        url: "http://onikom.com.mx:7001/WSELAVON_NUEVO/user/",
        data: JSON.stringify(datos),
        type: 'POST',
        crossDomain: true,
        dataType: 'json',
         success: function (data) {
          console.log(data);
          usuarios=data;
          getId();

         },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //window.location.href = 'error.html';
           
            console.log(XMLHttpRequest);
             //aux=0;
        }
    });
}
function getId(){
  //alert(usuarios);
var b=[]
  for(var i=0;i<usuarios.length;i++){
         
    	  	/*html += '<tr class="users" id= usuarios'+i+'>'
    	  		html += '<td  id=usuario'+i+'>'+ ' <div class="pull-left image"><img src="images/user.png" class="img-avatar" alt="User Image"></div>'+'</td>'
                html += '<td class="seleccion" style="cursor:pointer" id=nombre'+i+'>'+usuarios[i]['name']+'</td>' 
                html += '<td class="seleccion" style="cursor:pointer" id=email'+i+'>'+usuarios[i]['email']+'</td>'  
                html += '<td id=boton'+i+'>'+ ' <button  value='+i+' class="botones" id=eliminar'+i+'><span class="glyphicon glyphicon glyphicon glyphicon-ok" aria-hidden="true"></span></button>'+'</td>'          
            html += '</tr>';*/
              var u={Foto: '<div class="pull-left image"><img src="images/user.png" class="img-avatar" alt="User Image"></div>',
               Nombre: usuarios[i]['name'], 
               Email:usuarios[i]['email'], 
               Estatus: ' <button  value='+i+' class="activar" id=eliminar'+i+'><span id="sta" class="sta glyphicon glyphicon glyphicon-ok"  aria-hidden="true"></span></button>'};
        b[i]=u;
  }
$('#unoActivo').dynatable({dataset: {records: b}});
        //$("#sucursales1 tbody").html(html);

$('.activar').on('click',function(){
	 var i = $(this).val();
	userId=usuarios[i]['userId'];
	activar();
  //alert('hok');
  
});
  
      $('.users').on('click',function(){
      
       
      if (bandera==1) {
      	bandera=0;
      	//alert('existe un lemento seleccionado');
        }else{
        bandera=1;
    }
      });    
}

function activar(){
	//var i = $(this).index();
     //alert(i);
		//alert(userId);
		var datos={
  action:'activateUser',
 userId:userId};
	  $.ajax({
        url: "http://onikom.com.mx:7001/WSELAVON_NUEVO/user/",
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

function  getUsersAll(){

  $('#dyna').show();
  $('#noAc').hide();
  $('.redacta').hide()
    $('#formulario').hide();
  $('.botonF2').show();
  var html='';
   //limpiartabla();
  var datos={
  action:'getUsers',
  user_type:'all'};
  $.ajax({
        url: "http://onikom.com.mx:7001/WSELAVON_NUEVO/user/",
        data: JSON.stringify(datos),
        type: 'POST',
        crossDomain: true,
        dataType: 'json',
         success: function (data) {
          console.log(data);
         usuarios=data;

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
  //alert(usuarios);

var a=[];
  for(var i=0;i<usuarios.length;i++){
         
    	   if(usuarios[i]['active']==1){
            var r={Foto: '<div class="pull-left image"><img src="images/user.png" class="img-avatar" alt="User Image"></div>',
             Nombre: usuarios[i]['name'], 
             Email:usuarios[i]['email'],
             Estatus:'Activo',
             Accion: ' <button  value='+i+' class="botones" data-toggle="modal" data-target="#eliminar" id=eliminar'+i+'><span id="sta" class="sta glyphicon glyphicon glyphicon-remove"  aria-hidden="true"></span></button> <button  value='+i+' class="editar" data-toggle="modal" data-target="#actualizar" id=eliminar'+i+'><span id="sta" class="sta glyphicon glyphicon glyphicon-pencil"  aria-hidden="true"></span></button>'};
        a[i]=r;
      }else{
        if(usuarios[i]['active']==0){
            var r={Foto: '<div class="pull-left image"><img src="images/user.png" class="img-avatar" alt="User Image"></div>',
             Nombre: usuarios[i]['name'], 
             Email:usuarios[i]['email'],
             Estatus:'Inactivo',
             Accion: ' <button  value='+i+' class="botones" data-toggle="modal" data-target="#eliminar" id=eliminar'+i+'><span id="sta" class="sta glyphicon glyphicon glyphicon-remove"  aria-hidden="true"></span></button> <button  value='+i+' class="editar" data-toggle="modal" data-target="#actualizar" id=eliminar'+i+'><span id="sta" class="sta glyphicon glyphicon glyphicon-pencil"  aria-hidden="true"></span></button>'};
        a[i]=r;
      }
        //alert(r);
      }
  }

        //var r=[{Foto: 'Foto', Nombre: 'Florentino', Email: 'teco@gmail.com', Estatus: 'Activo'},{Foto: 'Foto', Nombre: 'Florentino', Email: 'teco@gmail.com', Estatus: 'Activo'}];     
        
$('#dynatable').dynatable({dataset: {records: a}});

$('.editar').on('click',function(){
   //$('#editarUser').show();
  //$('#dyna').hide();
  $('#noAc').hide();

  //$("#sucursales2 tbody").html(html);
	 var i = $(this).val();
	userId=usuarios[i]['userId'];
  var email=usuarios[i]['email'];
  var name=usuarios[i]['name'];
  var tipo=usuarios[i]['profileId'];
  var rfc=usuarios[i]['rfc'];
  var merchant=usuarios[i]['merchantId'];
  //alert(email+"  "+name+"  "+tipo+"  "+rfc+"  "+ merchant);
  $('.emailclass').val(email);
  $('.nombreclas').val(name);
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
   
  //alert(userId);
	//activar();
});
  
      $('.users').on('click',function(){
      
       
      if (bandera==1) {
      	bandera=0;
      	//alert('existe un lemento seleccionado');
        }else{
        bandera=1;
    }
      });    
}

function actualizar(){
  alert('usuario actualizado');
  getUsersAll();
   $('#editarUser').hide();
  //window.location.href="permisos.html";
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
    merchant:merchant,
    rfc:rfc,
    signup_type:'normal'
    };

    ValidaRfc(rfc);
    
    //alert('aunxiliar'+aux);
    
       $.ajax({
        url: "http://onikom.com.mx:7001/WSELAVON_NUEVO/user/",
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
  alert(rfcStr);
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