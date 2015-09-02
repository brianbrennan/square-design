angular.module('userService', [])

	.factory('User', function($http){

		var factory = {};

		factory.getAll = function(){
			return $http.get('/api/users');
		};

		factory.get = function(id){
			return $http.get('/api/users' + id);
		};

		factory.createUser = function(data){
			return $http.post('/api/users', data);
		};

		factory.update = function(id, data){
			return $http.post('/api/users' + id, data);
		};

		factory.delete = function(id){
			return $http.delete('/api/users' + id);
		};

		return factory;
	});