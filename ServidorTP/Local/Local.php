<?php 

class Local{
	public $idLocal;
	public $nombre;
	public $direccion;
	public $imagenes;

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
}


?>