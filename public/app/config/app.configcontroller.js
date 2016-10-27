(function(){
'use strict';
angular.module('app').controller('config',configcont);
configcont.$inject = ['$scope','commonService','configService']
function configcont($scope,commonService, configService){
	$scope.user=commonService.readStorage('user');
	
	activate();

	function activate(){

		getdata();
	}

	function getdata(){
		configService.getDevices($scope.user).then (
			function(data){

			}, 
			function(errdata){

			}
			);
	}
}

})();}
