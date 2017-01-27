angular
.module('AngularABM')
.service('ServicioPersona', function ($http) {
	var urlPersona= "http://localhost:81/ServidorTP/persona/";
	this.AltaCliente=AltaCliente;
	this.AltaEmpleado=AltaEmpleado;
	this.VerificarLogin=VerificarLogin;
	function AltaCliente(persona){
		return $http.post(urlPersona+"altaCliente/"+JSON.stringify(persona))
		.then(function(respuesta) {     	
			
			return respuesta.data;

		});   

	} 
	function VerificarLogin(persona){
		return $http.get(urlPersona+"/verificar/"+JSON.stringify(persona)).then(function(data){
			return data.data;
		});
	}
	function AltaEmpleado(persona){
		return $http.post(urlPersona+"altaEmpleado/"+JSON.stringify(persona))
		.then(function(respuesta) {     	
			
			return respuesta.data;

		});   

	} 


})
