define([
	"marionette",
	"view/CategoryItem",
], function(marionette,CategoryItem){
	var CategoryLists = Backbone.Marionette.CollectionView.extend({
	  template:'',
	  tagName : 'div',
	  childView: CategoryItem,
	  setCollection: function(collection){
		  this.collection  = collection;
	  }
	});
	
	return CategoryLists;
});