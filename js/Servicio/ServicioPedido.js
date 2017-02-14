angular
.module('AngularABM')
.service('ServicioPedido', function ($http,FactoryRuta) {

	var urlPrincipal= FactoryRuta.pedido;
	this.Alta=Alta;
	this.TraerTodos=TraerTodos;
	function Alta(dato){
		return $http.post(urlPrincipal+"alta/"+JSON.stringify(dato))
		.then(function(respuesta) {     	
			
			return respuesta.data;

		});   

	} 
	function TraerTodos(){
		return $http.get(urlPrincipal+"TraerTodos")
		.then(function(respuesta) {     	
			
			return respuesta.data;

		});
	}

});