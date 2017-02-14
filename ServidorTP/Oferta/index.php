<?php use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';
require 'Oferta.php';
require '../AccesoDatos.php';
require '../ManejoDeImagen.php';
$app = new \Slim\App;


$app->post('/alta/{oferta}', function (Request $request, Response $response,$args) {
	$datos=json_decode($args['oferta']);
	date_default_timezone_set('America/Argentina/Buenos_Aires');
	$arrayImagenes=ManejoDeImagen::CargarImagenes($datos->imagenes,"oferta");
	$oferta=Oferta::CargarDatos($datos);//Cargo los datos del formulario
	$oferta->imagenes=$arrayImagenes;
	$oferta->Insertaroferta();

	$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	$idOferta=$objetoAccesoDato->RetornarUltimoIdInsertado();
	foreach($oferta->productos as $produ){ 

		Oferta::InsertarProducto($idOferta,$produ->idProducto , $produ->cantidad);
	}
	$response->getBody()->write("ok")	;
	return $response;
});



$app->get('/TraerTodos', function (Request $request, Response $response) {
	$response->getBody()->write(json_encode(Oferta::TraerTodos()));
	//$response->getBody()->write("");

	return $response;
});


$app->post('/prueba/{oferta}', function (Request $request, Response $response,$args) {
	$oferta=json_decode($args['oferta']);
	Oferta::Insertaroferta($oferta);
	$response->getBody()->write("ok")	;
	return $response;
});


$app->get('/', function (Request $request, Response $response) {
	$response->getBody()->write(json_encode(Oferta::TraerTodosLosofertas()));

	return $response;
});


$app->delete('/{id}', function (Request $request, Response $response) {
	$id=$request->getAttribute('id');

	Oferta::Borrar($id);
	$response->getBody()->write("ok");

	return $response;
});

$app->put('/modificar/{oferta}' , function ($request, $response, $args)  {
	$oferta=json_decode($args['oferta']);

	$id=$oferta->id;

	Oferta::Modificar($oferta,$id);	
	$response->getBody()->write("ok");
	return $response;
});
$app->run(); 