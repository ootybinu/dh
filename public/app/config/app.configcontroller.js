(function(){
'use strict';
angular.module('app').controller('configcontroller',configcont);
configcont.$inject = ['$scope','commonService','configService']
function configcont($scope,commonService, configService){
	$scope.user=commonService.readStorage('user');
	$scope.devices = {};
	activate();

	function activate(){

		getdata();
	}

	function getdata(){
		configService.getDevices($scope.user).then (
			function(data){
				$scope.devices = data.data;
			}, 
			function(errdata){
				console.log('Error occured' + errdata);
			}
			);
	}
	$scope.update = function(device)
	{
		configService.updateDevice(device).then(
			function(data){
				console.log('Data updated ..');
				activate();		
			},
			function(errdata){
				console.log('data not updated.');

			});
		console.log (device.devicename + "will be updated with "+  device.port);
		
	};

	$scope.delete = function(device)
	{
		if (confirm("Do you want to delete")){
			console.log (device.deviceName + "will be deleted");
		}
	};

}

})();
