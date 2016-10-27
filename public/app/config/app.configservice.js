(function(){
	'use strict;'
angular.module('app').service('configService',Configservice);
Configservice.$inject = ['$http','commonService'];
function Configservice ($http,commonService)
{

	this.getdevices = function (name){
		var url ='/home/getdevices';
		return $http.post(url,{username:name});
	}
	// this.setValue = function(device, val)
	// {
	// 	var url='/home/setvalue';
	// 	return $http.post(url, {device:device,value:val});

	// }
}

})();