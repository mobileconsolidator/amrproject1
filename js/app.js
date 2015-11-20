define([
		'marionette',
		"view/login",
		"view/AssessmentView",
		"view/ChangePasswordView",
		"view/ConfigView",
		"view/ExportView"
	], function (marionette, LoginView,AssessmentView,ChangePasswordView,ConfigView,ExportView) {
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
	App.panel = {
		showAssessmentView: function(){
			var assessmentView = new AssessmentView();
			App.mainRegion.show(assessmentView);
		},
		showChangePasswordView: function(model){
			var changePasswordView = new ChangePasswordView({model : model});
			App.mainRegion.show(changePasswordView);
		},
		showConfigView: function(model){
			var configView= new ConfigView({model : model});
			App.mainRegion.show(configView);
		},
		showLoginView: function(){
			var loginView = new LoginView();
			App.mainRegion.show(loginView);
		},
		showExportView : function(){
			var exportView = new ExportView();
			App.mainRegion.show(exportView);
		}
		
	}
	$(document).ready(function () {
		App.start();
		//App.panel.showLoginView();
		App.panel.showAssessmentView();
	});
});