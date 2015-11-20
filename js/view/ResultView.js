define([
  'text!templates/resultView.html'
	'marionette'
],function(tmpl){
  var ResultView = Backbone.Marionette.ItemView.extend({
    template: tmpl,
    initialize:function(){
    },
    onRender:function(){
    	var template=_.template(this.template);
      	this.$el.html(template());
    }
  });
  
  return ResultView;
});