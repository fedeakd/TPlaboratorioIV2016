angular
.module('AngularABM')
.factory("FactoryOferta", function($http,ServicioOferta,uiGridConstants,FactoryUsuario){
	oferta={};
	oferta.idOferta=-1;
	oferta.nombre="";
	oferta.fecha="";
	oferta.precio=-1;
	oferta.imagenes=[];
	oferta.productos=[];

	oferta.CargarDatos=CargarDatos;
	oferta.Alta=Alta;
	oferta.TraerTodos=TraerTodos;
	oferta.ConfigurarGrillaProducto=ConfigurarGrillaProducto;
	oferta.ConfigurarGrilla=ConfigurarGrilla;
	oferta.Cambio=Cambio;
	return oferta;
	function CargarDatos(datos){
		oferta.idOferta=datos.idOferta;
		oferta.nombre= datos.nombre;
		oferta.fecha= FactoryUsuario.DameFecha( datos.fecha); 
		oferta.precio=datos.precio;
		oferta.imagenes=datos.imagenes;
		oferta.productos=datos.productos;
	}

	function Alta ( ){
		return ServicioOferta.Alta(oferta);
	}
	function TraerTodos (){
		return ServicioOferta.TraerTodos();

	}
	function Cambio(grilla,grilla2){
		console.log("ggg");
		var existe=false;
		for(var i=0;i<grilla.data.length;i++) {
			if(grilla.data[i].muestra){
				grilla2.data.forEach(function(row2) {
					if(row2.nombre==grilla.data[i].nombre){
						existe=true;
					}
				});
				if(!existe){
					console.log("entro");
					grilla.data[i].muestra=false;
					grilla2.data.push({nombre:grilla.data[i].nombre,
						precio:grilla.data[i].precio,
						fecha:grilla.data[i].fecha,
						idOferta:grilla.data[i].idOferta});
					grilla.data.splice(i,1);
					i--;
				}
			}
			existe=false;

		}
	}
	function ConfigurarGrillaProducto (){
		
		grilla=[
		{ name: 'nombre', displayName: 'nombre' },
		{ name: 'precio', displayName: 'precio' , type: 'number' ,enableSorting: false},
		{ name: 'cantidad',  enableCellEdit: true},
		];
		return grilla;
	}

	function ConfigurarGrilla (tipo){
		var string="";
		string+='<div ng-click=grid.appScope.Seleccionar(row.entity.muestra,grid.renderContainers.body.visibleRowCache.indexOf(row),';
			string+=tipo;
			string+=') style="background-color: {{row.entity.muestra? \'#a9a9dd \':\'white \'}}; HEIGHT: inherit; "  >';
grilla=[
{ field: 'nombre', name: 'nombre',minWidth:100,enableSorting: false,rowHeight:1000,minHeight:1000,
cellTemplate:(string+'{{row.entity.nombre}}</div>')

},
{ field: 'precio', name: 'precio',minWidth: 100,enableSorting: false,rowHeight:500,minHeight:500,
cellTemplate: (string +'{{row.entity.precio}}</div>')},
{ field: 'fecha', name: 'fecha',minWidth: 100,enableSorting: false,rowHeight:500,minHeight:500,
cellTemplate: (string +'{{row.entity.fecha}}</div>')},


{ field: 'muestra', name: 'muestra',minWidth: 100,enableSorting: false,visible :false,
cellTemplate:'<div ng-if="false" style="background-color:blue"  >{{row.entity.nombre}}</div>'
},
]
return grilla;
}


})