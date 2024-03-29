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
			DatabaseManager.query('SELECT rowid as userId, email as email, password as password, first_login as isFirstLogin, change_password as isChangePassword FROM users WHERE email="' + email+'" AND password="' + password + '"').done(function(response){
          
              invoke.resolve(response);
			});
			return invoke;
		},
		changePassword : function(userId,password){
			var invoke = $.Deferred();
			DatabaseManager.query('UPDATE users set password="'+password+'",change_password=0 WHERe rowid=' + userId).done(function(response){
				invoke.resolve(response);
			})
			return invoke;
		},
		updateFirstLogin: function(userId){
			var invoke = $.Deferred();
			DatabaseManager.query('UPDATE users set first_login=0 WHERe rowid=' + userId).done(function(response){
				invoke.resolve(response);
			})
			return invoke;
		},
      getAllUsers:function(){
      	var invoke = $.Deferred();
        DatabaseManager.query('SELECT * FROM users').done(function(response){
        	invoke.resolve(response);
        });
        return invoke;
      },
      getUserById:function(userId){
      
      	var invoke = $.Deferred();
        DatabaseManager.query('SELECT * FROM users WHERE rowid='+userId).done(function(response){
        	invoke.resolve(response);
        });
        return invoke;
      }
		
	}
	return LoginController;
});