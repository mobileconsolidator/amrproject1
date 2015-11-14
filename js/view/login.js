define([
	"text!templates/login.html",
	"app/util/util",
	"app/controller/LoginController",
	"marionette"
],function(tmpl,Utilities,LoginController){
	LoginView = Backbone.Marionette.ItemView.extend({
	  template: tmpl,
	  tagName: 'div',
	  className: 'panel panel-default',
	  events:{
		  "click #btnSubmit" : "login"
	  },
	  login: function(){
		  
		  var password = $("#txtPassword").val();
		  
		  var email = $("#txtEmail").val();
		  if(Utilities.isEmpty(email)){
			  Utilities.displayMessage("#error-div","Please enter your email");
			  return;
		  }
		  if(Utilities.isEmpty(password)){
			  Utilities.displayMessage("#error-div","Please enter your password");
			  return;
		  }
		  
		  LoginController.isLogin(email,password).done(function(response){
			 if(response){
				 App.isLogin = true;
				 App.showMain();
			 }else{
				 Utilities.displayMessage("#error-div","Login Failed,Email or Password is incorrect");
			 } 
		  });
	  },
	  onRender:function(){
		  var template = _.template(this.template);
		  this.$el.html(template());
		  return this;
	  }
	  
	});
	
	return LoginView;
});