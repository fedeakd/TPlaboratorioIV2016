<?php use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';
require 'Pedido.php';
require '../AccesoDatos.php';
require '../ManejoDeImagen.php';
$app = new \Slim\App;


$app->post('/alta/{pedido}', function (Request $request, Response $response,$args) {
	$datos=json_decode($args['pedido']);
	date_default_timezone_set('America/Argentina/Buenos_Aires');

	$pedido=Pedido::CargarDatos($datos);//Cargo los datos del formulario
	$ultimaPedidoId= $pedido->InsertarPedido();
	if(count($pedido->productos)>0){
		foreach ($pedido->productos as $produ) {
			Pedido::InsertarPedidoProducto($ultimaPedidoId, $produ->idProducto,$produ->cantidad);
		}	
	}
	if(count($pedido->ofertas)>0){
		foreach ($pedido->ofertas as $oferta) {
			Pedido::InsertarPedidoOferta($ultimaPedidoId, $oferta->idOferta,$oferta->cantidad);
		}	
	}
	
	$response->getBody()->write("ok")	;
	return $response;
});



$app->get('/TraerTodos', function (Request $request, Response $response) {
	//$producto=Producto::TraerTodos();
	$response->getBody()->write(json_encode(Producto::TraerTodos()));
	//$response->getBody()->write("");

	return $response;
});


$app->post('/prueba/{producto}', function (Request $request, Response $response,$args) {
	$producto=json_decode($args['producto']);
	Producto::InsertarProducto($producto);
	$response->getBody()->write("ok")	;
	return $response;
});


$app->get('/', function (Request $request, Response $response) {
	$response->getBody()->write(json_encode(Producto::TraerTodosLosProductos()));

	return $response;
});


$app->delete('/{id}', function (Request $request, Response $response) {
	$id=$request->getAttribute('id');

	Producto::Borrar($id);
	$response->getBody()->write("ok");

	return $response;
});

$app->put('/modificar/{producto}' , function ($request, $response, $args)  {
	$producto=json_decode($args['producto']);

	$id=$producto->id;

	Producto::Modificar($producto,$id);	
	$response->getBody()->write("ok");
	return $response;
});
$app->run(); 