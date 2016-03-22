angular.module('leaderboard.controllers', [])

.controller('LeaderboardCtrl', function($scope, $ionicPlatform, $ionicLoading, GetleaderboardService, $localstorage) {
	$ionicPlatform.ready(function(){
		try{
			/* $scope.onSlideMove = function(data){
				//alert("You have selected " + data.index + " tab");
			}; */

			$scope.Inviteshow = false;
			$scope.allshow = true;
			$scope.Passshow = true;

			$scope.gotoAll = function(){
				if($scope.allshow==true){
					$scope.allshow = false;
					$scope.Inviteshow = true;
					$scope.Passshow = true;
				}
			}

			$scope.gotoActive1=function(){
				if($scope.allshow == false){
					return 'activeclass';		
				}
			};

			$scope.gotoInvite = function(){
				if($scope.Inviteshow==true){
					$scope.allshow = true;
					$scope.Inviteshow = false;
					$scope.Passshow = true;
				}
			}

			$scope.gotoActive2=function(){
				if($scope.Inviteshow == false){
					return 'activeclass';		
				}
			};	

			$scope.gotoPass = function(){
				if($scope.Passshow==true){
					$scope.allshow = true;
					$scope.Inviteshow = true;
					$scope.Passshow = false;
				}
			}

			$scope.gotoActive3=function(){
				if($scope.Passshow == false){
					return 'activeclass';		
				}
			};	

			var avator = $localstorage.get("avator");

			$scope.mainUserId = $localstorage.get("UserId");

			$scope.leaderboards=[];
			$scope.Leaderboard=function(){
				$ionicLoading.show();
				GetleaderboardService.Getleaderscore().then(function (data) {
					if(data.data!=''){
						console.log(data);
						$scope.leaderboards=data.data;
						$ionicLoading.hide();
					}else{
						$ionicLoading.hide();
						alert("Please Try Later...");
					}
				});	
			};
			$scope.Leaderboard();

			/* Tabs js start*/
				
			/* Tabs js close*/


		}catch(err){
			alert(err.message);
		}
	});
});
