var miApp= angular.module("AngularABM",['ui.router','angularFileUpload','ngAnimate', 'ngTouch','satellizer',
	'ui.grid',
	'ui.grid.pagination',
	'ui.grid.resizeColumns',
	'ui.grid.selection',
	'ui.grid.exporter',
	'ui.grid.edit']);
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
	$urlRouterProvider.otherwise("/login");
});

miApp.controller('GlobalCtrl', function($scope) {
    // Event listener for state change.
    $scope.$on('$stateChangeStart', function(event, toState, toParams) {
    	$scope.bodyClass = toState.name + '-page';
    });
});

