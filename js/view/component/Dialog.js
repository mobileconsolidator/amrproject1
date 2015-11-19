define([
	"text!templates/component/dialog.html",
	"marionette",
	"jqueryui"
],function(tmpl){
	var Dialog = Backbone.Marionette.ItemView.extend({
		template : tmpl,
		invoke : $.Deferred(),
		initialize:function(){
			this.model = new Backbone.Model();
		},
		onRender:function(){
			var template = _.template(this.template);
			this.$el.html(template(this.model.attributes));
		},
		showMessage: function(title,message){
			this.invoke = $.Deferred()
			this.model.set('title',title);
			this.model.set('message',message);
			this.render();
			var _this = this;
			this.dialog = $(this.$el).dialog({
				title : title,
				resizable:false,
				draggable : false,
				buttons:[{
					text : 'Ok',
					click: function(){
						$(this).dialog('close');
						_this.invoke.resolve();
						
					}
				}]
			});
			return this.invoke;
		}
	});
	return Dialog;
});