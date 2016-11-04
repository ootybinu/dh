(function(){
	'use strict;'
angular.module('app').service('configService',Configservice);
Configservice.$inject = ['$http','commonService'];
function Configservice ($http,commonService)
{

	this.getDevices = function (name){
		var url ='/config/getdevices';
		return $http.post(url,{username:name});
	}
	// this.setValue = function(device, val)
	// {
	// 	var url='/home/setvalue';
	// 	return $http.post(url, {device:device,value:val});

	// }
	this.deleteDevice = function(device)
	{
		var url='/config/deletedevice';
		return $http.post(url,{device:device});
	};
	
	this.updateDevice = function(device)
	{
		var url='/config/updatedevice';
		return $http.post(url,{device:device});
	};
	this.addDevice = function(device)
	{
		var url='/config/adddevice';
		return $http.post(url,{device:device});
	};
}

})();