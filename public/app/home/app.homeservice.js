(function(){
	'use strict;'
angular.module('app').service('homeservice',Homeservice);
Homeservice.$inject = ['$http'];
function Homeservice ($http)
{

	this.getdevices = function (name){
		var url ='/home/getdevices';
		return $http.post(url,{username:name});
	}
	this.setValue = function(device, val)
	{
		var url='/home/setvalue';
		return $http.post(url, {device:device,value:val});

	}
}


})();