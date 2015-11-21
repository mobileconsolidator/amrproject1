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
			  _this.$el.find(".slider").slider({
				value : 0,
				min : 0,
				max : 5,
				step: 1,
				slide : function(event,ui){
					console.log(ui.value);
					_this.setScore(ui.value);
				}
			  })
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