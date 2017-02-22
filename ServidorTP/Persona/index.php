<?php use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';
require '../AccesoDatos.php';
require 'Cliente.php';
require 'Empleado.php';
include_once "Usuario.php";
$app = new \Slim\App;
$app->post('/altaEmpleado/{usuario}', function (Request $request, Response $response,$args) {
	$usuario=json_decode($args['usuario']);
	date_default_timezone_set('America/Argentina/Buenos_Aires');
	$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	$emple=  Empleado::CargarDatos($usuario);
	if(Empleado::VerificarMailYUsuario($emple->mail,$emple->usuario)>0){
		$response->getBody()->write("yaSeEncuentra");
		return;
	}
	$emple->InsertarUsuario();
	$emple->idUsuario=$objetoAccesoDato->RetornarUltimoIdInsertado();
	$emple->InsertarEmpleado();
	$response->getBody()->write("ok");

});

$app->post('/altaCliente/{usuario}', function (Request $request, Response $response,$args) {
	
	$usuario=json_decode($args['usuario']);
	date_default_timezone_set('America/Argentina/Buenos_Aires');
	$cli = Cliente::CargarDatos($usuario); 
	$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
	if(Cliente::VerificarMailYUsuario($cli->mail,$cli->usuario)>0){
		$response->getBody()->write("yaSeEncuentra");
		return;
	}

	$cli->InsertarUsuario();
	$cli->idUsuario=$objetoAccesoDato->RetornarUltimoIdInsertado();
	$cli->InsertarCliente();
	$response->getBody()->write("ok");
});
$app->get('/TraerTodos', function (Request $request, Response $response) {
	$response->getBody()->write(json_encode(Usuario::TraerTodos()));

	return $response;
});

$app->put('/CambiarEstado/{usuario}', function (Request $request, Response $response,$args) {
	$usuario=json_decode($args['usuario']);
	$cambio=$usuario->estado=="activo"?2:1;
	Usuario::CambiarEstado($usuario->idUsuario,$cambio);
	$response->getBody()->write("ok");

});

$app->put('/CambiarEmpleadoLocal/{paquete}', function (Request $request, Response $response,$args) {
	$paquete=json_decode($args['paquete']);
	if ($paquete->cargo=="encargado") {
		if ( Empleado::ComprobarEncargadoLocal($paquete->idLocal)>0) {
			echo "ya asignado";
			return;
		}
		

	}
	Empleado::CambiarEmpleadoLocal($paquete->idLocal,$paquete->idEmpleado);
	var_dump($paquete);

});
$app->get('/verificar/{usuario}', function ($request, $response, $args) {
	$usuario=json_decode($args['usuario']);

	//$response->getBody()->write(json_encode(Usuario::TraerUnUsuario($usuario->mail,$usuario->clave)));

	$usuario=Usuario::TraerUnUsuario($usuario->mail,$usuario->clave); 
	if($usuario==FALSE){
		$response->getBody()->write("datoIncorrecto");
	}
	else if($usuario->estado=="inactivo"){
		$response->getBody()->write("inactivo");
	}
	//var_dump($usuario);
	else	if( $usuario->cargo=="cliente"){

		$cliente= new Cliente();
		$cliente->CargarUsuario($usuario);
		$cliente->TraerUnCliente($usuario->idUsuario);

		$response->getBody()->write(json_encode($cliente));

		

	}
	else{
		$empleado= new Empleado();
		$empleado->CargarUsuario($usuario);
		$empleado->TraerUnEmpleado($usuario->idUsuario);
		$response->getBody()->write(json_encode($empleado));
	}

	/* hay traer al cliente o  al empleado  falta el codigo  */
	return $response;
});
$app->delete('/{id}', function (Request $request, Response $response) {
	$id=$request->getAttribute('id');
	Empleado::Borrar($id);
	Usuario::Borrar($id);
	$response->getBody()->write("ok");

	return $response;
});

$app->put('/modificar/{usuario}' , function ($request, $response, $args)  {
	$usuario=json_decode($args['usuario']);
	$per = new Persona(); 
	$per->nombre=$usuario->nombre;
	$per->usuario=$usuario->usuario;
	$per->clave=$usuario->clave;
	$per->mail=$usuario->mail;
	$id=$usuario->id;
	Persona::ModificarUsuario($per,$id,FALSE );
	$response->getBody()->write("ok");
	return $response;
});

$app->get('/TraerAtodosLosEmpleado', function (Request $request, Response $response) {
	$response->getBody()->write(json_encode(Empleado::TraerAtodosLosEmpleado()));

	return $response;
});

$app->run(); 