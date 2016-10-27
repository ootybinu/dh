(function () {
'use strict';
angular.module('app').service('loginservice',loginService);
loginService.$inject=['$http','commonService'];

function loginService($http,commonService){

this.login = function ( username,pwd){
	var url = '/login';
	return $http.post(url,{username:username,password:pwd});

	};
	
	this.success= function(){
		return $http.get('/');
	};

}

})();