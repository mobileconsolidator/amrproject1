define([
	'text!templates/answer.html',
  'marionette'
],function(tmpl){

  var AnswerView = Backbone.Marionette.ItemView.extend({
    template : tmpl,
    initialize:function(options){
		this.model = options.model;
		console.log(this.model);
	},
    onRender:function(){
    	var template = _.template(this.template);
      	this.$el.html(template(this.model.attributes));
    },
    getData:function(){
    	return this.$el.find('.txtAnswer').val();
    }
  });
  
  return AnswerView;
});