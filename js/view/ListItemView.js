define([
	"text!templates/itemView.html",
	"marionette",
	'raty/jquery.raty'
],function(tmpl){
	ListItemView = Backbone.Marionette.ItemView.extend({
	  template: tmpl,
	  tagName: 'li',
	  className: 'list-group-item',
	  
	  onRender: function(){
		  var template = _.template(this.template);
		  this.$el.html(template(this.model.attributes));
		  setTimeout(function(){
			  $(".star-rating").raty();
		  },6);
		  
		  return this;
	  }
	});
	
	return ListItemView;
});