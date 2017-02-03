<?php use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';
include_once "../ManejoDeImagen.php";
$app = new \Slim\App;

$app->post('/SubirImagenTemporal', function (Request $request, Response $response,$args) {
	ManejoDeImagen::SubirImagenTemporal();
});


$app->run(); 