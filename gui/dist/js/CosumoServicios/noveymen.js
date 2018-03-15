var idM=0;
var token;
$('document').ready(function()
{ 

///verificar();
	//$('.Mensajes').hide();
  $('#forecastCaptura').hide();
  $('#forecastConsulta').hide();
  $('#notimensaje').hide();
	//GetNotificacion();
  //GetM();
	//GetMessages();
	//GetM();
$('#MerchantsL').hide();
token=sessionStorage.getItem('TOKEN_ID');
});

function novedadesMensajes(){
  $('#bqPrope').hide();
  //alert('hola mundo');
  $('#titulo').html('Novedades y Mensajes');  
  $('#Nivel1T').hide();
  $('#Nivel2T').hide();
  $('#Nivel2V').hide();
  $('#proyeccion').hide();
  $('#Terminos').hide();
  $('#forecastCaptura').hide();
  $('#Panelconfig').hide();
  $('#notimensaje').show('slow');
  GetNotificacion();
  GetM();
}


function LOCATIONProyec(){
  window.location.href = 'principal_G.html';
  clickProyeccion();
}
function LOCATIONSale(){
   window.location.href = 'principal_G.html';
  clickSale();
}
function LOCATIONTransa(){
  window.location.href = 'principal_G.html';
  clickTransacction();
}
function GetNotificacion(){
$('.Notificaciones').show('slow');
	//$('.Mensajes').hide();

  var datos={
    frc:sessionStorage.getItem('rfc'),
    type:'notification',
    token:token

  }
  console.log(JSON.stringify(datos));
var a=[];

     var imgs="http://onikom.com.mx/elavon_img/img2.png"
      $.ajax({
          
            data:JSON.stringify(datos),
            type:'POST',
            crossDomain: true,
            dataType: 'json',
            url: "http://onikom.technology:8080/MiDataNet/getNotification",
            
            success: function (data) {
            	console.log(data[0]['date']);

               for(var i=0;i<data.length;i++){
               	//imgs=data[i]['img'];
               	var r={img: '<div class="pull-left image"><img src='+imgs+' class="img-avatar" alt="User Image"></div>',
                       date: data[i]['date'], 
                       Accion: ' <button  value='+i+' class="ver" data-toggle="modal" data-target="#verNM" id=ver'+i+'><span id="sta" class="sta glyphicon glyphicon glyphicon-eye-open"  aria-hidden="true"></span></button>'};
                a[i]=r;
               }
              //"http://onikom.com.mx/elavon_img/img2.png"
              
               $('#Noti').dynatable({dataset: {records: a}});

               $('.ver').on('click',function(){
               		var j=$(this).val();
               		$('.modal-title').html('Novedades');
               		$(".texto").val(data[j]['text']);
               		idM=data[j]['id'];
               		//alert(data[j]['text'])
               });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //window.location.href = 'error.html';
                console.log();
            }
        });
  
}

function GetM(){
	//$('.Notificaciones').hide();
	$('.Mensajes').show('slow');
  var merchant = [{
    merchantId:sessionStorage.getItem('merchant')}
    ];
 var datos = {
        rfc:sessionStorage.getItem('rfc'),
        type:'message',
        token:token
              
    };
 console.log(JSON.stringify(datos));
var a=[];

     var imgs="http://onikom.com.mx/elavon_img/img3.png"
      $.ajax({
          
            data:JSON.stringify(datos),
            type: 'POST',
            crossDomain: true,
            dataType: 'json',
            url: "http://onikom.technology:8080/MiDataNet/getNotification",

            success: function (data) {
            	

               for(var i=0;i<data.length;i++){
               var r={img: '<div class="pull-left image"><img src='+imgs+' class="img-avatar" alt="User Image"></div>',
                       date: data[i]['date'], 
                       Accion: ' <button  value='+i+' class="verM" data-toggle="modal" data-target="#verM" id=ver'+i+'><span id="sta" class="sta glyphicon glyphicon glyphicon-eye-open"  aria-hidden="true"></span></button>'};
                a[i]=r;
               }
              $('#mensajes').dynatable({dataset: {records: a}});

               $('.verM').on('click',function(){
               		var j=$(this).val();
               		$('.titulo').html('Mensajes');
               		$(".textom").val(data[j]['text']);
               		idM=data[j]['id'];
               		//alert(data[j]['text'])
               });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //window.location.href = 'error.html';
                console.log('error');
            }
        });
  
}

// function updateNotifi(){
// 	var d = new Date();

// var month = d.getMonth()+1;
// var day = d.getDate();

// var output = (month<10 ? '0' : '') + month +(day<10 ? '0' : '') + day+d.getFullYear();
// //alert(output);
// if($('.texto').val()==''){
//   alert('favor de escribir un mensaje')
// }{
//     var listNotifications = [{
//     	id:idM,
//         text:$('.texto').val(),
//         img:"http://onikom.com.mx/elavon_img/img2.png",
//         date:output}
//         ]

//        var datos = {
//             action:"update",
//             listNotifications:listNotifications
            
//         };
//         console.log(JSON.stringify(datos));
//       $.ajax({
//             data: JSON.stringify(datos),
//             type: 'POST',
//             crossDomain: true,
//             dataType: 'json',
//             url: "http://onikom.com.mx:7001/WSELAVON_NUEVO/newsIn",
//             success: function (data) {
//                console.log(data);
//                if(data.success==true){
//                 $('#confirma').html('Esta Notificacion se actualizado');
//                 $('#confirma').show("slow",function() {
//                     //alert ('imagen mostrada!');
//                       setTimeout(function() {
//                    $("#confirma").fadeOut(1500);
//                     },3000);
//                      $(":text").each(function(){ 
//                             $($(this)).val('');
//                     });
//                      $('.texto').val('');
//                   });
                
//                }

//             },
//             error: function (XMLHttpRequest, textStatus, errorThrown) {
//                 //window.location.href = 'error.html';
//                 console.log('error');
//             }
//         });
//   }
// }
// function updateMensaje(){
// 	alert('Servicios No disponibles');
// }

