angular.module('home.controllers', [])

.controller('HomeCtrl', function($scope, $state, $ionicLoading, $localstorage, QuestionService, $ionicPopup, $ionicPlatform) {
	$ionicPlatform.ready(function(){
		try{

			$scope.onSlideMove = function(data){
				//alert("You have selected " + data.index + " tab");
			};

			var changeid = 0;
			$localstorage.set("fbstatusid",changeid);
			var fbid = $localstorage.get("fbstatusid");
			$scope.fav='1';
			$scope.lastplayed = [];

			$scope.loadTopics = function(){
				$ionicLoading.show();
				QuestionService.loadTopics().then(function (data) {
					console.log(data);
					if(data.result){
						$scope.lastplayed=data.data;
						$ionicLoading.hide();
					}else{
						$ionicLoading.hide();
						alert("Please Try Letter...");
					}
				});	
			}
			$scope.loadTopics();

			$scope.colorthems=[
				{
					"color":"color_green"
				},
				{
					"color":"color_red"
				}
			];
					
			$scope.toggleGroup = function(group) {
				if ($scope.isGroupShown(group)) {
				  $scope.shownGroup = null;
				} else {
				  $scope.shownGroup = group;
				}
			};
			$scope.isGroupShown = function(group) {
				return $scope.shownGroup === group;
			};
			//color_green
			$scope.colorthem=function(index){
				if(index%2==0){
					return "color_green";
				}else{
					return "color_red";
				}
				
			}
			
			$scope.isfav = function(value) {
				return $scope.fav === value;
			};
			
			$scope.gotogame=function(index){
				if(index==0){
					$state.go('singleprereadyans');
				}else if(index==1){
					$state.go('playinput');
				}else if(index==2){
					$state.go('pokerplayer');
				}else if(index==3){
					$state.go('pokerquestion');
				}else if(index==4){
					$state.go('pokerquestioninput');
				}else if(index==5){
					$state.go('singleprereadyans');
				}else{
					$state.go('prereadyans');
				}
				
			}
		}catch(err){
			console.log(err);
		}
	});
});
