(function(){	
	'use strict';

	angular.module('app').controller('homecontroller',homeController);
	homeController.$inject=['$scope','commonService','homeservice'];
	function homeController($scope,commonService, homeservice)
	{
		$scope.user=commonService.readStorage('user');
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
			           // toastr.options.positionClass = 'toast-bottom-right';
		        	   //  toastr.options.timeOut = 5000;
        		    // 	toastr.success("success", "good");
						//toastr.info('Data Updated!!',"update");
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