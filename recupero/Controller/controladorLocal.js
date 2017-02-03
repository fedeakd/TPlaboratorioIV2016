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
		console.log($scope.uploader.queue[index]);
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