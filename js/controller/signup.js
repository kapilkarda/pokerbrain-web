angular.module('signup.controller', ['ionic'])
.controller('SignupPageController', function(SignupService,$scope, $state, $ionicPlatform, $localstorage, $ionicLoading, $ionicHistory, $cordovaFacebook, $http,$ionicModal, $ionicPopup, API) {
	$ionicPlatform.ready(function(){
		try{
			$scope.Signform={
				"username":"",
				"email":"",
				"password":"",
				"Cpassword":"",
				"gender":"",
				"nationality":"Select Nationality"
			};

			var facebookLoginPopup = "";

			$scope.counrty_list=[];
			$scope.Signform.gender='male';
			$scope.changeGender=function(gender){
				if(gender=='male'){
					$scope.Signform.gender='female';
				}else{
					$scope.Signform.gender='male';
				}
			};	
				
			$scope.errorMessage = "";

		    $ionicModal.fromTemplateUrl('templates/nation.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(nation) {
				$scope.nation = nation;
			});
			$scope.openModalselectnation = function() {
				$scope.nation.show();
			};
			$scope.closeModalselectnation = function(country) {
				$scope.Signform.nationality = country;
				$scope.nation.hide();
			};

			//Get SignUp
			$scope.DoSignUp = function(){
				if($scope.Signform.username==""){
					$ionicLoading.hide();
					alert("FullName is required.");
					return false;
				}
				if($scope.Signform.email==""){
					$ionicLoading.hide();
					alert("Email is required.");
					return false;
				}else{
					var email=$scope.Signform.email;
					var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
					if (!filter.test(email))
					{	
						$ionicLoading.hide();
						alert("Please enter Valid email");
						return false;
					}
				}
				if($scope.Signform.password==""){
					$ionicLoading.hide();
					alert("password is required.");
					return false;
				}
				if($scope.Signform.Cpassword==""){
					$ionicLoading.hide();
					alert("password is required.");
					return false;
				}
				if($scope.Signform.gender==""){
					$ionicLoading.hide();
					alert("password is required.");
					return false;
				}
				if($scope.Signform.dob==""){
					$ionicLoading.hide();
					alert("DOB is required.");
					return false;
				}if($scope.Signform.nationality==""){
					$ionicLoading.hide();
					alert("Country is required.");
					return false;
				}
				if($scope.Signform.password==$scope.Signform.Cpassword){
					var FB_Id="0";
					var avator = "0"; //uploadimage/default_user.jpg";
					$ionicLoading.show();
					SignupService.Signup($scope.Signform.email,$scope.Signform.password,$scope.Signform.gender,$scope.Signform.username,FB_Id,$scope.Signform.nationality,$scope.Signform.dob, avator).then(function (data) {
						$ionicLoading.hide();
						if(data.result){
							$scope.Signform={
								"username":"",
								"email":"",
								"password":"",
								"Cpassword":"",
								"gender":""
							};
							$scope.Signform.gender='male';
							$localstorage.set("UserId", data.data._id);
							$localstorage.set("FBId", data.data.fb_id);
							$localstorage.set("FullName", data.data.fullname);
							$localstorage.set("Email", data.data.email);
							$localstorage.set("avator", data.data.avator);
							$state.go('nav.home');
							$ionicLoading.hide();
						}else{
							alert(data.msg);
						}
						$ionicLoading.hide();
					});	

				}else{

					alert("Password not match");
					return false;
				}
				
			};
			
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

			$scope.getJsonData = function(){
				$http.get("js/controller/country.json")
	              	.success(function (response){
	              		$scope.counrty_list = response;
	              		//console.log($scope.counrty_list);
	              	})
	             	.error(function(data) {
	             		console.log(data);
	                	alert("ERROR");
	              	});
	            
			}
			$scope.getJsonData();

		}catch(err){
			console.log(err.message);
		}
	});
		   
});