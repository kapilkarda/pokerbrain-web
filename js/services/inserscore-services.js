angular.module('BetterBrain')
.service('InserScoreService', function ($q,$http,API) {

    function InserScore(topicId, userId, questionId, answer, point, isTrue, isFalse){
    	var InsetURL = API.InsterScore(topicId, userId, questionId, answer, point, isTrue, isFalse);
      	return $http.get(InsetURL).then(function(response){
			return response.data
      	});
    }

    return {
      InserScore:  InserScore
    }

});