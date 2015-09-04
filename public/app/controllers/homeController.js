angular.module('homeCtrl', ['picService'])

	.controller('homeController', function($rootScope, $location, Auth, $scope, Pic, $http){

		$scope.viewClass = 'home';

		var vm = this;

		vm.loggedIn = Auth.isLoggedIn();

		Pic.getAll().then(function(res){
			vm.pics = res.data;
		});

		vm.addLike = function(pic, id){
			if(vm.loggedIn){
				Pic.addLike(id);
				pic.likes++;
			}
			else
				$location.path('/login');
		}

		//set image to background

	});