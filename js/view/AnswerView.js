define([
	'text!templates/answer.html',
  'marionette'
],function(tmpl){

  var AnswerView = Backbone.Marionette.ItemView.extend({
    template : tmpl,
    
    onRender:function(){
    	var template = _.template(this.template);
      	this.$el.html(template());
    },
    getData:function(){
    	return this.$el.find('.txtAnswer').val();
    }
  });
  
  return AnswerView;
});