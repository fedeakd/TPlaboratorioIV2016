miApp.controller("controladorGraficoEstadistica",function($scope,$state,$auth,FactoryLocal ,FileUploader,FactoryGraficoEstadistica){



	$scope.opciones=["locales venta productos","locales venta ofertas","Productos con mas ventas" , "Ofertas mas vendida",'Cantidad de empleados por local'];
	$scope.Seleccion=function(dato){
		console.log(dato);
		FactoryGraficoEstadistica.TraerDatos(dato).then(function(respuesta) {
			console.log(respuesta);
			var nombres=[];
			var numeros=[];

			respuesta.forEach(function( dato){
				nombres.push(dato.nombre);
				numeros.push(dato.cuenta);
			});

			$scope.labels= nombres;
			$scope.data = numeros;
		});

	}
});

