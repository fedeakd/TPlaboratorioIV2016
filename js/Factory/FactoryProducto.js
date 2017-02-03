angular
.module('AngularABM')
.factory("FactoryProducto", function($http,uiGridConstants,ServicioProducto){
	producto={};
	producto.idProducto=-1;
	producto.nombre="";
	producto.descripcion="";
	producto.precio=-1;
	producto.imagenes=-1;

	producto.CargarDatos=CargarDatos;
	producto.Alta=Alta;
	producto.TraerTodos=TraerTodos;
	return producto;

	function CargarDatos(datos,ban){
		//En cargar los otro datos encargar php

		producto.idProducto=datos.idProducto;
		producto.nombre= datos.nombre;
		producto.descripcion= datos.descripcion; 
		producto.precio=datos.precio;
	}
	function Alta(){
		return ServicioProducto.Alta(producto);
	}
	function TraerTodos(){
		return ServicioProducto.TraerTodos();
	}
})