<?php 
class Usuario{
	public $idUsuario;
	public $mail;
	public $usuario;
	public $clave;
	public $fechaRegistro;
	public $cargo;
	public $estado;
	function __construct(){
	}
	public static function TraerUnUsuario($mail,$clave){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT u.idUsuario,  u.nombre as 'usuario', u.clave, u.mail, u.fechaRegistro
			, c.nombre as 'cargo', e.nombre as 'estado' from usuarios as u
			inner join cargos as c  on u.idCargo = c.idCargo  
			inner join estados as e  on u.idEstado = e.idEstado 
			where mail='$mail' && clave='$clave'");
		$consulta->execute();
		$per= $consulta->fetchObject('Cliente');
		return $per;       

	}
	public static function TraerTodos(){

		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT u.idUsuario,  u.nombre as 'usuario', u.clave, u.mail, u.fechaRegistro
			, c.nombre as 'cargo', e.nombre as 'estado' from usuarios as u
			inner join cargos as c  on u.idCargo = c.idCargo  
			inner join estados as e  on u.idEstado = e.idEstado");
		$consulta->execute();     
		return $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");
	}
	public static function CambiarEstado($id, $cambia){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuarios SET idEstado=$cambia where idUsuario=$id ");
		$consulta->execute();
	}
	public function CargarUsuario($user){
		$this->idUsuario=$user->idUsuario;
		$this->usuario=$user->usuario;
		$this->clave=$user->clave;
		$this->mail=$user->mail;
		$this->fechaRegistro=$user->fechaRegistro;
		$this->cargo=$user->cargo;
		$this->estado=$user->estado; 

	}
	public function InsertarUsuario(){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into usuarios (mail,nombre,clave,fechaRegistro,idcargo,idestado) 
			values('$this->mail',
				'$this->usuario',
				'$this->clave',
				'$this->fechaRegistro',
				$this->cargo,
				$this->estado
				)");
		$consulta->execute();
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}
	public static function VerificarMailYUsuario($mail,$usuario){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();  
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from usuarios where mail='$mail' || nombre='$usuario'");
		$consulta->execute();
		return $consulta->rowCount();            

	}

}


?>