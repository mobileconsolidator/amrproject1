define([
	"app/controller/DatabaseManager"
],function(DatabaseManager){
	var ConfigController = {
		saveOrUpdateCompany: function(data){
			DatabaseManager.query("DELETE FROM company_configuration").done(function(response){
					DatabaseManager.query('INSERT INTO company_configuration(company_name,company_logo,general_question_survey) VALUES("'+data.companyName+'","'+ data.photo+'","' + data.question +'")');
			});
			
		},
		saveOrUpdateForm : function(data){
			DatabaseManager.query("DELETE FROM form_configuration").done(function(response){
					DatabaseManager.query('INSERT INTO form_configuration(' +
					'field1_caption,field1_sequence,field1_datatype,' +
					'field2_caption,field2_sequence,field2_datatype,' +
					'field3_caption,field3_sequence,field3_datatype,' +
					'field4_caption,field4_sequence,field4_datatype' +
					') VALUES(' +
					'"'+data.field1Caption+'","'+data.field1Sequence+'","'+data.field1DataType+'",' +
					'"'+data.field2Caption+'","'+data.field2Sequence+'","'+data.field2DataType+'",' +
					'"'+data.field3Caption+'","'+data.field3Sequence+'","'+data.field3DataType+'",' +
					'"'+data.field4Caption+'","'+data.field4Sequence+'","'+data.field4DataType+'"' +
					')');
				
			});
		},
		saveOrUpdateQuestion : function(data){
			
		},
		getCompany : function(){
			var invoke = $.Deferred();
			DatabaseManager.query('SELECT * FROM company_configuration').done(function(response){
				if(response.status){
					invoke.resolve(response.data);
				}else{
					invoke.reject();
				}
				
			});
			return invoke;
		},
		hasQuestions: function(){
			var invoke = $.Deferred();
			DatabaseManager.query("SELECT * FROM questions").done(function(response){
				if(response.status){
					invoke.resolve(response.data);
				}else{
					invoke.reject();
				}
				
			});
			return invoke;
		}
	};
	return ConfigController;
});