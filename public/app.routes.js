

var route = angular.module('app.routes', ['ngRoute', 'authService']);

route.config(function($routeProvider, $locationProvider){
	
	$routeProvider.when('/', {
		templateUrl: 'app/views/pages/home.html',
		controller: 'mainController',
		controllerAs: 'home'
	})

	.when('/submit', {
		templateUrl: 'app/views/pages/submit.html',
	})

	.when('/login', {
		templateUrl: 'app/views/pages/login.html',
		controller: 'mainController',
		controllerAs: 'login'
	})

	.when('/signup', {
		templateUrl: 'app/views/pages/signup.html',
		controller: 'userCreateController',
		controllerAs: 'signUp'
	});

	$locationProvider.html5Mode(true);
});	