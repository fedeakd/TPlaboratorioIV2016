angular
.module('AngularABM')
.factory("FactoryUsuario", function($http,ServicioPersona,uiGridConstants){
	usuario={};
	usuario.idUsuario=-1;
	usuario.usuario="";
	usuario.mail="";
	usuario.clave=""; 
	usuario.cargo="";
	usuario.estado="";
	usuario.fechaRegistro="";

	usuario.CargarUsuario=CargarUsuario;
	usuario.VerificarLogin=VerificarLogin;
	usuario.CargarDatos=CargarDatos;
	usuario.DameFecha=DameFecha;
	usuario.ConfigurarGrilla=ConfigurarGrilla;
	usuario.TraerTodos=TraerTodos;
	usuario.CambiarEstado=CambiarEstado;
	return usuario;
	function CargarUsuario(per){
		usuario.mail= per.mail;
		usuario.clave= per.clave;

	}
	function CargarDatos(per){
		//En cargar los otro datos encargar php
		usuario.idUsuario=per.idUsuario;
		usuario.usuario= per.usuario;
		usuario.mail= per.mail;
		usuario.clave= per.clave; 
		usuario.estado= per.estado;
		usuario.cargo= per.cargo;
		usuario.fechaRegistro= per.fechaRegistro;

	}

	function CambiarEstado(per){
		return ServicioPersona.CambiarEstado(per);
	}


	function VerificarLogin(){
		return ServicioPersona.VerificarLogin(usuario);
	}
	function TraerTodos(){
		return ServicioPersona.TraerTodos();
	}
	function DameFecha(fecha){
		var dia= fecha.getDate()<10? "0"+ fecha.getDate(): fecha.getDate();
		var mes= fecha.getMonth()+1<10? "0"+ (fecha.getMonth()+1): fecha.getMonth()+1;
		return fecha.getFullYear()+"-"+mes+"-"+dia;
	}

	function ConfigurarGrilla(){
		var miArray=[
		{ field: 'usuario', name: 'usuario',minWidth: 100},
		{ field: 'mail', name: 'mail',minWidth: 200},
		{ field: 'cargo', name: 'cargo',minWidth: 100},
		{ field: 'fechaRegistro', name: 'fecha de registro',minWidth: 50},
		{ field: 'estado', name: 'estado',minWidth: 50
		,cellTemplate:'<button ng-click="grid.appScope.CambiarEstado(row.entity,grid.renderContainers.body.visibleRowCache.indexOf(row))" class="btn btn-default btn-block"><i class="glyphicon glyphicon-refresh">&nbsp;{{row.entity.estado}}</i></button>'
		, enableFiltering: false}
		]
		return miArray;
	}
});