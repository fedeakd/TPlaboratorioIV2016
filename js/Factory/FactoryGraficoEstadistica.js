angular
.module('AngularABM')
.factory("FactoryGraficoEstadistica", function($http,uiGridConstants,ServicioGraficoEstadistica){

	grafico={};
	grafico.nombre="simulcro";
	grafico.TraerDatos=TraerDatos;
	return grafico;


	function TraerDatos(queTraigo){
		return ServicioGraficoEstadistica.TraerDatos(queTraigo);

	}

})