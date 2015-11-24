define([
		'app/controller/LoginController',
		'app/controller/AssessmentController',
		'app/controller/ConfigController'
	], function (LoginController, AssessmentController, ConfigController) {
	var ReportController = {
		getAllResult : function () {
			var invoke = $.Deferred();
			var users = undefined;
			var respondentInformations = undefined;
			var respondentInputs = undefined;
			var answers = undefined;
			var task1 = AssessmentController.getAllRespondentInformation();
			var task2 = AssessmentController.getAllRespondentInput();
			var task3 = ConfigController.getAllAnswers();
			task1.done(function (response) {
				respondentInformations = response;
			});
			task2.done(function (response) {
				respondentInputs = response;
			});
			task3.done(function (response) {
				answers = response;
			});

			$.when(task1, task2, task3).then(function () {
				var listData = [];
				_.each(respondentInformations, function (ri) {
					var data = {};
					ri.answers = [];
					var userInputs = _.where(respondentInputs, {
							respondent_id : ri.respondentId + ""
						});
					_.each(userInputs, function (userInput) {
						var input = _.findWhere(answers, {
								answerId : parseInt(userInput.answer_id)
							});
						var tinput = $.extend(true,{},input);
						tinput.userInput = userInput;
						ri.answers.push(tinput);
					});

					listData.push(ri);
				});
				invoke.resolve(listData);
			});

			return invoke;
		},
		getAllSummaryReport: function(){
			var invoke = $.Deferred();
			
			var task1 = ConfigController.getCompany();
			var task2 = AssessmentController.getAllRespondentInformation();
			var task3 = ConfigController.getQuestions();
			var task4 = ConfigController.getAllAnswers();
			var task5 = AssessmentController.getAllRespondentInput();
			var data = {};
			task1.done(function(response){
				data.surveyQuestion = response[0].general_question_survey;
			});
			task2.done(function(response){
				data.surveyQuestionPass = 0;
				data.surveyQuestionFail = 0;
				console.log(response);
				_.each(response,function(r){
					if(parseInt(r.general_question_response) == 1){
						data.surveyQuestionPass++;
					}else{
						data.surveyQuestionFail++;
					}
				});
			});
			
			task3.done(function(response){
				data.question = response;
				
			});
			task4.done(function(response){
				data.answers = response;
			});
			task5.done(function(response){
				data.inputs = response;
			});
			var _this = this;
			$.when(task1,task2,task3,task4,task5).then(function(){
				data.survey = [];
				_.each(data.question,function(r){
					data.survey.push({
						label : r.caption,
						veryPoor : "",
						poor : "",
						good : "",
						veryGood : "",
						excellent : "",
						isQuestion : true
					});
					_.each(r.items, function(a){
						var ax = _.findWhere(data.survey,{answerId : a.answerId, questionId : a.questionId});
						if(ax == undefined){
							ax = {
								label : a.caption,
								answerId : a.answerId,
								questionId : a.questionId,
								veryPoor : 0,
								poor : 0,
								good : 0,
								veryGood : 0,
								excellent :0,
								isQuesiont : false
							}
							data.survey.push(ax);
						}
						
						var inputs = _.where(data.inputs,{answer_id : "" + a.answerId, question_id : "" + a.questionId})
						_.each(inputs,function(input){
							if(parseInt(input.score) == 1){
								ax.veryPoor++;
							}else if(parseInt(input.score) == 2){
								ax.poor++;
							}
							else if(parseInt(input.score) == 3){
								ax.good++;
							}else if(parseInt(input.score) == 4){
								ax.veryGood++;
							}else if(parseInt(input.score) == 5){
								ax.excellent++;
							}
						});
						
						
					});
				});
				data.question = null;
				data.inputs = null;
				data.answers = null;
				invoke.resolve(data);
			});
			return invoke;
		},
		
	};

	return ReportController;
});
