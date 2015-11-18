define([
		"app/controller/DatabaseManager"
	], function (DatabaseManager) {
	var ConfigController = {
		saveOrUpdateCompany : function (data) {
			var invoke = $.Deferred();
			var task1 = undefined;
			var task2 = undefined;
			task1 = DatabaseManager.query("DELETE FROM company_configuration")
			task1.done(function (response) {
				task2 = DatabaseManager.query('INSERT INTO company_configuration(company_name,company_logo,general_question_survey) VALUES("' + data.companyName + '","' + data.photo + '","' + data.question + '")');
			});
			$.when(task1,task2).then(function(){
				invoke.resolve(true);
			});
			return invoke;
		},
		saveOrUpdateForm : function (data) {
			var invoke = $.Deferred();
			var task2 = undefined;
			var task1 = DatabaseManager.query("DELETE FROM form_configuration").done(function (response) {
				 task2 = DatabaseManager.query('INSERT INTO form_configuration(' +
					'field1_caption,field1_sequence,field1_datatype,' +
					'field2_caption,field2_sequence,field2_datatype,' +
					'field3_caption,field3_sequence,field3_datatype,' +
					'field4_caption,field4_sequence,field4_datatype' +
					') VALUES(' +
					'"' + data.field1Caption + '","' + data.field1Sequence + '","' + data.field1DataType + '",' +
					'"' + data.field2Caption + '","' + data.field2Sequence + '","' + data.field2DataType + '",' +
					'"' + data.field3Caption + '","' + data.field3Sequence + '","' + data.field3DataType + '",' +
					'"' + data.field4Caption + '","' + data.field4Sequence + '","' + data.field4DataType + '"' +
					')');

			});
			$.when(task1,task2).then(function(){
				invoke.resolve(true);
			});
			return invoke;
		},
		saveOrUpdateQuestions : function (data) {
			DatabaseManager.query('DELETE FROM questions').done(function () {
				DatabaseManager.query('DELETE FROM answers').done(function () {
					_.each(data, function (d) {
						DatabaseManager.insert('INSERT INTO questions(caption) VALUES("' + d.question + '")').done(function (response) {
							_.each(d.items, function (answer) {
								DatabaseManager.insert('INSERT INTO answers(question_id,caption)  VALUES(' + response.id + ',"' + answer + '")');
							});
						});
					});
				});
			});

		},
		getData : function () {
			var invoke = $.Deferred();
			var model = {};
			var task1= this.getCompany();
			task1.done(function (response) {
				if(response.length > 0){
					model = $.extend({}, model, response['0']);
				}

			});
			var task2 = this.getFormConfiguration();
			task2.done(function (response) {
				if(response.length > 0){
					model = $.extend({}, model, response['0']);
				
				}
			});
			
			var task3 = this.getQuestions()
			task3.done(function(response){
				model.questions = response;
			});
			$.when(task1,task2,task3).then(function(){
				invoke.resolve(model);
			});
			return invoke;
		},
		getFormConfiguration : function () {
			var invoke = $.Deferred();
			DatabaseManager.query('SELECT * FROM form_configuration').done(function (response) {
				if (response.status) {
					invoke.resolve(response.data);
				} else {}
			});
			return invoke;
		},
		getCompany : function () {
			var invoke = $.Deferred();
			DatabaseManager.query('SELECT * FROM company_configuration').done(function (response) {
				if (response.status) {
					invoke.resolve(response.data);
				} else {
					invoke.reject();
				}

			});
			return invoke;
		},
		getQuestions:function(){
			var invoke = $.Deferred();
			var data = [];
			DatabaseManager.query('SELECT rowid as questionId, caption as caption  FROM questions').done(function(response){
				
				var tasks = [];
				if(response.status){
					_.each(response.data,function(d){
						var question = {};
						question.caption = d.caption;
						question.items = [];
						var task = DatabaseManager.query('SELECT rowId as answerId, caption as caption FROM answers WHERE question_id='+d.questionId);
						tasks.push(task);
						task.done(function(result){
							if(result.status){
								_.each(result.data,function(a){
									question.items.push({ questionId : d.questionId,answerId : a.answerId, caption : a.caption });
								});
								data.push(question);
							}
						});
					});
					
				}
				$.when.apply($,tasks).then(function(){
					invoke.resolve(data);
				});
				
			});
			return invoke;
		},
		
		hasQuestions : function () {
			var invoke = $.Deferred();
			DatabaseManager.query("SELECT * FROM questions").done(function (response) {
				if (response.status) {
					if(response.data.length > 0){
						invoke.resolve(true);
					}else{
						invoke.resolve(false);
					}
				} else {
					invoke.reject();
				}

			});
			return invoke;
		}
	};
	return ConfigController;
});
