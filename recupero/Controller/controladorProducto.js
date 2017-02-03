miApp.controller("controlAltaProducto",function($scope,$state,$auth,FileUploader,FactoryRuta,FactoryProducto){
	$scope.show=true;
	$scope.producto={};
	$scope.producto.nombre="Muzzarela";
	$scope.producto.descripcion="La mas rica del  condado";
	$scope.producto.precio=14;


	$scope.uploader=new FileUploader({url:FactoryRuta.imagenTemporal});
	$scope.uploader.queueLimit=1;
	$scope.imagenes=[];

		$scope.uploader.onSuccessItem=function(item, response, status, headers)// Sube la foto  temporal 
		{
			$scope.imagenes.push( item.file.name);
			console.log("Se insertaran "+ $scope.imagenes.length + " fotos");
			console.log($scope.imagenes);

		};

		$scope.Aceptar= function(){
			FactoryProducto.imagenes=$scope.imagenes;
			FactoryProducto.CargarDatos($scope.producto);
			FactoryProducto.Alta().then(function(respuesta) {
				if(respuesta=="ok"){
					console.log("todo salio bien");
				}
			    else{
			    	console.log(respuesta);
			    }

			})
		}


	});