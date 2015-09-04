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
			return $http.post('/registerUser', data);
		};

		factory.update = function(id, data){
			return $http.post('/api/users' + id, data);
		};

		factory.delete = function(id){
			return $http.delete('/api/users' + id);
		};

		factory.addLike = function(user, pic){
			console.log(pic);

			console.log()
			return $http.put('/api/users/addLike/' + user.username + '/' + pic._id);
		};

		return factory;
	});