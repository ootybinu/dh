(
function(){

'use strict';
angular.module('app').controller('listcontroller',listController);
$inject = [$scope];
function listController($scope)
{
$scope.value = "testing";

}

})();
