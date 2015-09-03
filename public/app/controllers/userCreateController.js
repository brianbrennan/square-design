angular.module('userCreateCtrl', ['userService'])

	.controller('userCreateController', function(User){
		var vm = this;

		User.createUser(vm.signupData)
			.success(function(data){
				vm.user = data;
			});
	});
