define([
		"app/controller/DatabaseManager",
		"app/util/util"
	], function (DatabaseManager, Utilities) {
	var AssessmentController = {
		saveRespondentInformation : function (data) {
			var invoke = $.Deferred();
			var sql = "INSERT INTO respondent_information(survey_date," +
				"field1_detail,field2_detail,field3_detail,field4_detail," +
				"general_question_response,general_question_comments) VALUES('" +
				Utilities.getDate()
				 + "','" + data.field1_detail + "','" + data.field2_detail + "','" + data.field3_detail + "','" + data.field4_detail +
				"','" + data.question_response + "','" + data.question_remarks + "')";
			DatabaseManager.insert(sql).done(function (response) {
				_.each(data.scoreList, function (question) {
					sql = "INSERT INTO respondent_input(respondent_id,question_id,answer_id,score) VALUES(" + response.id + ", " +
						question.questionId + ", " + question.answerId + ", " + question.score + ")";
					console.log(sql);
					DatabaseManager.insert(sql);
				})

			});
		},
		getAllRespondentInformation : function () {
			var invoke = $.Deferred();
			DatabaseManager.query('SELECT rowid as respondentId, * FROM respondent_information').done(function (response) {
				invoke.resolve(response.data);
			});
			return invoke;
		},
		getAllRespondentInput : function () {

			var invoke = $.Deferred();
			DatabaseManager.query('SELECT rowid as respondentInputId,* FROM respondent_input').done(function (response) {
				invoke.resolve(response.data);
			});
			return invoke;
		}

	};
	return AssessmentController;

});
