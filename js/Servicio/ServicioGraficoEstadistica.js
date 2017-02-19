angular
.module('AngularABM')
.service('ServicioGraficoEstadistica', function ($http,FactoryRuta) {

	var urlPrincipal= FactoryRuta.graficoEstadistica;
	this.TraerDatos=TraerDatos;
	function TraerDatos(queTraigo){
		return $http.get(urlPrincipal+"TraerDatos/"+JSON.stringify(queTraigo))
		.then(function(respuesta) {     	
			
			return respuesta.data;

		}); 

	}
});