<?php

class Oferta{
	public $idOferta;
	public $nombre;
	public $fecha;
	public $precio;
	public $imagenes;
	public $productos;
	public $foto1;
	public $foto2;
	public $foto3;
	public static function CargarDatos($dato){
		$oferta=new Oferta();
		//$oferta->idOferta=$dato->idOferta;
		$oferta->nombre=$dato->nombre;
		$oferta->fecha=$dato->fecha;
		$oferta->precio=$dato->precio;
		$oferta->imagenes=$dato->imagenes;
		$oferta->productos=$dato->productos;


		return $oferta;
	}
	public function toString(){
		return "$this->nombre-$this-apellido-$this->ciudad-$this->usuario-$this-clave";

	}
	public function InsertarOferta()
	{

		$foto1=$this->imagenes[0];
		$foto2=$this->imagenes[1];
		$foto3=$this->imagenes[2];
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into Ofertas (nombre,fecha,precio,foto1,foto2,foto3 )
			values('$this->nombre',
				'$this->fecha',
				$this->precio,
				'$foto1',
				'$foto2',
				'$foto3'
				)");
		$consulta->execute();


	}

	public static function InsertarProducto($idOferta, $idProdu,$cantidad){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into ofertasproductos(idOferta , idProducto, cantidad ) values ($idOferta, $idProdu, $cantidad) ");
		$consulta->execute();
	}

	public static function TraerTodos(){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT *  from ofertas");
		$consulta->execute();     
		return $consulta->fetchAll(PDO::FETCH_CLASS, "Oferta"); 
	}
	public static function Borrar($id){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("
			delete 
			from  Ofertas
			WHERE id=:id"); 
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);    
		$consulta->execute();
		return $consulta->rowCount();
	}
	public static function Modificar($obj,$id){
		try{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				UPDATE Ofertas
				SET nombre='$obj->nombre',
				precio='$obj->precio',
				descripcion='$obj->descripcion'
				WHERE id='$id'");
		}catch(exception $e){
			echo $e->getMessage();
		}
		return $consulta->execute();
	}
}

?>
