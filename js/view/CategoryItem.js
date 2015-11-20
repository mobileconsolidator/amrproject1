define([
	"marionette",
	"view/ListItemViews",
	"text!templates/categoryList.html",
	"view/component/SingleView"
],function(marionette,ListItemViews,tmpl,SingleView){
	var CategoryItem = Backbone.Marionette.ItemView.extend({
	  template:tmpl,
	  tagName : 'div',
	  className: 'list-group',
	  
	  onRender:function(){
		  var template = _.template(this.template);
		  if(this.model != undefined){
		  this.$el.html(template(this.model.attributes));
		  var list = new ListItemViews({collection : new Backbone.Collection(this.model.get('items'))});
		  var _this = this;
		  this.listenTo(list,ListItemViews.STAR_CLICK,function(response){
			  _this.trigger(CategoryItem.STAR_CLICK,response);
		  });
		  list.render();
		  this.$el.find(".list-questions").empty().append(list.el);
		  }
		  return this;
	  }
	});
	CategoryItem.STAR_CLICK = "star:click";
	return CategoryItem;
});