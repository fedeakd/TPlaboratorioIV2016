miApp.controller("controlPrincipal",function($scope,$state,FactoryCliente,$auth,FactoryUsuario,FactoryProducto,FactoryRuta,FactoryAlerta){
	
	$scope.MostrameAlerta=function(){
		alertify.error("Error notification");
	}

	FactoryAlerta.Mostrar("Hola","Estoy probando esto","warning");
	//FactoryAlerta.Mostrar("Hola","Estoy probando esto","error");
	//FactoryAlerta.Mostrar("Hola","Estoy probando esto","success");
	//FactoryAlerta.Mostrar("Hola","Estoy probando esto","info");
})


