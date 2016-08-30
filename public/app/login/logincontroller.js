(function(){
'use strict';

angular.module('app').controller('logincontroller',loginController);
loginController.$inject= ['$scope','loginservice'];
function loginController($scope,loginservice){
	$scope.login = logIn;
	$scope.userName='';
	$scope.password='';

	activate();
	function activate()
	{

	}

	  function logIn(){
		loginservice.login($scope.userName,$scope.password).success
		(function (data) {
			if (data.flag=='success')
			{
			loginservice.success();
		}else 
		{
			console.log('authentication failure');
		}

		}).error(
		function (errarg) {
			console.log('error occured '+ errarg);
		});

	};

}

})();