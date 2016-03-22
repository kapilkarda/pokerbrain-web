angular.module('BetterBrain')
.service('GetleaderboardService', function ($q,$http,API) {

    function Getleaderscore(){
    	var GetURL = API.getLeaderboard();
    	console.log(GetURL);
      return $http.get(GetURL).then(function(response){
			   return response.data
      });
    }
    return {
      Getleaderscore:  Getleaderscore
    }

});