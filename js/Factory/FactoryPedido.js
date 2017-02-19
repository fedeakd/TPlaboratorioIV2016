angular
.module('AngularABM')
.factory("FactoryPedido", function($http,ServicioPedido,uiGridConstants){
	pedido={};
	pedido.idPedido="";
	pedido.fecha="";
	pedido.direccion="";
	pedido.idLocal="";
	pedido.idCliente="";
	pedido.productos=[];
	pedido.ofertas=[];
	pedido.precio=0;

	pedido.CargarDatos=CargarDatos;
	pedido.Alta=Alta;
	pedido.TraerTodos=TraerTodos;
	pedido.TraerPedido=TraerPedido;
	pedido.ConfigurarGrilla=ConfigurarGrilla;
	return pedido;
	function CargarDatos(datos){
		pedido.direccion= datos.direccion;
		pedido.idLocal=datos.local.idLocal;
		pedido.idCliente=datos.idCliente;
		pedido.productos=datos.productos;
		pedido.ofertas=datos.ofertas;
		pedido.precio=datos.precio;
	}

	function Alta ( ){
		return ServicioPedido.Alta(pedido);
	}
	function TraerTodos (){
		return ServicioPedido.TraerTodos();

	}
	function TraerPedido(idEmpleado){
		return ServicioPedido.TraerPedido(idEmpleado);
	}


	function ConfigurarGrilla(){
		var miArray=[
		{ field: 'nombreC', name: 'Cliente',minWidth: 100},
		{ field: 'nombreL', name: 'Local',minWidth: 200},
		{ field: 'precio', name: 'precio',minWidth: 100},
		{ field: 'fecha', name: 'fecha',minWidth: 50},
		]
		return miArray;
	}
});