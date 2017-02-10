var miApp= angular.module("AngularABM",['ui.router','ui.bootstrap','angularFileUpload','ngAnimate', 'ngTouch','satellizer',
	'ui.grid',
	'ui.grid.pagination',
	'ui.grid.resizeColumns',
	'ui.grid.selection',
	'ui.grid.exporter',
	'ui.grid.edit',
	'ngMap',
	'google.places'
	]);
miApp.config(function($stateProvider,$urlRouterProvider,$authProvider){
	$authProvider.loginUrl='Laboratorio4/TPlaboratorioIV2016/PHP/auth.php';
	$authProvider.tokenName="Lab4";
	$authProvider.tokenPrefix="Aplicacion";
	$authProvider.authHeader="data";
	$stateProvider
	.state(
		"login",{
			url:"/login",
			cache:false	,
			templateUrl:"Vista/Login.html",
			controller:"controlLogin"
		}
		)
	.state(
		"registro",{
			url:"/registro",
			cache:false	,
			templateUrl:"Vista/Registro.html",
			controller:"controlRegistro"
		}
		)
	.state(
		"abstractoMenu",{
			url:"/menu",
			abstract:true,
			cache:false	,
			templateUrl:"Vista/AbstractoMenu.html",
			controller:"controlMenu"
		}
		)
	.state(
		"abstractoMenu.principal",{
			url:"/principal",
			views:{
				"contenido":{

					templateUrl:"Vista/Principal.html",
					controller:"controlPrincipal"
				}
			}
		}
		)
	.state(
		"abstractoMenu.empleadoAlta",{
			url:"/agregarEmpleado",
			views:{
				"contenido":{

					templateUrl:"Vista/AltaEmpleado.html",
					controller:"controlAltaEmpleado"
				}
			}
		}
		)
	.state(
		"abstractoMenu.productoAlta",{
			url:"/agregarProducto",
			views:{
				"contenido":{

					templateUrl:"Vista/AltaProducto.html",
					controller:"controlAltaProducto"
				}
			}
		}
		)
	.state(
		"abstractoMenu.localAlta",{
			url:"/agregarLocal",
			views:{
				"contenido":{

					templateUrl:"Vista/FormularioLocal.html",
					controller:"controlAltaLocal"
				}
			}
		}
		)
	.state(
		"abstractoMenu.usuariosGrillas",{
			url:"/grillaDeUsuarios",
			views:{
				"contenido":{

					templateUrl:"Vista/GrillaUsuarios.html",
					controller:"controlGrillaUsuarios"
				}
			}
		}
		)
	.state(
		"abstractoMenu.altaPedido",{
			url:"/altaPedido",
			views:{
				"contenido":{

					templateUrl:"Vista/FormularioPedido.html",
					controller:"controlAltaPedido"
				}
			}
		}
		)
	.state(
		"abstractoMenu.localProductos",{
			url:"/Local-Productos",
			views:{
				"contenido":{

					templateUrl:"Vista/Local-Productos.html",
					controller:"controlLocal-Productos"
				}
			}
		}
		)
	$urlRouterProvider.otherwise("/login");
});

miApp.controller('GlobalCtrl', function($scope) {
    // Event listener for state change.
    $scope.$on('$stateChangeStart', function(event, toState, toParams) {
    	$scope.bodyClass = toState.name + '-page';
    });
});

