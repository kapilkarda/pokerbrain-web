angular.module('nav.controllers', [])

.controller('NavigationController', function($rootScope, $scope, $ionicPlatform, $localstorage, $ionicPopup, $cordovaCamera, $localstorage, UserService, $ionicLoading, API, $cordovaFileTransfer) {
	$ionicPlatform.ready(function(){
		try{
			$scope.userName = $localstorage.get("FullName");
			$scope.userId = $localstorage.get("UserId");

			var myPopup = "";
			$scope.ProfilePic =  $localstorage.get("avator"); //"img/profilepic.jpg";
			if($scope.ProfilePic==undefined || $scope.ProfilePic=="undefined" || $scope.ProfilePic=="null" ||$scope.ProfilePic==null || $scope.ProfilePic==""){
				$scope.ProfilePic =  "img/profilepic.jpg";
			}

			$scope.changePicture = function(){
				myPopup = $ionicPopup.show({
				    template: '<button ng-click="galleryOpen()" class="button button-block button-positive">Gallery</button><button ng-click="cameraOpen()" class="button button-block button-positive">Camera</button>',
				    title: 'Change Profile Picture',
				    subTitle: 'Please choose one option',
				    scope: $scope,
				    buttons: [
				      { text: 'Cancel' }
				    ]
				});
			}
			
			$scope.cameraOpen = function(){
	            try{
	                myPopup.close();
	                var options = {
	                    quality : 100,
	                    destinationType : Camera.DestinationType.DATA_URL,
	                    sourceType : Camera.PictureSourceType.CAMERA,
	                    allowEdit : true,
	                    encodingType: Camera.EncodingType.JPEG,
	                    targetWidth: 277,
	                    targetHeight: 250,
	                    popoverOptions: CameraPopoverOptions,
	                    saveToPhotoAlbum: false,
	                    correctOrientation: true
	                };

	                $cordovaCamera.getPicture(options).then(function(imageData) {
	                    var newImage = "data:image/jpeg;base64," +imageData;// Success! Image data is here
	                    $scope.ProfilePic = newImage;
	                    $scope.uploadImage();
	                }, function(err) {
	                    console.log(err.message);
	                });
	            }
	            catch(err){
	                console.log(err.message);
	            }
	        };
	        
	        $scope.galleryOpen = function(){
	            try{
	                myPopup.close();
	                var options = {
	                    quality : 100,
	                    destinationType : Camera.DestinationType.FILE_URI,
	                    sourceType : Camera.PictureSourceType.PHOTOLIBRARY ,
	                    allowEdit : true,
	                    targetWidth: 277,
	                    targetHeight: 250,
	                    encodingType: Camera.EncodingType.JPEG,
	                    popoverOptions: CameraPopoverOptions,
	                    correctOrientation: true
	                };
	                $cordovaCamera.getPicture(options).then(function(imageData) {
	                    function convertImgToBase64(url, callback, outputFormat){
	                        var canvas = document.createElement('CANVAS'),
	                            ctx = canvas.getContext('2d'),
	                            img = new Image;
	                        img.crossOrigin = 'Anonymous';
	                        img.onload = function(){
	                            var dataURL;
	                            canvas.height = img.height;
	                            canvas.width = img.width;
	                            ctx.drawImage(img, 0, 0);
	                            dataURL = canvas.toDataURL(outputFormat);
	                            callback.call(this, dataURL);
	                            canvas = null; 
	                        };
	                        img.src = url;
	                    }

	                    convertImgToBase64(imageData, function(base64Img){
	                        $scope.ProfilePic = base64Img;
	                        $scope.uploadImage();
	                    });
	                }, function(err) {
	                    console.log(err.message);
	                });
	            }
	            catch(err){
	                console.log(err.message);
	            }
	        };


	        $scope.uploadImage = function(){
	        	try{

	        		$ionicLoading.show();
                    var filePath = $scope.ProfilePic;
                    var server = API.postUpdateImage($scope.userId);
                    var imageURI = filePath;
                    var options = new FileUploadOptions();
                    options.fileKey = "file";
                    options.fileName = "test.jpg";//imageURI.substr(filePath.lastIndexOf('/') + 1);
                    options.mimeType = "image/jpg";
                    var params = new Object();
                    options.params = params;
                    options.chunkedMode = false;

                    $cordovaFileTransfer.upload(server, filePath, options)
                        .then(function(result) {
                            try{
                                $ionicLoading.hide();
                                var data = JSON.parse(result.response);
                                $localstorage.set("avator", data.imagepath);
                            }catch(err){
                                alert("Error");
                                alert(err.message);
                            }
                        }, function(err) {
                            $ionicLoading.hide();
                            alert(JSON.stringify(err));
                        }, function (progress) {
                            $ionicLoading.hide();
                        });
	        	}catch(err){
	        		alert(err.message);
	        	}
	        }

		}catch(err){
			alert(err.message);
		}
	});		  
});