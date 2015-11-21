define([
	"marionette",
	"view/CategoryItem",
], function(marionette,CategoryItem){
	var CategoryLists = Backbone.Marionette.CollectionView.extend({
	  template:'',
	  tagName : 'div',
	  childView: CategoryItem,

	  childEvents: {
		"star:click" : 'onStarClick'  
	  },
	  onStarClick: function(child,response){
		  this.trigger(CategoryLists.STAR_CLICK,response);
	  },
	  setCollection: function(collection){
		  this.collection  = collection
		  		  var model = this.collection.at(0);
		  if(model != undefined){
			model.set('first',true);
		  }
	  }
	});
	CategoryLists.STAR_CLICK = "star:click";
	return CategoryLists;
});