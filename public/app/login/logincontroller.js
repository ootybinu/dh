(function(){
'use strict';

angular.module('app').controller('logincontroller',loginController);
loginController.$inject= ['$scope','commonService','loginservice'];
function loginController($scope,commonService,loginservice){
	$scope.login = logIn;
	$scope.userName='';
	$scope.password='';
	$scope.error='';
	activate();
	function activate()
	{

	}

	  function logIn(){
		loginservice.login($scope.userName,$scope.password).success
		(function (data) {
			if (data.flag=='success')
			{
			// 
				commonService.writeStorage("user", data.user);
				commonService.writeStorage("key",data.key);
				window.location = "/";
			// loginservice.success().success(function(data1){
			// 		console.log('loading landing page');
			// }).error(function(err){
			// 	console.log('error occured...');
			// });
		}else 
		{
			console.log('authentication failure');
			$scope.error='userName not found/wrong password';
		}

		}).error(
		function (errarg) {
			console.log('error occured '+ errarg);
		});

	};

}

})();