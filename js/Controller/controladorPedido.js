miApp.controller("controlAltaPedido",function($scope,$state,FactoryCliente,$auth,FactoryUsuario,FactoryProducto,FactoryRuta,FactoryLocal,FactoryPedido,NgMap,FactoryAlerta){
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
		else{
			return;
		}
		alertify.success("Se agregado  un item al chango ");
		alertify.success("Cantidad de item: " + $scope.chango.length);


	}

	$scope.Pagar=function(){

		$scope.pedido.chango= $scope.chango;
		$scope.pedido.precio= $scope.total;
		alertify.success("Se ah pagado correctamente ");
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

			if(respuesta==="ok"){
				FactoryAlerta.Mostrar("Felicitaciones","Has registrado tu pedido","success");
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

	$scope.Remover=function(index){
		$scope.chango.splice(index,1);
		if($scope.chango.length===0){
			$scope.num=2;
		}
	}

	$scope.Calcular=function(){
		$scope.total=0;
		$scope.chango.forEach(function(compra) {
			$scope.total+=compra.cantidad* compra.precio;
		});
		return $scope.total;

	}
	$scope.Pasar=function(){
		if(($scope.num===2)&&($scope.chango.length===0)){
			alertify.error("Error,Agrega  un producto ");
			return;
		}
		else if(($scope.num==3)&&($scope.pedido.precio==null)){
			alertify.error("Error,Paga tu pedido por favor ");
			return;
		}
		$scope.ban=false;
		$scope.num++;
	}
	$scope.Volver=function(){
		if($scope.num==4){
			$scope.pedido.precio=null;

		}
		$scope.ban=true;
		$scope.num--;

	}
	//Parte 2
	

}).controller("controlListaPedidos",function($scope,$state,FactoryUsuario,FactoryPedido){

	$scope.grillaUno={};
	var contenedor={};
	var tablaHead=["cliente","local","precio","fecha"];
	contenedor.layout= 'lightHorizontalLines';
	contenedor.table={};
	contenedor.table.headerRows=1;
	contenedor.table.widths= [ '*', 'auto', 100, '*' ];
	contenedor.table.body=[];
	contenedor.table.body.push( tablaHead);
	$scope.grillaUno.columnDefs=FactoryPedido.ConfigurarGrilla();
	var num= FactoryUsuario.cargo=="cliente"?FactoryUsuario.idUsuario:-1;

	FactoryPedido.TraerPedido(num).then(function(respuesta) {
		console.log(respuesta);
		respuesta.forEach(function(row){
			contenedor.table.body.push([row.nombreC,row.nombreL,row.precio,row.fecha]);
		});
		console.log({content:[contenedor]});
		pdfMake.createPdf({content:[contenedor]}).open();
		$scope.grillaUno.data=respuesta;


	})

	})