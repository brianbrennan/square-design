angular.module('userCreateCtrl', ['userService'])

	.controller('userCreateController', function(User, $location){

		s('input').css('margin-right', 0);

		var vm = this;

		vm.doSignUp = function(){
			User.createUser(vm.signupData)
			.success(function(data){
				vm.user = data;
			});

			$location.path('/login');
		};
	});
