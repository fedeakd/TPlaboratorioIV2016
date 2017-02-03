angular
.module('AngularABM')
.service('ServicioLocal', function ($http,FactoryRuta) {
	var urlPrincipal= FactoryRuta.local;
	this.Alta=Alta;
	function Alta(dato){
		return $http.post(urlPrincipal+"alta/"+JSON.stringify(dato))
		.then(function(respuesta) {     	
			
			return respuesta.data;

		});   

	} 
})