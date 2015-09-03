angular.module('picService', [])

	.factory('Pic', function($http){

		var factory = {};

		factory.getAll = function(){
			return $http.get('/api/pics');
		};

		factory.postPic = function(data){
			return $http.post('/api/pics', data);
		}

		factory.get = function(id){
			return $http.get('/api/pics/' + id);
		};

		return factory;
	});