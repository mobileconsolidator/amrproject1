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
		  console.log(this.model);
		  var template = _.template(this.template);
		  if(this.model != undefined){
		  this.$el.html(template(this.model.attributes));
		  var list = new ListItemViews({collection : new Backbone.Collection(this.model.get('items'))});
		  list.render();
		  this.$el.find(".list-questions").empty().append(list.el);
		  }
        
        for(var x=1;x<=4;x++){
          var ob = {
            label : this.model.get('field' + x+'_caption'),
            value : ''
          }
          var singleView = new SingleView({model : new Backbone.Model(ob)});
          singleView.render();
          this.$el.find('.fields').append(singleView.el);
        }
		  return this;
	  }
	});
	
	return CategoryItem;
});