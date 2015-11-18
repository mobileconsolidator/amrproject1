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
		  console.log(this.model);
		  var _this = this;
		  setTimeout(function(){
			  $(".star-rating").raty({
				  click : function(score){
				  _this.trigger(ListItemView.STAR_RATING_CLICK, { score : score , answerId : _this.model.get('answerId'), questionId : _this.model.get('questionId')});
				  }
			  });
		  },6);
		  
		  return this;
	  }
	});
	ListItemView.STAR_RATING_CLICK = "star:click";
	return ListItemView;
});