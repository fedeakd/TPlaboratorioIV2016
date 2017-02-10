angular
.module('AngularABM')
.service('ServicioLocal', function ($http,FactoryRuta) {
	var urlPrincipal= FactoryRuta.local;
	this.Alta=Alta;
	this.TraerTodos=TraerTodos;
	this.TraerUnLocalProdu=TraerUnLocalProdu;
	this.GuardarLocalProdu=GuardarLocalProdu;
	this.BorrarLocalProdu=BorrarLocalProdu;
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
	function TraerUnLocalProdu(dato){
		return $http.get(urlPrincipal+"TraerUnLocalProdu/"+JSON.stringify(dato))
		.then(function(respuesta) {     	
			
			return respuesta.data;

		});
	}
	function GuardarLocalProdu(dato){
		return $http.post(urlPrincipal+"GuardarLocalProdu/"+JSON.stringify(dato))
		.then(function(respuesta) {     	
			
			return respuesta.data;

		});   
	}
	function BorrarLocalProdu(dato){
		return $http.post(urlPrincipal+"BorrarLocalProdu/"+JSON.stringify(dato))
		.then(function(respuesta) {     	
			
			return respuesta.data;

		});   
	}
})