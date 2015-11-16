define(['text!templates/field.html','marionette'],function(tmpl){
  var FieldView = new Backbone.Marionette.ItemView.Extend({
    template : tmpl,
    initialize:function(options){
      this.model = new Backbone.Model();
      
    },
    onRender : function(){
      var template = _.template(this.template);
      this.$el.html(template(this.model.attributes));
    }
  });
  return FieldView;
});