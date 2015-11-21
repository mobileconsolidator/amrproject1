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
		}
	};

	return ReportController;
});
