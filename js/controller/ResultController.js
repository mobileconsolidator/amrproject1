define([
	'app/controller/LoginController',
  	'app/controller/AssessmentController',
  'app/controller/ConfigController'
],function(){
  var ResultController ={
    getAllResult:function(){
    	var users=undefined;
      	var respondentInformations=undefined;
      	var respondentInputs=undefined;
      	var answers = undefined;
      	var task1=LoginController.getAllUsers();
      	var task2=AssessmentController.getAllRespondentInformation();
      	var task3=AssessmentController.getAllRespondentInput();
      task1.done(function(response){
      	users=response.data;
      });
      task2.done(function(response){
      	respondentInputs = response.data;
      });
      task3.done(function(response){
      	respondentInformations = response.data;
      });
      
      $.when(task1,task2,task3).then(function(){
        var listData = [];
        _.each(respondentInformations,function(ri){
          var data = {};
          data.answers = [];
          var userInputs = _.findWhere(respondentInputs,{userId:ri.userId});
          _.each(answers,function(answer){
            var input = _.findWhere(userInputs,{answerId : answer.answerId});
            var abanswer = $.extend(true,{},answer);
          	abanswer.input = input;
            ri.abnswer = abanswer;
          });
        });
        invoke.resolve(listData);
      });
    }
  };
  
  return ResultController;
});