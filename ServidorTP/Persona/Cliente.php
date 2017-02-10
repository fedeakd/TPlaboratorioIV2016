<?php
include('Usuario.php');
class Cliente extends Usuario{
	public $idCliente;
	public $nombre;
	public $apellido;
	public $ciudad;
	public $domicilio;
	public $fechaNacimiento;
	public $documento;
	function __construct(){
	}

	public static function CargarDatos($user){
		$cli= new Cliente();
		$cli->nombre=$user->nombre;
		$cli->apellido=$user->apellido;
		$cli->ciudad=$user->ciudad;
		$cli->domicilio=$user->domicilio;
		$cli->fechaNacimiento=$user->fechaNacimiento;
		$cli->documento=$user->documento;
		$cli->mail=$user->usuario->mail;
		$cli->usuario=$user->usuario->usuario;
		$cli->clave=$user->usuario->clave;
		$cli->fechaRegistro=date('Y-m-d H:i:s');
		$cli->cargo=1;
		$cli->estado=1; 
		return $cli;
	}

	public function toString(){
		return "$this->nombre-$this-apellido-$this->ciudad-$this->usuario-$this-clave";

	}
	public function InsertarCliente()
	{
	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into clientes (idCliente,nombre,apellido,ciudad,domicilio,
			fechaNacimiento,documento) 
		values($this->idUsuario,
			'$this->nombre',
			'$this->apellido',
			'$this->ciudad',
			'$this->domicilio',
			'$this->fechaNacimiento',
			$this->documento
			)");
		$consulta->execute();
		//return $objetoAccesoDato->RetornarUltimoIdInsertado();


	}
	public static function SiExiste($usuario){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from usuarios where usuario='$usuario'");
		$consulta->execute();
		return $consulta->rowCount();            

	}
	public static function VerificarLogeo($mail,$clave){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from usuarios where mail='$mail' && clave='$clave'");
		$consulta->execute();
		return $consulta->rowCount();            

	}

	public static function ComprobarUsuarioYClave($usuario,$clave){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT estado, usuario  as usuario ,clave as clave from usuarios where usuario='$usuario' && clave='$clave'");
		$consulta->execute();
		$per= $consulta->fetchObject('Persona');
		return $per; 
	}
	public static function TraerTodosLosUsuarios(){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from usuarios");
		$consulta->execute();     
		return $consulta->fetchAll(PDO::FETCH_CLASS, "Persona"); 
	}
	public static function BorrarUsuario($id){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("
			delete 
			from Usuarios        
			WHERE id=:id"); 
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);    
		$consulta->execute();
		return $consulta->rowCount();
	}

	public static function TraerUnUsuario($mail,$clave){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from personas where mail='$mail' && clave='$clave'");
		$consulta->execute();
		$per= $consulta->fetchObject('Cliente');
		return $per;       

	}
	public static function ModificarUsuario($obj,$id,$cambioImagen){
		try{
			$cadena="";
			if($cambioImagen){
				$cadena="UPDATE usuarios
				SET nombre='$obj->nombre',
				usuario='$obj->usuario',
				mail='$obj->mail',
				clave='$obj->clave',
				imagenCantidad='$obj->imagenCantidad'
				WHERE id='$id'";
				
			}
			else{
				$cadena="UPDATE usuarios
				SET nombre='$obj->nombre',
				usuario='$obj->usuario',
				mail='$obj->mail',
				clave='$obj->clave'
				WHERE id='$id';
				";
			}	

			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta($cadena);
		}catch(exception $e){
			echo $e->getMessage();
		}
		return $consulta->execute();
	}
	public  function TraerUnCliente($id){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta=$objetoAccesoDato->RetornarConsulta("SELECT * from clientes where idCliente=$id  ");
		$consulta->execute();
		$array=$consulta->fetchAll()[0];
		$this->idCliente=$array[0];
		$this->nombre =$array[1];
		$this->apellido =$array[2];
		$this->ciudad =$array[3];
		$this->domicilio =$array[4];
		$this->fechaNacimiento =$array[5];
		$this->documento=$array[6];
		
		return $consulta->fetchObject('Cliente');

	}

}

?>
