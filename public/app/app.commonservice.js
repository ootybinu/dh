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

			this.showInfo = function (msg,title)
			{
				configureToastr();
				toastr.info(msg,title);
			};
			this.showSuccess = function (msg,title)
			{
				configureToastr();
				toastr.success(msg,title);
			};
			this.showError = function (msg,title)
			{
				configureToastr();
				toastr.error(msg,title);
			};	

			this.showWarning = function (msg,title)
			{
				configureToastr();
				toastr.warning(msg,title);
			};

			function configureToastr()
			{
				toastr.options.positionClass = 'toast-bottom-right';
        	    toastr.options.timeOut = 2000;
			}
		}
	})();