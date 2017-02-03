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


$app->run(); 