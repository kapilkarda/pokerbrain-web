angular.module('login.controller', ['ionic'])
.controller('LoginPageController', function($scope, $state, $ionicPlatform, $localstorage, $ionicLoading, $ionicPopup, $ionicHistory, $cordovaFacebook, $http, $cordovaOauth, LoginService, SignupService, API, UserService) {
	$ionicPlatform.ready(function(){
		try{
			
			var userId = $localstorage.get("UserId");
			if(userId!=undefined && userId!=null && userId!="undefined" && userId!="null" && userId!="0" && userId!=""){
				$state.go('nav.home');
			}
				
			$localstorage.set("isFBlogin", 0);

			var facebookLoginPopup = "";

			// Fb Login
			// $scope.facebookLogin = function(id){
			// 	try{ 
			// 		$localstorage.set("fbstatusid",id);
			// 		$ionicLoading.show();
			// 		$cordovaOauth.facebook("146771425675194", ["email","public_profile", "user_friends"]).then(function(result) {
						
			// 					}
			// 			}, function(error) {
			// 				$ionicLoading.hide();
			// 				alert("There was a problem getting your profile. Check the logs for details.");
			// 				console.log(error);
			// 			});
			// 		}, function(error) {
			// 			$ionicLoading.hide();
			// 			alert(JSON.stringify(error));
			// 		});
			// 	}catch(err){
			// 		$ionicLoading.hide();
			// 		alert(err.message);
			// 	}
			// };
			 
			window.fbAsyncInit = function() {
				FB.init({
						appId      : '146771425675194',
				      	xfbml      : true,
				      	version    : 'v2.5'
				});
			};
			 
			(function(d, s, id){
			     var js, fjs = d.getElementsByTagName(s)[0];
			     if (d.getElementById(id)) {return;}
			     js = d.createElement(s); js.id = id;
			     js.src = "//connect.facebook.net/en_US/sdk.js";
			     fjs.parentNode.insertBefore(js, fjs);
		   	}(document, 'script', 'facebook-jssdk'));
			
			$scope.facebookLogin = function(){
				$ionicLoading.show();
				FB.login(function(response) {
					$scope.getSocialDataAndSet(response.authResponse);
				}, {scope: 'email,public_profile,user_friends', return_scopes: true});
			}
			
			$scope.facebookLoginClose = function(nick){
				$localstorage.set("Fullname", nick);
				facebookLoginPopup.close();
				$state.go('nav.home');
			};

			$scope.getSocialDataAndSet = function(result){
				$ionicLoading.show();
				$http.get("https://graph.facebook.com/me", { params: { access_token: result.accessToken, fields: "id, name, email, gender, picture", format: "json" }}).then(function(result1) {
					var id = result1.data.id;
					var name = result1.data.name;
					var gender = result1.data.gender;
					var picture = "1";
					var accessToken = result.accessToken;
					var email = "";
					if(result1.data.email==undefined){
						var email = "";
						$ionicLoading.hide();
						alert("Your privacy settings are prohibiting the retrieval of your Facebook email.");
					}else{
						email = result1.data.email;
						var password="123NewFBLOGIN";
						SignupService.Signup(email,password,gender,name,id,'IN','0',picture).then(function (data) {
							console.log(data);
							if(data.result){
								try{
									$scope.data = {};
									$ionicLoading.hide();
									$localstorage.set("isFBlogin", "1");
									$localstorage.set("UserId", data.data[0]._id);
									$localstorage.set("FBId", data.data[0].fb_id);
									$localstorage.set("FullName", data.data[0].fullname);
									$localstorage.set("Email", data.data[0].email);
									$localstorage.set("avator", "https://graph.facebook.com/"+id+"/picture");
									$scope.data.nickname = data.data[0].username;
									$ionicPopup.show({
										template: '<input type="text" ng-model="data.nickname" placeholder=" Enter Your NickName">',
										title: 'Enter Nickname',
								     	subTitle: '',
								    	scope: $scope,
								    	buttons: [
									      	{
										        text: 'Save',
										        type: 'button-positive',
										        onTap: function(e) {
										          	if (!$scope.data.nickname) {
										            	e.preventDefault();
										          	} else {
										          		try{
															$ionicLoading.show();
											          		$localstorage.set("FullName", $scope.data.nickname);

															var user_id = $localstorage.get("UserId");
															var user_name = $scope.data.nickname;

															UserService.updateUserName(user_id,user_name).then(function (data) {
																$ionicLoading.hide();
																if(data.result==true){
																	$state.go('nav.home');
																}
															});
														}catch(err){
															alert(JSON.stringify(err));
														}
										          	}
										        }
									      	}
									    ]
									});	
								}catch(err){
									alert(err.message);
								}
							}else{
								alert(data.msg);
							}
						});
					}
				});
			}

			//Get Login
			$scope.loginform={
				"email":"",
				"password":""
			};
			$scope.DoLogin = function(){
					
				if($scope.loginform.email==""){
					alert("Email is required.");
					return false;
				}else{
					var email=$scope.loginform.email;
					var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
					if (!filter.test(email))
					{	
						alert("Please enter Valid email");
						return false;
					}
				}
				if($scope.loginform.password==""){
					alert("password is required.");
					return false;
				}

				$ionicLoading.show();
				LoginService.Login($scope.loginform.email,$scope.loginform.password).then(function (data) {
					if(data.result){
						$scope.loginform={
							"email":"",
							"password":""
						};
						console.log(data);
						$localstorage.set("UserId", data.data[0]._id);
						$localstorage.set("FBId", data.data[0].fb_id);
						$localstorage.set("FullName", data.data[0].fullname);
						$localstorage.set("Email", data.data[0].email);
						$localstorage.set("avator", data.data[0].avator);
						$state.go('nav.home');
						$ionicLoading.hide();
					}else{
						$ionicLoading.hide();
						alert("Invalid Candidate");
					}
				});
				//$state.go('nav.home');
			};
				
		}catch(err){
			console.log(err.message);
		}
	});
		   
});