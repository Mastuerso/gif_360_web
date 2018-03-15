var token;
$(document).ready(function(){
$('#Panelconfig').hide();
$('#mensajeG').hide();
});
function config(){
  $('#bqPrope').hide();
  $('#titulo').html('Configuraciones');  
  $('#Terminos').hide();
  $('#notimensaje').hide();
	$('#Nivel1T').hide();
	$('#Nivel2T').hide();
	$('#Nivel2V').hide();

	$('#proyeccion').hide();
	$('#Panelconfig').show("slow");
	$('#forecastCaptura').hide();

	$('#nombreG').val(sessionStorage.getItem('PROFILE_NAME'));
	$('#emailG').val(sessionStorage.getItem('PROFILE_EMAIL'));
  token=sessionStorage.getItem('TOKEN_ID');
	getMerchantSelect();
}
function changePass(){
var email=$('#emailG').val();
var pass=$('#contrasenaG').val();
var newpass=$('#validarG').val();
if($('#emailG').val().trim()==='' || $('#contrasenaG').val().trim()==='' || $('#validarG').val().trim()===''){
	       $('#mensajeG').html('Favor de Completar todos los campos');
                $('#mensajeG').show("slow",function() {
                    //alert ('imagen mostrada!');
                      setTimeout(function() {
                   $("#mensajeG").fadeOut(1500);
                    },3000);
                     $('#contrasenaG').val('');
                     $('#validarG').val('');
                  });
}else{
	var datos={
		action:"changePass",
		email:email,
		pass:pass,
		newPass:newpass,
    token:token

	}
	console.log(JSON.stringify(datos));
	  $.ajax({
        url: "http://onikom.technology:8080/MiDataNet/user",
        data: JSON.stringify(datos),
        type: 'POST',
        crossDomain: true,
        dataType: 'json',

        success: function (data) {
          console.log(data);
          if(data.success==true){
          	$('#mensajeG').html('Su contraseña se a modificado');
                $('#mensajeG').show("slow",function() {
                    //alert ('imagen mostrada!');
                      setTimeout(function() {
                   $("#mensajeG").fadeOut(1500);
                    },3000);
                     $(":text").each(function(){ 
                            $($(this)).val('');
                    });
                     $('#contrasenaG').val('');
                     $('#validarG').val('');
                     signOut();
                     
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
}

function signOut() {
	sessionStorage.clear();
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      window.location='index.html';
      
    });
    
  }

  function getMerchantSelect(){
  var b=[];
  var rfc={
    rfc:sessionStorage.getItem("rfc"),
    token:token
  }
  //alert(sessionStorage.getItem("rfc"));


  $.ajax({
        url: "http://onikom.technology:8080/MiDataNet/merchant",
        
        data: JSON.stringify(rfc),
        type: 'POST',
        crossDomain: true,
        dataType: 'json',

        success: function (data) {
          console.log(data);
          for(var i=0;i<data['merchant'].length;i++){
         
    	      var u={Name:i,
               Num:data['merchant'][i]['merchantId'], 
               };
        b[i]=u;
  }
$('#misSucursales').dynatable({dataset: {records: b}});
                 
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //window.location.href = 'error.html';
           
            console.log(XMLHttpRequest);
             //aux=0;
        }
    });
}