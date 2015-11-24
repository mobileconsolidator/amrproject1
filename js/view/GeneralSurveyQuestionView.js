define ([
	"text!templates/generalsurveyquestion.html",
	"marionette"
],function(tmpl){
	var GeneralSurveyQuestionView = Backbone.Marionette.ItemView.extend({
		template : tmpl,
		isSuccess : 0,
		initialize: function(options){
			this.model = options.model;
			console.log(this.model);
		},
		events:{
			"click p" : "setGeneralSurveyInput"
		},
		setGeneralSurveyInput: function(e){
			if($(e.currentTarget).hasClass("fa-frown-o")){
				$(".btnFail").addClass("text-danger");
				$(".btnPass").removeClass("text-success");
			}else{
				$(".btnFail").removeClass("text-danger");
				$(".btnPass").addClass("text-success");
				this.isSuccess = 1;
			}
		},
		onRender:function(){
			var template = _.template(this.template);
			this.$el.html(template(this.model.attributes));
		},
		getData : function(){
			return {
				isSuccess : this.isSuccess
			}
		}
	});
	
	return GeneralSurveyQuestionView;
});