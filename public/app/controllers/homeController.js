angular.module('homeCtrl', ['picService'])

	.controller('homeController', function($rootScope, $location, Auth, $scope, Pic, $http){

		$scope.viewClass = 'home';

		var vm = this;

		vm.loggedIn = Auth.isLoggedIn();

		Pic.getAll().then(function(res){
			vm.pics = res.data;
		});

		//set image to background

	});