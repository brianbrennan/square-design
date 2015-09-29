angular.module('likesCtrl', ['picService'])

	.controller('likesController', function($rootScope, $location, Auth, $scope, Pic, $http, User){

		$scope.viewClass = 'likes';

		var vm = this;

		vm.loggedIn = Auth.isLoggedIn();

		vm.loading = true;

		if(vm.loggedIn){
			Auth.getUser().then(function(res){
				vm.user = res.data;

				vm.likes = [];

				for(var i = 0; i < vm.user.likes.length; i++){
					Pic.getPic(vm.user.likes[i]).then(function(res){
						vm.likes[i] = res.data;

						if(i == vm.user.likes.length - 1)
							vm.loading = false;
					});
				}
			});		
		}


		vm.addLike = function(user, pic){
			if(vm.loggedIn){

				if(vm.isLiked(user, pic) == "liked"){
					console.log('unliked');
					Pic.removeLike(pic._id);
					User.removeLike(user, pic);
					vm.isLiked(user, pic);
					s('.like svg').removeClass('liked');
					pic.likes--;
				} else {
					console.log('liked');
					Pic.addLike(pic._id);
					$http.put('/api/users/addLike/' + user._id + '/' + pic._id).then(function(err){
						vm.isLiked(user, pic);
					});
					vm.isLiked(user, pic);
					s('.like svg').addClass('liked');
					pic.likes++;
				}
			}
			else
				$location.path('/login');
		};

		vm.isLiked = function(user, pic){
			for(var i = 0; i < user.likes.length; i++){
				if(pic._id == user.likes[i])
					return "liked";
			}
			return;
		};

	});