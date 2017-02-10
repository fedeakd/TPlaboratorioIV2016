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
	local.TraerTodos=TraerTodos;
	local.GuardarLocalProdu=GuardarLocalProdu;
	local.TraerUnLocalProdu=TraerUnLocalProdu;
	local.BorrarLocalProdu=BorrarLocalProdu;
	return local;

	function CargarDatos(datos){
		//En cargar los otro datos encargar php

		local.idlocal=datos.idlocal;
		local.nombre= datos.nombre;
		local.direccion= datos.direccion; 
	}
	function TraerTodos(){
		return ServicioLocal.TraerTodos();
	}
	function Alta(){
		return ServicioLocal.Alta(local);
	}
	function GuardarLocalProdu(paquete){
		return ServicioLocal.GuardarLocalProdu(paquete);
	}
	function TraerUnLocalProdu(dato){
		return ServicioLocal.TraerUnLocalProdu(dato);
	}
	function BorrarLocalProdu(paquete){
		return ServicioLocal.BorrarLocalProdu(paquete);
	}
	


})
