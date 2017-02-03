angular
.module('AngularABM')
.factory("FactoryGrilla", function($http,uiGridConstants,ServicioProducto){
	grilla={};
	grilla.AutoScroll=AutoScroll;
	return grilla;


	function AutoScroll(dato){
		var rowHeight = 30; 
		var headerHeight = 30; 
		return {
			height: (datos * rowHeight + headerHeight) + "px"
		};
	};


});