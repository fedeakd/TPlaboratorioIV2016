miApp.controller("controlGrillaUsuarios",function($scope,$state,FactoryCliente,$auth,FactoryUsuario,FactoryEmpleado){
	$scope.cargado=false;
	console.log("mundo");
	$scope.grillaUsuarios = {};
	$scope.getTableHeight = function() {
		var rowHeight = 30; 
		var headerHeight = 30; 
		return {
			height: ($scope.grillaUsuarios.data.length * rowHeight + headerHeight) + "px"
		};
	};

	$scope.grillaUsuarios.columnDefs=FactoryUsuario.ConfigurarGrilla();
	FactoryUsuario.TraerTodos().then(function(respuesta) {
		$scope.grillaUsuarios.data=respuesta;
		$scope.cargado=true;
		console.log(respuesta);

	});

	$scope.CambiarEstado=function(actor,index){

		FactoryUsuario.CambiarEstado(actor).then(function(respuesta) {
			if(respuesta=="ok"){
				$scope.grillaUsuarios.data[index].estado=actor.estado=="activo"?"Inactivo":"activo";
			}
			console.log(respuesta);
			//$scope.grillaUsuarios.data[index].estado="Inactivo";

		});
	
	}


});