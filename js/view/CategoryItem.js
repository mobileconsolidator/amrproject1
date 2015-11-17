define([
	"marionette",
	"view/ListItemViews",
	"text!templates/categoryList.html",
	"app/data"
],function(marionette,ListItemViews,tmpl,data){
	var CategoryItem = Backbone.Marionette.ItemView.extend({
	  template:tmpl,
	  tagName : 'div',
	  className: 'list-group',
	  
	  onRender:function(){
		  console.log(this.model);
		  var template = _.template(this.template);
		  if(this.model != undefined){
		  this.$el.html(template(this.model.attributes));
		  var list = new ListItemViews({collection : new Backbone.Collection(this.model.get('items'))});
		  list.render();
		  this.$el.find(".panel-body").empty().append(list.el);
		  }
		  return this;
	  }
	});
	
	return CategoryItem;
});