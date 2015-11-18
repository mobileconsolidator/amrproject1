define([
'view/component/SingleView',
  'app/controller/ConfigController',
  'marionette'
],function(SingleView,ConfigController){
  var FormsView = Backbone.Marionette.ItemView.extend({
    template: tmpl,
    
    onRender: function(){
    	var template = _.template(this.template);
      	this.$el.html(template());
      ConfigController.getFormData().done(function(response){
      	
      });
    }
  });

});