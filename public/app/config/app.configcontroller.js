(function(){
'use strict';
angular.module('app').controller('configcontroller',configcont);
configcont.$inject = ['$scope','commonService','configService']
function configcont($scope,commonService, configService){
	$scope.user=commonService.readStorage('user');
	$scope.devices = {};
	commonService.checkLogin();
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
				commonService.showSuccess("Configuration updated!","Success");
				//getdata();
			},
			function(errdata){
				commonService.showError(errdata,"Error occured");
				console.log('data not updated.' + errdata);

			});
		console.log (device.devicename + "will be updated with "+  device.port);
		
	};

	$scope.delete = function(device)
	{
		if (confirm("Do you want to delete")){
			configService.deleteDevice(device).then(
				function (data) {
					commonService.showSuccess("Device deleted");
					getdata();
				}, 
				function (errdata) {
					commonService.showError("Error Occured while deleting device","Exception");
					console.log(errdata);

				}

				);
			console.log (device.deviceName + "will be deleted");
		}
	};

	$scope.addNew = function()
	{
		var device = {devicename:$scope.devname,username:$scope.user, port:$scope.devport};
		configService.addDevice(device).then(
				function (data) {
					commonService.showSuccess("Device Added");
					$('#myPopup').modal('hide');
					getdata();
				}, 
				function (errdata) {
					commonService.showError("Error Occured while adding device","Exception");
					console.log(errdata);

				}

				);

	}

}

})();
