angular
.module('AngularABM')
.service('ServicioUsuario', function ($http) {
	var urlPersona= "http://localhost:81/ServidorTP/persona/";
	this.VerificarLogin=VerificarLogin;
	function VerificarLogin(persona){
		return $http.get(urlPersona+"/verificar/"+JSON.stringify(persona)).then(function(data){
			return data.data;
		});
	}



})
