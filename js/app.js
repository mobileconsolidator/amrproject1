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
	  
	  this.categoryList = new CategoryList();
	  
	});
	
	
	App.setContentView = function(panel){
		this.mainRegion.reset();
		this.mainRegion.show(panel);
	}
	
	App.showMain = function(){
		var _this = this;
		ConfigController.getQuestions().done(function(response){
			_this.categoryList.setCollection(new Backbone.Collection(response));
			_this.mainRegion.show(_this.categoryList);
		});
		
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