<?php 

class Pedido{
	public $idPedido;
	public $fecha;
	public $direccion;
	public $idLocal;
	public $idCliente;
	public $productos;
	public $ofertas;
	public $precio;
	public static function CargarDatos($dato){
		$pedido=new Pedido();
		//$pedido->idProducto=$dato->idProducto;
		$pedido->fecha= date('Y-m-d H:i:s');
		$pedido->direccion=$dato->direccion;
		$pedido->idLocal=$dato->idLocal;
		$pedido->idCliente=$dato->idCliente;
		$pedido->productos=$dato->productos;
		$pedido->ofertas=$dato->ofertas; 
		$pedido->precio=$dato->precio; 
		return $pedido;
	}
	public function toString(){
		return "$this->nombre-$this-apellido-$this->ciudad-$this->usuario-$this-clave";

	}
	public function InsertarPedido()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into pedidos (fecha,direccion,idLocal,idCliente,precio )
			values('$this->fecha',
				'$this->direccion',
				$this->idLocal,
				$this->idCliente,
				$this->precio
				)");
		$consulta->execute();
		return $objetoAccesoDato->RetornarUltimoIdInsertado();


	}
	public static function InsertarPedidoOferta($idPedido,$idOferta,$cantidad)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into pedidosofertas (cantidad,idPedido,idOferta )
			values($cantidad,
				$idPedido,
				$idOferta
				)");
		$consulta->execute();
		


	}
	public static function InsertarPedidoProducto($idPedido,$idProdu,$cantidad)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into pedidosproductos (cantidad,idPedido,idProducto )
			values($cantidad,
				$idPedido,
				$idProdu
				)");
		$consulta->execute();
		


	}
	public static function TraerTodos(){
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT *  from productos");
		$consulta->execute();     
		return $consulta->fetchAll(PDO::FETCH_CLASS, "Producto"); 
	}

}

?>