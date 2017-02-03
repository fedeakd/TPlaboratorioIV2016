<?php

class Producto{
	public $idProducto;
	public $nombre;
	public $descripcion;
	public $precio;
	public $imagenes;
	public $foto1;
	public $foto2;
	public $foto3;
	public static function CargarDatos($dato){
		$producto=new Producto();
		//$producto->idProducto=$dato->idProducto;
		$producto->nombre=$dato->nombre;
		$producto->descripcion=$dato->descripcion;
		$producto->precio=$dato->precio;

		return $producto;
	}
	public function toString(){
		return "$this->nombre-$this-apellido-$this->ciudad-$this->usuario-$this-clave";

	}
	public function InsertarProducto()
	{
		$foto1=$this->imagenes[0];
		$foto2=$this->imagenes[1];
		$foto3=$this->imagenes[2];
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into productos (nombre,descripcion,precio,foto1,foto2,foto3 )
			values('$this->nombre',
				'$this->descripcion',
				$this->precio,
				'$foto1',
				'$foto2',
				'$foto3'
				)");
		$consulta->execute();
		return $objetoAccesoDato->RetornarUltimoIdInsertado();


	}
	public static function TraerTodos(){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT *  from productos");
		$consulta->execute();     
		return $consulta->fetchAll(PDO::FETCH_CLASS, "Producto"); 
	}
	public static function Borrar($id){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("
			delete 
			from  productos
			WHERE id=:id"); 
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);    
		$consulta->execute();
		return $consulta->rowCount();
	}
	public static function Modificar($obj,$id){
		try{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				UPDATE Productos
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
