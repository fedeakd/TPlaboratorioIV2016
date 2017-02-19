miApp.controller("controlOferta",function($scope,$state,$auth,FactoryProducto,FactoryOferta,FileUploader,FactoryRuta,FactoryAlerta){
	$scope.show=true;
	$scope.oferta={};
	$scope.oferta.nombre="3 grande de muzarrela";
	$scope.oferta.fecha=new Date ("2015-10-10");;
	$scope.oferta.precio=200;

	$scope.productos=[];

	$scope.uploader=new FileUploader({url:FactoryRuta.imagenTemporal});
	$scope.uploader.queueLimit=3;

	$scope.grillaOferta={};
	$scope.imagenes=[];
	$scope.grillaOferta.columnDefs=FactoryOferta.ConfigurarGrillaProducto();
	FactoryProducto.TraerTodos().then(function(respuesta) {
		$scope.productos =respuesta;
		console.log($scope.productos);

	}); 
	$scope.uploader.onSuccessItem=function(item, response, status, headers)/* Sube la foto  temporal */ 
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
	$scope.Aceptar=function(){
		$scope.oferta.imagenes=$scope.imagenes;
		$scope.oferta.productos=$scope.grillaOferta.data;
		FactoryOferta.CargarDatos($scope.oferta);
		FactoryOferta.Alta().then(function(respuesta) {

			if(respuesta==="ok"){
				FactoryAlerta.Mostrar("Felicitaciones","Has registrado una oferta","success");
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
	$scope.SeleccionOferta=function(produ,index){
		produ.cantidad=0;
		$scope.grillaOferta.data.push(produ);
		$scope.productos.splice(index,1);
	}
	console.log("prueba");

})
