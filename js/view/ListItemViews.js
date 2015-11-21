define([
	"marionette",
	"view/ListItemView",
],function(marionette,ListItemView){
	var ListItemViews = Backbone.Marionette.CollectionView.extend({
	  tagName : 'ul',
	  className: 'list-group',
	  childView: ListItemView,
	  childEvents: {
		"star:click" : 'onStarClick'  
	  },
	  onStarClick: function(child,response){
		  this.trigger(ListItemViews.STAR_CLICK,response);
	  },
	  initialize: function(options){
		  this.collection = options.collection;
	  }
	});
	ListItemViews.STAR_CLICK = "star:click";
	return ListItemViews;
});