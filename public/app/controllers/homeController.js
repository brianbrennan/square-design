angular.module('homeCtrl', [])

	.controller('homeController', function($rootScope, $location, Auth, $scope){

		$scope.$on('$viewContentLoaded', function() {
    		sizing();
		});

		$scope.viewClass = 'animate-home';

		var vm = this;

		$rootScope.loggedIn = Auth.isLoggedIn();

	});