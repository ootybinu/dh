(function(){	
	'use strict';

	angular.module('app').controller('homecontroller',homeController);
	homeController.$inject=['$scope','homeservice'];
	function homeController($scope,homeservice)
	{
		$scope.user='admin';
		$scope.devicedata=[];
		activate();
		$scope.changeState = changeState;


		function activate(){

			getdata();
		}

		function getdata(){
				homeservice.getdevices($scope.user).then(
					function (data){
						$scope.devicedata= data.data;
					},
				 function (err) {
				 	console.log('error occured while getting devices');
				}) ;


		}
		function changeState()
		{
			activate();
			// switch state here
		}


	}

})();