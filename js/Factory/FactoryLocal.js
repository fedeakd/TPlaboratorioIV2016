angular
.module('AngularABM')
.factory("FactoryLocal", function($http,uiGridConstants,ServicioLocal){
	local={};
	local.idLocal=-1;
	local.nombre="";
	local.direccion="";
	local.imagenes=[];

	local.CargarDatos=CargarDatos;
	local.Alta=Alta;
	return local;

	function CargarDatos(datos){
		//En cargar los otro datos encargar php

		local.idlocal=datos.idlocal;
		local.nombre= datos.nombre;
		local.direccion= datos.direccion; 
	}
	function Alta(){
		return ServicioLocal.Alta(local);
	}

})