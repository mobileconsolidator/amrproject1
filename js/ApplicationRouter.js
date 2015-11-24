define([
	"app/controller/ReportController",
	"marionette"
],function(ReportController){
	var ApplicationRouter = Backbone.Router.extend({
		routes :{
			"" : "login",
			"logout" : 'logout',
			"assessment" : "assessment",
			"config" : "config",
			"changepassword" : "changePassword",
			"report" : "report",
			"summaryreport" : "summaryreport"
		},
		login : function(){
			App.panel.showLoginView();
		},
		logout : function(){
			App.user = undefined;
			Backbone.history.navigate("#", {trigger : true});
		},
		assessment : function(){
			App.panel.showAssessmentView();
		},
		config : function(){
			App.panel.showConfigView({model : App.user});
		},
		changePassword : function(){
			
			App.panel.showChangePasswordView({model : App.user});
		},
		report: function(){
			ReportController.getAllResult().done(function(response){
				App.panel.showReportView(response);
			});
			
		},
		summaryreport : function(){
			ReportController.getAllSummaryReport().done(function(response){
				App.panel.showSummaryReportView(response);
			});
		}
		
	});
	return ApplicationRouter;
});