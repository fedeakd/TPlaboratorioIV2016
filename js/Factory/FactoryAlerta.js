angular
.module('AngularABM')
.factory("FactoryAlerta", function($http,uiGridConstants){
	alerta={};
	alerta.titulo="";
	alerta.mensaje="";
	alerta.tipo="";

	alerta.Mostrar=Mostrar;
	return alerta;
	function Mostrar(titulo, mensaje,tipo){
		swal({
			title: titulo,
			text:mensaje,
			type:tipo,
			confirmButtonText: "Aceptar"
		});
	}


});