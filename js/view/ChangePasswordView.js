define([
		'text!templates/changePasswordView.html',
		"app/util/util",
		"app/controller/LoginController",
		"view/component/Dialog",
		'marionette'
	], function (tmpl,Utilities,LoginController,Dialog) {

	var changePasswordView = Backbone.Marionette.ItemView.extend({
			template : tmpl,
			className : 'panel panel-default',
			events : {
				'click #btnChangePassword' : 'changePassword'
			},
			initialize : function (options) {
				this.model = options.model;
				this.dialog = new Dialog();
			},
			onRender : function () {
				var template = _.template(this.template);
				this.$el.html(template());
			},
			changePassword : function () {
				console.log('change password');
				var oldPassword = $('#txtOldPassword').val();
				var newPassword = $('#txtNewPassword').val();
				var confirmPassword = $('#txtConfirmPassword').val();
				console.log(oldPassword);
				if (Utilities.isEmpty(oldPassword)) {
					return Utilities.displayMessage('#error-div', 'Please enter old Password');
				} else if (Utilities.isEmpty(newPassword)) {
					return Utilities.displayMessage('#error-div', 'Please enter new Password');
				} else if (Utilities.isEmpty(confirmPassword)) {
					return Utilities.displayMessage('#error-div', 'Please enter confirm Password');
				} else if (!Utilities.isMatch(oldPassword, this.model.get('password'))) {
					return Utilities.displayMessage('#error-div', 'Old Password does not match');
				} else if (Utilities.isMatch(newPassword, oldPassword)) {
					return Utilities.displayMessage('#error-div', 'New and Old Password match');
				}else if (!Utilities.isMatch(newPassword, confirmPassword)) {
					return Utilities.displayMessage('#error-div', 'New and Confirm Password does not match');
				}
				var _this = this;
				LoginController.changePassword(this.model.get('userId'), newPassword).done(function (response) {
					console.log(response);
					if(response.status){
						_this.dialog.showMessage('Password Changed', 'Changed Successful').done(function () {
							App.panel.showLoginView();
						});
					}else{
						Utilities.displayMessage('#error-div', 'Changed Password encounter error');
					}
					
				});
			}
		});

	return changePasswordView;

});
