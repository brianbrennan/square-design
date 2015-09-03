angular.module('userCtrl', ['authService'])

	.controller('userController', function(Auth){
		var vm = this;

		vm.getUser = function(){
			Auth.getUser();
		};

		console.log(vm.getUser());
	});