define([
		'text!templates/assessmentView.html',
		'view/CategoryList',
		'view/FormsView',
		"view/GeneralSurveyQuestionView",
		'app/controller/ConfigController',
		"app/controller/AssessmentController",
		"app/controller/ReportController",
		"app/util/util",
		"view/component/Dialog",
		'marionette'
	], function (tmpl, CategoryList, FormsView, GeneralSurveyQuestionView, ConfigController, AssessmentController,ReportController,Utilities,Dialog) {
	var AssessmentView = Backbone.Marionette.ItemView.extend({
			template : tmpl,
			scoreList : [],
			events : {
				"click #btnSubmit" : "saveAssessment",
				"click #btnExport" : "showExport"
			},
			initialize: function(){
				this.dialog = new Dialog();
			},
			addScore : function(response){
				var model = _.findWhere(this.scoreList,{answerId : response.answerId, questionId : response.questionId});
				if(model != undefined){
					model.score = response.score;
				}else{
					this.scoreList.push(response);
				}
				
				console.log(this.scoreList);
			},
			onRender : function () {
				var template = _.template(this.template);
				this.$el.html(template());
				this.formsView = new FormsView();
				this.formsView.render();
				this.$el.find('.forms-view').html(this.formsView.el);
				var _this = this;
				ConfigController.getCompany().done(function(response){
					var generalSurveyQuestionView = new GeneralSurveyQuestionView({model : new Backbone.Model(response[0])});
					generalSurveyQuestionView.render();
					_this.$el.find('.survey-question-view').html(generalSurveyQuestionView.el);
				});
				ConfigController.getQuestions().done(function (response) {
					var categoryList = new CategoryList();
					for(var x=0;x<response.length;x++){
						response[x].caption = Utilities.toRomanNumerals(x + 1) + ". " + response[x].caption;
					}
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
				var isValid = true;
				_.each(formData,function(v, l){
					if(l.indexOf('field') >=0){
						if(Utilities.isEmpty(v)){
							isValid = false;
							return;
						}
					}
				});
				var _this = this;
				if(isValid){
					if(formData.scoreList.length == 0){
						this.dialog.showMessage('Empty Rating','Kindly rate at least one');
					}else{
						AssessmentController.saveRespondentInformation(formData);
						this.render();
					}
				}else{
					this.dialog.showMessage('Empty Value','Please enter value in form').done(function(){
						$('input:text').filter(function() { return $(this).val() == ""; }).focus();
					});
				}
				
			},
			showExport : function(){
				Backbone.history.navigate("#report",{trigger : true})
			}
		});

	return AssessmentView;
});
