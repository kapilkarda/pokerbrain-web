angular.module('BetterBrain')
.service('SignupService', function ($q,$http,API) {

    function Signup(Email,Password,Gender,FullName,FB_Id,country,dob,avator){
		  return $http.get(API.getSignUp(Email,Password,Gender,FullName,FB_Id,country,dob,avator)).then(function(response){
        return response.data
      });
    }

    return {
      Signup:  Signup
    }

  });