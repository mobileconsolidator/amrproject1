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
		  var _this = this;
		  setTimeout(function(){
			  console.log(_this.model);
			  
			  _this.$el.find(".star-rating").raty({
				  click : function(score){
					  _this.setScore(score);
				  }
			  });
		  },6);
		  
		  return this;
	  },
	  setScore: function(score){
		  this.trigger(ListItemView.STAR_RATING_CLICK,{score : score, answerId : this.model.get('answerId'), questionId : this.model.get('questionId')});
	  }
	});
	ListItemView.STAR_RATING_CLICK = "star:click";
	return ListItemView;
});