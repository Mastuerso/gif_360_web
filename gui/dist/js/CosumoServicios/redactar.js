var grafica=0;
   var indice=0;
   var usuarios=[];
  var transacciones=[];
  var ventas=[];
  var aclaraciones=[];
  var meses=[];
  var merchants=[];
  var merchantaux=[];
  var merchantName=[];
  var auxS=[];
  var cont=0;
   var html='';
   var newMerchat=[];
   var token;
$('document').ready(function()
{ 
  $("#loadermsj").hide();
   token=sessionStorage.getItem('TOKEN_ID');
  verificar();
$('#RFCs').hide();
  $('.redacta').hide();
  $("#confirma").hide();
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

 //alert(sessionStorage.getItem('PROFILE_NAME'));
getMerchant();
  //llenado();
 //users();

  //$('#busqueda').attr('disabled', 'disabled');
 
 
  $('#name').html(sessionStorage.getItem('PROFILE_NAME'));
  
   //$("#busqueda").focus()
   //buscar();
//$("#busqueda").on("keyup", buscar);
  //loadLogin();
});

function verificar(){
  if(sessionStorage.getItem('PROFILE_NAME')){
   // alert('sesion iniciada');
   if (sessionStorage.getItem('tipouser')==1) {

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


function mostrarnotifi(){
  //$('#contRFc').hide();
    $('#Nivel1TA').hide();
  $('#Nivel2TA').hide();
  $('#Nivel2VA').hide();
  $('#proyeccion').hide();
  $('#contAfi').hide();
   $('#princi').hide();
   $('#btnMensj').hide();
   $('#btnNoti').show();
   $('#contRFC').hide("slow");
  //$('#RFCs').show('fast');
//sgetUsersAll();
$("#tablaRFc tbody").remove();
   $(":text").each(function(){ 
            $($(this)).val('');
    });

$('.redacta').show("fast");
$("#destina").removeAttr('disabled');
$('.N').html("Nueva Notificacion");
$("#destina").attr('disabled', 'disabled');
}
function mostrarMensaje(){

    $('#Nivel1TA').hide();
  $('#Nivel2TA').hide();
  $('#Nivel2VA').hide();
  $('#proyeccion').hide();
  $('#contAfi').hide();
   $('#princi').hide()
   $('#btnMensj').show();
   $('#btnNoti').hide();
   $('#contRFC').show("slow")
   var html='';
   html+='<tbody>'
     
    html+='</tbody>'
    $("#tablaRFc").append(html);


  // $('#contRFc').show();
  //$('#RFCs').show('fast');
//getUsersAll();
   $(":text").each(function(){ 
            $($(this)).val('');
    });

$('.redacta').show("fast");

$("#destina").removeAttr('disabled');
$('.N').html("Nuevo Mensaje");
$('#cabeza').html("Redactar");


}
function cerrar(){
  $('.contenedor').hide();
   $(":text").each(function(){ 
                        $($(this)).val('');
                });
                 $('.message').val('');
}
function insetNotificacion(){
$('#btnNoti').hide();
$("#loadermsj").show();
//$('#btnNoti').attr("disabled", true);
  var d = new Date();

var month = d.getMonth()+1;
var day = d.getDate();

var output =d.getFullYear()+"-"+(month<10 ? '0' : '') + month +"-"+(day<10 ? '0' : '')+day  ;
//alert(output);
var urlimg='http://onikom.com.mx/elavon_img/img2.png';
if($('.message').val().trim()===''){
  alert('favor de escribir una Notificacion')
}{
    var listNotifications = [{
        type: "notification",
        text:$('.message').val(),
        img:urlimg,
        date:output,
         active:"1"}
        ]

       var datos = {
            action:"insert",
            userUpdate:sessionStorage.getItem('PROFILE_EMAIL'),
            notificationList:listNotifications,
            token:token
        };
        console.log(JSON.stringify(datos));
      $.ajax({
          
            data: JSON.stringify(datos),
            type: 'POST',
            crossDomain: true,
            dataType: 'json',
            url: "http://onikom.technology:8080/MiDataNet/setNotification",
            
            success: function (data) {
               console.log(data);
               if(data.success==true){
                $("#loadermsj").hide();
                $('#confirma').html('Su notificación se a enviado');
                $('#confirma').show("slow",function() {
                    //alert ('imagen mostrada!');
                      setTimeout(function() {
                   $("#confirma").fadeOut(1500);
                   $('#btnNoti').show("slow");
                  
                   //$('#btnNoti').attr("disabled", false);
                    },3000);
                     $(":text").each(function(){ 
                            $($(this)).val('');
                    });
                     $('.message').val('');
                  });
                
               }

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //window.location.href = 'error.html';
                console.log('error');
            }
        });
  }
}
function insertMensaje(){
 $('#btnMensj').hide();
$("#loadermsj").show();
var listNotifications=[];
  var d = new Date();

var month = d.getMonth()+1;
var day = d.getDate();

var output =d.getFullYear()+"-"+(month<10 ? '0' : '') + month +"-"+(day<10 ? '0' : '')+day  ;
//alert(output);
var urlimg='http://onikom.com.mx/elavon_img/img3.png';
if($('.message').val().trim()==='' || $('#destina').val().trim()==='' ){
  alert('favor de completar todos los campos');
}{
    var Cadena=$('#destina').val();
               Cadena=Cadena.split(';');
    for(var i=0; i<Cadena.length;i++){
      listNotifications[i] = {
        type: "message",
        text:$('.message').val(),
        img:urlimg,
        date:output,
         active:"1",
         rfc: Cadena[i],
         merchantId:-1}
        
    }
    

       var datos = {
            action:"insert",
            userUpdate:sessionStorage.getItem('PROFILE_EMAIL'),
            notificationList:listNotifications,
            token:token
        };
        console.log(JSON.stringify(datos));
    $.ajax({
          
            data: JSON.stringify(datos),
            type: 'POST',
            crossDomain: true,
            dataType: 'json',
            url: "http://onikom.technology:8080/MiDataNet/setNotification",
            
            success: function (data) {
               console.log(data);
               if(data.success==true){
                  $("#loadermsj").hide();
                $('#confirma').html('Su Mensaje se a enviado');
                $('#confirma').show("slow",function() {
                    //alert ('imagen mostrada!');
                      setTimeout(function() {
                   $("#confirma").fadeOut(1500);
                   $('#btnMensj').show("slow");
                  
                    },3000);
                     $(":text").each(function(){ 
                            $($(this)).val('');
                    });
                     $('.message').val('');
                  });
                
               }

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //window.location.href = 'error.html';
                console.log('error');
            }
        });
  }
}
function cerrarsesion(){
    //signOut();
 // FB.logout();
  sessionStorage.clear();
  window.location.href = 'index.html';

}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}
/*function  users(){
  var html='';
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
          otro();
         },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //window.location.href = 'error.html';
           
            console.log(XMLHttpRequest);
             //aux=0;
        }
    });
}
function otro(){
  alert(usuarios);
  for(var i=0;i<usuarios.length;i++){
           html += '<tr id='+i+'>'
                html += '<td style="cursor:pointer" id=usuarios'+i+'>'+usuarios[i]['name']+'</td>'               
            html += '</tr>';
  }

        $("#sucursales1 tbody").html(html);
  for(var j=0;j<usuarios.length;j++){
      $('#usuarios'+j).on('click',function(){
      alert($(this).text());
        
      });
    }
}*/
function llamarGraficas(){

    //alert ( $('#sucurBuscar >tbody >tr').length);
    var tamTabla=$('#sucurBuscar >tbody >tr').length;
   // alert(tamTabla);
    merchantaux=[];
    for(var i=0;i<tamTabla;i++){
      //alert('dentro del for');
      if( $('#merch'+i).prop('checked') ) {
         //var merchant="0";
          merchantaux[i] ={ merchantId:$("#merch"+i).val()}
        //alert($("#merch"+i).val());
        }
    }
    peticionventas();
    peticionAclaraciones();
    peticionTransacciones();
 $('#graficas').show();
 $('#transa').show();
 $('#ventas').show();
 $('#proye').show();
 $('#nove').show();
 $('#confi').show();
 $('#termi').show();
 $('#Grafi').show();
 $('.tablas').hide();

}
function  getUsersAll(){
 // alert('jajaj');
 /* $('#graficas').hide();
 $('#transa').hide();
 $('#ventas').hide();
 $('#proye').hide();
 $('#nove').hide();
 $('#confi').hide();
 $('#termi').hide();
 $('#Grafi').hide();*/
  $('.tablas').show();
var r=[];
  var html='';
   //limpiartabla();
  var datos={
  action:'getUsers',
  user_type:'all'};
  $.ajax({
        url: "http://onikom.technology:8080/MiDataNet/user/",
        data: JSON.stringify(datos),
        type: 'POST',
        crossDomain: true,
        dataType: 'json',
         success: function (data) {
          console.log(data);
         usuarios=data;
          for(var i=0;i<usuarios.length;i++){
        
                var u={ 
                         RFC: usuarios[i]['rfc'], 
                        select: ' <button  value='+usuarios[i]['rfc']+' class="buscaRFC" id=buscar'+i+'><span id="sta" class="sta glyphicon glyphicon glyphicon-ok"  aria-hidden="true"></span></button>'};
                        r[i]=u;
              }

            $('#MerchantsL').dynatable({dataset: {records: r}});
            buscar();
        // getUserall();
         },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //window.location.href = 'error.html';
           
            console.log(XMLHttpRequest);
             //aux=0;
        }
    });
}
function llenado(){
  var r=[];
 // $('.conbusqueda').show();
  var html='';
  var consulta;
  /*$('.conbusqueda').animate({
      //'width':'200px',
      'height':'250px'
    });*/
  console.log('dentro de la funcion');
for(var i=0;i<usuarios.length;i++){
//alert('dentro de la funcion');
      var u={ 
               RFC: usuarios[i]['rfc'], 
              select: ' <button  value='+usuarios[i]['rfc']+' class="buscaRFC" id=buscar'+i+'><span id="sta" class="sta glyphicon glyphicon glyphicon-ok"  aria-hidden="true"></span></button>'};
              r[i]=u;
     /*html += '<tr id='+i+'>'
          html += '<td style="cursor:pointer" id=tarjeta'+i+'>'+usuarios[i]['rfc']+'</td>'               
      html += '</tr>';*/
    }

  $('#MerchantsL').dynatable({dataset: {records: r}});
 
 //obtenemos el texto introducido en el campo de búsqueda
 // consulta = $("#busqueda").val();
  

}
function buscar(){

 
var filter=[];
filter=auxS;

     $('.buscaRFC').on('click',function(){
         auxS[cont]=$(this).val();
         //alert(auxS);
         $('#destina').val($(this).val());
        //getNewMerchant();
         
       });     
}
function etiquetas(){
  var b=[];
   //alert(newMerchat[cont]);
   //console.log(auxS);
  //for(var j=0;j<auxS.length;j++){

    //auxS[cont]=auxS[cont].toUpperCase()+auxS.slice(1);
    for(var i=0;i<newMerchat.length;i++){
         
          /*html += '<tr class="users" id= usuarios'+i+'>'
            html += '<td  id=usuario'+i+'>'+ ' <div class="pull-left image"><img src="images/user.png" class="img-avatar" alt="User Image"></div>'+'</td>'
                html += '<td class="seleccion" style="cursor:pointer" id=nombre'+i+'>'+usuarios[i]['name']+'</td>' 
                html += '<td class="seleccion" style="cursor:pointer" id=email'+i+'>'+usuarios[i]['email']+'</td>'  
                html += '<td id=boton'+i+'>'+ ' <button  value='+i+' class="botones" id=eliminar'+i+'><span class="glyphicon glyphicon glyphicon glyphicon-ok" aria-hidden="true"></span></button>'+'</td>'          
            html += '</tr>';*/
              var u={ 
               check: newMerchat[cont], 
              Merchant: ' <button  value='+i+' class="activar" id=eliminar'+i+'><span id="sta" class="sta glyphicon glyphicon glyphicon-ok"  aria-hidden="true"></span></button>'};
        b[i]=u;
  }
      /*var u={
               check: 'jajaj', 
               Merchant: newMerchat[cont] 
               };
        b[cont]=u;*/
    /*html += '<tr id='+cont+'>'
          html += '<td style="cursor:pointer;  color:#000" id=merchant'+cont+'>'+newMerchat[cont]+'</td>'               
          html += '</tr>';  */
  //}
  
$('#sucurBuscar').dynatable({dataset: {records: b}});
  //$("#sucurBuscar tbody").html(html);

 

}
function getNewMerchant(){
  var b=[];
 // alert(auxS[cont]);
//auxS[cont]=auxS[cont].toLowerCase();
var rfc=auxS[cont];
var rfc2=sessionStorage.getItem("rfc");
//alert(sessionStorage.getItem("rfc"));
  var datasetValue=[];

  $.ajax({
        url: "http://onikom.technology:8080/MiDataNet/merchant",
        data: rfc,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
          console.log(data);

          for(var i=0;i<data['merchant'].length>0;i++){
                         
              newMerchat[i]=data['merchant'][i]['merchantId'];
              var u={ 
               Merchant: data['merchant'][i]['merchantId'], 
              check: ' <input type="checkbox" value='+data['merchant'][i]['merchantId']+' id=merch'+i+'>'};
              b[i]=u;
               cont++;
               console.log(newMerchat[i]);
           // }
            
            //merchantName[i]=data['merchant'][i]['merchantLegalName'];
          }
          $('#sucurBuscar').dynatable({dataset: {records: b}});
          console.log('nuevos merchants'+newMerchat);
          merchantaux=[];
          for(var i=0;i<newMerchat.length;i++){
           // alert(merchants[i]);
                    merchantaux[i] ={ merchantId:newMerchat[i]}
                    
            
          }
          console.log(merchantaux);
           //etiquetas();
          //peticionventas();
          //peticionAclaraciones();
          //peticionTransacciones();
         // alert(merchants);
          //console.log(merchantaux);         
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //window.location.href = 'error.html';
           
            console.log(XMLHttpRequest);
             //aux=0;
        }
    });



//console.log(merchantaux);
}
function getMerchant(){
  var rfc=sessionStorage.getItem("rfc");
  //alert(sessionStorage.getItem("rfc"));
  var datasetValue=[];

  $.ajax({
        url: "http://onikom.technology:8080/MiDataNet/merchant",
        data: rfc,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
          console.log(data);
          for(var i=0;i<data['merchant'].length>0;i++){
            merchants[i]=data['merchant'][i]['merchantId'];
            merchantName[i]=data['merchant'][i]['merchantLegalName'];
          }
          //alert(merchantName);
          for(var i=0;i<merchants.length;i++){
           // alert(merchants[i]);
                    merchantaux[i] ={ merchantId:merchants[i]}
                    
            
          }
          peticionventas();
          peticionAclaraciones();
          peticionTransacciones();
         // alert(merchants);
          //console.log(merchantaux);         
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //window.location.href = 'error.html';
           
            console.log(XMLHttpRequest);
             //aux=0;
        }
    });




//console.log(merchantaux);
}

function peticionventas(){
   ventas=[];
//alert(merchantaux);
  var aux=[];
  
//console.log(merchantaux);
  var merchant = [{
    merchantId:sessionStorage.getItem('merchantId')}
    ]

   var datos = {
        merchant: merchantaux,
        date: '15092016',
        rfc: sessionStorage.getItem('rfc')
    };
//console.log(JSON.stringify(datos));



$.ajax({
      
        data: JSON.stringify(datos),
        type: 'POST',
        crossDomain: true,
        dataType: 'json',
        url: "http://onikom.technology:8080/MiDataNet/sale/period",

        success: function (data) {
           console.log(data);
              $.each( data, function(a, item){
            //console.log(item);
                // console.log(item['branchModel'].length);

                 for(i in item['branchModel']){
                  //console.log(item['branchModel'][i]);
                  //console.log(item['branchModel'][i]['statistic']);

                  aux=[];

                  aux[a]=item['branchModel'][i]['branchDesc'];
                  //aux[1]=item['branchModel'][i]['branchDesc'];
                   c=1;
                  for(j in item['branchModel'][i]['saleStatistic']){
                 // console.log(item['branchModel'][i]['statistic'][j]['amountTx']);
                 
                  aux[c]=item['branchModel'][i]['saleStatistic'][j]['amount'];
                  c++;
                  aux[c]=item['branchModel'][i]['saleStatistic'][j]['date'];
                  c++;
                   
                  }

                  //var ctx = document.getElementById("bar-chart");
                  ventas[i]=aux;
                  
                 
                }
            });
             // console.log(ventas);
              graficarVentas();  

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //window.location.href = 'error.html';
            console.log('error');
        }
    });

}

function peticionAclaraciones(){
  aclaraciones=[];
  var aux=[];
  var merchant = [{
    merchantId:sessionStorage.getItem('merchantId')}
    ]

   var datos = {
        merchant: merchantaux,
        date: '15092016',
        rfc: sessionStorage.getItem('rfc')
    };
//console.log(JSON.stringify(datos));
$.ajax({
      
        data: JSON.stringify(datos),
        type: 'POST',
        crossDomain: true,
        dataType: 'json',
        url: "http://onikom.technology:8080/MiDataNet/clarification",

        success: function (data) {
           // console.log(data);
              $.each( data, function(a, item){
            //console.log(item);
                // console.log(item['branchModel'].length);

                 for(i in item['branchModel']){
                  //console.log(item['branchModel'][i]);
                  //console.log(item['branchModel'][i]['statistic']);

                  aux=[];

                  aux[a]=item['branchModel'][i]['branchDesc'];
                  //aux[1]=item['branchModel'][i]['branchDesc'];
                   c=1;
                  for(j in item['branchModel'][i]['clarStatistic']){
                 // console.log(item['branchModel'][i]['statistic'][j]['amountTx']);
                 
                  aux[c]=item['branchModel'][i]['clarStatistic'][j]['amount'];
                  c++;
                  aux[c]=item['branchModel'][i]['clarStatistic'][j]['typeTx'];
                  c++;
                   
                  }

                  //var ctx = document.getElementById("bar-chart");
                  aclaraciones[i]=aux;
                  
                 
                }
            });
              //console.log(aclaraciones);
              graficarAclaraciones();

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //window.location.href = 'error.html';
            console.log('error');
        }
    });

}

function peticionTransacciones(){

  //console.log('log');
   transacciones=[];
   var aux=[];
   var merchant = [{
    merchantId:sessionStorage.getItem('merchantId')}
    ]
//
//alert(merchantaux);
   var datos = {
        interval: 'monthly',
        merchant: merchantaux,
        date: '21092016',
        rfc: sessionStorage.getItem('rfc')
    };
    console.log(datos);
   $.ajax({
   data: JSON.stringify(datos),
        type: 'POST',
        crossDomain: true,
        dataType: 'json',
        url: "http://onikom.technology:8080/MiDataNet/transaction/period",

       
    success: function(data) {
      console.log(data);
    //console.log(data[0]['branchModel'][1]['branchDesc']);
    $.each( data, function(a, item){
    //console.log(item);
        // console.log(item['branchModel'].length);

         for(i in item['branchModel']){
          //console.log(item['branchModel'][i]);
          //console.log(item['branchModel'][i]['statistic']);

          aux=[];

          aux[a]=item['branchModel'][i]['branchDesc'];
          //aux[1]=item['branchModel'][i]['branchDesc'];
           c=1;
          for(j in item['branchModel'][i]['statistic']){
         // console.log(item['branchModel'][i]['statistic'][j]['amountTx']);
         
          aux[c]=item['branchModel'][i]['statistic'][j]['amountTx'];
          c++;
          aux[c]=item['branchModel'][i]['statistic'][j]['date'];
          c++;
           
          }

          //var ctx = document.getElementById("bar-chart");
          transacciones[i]=aux;
          
         
        }
    });
    console.log(transacciones)
    //console.log('tamano de transacciones'+transacciones.length);
        graficarTransaciones(); 
              
      //graficarAclaraciones()
    },
    error: function(){
    //alert('Error!');
        
        //graficarTransaciones(); 
         //graficarVentas();        
        //graficarAclaraciones()
    }

    });
}

function graficarTransaciones(){
  console.log(transacciones);
  var ctx = document.getElementById("bar-chart");
var setsdata=[];
var datasetValue = [];
var copia=transacciones;
   //console.log(transacciones);
   for(var i=0;i<transacciones.length;i++){

   }
  var sucursales=[];
  var datos2=[];
  var colores=[];
  var border=[];
  var colores2=[];
  var border2=[];
  var indice=0;

  var tam=0;

  
for(i in transacciones){
        
        var f=2;
        var fechas=[];
        var index=0;
       tam=tam+transacciones[i].length;
 
        for(j in transacciones[i]){

          if(typeof  transacciones[i][f]!== 'undefined'){
            transacciones[i][f]=getDate(transacciones[i][f]);
            fechas[index]=transacciones[i][f];
            meses[j]=fechas[index];
            index++;

            
          }
             
              f=f+2;
        }

        var result;
        var r=-1;
        //alert(fechas.length);
        for(var a=0;a<fechas.length;a++){
        result=$.inArray(fechas[a],meses)
          if(result==r){
            //alert(fechas[a]);
            meses[a]=fechas[a];
            alert(meses[a]);
          }
        }


}



for(k in transacciones){
         var d=1;
        var f=2;
        indice=0;
        var datos=[];
        for(t in transacciones[k]){
          
          sucursales[k]=transacciones[k][0];
          //alert(sucursales[k]);
         
         if(typeof  transacciones[k][d]!== 'undefined' && transacciones[k][0]==sucursales[k]){
        
            datos=getTrasacciones(transacciones[k][d],transacciones[k][f],indice,datos);

          }
          if(transacciones[k][0]=='Satélite'){
            colores='rgba(27, 179, 188,2)';
            border='rgba(27, 179, 188,2)';
          }else{
            if (transacciones[k][0]=='Santa fé') {
               colores='rgba(229, 157, 39,2)';
             border='rgba(229,157,39,2)';
            }
          }
              indice++;
              d=d+2;
              f=f+2;
        }
        
      //creando los dataset para cada grafica
       datasetValue[k] = 
        {
        label:sucursales[k],
        data :datos,
        backgroundColor: colores,
        borderColor :border,
         borderWidth: 1
        
        }
   

}

//graficando 
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: meses,
        datasets: datasetValue
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }, 
        
    }
});

}

function graficarVentas(){
  // console.log(ventas);
  var ctx = document.getElementById("line-chart");
  var setsdata=[];
var datasetValue = [];
var copia=transacciones;
var sucursales=[];
  var datos2=[];
  var colores=[];
  var border=[];
  var colores2=[];
  var border2=[];
  var indice=0;

 for(i in ventas){
        
        var f=2;
        var fechas=[];
        var index=0;
       //tam=tam+ventas[i].length;
 
        for(j in ventas[i]){

          if(typeof  ventas[i][f]!== 'undefined'){
            ventas[i][f]=getDate(ventas[i][f]);
            fechas[index]=ventas[i][f];
            meses[j]=fechas[index];
            index++;

            
          }
             
              f=f+2;
        }

        var result;
        var r=-1;
        //alert(fechas.length);
        for(var a=0;a<fechas.length;a++){
        result=$.inArray(fechas[a],meses)
          if(result==r){
            //alert(fechas[a]);
            meses[a]=fechas[a];
            //alert(meses[a]);
          }
        }


}
for(k in ventas){
         var d=1;
        var f=2;
        indice=0;
        var datos=[];
        for(t in ventas[k]){
          
          sucursales[k]=ventas[k][0];
          //alert(sucursales[k]);
         
         if(typeof  ventas[k][d]!== 'undefined' && ventas[k][0]==sucursales[k]){
        
            datos=getTrasacciones(ventas[k][d],ventas[k][f],indice,datos);

          }
          if(ventas[k][0]=='Satélite'){
            colores='rgba(27, 179, 188,2)';
            border='rgba(27, 179, 188,2)';
          }else{
            if (ventas[k][0]=='Santa fé') {
               colores='rgba(229, 157, 39,2)';
             border='rgba(229,157,39,2)';
            }
          }
              indice++;
              d=d+2;
              f=f+2;
        }
      //creando los dataset para cada grafica
       datasetValue[k] = 
        {
        label:sucursales[k],
        data :datos,
        backgroundColor: colores,
        borderColor :border,
        fill: false,
        lineTension: 0.8,
        borderCapStyle: 'butt',
        borderDash: [],
        borderJoinStyle: 'miter',
            pointBorderColor: border,
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: colores,
            pointHoverBorderColor: border,
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: datos,
            spanGaps: false,
         borderWidth: 1
        
        }
}
  
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: meses,
        datasets: datasetValue
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
}
function graficarAclaraciones(){
   //console.log('aclaraciones'+aclaraciones);
    var ctx = document.getElementById("circle-chart");
var sucursales=[];
var datasetValue = [];
  var aux=[];
  var datos2=[];
  var colores=[];
  var border=[];
  var colores2=[];
  var border2=[];
  var fechas=[];
  var indice=0;
  var index=0;
  var tam=0;
  var datos=[];

   for(i in aclaraciones){
        
        var f=2;
        var d=1;
        var fechas=[];
        var index=0;
       //tam=tam+ventas[i].length;
 
        for(j in aclaraciones[i]){
          if(typeof  aclaraciones[i][d]!== 'undefined'){
            sucursales[i]=aclaraciones[i][f];
          }

          if(typeof  aclaraciones[i][f]!== 'undefined' && aclaraciones[i][f]==sucursales[i]){
            //ventas[i][f]=getDate(ventas[i][f]);
            fechas[index]=aclaraciones[i][f];
            aux[indice]=aclaraciones[i][0]+" "+fechas[index];
            
             index++;
            
          }
             
              f=f+2;
               d=d+2;
              indice++;
             
        }


}
 aux=cleanArray(aux);

indice=0;

sucursales=[];
//console.log(aux);
for(k in aclaraciones){
         var d=1;
        var f=2;
        //indice=0;
        
        for(t in aclaraciones[k]){
          if(typeof  aclaraciones[k][d]!== 'undefined'){
            sucursales[k]=aclaraciones[k][f];
          }
          
         // alert(sucursales[k]);
         
         if(typeof  aclaraciones[k][d]!== 'undefined' && aclaraciones[k][f]==sucursales[k]){
            //console.log(indice);
            datos2[indice]=aclaraciones[k][d];//getTrasacciones(aclaraciones[k][d],aclaraciones[k][f],indice,datos);
            //console.log(datos);
             indice++; 
            //console.log(aclaraciones[k][f]);
          }             
              d=d+2;
              f=f+2;
        }

        //console.log('datos'+datos2);
      //creando los dataset para cada grafica
}
//console.log('logitud'+aux.length);
for(var c=0;c<aux.length;c++){
    //alert(aux[c]);

   if(aux[c]=='Satélite Internacional - Regular'){
            //alert('condicion1');
            colores[tam]='rgba(27, 179,188,2)';
            border='rgba(0, 0, 0,2)';
          }else{
            if (aux[c]=='Santa fé Internacional - Meses sin intereses') {
              //alert('condicion2');
               colores[tam]='rgba(229, 157, 39,2)';
             border='rgba(229,157,39,2)';
            }else{
                if (aux[c]=='Santa fé Internacional - Regular') {
                  //alert('condicion3');
                 colores[tam]='rgba(0, 0, 0,2)';
               border='rgba(255,255,255,2)';
              }
            }
            
          }
        tam++;
}

//console.log(colores);
//console.log(datos2);


var myPieChart = new Chart(ctx,{
    type: 'pie',
    data:{
    labels: aux,
    datasets: [
        {
            data: datos2,
            backgroundColor: colores,
            hoverBackgroundColor: border
        }]
},
   
});


}

function getDate(fecha){
  //console.log('fecha recibida'+fecha);
 var res = fecha.split("");
 var Mes='Mes';
//var respt=resp;
 //console.log(respt);
 

    var ano=fecha.substring(4,8);
    //alert(ano);
   
       if(fecha[2] == "0"&& fecha[3] == "1"){Mes='Enero_'+ano;} 
       //resp++;

        if(fecha[2] == "0"&& fecha[3] == "2"){Mes='Febrero_'+ano;} 
       // resp++;
  
       if(fecha[2] == "0"&& fecha[3] == "3"){Mes='Marzo_'+ano;} 
       //resp++;
       
        if(fecha[2] == "0"&& fecha[3] == "4"){Mes='Abril_'+ano;} 
        //resp++;
        
       if(fecha[2] == "0"&& fecha[3] == "5"){Mes='Mayo_'+ano;} 
      // resp++;
   
        if(fecha[2] == "0"&& fecha[3] == "6"){Mes='Junio_'+ano;} 
        //resp++;
    
       if(fecha[2] == "0"&& fecha[3] == "7"){Mes='Julio_'+ano;} 
       //resp++;
     
       if(fecha[2] == "0"&& fecha[3] == "8"){Mes='Agosto_'+ano;} 
      // resp++;
      
       if(fecha[2] == "0"&& fecha[3] == "9"){Mes='Septiembre_'+ano;}
       //resp++; 
    
       if(fecha[2] == "1"&& fecha[3] == "0"){Mes='Octubre_'+ano;} 
       //resp++;
       
       if(fecha[2] == "1"&& fecha[3] == "1"){Mes='Noviembre_'+ano;} 
       //resp++;
    
       if(fecha[2] == "1"&& fecha[3] == "2"){Mes='Diciembre_'+ano;}  

// console.log(respuesta);
return Mes;
  }
  function getTrasacciones(transaccion, fecha,indice,datos)
  {
  // alert('indice'+indice);
    var retorno=0;
   for(var i=0;i<12;i++){
    //alert('indice'+indice);
     if(fecha==meses[i]){
      //alert('fecha recibidad'+fecha);
      datos[i]=transaccion;
      break ;
    }else{
      if(datos[indice]>0){
        //colores[indice]='rgba(229, 157, 39,2)';
        datos[indice+1]=0;
      }
     
    }
   }
   //alert(datos);
   
  
  return datos;


  }
  function cleanArray(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  //console.log(newArray);
  return newArray;
}

