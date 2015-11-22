define ([
	"text!templates/header.html",
	"marionette",
	"sider"],function(tmpl){
	var HeaderView = Backbone.Marionette.ItemView.extend({
		template : tmpl,
		events : {
			'click li' : 'closeMenu'
		},
		closeMenu : function(){
			$.sidr('close')
		},
		initialize: function(options){
			this.model = options.model;			
		},
		onRender: function(){
			var template = _.template(this.template);
			this.$el.html(template(this.model.attributes));
			var _this = this;
			setTimeout(function(){
				_this.$el.find("#headerSliderMenu").sidr();
			},10);
			
		}
	});
	
	return HeaderView;

})