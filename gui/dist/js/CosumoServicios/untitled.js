function graficarTransaciones2(){
  console.log(transacciones2);
  var ctx = document.getElementById("barr-chart");
var setsdata=[];

var copia=transacciones2;
   //console.log(transacciones);
   for(var i=0;i<transacciones2.length;i++){

   }
  var sucursales=[];
  var datos2=[];
  var colores=[];
  var border=[];
  var colores2=[];
  var border2=[];
  var indice=0;

  var tam=0;

  
for(i in transacciones2){
        
        var f=2;
        var fechas=[];
        var index=0;
       tam=tam+transacciones2[i].length;
 
        for(j in transacciones2[i]){

          if(typeof  transacciones2[i][f]!== 'undefined'){
            transacciones2[i][f]=getDate2(transacciones2[i][f]);
            fechas[index]=transacciones2[i][f];
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



for(k in transacciones2){
         var d=1;
        var f=2;
        indice=0;
        var datos=[];
        for(t in transacciones2[k]){
          
          sucursales[k]=transacciones2[k][0];
          //alert(sucursales[k]);
         
         if(typeof  transacciones2[k][d]!== 'undefined' && transacciones2[k][0]==sucursales[k]){
        
            datos=getTrasacciones(transacciones2[k][d],transacciones2[k][f],indice,datos);

          }
          if(transacciones2[k][0]=="DIST MURO TEX ZARAGOZA"){
            colores='rgba(27, 179, 188,2)';
            border='rgba(27, 179, 188,2)';
          }else{
            if (transacciones2[k][0]=="MURO TEX OSORIO") {
               colores='rgba(229, 157, 39,2)';
             border='rgba(229,157,39,2)';
            }
          }
              indice++;
              d=d+2;
              f=f+2;
        }
        
      //creando los dataset para cada grafica
       datasetValueT[k] = 
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
        datasets: datasetValueT 
    },
    options: {
      onClick: clickHandler,
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



function pTmonthly(){
 var d = new Date();

var month = d.getMonth()+1;
var day = d.getDate();
var fecha =d.getFullYear()+'-'+ (month<10 ? '0' : '') + month+'-' +(day<10 ? '0' : '') + day;
 var aux=[];
   var merchant = [{
    merchantId:'1000104'},
     {merchantId:'1000236'}
    ];

   var datos = {
        interval:'monthly',
        merchant: merchant,
        rfc:'DMT 070619EE4',
        date:fecha
       
    };
 
    console.log(JSON.stringify(datos));

$.ajax({
        data: JSON.stringify(datos),

        type: 'POST',
        crossOrigin: true,
        crossDomain: true,
        dataType:'json',
        url: "http://onikom.com.mx:7001/MiDataNet/transaction/period",
       headers:{'Authorization':'1945bf68e478c7eca64eb83a4812fab1eb50a52c'},
      success: function(data) {
       console.log(data);
     //copy=data;
     localStorage.setItem("Transa", JSON.stringify(data));
       for(i in data['merchantModel']){
        console.log(localStorage.getItem('Transa'));
        console.log(data['merchantModel'][i]['merchantDesc']);
       }
       for(i in copy['merchantModel']){
                 // alert('hola');
                  aux=[];
                  aux[i]=copy['merchantModel'][i]['merchantDesc'];
                  //console.log('element'+aux);
                  c=1;
                  for(j in copy['merchantModel'][i]['statistic']){
                 
                  aux[c]=copy['merchantModel'][i]['statistic'][j]['amount'];
                  c++;
                  aux[c]=copy['merchantModel'][i]['statistic'][j]['date'];
                  c++;
                   //console.log('contenido'+aux);
                  }
                  //console.log('element final'+aux);
                transacciones2[i]=aux;
               // console.log(transacciones2);
                 
            }
            graficarTransaciones2();
       /*  $.each( data, function(a, item){
            
        // alert('iniciando')
           console.log(item[a]);
          
                 for(i in item['merchantModel']){
                  alert('hola');
                  aux=[];
                  aux[a]=item['merchantModel'][i]['merchantDesc'];
                  console.log('element'+aux);
                  c=1;
                  for(j in item['merchantModel'][i]['statistic']){
                 
                  aux[c]=item['merchantModel'][i]['statistic'][j]['amount'];
                  c++;
                  aux[c]=item['merchantModel'][i]['statistic'][j]['date'];
                  c++;
                   console.log('contenido'+aux);
                  }
                  console.log('element final'+aux);
                transacciones2[i]=aux;
               // console.log(transacciones2);
                 
                }
            });
        
         graficarTransaciones2();*/
        },
        error: function(){
          console.log('Error!');
        }
    });

}


function pDaily(fecha){
   var aux=[];
   var merchant = [{
    merchantId:sessionStorage.getItem('merchant')}
    ]
   var datos = {
        interval: 'daily',
        merchant: merchant,
        date: fecha,
        rfc: sessionStorage.getItem('rfc')
    };
   $.ajax({
        data: JSON.stringify(datos),
        type: 'POST',
        crossDomain: true,
        dataType: 'json',
        url: "http://onikom.com.mx:7001/WSELAVON_NUEVO/transaction/period",

    success: function(data) {
       localStorage.setItem("Transa", JSON.stringify(data));
   
    $.each( data, function(a, item){
   

         for(i in item['branchModel']){
          aux=[];
          aux[a]=item['branchModel'][i]['branchDesc'];
           c=1;
          for(j in item['branchModel'][i]['statistic']){
              aux[c]=item['branchModel'][i]['statistic'][j]['amountTx'];
          c++;
          aux[c]=item['branchModel'][i]['statistic'][j]['date'];
          c++;
          }
          transacciones[i]=aux;
          
         
        }
    });
    console.log(transacciones);
    //console.log('tamano de transacciones'+transacciones.length);
        //graficarTransaciones(); 
              
      //graficarAclaraciones()
    },
    error: function(){
    alert('Error!');
        
     
    }

    });
}

function graficarDaily(){
 
  var ctx = document.getElementById("barr-chart");
var setsdata=[];
  var sucursales=[];
  var datos2=[];
  var colores=[];
  var border=[];
  var colores2=[];
  var border2=[];
  var mount=[];
  var indice=0;
var name=[];
  var tam=0;
  var datos=JSON.stringify({"merchantModel":[ {"merchantDesc": "DIST MURO TEX ZARAGOZA","merchantId": "1000104", "statistic":[{"date": "2016-09-01","amount": 27},{"date": "2016-09-02","amount": 27},{"date": "2016-09-03","amount": 27},{"date": "2016-09-04","amount": 27},{"date": "2016-09-05","amount": 27},{"date": "2016-09-06","amount": 27},{"date": "2016-09-07","amount": 27},{"date": "2016-09-08","amount": 0},{"date": "2016-09-09","amount": 0},{"date": "2016-09-10","amount": 0},{"date": "2016-09-11","amount": 0},{"date": "2016-09-12","amount": 0},{"date": "2016-09-13","amount": 0},{"date": "2016-09-14","amount": 0},{"date": "2016-09-15","amount": 0},{"date": "2016-09-16","amount": 0},{"date": "2016-09-17","amount": 0 },{"date": "2016-09-18","amount": 0},{"date": "2016-09-19","amount": 0},{"date": "2016-09-20","amount": 0},{"date": "2016-09-21","amount": 0},{"date": "2016-09-22","amount": 0},{"date": "2016-09-23","amount": 0},{"date": "2016-09-24","amount": 0},{"date": "2016-09-25","amount": 0},{"date": "2016-09-26","amount": 0},{"date": "2016-09-27","amount": 0},{"date": "2016-09-28","amount": 0},{"date": "2016-09-29","amount": 0},{"date": "2016-09-30","amount": 0}]}]}); 
console.log(JSON.parse(datos));
var dato=JSON.parse(datos);
console.log(dato['merchantModel'][0]['statistic']);
/*for(i in transacciones){
        
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
        for(var a=0;a<fechas.length;a++){
        result=$.inArray(fechas[a],meses)
          if(result==r){
            meses[a]=fechas[a];
          }
        }


}*/
for(k in dato['merchantModel']){

         var d=1;
        var f=2;
        indice=0;
        var datos=[];
        for(t in dato['merchantModel'][k]['statistic']){
          
          name[k]=dato['merchantModel'][k]['merchantDesc'];
         //console.log(name[k]);
          
          if(dato[k]){
            colores='rgba(27, 179, 188,2)';
            border='rgba(27, 179, 188,2)';
          }
              indice++;
              d=d+2;
              f=f+2;
        console.log(dato['merchantModel'][k]['statistic'][k]['amount']);
         mount[t]={
          x:t,
          y:dato['merchantModel'][k]['statistic'][k]['amount'],
          r:8
        };
     
   }

   datasetValueD[k] = 
        {
        label:name[k],
        data:mount,
        backgroundColor: colores,
        borderColor :border,
         borderWidth: 1
        
        }
}


console.log( datasetValueD);

var datas = {datasets: [ 
            {label: 'First Dataset',
            data: [{x: 1,
                    y: 500,
                    r:5
                },
                {
                    x: 14,
                    y: 1100,
                    r:5
                }
               
            ],
            backgroundColor:"#FF6384",
            hoverBackgroundColor: "#FF6384",
        }]
}

//graficando 
var myChart = new Chart(ctx, {
    type: 'bubble',
    data: {datasetValueT},
     options: {
        elements: {
            points: {
                borderWidth: 10,
                borderColor: 'rgb(0, 0, 0)'
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    
                    min: 0,
                    stepSize: 100
                }
            }]
        },
        tooltips: {
        enabled: true,
        mode: 'single',
        callbacks: {
            title: function (tooltipItem, data) { 
                return "Transacción"; 
            },
            label: function(tooltipItems, data) {
                return " " + tooltipItems.yLabel +" ";
            },
            //footer: function (tooltipItem, data) { return "..."; }
        }
    }
        
    }
});
  /*var myChart = new Chart(ctx, {
      type: 'bubble',
      data: {
          labels: meses,
          datasets: datasetValueT 
      },
      options: {
        onClick: clickHandler,
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }, 
         

          
      }
  });*/

}


function getDaily(fecha){
  var fechas= fecha.split("_");
  var Mes='Mes';
    var ano=fechas[1];   
       if(fechas[0] == "Enero"){Mes='0101'+ano;} 
       if(fechas[0] == "Febrero"){Mes='0102'+ano;} 
       if(fechas[0] == "Marzo"){Mes='0103'+ano;} 
      if(fechas[0] == "Abril"){Mes='0104'+ano;}    
       if(fechas[0] == "Mayo"){Mes='0105'+ano;} 
      if(fechas[0] == "Junio"){Mes='0106_'+ano;} 
      if(fechas[0] == "Julio"){Mes='0107'+ano;} 
      if(fechas[0] == "Agosto"){Mes='0108'+ano;} 
      if(fechas[0] == "Septiembre"){Mes='0109'+ano;}
      if(fechas[0] == "Octubre"){Mes='0110'+ano;} 
      if(fechas[0] == "Noviembre"){Mes='0111'+ano;} 
      if(fechas[0] == "Diciembre"){Mes='0112'+ano;}  
return Mes;
}



function graficarTransaciones(){
  //console.log(transacciones);
  var ctx = document.getElementById("bar-chart");
var setsdata=[];

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
           // alert(meses[a]);
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
       datasetValueT[k] = 
        {
        label:sucursales[k],
        data :datos,
        backgroundColor: colores,
        borderColor :border,
         borderWidth: 1
        
        }
   

}

//graficando 
var myChart2 = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: meses,
        datasets: datasetValueT 
    },
    options: {
      onClick: clickHandler,
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



var datas = {datasets: [ 
            {label: 'First Dataset',
            data: [{x: 1,
                    y: 500,
                    r:5
                },
                {
                    x: 2,
                    y: 1100,
                    r:5
                },
               {
                    x: 3,
                    y: 100,
                    r:5
                },
               {
                    x: 4,
                    y: 1200,
                    r:5
                },
                {
                    x: 5,
                    y: 1100,
                    r:5
                },
                {
                    x: 6,
                    y: 1100,
                    r:5
                },
                 {
                    x: 7,
                    y: 1100,
                    r:5
                },
                 {
                    x: 8,
                    y: 1100,
                    r:5
                },
                 {
                    x: 9,
                    y: 1100,
                    r:5
                },
                 {
                    x: 10,
                    y: 1100,
                    r:5
                },
                 {
                    x: 11,
                    y: 1100,
                    r:5
                },
                 {
                    x: 12,
                    y: 1100,
                    r:5
                },
                 {
                    x: 13,
                    y: 1100,
                    r:5
                },
                 {
                    x: 14,
                    y: 1100,
                    r:5
                },
                 { 
                    y: 1100,
                    x: 15,
                   
                    r:5
                },
                 {
                    x: 16,
                    y: 1100,
                    r:5
                },
                 {
                    x: 17,
                    y: 1100,
                    r:5
                },
                 {
                    x: 18,
                    y: 1100,
                    r:5
                },
                 {
                    x: 19,
                    y: 1100,
                    r:5
                },
                 {
                    x: 20,
                    y: 1100,
                    r:5
                },
                  {
                    x: 21,
                    y: 1100,
                    r:5
                },
                 {
                    x: 22,
                    y: 1100,
                    r:5
                },
                 {
                    x: 23,
                    y: 1100,
                    r:5
                },
                 {
                    x: 24,
                    y: 1100,
                    r:5
                },
                 { 
                    y: 1100,
                    x: 25,
                   
                    r:5
                },
                 {
                    x: 26,
                    y: 1100,
                    r:5
                },
                 {
                    x: 27,
                    y: 1100,
                    r:5
                },
                 {
                    x: 28,
                    y: 1100,
                    r:5
                },
                 {
                    x: 29,
                    y: 1100,
                    r:5
                },
                 {
                    x: 30,
                    y: 1100,
                    r:5
                }


            ],
            backgroundColor:"#FF6384",
            hoverBackgroundColor: "#FF6384",
        }]
}

function graficarTransaciones3(){
  console.log(transacciones2);
  var ctx = document.getElementById("bar-chart");
var tamC=0;
  var sucursales=[];
  var datos2=[];
  var colores=[];
  var border=[];
  var colores2=[];
  var border2=[];
  var indice=0;

  var tam=0;
for(i in transacciones2){
        
        var f=2;
        var fechas=[];
        var index=0;
       tam=tam+transacciones2[i].length;
        for(j in transacciones2[i]){
          if(typeof  transacciones2[i][f]!== 'undefined'){
            var auxi=j-1;
            transacciones2[i][f]=getDate2(transacciones2[i][f]);
            fechas[index]=transacciones2[i][f];
            meses[auxi]=fechas[index];
            index++;    
          }   
              f=f+2;
        }
        var result;
        var r=-1;
        for(var a=0;a<fechas.length;a++){
        result=$.inArray(fechas[a],meses)
          if(result==r){
            meses[a]=fechas[a];
            }
        }
}
for(k in transacciones2){
         var d=1;
        var f=2;
        indice=0;

        var datos=[];
        for(t in transacciones2[k]){
         sucursales[k]=transacciones2[k]['merchantModel'];
                
         if(typeof  transacciones2[k][d]!== 'undefined' && transacciones2[k]['merchantModel']==sucursales[k]){
              t=t-1;
            datos[t]=transacciones2[k][d];//getTrasacciones2(transacciones2[k][d],transacciones2[k][f],indice,datos);
         }
          if(transacciones2[k]['merchantModel']){
           if(k<4){
            colores=Araycolores[k];
            border=Araycolores[k];
           }else{
            if(tamC<4){
              colores=Araycolores[tamC];
              border=Araycolores[tamC];
              tamC++;
            }else{
              tamC=0;
              colores=Araycolores[tamC];
              border=Araycolores[tamC];
              tamC++;
            }
            
           }
            
          }
              indice++;
              d=d+2;
              f=f+2;
        }
        
        console.log(datos);
        datasetValueT[k] = 
        {
        label:sucursales[k],
        data :datos,
        backgroundColor: colores,
        borderColor :border,
         borderWidth: 1
        }
   

}
var myChart = new Chart(ctx, {
    type:'bar',
    data: {
        labels: meses,
        datasets: datasetValueT 
    },
    options: {
      onClick: clickHandler,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }, 
       

        
    }
});
transacciones2=[];

}
