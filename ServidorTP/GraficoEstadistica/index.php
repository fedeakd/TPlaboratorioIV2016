<?php use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';
require 'Grafico.php';
require '../AccesoDatos.php';
require '../ManejoDeImagen.php';
$app = new \Slim\App;


$app->post('/alta/{producto}', function (Request $request, Response $response,$args) {
	$datos=json_decode($args['producto']);

	$arrayImagenes=ManejoDeImagen::CargarImagenes($datos->imagenes,"producto");



	$producto=Producto::CargarDatos($datos);//Cargo los datos del formulario
	$producto->imagenes=$arrayImagenes;

	$producto->InsertarProducto();
	$response->getBody()->write("ok")	;
	return $response;
});



$app->get('/TraerDatos/{dato}', function (Request $request, Response $response,$args) {
	$datos=json_decode($args['dato']);
	$respuesta="";
	switch ($datos) {
		case 'locales venta productos':
		$respuesta=Grafico::LocalesProductos();
		break;
		case 'locales venta ofertas':
		$respuesta=Grafico::LocalesOfertas();
		break;
		case 'Productos con mas ventas':
		$respuesta=Grafico::ProductosVentas();
		break;
		case 'Ofertas mas vendida':
		$respuesta=Grafico::ProductosOfertas();
		break;
		case 'Cantidad de empleados por local':
		$respuesta=Grafico::CantidadEmpleadosPorLocal();
		break;
		default:
		break;
	}

	$response->getBody()->write(json_encode($respuesta));

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