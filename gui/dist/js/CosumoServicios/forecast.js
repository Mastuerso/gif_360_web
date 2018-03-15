
var fechas=[];
var cont=0;
var token;
$('document').ready(function()
{ 
    webshim.setOptions('forms-ext', {
      replaceUI: 'auto'
  });
webshim.polyfill('forms forms-ext');
  verificar();
  $('#forecastCaptura').hide();
  $('#forecastConsulta').hide();

  //getMerchantSelectF();
  token=sessionStorage.getItem('TOKEN_ID');
  $('#merchants').change(cicloGetforcast);
  $("#forcast").attr('disabled', 'disabled');
 // $("#fechasF").attr('disabled', 'disabled');
});

function verificar(){
  if(sessionStorage.getItem('PROFILE_NAME')){
   // alert('sesion iniciada');
   if (sessionStorage.getItem('tipouser')==3||sessionStorage.getItem('tipouser')==2) {
      if(sessionStorage.getItem('tipouser')==3){
        $('#merchants').append('<option value='+sessionStorage.getItem('merchant')+'>'+sessionStorage.getItem('merchant')+'</option>');

      }else{
        if (sessionStorage.getItem('tipouser')==2) {
          getMerchantSelectF();
        }
      }
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
function mostrarfore(){

  $('#bqPrope').hide();
  $('#titulo').html('Captura Proyección');
   $('#Nivel1T').hide();
  $('#Nivel2T').hide();
  $('#Nivel2V').hide();
  $('#proyeccion').hide();
  $('#Terminos').hide();
  $('#forecastCaptura').hide();
  $('#Panelconfig').hide();
  $('#notimensaje').hide();
  $('#forecastCaptura').show("slow");
}


function getMerchantSelectF(){
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
          //console.log(data);
          for(var i=0;i<data['merchant'].length>0;i++){
             $('#merchants').append('<option value='+data['merchant'][i]['merchantId']+'>'+data['merchant'][i]['merchantId']+'</option>');
             //$('#merchantsC').append('<option value='+data['merchant'][i]['merchantId']+'>'+data['merchant'][i]['merchantId']+'</option>');
          }
                 
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //window.location.href = 'error.html';
           
            console.log(XMLHttpRequest);
             //aux=0;
        }
    });
}
function capturar(){
   $(".se-pre-con").fadeIn("slow");
  var f=$("#fechasF").val();
  //alert(f);
   var nuevaFila='';
f=f.split("-");
//console.log(f);
/*var listMonth = [{
    month:f[1],
    amount:$("#forcast").val(),
    target:$("#objetivo").val()
  }]*/
  var merch=$("#merchants").val();
console.log(merch);
if(($('#fechasF').val().trim() === '') && ($("#forcast").val().trim()==='')&&merch==0){
       $('#mensaje').html('Favor de introducir todos lo datos');
           $('#mensaje').show("slow",function() {
                //alert ('imagen mostrada!');
                  setTimeout(function() {
               $("#mensaje").fadeOut(1500);
                $(".se-pre-con").fadeOut("slow");
                },3000);
                 $(":text").each(function(){ 
                        $($(this)).val('');
                });
              });
}else{

  if(($('#fechasF').val().trim() === '') || ($("#forcast").val().trim()==='')||merch==0){
      $('#mensaje').html('Favor de introducir todos lo datos');
           $('#mensaje').show("slow",function() {
                //alert ('imagen mostrada!');
                  setTimeout(function() {
               $("#mensaje").fadeOut(1500);
                $(".se-pre-con").fadeOut("slow");
                },3000);
                 $(":text").each(function(){ 
                        $($(this)).val('');
                });
              });
         }else{
  var merchant=[{
      merchantId:$("#merchants").val(),
      listMonth:[{
        month:f[1],
        amount:$("#forcast").val(),
        target:0//$("#objetivo").val()
      }]
  }]
var datos = {
        action:"insert",
         rfc:sessionStorage.getItem('rfc'),
         date:f[0],
        merchant:merchant,
        token:token
        
    };

    var aux=datos;
//console.log(aux['merchant'][0]['listMonth'][0]['amount']);

          
console.log(JSON.stringify(datos));
 
  $.ajax({
        url: "http://onikom.technology:8080/MiDataNet/setforecast",
        data: JSON.stringify(datos),
        type: 'POST',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
          console.log(data);
          if(data.success==true){ 

            $('#mensaje').html(data.message);
           $('#mensaje').show("slow",function() {
                //alert ('imagen mostrada!');
                  setTimeout(function() {
               $("#mensaje").fadeOut(1500);
                
                },3000);
                 $(":text").each(function(){ 
                        $($(this)).val('');
                });
              });
              getForcast();
              
            //alert("proceso exitoso");
            
          }else{
             if(data.code==200){
              $('#mensaje').html(data.message);
              $('#mensaje').show(5000,function() {
                //alert ('imagen mostrada!');
                  setTimeout(function() {
               $("#mensaje").fadeOut(1500);
               $(".se-pre-con").fadeOut("slow");
                },3000);
                   $(":text").each(function(){ 
                          $($(this)).val('');
                  });
              });

               //alert("Elemento existente");
             }
          }                 
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //window.location.href = 'error.html';
           if(XMLHttpRequest.status==422){
              modificar();
            // $('#mensaje').html('El dato que usted intenta ingresar ya existente');
            //   $('#mensaje').show(5000,function() {
            //     //alert ('imagen mostrada!');
            //       setTimeout(function() {
            //    $("#mensaje").fadeOut(1500);
            //     },3000);
            //        $(":text").each(function(){ 
            //               $($(this)).val('');
            //       });
            //   });
           }
            //console.log(XMLHttpRequest);
             //aux=0;
        }
    });
    }
 }
}

function mostrarConsulta(){
  $('#forecastCaptura').hide();
  $('#forecastConsulta').show("slow");
}
function modificar(){
    var f=$("#fechasF").val();
  //alert(f);
   var nuevaFila='';
f=f.split("-");
//console.log(f);
/*var listMonth = [{
    month:f[1],
    amount:$("#forcast").val(),
    target:$("#objetivo").val()
  }]*/
  var merch=$("#merchants").val();
var merchant=[{
      merchantId:$("#merchants").val(),
      listMonth:[{
        month:f[1],
        amount:$("#forcast").val(),
        target:0//$("#objetivo").val()
      }]
  }]
var datos = {
        action:"update",
         // rfc:sessionStorage.getItem('rfc'),
         date:f[0],
        merchant:merchant,
        token:token
        
    };
console.log(JSON.stringify(datos));
      $.ajax({
        url: "http://onikom.technology:8080/MiDataNet/setforecast",
        data: JSON.stringify(datos),
        type: 'POST',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
           $('#mensaje').html(data.message);
           $('#mensaje').show("slow",function() {
                //alert ('imagen mostrada!');
                  setTimeout(function() {
               $("#mensaje").fadeOut(1500);
                getForcastActualizado();
                $(".se-pre-con").fadeOut("slow");
                },3000);
                 $(":text").each(function(){ 
                        $($(this)).val('');
                });
              });
          
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //window.location.href = 'error.html';
           if(XMLHttpRequest.status==422){
            $('#mensaje').html('Puede que los datos que intenta actualizar aun no estan registrados');
              $('#mensaje').show(5000,function() {
                //alert ('imagen mostrada!');
                  setTimeout(function() {
               $("#mensaje").fadeOut(1500);
               $(".se-pre-con").fadeOut("slow");
                },3000);
                   $(":text").each(function(){ 
                          $($(this)).val('');
                  });
              });
           }
            //console.log(XMLHttpRequest);
             //aux=0;
        }
    });

}

function getForcast(){
  var f=$("#fechasF").val();
  //alert(f);
   var nuevaFila='';
    f=f.split("-");
      console.log(f);

    var merch=$("#merchants").val();
var merchant=[{
      merchantId:$("#merchants").val()
  }]
var datos = {
       
         // rfc:sessionStorage.getItem('rfc'),
         
        merchant:merchant,
        date:"01"+"/"+f[1]+"/"+f[0],
        token:token
        
    };


    $.ajax({
        url: "http://onikom.technology:8080/MiDataNet/getforecast",
        data: JSON.stringify(datos),
        type: 'POST',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
          // console.log(data['amount']);
          // var tds=$("#tabla tr:first td").length;
          //   var trs=$("#tabla tr").length;

          //  console.log(tds);
          //   for(var i=0;i<tds;i++){
          //      nuevaFila="<tr>";

          //       nuevaFila+="<td>"+(f[1]+"/"+f[0])+"</td>";
          //      //nuevaFila+="<td>"+"  "+"</td>";
          //       nuevaFila+="<td>"+(data['amount'])+"</td>";
          //        nuevaFila+="<td>"+""+"</td>";
          //        // nuevaFila+="<td>"+(aux['merchant'][0]['listMonth'][0]['target'])+"</td>";
          //       nuevaFila+="</tr>";
          //       console.log(nuevaFila)
          //   }    

          //   $("#tabla").append(nuevaFila); 
          cicloGetforcast();  

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //window.location.href = 'error.html';
           if(XMLHttpRequest.status==422){
            $('#mensaje').html('Puede que los datos que intenta actualizar aun no estan registrados');
              $('#mensaje').show(5000,function() {
                //alert ('imagen mostrada!');
                  setTimeout(function() {
               $("#mensaje").fadeOut(1500);
               $(".se-pre-con").fadeOut("slow");
                },3000);
                   $(":text").each(function(){ 
                          $($(this)).val('');
                  });
              });
           }
            //console.log(XMLHttpRequest);
             //aux=0;
        }
    });



}
function getForcastActualizado(){
  //alert("hola");
  var f=$("#fechasF").val();
  //alert(f);
   var nuevaFila='';
    f=f.split("-");
     // console.log(f);

    var merch=$("#merchants").val();
var merchant=[{
      merchantId:$("#merchants").val()
  }]
var datos = {
       
         // rfc:sessionStorage.getItem('rfc'),
         
        merchant:merchant,
        date:"01"+"/"+f[1]+"/"+f[0],
        token:token
        
    };


    $.ajax({
        url: "http://onikom.technology:8080/MiDataNet/getforecast",
        data: JSON.stringify(datos),
        type: 'POST',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
          console.log(data);

          var tdss=$("#tablaFAc tr:first td").length;
            var trs=$("#tablaFAc tr").length;

            console.log(tdss);
            for(var i=0;i<tdss;i++){
              
               nuevaFila="<tr>";

                nuevaFila+="<td>"+(f[1]+"/"+f[0])+"</td>";
               //nuevaFila+="<td>"+"  "+"</td>";
                nuevaFila+="<td>"+(data['amount'])+"</td>";
                 nuevaFila+="<td>"+""+"</td>";
                 // nuevaFila+="<td>"+(aux['merchant'][0]['listMonth'][0]['target'])+"</td>";
                nuevaFila+="</tr>";
                console.log(nuevaFila)
            }   

            $("#tablaFAc").append(nuevaFila);            
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //window.location.href = 'error.html';
           if(XMLHttpRequest.status==422){
            $('#mensaje').html('Puede que los datos que intenta actualizar aun no estan registrados');
              $('#mensaje').show(5000,function() {
                //alert ('imagen mostrada!');
                  setTimeout(function() {
               $("#mensaje").fadeOut(1500);
               $(".se-pre-con").fadeOut("slow");
                },3000);
                   $(":text").each(function(){ 
                          $($(this)).val('');
                  });
              });
           }
            //console.log(XMLHttpRequest);
             //aux=0;
        }
    });



}
function cicloGetforcast(){
$(".se-pre-con").fadeIn("slow");
  //alert("hola hubo un cambio en el select");
  $("#tabla tbody").remove();
  var mesesP=[];
    var c=12;
 

  var paramstr = window.location.search.substr(1);
      var fecha; 
      if(paramstr != null && paramstr.trim() != ''){

        var paramarr = paramstr.split ("&");
        var paramfecha = paramarr[0].split("=");
        fecha = getDaily(paramfecha[1]);

      } else {

        var d = new Date();
        //esto se debe de modificar a 2
       // d.setMonth( d.getMonth() - i);
        var month = d.getMonth() + 1;
        var day = 1;
        //fecha =d.getFullYear()+'-'+ (month<10 ? '0' : '') + month+'-' +(day<10 ? '0' : '') + day;
        fecha =(day<10 ? '0' : '') + day +'/'+ (month<10 ? '0' : '') + month+ '/' + d.getFullYear();
      }
      console.log(fecha);
      //mesesP[i]=fecha;
      //console.log(mesesP)
      //pProyeccionEstimadas(fecha);
        var merchant=[{
        merchantId:$("#merchants").val()
        }]
        var datos = {
               
                 // rfc:sessionStorage.getItem('rfc'),
                merchant:merchant,
                date:fecha,//"01"+"/"+f[1]+"/"+f[0],
                token:token,
                interval:"year"
            };

       $.ajax({
        url: "http://onikom.technology:8080/MiDataNet/getforecast",
        data: JSON.stringify(datos),
        type: 'POST',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
          
          agregar(data,fecha) 
                     
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //window.location.href = 'error.html';
           if(XMLHttpRequest.status==422){
            //$('#mensaje').html('Puede que los datos que intenta actualizar aun no estan registrados');
              /*$('#mensaje').show(5000,function() {
                //alert ('imagen mostrada!');
                  setTimeout(function() {
               $("#mensaje").fadeOut(1500);
               $(".se-pre-con").fadeOut("slow");
                },3000);
                   $(":text").each(function(){ 
                          $($(this)).val('');
                  });
              });*/
           }
            //console.log(XMLHttpRequest);
             //aux=0;
        }
    });


}
function getforcastnextYear(datos){
  var paramstr = window.location.search.substr(1);
      var fecha; 
      if(paramstr != null && paramstr.trim() != ''){

        var paramarr = paramstr.split ("&");
        var paramfecha = paramarr[0].split("=");
        fecha = getDaily(paramfecha[1]);

      } else {

        var d = new Date();
        //esto se debe de modificar a 2
        d.setFullYear( d.getFullYear() +1);
        var month = d.getMonth() + 1;
        var day = 1;
        //fecha =d.getFullYear()+'-'+ (month<10 ? '0' : '') + month+'-' +(day<10 ? '0' : '') + day;
        fecha =(day<10 ? '0' : '') + day +'/'+ (month<10 ? '0' : '') + month+ '/' + d.getFullYear();
      }
      //console.log(fecha);

        var merchant=[{
        merchantId:$("#merchants").val()
        }]
        var datos = {
               
                 // rfc:sessionStorage.getItem('rfc'),
                merchant:merchant,
                date:fecha,//"01"+"/"+f[1]+"/"+f[0],
                token:token,
                interval:"year"
            };

         $.ajax({
        url: "http://onikom.technology:8080/MiDataNet/getforecast",
        data: JSON.stringify(datos),
        type: 'POST',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
                    agregar2(data,fecha);   
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //window.location.href = 'error.html';
           if(XMLHttpRequest.status==422){
            //$('#mensaje').html('Puede que los datos que intenta actualizar aun no estan registrados');
              /*$('#mensaje').show(5000,function() {
                //alert ('imagen mostrada!');
                  setTimeout(function() {
               $("#mensaje").fadeOut(1500);
               $(".se-pre-con").fadeOut("slow");
                },3000);
                   $(":text").each(function(){ 
                          $($(this)).val('');
                  });
              });*/
           }
            //console.log(XMLHttpRequest);
             //aux=0;
        }
    });

}
function agregar(datos,fecha){
var nuevaFila='';
//console.log("holaa");
    nuevaFila+="<tbody>";
    nuevaFila+="<tbody>";
    $("#tabla").append(nuevaFila);
if (datos.length>0) {


      for(var j=0;j<datos.length;j++){

            var tds=$("#tabla tr:first td").length;
            var trs=$("#tabla tr").length;

               //console.log(tds);
                for(var i=0;i<tds;i++){
                   nuevaFila="<tr>";

                    nuevaFila+="<td>"+(datos[j]['date'])+"</td>";
                   //nuevaFila+="<td>"+"  "+"</td>";
                    nuevaFila+="<td>"+(datos[j]['amount'])+"</td>";
                     nuevaFila+="<td>"+""+"</td>";
                     // nuevaFila+="<td>"+(aux['merchant'][0]['listMonth'][0]['target'])+"</td>";
                    nuevaFila+="</tr>";
                    //console.log(nuevaFila)
                }    

                $("#tabla").append(nuevaFila); 
      }
      getforcastnextYear();
    }else{
       $("#tabla tbody").remove();
       getforcastnextYear();
    }
}
function agregar2(datos,fecha){
// var nuevaFila='';
// //console.log("holaa");
//     nuevaFila+="<tbody>";
//     nuevaFila+="<tbody>";
    //$("#tabla").append(nuevaFila);
if (datos.length>0) {


      for(var j=0;j<datos.length;j++){

            var tds=$("#tabla tr:first td").length;
            var trs=$("#tabla tr").length;

               //console.log(tds);
                for(var i=0;i<tds;i++){
                   nuevaFila="<tr>";

                    nuevaFila+="<td>"+(datos[j]['date'])+"</td>";
                   //nuevaFila+="<td>"+"  "+"</td>";
                    nuevaFila+="<td>"+(datos[j]['amount'])+"</td>";
                     nuevaFila+="<td>"+""+"</td>";
                     // nuevaFila+="<td>"+(aux['merchant'][0]['listMonth'][0]['target'])+"</td>";
                    nuevaFila+="</tr>";
                    //console.log(nuevaFila)
                }    

                $("#tabla").append(nuevaFila); 
      }
      
    }else{
       $("#tabla tbody").remove();
       
    }
    $("#forcast").removeAttr("disabled");
    $(".se-pre-con").fadeOut("slow");  
}
// function consultar(){
  

//   var b=[];
//   var f=$("#fechasFc").val();
 
// f=f.split("-");


// var datos = {
        
//         merchant:$("#merchantsC").val() ,
//         date:"01"+"/"+f[1]+"/"+f[0]
        
//     };
// //console.log(datos);
//   $.ajax({
//         url: "http://onikom.com.mx:7001/WSELAVON_NUEVO/forecast?merchant=1&date=01022015",
//         data: datos,
//         type: 'GET',
//         crossDomain: true,
//         dataType: 'json',
//         success: function (data) {
//          console.log(data);

//           for(var i=0;i<data['listMonth'].length>0;i++){
//                    console.log(data['listMonth'][i]['amount'])   
//               //newMerchat[i]=data['merchant'][i]['merchantId'];
//               var u={ 
//               Mes: data['listMonth'][i]['amount'], 
//               Forec: data['listMonth'][i]['month'], 
//               Objec: data['listMonth'][i]['target']};
//               b[i]=u;
//                //cont++;    
//           }
//           $('#forcastT').dynatable({dataset: {records: b}});                
//         },
//         error: function (XMLHttpRequest, textStatus, errorThrown) {
//             //window.location.href = 'error.html';
           
//             console.log(XMLHttpRequest);
//              //aux=0;
//         }
//     });
// }
