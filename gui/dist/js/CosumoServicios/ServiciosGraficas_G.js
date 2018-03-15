/*
 delegados y staff no van
*/
var tickesNoAprobados = [];
var posicionActual= "";
var idTicketGlobal = 0;
var dataImpres=[];

$('document').ready(function() { 
    token = sessionStorage.getItem('TOKEN_ID');
	$("#btn_update").hide();
	
	
	ocultarTodo();
    verificarSesion();
    $('#Panelconfig').hide();
    $("#btn_5").on("click", btn_5);
    $("#btn_4").on("click", btn_4);
    $("#btn_3").on("click", btn_3);
    $("#btn_2").on("click", btn_2);
    $("#btn_1").on("click", btn_1);
	$("#regresarCategoria").on("click",btn_3);
	$("#regresarmarca").on("click",btn_4);
    $("#nueva_categoria").on("click", nueva_categoria);
    $("#nueva_marca").on("click", nueva_marca);
    $("#btn_10").on("click",btn_10);
    $("#btn_busqMasFiltros").on("click",mostrarmas);
    $("#btn_busqProductos").on("click",filtros);
    $("#btn_busqCategoria").on("click",filtroCategorias);
	$("#btn_busqMarca").on("click",filtroMarcas);
	
	//validarUsuario();
	consultaruser();
	direccionmarca(1);
    $("#btn_buscaType").on("click", buscarType);
    $("#btn_ImprimirMult").on("click",imprimirMultiples);
    $("#btn_busqGafete").on("click",busqueGafete);
	$("#btn_ImprimirGaf").on("click",imprimirGafet);
	$("#btn_rgis").on("click",registroGafete);
	$("#btn_EdtRegist").on("click", actualizarGafete);
	$("#btn_update").on("click",updateGafet);
	//obtenerPabellones();
	//llenarImpresora();
	
	$(".se-pre-con").fadeOut("slow");
	$("#selectPabellonImp").change(llenarCompany);
	
	$("#Impresoras").change(function(){
		closActualizar();	
		$("#btn_ImprimirGaf").show("slow");
	});

	$("#ImpresorasMult").change(function(){
		$("#btn_ImprimirMult").show("slow");
		var impresora = $("#Impresoras").val();
		sessionStorage.setItem("impresoraDefaultMulti",impresora);
	});
});

/*Modal*/
$(document).ready(function(){
    $(document).on("click", ".openlink", function(){
        var imagePath = $(this).find("img").attr("src");
        $(".selectedImage").attr('src',imagePath);
    });
});
/*Paginador*/
function Pager(tableName, itemsPerPage) {
    this.tableName = tableName;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.pages = 0;
    this.inited = false;
    
    this.showRecords = function(from, to) {        
        var rows = document.getElementById(tableName).rows;
        // i starts from 1 to skip table header row
        for (var i = 1; i < rows.length; i++) {
            if (i < from || i > to)  
                rows[i].style.display = 'none';
            else
                rows[i].style.display = '';
        }
    }
    
    this.showPage = function(pageNumber) {
    	if (! this.inited) {
    		alert("not inited");
    		return;
    	}

        var oldPageAnchor = document.getElementById('pg'+this.currentPage);
       oldPageAnchor.className = 'pg-normal';
        
        this.currentPage = pageNumber;
        var newPageAnchor = document.getElementById('pg'+this.currentPage);
        newPageAnchor.className = 'pg-selected';
        
        var from = (pageNumber - 1) * itemsPerPage + 1;
        var to = from + itemsPerPage - 1;
        this.showRecords(from, to);
    }   
    
    this.prev = function() {
        if (this.currentPage > 1)
            this.showPage(this.currentPage - 1);
    }
    
    this.next = function() {
        var rows = document.getElementById(tableName).rows;
        var records = (rows.length - 1); 
        this.pages = Math.ceil(records / itemsPerPage);
        if (this.currentPage < this.pages) {
            this.showPage(this.currentPage + 1);
        }
    }                        
    
    this.init = function() {
        var rows = document.getElementById(tableName).rows;
        var records = (rows.length - 1); 
        this.pages = Math.ceil(records / itemsPerPage);
        this.inited = true;
    }

    this.showPageNav = function(pagerName, positionId) {
    	if (! this.inited) {
    		alert("not inited");
    		return;
    	}
    	var element = document.getElementById(positionId);
    	
    	var pagerHtml = '<span onclick="' + pagerName + '.prev();" class="pg-normal"> &#171 Prev </span> | ';
        for (var page = 1; page <= this.pages; page++) 
            pagerHtml += '<span id="pg' + page + '" class="pg-normal" onclick="' + pagerName + '.showPage(' + page + ');">' + page + '</span> | ';
        pagerHtml += '<span onclick="'+pagerName+'.next();" class="pg-normal"> Next &#187;</span>';            
        
        element.innerHTML = pagerHtml;
    }
}

/*Activa los menus*/
function showProductos(){
    document.getElementById("productosSubmenu").classList.toggle("show");
}
function showCatalogos(){
    document.getElementById("catalogosSubmenu").classList.toggle("show");
}
window.onclick = function(event) {
  if (!event.target.matches('.mp')) {

    var dropdowns = document.getElementsByClassName("opcionp");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
}
if (!event.target.matches('.mc')) {
  var dropdowns = document.getElementsByClassName("opcionc");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function validarUsuario(){
	var usuario = sessionStorage.getItem("tipoUsuario");
	if(usuario == 0){
		$("#btn_5").on("click", btn_5);
		$("#btn_4").on("click", btn_4);
		$("#btn_3").on("click", btn_3);
		$("#btn_2").on("click", btn_2);
		$("#btn_1").on("click", btn_1);
		$('#Nivel1T').show();
	}else if(usuario == 1){
		$("#btn_5").hide();
		$("#btn_4").on("click", btn_4);
		$("#btn_3").hide();
		$("#btn_2").hide();
		$("#btn_1").on("click", btn_1);
		$('#Nivel1T').show();
	}else if(usuario == 4){
		$("#btn_5").on("click", btn_5);
		$("#btn_4").hide();
		$("#btn_2").on("click", btn_2);
		$("#btn_1").hide();
		$("#Nivel1T").hide();
		$("#RegistroVIP").show();
	}
}
					

function ocultarTodo(){
	 $('#Nivel1T').hide();
    $('#Nivel2V').hide();
    $('#proyeccion').hide();
    $('#Terminos').hide();
    $("#typeCredit").hide();
    $('#AdminTickets').hide();
    $('#AdminTicketsApro').hide();
    $('#AdminReportes').hide();
    $('#AdminTicketsApro').hide();
	$('#BusquedaCompaniaFac').hide();
	$('#DetalleClienteFac').hide();
    $('#DetalleTicket').hide();
    $('#DetalleCliente').hide();
    $('#Panelconfig').hide();
	$("#RegistroVIP").hide();
    $("#ImpresionGafete").hide();
    $("#ImpresionGafeteMultiple").hide();
    $("#Productos").hide();
    $("#ConsultarMarcas").hide();
    $("#ConsultarCategorias").hide();
    $("#CrearCategoria").hide();
	$("#Productos").hide();
	$("#actualizarproducto").hide();
	$("#registrarusuario").hide();
	$("#actualizarProductos").hide();
	$("#actualizarProductos").hide();
	$("#nuevamarca").hide();
	$("#actualizarmarca").hide();
	$("#detalledelproducto").hide();
	$("#registrarnuevamarca").hide();
	$("#modificarcategoriaparcial").hide();
	$("#modificarcategoriatotal").hide();
	$("#modificarmarcaparcial").hide();
	$("#modificarmarcatotal").hide();
}

function direccionmarca(flujo){
	if(flujo==1){
		$("#modificarmarcatotal").show("slow");
	}else{
		$("#modificarmarcaparcial").show("slow");
	}
}

function btn_1(){
	 ocultarTodo();
	$("#Nivel1T").show("slow");
}

function most(){
	ocultarTodo();
	$("#RegistroVIP").show("slow");
}

function nuevamar(){
	ocultarTodo();
	$("#registrarnuevamarca").show("slow");
}

function guardarnuevamarca(){
	
	var Descripcionmarca=$("#Descripcionnuevo").val();
	var Clavemarca=$("#Clavenuevo").val();
	var Equivalenciaml=$("#equivalenciamlnuevamarca").val();
	var Equivalenciaamz=$("#equivalenciaamznuevamarca").val();
	var datos = {
		descripcion:Descripcionmarca,
		clave:Clavemarca,
		equivalenciamlid:Equivalenciaml,
		equivalenciaamzid:Equivalenciaamz
	};
								
	$.ajax({
							
		 beforeSend: function(xhrObj){
			xhrObj.setRequestHeader("Content-Type","application/json");
			xhrObj.setRequestHeader("Authorization","bearer"+(window.onload =(localStorage.getItem("token"))));
		},
					
			type: 'POST',
			crossDomain: true,
			url: 'http://onikom.technology:8080/GestionComerServer/brand/new',
			dataType: 'json',
			contentType: 'application/json ; charset=utf-8',
			data: JSON.stringify(datos),
    		success: function(response) {
				console.log('la insercion fue:'+JSON.stringify(response));
				ocultarTodo();	
			 },
			error: function(error) {
			alert("Failed." + error);
			console.log(error);
		 	}
	});

}

function mostrardetallesproductos(idbuscar){
	ocultarTodo();
	$("#detalledelproducto").show("slow");
	var datos = {
		
	};
	
	$.ajax({
		
				 beforeSend: function(xhrObj){
						xhrObj.setRequestHeader("Content-Type","application/json");
				},
		
				type: 'GET',
				crossDomain: true,
				url: 'http://onikom.technology:8080/GestionComerServer/product/'+idbuscar,
				dataType: 'json',
				contentType: 'application/json ; charset=utf-8',
				data: JSON.stringify(datos),
				   success: function(response) {
					//console.log('los datos son:'+JSON.stringify(response));
					if(response.d !== null){
						$("#tabladetalles1 tbody").remove();
						$("#tabladetalles2 tbody").remove();
						$("#tabladetalles3 tbody").remove();
						d ="<tbody>" ;
						d1="<tbody>" ;
						d2="<tbody>" ;

						for(var dato in response){
							

							var detalles= response.productodetalle[0];
							
							if(dato=="productometricas"){
								//console.log(dato + ": " + response[dato].mejorprecio +"-----" );
								d+= '<tr>'+
									'<td>'+null+'</td>'+
									'<td>'+null+'</td>'+
									'<td>'+null+'</td>'+
									'<td>'+null+'</td>'+
									
									'<td>'+response[dato].provmejorprecio+'</td>'+
									'<td>'+response[dato].mejorprecio+'</td>'+
									'<td>'+response[dato].provmayorstock+'</td>'+
									'<td>'+response[dato].mayorstock+'</td>'+
								'</tr>';
								d1+= '<tr>'+
									'<td>'+response[dato].provmasventas+'</td>'+
									'<td>'+response[dato].totalstock+'</td>'+
									'<td>'+response[dato].totalvtassempro+'</td>'+
									'<td>'+null+'</td>'+
									
									'<td>'+response[dato].ultactproducto+'</td>'+
									'<td>'+null+'</td>'+
									'<td>'+null+'</td>'+
									'<td>'+null+'</td>'+
								'</tr>';


							}
							if(dato=="productodetalle"){
								//console.log(dato + ": "+detalles.marcaprodprov+"-----" );
								d2+= '<tr>'+
									'<td>'+null+'</td>'+
									'<td>'+' <button  class="boton_personalizado" id='+detalles.codbarrasprodprov+' type="button" style="width:85px; height:22px" >Ver</button>'+'</td>'+
									'<td>'+detalles.codigofabricante+'</td>'+
									'<td>'+detalles.codbarrasprodprov+'</td>'+
									'<td>'+detalles.descprodprov+'</td>'+
									'<td>'+detalles.marcaprodprov+'</td>'+
									'<td>'+null+'</td>'+
									'<td>'+detalles.sucursalprodprov+'</td>'+
									'<td>'+detalles.precioprodprov+'</td>'+
									'<td>'+' <button  class="boton_personalizado" id='+detalles.codbarrasprodprov+' type="button" style="width:85px; height:22px" >Más</button>'+'</td>'+
									'<td>';
								d2+='</td>'+'</tr>';
									
							}
						}	
						d+="</tbody>";
						d1+="</tbody>";
						d2+="</tbody>";
						$("#tabladetalles1").append(d);
						$("#tabladetalles2").append(d1);
						$("#tabladetalles3").append(d2);
					}
						
				   },
				error: function(error) {
					alert("Failed." + error);
					console.log(error);
				 }
			 });
}




var a=1;
var b=1;
var c=0;

function subcategory(){
	/*var datos = {
		categoriaid:1
	};
	
	$.ajax({
		beforeSend: function(xhrObj){
			xhrObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		},

		type: 'POST',
		crossDomain: true,
		url: 'http://onikom.technology:8080/GestionComerServer/category',
		dataType: 'json',
		contentType: 'application/x-www-form-urlencoded ; charset=utf-8',
		data: JSON.stringify(datos),
       	success: function(response) {
			if(response.d !== null){
				var d ="";

				if(c==1){
				for(var dato in response){
					d+="<option value=\""+response[dato].descripcion+"\">"+response[dato].descripcion+"</option>";					
				}
				c=0;
				}
				$("#subcategoria").append(d);
				d="";	
				}
		
       	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
     	}
 	});*/	
}




function mostrarcategorias(){
	 var datos = {
		
	};
	
	$.ajax({
		type: 'GET',
		crossDomain: true,
		url: 'http://onikom.technology:8080/GestionComerServer/category',
       	success: function(response) {
			
			if(response.d !== null){
				var d ="";

				if(b==1){
				for(var dato in response){
					d+="<option value=\""+response[dato].descripcion+"\">"+response[dato].descripcion+"</option>";					
				}
				b=0;
				}
				$("#categoria").append(d);
				d="";	
				}
		
       	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
     	}
 	});
}

function enviardatosregistro(){
	
	
	var Nombre=$("#nombreregistro").val()
	var Apellidos=$("#apellidoregistro").val()
	var Email=$("#emailregistro").val()
	var Password=$("#passwordregistro").val()
	var Fecha=$("#fechanacimientoregistro").val()
	var Genero=$("#genero").val()
	var Telefono=$("#telefonoregistro").val()
	var Edad=parseInt($("#edadregistro").val()) 
	var IDROL=parseInt($("#idrol").val())
	

	//alert(Nombre+" "+ Apellidos +" "+ Email +" "+Password +" " +Fecha +" "+Telefono+" "+Edad+" "+Genero+" "+(IDROL+5) );
	//alert("este es el token --> "+ (window.onload =(localStorage.getItem("token"))));
	
	var datos = {
		nombre:Nombre,
		apellidos:Apellidos,
		email:Email,
		password:Password,
		fecnacimiento:Fecha,
		genero:Genero,
		telefono:Telefono,
		edad:Edad,
		idrol:IDROL
	};
	
	$.ajax({

		 beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Authorization","bearer"+(window.onload =(localStorage.getItem("token"))));
        },

		type: 'POST',
		crossDomain: true,
		url: 'http://onikom.technology:8080/GestionComerServer/user/',
		dataType: 'json',
		contentType: 'application/json ; charset=utf-8',
		data: JSON.stringify(datos),
       	success: function(response) {
			//console.log('los datos son:'+JSON.stringify(response));
			ocultarTodo();	
       	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
     	}
 	});
}


function registrarusuario(){
	ocultarTodo();
	$("#registrarusuario").show("slow");
}

function mostrarmas(){
	mostrarcategorias();
	//subcategory();
	ocultarTodo();
	 $("#Productos").show("slow");
	 var datos = {
		
	};
	
	$.ajax({
		type: 'GET',
		crossDomain: true,
		url: 'http://onikom.technology:8080/GestionComerServer/brand',
       	success: function(response) {
			if(response.d !== null){
				var d ="";

				if(a==1){
				for(var dato in response){
					d+="<option value=\""+response[dato].descripcion+"\">"+response[dato].descripcion+"</option>";					
				}
				a=0;
				}
				$("#marca").append(d);
				d="";	
				}
		
       	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
     	}
 	});



}

function llenarCategorias(){
	$.ajax({

		type: 'GET',
		crossDomain: true,
		url: 'http://onikom.technology:8080/GestionComerServer/category',
		dataType: 'json',
		contentType: 'application/json ; charset=utf-8',
       	success: function(response) {
			//console.log('los datos son:'+JSON.stringify(response));
			
			$("#tablaCategoria tbody").remove();
			var d="";

			if(response.d !== null){
		
				d ="<tbody>" ;


				for(var dato in response){
					//console.log('los datos son:'+response[dato].categoriaid+"  "+ response[dato].indtipo);
					d+= '<tr>'+'<td>';
					if(response[dato].imagen!=null && response[dato].imagen!=''){
						d+='<a href="#openModal" class="openlink"><button  class="boton_personalizado" id="ver" type="button" style="width:85px; height:22px" >Ver</button>'
						+'<div class="service"><img class ="imgOculta" src="'+response[dato].imagen/*'http://icisa.cag.gov.in/images/no-image.png'*/+'"></div></a>';
					}
					d+='</td>'+
					'<td>'+response[dato].clave+'</td>'+
					'<td>'+response[dato].descripcion+'</td>'+
					'<td>'+response[dato].costoenvioml+'</td>'+
					'<td>'+response[dato].costoenvioamz+'</td>'+
					'<td>'+response[dato].equivalenciamlid+'</td>'+
					'<td>'+response[dato].categoriaamzid+'</td>'+ 
					'<td>'+' <button  class="boton_personalizado" onclick="definircategoria(\''+response[dato].indtipo+'\',\''+response[dato].categoriaid+'\');" id="actualizar" type="button" style="width:85px; height:22px" >Actualizar</button>'+'</td>'+
					'<td>';
					if(response[dato].indtipo==1){
						d+=' <button  class="boton_red" id="eliminar" type="button" style="width:65px; height:22px" >Borrar</button>';
					}
					d+='</td>'+'</tr>';
				}	
				d+="</tbody>"
				$("#tablaCategoria").append(d);
		        var pager = new Pager('tablaCategoria', 10); 
		        pager.init(); 
		        pager.showPageNav('pager', 'pageNavPosition'); 
		        pager.showPage(1);
			}

		
       	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
     	}
 	});
	document.getElementById("filtroCategorias").value="";

}

function actualizarcategory(){
	

	var img=$("#imgenparcial").val();
	var Categoriadesc=$("#parcialcategoriades").val();
	var Clave=$("#claveparcial").val();
	var Costoml=$("#parcialcostoml").val();
	var Costoamz=$("#parcialcostoamz").val();
	var Categoriml=$("#parcialcategoriaml").val();
	var Categoriaamz=$("#parcialcategoriaamz").val();
	var Categoriapadre=$("#parcialpadre").val();
	var Categoriaid=$("#aux1parcial").val();
	var Indtipo=$("#aux2parcial").val();
	
	if(img==""){
		img=null;
	}
	if(Categoriml==""){
		Categoriml=null;
	}
	if(Categoriaamz==""){
		Categoriaamz=null;
	}
	if(Categoriapadre==""){
		Categoriapadre=null;
	}
	var datos = {
		categoriaid:Categoriaid,
		descripcion:Categoriadesc,
		costoenvioml:Costoml,
		costoenvioamz:Costoamz,
		clave:Clave,
		indtipo:Indtipo,
		equivalenciamlid:Categoriml,
		categoriaamzid:Categoriaamz,
		imagen:img,
		categoriapadreid:Categoriapadre	
									
	};

	$.ajax({
		
				 beforeSend: function(xhrObj){
						xhrObj.setRequestHeader("Content-Type","application/json");
						xhrObj.setRequestHeader("Authorization","bearer"+(window.onload =(localStorage.getItem("token"))));
				},
		
				type: 'PUT',
				crossDomain: true,
				url: 'http://onikom.technology:8080/GestionComerServer/category/update',
				dataType: 'json',
				contentType: 'application/json ; charset=utf-8',
				data: JSON.stringify(datos),
				   success: function(response) {
					console.log('la insercion fue:'+JSON.stringify(response));
					ocultarTodo();	
				   },
				error: function(error) {
					alert("Failed." + error);
					console.log(error);
				 }
			 });




	//aquiestoy
}



function modificattotalcategoria(){
	
	var img=$("#totalimagen").val();
	var Clave=$("#totalcalve").val();
	var Categoriadesc=$("#totalcategoria").val();
	var Costoml=$("#totalcostoml").val();
	var Costoamz=$("#totalcostoamz").val();

	var Categoriml=$("#totalcategoriaml").val();
	var Categoriaamz=$("#totalcategoriaamz").val();
	var Categoriapadre=$("#totalpadre").val();
	var Categoriaid=$("#aux1").val();
	var Indtipo=$("#aux2").val();
	if(img==""){
		img=null;
	}
	if(Categoriml==""){
		Categoriml=null;
	}
	if(Categoriaamz==""){
		Categoriaamz=null;
	}
	if(Categoriapadre==""){
		Categoriapadre=null;
	}


	var datos = {
		categoriaid:Categoriaid,
		descripcion:Categoriadesc,
		costoenvioml:Costoml,
		costoenvioamz:Costoamz,
		clave:Clave,
		indtipo:Indtipo,
		equivalenciamlid:Categoriml,
		categoriaamzid:Categoriaamz,
		imagen:img,
		categoriapadreid:Categoriapadre	
									
	};
////78
	$.ajax({
		
				 beforeSend: function(xhrObj){
						xhrObj.setRequestHeader("Content-Type","application/json");
						xhrObj.setRequestHeader("Authorization","bearer"+(window.onload =(localStorage.getItem("token"))));
				},
		
				type: 'PUT',
				crossDomain: true,
				url: 'http://onikom.technology:8080/GestionComerServer/category/update',
				dataType: 'json',
				contentType: 'application/json ; charset=utf-8',
				data: JSON.stringify(datos),
				   success: function(response) {
					console.log('la insercion fue:'+JSON.stringify(response));
					ocultarTodo();	
				   },
				error: function(error) {
					alert("Failed." + error);
					console.log(error);
				 }
			 });								
}


function actualizacioncategoriatotal(idproducto){
	var datos={categoriaid:idproducto};
	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: 'http://onikom.technology:8080/GestionComerServer/category/buscar',
		dataType: 'json',
		contentType: 'application/x-www-form-urlencoded',
		data: datos,
       	success: function(response) {
			console.log('los datos son:'+JSON.stringify(response));
			if(response.d !== null){

				for(var dato in response){
					//console.log("la imagen es " + response.categoriaid);

					$("#totalimagen").val(response.imagen);
					$("#totalcalve").val(response.clave);
					$("#totalcategoria").val(response.descripcion);
					$("#totalcostoml").val(response.costoenvioml);
					$("#totalcostoamz").val(response.costoenvioamz);
					$("#totalcategoriaml").val(response.equivalenciamlid);
					$("#totalcategoriaamz").val(response.categoriaamzid);
					$("#totalpadre").val(response.categoriapadreid);
					$("#aux1").val(response.categoriaid);
					$("#aux2").val(response.indtipo);
				}
				
			}		
       	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
     	}
 	});
}



function actualizacioncategoriaparcial(idproducto){
	
	var datos={categoriaid:idproducto};
	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: 'http://onikom.technology:8080/GestionComerServer/category/buscar',
		dataType: 'json',
		contentType: 'application/x-www-form-urlencoded',
		data: datos,
       	success: function(response) {
			console.log('los datos son:'+JSON.stringify(response));
			d ="<tbody>" ;
			
			d+= '<tr>';
			
			if(response.d !== null){

					$("#imgenparcial").text(response.imagen);
					$("#claveparcial").text(response.clave);
					$("#parcialcategoriades").text(response.descripcion);
										
					

					$("#parcialcostoml").val(response.costoenvioml);
					$("#parcialcostoamz").val(response.costoenvioamz);
					$("#parcialcategoriaml").val(response.equivalenciamlid);
					$("#parcialcategoriaamz").val(response.categoriaamzid);
					$("#parcialpadre").val(response.categoriapadreid);
					$("#aux1parcial").val(response.categoriaid);
					$("#aux2parcial").val(response.indtipo);
				
				
			}		
       	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
     	}
 	});
	
}

function definircategoria(direccionamient, idproducto){
	//alert("este es mi id"+ idproducto +"este es la direccion " + direccionamient);
	
	if(direccionamient=="1"){
		//alert("es total");
		ocultarTodo();
		$("#modificarcategoriatotal").show("slow");
		actualizacioncategoriatotal(idproducto);
	}else{
		//alert("es parcial");
		ocultarTodo();
		$("#modificarcategoriaparcial").show("slow");
		actualizacioncategoriaparcial(idproducto);
	}
}





function filtroCategorias(){
	var Categoria=$("#filtroCategorias").val();
	var datos={categoria:Categoria};
	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: 'http://onikom.technology:8080/GestionComerServer/category',
		dataType: 'json',
		contentType: 'application/x-www-form-urlencoded',
		data: datos,
       	success: function(response) {
			//console.log('los datos son:'+JSON.stringify(response));
			
			$("#tablaCategoria tbody").remove();
			var d="";
			if(response.d !== null){

				d ="<tbody>" ;


				for(var dato in response){
					//console.log(dato + ": " + response[dato].descripcion +" " + response[dato].clave);
					d+= '<tr>'+'<td>';
					if(response[dato].imagen!=null && response[dato].imagen!=''){
						d+='<a href="#openModal" class="openlink"><button  class="boton_personalizado" id="ver" type="button" style="width:85px; height:22px" >Ver</button>'
						+'<div class="service"><img class ="imgOculta" src="'+response[dato].imagen/*'http://icisa.cag.gov.in/images/no-image.png'*/+'"></div></a>';
					}
					d+='</td>'+
					'<td>'+response[dato].clave+'</td>'+
					'<td>'+response[dato].descripcion+'</td>'+
					'<td>'+response[dato].costoenvioml+'</td>'+
					'<td>'+response[dato].costoenvioamz+'</td>'+
					'<td>'+response[dato].equivalenciamlid+'</td>'+
					'<td>'+response[dato].categoriaamzid+'</td>'+
					'<td>'+' <button  class="boton_personalizado" onclick="definircategoria(\''+response[dato].indtipo+'\',\''+response[dato].categoriaid+'\');" id="actualizar" type="button" style="width:85px; height:22px" >Actualizar</button>'+'</td>'+
					'<td>';
					if(response[dato].indtipo==1){
						d+=' <button  class="boton_red" onclick="eliminarregistrocategoria(\''+response[dato].categoriaid+'\');" id="eliminar" type="button" style="width:65px; height:22px" >Borrar</button>';
					}
					d+='</td>'+'</tr>';
				}	
				d+="</tbody>"
				$("#tablaCategoria").append(d);
		        var pager = new Pager('tablaCategoria', 10); 
		        pager.init(); 
		        pager.showPageNav('pager', 'pageNavPosition'); 
		        pager.showPage(1);
			}	
		
       	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
     	}
 	});

}
////////////////////////////////////////////////////////////////////////////javier
function eliminarregistromarca(idelimina){
	alert("eliminar marca " + idelimina);
	var datos = {};
	
$.ajax({
		
	beforeSend: function(xhrObj){
		xhrObj.setRequestHeader("Content-Type","application/json");
		xhrObj.setRequestHeader("Authorization","bearer"+(window.onload =(localStorage.getItem("token"))));
	},

	type: 'DELETE',
	crossDomain: true,
	url: 'http://onikom.technology:8080/GestionComerServer/brand?marcaid='+idelimina,
	dataType: 'json',
	contentType: 'application/json ; charset=utf-8',

	success: function(response) {
		console.log('la insercion fue:'+JSON.stringify(response));
		ocultarTodo();	
	},
	error: function(error) {
		alert("Failed." + error);
		console.log(error);
	}
	});
}
function eliminarregistrocategoria(idelimina){
				var datos = {};
						
		$.ajax({
							
		 beforeSend: function(xhrObj){
			xhrObj.setRequestHeader("Content-Type","application/json");
			xhrObj.setRequestHeader("Authorization","bearer"+(window.onload =(localStorage.getItem("token"))));
		},
					
			type: 'DELETE',
			crossDomain: true,
			url: 'http://onikom.technology:8080/GestionComerServer/category?categoriaid='+idelimina,
			dataType: 'json',
			contentType: 'application/json ; charset=utf-8',
			
    		success: function(response) {
				console.log('la insercion fue:'+JSON.stringify(response));
				ocultarTodo();	
			 },
			error: function(error) {
			alert("Failed." + error);
			console.log(error);
		 	}
	});
}


function nueva_categoria(){
 	ocultarTodo();
    $("#CrearCategoria").show("slow");
	llenarCategoriaAmz();
	llenarpadre();
}


function llenarpadre(){
	var datos = {
		
	};
	
	$.ajax({
		type: 'GET',
		crossDomain: true,
		url: 'http://onikom.technology:8080/GestionComerServer/category/modificables',
       	success: function(response) {
			
			if(response.d !== null){
				var d ="";

				if(b==1){
				for(var dato in response){
					d+="<option value=\""+response[dato].descripcion+"\">"+response[dato].descripcion+"</option>";					
				}
				b=0;
				}
				$("#categoriapadre").append(d);
				d="";	
				}
		
       	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
     	}
 	});
}

function guard(){
	
}
function guardarnuevacategoria(){
	
	
	var Clave = $("#claveCategoria").val();
	var Descripcion=$("#descCategoria").val(); 
	var img=$("#imgCategoria").val();
	var Costoml=$("#costoEnvioMLCategoria").val();
	var Costoamz=$("#costoEnvioAMZCategoría").val();
	var Categoriaml=$("#categoriaML").val();
	var Categoriaamz=$("input[name=amazoncategoria]").val();
	var Categoriapadre=$("input[name=categoriapadre]").val();
	var datos = {	
	};
	$.ajax({
		type: 'GET',
		crossDomain: true,
		url: 'http://onikom.technology:8080/GestionComerServer/category_amz',
       	success: function(response) {
			console.log('la insercion fue:'+JSON.stringify(response));
			if(response.d !== null){
				
				for(var dato in response){
					
					if(Categoriaamz==response[dato].nodepath){
						Categoriaamz=response[dato].categoriaamzid;						
						var datos = {
							descripcion:Descripcion,
							costoenvioml:Costoml,
							costoenvioamz:Costoamz,							
							clave:Clave,
							categoriaamzid:Categoriaamz,
							equivalenciamlid:Categoriaml,
							imagen:img,
							categoriapadreid:Categoriapadre						
						};
						
		$.ajax({
							
		 beforeSend: function(xhrObj){
			xhrObj.setRequestHeader("Content-Type","application/json");
			xhrObj.setRequestHeader("Authorization","bearer"+(window.onload =(localStorage.getItem("token"))));
		},
					
			type: 'POST',
			crossDomain: true,
			url: 'http://onikom.technology:8080/GestionComerServer/category/new',
			dataType: 'json',
			contentType: 'application/json ; charset=utf-8',
			data: JSON.stringify(datos),
    		success: function(response) {
				console.log('la insercion fue:'+JSON.stringify(response));
				ocultarTodo();	
			 },
			error: function(error) {
			alert("Failed." + error);
			console.log(error);
		 	}
	});

						
					}
					
				}
			
				
		
				}
		
       	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
     	}
 	});
	
	
	
	



}


function llenarCategoriaAmz(){
	//alert("hola");
	var datos = {
		
	};
	
	$.ajax({
		type: 'GET',
		crossDomain: true,
		url: 'http://onikom.technology:8080/GestionComerServer/category_amz',
       	success: function(response) {
			
			if(response.d !== null){
				var d ="";

				for(var dato in response){
					d+="<option value=\""+response[dato].nodepath+"\">"+response[dato].nodepath+"</option>";					
				
				}
		
				$("#amazoncategoria").append(d);
				d="";	
				}
		
       	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
     	}
 	});
}

function llenarMarcas(){
	$.ajax({

		type: 'GET',
		crossDomain: true,
		url: 'http://onikom.technology:8080/GestionComerServer/brand',
		dataType: 'json',
		contentType: 'application/json ; charset=utf-8',
       	success: function(response) {
			//console.log('los datos son:'+JSON.stringify(response));
			
			$("#tablaMarcas tbody").remove();
			var d="";
			/*d+='<tr><th>Imagen</th><th>Clave</th><th>Categoría</th><th>Costo Envío<br>ML</th>
			<th>Costo Envío<br>Amazon</th><th>Categoría<br>ML</th><th>Categoría<br>Amazon</th>
			<th>Actualizar</th><th>Eliminar</th></tr>';
			$("#tablaCategoria").append(d);*/
			if(response.d !== null){
				d ="<tbody>" ;
				for(var dato in response){
					//console.log(dato + ": " + response[dato].descripcion +" " + response[dato].clave);javier
					d+= '<tr>'+
					'<td>'+response[dato].clave+'</td>'+
					'<td>'+response[dato].descripcion+'</td>'+
					'<td>'+response[dato].equivalenciamlid+'</td>'+
					'<td>'+response[dato].equivalenciaamzid+'</td>'+
					'<td>'+' <button  class="boton_personalizado" id="actualizar" type="button" style="width:85px; height:22px" >Actualizar</button>'+'</td>'+
					'<td>';
					if(response[dato].indtipo==1){
						d+=' <button  class="boton_red" onclick="eliminarregistromarca(\''+response[dato].marcaid+'\');" id="eliminar" type="button" style="width:65px; height:22px" >Borrar</button>';
					}
					d+='</td>'+'</tr>';
				}	
				d+="</tbody>"
				$("#tablaMarcas").append(d);
		        var pagerM = new Pager('tablaMarcas', 10); 
		        pagerM.init(); 
		        pagerM.showPageNav('pagerM', 'pageNavPositionM'); 
		        pagerM.showPage(1);
			}

				/*for(var attr in obj){
					console.log(attr + ' : ' + obj[attr]);
					if(typeof obj[attr] === 'object'){
					  jQuery.throughObject(obj[attr]);
					}
				  }
				  */


								/*
				 

				var dynatable = $('tablaprocuctos').dynatable({ 
					dataset: { records: b } }, { features: { pushState: false }}).data("dynatable");
				dynatable.settings.dataset.originalRecords =  b;
				dynatable.process();  
   				*/	
		
       	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
     	}
 	});

	document.getElementById("filtroMarcas").value="";
}
function filtroMarcas(){
	var Marca=$("#filtroMarcas").val();
	var datos={marca:Marca};
	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: /*'http://onikom.technology*/'http://onikom.technology:8080/GestionComerServer/brand',
		dataType: 'json',
		contentType: 'application/x-www-form-urlencoded',
		data: datos,
       	success: function(response) {
			console.log('los datos son:'+JSON.stringify(response));
			
			$("#tablaMarcas tbody").remove();
			var d="";
			/*d+='<tr><th>Imagen</th><th>Clave</th><th>Categoría</th><th>Costo Envío<br>ML</th>
			<th>Costo Envío<br>Amazon</th><th>Categoría<br>ML</th><th>Categoría<br>Amazon</th>
			<th>Actualizar</th><th>Eliminar</th></tr>';
			$("#tablaCategoria").append(d);*/
			if(response.d !== null){
				

				//alert("-->. " + response[marca]);
			
				//console.log("hola"+ response[0].marca + " - "+response);
				//in data.artists.items
				d ="<tbody>" ;


				for(var dato in response){
					//console.log(dato + ": " + response[dato].descripcion +" " + response[dato].clave);
					d+= '<tr>'+
					'<td>'+response[dato].clave+'</td>'+
					'<td>'+response[dato].descripcion+'</td>'+
					'<td>'+response[dato].equivalenciamlid+'</td>'+
					'<td>'+response[dato].equivalenciaamzid+'</td>'+
					'<td>'+' <button  class="boton_personalizado" id="actualizar" type="button" style="width:85px; height:22px" >Actualizar</button>'+'</td>'+
					'<td>';
					if(response[dato].indtipo==1){
						d+=' <button  class="boton_red" onclick="eliminarregistromarca(\''+response[dato].marcaid+'\');" id="eliminar" type="button" style="width:65px; height:22px" >Borrar</button>';
					}
					d+='</td>'+'</tr>';
				}	
				d+="</tbody>"
				$("#tablaMarcas").append(d);
		        var pagerM = new Pager('tablaMarcas', 10); 
		        pagerM.init(); 
		        pagerM.showPageNav('pagerM', 'pageNavPositionM'); 
		        pagerM.showPage(1);
			}

				/*for(var attr in obj){
					console.log(attr + ' : ' + obj[attr]);
					if(typeof obj[attr] === 'object'){
					  jQuery.throughObject(obj[attr]);
					}
				  }
				  */


								/*
				 

				var dynatable = $('tablaprocuctos').dynatable({ 
					dataset: { records: b } }, { features: { pushState: false }}).data("dynatable");
				dynatable.settings.dataset.originalRecords =  b;
				dynatable.process();  
   				*/	
		
       	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
     	}
 	});

}

function Regresardetalle(){
	ocultarTodo();
	$("#RegistroVIP").show("slow");

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function buscarfiltros(){
	var codigofa = $("#txtSkuCodigo2").val();
	var Marca=$("input[name=marca]").val();
	var Categoria=$("input[name=categoria]").val();
	var Descripcion=$("#masdescripcion").val();
	var Subcategoria="";
	//alert("hola desde ajax-->  "+Marca+" -- "+Categoria+" -- "+Descripcion+" == "+codigofa );
	//$("#tablaprocuctos").find('option').remove();	
	
	var datos = {
		codigofabricante:codigofa,

		descripcion:Descripcion
	};
	
	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: 'http://onikom.technology:8080/GestionComerServer/product',
		dataType: 'json',
		contentType: 'application/json ; charset=utf-8',
		data: JSON.stringify(datos),
       	success: function(response) {
			//console.log('los datos son:'+JSON.stringify(response));
			$("#tablamasfiltros tbody").remove();

			if(response.d !== null){
				var d ="" ;
				for(var dato in response){
					//console.log(dato + ": " + response[dato].marca +" " + response[dato].codigobarras);
					d+= '<tr>'+
					'<td>'+ "--" +'</td>'+
					'<td>'+response[dato].codigobarras+'</td>'+
					'<td>'+response[dato].categoria+'</td>'+
					'<td>'+response[dato].marca+'</td>'+
					'<td>'+response[dato].descripcion+'</td>'+
					'<td>'+response[dato].existencia+'</td>'+
					'<td>'+' <button  onclick="mostrardetallesproductos(\''+codigofa+'\');" class="boton_personalizado" id="busca" type="button" style="width:65px; height:22px" >Detalle</button>'+'</td>'+
					
					'<td>'+' <button  class="boton_red" id="actualiza" type="button" style="width:85px; height:22px" >Actualizar</button>'+'</td>'+
					
					'</tr>';
					}
					$("#tablamasfiltros").append(d);
				}
       	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
     	}
 	});

}







function filtros(){
	var codigofa = $("#txtSkuCodigo").val()
	//alert("hola desde ajax-->  "+ nombre);
	//$("#tablaprocuctos").find('option').remove();	
	
	var datos = {
		codigofabricante:codigofa
	};
	
	$.ajax({

		

		type: 'POST',
		crossDomain: true,
		url: 'http://onikom.technology:8080/GestionComerServer/product',
		dataType: 'json',
		contentType: 'application/json ; charset=utf-8',
		data: JSON.stringify(datos),
       	success: function(response) {
			//console.log('los datos son:'+JSON.stringify(response));
			
			$("#tablaprocuctos tbody").remove();
			if(response.d !== null){
				

				//alert("-->. " + response[marca]);
			
				//console.log("hola"+ response[0].marca + " - "+response);
				//in data.artists.items
				var d ="" ;



				for(var dato in response){
					console.log(dato + ": " + response[dato].marca +" " + response[dato].codigobarras);
					//$("#tablaprocuctos" + index).remove();
					d+= '<tr>'+
					'<td>'+ "--" +'</td>'+
					'<td>'+response[dato].codigobarras+'</td>'+
					'<td>'+response[dato].categoria+'</td>'+
					'<td>'+response[dato].marca+'</td>'+
					'<td>'+response[dato].descripcion+'</td>'+
					'<td>'+response[dato].existencia+'</td>'+
					'<td>'+' <button  onclick="mostrardetallesproductos(\''+codigofa+'\');" class="boton_personalizado" id="busca" type="button" style="width:65px; height:22px" >Detalle</button>'+'</td>'+
					
					'<td>'+' <button  class="boton_red" id="actualiza" type="button" style="width:85px; height:22px" >Actualizar</button>'+'</td>'+
					
					'</tr>';
					}


					$("#tablaprocuctos").append(d);
				}

				/*for(var attr in obj){
					console.log(attr + ' : ' + obj[attr]);
					if(typeof obj[attr] === 'object'){
					  jQuery.throughObject(obj[attr]);
					}
				  }
				  */


								/*
				 

				var dynatable = $('tablaprocuctos').dynatable({ 
					dataset: { records: b } }, { features: { pushState: false }}).data("dynatable");
				dynatable.settings.dataset.originalRecords =  b;
				dynatable.process();  
   				*/	
		
       	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
     	}
 	});
}


function btn_2(){
	ocultarTodo();
    $("#RegistroVIP").show("slow");
    //tabla();
	//llenarTypeCategorias();
}


function btn_3(){
	ocultarTodo();
    $("#ConsultarCategorias").show("slow");
	llenarCategorias();
	//llenaramazon();
}

function llenaramazon(){
	alert("hola");
}



function btn_4(){
	ocultarTodo();
    $("#ConsultarMarcas").show("slow");
    llenarMarcas();
    
}


function btn_5(){
	ocultarTodo();
    $("#ImpresionGafeteMultiple").show("slow");
	obtenerPabellonesImp();
	llenarTypeCategory();
	obtenerTodasPrintersMulti();
}
function btn_10(){
	ocultarTodo();
	$("#RegistroVIP").show("slow");
}


function buscarType(){
	console.log("buscando...");
	searchGafete();
}


//seccion para funciones de boton Guardar gafeteVIP
function registrarGafeteVIP(){
	var nombre=$("#txtNombreGafete").val();
	var apellido=$("#txtApellidoGafete").val();
	var empresa=$("#txtempresa").val();
	var pais=$("#txtPais").val();
	var gafete=document.getElementById("selectGafetes").value;
	var datos={
		nombre:nombre,
		apellido:apellido,
		empresa:empresa,
		pais:pais,
		gafete:gafete
	};
	alert(JSON.stringify(datos));
}




function tabla(){
	var datos = {
		codigofabricante:"0111T870"
	};
	
	$.ajax({

		

		type: 'POST',
		crossDomain: true,
		url: 'http://onikom.technology:8080/GestionComerServer/product',
		dataType: 'json',
		contentType: 'application/json ; charset=utf-8',
		data: JSON.stringify(datos),
       	success: function(response) {
			console.log('los datos son:'+JSON.stringify(response) + token);
			

			if(response.d !== null){
				var b = [];
				var actual;
				alert("-->. " + response.marca);
				/*for(var i = 0; i < response.d.length; i++){
					var u = {
						//imagen: ' <button  class="verTicket" id=eliminar'+response.d[i].MemNumber+' onclick="mostrarDetalleCliente('+ response.d[i].MemNumber +')"></button>',
						noCliente: response.d[i].codigofabricante, //actual.numticket,
						nombreCliente: response.d[i].codigobarras, //actual.fecregistro, 
						pabellonCliente: response.d[i].marca
					};
					b[i] = u;
				}*/ 
				
				var dynatable = $('tablaprocuctos').dynatable({ 
					dataset: { records: b } }, { features: { pushState: false }}).data("dynatable");
				dynatable.settings.dataset.originalRecords =  b;
				dynatable.process();  
   					
			}else{
				console.log('hacer algo'+ response.nombre );
			}
       	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
     	}
 	});
}












function consultaruser(){
	var datos = {
		
	};
	
	$.ajax({

		 beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Authorization","bearer"+(window.onload =(localStorage.getItem("token"))));
        },

		type: 'GET',
		crossDomain: true,
		url: 'http://onikom.technology:8080/GestionComerServer/user/',
		dataType: 'json',
		contentType: 'application/json ; charset=utf-8',
		data: JSON.stringify(datos),
       	success: function(response) {
			//console.log('los datos son:'+JSON.stringify(response) + token);
			if(response.d !== null){
				$('#nombre').text(response.nombre+" "+response.apellidos);
			}else{
				console.log('hacer algo'+ response.nombre );
			}
       	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
     	}
 	});
}






function obtenerTodasCompanias(){
	var datos = {
		idPavilion:"%",
		company:"%"
	};
	
	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: 'http://tianguis2017.azurewebsites.net/WebService.asmx/getCompanyByPavilions',
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(datos),
       	success: function(response) {
			console.log('los datos son:');
			if(response.d !== null){
				var b = [];
				var actual;
				for(var i = 0; i < response.d.length; i++){
					var u = {
						imagen: ' <button  class="verTicket" id=eliminar'+response.d[i].MemNumber+' onclick="mostrarDetalleCliente('+ response.d[i].MemNumber +')"></button>',
						noCliente: response.d[i].MemNumber, //actual.numticket,
						nombreCliente: response.d[i].CompanyName, //actual.fecregistro, 
						pabellonCliente: response.d[i].NombrePabellon
					};
					b[i] = u;
				}  
				var dynatable = $('#tablaCliente').dynatable({ 
					dataset: { records: b } }, { features: { pushState: false }}).data("dynatable");
				dynatable.settings.dataset.originalRecords =  b;
				dynatable.process();  
   					
			}else{
				console.log('hacer algo');
			}
       	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
     	}
 	});
}


//todas las impresoras
function obtenerTodasPrinters(){
	var datos = {
		idPavilion:"%",
		company:"%"
	};
	
	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: 'http://tianguis2017.azurewebsites.net/WebService.asmx/getAllPrinters',
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(datos),
       	success: function(response) {
			console.log('los datos son:');
			if(response.d !== null){
				$("#Impresoras").empty();
				var impresoraDefault = sessionStorage.getItem("impresoraDefault");
				for(var i = 0; i < response.d.length; i++){
					if((impresoraDefault != undefined) && (impresoraDefault == response.d[i].Id)  ){
						$("#Impresoras").append('<option  selected value="'+response.d[i].Id + '">' + response.d[i].DisplayName+'</option>');
					}else{
						$("#Impresoras").append('<option  value="'+response.d[i].Id + '">' + response.d[i].DisplayName+'</option>');
					}
				}
			}else{
				console.log('hacer algo');
			}
       	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
     	}
 	});
}


//todas las impresoras
function obtenerTodasPrintersMulti(){
	//alert('busqueda todas');
	var datos = {
		idPavilion:"%",
		company:"%"
	};
	
	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: 'http://tianguis2017.azurewebsites.net/WebService.asmx/getAllPrinters',
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(datos),
       	success: function(response) {
			console.log('los datos son:');
			if(response.d !== null){
				$("#ImpresorasMult").empty();
				var impresoraDefault = sessionStorage.getItem("impresoraDefault");
				for(var i = 0; i < response.d.length; i++){
					if((impresoraDefault != undefined) && (impresoraDefault == response.d[i].Id)  ){
						$("#ImpresorasMult").append('<option  selected value="'+response.d[i].Id + '">' + response.d[i].DisplayName+'</option>');
					}else{
						$("#ImpresorasMult").append('<option  value="'+response.d[i].Id + '">' + response.d[i].DisplayName+'</option>');
					}
				}
			}else{
				console.log('hacer algo');
			}
       	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
     	}
 	});
}




function obtenerCategoriasVip(){
	var datos = {
		idPavilion:"%",
		company:"%"
	};
	
	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: 'http://tianguis2017.azurewebsites.net/WebService.asmx/getAllCategories',
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(datos),
       	success: function(response) {
			console.log('los datos son:');
			if(response.d !== null){
				$("#TypeGafete").empty();
				for(var i = 0; i < response.d.length; i++){
					$("#TypeGafete").append('<option value="'+response.d[i].Name + '">' + response.d[i].Name+'</option>');
				} 	
			}else{
				console.log('hacer algo');
			}
       	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
     	}
 	});
}


function obtenerTodasCompaniasFac(){
	var datos = {
		idPavilion:"%",
		company:"%"
	};
	
	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: 'http://tianguis2017.azurewebsites.net/WebService.asmx/getCompanyByPavilions',
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(datos),
       	success: function(response) {
			console.log('los datos son:');
			if(response.d !== null){
				var b = [];
				var actual;
				for(var i = 0; i < response.d.length; i++){
					var u = {
						imagen: ' <button  class="verTicket" id=eliminar'+response.d[i].MemNumber+' onclick="mostrarDetalleClienteFac('+ response.d[i].MemNumber +')"></button>',
						noCliente: response.d[i].MemNumber, //actual.numticket,
						nombreCliente: response.d[i].CompanyName, //actual.fecregistro, 
						pabellonCliente: response.d[i].NombrePabellon
					};
					b[i] = u;
				}
				//$('#tablaCliente').dynatable({dataset: {records: b}});   
				var dynatable = $('#tablaCompaniaFac').dynatable({ 
					dataset: { records: b } }, { features: { pushState: false }}).data("dynatable");
				dynatable.settings.dataset.originalRecords =  b;
				dynatable.process();  
   					
			}else{
				console.log('hacer algo');
			}
       	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
     	}
 	});
}


function obtenerCompaniasFiltradas(){
	var compania = $("#nombreCompania").val();
	var pavilion = $("#selectPabellon").val();
	var datos = {
		idPavilion:pavilion,
		company:compania
	};
	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: 'http://tianguis2017.azurewebsites.net/WebService.asmx/getCompanyByPavilions',
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(datos),
       	success: function(response) {
			console.log('los datos son:');
			if(response.d !== null){
				var b = [];
				var actual;
				for(var i = 0; i < response.d.length; i++){
					var u = {
						imagen: ' <button  class="verTicket" id=eliminar'+response.d[i].MemNumber+' onclick="mostrarDetalleCliente('+ response.d[i].MemNumber +')"></button>',
						noCliente: response.d[i].MemNumber, //actual.numticket,
						nombreCliente: response.d[i].CompanyName, //actual.fecregistro, 
						pabellonCliente: response.d[i].NombrePabellon
					};
					b[i] = u;
				}
				//$('#tablaCliente').dynatable({dataset: {records: b}});
				var dynatable = $('#tablaCliente').dynatable({ 
					dataset: { records: b } }, { features: { pushState: false }}).data("dynatable");
				dynatable.settings.dataset.originalRecords =  b;
				dynatable.process();  
   					
			}else{
				console.log('hacer algo');
			}
       	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
     	}
 	});
}


function obtenerCompaniasFiltradasFac(){
	var compania = $("#nombreCompaniaFac").val();
	var pavilion = $("#selectPabellonFac").val();
	
	var datos = {
		idPavilion:pavilion,
		company:compania
	};
	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: 'http://tianguis2017.azurewebsites.net/WebService.asmx/getCompanyByPavilions',
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(datos),
       	success: function(response) {
			console.log('los datos son:');
			if(response.d !== null){
				var b = [];
				var actual;
				for(var i = 0; i < response.d.length; i++){
					var u = {
						imagen: ' <button  class="verTicket" id=eliminar'+response.d[i].MemNumber+' onclick="mostrarDetalleClienteFac('+ response.d[i].MemNumber +')"></button>',
						noCliente: response.d[i].MemNumber, //actual.numticket,
						nombreCliente: response.d[i].CompanyName, //actual.fecregistro, 
						pabellonCliente: response.d[i].NombrePabellon
					};
					b[i] = u;
				}
				//$('#tablaCliente').dynatable({dataset: {records: b}});
				
				var dynatable = $('#tablaCompaniaFac').dynatable({ 
					dataset: { records: b } }, { features: { pushState: false }}).data("dynatable");
				dynatable.settings.dataset.originalRecords =  b;
				dynatable.process();  
   					
			}else{
				console.log('hacer algo');
			}
       	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
     	}
 	});
}




function obtenerPabellones(){
	 var data;
		 $.ajax({
            type: 'POST',
            crossDomain: true,
            url: 'http://tianguis2017.azurewebsites.net/WebService.asmx/getAllPavilions',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function(response) {
				if(response.d !== null){
					var b = [];
					var actual;
					for(var i = 0; i < response.d.length; i++){
						if(response.d[i].Nombre == '[TODOS]                                                                                             '  ){
							$("#selectPabellon").append('<option  selected value="'+response.d[i].IdPabellon + '">' + response.d[i].Nombre+'</option>');
						}else{
							$("#selectPabellon").append('<option value="'+response.d[i].IdPabellon + '">' + response.d[i].Nombre+'</option>');
						}
					} 
				}else{
					console.log('hacer algo');
				}
            },
            error: function(error) {
            	alert("Failed." + error);
                console.log(error);
            }
      });
}



function obtenerPabellonesFac(){
	var data;

	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: 'http://onikom.technology:8080/GestionComerServer/product',
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		success: function(response) {
			if(response.d !== null){
				var b = [];
				var actual;
				for(var i = 0; i < response.d.length; i++){
					if(response.d[i].Nombre == '[TODOS]                                                                                 	            '  ){
						$("#selectPabellonFac").append('<option  selected value="'+response.d[i].codigofabricante + '">' + 		response.d[i].sku+'</option>');
					}else{
						$("#selectPabellonFac").append('<option value="'+response.d[i].codigofabricante  + '">' + response.d[i].codigofabricante +'</option>');
					}
				} 
			}else{
				console.log('hacer algo');
			}
     	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
      	}
 	});
}



function obtenerPabellonesImp(){
	var data;
	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: 'http://tianguis2017.azurewebsites.net/WebService.asmx/getAllPavilions',
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		success: function(response) {
			if(response.d !== null){
				var b = [];
				var actual;
				for(var i = 0; i < response.d.length; i++){
					if(response.d[i].Nombre == '[TODOS]'  ){
						$("#selectPabellonImp").append('<option  selected value="'+response.d[i].IdPabellon + '">' + 		response.d[i].Nombre+'</option>');
					}else{
						$("#selectPabellonImp").append('<option value="'+response.d[i].IdPabellon + '">' + response.d[i].Nombre+'</option>');
					}
				} 
			}else{
				console.log('hacer algo');
			}
     	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
      	}
 	});
}


//llenar campany
function llenarCompany(){
	$(".se-pre-con").fadeIn();
	var data;
	$("#selectCompaniaImp").empty();
	var pavebellom=$("#selectPabellonImp").val();
	var datos={
		idPavilion: pavebellom,
		company:"%"
	}
	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: 'http://tianguis2017.azurewebsites.net/WebService.asmx/getCompanyByPavilionsNotRegType',
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		data:JSON.stringify(datos),
		success: function(response) {
			if(response.d !== null){
				var b = [];
				var actual;
				for(var i = 0; i < response.d.length; i++){
						$("#selectCompaniaImp").append('<option  selected value="'+response.d[i].MemNumber + '">' + 		response.d[i].CompanyName+ '-'+response.d[i].MemNumber+'</option>');
					
				} 
				$(".se-pre-con").fadeOut();
			}else{
				$(".se-pre-con").fadeOut();
				console.log('hacer algo');
			}
     	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
      	}
 	});
}


function llenarTypeCategorias(){
	$("#selectType_gafete").empty();
	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: 'http://tianguis2017.azurewebsites.net/WebService.asmx/getAllCategories',
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		success: function(response) {
			if(response.d !== null){
				var b = [];
				var actual;
				for(var i = 0; i < response.d.length; i++){
						$("#selectType_gafete").append('<option  selected value="'+response.d[i].Name + '">' + 		response.d[i].Name+'</option>');
				} 
			}else{
				console.log('hacer algo');
			}
     	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
      	}
 	});
}


function llenarTypeCategory(){
	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: 'http://tianguis2017.azurewebsites.net/WebService.asmx/getAllCategories',
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		success: function(response) {
			if(response.d !== null){
				var b = [];
				var actual;
				for(var i = 0; i < response.d.length; i++){
						$("#selectCategoriesImp").append('<option  selected value="'+response.d[i].Name + '">' + 		response.d[i].Name+'</option>');
				} 
			}else{
				console.log('hacer algo');
			}
     	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
      	}
 	});
}


function searchGafete(){
	$(".se-pre-con").fadeIn();
	var idCompany=$("#selectCompaniaImp").val();
	var regType=$("#selectCategoriesImp").val();
	var regPavilion=$("#selectPabellonImp").val();
	dataImpres = [];
	var datos = {
	idCompany:idCompany,
    regType:regType,
    idPavilion:regPavilion
	};
	console.log(JSON.stringify(datos));
	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: 'http://tianguis2017.azurewebsites.net/WebService.asmx/getRegistersByCompanyBuyType',
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		data:JSON.stringify(datos),
		success: function(response) {
			var b = [];

				var actual;
				for(var i = 0; i < response.d.length; i++){
					if(response.d[i].Entregado !== 'Entregado'){
						dataImpres[i] = {
						PerFirstName:response.d[i].PerFirstName,
						PerLastName:response.d[i].PerLastName,
						CmpName:response.d[i].CmpName,
						CmpCountry: response.d[i].CmpCountry,
						PerNum:response.d[i].PerNum

					};
					
					var u = {
						NumImpr: '<label  class="num_Client" id=Num'+i+' >'+ response.d[i].PerNum +'</label>',
						NameImpr:' <label  class="name_Client" id=Name'+i+' >'+ response.d[i].PerFirstName +'</label>', //actual.numticket,
						ApellidoImpr:' <label  class="apell_Client" id=Name'+i+' >'+ response.d[i].PerLastName +'</label>', //actual.fecregistro, 
						CompanyImpr:' <label  class="cmpname_Client" id=Name'+i+' >'+ response.d[i].CmpName +'</label>',
						PaisImpr:'<label  class="pais_Client" id=Name'+i+' >'+ response.d[i].CmpCountry +'</label>',
						EstatusImpr:'<label  class="estatus_Client" id=Name'+i+' >'+ response.d[i].RegStatus +'</label>',
						TipoImpr:'<label  class="tipo_Client" id=Name'+i+' >'+ response.d[i].RegType +'</label>',
						EntregadoImpr:'<label  class="tipo_Client" id=Name'+i+' >'+ response.d[i].Entregado +'</label>',
						};
					b[i] = u;
					}
					
					
					
				}
				//$('#tablaCliente').dynatable({dataset: {records: b}});
				
				var dynatable = $('#MultiplesGafetes').dynatable({ 
					dataset: { records: b } }, { features: { pushState: false }}).data("dynatable");
				dynatable.settings.dataset.originalRecords =  b;
				dynatable.process();
				 
				 $(".se-pre-con").fadeOut();
			
     	},
		error: function(error) {
			 $(".se-pre-con").fadeOut();
			alert("Failed." + error);
			console.log(error);
      	}
 	});
}


function imprimirMultiples(){
	$(".se-pre-con").fadeIn();
	var datos = {
		category:$("#selectCategoriesImp").val(),
		idPrinter:$("#ImpresorasMult").val(),//"__google__docs",
		registros:dataImpres
	};

	if(dataImpres.length > 0){
		$.ajax({
			type: 'POST',
			crossDomain: true,
			url: 'http://tianguis2017.azurewebsites.net/WebService.asmx/printRegisterSuppliers',
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			data:JSON.stringify(datos),
			success: function(response) {
				console.log(response);
				if (response.d==1) {
					$(".se-pre-con").fadeOut();
					alert("Gafetes Impresos")
				}
			},
			error: function(error) {
				$(".se-pre-con").fadeOut();
				alert("Failed." + error);
				console.log(error);
			}
 		});
	}else{
		alert('Sin datos a imprimir.');
		$(".se-pre-con").fadeOut();
	}
}


//busqueda Gafete unico
function busqueGafete(){
	$("#btn_EdtRegist").show("slow");
	$("#btn_update").hide();
	 $(".se-pre-con").fadeIn();
	var datos = {
		category:$("#TypeGafete").val(),
		registroId:$("#txtNumGafete").val()
	};
	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: 'http://tianguis2017.azurewebsites.net/WebService.asmx/getRegistroById',
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		data:JSON.stringify(datos),
		success: function(response) {
			console.log(response.d[0]);
			if(response.d !== null && response.d.length > 0){
				
				if(response.d[0].Entregado == 'Entregado'){
					$("#btn_ImprimirGaf").hide();
					$("#btn_EdtRegist").hide();
					alert('Gafete Entregado');
				}else{
					$("#NumRegis").html(response.d[0].PerNum);
					$("#txtNameGafete").val(response.d[0].PerFirstName)
					$("#txtLastnameGafete").val(response.d[0].PerLastName)
					$("#txtCompanyGafete").val(response.d[0].CmpName)
					$("#txtCountryGafete").val(response.d[0].CmpCountry)
					$("#txtCountryGafete").val(response.d[0].CmpCountry)
					$("#txtTypeGafete").val(response.d[0].Buy_type)
					$("#txtStatusGafete").val(response.d[0].RegStatus)
					$("#TypeGafete").append('<option  selected value="'+response.d[0].RegType+ '">' + response.d[0].RegType+'</option>');
					
				}
				$(".se-pre-con").fadeOut();
			}else{
				console.log('hacer algo');
				 $(".se-pre-con").fadeOut();
			}
     	},
		error: function(error) {
			 $(".se-pre-con").fadeOut();
			alert("Failed." + error);
			console.log(error);
      	}
 	});
}


function imprimirGafet(){
	$(".se-pre-con").fadeIn();
	var datos = { 
		category:$("#TypeGafete").val(),
		idPrinter:$("#Impresoras").val(),
		registros:
		[{ 
			PerFirstName: $("#txtNameGafete").val(),
			PerLastName: $("#txtLastnameGafete").val(),
			CmpName: $("#txtCompanyGafete").val(),
			CmpCountry:  $("#txtCountryGafete").val(),
			PerNum: $("#NumRegis").html()
		}]
	};
	console.log(JSON.stringify(datos));
	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: 'http://tianguis2017.azurewebsites.net/WebService.asmx/printRegisterSuppliers',
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		data:JSON.stringify(datos),
		success: function(response) {
			console.log(response);
			$(".se-pre-con").fadeOut();
			alert("Gafete Impreso");
			$("#respuestaVip").text();
     	},
		error: function(error) {
			$(".se-pre-con").fadeOut();
			alert("Failed." + error);
			console.log(error);
		}
	});
}



function registroGafete(){
	$(".se-pre-con").fadeIn();
	
	if ($("#txtName_Gafete").val().trim()===''|| $("#txtlastname_Gafete").val().trim()==='' || $("#txtcompany_gafete").val().trim()==='' || $("#selectType_gafete").val().trim()==='' || $("#txtcountry_gafete").val().trim()==='') {
		alert("Todos los Campos deben contener datos para continuar");
		$(".se-pre-con").fadeOut();
	}else{
		var datos = { perFirstName: $("#txtName_Gafete").val(),
			perLastName: $("#txtlastname_Gafete").val(),
			cmpName: $("#txtcompany_gafete").val(),
			country:  $("#txtcountry_gafete").val(),
			regtype: $("#selectType_gafete").val()
					};
		console.log(JSON.stringify(datos));

		$.ajax({
			type: 'POST',
			crossDomain: true,
			url: 'http://tianguis2017.azurewebsites.net/WebService.asmx/insertNewRegistroVIP',
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			data:JSON.stringify(datos),
			success: function(response) {
				console.log(response);
				console.log(JSON.stringify(response));
				$(".se-pre-con").fadeOut();
				$("#respuestaVip").text(response.d);
				$("#txtName_Gafete").val('');
				$("#txtlastname_Gafete").val('');
				$("#txtcompany_gafete").val('');
				$("#txtcountry_gafete").val('');
				$('.respuestaVip').show();
			},
			error: function(error) {
				$(".se-pre-con").fadeOut();
				alert("Failed." + error);
				console.log(error);
			}
		});
	}
}



function actualizarGafete(){
	$("#txtNameGafete").attr("disabled", false);
	$("#txtLastnameGafete").attr("disabled", false);
	$("#txtCompanyGafete").attr("disabled", false);
	$("#txtCountryGafete").attr("disabled", false);
	$("#btn_update").show("slow");
	$("#btn_EdtRegist").hide();
}


function closActualizar(){
	$("#txtNameGafete").attr("disabled", true);
	$("#txtLastnameGafete").attr("disabled", true);
	$("#txtCompanyGafete").attr("disabled", true);
	$("#txtCountryGafete").attr("disabled", true);
	$("#btn_update").hide();
	$("#btn_EdtRegist").hide();
	var impresora = $("#Impresoras").val();
	 sessionStorage.setItem("impresoraDefault",impresora);
}


function updateGafet(){
	$(".se-pre-con").fadeIn();
	if ($("#txtNameGafete").val().trim()===''|| $("#txtLastnameGafete").val().trim()==='' ||  $("#txtCompanyGafete").val().trim()==='' || $("#TypeGafete").val().trim()==='' || $("#txtCountryGafete").val().trim()==='') {
		alert("Todos los Campos deben contener datos para continuar");
		$(".se-pre-con").fadeOut();
	}else{
		var datos = { 
			perNum:$("#NumRegis").html(),
			perFirstName: $("#txtNameGafete").val(),
			perLastName:$("#txtLastnameGafete").val(),
			company: $("#txtCompanyGafete").val(),
			regtype: $("#TypeGafete").val(),
			country: $("#txtCountryGafete").val()
		};
		console.log(JSON.stringify(datos));
		$.ajax({
			type: 'POST',
			crossDomain: true,
			url: 'http://tianguis2017.azurewebsites.net/WebService.asmx/updateRegisterGafete',
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			data:JSON.stringify(datos),
			success: function(response) {
				console.log(response);
				if (response.d==1) {
					$(".se-pre-con").fadeOut();
					closActualizar();
					alert("Actualización Exitosa");
				}
			},
			error: function(error) {
				$(".se-pre-con").fadeOut();
				alert("Failed." + error);
				console.log(error);
			}
		});
	}
}


function llenarImpresora(){
	//alert("hola");


	/*$.ajax({
		type: 'GET',
		crossDomain: true,
		url: 'http://eligetubelleza.mx/gcpt/gcp1/getPrinters.php',
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		//data:JSON.stringify(datos),
		success: function(response) {
			console.log(response);
			/*if(response !== null){
				var b = [];
				var actual;
				for(var i = 0; i < response.length; i++){
					//if(response.d[i].Nombre == '[TODOS]                                                                                 	            '  ){
						$("#Impresoras").append('<option  selected value="'+response[i].id + '">' +response.d[i].displayName+'</option>');
					//}else{
					//	$("#selectCompaniaImp").append('<option value="'+response.d[i].IdPabellon + '">' + response.d[i].Nombre+'</option>');
					//}
				} 
			}else{
				console.log('hacer algo');
			}
			
     	},
		error: function(error) {
			 //$(".se-pre-con").fadeOut();
			//alert("Failed." + error);
			console.log(error);
      	}
 	});*/
 /*var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://eligetubelleza.mx/gcpt/gcp1/getPrinters.php",
  "method": "GET",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "8ca435c4-6899-b8cd-91ec-ffe60a718da7"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});*/

}


///termina funciones impresion only
function mostrarDetalleCliente(numero){
     obtenerDetalleCliente(numero);
    $(".se-pre-con").fadeIn("slow");
    $('#titulo').html('Tickets'); 
    $('#forecastCaptura').hide();
    $('#Panelconfig').hide();
    
	$('#AdminTickets').hide();
    $('#AdminTicketsApro').hide();
    $('#Nivel1T').hide();
    $('#proyeccion').hide();
    $('#notimensaje').hide();
    $('#DetalleCliente').show('slow');
    $(".se-pre-con").fadeOut("slow");
}




function mostrarDetalleClienteFac(numero){
     obtenerDetalleClienteFac(numero);
    $(".se-pre-con").fadeIn("slow");
    $('#titulo').html('Tickets'); 
    $('#BusquedaCompaniaFac').hide();
    $('#DetalleClienteFac').show('slow');
    $(".se-pre-con").fadeOut("slow");
}


function editarGafete(numero, objeto){
   var renglonActual = objeto.parentNode.parentNode;
	var cell0 = renglonActual.cells[0];
	var cell1 = renglonActual.cells[1];
	var idGafete = cell1.innerHTML;
	var cell2 = renglonActual.cells[2];
	var nombreGafete = cell2.innerHTML;
	var cell3 = renglonActual.cells[3];
	var apellidoGafete = cell3.innerHTML;
	var children = cell0.childNodes;
	children.forEach(function(item){
		item.style.display = 'none';
	});
	
	
	var numero = 3;
	var type="button";
	var element = document.createElement("input");
	element.type = type;
	element.value = 'Guardar'; // Really? You want the default value to be the type string?
	element.name = type; // And the name too?
	element.onclick =  function(j,k,l) { return function() { actualizar.call(this, j,k,l); }; }(idGafete,nombreGafete,apellidoGafete);
	
	
	function actualizar(id, nombre, apellido) {
		var nombreEditado = $("#txtNombreGafeteEdicion").val();
		var apellidosEditado = $("#txtApellidosGafeteEdicion").val();
		var registro = { 
			RegStatus: "No Entregado",
			PerFirstName: nombreEditado,
			PerLastName:apellidosEditado,
			PerNum: id
		};
		var arrayRegistros = [registro];
		var datos = {registros:arrayRegistros};

   
		$.ajax({
			type: 'POST',
			crossDomain: true,
			url: 'http://tianguis2017.azurewebsites.net/WebService.asmx/updateGafeteStatus',
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify(datos),
			success: function(response) {
				if(response.d !== null && response.d.length == 1){
				}else{
					console.log('hacer algo');
					mostrarDetalleCliente(numeroCompania.innerHTML);
				}
			},
			error: function(error) {
				alert("Failed." + error);
				console.log(error);
			}
		});
		return false;
	}
	
	
	cell0.appendChild(element);
	
	var type="button";
	var element2 = document.createElement("input");
  	//Assign different attributes to the element. 
	element2.type = type;
	element2.value = "cancelar"; // Really? You want the default value to be the type string?
	element2.name = type; // And the name too?
	element2.onclick = function(j,k,l,n,a,b) { return function() { cancelar.call(this, j,k,l,n,a,b); }; }(idGafete,nombreGafete, apellidoGafete,cell2,cell3,cell0);
	
	function cancelar(id, nombre, apellido,celda1,celda2,botones) {
		if ( celda1.hasChildNodes() ){
			while ( celda1.childNodes.length >= 1 ){
				celda1.removeChild( celda1.firstChild );
			}
		}
		
		if ( celda2.hasChildNodes() ){
			while ( celda2.childNodes.length >= 1 ){
				celda2.removeChild( celda2.firstChild );
			}
		}
		
		var arrayBotones = botones.childNodes;
		var botonEditar;
		arrayBotones.forEach(function(item){
			if(item.style.display == 'none'){
				botonEditar = item;
				botonEditar.style.display = 'inherit';
			}
		});
		
		
		if ( botones.hasChildNodes() ){
			while ( botones.childNodes.length >= 1 ){
				botones.removeChild( botones.firstChild );
			}
		}
			
			
		
		var t = document.createTextNode(nombreGafete);
		var t2 = document.createTextNode(apellidoGafete);
    
		
		
		cell2.appendChild(t);
		cell3.appendChild(t2);
		botones.appendChild(botonEditar);
		
		return false;
	}
	
	
	
	cell0.appendChild(element2);
	

	var input1 = document.createElement("input");
	input1.type = "text";
	input1.className = "css-class-name"; // set the CSS class
	input1.id="txtNombreGafeteEdicion";
	input1.value = nombreGafete;
	cell2.innerHTML = '';
	cell2.appendChild(input1);

	var input2 = document.createElement("input");
	input2.type = "text";
	input2.className = "css-class-name"; // set the CSS class
	input2.id="txtApellidosGafeteEdicion";
	input2.value = apellidoGafete;
	cell3.innerHTML = '';
	cell3.appendChild(input2);

	
      $(".se-pre-con").fadeIn("slow");
    $('#titulo').html('Tickets'); 
    $('#forecastCaptura').hide();
    $('#Panelconfig').hide();
    
	$('#AdminTickets').hide();
    $('#AdminTicketsApro').hide();
    $('#Nivel1T').hide();
    $('#proyeccion').hide();
    $('#notimensaje').hide();
    $('#DetalleCliente').show('slow');
   
    //codigo de logica
    
    
    $(".se-pre-con").fadeOut("slow");
}





function seleccionarTodosGafete(nombreTabla){

	var renglones = document.getElementById(nombreTabla).rows;
	var renglon;
	for(var i= 1; i < renglones.length; i++){
		renglon = renglones[i];
		var datas = renglon.childNodes;
		var data6 = datas[6];
		var select = data6.firstChild;
		select.checked = true;
	}
}

function seleccionarTodosGafeteFac(nombreTabla){

	var renglones = document.getElementById(nombreTabla).rows;
	var renglon;
	for(var i= 1; i < renglones.length; i++){
		renglon = renglones[i];
		var datas = renglon.childNodes;
		var data5 = datas[5];
		var select = data5.firstChild;
		select.checked = true;
	}
}


//registrados
function gafetesRegistrados(nombreTabla){
	var renglones = document.getElementById(nombreTabla).rows;
	var renglon;
	var objetos =[];
	var objeto;

	var regStatus;
	var perFirstName;
	var perLastName;
	var perNum;
	var entregado;

	for(var i= 1; i < renglones.length; i++){
		renglon = renglones[i];
		var datas = renglon.childNodes;
		var data5 = datas[5];

		entregado= datas[4].firstChild.data;
		 perFirstName = datas[1].firstChild.data;
		 perLastName = datas[2].firstChild.data;
		 perNum = datas[0].firstChild.data;
		
		objeto = { 
			"Entregado": entregado,
			"PerFirstName": perFirstName,
			"PerLastName": perLastName,
			"PerNum": perNum,
			"RegStatus": 'Registrado'
		};
		
		var select = data5.firstChild;
		if(select.checked){
			objetos.push(objeto);
		}
		
	}
	var data = { "registros":objetos};
	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: 'http://tianguis2017.azurewebsites.net/WebService.asmx/updateGafeteStatus',
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(data),
		success: function(response) {
			if(response.d !== null && response.d.length == 1){
			}else{
				console.log('hacer algo');
				mostrarDetalleClienteFac(numeroCompaniaFac.innerHTML);
			}
		},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
		}
	});
}



function gafetesEntregados(nombreTabla){
	var renglones = document.getElementById(nombreTabla).rows;
	var renglon;
	var objetos =[];
	var objeto;

	var regStatus;
	var perFirstName;
	var perLastName;
	var perNum;

	for(var i= 1; i < renglones.length; i++){
		renglon = renglones[i];
		var datas = renglon.childNodes;
		var data6 = datas[6];

		regStatus= datas[5].firstChild.data;
		 perFirstName = datas[2].firstChild.data;
		 perLastName = datas[3].firstChild.data;
		 perNum = datas[1].firstChild.data;
		regStatus = datas[4].firstChild.data;

		objeto = { 
			"Entregado": 'Entregado',
			"PerFirstName": perFirstName,
			"PerLastName": perLastName,
			"PerNum": perNum,
			"RegStatus": regStatus
		};
		
		var select = data6.firstChild;
		if(select.checked){
			objetos.push(objeto);
		}
		
	}
	var data = { "registros":objetos};
	
	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: 'http://tianguis2017.azurewebsites.net/WebService.asmx/updateGafeteStatus',
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(data),
		success: function(response) {
			if(response.d !== null && response.d.length == 1){
			}else{
				console.log('hacer algo');
				mostrarDetalleCliente(numeroCompania.innerHTML);
			}
		},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
		}
	});
}



function gafetesNoEntregados(nombreTabla){

	var renglones = document.getElementById(nombreTabla).rows;
	var renglon;
	var objetos =[];
	var objeto;

	var regStatus;
	var perFirstName;
	var perLastName;
	var perNum;

	for(var i= 1; i < renglones.length; i++){
		renglon = renglones[i];
		var datas = renglon.childNodes;
		var data6 = datas[6];

		regStatus= datas[5].firstChild.data;
		 perFirstName = datas[2].firstChild.data;
		 perLastName = datas[3].firstChild.data;
		 perNum = datas[1].firstChild.data;
		regStatus = datas[4].firstChild.data;


		objeto = { 
			"Entregado": 'No entregado',
			"PerFirstName": perFirstName,
			"PerLastName": perLastName,
			"PerNum": perNum,
			"RegStatus": regStatus
		};
		
		var select = data6.firstChild;
		if(select.checked){
			objetos.push(objeto);
		}
		
	}
	
	var data = { "registros":objetos
				   };
	
	$.ajax({
			type: 'POST',
			crossDomain: true,
			url: 'http://tianguis2017.azurewebsites.net/WebService.asmx/updateGafeteStatus',
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify(data),
			success: function(response) {
				if(response.d !== null && response.d.length == 1){
				}else{
					console.log('hacer algo');
					mostrarDetalleCliente(numeroCompania.innerHTML);
				}
			},
			error: function(error) {
				alert("Failed." + error);
				console.log(error);
			}
		});

}



function obtenerDetalleCliente(numero){
    var ticketActual;
    var clienteBuscado = new Object();
   
	
	 var data;

  
	var datos = {
		companyId:numero
	};
	
	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: 'http://tianguis2017.azurewebsites.net/WebService.asmx/getRegistersSuppliersByCompany',
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(datos),
		success: function(response) {
			if(response.d !== null && response.d.length == 1){
				$('#numeroCompania').text(response.d[0].MemNumber); 
				$('#divNombreCompania').text(response.d[0].CompanyName); 
				$('#numeroSalon').text(response.d[0].Salon); 
				$('#pabellonCompania').text(response.d[0].NombrePabellon);
				$("#suitesCompania").text(response.d[0].PrimaryContact);
				$("#contactoCompania").text(response.d[0].PrimaryContact);
				
				
				
				var arrayGafetesIncluidos;
				var arrayGafetesAdicionales;
				var arrayGafetesNacionales;
				var arrayGafetesStaff;

				if(response.d[0].Registers != undefined){
					for(var gafetes=0; gafetes < response.d[0].Registers.length; gafetes++){
						console.log(response.d[0].Registers[gafetes].Description);
						if(response.d[0].Registers[gafetes].Description === 'Gafete Adicional'){
							arrayGafetesAdicionales = response.d[0].Registers[gafetes].Registros;
						}
						if(response.d[0].Registers[gafetes].Description === 'Gafete Incluido'){
							arrayGafetesIncluidos = response.d[0].Registers[gafetes].Registros;
						}
						if(response.d[0].Registers[gafetes].Description === 'PNNE'){
							arrayGafetesNacionales = response.d[0].Registers[gafetes].Registros;
						}
						if(response.d[0].Registers[gafetes].Description === 'Staff'){
							arrayGafetesStaff = response.d[0].Registers[gafetes].Registros;
						}
					}
				}
				
				/* gafetes incluidos*/
				var b = [];

				if(arrayGafetesIncluidos != undefined){
					for(var i = 0; i < arrayGafetesIncluidos.length; i++){
						var u = {
							editar: '<button  class="editarGafete" id="eliminar'+arrayGafetesIncluidos[i].PerNum+' " onclick="editarGafete('+ arrayGafetesIncluidos[i].PerNum +',this)"></button>',
							noGafete: arrayGafetesIncluidos[i].PerNum, 
							nombreGafete: arrayGafetesIncluidos[i].PerFirstName, 
							apellidoGafete: arrayGafetesIncluidos[i].PerLastName, 
							estatusGafete: arrayGafetesIncluidos[i].RegStatus, 
							entregadoGafete: arrayGafetesIncluidos[i].Entregado,
							seleccionar: '<input type="checkbox" id="cbox2" value="second_checkbox">'
						};

						b[i] = u;
					}	
				}
				
				var dynatable = $('#tablaGafetesIncluidos').dynatable({ 
					dataset: { records: b } }, { features: { pushState: false }}).data("dynatable");
				dynatable.settings.dataset.originalRecords =  b;
				dynatable.process();  
				
				
				/* gafetes incluidos*/
				
					/* gafetes adicionales*/
				var adi = [];
				if(arrayGafetesAdicionales != undefined){
					for(var i = 0; i < arrayGafetesAdicionales.length; i++){
					var u = {
						editar: '<button  class="editarGafete" id="eliminar'+arrayGafetesAdicionales[i].PerNum+' " onclick="editarGafete('+ arrayGafetesAdicionales[i].PerNum +', this)"></button>',
						noGafete: arrayGafetesAdicionales[i].PerNum, 
						nombreGafete: arrayGafetesAdicionales[i].PerFirstName, 
						apellidoGafete: arrayGafetesAdicionales[i].PerLastName, 
						estatusGafete: arrayGafetesAdicionales[i].RegStatus, 
						entregadoGafete: arrayGafetesAdicionales[i].Entregado,
						seleccionar: '<input type="checkbox" id="cbox2" value="second_checkbox">'
					};

					adi[i] = u;
				}	
					}
				var dynatable = $('#tablaGafetesAdicionales').dynatable({ 
					dataset: { records: adi } }, { features: { pushState: false }}).data("dynatable");
				dynatable.settings.dataset.originalRecords =  adi;
				dynatable.process(); 
				
				
				/* gafetes adicionales*/


				/* gafetes nacionales*/
				var nac = [];
				if(arrayGafetesNacionales != undefined){
					for(var i = 0; i < arrayGafetesNacionales.length; i++){
					var u = {
						editar: '<button  class="editarGafete" id="eliminar'+arrayGafetesNacionales[i].PerNum+' " onclick="editarGafete('+ arrayGafetesNacionales[i].PerNum +', this)"></button>',
						noGafete: arrayGafetesNacionales[i].PerNum, 
						nombreGafete: arrayGafetesNacionales[i].PerFirstName, 
						apellidoGafete: arrayGafetesNacionales[i].PerLastName, 
						estatusGafete: arrayGafetesNacionales[i].RegStatus, 
						entregadoGafete: arrayGafetesNacionales[i].Entregado,
						seleccionar: '<input type="checkbox" id="cbox2" value="second_checkbox">'
					};

					nac[i] = u;
				}	
					}
				var dynatable = $('#tablaGafetesNacionales').dynatable({ 
					dataset: { records: nac } }, { features: { pushState: false }}).data("dynatable");
				dynatable.settings.dataset.originalRecords =  nac;
				dynatable.process(); 
				
				
				/* gafetes nacionales*/


				/* gafetes staff*/
				var sta = [];
				if(arrayGafetesStaff != undefined){
					for(var i = 0; i < arrayGafetesStaff.length; i++){
					var u = {
						editar: '<button  class="editarGafete" id="eliminar'+arrayGafetesStaff[i].PerNum+' " onclick="editarGafete('+ arrayGafetesStaff[i].PerNum +', this)"></button>',
						noGafete: arrayGafetesStaff[i].PerNum, 
						nombreGafete: arrayGafetesStaff[i].PerFirstName, 
						apellidoGafete: arrayGafetesStaff[i].PerLastName, 
						estatusGafete: arrayGafetesStaff[i].RegStatus, 
						entregadoGafete: arrayGafetesStaff[i].Entregado,
						seleccionar: '<input type="checkbox" id="cbox2" value="second_checkbox">'
					};
					
					sta[i] = u;
				}
					}
				var dynatable = $('#tablaGafetesStaffs').dynatable({ 
					dataset: { records: sta } }, { features: { pushState: false }}).data("dynatable");
				dynatable.settings.dataset.originalRecords =  sta;
				dynatable.process(); 
				
				
				/* gafetes staff*/

				
				
				$('#detCostoGafeteAdicional').text("$ " +response.d[0].PriceGafeteAdicional); 
				$('#detCostoGafeteNacional').text("$ " +response.d[0].PriceGafetePNNE); 
				$("#divCantGafetesIncluidosDisp").text((response.d[0].Gafetes - b.length) + ' disponibles.');
				
				
				$('#comment1').text(response.d[0].Comentarios1); 
				$('#comment2').text(response.d[0].Comentarios2); 
				$('#comment3').text(response.d[0].Comentarios3); 
				$('#comment4').text(response.d[0].Comentarios4); 
				
				if((response.d[0].Gafetes - b.length) <= 0){
					var select = document.getElementById("selectGafetes");	
					$("select#selectGafetes option[value='Gafete Incluido']").remove(); 
				}else{
					var encontrado = false;
					
					$("#selectGafetes option").each(function(){
						if($(this).text() == 'Gafete Incluido'){
							encontrado = true;
							return false;
						}
					});
					
					if(!encontrado){
						$('#selectGafetes').append('<option value="Gafete Incluido" >Gafete Incluido</option>'); 
					}
					
				}
				
				
				
				
			}else{
				console.log('hacer algo');
				
			}
     	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
     	}
  	});
	
}





function obtenerDetalleClienteFac(numero){
    var ticketActual;
    var clienteBuscado = new Object();
   
	
	 var data;

  
	var datos = {
		companyId:numero
	};
	
	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: 'http://tianguis2017.azurewebsites.net/WebService.asmx/getRegistersSuppliersByCompany',
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(datos),
		success: function(response) {
			if(response.d !== null && response.d.length == 1){
				$('#numeroCompaniaFac').text(response.d[0].MemNumber); 
				$('#divNombreCompaniaFac').text(response.d[0].CompanyName); 
				$('#numeroSalonFac').text(response.d[0].Salon); 
				$('#pabellonCompaniaFac').text(response.d[0].NombrePabellon);
				$("#suitesCompaniaFac").text(response.d[0].PrimaryContact);
				$("#contactoCompaniaFac").text(response.d[0].PrimaryContact);
				
				
				var arrayGafetesIncluidos;
				var arrayGafetesAdicionales;
				var arrayGafetesNacionales;
				var arrayGafetesStaff;

				if(response.d[0].Registers != undefined){
for(var gafetes=0; gafetes < response.d[0].Registers.length; gafetes++){
					console.log(response.d[0].Registers[gafetes].Description);
					if(response.d[0].Registers[gafetes].Description === 'Gafete Adicional'){
						arrayGafetesAdicionales = response.d[0].Registers[gafetes].Registros;
					}
					if(response.d[0].Registers[gafetes].Description === 'Gafete Incluido'){
						arrayGafetesIncluidos = response.d[0].Registers[gafetes].Registros;
					}
					if(response.d[0].Registers[gafetes].Description === 'PNNE'){
						arrayGafetesNacionales = response.d[0].Registers[gafetes].Registros;
					}
					if(response.d[0].Registers[gafetes].Description === 'Staff'){
						arrayGafetesStaff = response.d[0].Registers[gafetes].Registros;
					}

				}
				}

				
				/* gafetes incluidos*/
				var b = [];
				var adi = [];
				var nac = [];
				var sta = [];
				
				if(arrayGafetesIncluidos != undefined){
					for(var i = 0; i < arrayGafetesIncluidos.length; i++){
					var u = {
						noGafete: arrayGafetesIncluidos[i].PerNum, 
						nombreGafete: arrayGafetesIncluidos[i].PerFirstName, 
						apellidoGafete: arrayGafetesIncluidos[i].PerLastName, 
						estatusGafete: arrayGafetesIncluidos[i].RegStatus, 
						entregadoGafete: arrayGafetesIncluidos[i].Entregado,
						seleccionar: '<input type="checkbox" id="cbox2" value="second_checkbox">'
					};

					b[i] = u;
				}	
				}
				
					/* gafetes incluidos*/
				
					/* gafetes adicionales*/
				
				if(arrayGafetesAdicionales != undefined){
					for(var i = 0; i < arrayGafetesAdicionales.length; i++){
					var u = {
						noGafete: arrayGafetesAdicionales[i].PerNum, 
						nombreGafete: arrayGafetesAdicionales[i].PerFirstName, 
						apellidoGafete: arrayGafetesAdicionales[i].PerLastName, 
						estatusGafete: arrayGafetesAdicionales[i].RegStatus, 
						entregadoGafete: arrayGafetesAdicionales[i].Entregado,
						seleccionar: '<input type="checkbox" id="cbox2" value="second_checkbox">'
					};

					b.push(u);
				}	
				}
				
				
				/* gafetes nacionales*/
				if(arrayGafetesNacionales != undefined){
					for(var i = 0; i < arrayGafetesNacionales.length; i++){
					var u = {
						noGafete: arrayGafetesNacionales[i].PerNum, 
						nombreGafete: arrayGafetesNacionales[i].PerFirstName, 
						apellidoGafete: arrayGafetesNacionales[i].PerLastName, 
						estatusGafete: arrayGafetesNacionales[i].RegStatus, 
						entregadoGafete: arrayGafetesNacionales[i].Entregado,
						seleccionar: '<input type="checkbox" id="cbox2" value="second_checkbox">'
					};

					b.push(u);
				}	
				}
				
				


				/* gafetes staff*/
				if(arrayGafetesStaff != undefined){
					for(var i = 0; i < arrayGafetesStaff.length; i++){
					var u = {
						noGafete: arrayGafetesStaff[i].PerNum, 
						nombreGafete: arrayGafetesStaff[i].PerFirstName, 
						apellidoGafete: arrayGafetesStaff[i].PerLastName, 
						estatusGafete: arrayGafetesStaff[i].RegStatus, 
						entregadoGafete: arrayGafetesStaff[i].Entregado,
						seleccionar: '<input type="checkbox" id="cbox2" value="second_checkbox">'
					};
					
					b.push(u);
				}	
				
				}
				
				var dynatable = $('#tablaGafetes').dynatable({ 
					dataset: { records: b } }, { features: { pushState: false }}).data("dynatable");
				dynatable.settings.dataset.originalRecords =  b;
				dynatable.process();  
			

				
				
				$('#detCostoGafeteAdicional').text("$ " +response.d[0].PriceGafeteAdicional); 
				$('#detCostoGafeteNacional').text("$ " +response.d[0].PriceGafetePNNE); 
				
				
				
			}else{
				console.log('hacer algo');
				
			}
     	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
     	}
  	});
	
}


function registrarGafete(){
var ticketActual;
    var clienteBuscado = new Object();
   
   	
	var nombre = $("#txtNombreGafete").val();
	var apellidos = $("#txtApellidoGafete").val();
	
	
	
	
	var nombreCompania = $("#divNombreCompania").text();
	var numeroCompania = $("#numeroCompania").text();
	var tipoGafete = $("#selectGafetes").val();
	
	
	 var data;
  
	var datos = {
		cmpNum:numeroCompania,
		cmpName:nombreCompania,
		perFirstName:nombre,
		perLastName:apellidos,
		buyType:tipoGafete
	};
	
	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: 'http://tianguis2017.azurewebsites.net/WebService.asmx/insertNewRegistro',
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(datos),
		success: function(response) {
			if(response.d !== null && response.d.length == 1){
				
				
				
				
			}else{
				console.log('hacer algo');
				$("#txtNombreGafete").val('');
				$("#txtApellidoGafete").val('');
				mostrarDetalleCliente(numeroCompania);
				
			}
     	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
     	}
  	});
	
}


function actualizarComentario(tipo){
	
	var comentarios = '';
	var categoria = '';

	if(tipo == 1){
		comentarios = $("#comment1").val();
		categoria = 'Gafete Incluido';
	}else if(tipo == 2){
		comentarios = $("#comment2").val();
		categoria = 'Gafete Adicional';
	}else if(tipo == 3){
		comentarios = $("#comment3").val();
		categoria = 'PNNE';
	}else if(tipo == 4){
		comentarios = $("#comment4").val();
		categoria = 'Staff';
	}
	

  
	var datos = {
		comments: comentarios,
		idCompany: numeroCompania.innerHTML,
		category: categoria
	};

	
	$.ajax({
		type: 'POST',
		crossDomain: true,
		url: 'http://tianguis2017.azurewebsites.net/WebService.asmx/updateCompanyComments',
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(datos),
		success: function(response) {
			if(response.d !== null && response.d.length == 1){
				
				
				
				
			}else{
				console.log('hacer algo');
				mostrarDetalleCliente(numeroCompania.innerHTML);
				
			}
     	},
		error: function(error) {
			alert("Failed." + error);
			console.log(error);
     	}
  	});
	
}




// clicks de menu principal
function clickMenuPriTickes(){
    $(".se-pre-con").fadeIn("slow");
    $('#titulo').html('Tickes'); 

    ocultarTodasSecciones();
    elegirOpcion('btnAprobarTickets');
    
    $('#AdminTickets').show('slow');
  
    llenarDatosTicketPorAProbar();
    
}



function clickMenuPriTickesAprobados(){
    $(".se-pre-con").fadeIn("slow");
    $('#titulo').html('Tickes'); 
   
    ocultarTodasSecciones();
    
    $('#AdminTicketsApro').show('slow');
    elegirOpcion('btnTickets');
    
   // $(".se-pre-con").fadeOut("slow");
    
    mostrarTickestAprobados();
   
    
}

function clickMenuPriReportes(){
    $(".se-pre-con").fadeIn("slow");
    $('#titulo').html('Reportes'); 
   
    ocultarTodasSecciones();
    elegirOpcion('btnReportes');
    
  
    //codigo de logica
    
    $('#AdminReportes').show('slow');
    
    $(".se-pre-con").fadeOut("slow");
}


function clickMenuPriConfigurarJuegos(){
    $(".se-pre-con").fadeIn("slow");
    $('#titulo').html('Reportes'); 
    $('#forecastCaptura').hide();
    
    $('#DetalleTicket').hide();
    $('#DetalleCliente').hide();
    $('#Panelconfig').hide();
    $('#AdminReportes').hide();
    $('#AdminTickets').hide();
    $('#AdminTicketsApro').hide();
    $('#Nivel1T').hide();
    $('#proyeccion').hide();
    $('#notimensaje').hide();
    
    $("#btnUsuarios").removeClass("mSelected");
    $("#btnUsuarios").addClass("m");
    $("#btnTickets").removeClass("mSelected");
    $("#btnTickets").addClass("m");
    $("#btnReportes").removeClass("mSelected");
    $("#btnReportes").addClass("m");
    $("#btnConfigurarJuegos").addClass("mSelected");
    
    //codigo de logica
    
    
    $(".se-pre-con").fadeOut("slow");
}





function elegirOpcion(opcion){
    $("#btnUsuarios").removeClass("mSelected");
    $("#btnUsuarios").addClass("m");
    $("#btnAprobarTickets").removeClass("mSelected");
    $("#btnAprobarTickets").addClass("m");
    $("#btnTickets").removeClass("mSelected");
    $("#btnTickets").addClass("m");
    $("#btnReportes").removeClass("mSelected");
    $("#btnReportes").addClass("m");
    $("#btnConfigurarJuegos").removeClass("mSelected");
    $("#btnConfigurarJuegos").addClass("m");
    
    $("#" + opcion).addClass("mSelected");
    
}

function ocultarTodasSecciones(){
    $('#DetalleTicket').hide();
    $('#DetalleCliente').hide();
    $('#Panelconfig').hide();
    $('#AdminTickets').hide();
    $('#AdminTicketsApro').hide();
    $('#AdminReportes').hide();
    $('#Nivel1T').hide();
    $('#proyeccion').hide();
    $('#notimensaje').hide();
    
}


function llenarDatosTicketPorAProbar(){
    var data;
     var usuarioId= sessionStorage.getItem('idUsuario');
    
    data = new FormData();
    //data.append( 'usuariopeticion', '1');
    data.append( 'usuariopeticion', usuarioId);
    $.ajax({
        crossDomain: true,
        type: 'POST',
        contentType:false, 
        //url: 'http://onikom.technology:8080/armatubelleza/ticket/noaprobados',
        url: 'http://onikom.technology:8080/armatubelleza/ticket/pendientes',
        data: data,
        processData: false,
        success: function(data){
            tickesNoAprobados = data;
            if(data){
                //console.log(data);
                var b = [];
                var actual;
                for(var i = 0; i < data.length; i++){
                    actual = data[i];
                    var u = {
                        idTicket: actual.numticket,
                        fechaTicket: actual.fecregistro, 
                        horaTicket: '12:59:00',
                        usuarioTicket: 'Usuario', 
                        montoTicket: '$ ' +actual.monto,
                        imagen: ' <button  class="verTicket" id=eliminar'+i+' onclick="mostrarDetalleTicket('+ actual.ticketId +')"><span id="sta" class="sta glyphicon glyphicon glyphicon-ok"  aria-hidden="true"></span></button>'
                     };
        
                    b[i] = u;
                }
                $('#tablaTicket').dynatable({dataset: {records: b}});   
            }
            $(".se-pre-con").fadeOut("slow");
        }, 
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('error'+XMLHttpRequest.status);
        }
    });
}


function TicketAProbados(){
    var data;

    data = new FormData();
    data.append( 'usuariopeticion', '1');
    $.ajax({
        crossDomain: true,
        type: 'POST',
        contentType:false, 
        url: 'http://onikom.technology:8080/armatubelleza/ticket/noaprobados',
        data: data,
        processData: false,
        success: function(data){
            tickesNoAprobados = data;
            if(data){
                console.log(data);
                var b = [];
                var actual;
                for(var i = 0; i < data.length; i++){
                    actual = data[i];
                    var u = {
                        idTicket: actual.numticket,
                        fechaTicket: actual.fecregistro, 
                        montoTicket: '$ ' +actual.monto, 
                        imagen: ' <button  class="verTicket" id=eliminar'+i+' onclick="mostrarDetalleTicket('+ actual.ticketId +')"><span id="sta" class="sta glyphicon glyphicon glyphicon-ok"  aria-hidden="true"></span></button>'
                     };
        
                    b[i] = u;
                }
                $('#tablaTicket').dynatable({dataset: {records: b}});   
            }
            $(".se-pre-con").fadeOut("slow");
        }, 
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('error'+XMLHttpRequest.status);
        }
    });
}











function descargarT(){
    var imag=myChartB.toBase64Image();
}

function verificarSesion(){
  if(sessionStorage.getItem('status')){
   
  }else{
     window.location.href = 'index.html';
     cerrarsesion();
  }
}

function cerrarsesion(){

  sessionStorage.clear();
  /*signOut();
   firebase.auth().signOut();*/
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      window.location='index.html';
      
    });
    
  }
  function onLoad() {
      gapi.load('auth2', function() {
        gapi.auth2.init();
      });
    }



function convertImgToDataURLviaCanvas(canvas) {

    var cv=document.getElementById(canvas);
   var ctx3=cv.getContext('2d');
   dataURL = cv.toDataURL("image/png");
    var url=dataURL.split(',');
    dataURL=url[1];
    $('.imag').val(dataURL);
    canvas = null;
    if (canvas==null) {
      document.getElementById('miform').submit();
    }
    
}


$('#miform').submit(function(){
    return true;
});




function graficarProyeccion(amount,data){
  console.log(globall)
 var loalcanzado=parseInt(globall[0][23]);

       var  porcentaje=parseInt((loalcanzado*100)/amount);
        if (isNaN(porcentaje)) {
        porcentaje=0;
         }else{
        }
  var actual=parseInt(globall[0][21]);
  if (actual<=amount) {
      $('#imagen').prepend('<img id="theImg" src="../elavonadmin/images/tendencia_Negui.png" width="50%"  height="200Ppx"/>')
  }else{
    $('#imagen').prepend('<img id="theImg" src="../elavonadmin/images/tendencia_Posi.png" width="50%"  height="200Ppx"/>')
  }
      
graficarLoalcanzado(porcentaje,loalcanzado);

}

function graficarLoalcanzado(porcentaje,loalcanzado){
  var ctx = document.getElementById("PbarM-chart");
  if (porcentaje>=100) {
      
    var data = {
    labels: [
        "Actual",
        "Objetivo",
       
    ],
    datasets: [
        {
            data: [porcentaje],
            backgroundColor: [
                Araycolores[1],
               Araycolores[0]
            ],
            hoverBackgroundColor: [
               Araycolores[1],
               Araycolores[0]
            ]
        }]
      };
  }else{
    if (loalcanzado==0 && porcentaje==0) {
       var data = {
    labels: [
        "Actual",
        "Objetivo",
       
    ],
    datasets: [
        {
            data: [0,0],
            backgroundColor: [
                Araycolores[1],
               Araycolores[0]
            ],
            hoverBackgroundColor: [
               Araycolores[1],
               Araycolores[0]
            ]
        }]
      };
      $(".cantidadActual").text("Actual: $"+0);
      $(".cantidadProy").text("Proyección: $"+0);
    }else{
       var resta=100-porcentaje;

     var data = {
        labels: [
            "Actual",
            "Objetivo",
           
        ],
        datasets: [
            {
                data: [resta,porcentaje],
                backgroundColor: [
                    Araycolores[1],
                   Araycolores[0]
                ],
                hoverBackgroundColor: [
                   Araycolores[1],
                   Araycolores[0]
                ]
            }]
          };
          $(".cantidadActual").text("Actual: $"+resta);
          $(".cantidadProy").text("Proyección: $"+porcentaje);
    }
  }

var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
   animation:{
        animateScale:true
    },
    options:{
       responsive:true,
        pan: {
            enabled: true,
            mode: 'y'
          },
          zoom: {
            enabled: true,
            mode: 'x',
            limits: {
              max: 10,
              min: 0.5
            }
          },
    }
});
 
$(".se-pre-con").fadeOut("slow");

}



function graficarCredit(typeCredit){
    var porcentaje=0;
    var loalcanzado=0;
    var credito=[];
    var debito=[];
    var cont=1;
    var conta=2;
    var suma=0;
    var ent=0;
    porcentajes=[];
    for(var i=0;i<typeCredit.length;i++){
      for(var j=1;j<typeCredit[i].length;j++){
        if (cont<typeCredit[i].length && conta<=typeCredit[i].length) {
          credito[ent]=typeCredit[i][cont];
          suma=suma+(parseInt(typeCredit[i][cont]));
        cont=cont+4;
        conta=conta+4;
        ent++;
        }
      }
    }
    console.log(suma)
    ent=0; 
for(var c=0;c<credito.length;c++){
porcentajes[ent]=(credito[c]*100)/suma;
ent++;
}
console.log(porcentajes)


  $("#Nivel2V").hide()
  $("#typeCredit").show("slow");

  var ctx = document.getElementById("Credebito");

       
     var data = {
        labels: [
            "Credebito",
            "Debito",
           
        ],
        datasets: [
            {
                data: porcentajes,
                backgroundColor: [
                    Araycolores[1],
                   Araycolores[0]
                ],
                hoverBackgroundColor: [
                   Araycolores[1],
                   Araycolores[0]
                ]
            }]
          };
          $(".cantidadActual").text("Credito: $"+porcentajes[0]);
          $(".cantidadProy").text("Debito: $"+porcentajes[1]);

var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
   animation:{
        animateScale:true
    },
    options:{
       responsive:true,
        pan: {
            enabled: true,
            mode: 'y'
          },
          zoom: {
            enabled: true,
            mode: 'x',
            limits: {
              max: 10,
              min: 0.5
            }
          },
    }
});



 
$(".se-pre-con").fadeOut("slow");

}
function gVentasestimadasA(){
  var fechaV=[];
  var aux=11;
  var arreglo=[]
  var auxEstimadas=[];
  var x=12;

  for(var i=0;i<Estimadas.length;i++){
    
    fechaV[i]=getDateVA(mesesP[x]);
    auxEstimadas[i]=Estimadas[i];
    arreglo[i]= Estimadas[aux];
    aux--;
    x--;
  }
    
  var ctx = document.getElementById("PbarA-chart");
var data = {
    labels: fechaV,
    datasets: [
        {
            label: "Ventas Estimadas Anuales",
            fill: false,
            lineTension: 0.1,
            backgroundColor: Araycolores[3],
            borderColor: Araycolores[3],
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: Araycolores[3],
            pointBackgroundColor: "#fff",
            pointBorderWidth: 8,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: Araycolores[3],
            pointHoverBorderColor: Araycolores[3],
            pointHoverBorderWidth: 5,
            pointRadius: 5,
            pointHitRadius: 10,
            data: arreglo,
            spanGaps: false,
        }
    ]
};

  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options:{
      responsive:true,
       pan: {
            enabled: true,
            mode: 'y'
          },
          zoom: {
            enabled: true,
            mode: 'x',
            limits: {
              max: 10,
              min: 0.5
            }
          },
    }
   
});
$(".se-pre-con").fadeOut("slow");

}
///////////////////////////////////////Seccion de Graficas diarias ////////////////////////////////////
function ckickTerminos(){
  $('#titulo').html('Terminos y Condiciones'); 
   $('#forecastCaptura').hide();
  $('#Nivel1T').hide();
  $('#Nivel2T').hide();
  $('#Nivel2V').hide();
  $('#proyeccion').hide();
  $('#Panelconfig').hide();
  $('#Terminos').show('slow');
   $('#notimensaje').hide();
    
}


function clickTransacction(){
    $(".se-pre-con").fadeIn("slow");
    $('#titulo').html('Tickes'); 
    $('#forecastCaptura').hide();
    $('#Panelconfig').hide();
    $('#Nivel2T').show('slow');
    $('#Nivel2V').hide();
    $('#Nivel1T').hide();
    $('#proyeccion').hide();
    $('#notimensaje').hide();
  
    //alert('en construccion');
    $(".se-pre-con").fadeOut("slow");
}


function clickTickes(){
    $(".se-pre-con").fadeIn("slow");
    $('#titulo').html('Tickes'); 
    $('#forecastCaptura').hide();
    $('#Panelconfig').hide();
    $('#Nivel2T').show('slow');
    $('#Nivel2V').hide();
    $('#Nivel1T').hide();
    $('#proyeccion').hide();
    $('#notimensaje').hide();
  
    
    $(".se-pre-con").fadeOut("slow");
}

function clickAdminUsuarios(){
    $(".se-pre-con").fadeIn("slow");
    $('#titulo').html('Transacciones'); 
    $('#forecastCaptura').hide();
    $('#Panelconfig').hide();
    $('#Nivel2T').show('slow');
    $('#Nivel2V').hide();
    $('#Nivel1T').hide();
    $('#proyeccion').hide();
    $('#notimensaje').hide();
   /* var paramstr = window.location.search.substr(1);
    var fecha; 
    if(paramstr != null && paramstr.trim() != ''){
        var paramarr = paramstr.split ("&");
        var paramfecha = paramarr[0].split("=");
        fecha = getDaily(paramfecha[1]);
    } else {
        var d = new Date();
        d.setMonth( d.getMonth() - 3 );
        var month = d.getMonth() + 1;
        var day = 1;
        fecha =d.getFullYear()+'-'+ (month<10 ? '0' : '') + month+'-' +(day<10 ? '0' : '') + day;
  }

    fechaG=fecha;
    pDaily(fecha);
    var tipo=0;
    pMactual(fecha,tipo);*/
    $(".se-pre-con").fadeOut("slow");
}

function clickReportes(){
    $(".se-pre-con").fadeIn("slow");
    $('#titulo').html('Transacciones'); 
    $('#forecastCaptura').hide();
    $('#Panelconfig').hide();
    $('#Nivel2T').show('slow');
    $('#Nivel2V').hide();
    $('#Nivel1T').hide();
    $('#proyeccion').hide();
    $('#notimensaje').hide();
    
    //codigo de logica
    alert("en construccion");
    
    $(".se-pre-con").fadeOut("slow");
}




function clickJuego(){
    $(".se-pre-con").fadeIn("slow");
    $('#titulo').html('Transacciones'); 
    $('#forecastCaptura').hide();
    $('#Panelconfig').hide();
    $('#Nivel2T').show('slow');
    $('#Nivel2V').hide();
    $('#Nivel1T').hide();
    $('#proyeccion').hide();
    $('#notimensaje').hide();
   
    //codifo de logica
    alert("en construccion");
    $(".se-pre-con").fadeOut("slow");
}


function clickSale(){
    $(".se-pre-con").fadeIn("slow");
    $('#titulo').html('Ventas'); 
    $('#forecastCaptura').hide();
    $('#Panelconfig').hide();
    $('#Nivel2V').show('slow');
    $('#Nivel1T').hide();
    $('#Nivel2T').hide('slow');
    $('#proyeccion').hide();
    $('#notimensaje').hide();
    var semaforo=0;
    var control=true;
    var paramstr = window.location.search.substr(1);
    var fecha; 
    if(paramstr != null && paramstr.trim() != ''){
        var paramarr = paramstr.split ("&");
        var paramfecha = paramarr[0].split("=");
        fecha = getDaily(paramfecha[1]);
    } else {
        var d = new Date();
        d.setMonth( d.getMonth() - 3 );
        var month = d.getMonth() + 1;
        var day = 1;
        fecha =d.getFullYear()+'-'+ (month<10 ? '0' : '') + month+'-' +(day<10 ? '0' : '') + day;
    }
   
    //pVMactual(fecha); 
   // pVManterior(fecha)
    //pVAanterior(fecha)
    sessionStorage.setItem("fecha",fecha);

    
}

function clickReportes(){
    $(".se-pre-con").fadeIn("slow");
    $('#titulo').html('Reportes'); 
    $('#forecastCaptura').hide();
    $('#Panelconfig').hide();
    $('#Nivel2V').show('slow');
    $('#Nivel1T').hide();
    $('#Nivel2T').hide('slow');
    $('#proyeccion').hide();
    $('#notimensaje').hide();
  

    
}

function clickTransacciones(evt, element){
   
    if (element.length) {
      var index=element[0]['_index'];
    let data = element[0]['_xScale']['ticks'][index];

    var fecha=getDaily(data);
    fechaG=fecha;
      console.log(fecha);
     pDaily(fecha);
var tipo=1;
    pMactual(fecha,tipo);

  }
}



function getDaily(fecha){
  var fechas= fecha.split("_");
  var Mes='Mes';
    var ano=fechas[1];   
       if(fechas[0] == "Enero"){Mes=ano+'-01-01';} 
       if(fechas[0] == "Febrero"){Mes=ano+'-02-01';} 
       if(fechas[0] == "Marzo"){Mes=ano+'-03-01';} 
      if(fechas[0] == "Abril"){Mes=ano+'-04-01';}    
       if(fechas[0] == "Mayo"){Mes=ano+'-05-01';} 
      if(fechas[0] == "Junio"){Mes=ano+'-06-01';} 
      if(fechas[0] == "Julio"){Mes=ano+'-07-01';} 
      if(fechas[0] == "Agosto"){Mes=ano+'-08-01';} 
      if(fechas[0] == "Septiembre"){Mes=ano+'-09-01';}
      if(fechas[0] == "Octubre"){Mes=ano+'-10-01';} 
      if(fechas[0] == "Noviembre"){Mes=ano+'-11-01';} 
      if(fechas[0] == "Diciembre"){Mes=ano+'-12-01';}  
return Mes;
}



function enviarAprobado(tipo){ //2 rechazar, 1 aprobar
    
    var datos = [{"ticketId":idTicketGlobal.ticketId, "aprobado":1}];
    //console.log(JSON.stringify(datos));
  
    $.ajax({
        crossDomain: true,
        dataType: 'json',
        url: "http://onikom.technology:8080/armatubelleza/ticket/status/actualizar",
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        data: JSON.stringify(datos),
        type: 'POST',
        
        success: function(data) {
             console.log(data);
        },
        error: function(){
            console.log('Error!');
        }
    });
}



  function cicloProyeccion(){
  var c=12;
  for(var i=1;i<=12;i++){


  var paramstr = window.location.search.substr(1);
      var fecha; 
      if(paramstr != null && paramstr.trim() != ''){

        var paramarr = paramstr.split ("&");
        var paramfecha = paramarr[0].split("=");
        fecha = getDaily(paramfecha[1]);

      } else {

        var d = new Date();
        //esto se debe de modificar a 2
        d.setMonth( d.getMonth() - i);
        var month = d.getMonth() + 1;
        var day = 1;
        //fecha =d.getFullYear()+'-'+ (month<10 ? '0' : '') + month+'-' +(day<10 ? '0' : '') + day;
        fecha =(day<10 ? '0' : '') + day +'/'+ (month<10 ? '0' : '') + month+ '/' + d.getFullYear();
      }
      mesesP[i]=fecha;
      pProyeccionEstimadas(fecha);
      
    }

      
}


/*
function pProyeccionEstimadas(fecham){
    
var merchant = [{
    merchantId:sessionStorage.getItem('merchant')}
    ]
 var datos = {
        merchant: merchant,
        rfc: sessionStorage.getItem('rfc'),
        date:fecham,
        token:token     
    };

  $.ajax({
        data: JSON.stringify(datos),
        type: 'POST',
        crossDomain: true,
        dataType: 'json',
        url: "http://onikom.technology:8080/MiDataNet/getforecast",
    success: function(data) {
      
       var monto=data['amount']
        
            Estimadas[ciclo]=monto;
            
       
      
         if (ciclo==11) {gVentasestimadasA();}
      
        ciclo++;
     
           
    },
    error: function(){
    console.log('Error!');
        
     
    }

    });
}*/


/*
function pType(fecha){
    var aux=[];
    var merchant = [{
        merchantId:sessionStorage.getItem('merchant')}
    ];
    var datos = {
        type: 'accountType',
        merchant: merchant,
        date: fecha,
        rfc: sessionStorage.getItem('rfc'),
        token:token
    };
    console.log(JSON.stringify(datos));
    
    $.ajax({
        data: JSON.stringify(datos),
        type: 'POST',
        crossDomain: true,
        dataType: 'json',
        url: "http://onikom.technology:8080/MiDataNet/sale/type", 
        success: function(data) {
            console.log(data);
            var copy4=data;
            $.each( copy4, function(a, item){
                for(i in copy4['merchantModel']){
                    var aux3=[];
                    aux3[a]=copy4['merchantModel'][i]['merchantDesc'];
                    c=1;
                    for(j in copy4['merchantModel'][i]['statistic']){
                        aux3[c]=copy4['merchantModel'][i]['statistic'][j]['amount'];
                        c++;
                        aux3[c]=copy4['merchantModel'][i]['statistic'][j]['chargeType'];
                        c++;
                    }
                    typeCredit[i]=aux3;            
                }
            });
            graficarCredit(typeCredit);
            console.log(typeCredit);
        },
        error: function(){
            console.log('Error!');
        }
    });
}*/





















function clickConfig(){
    $(".se-pre-con").fadeIn("slow");
    $('#titulo').html('Reportes'); 
    $('#forecastCaptura').hide();
    
    $('#DetalleTicket').hide();
    $('#DetalleCliente').hide();
  
    $('#AdminReportes').hide();
    $('#AdminTickets').hide();
    $('#AdminTicketsApro').hide();
    $('#Nivel1T').hide();
    $('#proyeccion').hide();
    $('#notimensaje').hide();
      $('#Panelconfig').show('slow');
    
    
     $("#btnUsuarios").removeClass("mSelected");
    $("#btnUsuarios").addClass("m");
    $("#btnTickets").removeClass("mSelected");
    $("#btnTickets").addClass("m");
    $("#btnReportes").removeClass("mSelected");
    $("#btnReportes").addClass("m");
    $("#btnConfigurarJuegos").addClass("mSelected");
    
    
    
    $(".se-pre-con").fadeOut("slow");
}


function createInterface(){
    
    var imagenesX = $("#numImgHor").val();
    var imagenesY = $("#numImgVer").val();
    //alert("creando interface (" + imagenesX +', '+ imagenesY +')');
    var html = "";
    
    for(var i= 0; i<imagenesX; i++){
        html = html+ '<div>';
        for(var j= 0; j<imagenesY; j++){
            html = html+ '<button value="img'+i+ '_'+j+ '"><img  id="img'+i+ '_'+j+ '" src="images/desconocida.png" onclick="cargarImagen('+i+','+j+')"/> </button>';
        }
        html = html+ '</div>';
    }
    
    $( "#rompecabezas" ).html(html);
    
    
}


function cargarImagen(i,j){
    var elemento = "#"+"img"+i+"_"+j;
    posicionActual = elemento;
    $("#myModal").modal('show');
}



function cargarArchivo(){
    var ruta = document.getElementById("myFile").file[0]; 
    alert(posicionActual +' '+ ruta );
    $(posicionActual).attr("src",ruta);
}


function uploadimg(){
$('.selected-foto').find('form').submit(function onsubmit (ev){
      ev.preventDefault();
       var nameImg = $(this).find('input[name="nombre-img"]').val();
      var file = document.getElementById("addImage").files[1];
      console.log(file);
      if(nameImg.length > 1 && file != " "){
      var formData = new FormData();
      formData.append("productId",1);
      formData.append("name", nameImg);
      formData.append("file", file);
      console.log(formData);
    
      } else {
    alert("Los campos no pueden ir vacios.");

    }

     });
}


function irAInicio(){
window.location.href = 'principal_G.html'; 
}


function cerrarSesion(){
	sessionStorage.clear();
	window.location.href = 'index.html'; 
}



function guardarCookie(nombre,valor,fecha) {
	document.cookie = nombre+"="+valor+";expires="+fecha;
 }

         
         