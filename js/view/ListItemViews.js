define([
	"marionette",
	"view/ListItemView",
],function(marionette,ListItemView){
	var ListItemViews = Backbone.Marionette.CollectionView.extend({
	  tagName : 'ul',
	  className: 'list-group',
	  childView: ListItemView,
	  
	  initialize: function(options){
		  this.collection = options.collection;
	  }
	});
	
	return ListItemViews;
});