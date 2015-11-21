define([
		'marionette',
		"view/login",
		"view/AssessmentView",
		"view/ChangePasswordView",
		"view/ConfigView",
		"view/ReportView",
		"app/ApplicationRouter"
	], function (marionette, LoginView,AssessmentView,ChangePasswordView,ConfigView,ReportView,ApplicationRouter) {
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
	App.user = undefined;
	App.panel = {
		showAssessmentView: function(){
			var assessmentView = new AssessmentView();
			App.mainRegion.show(assessmentView);
		},
		showChangePasswordView: function(){
			var changePasswordView = new ChangePasswordView({model : App.user});
			App.mainRegion.show(changePasswordView);
		},
		showConfigView: function(){
			var configView= new ConfigView({model : App.user});
			App.mainRegion.show(configView);
		},
		showLoginView: function(){
			var loginView = new LoginView();
			App.mainRegion.show(loginView);
		},
		showReportView : function(response){
			var reportView = new ReportView({data : response});
			App.mainRegion.show(reportView);
		}
		
	}
	
	
	
	$(document).ready(function () {
		new ApplicationRouter();
		App.start();		
	});
});