define([
	"app/controller/PostManager",
	"app/controller/DatabaseManager"
],function(PostManager,DatabaseManager){

	var LoginController ={
		
		isLogin : function(email,password){
			var invoke = $.Deferred();
			
			this.isLoginDatabase(email,password).done(function(response){
				invoke.resolve(response);
			});
			
			
			return invoke;
		},
		isLoginDatabase: function(email,password){
			var invoke = $.Deferred();
			DatabaseManager.query('SELECT * FROM user WHERE email="' + email+'" AND password="' + password + '"').done(function(response){
				if(response.status){
					console.log(response.data.length);
					if(response.data.length > 0){
						invoke.resolve(true);
					}else{
						invoke.resolve(false);
					}
				}else{
					invoke.resolve(false);
				}
			});
			return invoke;
		}
		
	}
	return LoginController;
});