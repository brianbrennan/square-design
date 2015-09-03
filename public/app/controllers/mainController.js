angular.module('mainCtrl', [])

	.controller('mainController', function($rootScope, $location, Auth){

		sizing();

		s('input').css('margin-right', 0);

		var vm = this;

		vm.loggedIn = Auth.isLoggedIn();

		$rootScope.$on('$routeChangeStart', function(){

			vm.loggedIn = Auth.isLoggedIn();

			Auth.getUser()
				.success(function(data){
					vm.user = data;
				});
		});

		vm.doLogin = function(){

			Auth.login(vm.loginData.username, vm.loginData.password)
				.success(function(data){
					$location.path('/');
				});
		};

		vm.doLogout = function(){
			Auth.logout();

			vm.user = {};
			$location.path('/login');
		};
	});