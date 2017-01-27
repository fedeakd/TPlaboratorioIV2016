angular
.module('AngularABM')
.factory("FactoryEmpleado", function($http,ServicioPersona,uiGridConstants,FactoryUsuario){
	empleado={};
	empleado.idEmpleado=-1;
	empleado.nombre="";
	empleado.apellido="";
	empleado.fechaNacimiento="";
	empleado.sueldo=-1;
	empleado.local=-1;
	empleado.documento=-1;

	empleado.usuario=FactoryUsuario;

	empleado.CargarDatos=CargarDatos;
	empleado.Alta=Alta;
	return empleado;

	function CargarDatos(per,ban){
		//En cargar los otro datos encargar php

		empleado.idEmpleado=per.idEmpleado;
		empleado.nombre= per.nombre;
		empleado.apellido= per.apellido; 
		empleado.fechaNacimiento=ban?empleado.usuario.DameFecha(per.fechaNacimiento):per.fechaNacimiento;///true si  viene del regitro false si lo traigo de la bd 
		empleado.documento=per.documento;
		empleado.sueldo=per.sueldo;
		empleado.local=per.local;
		empleado.usuario.CargarDatos(per);
	}
	function Alta(){
		return ServicioPersona.AltaEmpleado(empleado);
	}

})