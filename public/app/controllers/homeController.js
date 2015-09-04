angular.module('homeCtrl', ['picService'])

	.controller('homeController', function($rootScope, $location, Auth, $scope, Pic, $http, User){

		$scope.viewClass = 'home';

		var vm = this;

		vm.loggedIn = Auth.isLoggedIn();

		if(vm.loggedIn){
			Auth.getUser().then(function(res){
				vm.user = res.data;
			});		
		}

		Pic.getAll().then(function(res){
			vm.pics = res.data;
		});

		vm.addLike = function(user, pic){
			if(vm.loggedIn){
				Pic.addLike(pic._id);
				User.addLike(user, pic);
				pic.likes++;
			}
			else
				$location.path('/login');
		};

		vm.isLiked = function(user, pic){
			return "liked";
		};

	});