angular
.module('AngularABM')
.factory("FactoryCliente", function($http,ServicioPersona,uiGridConstants,FactoryUsuario){
	cliente={};
	cliente.idCliente=-1;
	cliente.nombre="";
	cliente.apellido=""; 
	cliente.ciudad="";
	cliente.domicilio="";
	cliente.fechaNacimiento="";
	cliente.documento=-1;

	cliente.usuario=FactoryUsuario;

	cliente.CargarDatos=CargarDatos;
	cliente.CargarUsuario=CargarUsuario;
	cliente.Alta=Alta;
	cliente.VerificarLogin=VerificarLogin;
	return cliente;
	function CargarUsuario(per){
		cliente.mail= per.mail;
		cliente.clave= per.clave;
	
	}
	function CargarDatos(per,ban){
		//En cargar los otro datos encargar php

		cliente.idCliente=per.idCliente;
		cliente.nombre= per.nombre;
		cliente.apellido= per.apellido; 
		cliente.ciudad= per.ciudad;
		cliente.domicilio= per.domicilio;
		cliente.fechaNacimiento=ban?cliente.usuario.DameFecha(per.fechaNacimiento):per.fechaNacimiento;///true si  viene del regitro false si lo traigo de la bd 
		cliente.documento=per.documento;
		cliente.usuario.CargarDatos(per);


		
	}
	function Alta(){
		return ServicioPersona.AltaCliente(cliente);
	}

	function VerificarLogin(){
		return ServicioPersona.VerificarLogin(cliente);
	}

});