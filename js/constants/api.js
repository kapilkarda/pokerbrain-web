angular.module('BetterBrain').constant("API",{
	baseURL:"https://betterbrain.herokuapp.com/",

	getURL:function(){
		return this.baseURL;
	},
	getLogin:function(Email,Password){
		return this.baseURL+"userlogin/"+Email+"/"+Password;
	},
	getSignUp:function(Email,Password,Gender,FullName,FB_Id,country,dob,avator){
		return this.baseURL+"signup/"+FullName+"/"+Email+"/"+Password+"/"+Gender+"/"+FB_Id+"/0/1/"+country+"/"+dob+"/"+avator;
	},
	getQuestions:function(topicId){
		return this.baseURL+"getQuestions/"+topicId;
	},
	InsterScore:function(topicId, userId, questionId, answer, point, isTrue, isFalse){
		return this.baseURL+"insterScore/"+topicId+"/"+userId+"/"+questionId+"/"+answer+"/"+point+"/"+isTrue+"/"+isFalse;
	},
	getScores:function(userId){
		return this.baseURL+"getScores/"+userId;
	},
	getLeaderboard:function(){
		return this.baseURL+"leaderboard";
	},
	getTopics:function(){
		return this.baseURL+"topics";
	},
	postUpdateImage:function(userId){
		return this.baseURL+"uploadImagePath1/"+userId;
	},
	updateUserName:function(userId, username){
		return this.baseURL+"updateusername/"+userId+"/"+username;
	}
});