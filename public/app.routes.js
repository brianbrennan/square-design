

var route = angular.module('app.routes', ['ngRoute', 'authService']);

route.config(function($routeProvider, $locationProvider){
	
	$routeProvider.when('/', {
		templateUrl: 'app/views/pages/home.html'
	})

	.when('/submit', {
		templateUrl: 'app/views/pages/submit.html',
	})

	.when('/signup', {
		templateUrl: 'app/views/pages/signup.html',
	});

	$locationProvider.html5Mode(true);
});	