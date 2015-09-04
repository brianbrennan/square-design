angular.module('picService', [])

	.factory('Pic', function($http){

		// factory.getAll = function(){
		// 	$http.get('/api/pics').then(function(res){
		// 		factory.pics = res.data;
		// 		console.log(res.data);
		// 	}, function(err){
		// 		console.log(err);
		// 	});
		// };

		// factory.postPic = function(data){
		// 	return $http.post('/api/pics', data);
		// }

		// factory.get = function(id){
		// 	return $http.get('/api/pics/' + id);
		// };

		return {
			getAll: function(){
				
				var promise = $http.get('/api/pics').success(function(data){
					return data;
				});

				return promise;
			},
			addLike: function(id){
				$http.put('/api/pics/addLike/' + id);
			}
		};
	});