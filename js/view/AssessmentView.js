define([
		'text!templates/assessmentView.html',
		'view/CategoryList',
		'view/FormsView',
		'app/controller/ConfigController',
		"app/controller/AssessmentController",
		'marionette'
	], function (tmpl, CategoryList, FormsView, ConfigController, AssessmentController) {
	var AssessmentView = Backbone.Marionette.ItemView.extend({
			template : tmpl,
			scoreList : [],
			events : {
				"click #btnSubmit" : "saveAssessment"
			},
			addScore : function(response){
				this.scoreList.push(response);
			},
			onRender : function () {
				var template = _.template(this.template);
				this.$el.html(template());
				this.formsView = new FormsView();
				this.formsView.render();
				this.$el.find('.forms-view').html(this.formsView.el);
				var _this = this;
				ConfigController.getQuestions().done(function (response) {
					var categoryList = new CategoryList();
					categoryList.setCollection(new Backbone.Collection(response));
					_this.listenTo(categoryList, CategoryList.STAR_CLICK, _this.addScore);
					categoryList.render();
					_this.$el.find('.question-view').html(categoryList.el);
				});

			},
			saveAssessment : function () {
				var comments = $("#txtComments").val();
				var formData = this.formsView.getData();
				formData.scoreList = this.scoreList;
				formData.comments = comments;
				console.log(formData);
				AssessmentController.saveRespondentInformation(formData);
			},
		});

	return AssessmentView;
});
