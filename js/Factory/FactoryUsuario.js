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


	function VerificarLogin(){
		return ServicioPersona.VerificarLogin(usuario);
	}

	function DameFecha(fecha){
		var dia= fecha.getDate()<10? "0"+ fecha.getDate(): fecha.getDate();
		var mes= fecha.getMonth()+1<10? "0"+ (fecha.getMonth()+1): fecha.getMonth()+1;
		return fecha.getFullYear()+"-"+mes+"-"+dia;
	}
});