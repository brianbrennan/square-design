angular.module('submissionCtrl', ['picService'])

	.controller('submissionController', function(Pic, $location){
		var vm = this;

		vm.doSubmit = function(){
			Pic.postPic(vm.picSubmitData.firstName, vm.picSubmitData.lastName, vm.picSubmitData.email, vm.picSubmitData.image);
			$location.path('/');
		};
	});