miApp.controller("controlAltaProducto",function($scope,$state,$auth,FileUploader,FactoryRuta,FactoryProducto,FactoryAlerta){

	
	$scope.show=true;
	$scope.producto={};
	$scope.producto.nombre="Muzzarela";
	$scope.producto.descripcion="La mas rica del  condado";
	$scope.producto.precio=14;


	$scope.uploader=new FileUploader({url:FactoryRuta.imagenTemporal});
	$scope.uploader.queueLimit=3;
	$scope.imagenes=[];

		$scope.uploader.onSuccessItem=function(item, response, status, headers)// Sube la foto  temporal 
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
			console.log($scope.imagenes);
			FactoryProducto.imagenes=$scope.imagenes;
			FactoryProducto.CargarDatos($scope.producto);
			console.log(FactoryProducto);
			FactoryProducto.Alta().then(function(respuesta) {

				if(respuesta==="ok"){
					FactoryAlerta.Mostrar("Felicitaciones","Has registrado un producto","success");
					$state.go("abstractoMenu.principal");
				}
				else{
					console.log(respuesta);
					FactoryAlerta.Mostrar("Error","Error algo salio mal, lo intentare solucionar al brevedad","error");
				}
			},function errorCallback(response) {        

				FactoryAlerta.Mostrar("Error","Error algo salio mal, lo intentare solucionar al brevedad","error");
			});
		}


	});