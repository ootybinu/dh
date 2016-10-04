(function(){

'use strict';
angular.module('app').directive('mySwitch',myswitch);
myswitch.$inject=['homeservice'];
function myswitch(homeservice)
{
return {

	restrict:'E',
	replace:true,
	templateUrl:'app/home/templates/myswitch.html',
	link:function (scope,elem,attrs){

		elem.bind('click',function(){

			var newval = !scope.device.state ;	
			var promise = homeservice.setValue(scope.device, newval);
			promise.then(
				function(data){
					console.log("Data Value set..");
				}, 
				function(errData){

				});

			console.log(scope.device.devicename);
		})
		// elem.bind('mouseover', function(){elem.css('background-color','gray');});
		// elem.bind('mouseout',function(){elem.css('background-color','white');});
		}
	}
}
})()
