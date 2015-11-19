define([
	"text!templates/login.html",
	"app/util/util",
	"app/controller/LoginController",
  	'view/ChangePasswordView',
  	"view/ConfigView",
  	"view/AssessmentView",
	"marionette"
],function(tmpl,Utilities,LoginController,ChangePasswordView,ConfigView,AssessmentView){
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
			alert(response.status); 
            if(response.status){
              alert(response.data.length);
               if(response.data.length > 0){
               		var model = response.data[0];
                 alert(model.isChangePassword);
                 if(model.isChangePassword){
                   var changePasswordView =new ChangePasswordView({model : model});
                   console.log(changePasswordView);
                   App.setContentView(changePasswordView);
                 }else{
                   if(model.isFirstLogin){
                   		var configView =new ConfigView();
                     App.setContentView(configView);
                     
                   }else{
                   	var assessmentView = new AssessmentView();
                     App.setContentView(assessmentView);
                   }
                 }
               }
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