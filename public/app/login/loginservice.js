(function () {
'use strict';
angular.module('app').service('loginservice',loginService);
loginService.$inject=['$http'];

function loginService($http){

this.login = function ( username,pwd){
	var url = '/login';
	return $http.post(url,{username:username,password:pwd});

	};
	this.success= function(){
		$http.get('/');
	};

}

})();