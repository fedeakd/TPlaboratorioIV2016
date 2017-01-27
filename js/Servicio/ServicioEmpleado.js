angular
.module('AngularABM')
.service('ServicioEmpleado', function ($http) {
	var urlPersona= "http://localhost:81/ServidorTP/persona/";
	this.Alta=Alta;
	function Alta(persona){
		return $http.post(urlPersona+"altaEmpleado/"+JSON.stringify(persona))
		.then(function(respuesta) {     	
			
			return respuesta.data;

		});   

	} 
})