(function(){
	'use strict';
	angular.module('app').controller('logoutcontroller',logoutController);
	logoutController.$inject=['$scope','commonService','loginservice'];
	function logoutController($scope,commonService,loginservice){

		activate();
		function activate(){
			commonService.removeStorageItem('user');
			commonService.removeStorageItem('key');
		}

	};
})();