define([
	'text!templates/assessmentView.html',
  	'view/CategoryList',
  'view/FormsView',
  'app/controller/ConfigController',
  'marionette'
],function(tmpl,CategoryList,FormsView,ConfigController){
  var AssessmentView = Backbone.Marionette.ItemView.extend({
    template: tmpl,
    
    onRender: function(){
    	var formsView = new FormsView();
      	formsView.render();
      	this.$el.find('.forms-view').html(formsView.el);
      var _this = this;
      ConfigController.getQuestions().done(function(response){
      	var categoryList = new CategoryList();
      	categoryList.setCollection(new Backbone.Collection(response));
        categoryList.render();
      	_this.$el.find('.question-view').html(categoryList.el);
      });
      	
    }
  });
  
  return AssessmentView;
});