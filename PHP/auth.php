<?php
include_once 'vendor/autoload.php';
use \Firebase\JWT\JWT;
$datosDelModeloPorPOst=file_get_contents("php://input");
$user=json_decode($datosDelModeloPorPOst);
/*$key = "example_key";
$token = array(
    "iss" => "http://example.org",
    "aud" => "http://example.com",
    "iat" => 1356999524,
    "nbf" => 1357000000
    );*/



$claveDeEncripcion="nada";
$token['idUsuario']=$user->idUsuario;
$token['mail']=$user->mail;
$token['clave']=$user->clave;
$token['fechaRegistro']=$user->fechaRegistro;
$token['usuario']=$user->usuario;
$token['estado']=$user->estado;
$token['cargo']=$user->cargo;
$token['nombre']=$user->nombre;
$token['apellido']=$user->apellido;
$token['fechaNacimiento']=$user->fechaNacimiento;
$token['documento']=$user->documento;

if ($user->cargo=="cliente") {
	$token['idCliente']=$user->idCliente;
	$token['ciudad']=$user->ciudad;
	$token['domicilio']=$user->domicilio;


}
else{
	$token['idEmpleado']=$user->idEmpleado;
	$token['local']=$user->local;
	$token['sueldo']=$user->sueldo;
}

//$token['imagen']=$user->imagen;
//$token['cantidad']=$user->imagenCantidad;
$token['iat']= time();
$token['exp']= time()+23234;


$jwt = JWT::encode($token, $claveDeEncripcion); 
$arrayConToken["Lab4"]=$jwt;
echo  json_encode($arrayConToken);


?>