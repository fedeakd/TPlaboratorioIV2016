<?php 

class Local{
	public $idLocal;
	public $nombre;
	public $direccion;
	public $imagenes;
	public $foto1;
	public $foto2;
	public $foto3;
	public static function CargarDatos($dato){
		$local=new Local();
		//$local->idLocal=$dato->idLocal;
		$local->nombre=$dato->nombre;
		$local->direccion=$dato->direccion;

		return $local;
	}

	public function Insertar()
	{
		$foto1=$this->imagenes[0];
		$foto2=$this->imagenes[1];
		$foto3=$this->imagenes[2];

		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into locales (nombre,direccion,foto1,foto2,foto3 )
			values('$this->nombre',
				'$this->direccion',
				'$foto1',
				'$foto2',
				'$foto3'
				)");
		$consulta->execute();
		return $objetoAccesoDato->RetornarUltimoIdInsertado();


	}
	public static function TraerTodos(){
		$array=[];
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT  *  from locales");
		$consulta->execute();     
		foreach ($consulta->fetchAll() as $row) {
			$fila=[];
			$fila['idLocal']=$row['idLocal'];
			$fila['nombre']=$row['nombre'];
			$fila['direccion']=$row['direccion'];
			$fila['foto1']=$row['foto1'];
			$fila['foto2']=$row['foto2'];
			$fila['foto3']=$row['foto3'];

			array_push($array,$fila);

		}
		return $array;
	}

	public function GuardarLocalProdu($idLocal,$idProducto)
	{
		
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into localesprodu (idLocal,idProducto )
			values($idLocal,
				$idProducto
				)");
		$consulta->execute();
		


	}
	public function BorrarLocalProdu($idLocal,$idProducto)
	{
		
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE  FROM localesprodu WHERE idLocal=$idLocal && idProducto=$idProducto");
		$consulta->execute();


	}
	public function TraerUnLocalProdu($idLocal){
		$array=[];
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT p.nombre, p.precio, p.idProducto,p.foto1,p.foto2,p.foto3 FROM localesprodu AS lp
			INNER JOIN productos AS p ON p.idProducto=lp.idProducto
			INNER JOIN locales AS l ON l.idLocal=lp.idLocal
			WHERE lp.idLocal=$idLocal");
		$consulta->execute(); 
		foreach ($consulta->fetchAll() as $row) {
			$fila=[];
			$fila['idProducto']=$row['idProducto'];
			$fila['precio']=$row['precio'];
			$fila['nombre']=$row['nombre'];
			$fila['foto1']=$row['foto1'];
			$fila['foto2']=$row['foto2'];
			$fila['foto3']=$row['foto3'];
			array_push($array,$fila);

		}
		return $array;

	}


	public function GuardarLocalOferta($idLocal,$idOferta)
	{

		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into localesofertas (idLocal,idOferta )
			values($idLocal,
				$idOferta
				)");
		$consulta->execute();
		


	}
	public function BorrarLocalOferta($idLocal,$idOferta)
	{
		
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE  FROM localesofertas WHERE idLocal=$idLocal && idOferta=$idOferta");
		$consulta->execute();


	}
	public function TraerUnLocalOferta($idLocal){
		$array=[];
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT o.nombre, o.precio, o.idOferta,o.fecha,o.foto1,o.foto2,o.foto3 FROM localesOfertas AS lO
			INNER JOIN ofertas AS o ON o.idOferta=lO.idOferta
			INNER JOIN locales AS l ON l.idLocal=lO.idLocal
			WHERE lO.idLocal=$idLocal");
		$consulta->execute(); 
		foreach ($consulta->fetchAll() as $row) {
			$fila=[];
			$fila['idOferta']=$row['idOferta'];
			$fila['precio']=$row['precio'];
			$fila['nombre']=$row['nombre'];
			$fila['fecha']=$row['fecha'];
			$fila['foto1']=$row['foto1'];
			$fila['foto2']=$row['foto2'];
			$fila['foto3']=$row['foto3'];
			array_push($array,$fila);

		}
		return $array;

	}
	
}

?>