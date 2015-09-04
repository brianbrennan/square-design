
angular.module('app', ['app.routes', 'loginCtrl', 'userCtrl', 'userCreateCtrl', 'homeCtrl' , 'submissionCtrl', 'ngAnimate', 'authService'])

	.config(function($httpProvider){
		$httpProvider.interceptors.push('AuthInterceptor');
	});