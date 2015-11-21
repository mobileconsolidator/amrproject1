define ([
	"text!templates/generalsurveyquestion.html",
	"marionette"
],function(tmpl){
	var GeneralSurveyQuestionView = Backbone.Marionette.ItemView.extend({
		template : tmpl,
		initialize: function(options){
			this.model = options.model;
			console.log(this.model);
		},
		onRender:function(){
			var template = _.template(this.template);
			this.$el.html(template(this.model.attributes));
		}
	});
	
	return GeneralSurveyQuestionView;
});