angular.module('prereadyans.controllers', [])

.controller('PrereadyansCtrl', function($scope, $ionicPlatform) {
	$ionicPlatform.ready(function(){
		try{
			$scope.questions=[
				{
					"id":"1",
					"icon":"img/game1.png",
					"question":"WHAT IS THE HIGHEST COMBINATION OF THE LISTED BELOW?",
					"option1":"FLUSH",
					"option2":"TWO PAIR",
					"option3":"FULL HOUSE",
					"option4":"STRAIGHT",
					"ans":"TWO PAIR"
				},
				{
					"id":"2",
					"icon":"img/game1.png",
					"question":"WHAT IS THE HIGHEST COMBINATION OF THE LISTED BELOW?",
					"option1":"FLUSH",
					"option2":"TWO PAIR",
					"option3":"FULL HOUSE",
					"option4":"STRAIGHT",
					"ans":"TWO PAIR"
				},
				{
					"id":"3",
					"icon":"img/game1.png",
					"question":"WHAT IS THE HIGHEST COMBINATION OF THE LISTED BELOW?",
					"option1":"FLUSH",
					"option2":"TWO PAIR",
					"option3":"FULL HOUSE",
					"option4":"STRAIGHT",
					"ans":"TWO PAIR"
				},
				{
					"id":"4",
					"icon":"img/game1.png",
					"question":"WHAT IS THE HIGHEST COMBINATION OF THE LISTED BELOW?",
					"option1":"FLUSH",
					"option2":"TWO PAIR",
					"option3":"FULL HOUSE",
					"option4":"STRAIGHT",
					"ans":"TWO PAIR"
				},
				{
					"id":"5",
					"icon":"img/game1.png",
					"question":"WHAT IS THE HIGHEST COMBINATION OF THE LISTED BELOW?",
					"option1":"FLUSH",
					"option2":"TWO PAIR",
					"option3":"FULL HOUSE",
					"option4":"STRAIGHT",
					"ans":"TWO PAIR"
				},
				{
					"id":"6",
					"icon":"img/game1.png",
					"question":"WHAT IS THE HIGHEST COMBINATION OF THE LISTED BELOW?",
					"option1":"FLUSH",
					"option2":"TWO PAIR",
					"option3":"FULL HOUSE",
					"option4":"STRAIGHT",
					"ans":"TWO PAIR"
				},
				{
					"id":"7",
					"icon":"img/game1.png",
					"question":"WHAT IS THE HIGHEST COMBINATION OF THE LISTED BELOW?",
					"option1":"FLUSH",
					"option2":"TWO PAIR",
					"option3":"FULL HOUSE",
					"option4":"STRAIGHT",
					"ans":"TWO PAIR"
				},{
					"id":"8",
					"icon":"img/game1.png",
					"question":"WHAT IS THE HIGHEST COMBINATION OF THE LISTED BELOW?",
					"option1":"FLUSH",
					"option2":"TWO PAIR",
					"option3":"FULL HOUSE",
					"option4":"STRAIGHT",
					"ans":"TWO PAIR"
				},
				{
					"id":"9",
					"icon":"img/game1.png",
					"question":"WHAT IS THE HIGHEST COMBINATION OF THE LISTED BELOW?",
					"option1":"FLUSH",
					"option2":"TWO PAIR",
					"option3":"FULL HOUSE",
					"option4":"STRAIGHT",
					"ans":"TWO PAIR"
				},
				{
					"id":"10",
					"icon":"img/game1.png",
					"question":"WHAT IS THE HIGHEST COMBINATION OF THE LISTED BELOW?",
					"option1":"FLUSH",
					"option2":"TWO PAIR",
					"option3":"FULL HOUSE",
					"option4":"STRAIGHT",
					"ans":"TWO PAIR"
				}
			];
		}catch(err){
			console.log(err.message);
		}
	});
});
