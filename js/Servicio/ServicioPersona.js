angular
.module('AngularABM')
.service('ServicioPersona', function ($http,FactoryRuta) {
	var urlPersona= FactoryRuta.persona;
	this.AltaCliente=AltaCliente;
	this.AltaEmpleado=AltaEmpleado;
	this.VerificarLogin=VerificarLogin;
	this.TraerTodos=TraerTodos;
	this.TraerAtodosLosEmpleado=TraerAtodosLosEmpleado;
	this.CambiarEstado=CambiarEstado;
	this.CambiarEmpleadoLocal=CambiarEmpleadoLocal;
	this.BorrarEmpleado=BorrarEmpleado;
	
	function AltaCliente(persona){
		return $http.post(urlPersona+"altaCliente/"+JSON.stringify(persona))
		.then(function(respuesta) {     	
			
			return respuesta.data;

		});   

	} 
	function VerificarLogin(persona){
		return $http.get(urlPersona+"verificar/"+JSON.stringify(persona)).then(function(data){
			return data.data;
		});
	}
	function AltaEmpleado(persona){
		return $http.post(urlPersona+"altaEmpleado/"+JSON.stringify(persona))
		.then(function(respuesta) {     	
			
			return respuesta.data;

		});   

	} 
	function TraerTodos(){
		return $http.get(urlPersona+"TraerTodos")
		.then(function(respuesta) {     	
			
			return respuesta.data;

		});
	}
	function TraerAtodosLosEmpleado(){
		return $http.get(urlPersona+"TraerAtodosLosEmpleado")
		.then(function(respuesta) {     	
			
			return respuesta.data;

		});
	}
	function CambiarEstado(persona){
		return $http.put(urlPersona+"CambiarEstado/"+JSON.stringify(persona))
		.then(function(respuesta) {     	
			
			return respuesta.data;

		});
	} 
	function CambiarEmpleadoLocal(paquete){
		return $http.put(urlPersona+"CambiarEmpleadoLocal/"+JSON.stringify(paquete))
		.then(function(respuesta) {     	
			
			return respuesta.data;

		});
	} 
	function BorrarEmpleado(empleado){
		return $http.delete(urlPersona+JSON.stringify(empleado))
		.then(function(respuesta) {     	
			
			return respuesta.data;

		});
	} 
})
