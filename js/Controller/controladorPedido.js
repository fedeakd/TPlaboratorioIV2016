miApp.controller("controlAltaPedido",function($scope,$state,FactoryCliente,$auth,FactoryUsuario,FactoryProducto,FactoryRuta,FactoryLocal,FactoryPedido,NgMap){
	$scope.ruta=FactoryRuta.imagen;
	$scope.miArray=[];
	$scope.chango=[];
	$scope.total=0;
	$scope.cambio=false;
	$scope.num=1;
	$scope.ban=false;
	$scope.textBoxMap={};
	$scope.miMapa={};
	$scope.pedido={};
	$scope.locales=[];
	$scope.ofertas=[];
	FactoryLocal.TraerTodos().then(function(respuesta) {
		$scope.locales=respuesta;

	});

	$scope.autocompleteOptions = {
		componentRestrictions: { country: 'ar' },
		types: ['geocode']

	}

	if(FactoryUsuario.cargo=="cliente"){
		$scope.pedido.idCliente=FactoryUsuario.idUsuario;
	}
	else{
		$scope.pedido.idCliente=1;
		console.log($scope.pedido);
	}
	$scope.IrAPedido=function(local){
		$scope.pedido.local=local;
		FactoryLocal.TraerUnLocalProdu(local).then(function(respuesta) {

			$scope.productos=respuesta;

		});
		FactoryLocal.TraerUnLocalOferta(local).then(function(respuesta) {
			console.log(respuesta);
			$scope.ofertas=respuesta;

		});
		$scope.num=2;
	}
	
	$scope.Agregar=function(dato,index,queEs){
		miBandera=false;
		dato.tipo=queEs;
		if(dato.cantidad==0 || dato.cantidad==null){
			return;
		}
		for(var i=0;i < $scope.chango.length; i++){
			if($scope.chango[i].nombre==dato.nombre){
				miBandera=true;
				$scope.chango[i].cantidad=dato.cantidad;
				break;
			}
		}
		if(!miBandera){
			$scope.chango.push(dato);
		}
		console.log($scope.chango);
	}

	$scope.Pagar=function(){
		$scope.pedido.chango= $scope.chango;
		$scope.pedido.precio= $scope.total;
		console.log($scope.pedido);
	}
	$scope.Terminar=function(mapa){
		$scope.pedido.direccion=$scope.textBoxMap.info.formatted_address;
		$scope.pedido.productos=[];
		$scope.pedido.ofertas=[];
		$scope.pedido.chango.forEach(function(pedido) {
			if(pedido.tipo=="producto"){
				console.log(pedido);
				$scope.pedido.productos.push(pedido);
			}
			else{
				$scope.pedido.ofertas.push(pedido);
			}
		});


		FactoryPedido.CargarDatos($scope.pedido);

		FactoryPedido.Alta().then(function(respuesta) {

			console.log(respuesta);

		});
		console.log(FactoryPedido);
		console.log($scope.pedido);

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
	

})