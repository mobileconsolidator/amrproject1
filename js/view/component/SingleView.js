define([
'text!templates/component/SingleView.html',
'marionette'],function(tmpl){
  var SingleView = Backbone.Marionette.ItemView.extend({
    template :tmpl,
    initialize:function(options){
      this.model = options.model; 
    },
    onRender:function(){
    	var template = _.template(this.template);
      this.$el.html(template(this.model.attributes));
    }
  });
  return SingleView;
});