define([
		"text!templates/config.html",
		"app/controller/ConfigController",
		"app/util/util",
		"view/FieldView",
  		"view/QuestionView",
		"marionette"
	], function (tmpl, ConfigController, Utilities,FieldView,QuestionView) {

	var ConfigView = Backbone.Marionette.ItemView.extend({
			template : tmpl,
			tagName : 'div',
			initialize : function (options) {
				this.model = new Backbone.Model();
				this.model.set('company_name', '');
				this.model.set('general_question_survey', '');
              this.questionViewList = [];
			},
      
      addQuestionView:function(){
        var questionView =new QuestionView({model:_this.model});
        questionView.render();
        this.questionViewList.push(questionView);
        $('#questions').append(questionView.el);
      },
			onBeforeRender : function () {
				_this = this;

			},
			setModelValue : function(response){
				this.model.set(response);
			},
			onRender : function () {
				_this = this;
				ConfigController.getData().done(function(response){
					console.log(response);
					_this.model.set(response);
					var template = _.template(_this.template);
					_this.$el.html(template(_this.model.attributes));
					for(var x=1;x<=4;x++){
						var field = new FieldView({fieldNumber : x, caption : response['field' + x +'_caption'],sequence : response['field' + x +'_sequence'],dataType : response['field' + x +'_datatype']});
						_this.listenTo(field,FieldView.SAVE_DATA,_this.setModelValue);
						field.render();
						$("#field" + x).empty().append(field.el);
					}
          			_this.addQuestionView();
				})
				

				return this;
			},
			events : {
				"click #btnSave" : "saveConfig",
				"click #btnAddNewQuestion" : "addQuestionView"
			},
			addNew : function () {
				$("#answer-form").append('<label for="exampleInputEmail1">Caption</label><input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">')
			},
			saveConfig : function () {
				var companyData = {
					companyName : $("#txtCompanyName").val(),
					question : $("#txtGeneralQuestion").val(),
					photo : ''
				};
				console.log(companyData);
				if (!Utilities.isEmpties(companyData, ['photo'])) {
					console.log('saving');
					ConfigController.saveOrUpdateCompany(companyData);
				}

				var configurationData = {};
			for(var x=1;x<=4;x++){
				configurationData['field'+x+'Caption'] = this.model.get('field'+x+'_caption');
				configurationData['field'+x+'Sequence'] = this.model.get('field'+x+'_sequence');
				configurationData['field'+x+'DataType'] = this.model.get('field'+x+'_datatype');
			}

				ConfigController.saveOrUpdateForm(configurationData);
              
              var questionData = [];
              _.each(this.questionViewList,function(view){
              	questionData.push(view.getData());
              });
              
              ConfigController.saveOrUpdateQuestions(questionData);
			}
		});

	return ConfigView;
});