define([
'marionette',
"view/login",
'view/AssessmentView',
"view/ConfigView"
],function(marionette,LoginView,AssessmentView,ConfigView){
	App = new Backbone.Marionette.Application();
	window.App = App;
	App.isLogin = false;
	App.addRegions({
	  mainRegion: "content"
	});
	
	App.addInitializer(function(options){
	  
	  
	});
	
	
	App.setContentView = function(panel){
		this.mainRegion.reset();
		this.mainRegion.show(panel);
	}
	
	App.showMain = function(){
		var assessmentView = new AssessmentView();
      this.mainRegion.show(assessmentView);
	}
	
	
	$(document).ready(function(){
	   App.start();
	  
	   ConfigController.hasQuestions().done(function(response){
		   console.log(response);
		   if(response){
			   App.showMain();
		   }else{
			   var configView = new ConfigView();
			   App.setContentView(configView);
		   }
	   });
	});
});