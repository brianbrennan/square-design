angular.module('submissionCtrl', ['picService'])

	.controller('submissionController', function(Pic, $location){
		var vm = this;

		vm.doSubmit = function(submission){
			Pic.postPic(submission);
			$location.path('/');
		};
	});