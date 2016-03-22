angular.module('BetterBrain')
.service('UserService', function ($q,$http,API) {

    function updateAvator(userId, data){
    	var updateImageUrl = API.postUpdateImage(userId);
    	return $http.post(updateImageUrl, data).then(function(response){
			   return response.data
      });
    }
    function updateUserName(userId, username){
    	var updateNameUrl = API.updateUserName(userId, username);
    	return $http.get(updateNameUrl).then(function(response){
			return response.data
      	});
    }

    return {
      updateAvator:  updateAvator,
      updateUserName: updateUserName
    }

});