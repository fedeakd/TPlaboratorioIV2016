miApp.controller("controlAltaEmpleado",function($scope,$state,FactoryCliente,$auth,FactoryUsuario,FactoryEmpleado,FactoryAlerta){
	$scope.show=true;
	$scope.options = [
	{
		name: 'EMPLEADO',
		value:"2"
	}, 
	{
		name: "ENCARGADO",
		value: '3'
	}
	];
	$scope.user={};
	$scope.user.nombre="jose";
	$scope.user.apellido="sinEmpleo"; 
	$scope.user.fechaNacimiento=new Date ("2015-10-10");
	$scope.user.documento=1234567;
	$scope.user.usuario="empleado";
	$scope.user.mail="menosPlata@masHambre.com";
	$scope.user.clave="1234"; 
	$scope.user.sueldo=1234;
	console.log("hola mundo");
	$scope.Aceptar= function(){
		FactoryEmpleado.CargarDatos($scope.user,true);
		FactoryEmpleado.usuario.cargo=parseInt($scope.user.cargo.value);
		FactoryEmpleado.Alta()
		.then(function(respuesta) {

			if(respuesta==="ok"){
				FactoryAlerta.Mostrar("Felicitaciones","Has registrado un empleado","success");
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

}).controller("controlGrllaEmpleado",function($scope,$state,FactoryCliente,$auth,FactoryLocal,FactoryEmpleado,FactoryAlerta){
	console.log("Mejor cada dia es la clave");
	$scope.grillaUno={};
	$scope.grillaUno.columnDefs=FactoryEmpleado.ConfigurarGrilla();
	$scope.opciones=["fefe","fefe2","Fefe3"];
	$scope.prueba=[];
	$scope.cargado=false;
	$scope.selected = $scope.opciones[0];
	$scope.grillaUno.onRegisterApi= function(gridApi) {
		grid = gridApi.grid;
	}
	$scope.seleccion= function(idEmpleado,idLocal,cargo,e){
		paquete={
			idLocal:idLocal,
			idEmpleado:idEmpleado,
			cargo:cargo
		};
		FactoryEmpleado.CambiarEmpleadoLocal(paquete)
		.then(function(respuesta) {
			if(respuesta=="ya asignado"){
				alertify.error("Lo siento ya tenemos asignado un ENCARGADO en ese local ");
			}
			else{
				e.idLocal=idLocal;
				alertify.success("Se han hecho  los cambios");
			}
		})

	}

	FactoryLocal.TraerTodos().then(function(local) {
		local.push({idLocal:-1 , nombre:"sin asignar"});
		FactoryEmpleado.TraerAtodosLosEmpleado()
		.then(function(respuesta) {
			$scope.cargado=true;
			var num=0;
			var grilla=[];
			respuesta.forEach(function(e) {
				e.combo=local;
				var idL=-1;
				for(var i=0;i<local.length;i++){
					if(e.idLocal==local[i].idLocal){
						idL=i;
					}
				}
				console.log(local[local.length-1]);
				e.select=e.combo[(idL!=-1?idL:local.length-1)];

				grilla.push(e);
				num++;
			})

			console.log(respuesta);
			$scope.grilla=grilla;
			$scope.grillaUno.data=grilla;
		})

	});

	$scope.Borrar=function(empleado,index){
		console.log(empleado);

		FactoryEmpleado.BorrarEmpleado(empleado.idEmpleado)
		.then(function(respuesta) {
			console.log(respuesta);
			$scope.grilla.splice(index, 1);
		})
	}

})



