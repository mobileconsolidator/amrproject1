define([
	"text!templates/questions.html",
  	"view/AnswerView",
	"marionette",
],function(tmpl,AnswerView){
	var QuestionView = Backbone.Marionette.ItemView.extend({
	  template: tmpl,
      events:{
        'click .btnAddNewAnswer' : 'addAnswerView'
      },
	  initialize:function(options){
		  this.model = options.model;
        	this.answerViewList = [];
	  },
	  onRender: function(){
		  var template = _.template(this.template);
        	this.$el.html(template());
        	this.addAnswerView();
		  return this;
	  },
      addAnswerView : function(){
        
        var answerView = new AnswerView({model : this.model});
        this.answerViewList.push(answerView);
        answerView.render();
        $(this.$el.find('.answer-form')).append(answerView.el);
      },
      getData:function(){
        var data={};
        data.question = $(this.$el.find('.txtQuestion')).val();
        data.items = [];
        _.each(this.answerViewList,function(view){
        	items.push(view.getData());
        });
        return data;
      }
	});
	
	return QuestionView;
});