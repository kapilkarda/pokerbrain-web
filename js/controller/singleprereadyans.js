angular.module('singleprereadyans.controllers', [])

.controller('SingleprereadyansCtrl', function($scope, $state, $ionicPlatform, QuestionService, InserScoreService, $ionicLoading, $localstorage, $timeout, $ionicPopup, $timeout, $window) {
	$ionicPlatform.ready(function(){
		try{
			$scope.show=true;

			$scope.isFlipped='back';

			$scope.defaulthide = false;

			$scope.userId = $localstorage.get("UserId");
			$scope.animation="";
			$scope.show='0';
			$scope.class1='background_white text_color';
			$scope.class2='background_white text_color';
			$scope.class3='background_white text_color';
			$scope.class4='background_white text_color';
			$scope.tableimage="position1.png"
			$scope.redcoin={"top":"120px","left":"18%"};
			$scope.yellwcoin={"top":"138px","left":"30%"};
			$scope.usercoin={"top":"138px","left":"51%"};
			$scope.circlevalue='0';
			$scope.Userpics=[
				{"id":"1", "pic":"position1.png"},
				{"id":"2","pic":"position2.png"},
				{"id":"3","pic":"position3.png"},
				{"id":"4","pic":"position4.png"},
				{"id":"5","pic":"position5.png"},
				{"id":"6","pic":"position6.png"},
				{"id":"7","pic":"position7.png"},
				{"id":"8","pic":"position8.png"},
				{"id":"9","pic":"position9.png"},
				{"id":"10","pic":"position10.png"}
			];
			$scope.questions=[];

			$scope.topicId="563988953184ae030041a04b";

			$scope.loadquestions=function(topicId){
				$ionicLoading.show();
				QuestionService.getQuestions(topicId).then(function (data) {
					if(data.result){
						console.log(data.data);
				    	// $scope.questions=data.data;
				    	// console.log($scope.questions);
				    	angular.forEach(data.data, function(item) {
						    $scope.questions.push({
						        _id			: item._id,
								ante		: item.ante,
								bb			: item.bb,
								card1		: item.card1,
								card2		: item.card2,
								category 	: item.category,
								opt1 		: item.opt1,
								opt2 		: item.opt2,
								opt3 		: item.opt3,
								opt4 		: item.opt4,
								position 	: item.position,
								question 	: item.question,
								right_answer: item.right_answer,
								sb 			: item.sb,
								stacksizebb : item.stacksizebb,
								sub_category: item.sub_category,
								topic_id 	: item.topic_id,
								type 		: item.type,
								type_id 	: item.type_id,
						        rank 		: 0.5 - $window.Math.random()
						    });
						});
						console.log($scope.questions);
						$ionicLoading.hide();
					}else{
						$ionicLoading.hide();
						alert("Please Try Letter...");
					}
				});	
			};

			$scope.showMainDiv=true;
			
			$scope.loadquestions($scope.topicId);
			
			
			$scope.playerdetails={
				"id":"0",
				"pic":"",
				"name":$localstorage.get("FullName"),
			};

			$scope.playerdetails.pic = $localstorage.get("avator");

			$scope.showfunction=function(num){
				$scope.class1='background_white text_color';
				$scope.class2='background_white text_color';
				$scope.class3='background_white text_color';
				$scope.class4='background_white text_color';
				$scope.show=num;
				$scope.isFlipped='back';
			};

			
			$scope.results=[];

			$scope.indexMain = "";


			$scope.doClickrotate = function(){
				if($scope.defaulthide==true){
					$scope.showMainDiv=true;
					$scope.isFlipped='flipped';
					var n = Number($scope.indexMain)+1;
					$scope.showfunction(n);
					$scope.defaulthide = false;
				}
			}
			
			$scope.Inserresults=function(topicId, userId, questionId, answer, point, isTrue, isFalse, index){
				$scope.defaulthide = true;
				InserScoreService.InserScore(topicId, userId, questionId, answer, point, isTrue, isFalse).then(function (data) {
					try{
						var values={
							"id":questionId,
							"result":point
						};
						$scope.results.push(values);	
						if(data.result){
							if(index=='9'){
								var alertPopup = $ionicPopup.alert({
									title: 'Thankyou for playing',
									subTitle: 'See your score'
								});
								alertPopup.then(function(res) {
									var results0=JSON.stringify($scope.results);	
									$localstorage.set("results", results0);
									$state.go('result');
								});
							}else{
								$scope.defaulthide = true;
								$scope.indexMain = index;
								$scope.doClickrotate();
							}
						}else{
							alert('you already Play this game');
							$state.go('result');
						}
						$ionicLoading.hide();
					}catch(err){
						alert(err.message);
					}	
				});
			};

			$scope.setresult=function(id, result, answer, index){
				try{
					if(result==true || result=='true'){
						var isTrue="1";
						var isFalse="0";
						var point="1";
					}else{
						var isTrue="0";
						var isFalse="1";
						var point="-1";
					};
					setTimeout(function(){
						$ionicLoading.show();
						$scope.Inserresults($scope.topicId, $scope.userId, id, answer, point, isTrue, isFalse, index);
					},3000);
				}catch(err){
					alert(err.message);
				}	
			};

			$scope.random = function() {
				console.log(0.5 - Math.random());
		        return 0.5 - Math.random();
		    }
			
			$scope.checkans=function(option, ans, num, question, id, index){
				$scope.showMainDiv=false;
				if(option==ans){
					if(num=='1'){
						$scope.class1='text_white button_animation';
					}else if(num=='2'){
						$scope.class2='text_white button_animation';
						
					}else if(num=='3'){
						$scope.class3='text_white button_animation';
					}
					else if(num=='4'){
						$scope.class4='text_white button_animation' ;
					}
					var result="true";
				}else{

					console.log(question);
					console.log(ans);

					var options1=question.opt1;
					var options2=question.opt2;
					var options3=question.opt3;
					var options4=question.opt4;

					if(options1 == ans){
						$scope.class1='text_white button_animation';
					}else if(options2 == ans){
						$scope.class2='text_white button_animation';
					}else if(options3 == ans){
						$scope.class3='text_white button_animation';
					}else if(options4 == ans){
						$scope.class4='text_white button_animation';
					}
					if(num=='1'){
						$scope.class1='color_red text_white';
					}else if(num=='2'){
						$scope.class2='color_red text_white';
					}else if(num=='3'){
						$scope.class3='color_red text_white';
					}
					else if(num=='4'){
						$scope.class4='color_red text_white';
					}
					var result="false";
				}

				$scope.setresult(id, result, option, index);
				
			};
			
		}catch(err){
			alert(err.message);
		}
	});
});
