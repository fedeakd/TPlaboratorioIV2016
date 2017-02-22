<?php

class Grafico{
	public $nombre;
	public $cuenta;
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
	public static function LocalesProductos(){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT l.nombre, COUNT(pp.idProducto) as 'cuenta' FROM pedidosproductos  as pp
			INNER JOIN pedidos as p ON pp.idPedido=p.idPedido
			INNER JOIN locales as l ON p.idLocal= l.idLocal
			GROUP BY p.idLocal");
		$consulta->execute();     
		return $consulta->fetchAll(PDO::FETCH_CLASS, "Grafico"); 

	}
	public static function LocalesOfertas(){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT l.nombre, COUNT(po.idOferta) as 'cuenta' FROM pedidosofertas  as po
			INNER JOIN pedidos as p ON po.idPedido=p.idPedido
			INNER JOIN locales as l ON p.idLocal= l.idLocal
			GROUP BY p.idLocal
			");
		$consulta->execute();     
		return $consulta->fetchAll(PDO::FETCH_CLASS, "Grafico"); 

	}
	public static function  ProductosVentas(){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT po.nombre, COUNT(pp.idProducto) as 'cuenta' FROM pedidosproductos as pp
			INNER JOIN pedidos as pe ON  pp.idPedido= pe.idPedido
			INNER JOIN productos as po ON pp.idProducto=  po.idProducto
			GROUP BY pp.idProducto
			");
		$consulta->execute();     
		return $consulta->fetchAll(PDO::FETCH_CLASS, "Grafico"); 

	}

	public static function  ProductosOfertas(){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT o.nombre, COUNT(o.idOferta) as 'cuenta' FROM pedidosofertas as po
			INNER JOIN pedidos as pe ON  po.idPedido= pe.idPedido
			INNER JOIN ofertas as o ON po.idOferta=  o.idOferta
			GROUP BY o.idOferta

			");
		$consulta->execute();     
		return $consulta->fetchAll(PDO::FETCH_CLASS, "Grafico"); 

	}

	public static function  CantidadEmpleadosPorLocal(){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT l.nombre,  COUNT(e.nombre) AS 'cuenta' FROM  locales  as l
			INNER JOIN  empleados as e ON e.idLocal= l.idLocal
			GROUP BY e.idLocal
			");
		$consulta->execute();     
		return $consulta->fetchAll(PDO::FETCH_CLASS, "Grafico"); 

	}
}

?>
