angular.module('rightlist.controllers', [])

.controller('rightlistCtrl', function($scope, $state, $ionicLoading, $localstorage, $ionicPlatform) {
	$ionicPlatform.ready(function(){
		try{
			console.log("calling");
			$scope.sidelists = [
				{
					'id':0,
					'img':'img/ben.png',
					'name':'bem',
					'price':'500'
				},
				{
					'id':1,
					'img':'img/ben.png',
					'name':'Max',
					'price':'600'
				},
				{
					'id':2,
					'img':'img/ben.png',
					'name':'adam',
					'price':'500'
				},
				{
					'id':3,
					'img':'img/ben.png',
					'name':'anil',
					'price':'800'
				},
				{
					'id':4,
					'img':'img/ben.png',
					'name':'sid',
					'price':'1000'
				},
				{
					'id':5,
					'img':'img/ben.png',
					'name':'rahul',
					'price':'200'
				}
			];

		}catch(err){
			console.log(err);
		}
	});
});
