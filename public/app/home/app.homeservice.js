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
}


})();