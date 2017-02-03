angular
.module('AngularABM')
.factory("FactoryRuta", function($http,uiGridConstants){
	ruta={};
	ruta.principal="http://localhost:81/Laboratorio4/TPlaboratorioIV2016/ServidorTP/";
	ruta.persona=ruta.principal+"Persona/";
	ruta.producto=ruta.principal+"Producto/";
	ruta.local=ruta.principal+"Local/";
	ruta.general=ruta.principal+"General/";
	ruta.imagen="fotos/";
	ruta.imagenTemporal=ruta.general+"SubirImagenTemporal";

	return ruta;

});