
angular.module('app', ['app.routes', 'loginCtrl', 'userCtrl', 'userCreateCtrl', 'homeCtrl' , 'likesCtrl', 'submissionCtrl', 'ngAnimate', 'authService'])

	.config(function($httpProvider){
		$httpProvider.interceptors.push('AuthInterceptor');
	});