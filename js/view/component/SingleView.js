define([
'text!templates/component/SingleView.html',
'marionette'],function(tmpl){
  var SingleView = Backbone.Marionette.ItemView.extend({
    template :tmpl,
    initialize:function(options){
      this.model = options.model; 
    },
	events:{
		"change input" : "textChanged"
	},
	textChanged : function(el){
		this.trigger(SingleView.CHANGED, { num : this.model.get('num'), value :$(el.currentTarget).val()});
	},
    onRender:function(){
    	var template = _.template(this.template);
      this.$el.html(template(this.model.attributes));
	  this.$el.addClass(this.model.get('clazz'))
    }
  });
  SingleView.CHANGED = "text:changed";
  return SingleView;
});