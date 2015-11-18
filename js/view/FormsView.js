define([
		'text!templates/formsView.html',
		'view/component/SingleView',
		'app/controller/ConfigController',
		'marionette'
	], function (tmpl, SingleView, ConfigController) {
	var FormsView = Backbone.Marionette.ItemView.extend({
			template : tmpl,
			className : 'panel panel-default',
			formData : {
				
			},
			getData: function(){
				return this.formData;
			},
			onRender : function () {
				var template = _.template(this.template);
				this.$el.html(template());
				var _this = this;
				ConfigController.getFormConfiguration().done(function (response) {
					console.log(response);
					data = response['0'];
					
					for (var x = 1; x <= 4; x++) {
						var label = data['field' + x + '_caption'];
						if(label != 'undefined'){
							var ob = {
								num : x,
								label : label,
								value: ''
							}
							var singleView = new SingleView({
									model : new Backbone.Model(ob)
								});
							
							_this.listenTo(singleView,SingleView.CHANGED,function(response){
								_this.formData['field' + response.num+'_detail'] = response.value
							});
							singleView.render();
							$('.single-view').append(singleView.el);
						}
					};
				});
			}
		});
	return FormsView;
});
