miApp.controller("controlAltaLocal",function($scope,$state,$auth,FactoryLocal ,FileUploader,FactoryRuta,FactoryAlerta){
	$scope.show=true;
	$scope.local={};
	$scope.local.nombre="Muzzarela";
	$scope.local.direccion="La mas rica del  condado";


	$scope.uploader=new FileUploader({url:FactoryRuta.imagenTemporal});
	$scope.uploader.queueLimit=3;
	$scope.imagenes=[];


	$scope.autocompleteOptions = {
		componentRestrictions: { country: 'ar' },
		types: ['geocode']

	}

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
		$scope.local.direccion=$scope.local.direccion.formatted_address;

		FactoryLocal.imagenes=$scope.imagenes;
		FactoryLocal.CargarDatos($scope.local);
		FactoryLocal.Alta()	.then(function(respuesta) {

			if(respuesta==="ok"){
				FactoryAlerta.Mostrar("Felicitaciones","Has registrado un local","success");
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
})




.controller("controlLocal-Productos",function($scope,$state,$auth,FactoryLocal,FactoryProducto ,FileUploader,FactoryRuta,FactoryAlerta){
	$scope.loadGrilla1=false;
	$scope.loadGrilla2=false;
	var localProduViejo=[];
	var todosLosProductos=[];
	$scope.grillaDos={};
	$scope.grillaUno={};
	$scope.cambio="";
	$scope.locales=[];
	$scope.local={};

	$scope.grillaDos.columnDefs=FactoryProducto.ConfigurarGrilla(2);
	$scope.grillaUno.columnDefs=FactoryProducto.ConfigurarGrilla(1);

	FactoryProducto.TraerTodos().then(function(respuesta) {
		$scope.loadGrilla2=true;
		$scope.grillaDos.data =respuesta;
		todosLosProductos=FactoryProducto.CargarArray(respuesta);

	});
	FactoryLocal.TraerTodos().then(function(respuesta) {
		$scope.locales=respuesta;

	});




	$scope.SeleccionLocal=function(local){
		$scope.local=local;
		$scope.loadGrilla1=false;
		FactoryLocal.TraerUnLocalProdu(local).then(function(respuesta) {
			$scope.loadGrilla1=true;
			$scope.grillaUno.data=respuesta;
			localProduViejo= FactoryProducto.CargarArray(respuesta);			
			$scope.grillaDos.data =FactoryProducto.CargarArray(todosLosProductos);
			FactoryProducto.ConfigurarGrillaProducto(respuesta,$scope.grillaDos);


		});
		
	}
	
	$scope.Cambio=function(){
		paquete={};
		FactoryProducto.Cambio($scope.grillaUno,$scope.grillaDos);
		FactoryProducto.Cambio($scope.grillaDos,$scope.grillaUno);

		paquete= FactoryProducto.SeleccionarAltaYBaja(localProduViejo, $scope.grillaUno.data);
		paquete.local=$scope.local;



		if(paquete.lPV.length>0){//baja
			FactoryLocal.BorrarLocalProdu(paquete).then(function(respuesta) {

			});
		}

		if(paquete.lPN.length>0){//alta
			FactoryLocal.GuardarLocalProdu(paquete).then(function(respuesta) {

			});
		}
		FactoryAlerta.Mostrar("Felicitaciones","Se ha logrado los cambio","success");
		$state.go("abstractoMenu.principal");

	}
	$scope.Seleccionar=function(estado,index,tipo){
		/*Este evento  se genera cuando se hace click en una fila, es lo que hace posible la multiple seleccion
		*el estado  es  true si esta selecionado  un row  y false  si no lo esta
		*index  el indece de la fila que fue seleccionada 
		*tipo  1 si es producto y dos si es producto del local 
		*/
		if(tipo==1){
			FactoryProducto.Seleccionar(estado,index,$scope.grillaUno);
		}
		else{
			FactoryProducto.Seleccionar(estado,index,$scope.grillaDos);
		}
	}
}).
controller("controlLocal-Ofertas",function($scope,$state,$auth,FactoryLocal,FactoryProducto ,FactoryRuta,FactoryOferta,FactoryAlerta){
	$scope.loadGrilla1=false;
	$scope.loadGrilla2=false;
	var localOfertaVieja=[];
	var todasLasOfertas=[];
	$scope.grillaDos={};
	$scope.grillaUno={};
	$scope.cambio="";
	$scope.locales=[];
	$scope.grillaUno.data=[];
	$scope.grillaDos.data=[];
	$scope.grillaDos.columnDefs=FactoryOferta.ConfigurarGrilla(2);
	$scope.grillaUno.columnDefs=FactoryOferta.ConfigurarGrilla(1);

	$scope.local={};
	for (var i = 0; i<5 ;i++) {
		miLista={nombre:"FEfe"+i,precio:"ecomico",fecha:"2001-11-11",idOferta:-1}
		//$scope.grillaUno.data.push(miLista);
		//$scope.grillaDos.data.push(miLista);
	};
	for (var i = 0; i<5 ;i++) {
		miLista={nombre:"FEfe"+i+""+i,precio:"ecomico",fecha:"2001-11-11",idOferta:-1}
		//$scope.grillaUno.data.push(miLista);
		//$scope.grillaDos.data.push(miLista);
	};
	localOfertaVieja=FactoryProducto.CargarArray($scope.grillaUno.data);

	FactoryOferta.TraerTodos().then(function(respuesta) {
		$scope.loadGrilla2=true;
		$scope.grillaDos.data =respuesta;
		todasLasOfertas=FactoryProducto.CargarArray(respuesta);

	});
	FactoryLocal.TraerTodos().then(function(respuesta) {
		$scope.locales=respuesta;

	});
	$scope.SeleccionLocal=function(local){
		$scope.loadGrilla1=false;
		$scope.local=local;
		FactoryLocal.TraerUnLocalOferta(local).then(function(respuesta) {
			$scope.loadGrilla1=true;
			$scope.grillaUno.data=respuesta;
			localOfertaVieja= FactoryProducto.CargarArray(respuesta);			
			$scope.grillaDos.data =FactoryProducto.CargarArray(todasLasOfertas);
			FactoryProducto.ConfigurarGrillaProducto(respuesta,$scope.grillaDos);


		});
		
	}
	$scope.Seleccionar=function(estado,index,tipo){
		if(tipo==1){
			FactoryProducto.Seleccionar(estado,index,$scope.grillaUno);
		}
		else{
			FactoryProducto.Seleccionar(estado,index,$scope.grillaDos);
		}
	}

	$scope.Cambio=function(){
		paquete={};
		FactoryOferta.Cambio($scope.grillaUno,$scope.grillaDos);
		FactoryOferta.Cambio($scope.grillaDos,$scope.grillaUno);


		paquete= FactoryProducto.SeleccionarAltaYBaja(localOfertaVieja, $scope.grillaUno.data);
		paquete.local=$scope.local;
		console.log(paquete);

		if(paquete.lPV.length>0){//baja
			FactoryLocal.BorrarLocalOferta(paquete).then(function(respuesta) {

			});
		}

		if(paquete.lPN.length>0){//alta
			FactoryLocal.GuardarLocalOferta(paquete).then(function(respuesta) {
				console.log(respuesta);
			});
		}
		FactoryAlerta.Mostrar("Felicitaciones","Se ha logrado los cambio","success");
		$state.go("abstractoMenu.principal");
	}

})