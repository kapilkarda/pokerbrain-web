angular.module('result.controllers', [])

.controller('ResultCtrl', function($scope, $ionicPlatform, $localstorage) {
	$ionicPlatform.ready(function(){
		try{

			var FullName = $localstorage.get("FullName");
			var avator = $localstorage.get("avator");
			var UserId = $localstorage.get("UserId");

			$scope.playerdetails={
				"id":UserId,
				"pic":avator,
				"name":FullName,
			};

			console.log($scope.playerdetails.pic);


			
			$scope.resCount=0;
			$scope.resultdata=[];
			var results= $localstorage.get("results");
			$scope.resultdata=JSON.parse(results);
			$scope.totaleQuestion=$scope.resultdata.length;
			for(var i=0;i<$scope.resultdata.length;i++){
				if($scope.resultdata[i].result=='1'){
					$scope.resCount=$scope.resCount+1;
				}
			}
			
			$scope.setcolor=function(value){
				if(value=='1'){
					return "text_green";
				}else{
					return "text_red";
				}
			};
		}catch(err){
			console.log(err.message);
		}
	});
});
