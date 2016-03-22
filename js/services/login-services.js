angular.module('BetterBrain')
.service('LoginService', function ($q,$http,API) {

    function Login(Email,Password){
    	var loginURL = API.getLogin(Email,Password);
    	console.log(loginURL);
      	return $http.get(loginURL).then(function(response){
			return response.data
      	});
    }

    return {
      Login:  Login
    }

});