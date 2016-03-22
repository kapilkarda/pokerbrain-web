angular.module('BetterBrain')
.service('GetScoreService', function ($q,$http,API) {

    function GetScore(userId){
    	var GetURL = API.getScores(userId);
    	console.log(GetURL);
      	return $http.get(GetURL).then(function(response){
			return response.data
      	});
    }
    return {
      GetScore: GetScore
    }

});