angular
.module('AngularABM')
.factory("FactoryProducto", function($http,uiGridConstants,ServicioProducto){
	producto={};
	producto.idProducto=-1;
	producto.nombre="";
	producto.descripcion="";
	producto.precio=-1;
	producto.imagenes=-1;

	producto.CargarDatos=CargarDatos;
	producto.Alta=Alta;
	producto.TraerTodos=TraerTodos;
	producto.ConfigurarGrilla=ConfigurarGrilla;
	producto.Cambio=Cambio;
	producto.Seleccionar=Seleccionar;
	producto.ConfigurarGrillaProducto=ConfigurarGrillaProducto;
	producto.SeleccionarAltaYBaja=SeleccionarAltaYBaja;
	producto.CargarArray=CargarArray;
	return producto;

	function CargarDatos(datos){
		//En cargar los otro datos encargar php

		producto.idProducto=datos.idProducto;
		producto.nombre= datos.nombre;
		producto.descripcion= datos.descripcion; 
		producto.precio=datos.precio;

	}
	function Alta(){
		return ServicioProducto.Alta(producto);
	}
	function TraerTodos(){
		return ServicioProducto.TraerTodos();
	}
	function ConfigurarGrilla(tipo){ 
		/*ng-click=Seleccionar es el que hace posible  que se puede seleccionar la fila 
			row.entity.muestra  agarra la columna muestra y si es true pinta  la fila de un color y sino de otro  es lo que permite simular la multiple seleccion
			*/
			var string="";
			string+='<div ng-click=grid.appScope.Seleccionar(row.entity.muestra,grid.renderContainers.body.visibleRowCache.indexOf(row),';
				string+=tipo;
				string+=') style="background-color: {{row.entity.muestra? \'#a9a9dd \':\'white \'}}; HEIGHT: inherit; "  >';

var miArray=[
{ field: 'nombre', name: 'nombre',minWidth:100,enableSorting: false,rowHeight:500,minHeight:500,
cellTemplate:(string+'{{row.entity.nombre}}</div>')

},
{ field: 'precio', name: 'precio',minWidth: 100,enableSorting: false,rowHeight:500,minHeight:500,
cellTemplate: (string +'{{row.entity.precio}}</div>')},

{ field: 'muestra', name: 'muestra',minWidth: 100,enableSorting: false,visible :false,
cellTemplate:'<div ng-if="false" style="background-color:blue"  >{{row.entity.nombre}}</div>'
},
]
return miArray;
}
function Cambio(grilla,grilla2){
	var existe=false;
	for(var i=0;i<grilla.data.length;i++) {
		if(grilla.data[i].muestra){
			grilla2.data.forEach(function(row2) {
				if(row2.nombre==grilla.data[i].nombre){
					existe=true;
				}
			});
			if(!existe){
				grilla.data[i].muestra=false;
				grilla2.data.push({nombre:grilla.data[i].nombre,precio:grilla.data[i].precio,idProducto:grilla.data[i].idProducto});
				grilla.data.splice(i,1);
				i--;
			}
		}
		existe=false;

	}
}
function Seleccionar (estado,index,grilla){
	/*Permite cambiar el  estado  de la fila  de true a false o viseversa 
	Esto sirve para seleccionar o no  la fila 

	*/
	grilla.data[index].muestra=!estado;
}

function ConfigurarGrillaProducto(LocalProductos, grillaProducto){
	for(var i=0;i<LocalProductos.length;i++) {

		for(var q=0;q<grillaProducto.data.length;q++){

			if(grillaProducto.data[q].nombre==LocalProductos[i].nombre){
				grillaProducto.data.splice(q,1);
				q--;

			}
		}

	}
}
function SeleccionarAltaYBaja(viejo, nuevo){
	var arrayAlta=[];
	var arrayBaja=[];
	var paquete={};
   	var lPV=CargarArray(viejo);
   	var lPN=CargarArray(nuevo);
	for(var i=0;i<lPV.length;i++) {
		for(var q=0;q<lPN.length;q++){
			if(lPN[q].nombre==lPV[i].nombre){
				lPN.splice(q,1);
				lPV.splice(i,1);
				q--;
				i--;
				break;
			}
		}
	}
	paquete.lPV=lPV;
	paquete.lPN=lPN;
	return paquete;
}
function CargarArray(array){
	contenedor=[];

	array.forEach(function( produ){
		contenedor.
		push(produ);
	});
	return contenedor;
}

})