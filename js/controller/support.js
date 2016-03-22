angular.module('support.controllers', [])

.controller('SupportCtrl', function($scope, $ionicPlatform, $localstorage, $ionicModal) {
	$ionicPlatform.ready(function(){
		try{
				$scope.faqs = [
					{'ques':"Game FAQ 1?", 'ans': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.'},
					{'ques':"Game FAQ 2?", 'ans': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.'},
					{'ques':"Game FAQ 3?", 'ans': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.'},
					{'ques':"Game FAQ 4?", 'ans': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.'},
					{'ques':"Game FAQ 5?", 'ans': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.'}
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
			
			
			 $ionicModal.fromTemplateUrl('templates/faq.html', {
				scope: $scope,
				animation: 'slide-in-up'
			  }).then(function(faq) {
				$scope.faq = faq;
			  });
			  $scope.openModalfaq = function() {
				$scope.faq.show();
			  };
			  $scope.closeModalfaq= function() {
				$scope.faq.hide();
			  };
			  
			 $ionicModal.fromTemplateUrl('templates/emailcontact.html', {
				scope: $scope,
				animation: 'slide-in-up'
			  }).then(function(emailcontact) {
				$scope.emailcontact = emailcontact;
			  });
			  $scope.openModalemailcontact = function() {
				$scope.emailcontact.show();
			  };
			  $scope.closeModalemailcontact = function() {
				$scope.emailcontact.hide();
			  };
		}catch(err){
			console.log(err.message);
		}
	});
});
