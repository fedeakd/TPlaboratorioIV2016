miApp.controller("controlLogin",function($scope,$state,FactoryCliente,$auth,FactoryUsuario,FactoryEmpleado,FactoryAlerta){
	$scope.show=true;
	$scope.user={};
	$scope.user.mail="menosPlata@masHambre.com";
	$scope.user.clave="1234";
	if($auth.isAuthenticated()){
		$state.go("abstractoMenu.principal");
	}
	$scope.DarLogin= function(num){

		userr="";
		clave="";
		switch(num){
			case 1://cliente
			userr="cliente@cliente.com";
			clave="cliente";
			break;
			case 2://empelado
			userr="empleado@empleado.com";
			clave="1234";
			break;
			case 3://encargado
			userr="encargado@encargado.com";
			clave="1234";
			break;
			case 4://Administrador
			userr="administrador@administrador.com";
			clave="1234";
			break;

		}
		$scope.user.mail=userr;
		$scope.user.clave=clave;
		$scope.Logearse();
	}
	$scope.Logearse= function(){

		FactoryUsuario.CargarUsuario($scope.user);
		FactoryUsuario.VerificarLogin()
		.then(function(respuesta) { 
			if(respuesta=="datoIncorrecto"){
				FactoryAlerta.Mostrar("Error","Error, contraseña o clave incorrecta","error");
				return;
			}
			else if(respuesta=="inactivo"){
				FactoryAlerta.Mostrar("Error","Error, La cuenta se encuentra inactiva por decisión del administrador o la cuenta aun no fue activa","error");
				return;

			}
			else{	
				$auth.login(respuesta).then(function(response) {
					console.log(response);
					$state.go("abstractoMenu.principal");
					

				}).catch(function(r){
					console.info("lala",r)

				})
			}

			

		},function errorCallback(response) {        

			console.log( response);           
		});

	}
	$scope.IrRegistrar=function(){
		$state.go("registro");

	}
})

miApp.controller("controlRegistro",function($scope,$state,FactoryCliente,FactoryAlerta){
	$scope.show=true;
	
	$scope.user={};
	$scope.user.nombre="federico";
	$scope.user.apellido="santamaria"; 
	$scope.user.ciudad="Banfield";
	$scope.user.domicilio="Berutti 2077";
	$scope.user.fechaNacimiento=new Date ("2015-10-10");
	$scope.user.documento=37978272;
	$scope.user.usuario="binomio";
	$scope.user.mail="soii_fede12@hotmail.com";
	$scope.user.clave="1234"; 
	$scope.user.rclave="1234";



	$scope.Mostrar=function(){
		FactoryCliente.CargarDatos($scope.user,true);


		FactoryCliente.Alta()
		.then(function(respuesta) { 
			console.log(respuesta);
			if(respuesta==="yaSeEncuentra"){
				FactoryAlerta.Mostrar("Mensaje","Lo siento, el usuario o mail ya se encuentra","warning");
			}
			else if(respuesta==="ok"){
				FactoryAlerta.Mostrar("Felicitaciones","Te has registrado","success");
				$state.go("login");
			}
			else{
				FactoryAlerta.Mostrar("Error","Error algo salio mal, lo intentare solucionar al brevedad","error");
			}

			

		},function errorCallback(response) {        

			FactoryAlerta.Mostrar("Error","Error algo salio mal, lo intentare solucionar al brevedad","error");
		});

	}

})