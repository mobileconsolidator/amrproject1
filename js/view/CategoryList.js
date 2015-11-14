define([
	"marionette",
	"view/CategoryItem",
], function(marionette,CategoryItem){
	var CategoryLists = Backbone.Marionette.CollectionView.extend({
	  template:'',
	  tagName : 'div',
	  childView: CategoryItem,
	  initialize: function(options){
		  this.collection = options.collection;
	  }
	});
	
	return CategoryLists;
});