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

		vm.like = function(user, pic){
			if(vm.loggedIn){

				if(!vm.isLiked(user, pic)){
					console.log('liked');
					Pic.addLike(pic._id);//adds like via api;

					$http.put('/api/users/addLike/' + user._id + '/' + pic._id).then(function(err){
						if(err)
							console.log(err);
						s('.pic-' + pic._id).class('pic-' + pic._id + ' liked');

						vm.user.likes.push(pic._id);
					});

					pic.likes++;
				} else {
					console.log('unliked');
					Pic.removeLike(pic._id);//adds like via api;

					$http.put('/api/users/removeLike/' + user._id + '/' + pic._id).then(function(err){
						if(err)
							console.log(err);
						s('.pic-' + pic._id).class('pic-' + pic._id);

						var i = vm.user.likes.indexOf(pic._id);

						if(i > -1)
							vm.user.likes.splice(i, 1);

						console.log(vm.user);
					});

					pic.likes--;
				}
				
			}
			else
				$location.path('/login');
		};

		vm.likeClass = function(user, pic){
			if(vm.isLiked(user, pic))
				return 'liked';
			return;
		};

		vm.isLiked = function(user, pic){

			for(var i = 0; i < user.likes.length; i++){
				if(user.likes[i] == pic._id){
					return true;
				}
			}

			return false;
		};

	});