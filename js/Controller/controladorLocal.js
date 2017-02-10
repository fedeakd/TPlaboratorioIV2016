miApp.controller("controlAltaLocal",function($scope,$state,$auth,FactoryLocal ,FileUploader,FactoryRuta){
	$scope.show=true;
	$scope.local={};
	$scope.local.nombre="Muzzarela";
	$scope.local.direccion="La mas rica del  condado";


	$scope.uploader=new FileUploader({url:FactoryRuta.imagenTemporal});
	$scope.uploader.queueLimit=3;
	$scope.imagenes=[];
	$scope.uploader.onSuccessItem=function(item, response, status, headers)
	{
		$scope.imagenes.push( item.file.name);
		console.log("Se insertaran "+ $scope.imagenes.length + " fotos");
		console.log($scope.imagenes);

	};
	$scope.remover=function(index){
		if ($scope.uploader.queue[index].progress==100) {
			$scope.imagenes.splice(index, 1);
		};
	}

	$scope.Aceptar= function(){
		console.log($scope.local);
		FactoryLocal.imagenes=$scope.imagenes;
		FactoryLocal.CargarDatos($scope.local);
		console.log(FactoryLocal);
		FactoryLocal.Alta().then(function(respuesta) {
			if(respuesta=="ok"){
				console.log("todo salio bien");
			}
			else{
				console.log(respuesta);
			}

		})
	}
})




.controller("controlLocal-Productos",function($scope,$state,$auth,FactoryLocal,FactoryProducto ,FileUploader,FactoryRuta){

	var LocalProduViejo=[];
	var todosLosProductos=[];
	$scope.grillaProducto={};
	$scope.grillaLocalProdo={};
	$scope.cambio="";
	$scope.locales=[];
	$scope.local={};

	$scope.grillaProducto.columnDefs=FactoryProducto.ConfigurarGrilla(2);
	$scope.grillaLocalProdo.columnDefs=FactoryProducto.ConfigurarGrilla(1);

	FactoryProducto.TraerTodos().then(function(respuesta) {
		$scope.grillaProducto.data =respuesta;
		todosLosProductos=FactoryProducto.CargarArray(respuesta);

	});
	FactoryLocal.TraerTodos().then(function(respuesta) {
		$scope.locales=respuesta;

	});




	$scope.SeleccionLocal=function(local){
		$scope.local=local;
		FactoryLocal.TraerUnLocalProdu(local).then(function(respuesta) {

			$scope.grillaLocalProdo.data=respuesta;
			LocalProduViejo= FactoryProducto.CargarArray(respuesta);			
			$scope.grillaProducto.data =FactoryProducto.CargarArray(todosLosProductos);
			FactoryProducto.ConfigurarGrillaProducto(respuesta,$scope.grillaProducto);


		});
		
	}
	
	$scope.Cambio=function(){
		paquete={};
		FactoryProducto.Cambio($scope.grillaLocalProdo,$scope.grillaProducto);
		FactoryProducto.Cambio($scope.grillaProducto,$scope.grillaLocalProdo);

		paquete= FactoryProducto.SeleccionarAltaYBaja(LocalProduViejo, $scope.grillaLocalProdo.data);
		paquete.local=$scope.local;



		if(paquete.lPV.length>0){//baja
			FactoryLocal.BorrarLocalProdu(paquete).then(function(respuesta) {

			});
		}

		if(paquete.lPN.length>0){//alta
			FactoryLocal.GuardarLocalProdu(paquete).then(function(respuesta) {

			});
		}

	}
	$scope.Seleccionar=function(estado,index,tipo){
		/*Este evento  se genera cuando se hace click en una fila, es lo que hace posible la multiple seleccion
		*el estado  es  true si esta selecionado  un row  y false  si no lo esta
		*index  el indece de la fila que fue seleccionada 
		*tipo  1 si es producto y dos si es producto del local 
		*/
		if(tipo==1){
			FactoryProducto.Seleccionar(estado,index,$scope.grillaLocalProdo);
		}
		else{
			FactoryProducto.Seleccionar(estado,index,$scope.grillaProducto);
		}
	}
})
