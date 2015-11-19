define([
		'marionette',
		"view/login"
	], function (marionette, LoginView) {
	App = new Backbone.Marionette.Application();
	window.App = App;
	App.isLogin = false;
	App.addRegions({
		mainRegion : "content"
	});

	App.addInitializer(function (options) {});

	App.setContentView = function (panel) {
		this.mainRegion.reset();
		this.mainRegion.show(panel);
	}

	App.showMain = function () {
		var assessmentView = new AssessmentView();
		this.mainRegion.show(assessmentView);
	}
    
    App.showLogin = function(){
    	var loginView = new LoginView();
      this.mainRegion.show(loginView);
    }

	$(document).ready(function () {
		App.start();
		App.showLogin();
	});
});