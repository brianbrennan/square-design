

var route = angular.module('app.routes', ['ngRoute', 'authService']);

route.config(function($routeProvider, $locationProvider){
	
	$routeProvider.when('/', {
		templateUrl: 'app/views/pages/home.html',
		controller: 'homeController',
		controllerAs: 'home'
	})

	.when('/submit', {
		templateUrl: 'app/views/pages/submit.html',
		controller: 'submissionController',
		controllerAs: 'submit'
	})

	.when('/login', {
		templateUrl: 'app/views/pages/login.html',
		controller: 'loginController',
		controllerAs: 'login'
	})

	.when('/signup', {
		templateUrl: 'app/views/pages/signup.html',
		controller: 'userCreateController',
		controllerAs: 'signUp'
	})

	.when('/likes', {
		templateUrl: 'app/views/pages/likes.html',
		controller: 'homeController',
		controllerAs: 'likes'
	});

	$locationProvider.html5Mode(true);
});	