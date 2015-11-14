define([
'marionette',
'view/CategoryList',
'app/data',
"view/login"
],function(marionette,CategoryList,data,LoginView){
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
	   if(App.isLogin){
		   App.showMain();
	   }else{
		   var loginView = new LoginView();
		   App.setContentView(loginView);
	   }
	});
});