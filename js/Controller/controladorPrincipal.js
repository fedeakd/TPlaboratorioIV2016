miApp.controller("controlPrincipal",function($scope,$state,FactoryCliente,$auth,FactoryUsuario,FactoryProducto,FactoryRuta){
	$scope.ruta=FactoryRuta.imagen;
	$scope.miArray=[];
	FactoryProducto.TraerTodos().then(function(respuesta) {
		$scope.productos=respuesta;
		console.log(respuesta);

	});
	$scope.Agregar=function(produ){
		console.log(produ);
	}

	return;



	$('#myCarousel').carousel({
		interval:   4000
	});
	
})


