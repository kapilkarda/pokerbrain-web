angular.module('BetterBrain')
.service('QuestionService', function ($q,$http,API) {

    function getQuestions(topicId){
		  console.log(API.getQuestions(topicId));
      return $http.get(API.getQuestions(topicId)).then(function(response){
        return response.data
      });
    }

    function loadTopics(){
      var topicURL = API.getTopics();
      return $http.get(topicURL).then(function(response){
        return response.data
      });
    }

    return {
      getQuestions:  getQuestions,
      loadTopics  :  loadTopics 
    }

  });