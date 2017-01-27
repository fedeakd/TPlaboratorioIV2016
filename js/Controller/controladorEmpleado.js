miApp.controller("controlAltaEmpleado",function($scope,$state,FactoryCliente,$auth,FactoryUsuario,FactoryEmpleado){
	$scope.show=true;
	$scope.options = [
	{
		name: 'EMPLEADO',
		value:"2"
	}, 
	{
		name: "ENCARGADO",
		value: '3'
	}
	];
	$scope.user={};
	$scope.user.nombre="jose";
	$scope.user.apellido="sinEmpleo"; 
	$scope.user.fechaNacimiento=new Date ("2015-10-10");
	$scope.user.documento=1234567;
	$scope.user.usuario="empleado";
	$scope.user.mail="menosPlata@masHambre.com";
	$scope.user.clave="1234"; 
	$scope.user.sueldo=1234;
	console.log("hola mundo");
	$scope.Aceptar= function(){
		//$scope.user.cargo=parseInt($scope.user.cargo.value);
		FactoryEmpleado.CargarDatos($scope.user,true);
		FactoryEmpleado.usuario.cargo=parseInt($scope.user.cargo.value);
		FactoryEmpleado.Alta()
		.then(function(respuesta) {
			console.log(respuesta);
			if(respuesta==="ok"){
				$state.go("abstractoMenu.principal");
			}
			else{
				alert("Usuario o  mail ya se  encuentra intenta con otro ");
			}
		})

	}

})