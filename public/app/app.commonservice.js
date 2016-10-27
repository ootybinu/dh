(
	function(){
		'use strict';
		angular.module('app').service('commonService',CommonService);

		CommonService.$inject=['$window'];	
		function CommonService($window)
		{
			this.readStorage = function (key){
				return $window.sessionStorage && $window.sessionStorage.getItem(key);

			};
			this.writeStorage = function(key,value){
				if ($window.sessionStorage)
				{
					$window.sessionStorage.setItem(key,value);
				}

			};
		}
	})();