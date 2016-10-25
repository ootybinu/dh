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
//			alert(scope.device.devicename +scope.device.state);
			var newval = scope.device.state == 0 ? 1:0;	
			var promise = homeservice.setValue(scope.device, newval);
			promise.then(
				function(data){
					scope.device.state = newval;
					console.log("Data Value set..");
				}, 
				function(errData){
					console.log("set value error" + errData);
				});

			console.log(scope.device.devicename);
		})
		// elem.bind('mouseover', function(){elem.css('background-color','gray');});
		// elem.bind('mouseout',function(){elem.css('background-color','white');});
		}
	}
}
})()
