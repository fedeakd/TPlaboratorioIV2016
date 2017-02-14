<?php use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';
require 'Local.php';
require '../AccesoDatos.php';
require '../ManejoDeImagen.php';
$app = new \Slim\App;


$app->post('/alta/{producto}', function (Request $request, Response $response,$args) {
	$datos=json_decode($args['producto']);
	$arrayImagenes= ManejoDeImagen::CargarImagenes($datos->imagenes,"local");

	$local=Local::CargarDatos($datos);//Cargo los datos del formulario
	$local->imagenes=$arrayImagenes;
	
	$local->Insertar();
	$response->getBody()->write("ok")	;
	return $response;
});
$app->get('/TraerTodos', function (Request $request, Response $response) {
	$response->getBody()->write(json_encode(Local::TraerTodos()));

	return $response;
});
$app->get('/TraerUnLocalProdu/{dato}', function (Request $request, Response $response,$args) {
	$datos=json_decode($args['dato']);
	$response->getBody()->write(json_encode(Local::TraerUnLocalProdu($datos->idLocal)));

	return $response;
});
$app->post('/GuardarLocalProdu/{paquete}', function (Request $request, Response $response,$args) {
	$datos=json_decode($args['paquete']);
	$local=$datos->local;
	$productos=$datos->lPN;
	foreach ($productos as $produ) {
		Local::GuardarLocalProdu($local->idLocal,$produ->idProducto);
	}
	$response->getBody()->write("ok");
	return $response;
});

$app->post('/BorrarLocalProdu/{paquete}', function (Request $request, Response $response,$args) {
	$datos=json_decode($args['paquete']);
	$local=$datos->local;
	$productos=$datos->lPV;
	foreach ($productos as $produ) {
		Local::BorrarLocalProdu($local->idLocal,$produ->idProducto);
	}
	$response->getBody()->write("ok");
	return $response;
});


$app->get('/TraerUnLocalOferta/{dato}', function (Request $request, Response $response,$args) {
	$datos=json_decode($args['dato']);
	$response->getBody()->write(json_encode(Local::TraerUnLocalOferta($datos->idLocal)));

	return $response;
});
$app->post('/GuardarLocalOferta/{paquete}', function (Request $request, Response $response,$args) {
	$datos=json_decode($args['paquete']);
	$local=$datos->local;
	$ofertas=$datos->lPN;
	var_dump($ofertas);

	foreach ($ofertas as $oferta) {
		Local::GuardarLocalOferta($local->idLocal,$oferta->idOferta);
	}
	$response->getBody()->write("ok");
	return $response;
});

$app->post('/BorrarLocalOferta/{paquete}', function (Request $request, Response $response,$args) {
	$datos=json_decode($args['paquete']);
	$local=$datos->local;
	$ofertas=$datos->lPV;
	
	foreach ($ofertas as $oferta) {
		Local::BorrarLocalOferta($local->idLocal,$oferta->idOferta);
	}
	$response->getBody()->write("ok");
	return $response;
});
$app->run(); 