define([
'text!templates/changePasswordView.html',
  'marionette'
],function(tmpl){

  var changePasswordView = Backbone.Marionette.ItemView.extend({
    template: tmpl,
    events:{
      'click #btnChangePassword' : 'changePassword'
    },
    initialize: function(options){
    	this.model = options.model;
    },
    onRender: function(){
      	alert('render');
    	var template = _.template(this.template);
      	this.$el.html(template());
    },
    changePassword: function(){
    	var oldPassword = $('#txtOldPassword').val();
      	var newPassword=$('#txtNewPassword').val();
      	var confirmPassword=$('#txtConfirmPassword').val();
      
      if(Utilities.isEmpty(oldPassword)){
      	return Utilities.displayMessage('#txtMessage','Please enter old Password');
      }else if(Utilities.isEmpty(newPassword)){
      	return Utilities.displayMessage('#txtMessage','Please enter new Password');
      }else if(Utilities.isEmpty(confirmPassword)){
      	return Utilities.displayMessage('#txtMessage','Please enter confirm Password');
      }else if(!Utilities.isMatch(oldPassword,this.model.password)){
      	return Utilities.displayMessage('#txtMessage','Old Password does not match');
      }else if(Utilities.isMatch(newPassword,confirmPassword)){
      	return Utilities.displayMessage('#txtMessage','New and Confirm Password does not match');
      }
      
      LoginController.changePassword(this.model.userId,password).done(function(){
        Dialog.showMessage('Password Changed','Changed Successful').done(function(){
        	App.showLogin();
        });
      });
    }
  });
  
  return changePasswordView;

});