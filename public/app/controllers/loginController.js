angular.module('loginCtrl', [])

	.controller('loginController', function($rootScope, $location, Auth){

		s('input').css('margin-right', 0);

		var vm = this;

		$rootScope.loggedIn = Auth.isLoggedIn();

		$rootScope.$on('$routeChangeStart', function(){

			$rootScope.loggedIn = Auth.isLoggedIn();

		});

		$rootScope.loggedIn = Auth.isLoggedIn();

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