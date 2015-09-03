angular.module('homeCtrl', [])

	.controller('homeController', function($rootScope, $location, Auth, $scope, Pic){

		$scope.$on('$viewContentLoaded', function() {
    		sizing();
		});

		$scope.viewClass = 'home';

		var vm = this;

		$rootScope.loggedIn = Auth.isLoggedIn();

		vm.getPics = function(){
			Pic.getAll();
		};

		console.log(vm.getPics());

	});