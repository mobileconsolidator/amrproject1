define([
	"app/controller/ReportController",
	"marionette"
],function(ReportController){
	var ApplicationRouter = Backbone.Router.extend({
		routes :{
			"" : "login",
			"assessment" : "assessment",
			"config" : "config",
			"changepassword" : "changePassword",
			"report" : "report"
		},
		login : function(){
			App.panel.showLoginView();
		},
		assessment : function(){
			App.panel.showAssessmentView();
		},
		config : function(){
			App.panel.showConfigView();
		},
		changePassword : function(){
			App.panel.showChangePasswordView();
		},
		report: function(){
			ReportController.getAllResult().done(function(response){
				App.panel.showReportView(response);
			});
			
		}
		
	});
	return ApplicationRouter;
});