miApp.controller("controlLogin",function($scope,$state,FactoryCliente,$auth,FactoryUsuario,FactoryEmpleado){
	$scope.show=true;
	$scope.user={};
	$scope.user.mail="menosPlata@masHambre.com";
	$scope.user.clave="1234";
	$scope.Logearse= function(){
		FactoryUsuario.CargarUsuario($scope.user);
		FactoryUsuario.VerificarLogin()
		.then(function(respuesta) { 
			if(respuesta!="false"){	
				$auth.login(respuesta).then(function(response) {
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
		console.log("ASDASOL")
		$state.go("registro");

	}
})

miApp.controller("controlRegistro",function($scope,$state,FactoryCliente){
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
				console.log("Lo siento ya se encuenta ");
			}
			else if(respuesta==="ok"){
				console.log("Hacer algo ...");

			}
			else{
				console.log(respuesta);
			}

			

		},function errorCallback(response) {        

			console.log( response.data);           
		});

	}

})