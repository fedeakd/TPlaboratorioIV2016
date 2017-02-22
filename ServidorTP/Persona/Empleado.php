<?php
class Empleado extends Usuario{
	public $idEmpleado;
	public $nombre;
	public $apellido;
	public $fechaNacimiento;
	public $documento;
	public $sueldo;
	public $local;
	public $idLocal;
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
	public static function TraerAtodosLosEmpleado(){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta=$objetoAccesoDato->RetornarConsulta("SELECT  u.fechaRegistro, c.nombre  as cargo , e.nombre, e.apellido, e.sueldo, e.idEmpleado,e.idLocal FROM usuarios as u
			INNER JOIN  empleados as e ON u.idUsuario= e.idEmpleado
			INNER JOIN  cargos  as c ON u.idCargo= c.idCargo 
			WHERE u.idEstado=1 and u.idCargo<>4");
		$consulta->execute();
		return $consulta->fetchAll(PDO::FETCH_CLASS, "Empleado");
	}

	public static function ComprobarEncargadoLocal($idLocal){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta=$objetoAccesoDato->RetornarConsulta("SELECT COUNT(*) AS 'cantidad' FROM locales as l
			INNER JOIN empleados as e ON e.idLocal= l.idLocal
			INNER JOIN usuarios as u ON u.idUsuario=e.idEmpleado
			WHERE u.idCargo=3 and  l.idLocal=$idLocal ");
		$consulta->execute();
		return $consulta->fetchAll()[0][0];
	}
	public static  function CambiarEmpleadoLocal($idLocal, $idEmpleado){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		if($idLocal==-1){
			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE empleados SET idLocal=NULL  WHERE idEmpleado=$idEmpleado");
		}
		else{
			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE empleados SET idLocal=$idLocal  WHERE idEmpleado=$idEmpleado");
		}
		
		$consulta->execute();
	}


	public static function Borrar($id){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM empleados where idEmpleado=$id");
		$consulta->execute();
	}

}
?>