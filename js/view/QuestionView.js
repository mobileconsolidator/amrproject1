define([
	"text!templates/questions.html",
	"marionette",
],function(tmpl){
	var QuestionView = Backbone.Marionette.ItemView.extend({
	  template: tmpl,
	  initialize:function(options){
		  this.model = new Backbone.Model();
	  },
	  onRender: function(){
		  var template = _.template(this.template);
		  return this;
	  }
	});
	
	return QuestionView;
});