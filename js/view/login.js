define([
		"text!templates/login.html",
		"app/util/util",
		"app/controller/LoginController",
		"marionette"
	], function (tmpl, Utilities, LoginController) {
	LoginView = Backbone.Marionette.ItemView.extend({
			template : tmpl,
			tagName : 'div',
			className : 'panel panel-default',
			events : {
				"click #btnSubmit" : "login",
				"keypress #txtEmail" : "focusPassword",
				"keypress #txtPassword" : "doLogin"
			},
			focusPassword : function(e){
				if(e.keyCode == 13){
					$('#txtPassword').focus();
				}
			},
			doLogin : function(e){
				if(e.keyCode == 13){
					this.login();
				}
			}
			,
			login : function () {

				var password = $("#txtPassword").val();

				var email = $("#txtEmail").val();
				if (Utilities.isEmpty(email)) {
					Utilities.displayMessage("#error-div", "Please enter your email");
					return;
				}
				if (Utilities.isEmpty(password)) {
					Utilities.displayMessage("#error-div", "Please enter your password");
					return;
				}

				LoginController.isLogin(email, password).done(function (response) {
					if (response.status) {
						if (response.data.length > 0) {
							var model = response.data[0];
							var bmodel = new Backbone.Model(model);
							App.user = bmodel;
							if (model.isChangePassword) {
								Backbone.history.navigate("changepassword",{trigger : true});
							} else {
								if (model.isFirstLogin) {
									Backbone.history.navigate("config",{trigger : true});
								} else {
									Backbone.history.navigate("assessment",{trigger : true});
								}
							}
						} else {
							Utilities.displayMessage("#error-div", "Login Failed,Email or Password is incorrect");
						}
					} else {
						Utilities.displayMessage("#error-div", "Login Failed,Email or Password is incorrect");
					}
				});
			},
			onRender : function () {
				var template = _.template(this.template);
				this.$el.html(template());
				return this;
			}

		});

	return LoginView;
});
