(function(){

'use strict';
angular.module('app').directive('mySwitch',myswitch);
function myswitch()
{
return {

	restrict:'E',
	replace:true,
	templateUrl:'app/home/templates/myswitch.html',
	link:function (scope,elem,attrs){
		elem.bind('mouseover', function(){elem.css('background-color','gray');});
		elem.bind('mouseout',function(){elem.css('background-color','white');});
		}
	}
}
})()
