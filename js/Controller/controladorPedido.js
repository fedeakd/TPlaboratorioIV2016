miApp.controller("controlAltaPedido",function($scope,$state,FactoryCliente,$auth,FactoryUsuario,FactoryProducto,FactoryRuta,FactoryLocal){
	$scope.ruta=FactoryRuta.imagen;
	$scope.miArray=[];
	$scope.chango=[];
	$scope.total=0;
	$scope.cambio=false;
	$scope.num=3;
	$scope.ban=false;
	$scope.place = {};
	pedido={};
	$scope.locales=[];

	FactoryLocal.TraerTodos().then(function(respuesta) {
		$scope.locales=respuesta;
		console.log($scope.locales);

	});

	$scope.autocompleteOptions = {
		componentRestrictions: { country: 'ar' },
		types: ['geocode']

	}


	FactoryProducto.TraerTodos().then(function(respuesta) {
		//$scope.productos=respuesta;
		//console.log(respuesta);
	});

	$scope.Mostrar=function(){
		console.log($scope.place); 
		console.info("latitud", $scope.place.geometry.location.lat());
		console.info("longitud", $scope.place.geometry.location.lng());
	}

	$scope.Agregar=function(produ){
		if(produ.cantidad==0 || produ.cantidad==null){
			return;
		}
		$scope.chango.push(produ);
	}
	$scope.Remover=function(index){
		$scope.chango.splice(index,1);
	}

	$scope.Calcular=function(){
		$scope.total=0;
		$scope.chango.forEach(function(compra) {
			$scope.total+=compra.cantidad* compra.precio;
		});
		return $scope.total;

	}
	$scope.Pasar=function(){
		$scope.ban=false;
		$scope.num++;
	}
	$scope.Volver=function(){
		$scope.ban=true;
		$scope.num--;

	}
	//Parte 2
	$scope.Pagar=function(){
		pedido.productos= $scope.chango;
		pedido.total= $scope.total;
		console.log(pedido);
	}

	$scope.IrAPedido=function(local){
		console.log(local);
		pedido.local=local;
		FactoryLocal.TraerUnLocalProdu(local).then(function(respuesta) {

			$scope.productos=respuesta;
			console.log(respuesta);


		});
		$scope.num=2;
	}
	
})