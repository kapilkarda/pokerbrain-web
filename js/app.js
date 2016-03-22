
angular.module('BetterBrain', ['ionic', 'login.controller','ngCordova.plugins', 'signup.controller', 'nav.controllers', 'home.controllers', 'tabSlideBox', 'leaderboard.controllers', 'prereadyans.controllers', 'playinput.controllers', 'pokerplayer.controllers', 'pokerquestion.controllers', 'pokerquestioninput.controllers', 'singleprereadyans.controllers', 'result.controllers', 'support.controllers', 'myscore.controllers', 'rightlist.controllers', 'tc.chartjs'])

.run(function($rootScope, $ionicPlatform, $state, $localstorage) {
	$ionicPlatform.ready(function() {
		try{
			if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if (window.StatusBar){
				StatusBar.styleLightContent();
			}
			
			var userId = $localstorage.get("UserId");
			if(userId!=undefined && userId!=null && userId!="undefined" && userId!="null" && userId!="0" && userId!=""){
				$state.go('nav.home');
			}
	
			$rootScope.logout=function(){
				$localstorage.set("UserId", "");
				$localstorage.set("FBId", "");
				$localstorage.set("FullName", "");
				$localstorage.set("Email", "");
				$state.go('login');
			};
		}catch(err){
			alert(err.message);
		}
	});
})
.directive('dynamic', function ($compile) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, ele, attrs) {
      scope.$watch(attrs.dynamic, function(html) {
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
  };
})
.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
})
.filter('reverse', function() {
	return function(items) {
		if(items!=undefined){
			return items.slice().reverse();
		}
	};
})
.factory('$localstorage', ['$window', function($window) {
	return {
	set: function(key, value) {
	 $window.localStorage[key] = value;
	},
	get: function(key, defaultValue) {
	 return $window.localStorage[key] || defaultValue;
	},
	setObject: function(key, value) {
	 $window.localStorage[key] = JSON.stringify(value);
	},
	getObject: function(key) {
	 return JSON.parse($window.localStorage[key] || '{}');
	}
	}
}])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
	.state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginPageController'
	})
	.state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'SignupPageController'
	})
	.state('nav', {
		cache: false,
		url: '/nav',
		templateUrl: 'templates/nav.html',
		abstract: true,
		controller: 'NavigationController'
	})
  
	.state('nav.home', {
		cache: false,
		url: '/home',
		views: {
			'nav': {
				templateUrl: 'templates/home.html',
				controller: 'HomeCtrl'
			}
		}
	})
	.state('nav.leaderboard', {
		cache: false,
		url: '/leaderboard',
		views: {
			'nav': {
				templateUrl: 'templates/leaderboard.html',
				controller: 'LeaderboardCtrl'
			}
		}
	})
	.state('nav.support', {
		cache: false,
		url: '/support',
		views: {
			'nav': {
				templateUrl: 'templates/support.html',
				controller: 'SupportCtrl'
			}
		}
	})
	.state('nav.myscore', {
		cache: false,
		url: '/myscore',
		views: {
			'nav': {
				templateUrl: 'templates/myscore.html',
				controller: 'MyscoreCtrl'
			}
		}
	})
	.state('prereadyans', {
		cache: false,
		url: '/prereadyans',
		templateUrl: 'templates/prereadyans.html',
		controller: 'PrereadyansCtrl'
	})
	.state('playinput', {
		cache: false,
		url: '/playinput',
		templateUrl: 'templates/playinput.html',
		controller: 'PlayinputCtrl'
	})
	.state('pokerplayer', {
		cache: false,
		url: '/pokerplayer',
		templateUrl: 'templates/pokerplayer.html',
		controller: 'PokerplayerCtrl'
	})
	.state('pokerquestion', {
		cache: false,
		url: '/pokerquestion',
		templateUrl: 'templates/pokerquestion.html',
		controller: 'PokerquestionCtrl'
	})
	.state('pokerquestioninput', {
		cache: false,
		url: '/pokerquestioninput',
		templateUrl: 'templates/pokerquestioninput.html',
		controller: 'PokerquestioninputCtrl'
	})
	.state('singleprereadyans', {
		cache: false,
		url: '/singleprereadyans',
		templateUrl: 'templates/singleprereadyans.html',
		controller: 'SingleprereadyansCtrl'
	})
	.state('result', {
		cache: false,
		url: '/result',
		templateUrl: 'templates/result.html',
		controller: 'ResultCtrl'
	})
	.state('rightlist', {
		cache: false,
		url: '/result',
		templateUrl: 'templates/rightlist.html',
		controller: 'rightlistCtrl'
	});
	
	
	var userId = localStorage.getItem("UserId");
	if(userId!=undefined && userId!=null && userId!="undefined" && userId!="null" && userId!="0" && userId!=""){
		$urlRouterProvider.otherwise('/nav/home');
	}else{
	   $urlRouterProvider.otherwise('/login');
	}
})
.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
  	var calculateper = $filter('number')(input * 100, decimals);
  	if(calculateper==""){
  		calculateper=0;
  	}
  	return calculateper + '%';
  };
}]);