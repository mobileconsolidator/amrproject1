define([
'marionette',
'view/CategoryList',
'app/data',
"view/login",
"app/controller/configController",
"view/ConfigView"
],function(marionette,CategoryList,data,LoginView,ConfigController,ConfigView){
	App = new Backbone.Marionette.Application();
	window.App = App;
	App.isLogin = false;
	App.addRegions({
	  mainRegion: "content"
	});
	
	App.addInitializer(function(options){
	  var collection = new Backbone.Collection(data.getListOfQuestion());
	  this.categoryList = new CategoryList({
		collection: collection
	  });
	  
	});
	
	
	App.setContentView = function(panel){
		this.mainRegion.reset();
		this.mainRegion.show(panel);
	}
	
	App.showMain = function(){
		this.mainRegion.show(this.categoryList);
	}
	
	
	$(document).ready(function(){
	   App.start();
	  
	   ConfigController.hasQuestions().done(function(response){
		   if(response){
			   var configView = new ConfigView();
			   App.setContentView(configView);
		   }else{
			   App.showMain();
		   }
	   });
	});
});