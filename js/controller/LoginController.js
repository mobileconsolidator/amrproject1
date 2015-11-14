define([
	"app/controller/PostManager"
],function(PostManager){

	var LoginController ={
		
		isLogin : function(email,password){
			var invoke = $.Deferred();
			
			invoke.resolve(true);
			
			return invoke;
		}
	}
	return LoginController;
});