angular.module('homeCtrl', [])

	.controller('homeController', function($scope){
		$scope.$on('$viewContentLoaded', function() {
    		sizing();
		});
		$scope.viewClass = 'animate-home';
	});