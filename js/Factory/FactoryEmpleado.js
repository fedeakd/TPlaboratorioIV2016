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
	empleado.TraerAtodosLosEmpleado=TraerAtodosLosEmpleado;
	empleado.Alta=Alta;
	empleado.ConfigurarGrilla=ConfigurarGrilla;
	empleado.CambiarEmpleadoLocal=CambiarEmpleadoLocal;
	empleado.BorrarEmpleado=BorrarEmpleado;
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

	function TraerAtodosLosEmpleado(){
		return ServicioPersona.TraerAtodosLosEmpleado();
	}

	function CambiarEmpleadoLocal(paquete){
		return ServicioPersona.CambiarEmpleadoLocal(paquete);
	}
	function BorrarEmpleado(emple){
		return ServicioPersona.BorrarEmpleado(emple);
	}

	function ConfigurarGrilla(){
		var miArray=[
		{ field: 'nombre', name: 'nombre',minWidth: 100},
		{ field: 'apellido', name: 'apellido',minWidth: 200},
		{ field: 'cargo', name: 'cargo',minWidth: 100},
		{ field: 'fechaRegistro', name: 'fechaRegistro',minWidth: 50},
		{ field: 'sueldo', name: 'sueldo',minWidth: 50},
		{
			name:"prueba",cellTemplate:'vista/uiSelect.html'
		},
		{
			field: 'gender',
			editType: 'dropdown',
			enableCellEdit: true,
			editableCellTemplate: 'ui-grid/dropdownEditor',
			editDropdownOptionsArray: "local",
			editDropdownIdLabel: 'type',
			editDropdownValueLabel: 'type'
		}


		]
		return miArray;
	}
})