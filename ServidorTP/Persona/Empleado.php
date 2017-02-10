<?php
class Empleado extends Usuario{
	public $idEmpleado;
	public $nombre;
	public $apellido;
	public $fechaNacimiento;
	public $documento;
	public $sueldo;
	public $local;
	public static function Prueba(){
		echo "hola";
	}


	public static function CargarDatos($user){
		$empleado= new Empleado();
		$empleado->nombre=$user->nombre;
		$empleado->apellido=$user->apellido;
		$empleado->fechaNacimiento=$user->fechaNacimiento;
		$empleado->documento=$user->documento;
		$empleado->sueldo=$user->sueldo;
		$empleado->mail=$user->usuario->mail;
		$empleado->usuario=$user->usuario->usuario;
		$empleado->clave=$user->usuario->clave;
		$empleado->fechaRegistro=date('Y-m-d H:i:s');
		$empleado->cargo=$user->usuario->cargo;
		$empleado->estado=1;
		return $empleado;
	}

	public function InsertarEmpleado(){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into empleados (idEmpleado,nombre,apellido,
			fechaNacimiento,documento,sueldo) 
		values($this->idUsuario,
			'$this->nombre',
			'$this->apellido',
			'$this->fechaNacimiento',
			$this->documento,
			$this->sueldo
			)");
		$consulta->execute();
	}

	public  function TraerUnEmpleado($id){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta=$objetoAccesoDato->RetornarConsulta("SELECT * from empleados where idEmpleado=$id  ");
		$consulta->execute();
		$array=$consulta->fetchAll()[0];
		$this->idEmpleado=$array[0];
		$this->nombre =$array[1];
		$this->apellido =$array[2];
		$this->fechaNacimiento =$array[3];
		$this->sueldo=$array[4];
		$this->local=$array[5];
		$this->documento=$array[6];

		
		return $consulta->fetchObject('Cliente');

	}
}
?>