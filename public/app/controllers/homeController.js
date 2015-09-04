angular.module('homeCtrl', ['picService'])

	.controller('homeController', function($rootScope, $location, Auth, $scope, Pic, $http, User){

		$scope.viewClass = 'home';

		var vm = this;

		vm.loggedIn = Auth.isLoggedIn();

		if(vm.loggedIn){
			Auth.getUser().then(function(res){
				vm.user = res.data;
				console.log(vm.user);
			});		
		}

		Pic.getAll().then(function(res){
			vm.pics = res.data;
		});

		vm.addLike = function(user, pic){
			if(vm.loggedIn){

				if(vm.isLiked(user, pic) == "liked"){
					Pic.removeLike(pic._id);
					User.removeLike(user, pic);
					pic.likes--;
				} else {
					Pic.addLike(pic._id);
					User.addLike(user, pic);
					pic.likes++;
				}
			}
			else
				$location.path('/login');
		};

		vm.isLiked = function(user, pic){
			for(var i = 0; i < user.likes.length; i++){
				if(pic._id === user.likes[i])
					return "liked";
			}
			return;
		};

	});