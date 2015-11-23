define([
		'marionette',
		"view/login",
		"view/AssessmentView",
		"view/ChangePasswordView",
		"view/ConfigView",
		"view/ReportView",
		"view/SummaryReportView",
		"app/ApplicationRouter",
		"view/HeaderView",
		"app/controller/ConfigController"
	], function (marionette, LoginView,AssessmentView,ChangePasswordView,ConfigView,ReportView,SummaryReportView,ApplicationRouter,HeaderView,ConfigController) {
	App = new Backbone.Marionette.Application();
	window.App = App;
	App.isLogin = false;
	App.addRegions({
		headerRegion : "header",
		mainRegion : "content"
	});

	App.addInitializer(function (options) {
		
	});

	App.setContentView = function (panel) {
		console.log(App.user)
		if(App.user == undefined){

			$("header").empty();
		}else{
			App.showHeaderView();
		}
		this.mainRegion.reset();
		this.mainRegion.show(panel);
	}
	App.showHeaderView = function(){
		var _this = this;
		ConfigController.getCompany().done(function(response){
			var headerView = new HeaderView({model : new Backbone.Model(response[0])});
			_this.headerRegion.show(headerView);
		});
	}
	App.user = undefined;
	App.panel = {
		init: function(){
			App.showHeaderView();
		},
		showAssessmentView: function(){
			var assessmentView = new AssessmentView();
			App.setContentView(assessmentView);
		},
		showChangePasswordView: function(){
			var changePasswordView = new ChangePasswordView({model : App.user});
			App.setContentView(changePasswordView);
		},
		showConfigView: function(){
			var configView= new ConfigView({model : App.user});
			App.setContentView(configView);
		},
		showLoginView: function(){
			
			if(App.user != undefined){
				Backbone.history.navigate("#assessment", {trigger : true});
				return;
			}
			var loginView = new LoginView();
			App.setContentView(loginView);
		},
		showReportView : function(response){
			var reportView = new ReportView({data : response});
			App.setContentView(reportView);
		},
		showSummaryReportView : function(response){
			var summaryReportView = new SummaryReportView({data : response});
			App.setContentView(summaryReportView);
		}
		
	}
	
	
	
	$(document).ready(function () {
		new ApplicationRouter();
		App.start();		
	});
});