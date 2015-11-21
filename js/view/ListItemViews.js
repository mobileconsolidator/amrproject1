define([
	'app/util/util',
	"marionette",
	"view/ListItemView",
],function(Utilities,marionette,ListItemView){
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
		  var x = 0;
		  this.collection.each(function(model){
			model.set('caption',Utilities.toLetterNum(x)+". "+ model.get('caption'));
			x++;
		  });
	  }
	});
	ListItemViews.STAR_CLICK = "star:click";
	return ListItemViews;
});