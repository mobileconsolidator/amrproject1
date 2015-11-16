define([
	"text!templates/config.html",
	"app/controller/ConfigController",
	"app/util/util",
	"marionette"
],function(tmpl,ConfigController,Utilities){
	
	var ConfigView = Backbone.Marionette.ItemView.extend({
	  template:tmpl,
	  tagName : 'div',
	  initialize:function(options){
		this.model = new Backbone.Model(); 
		this.model.set('company_name','');
		this.model.set('general_question_survey','');
	  },
	  onBeforeRender: function(){
		  _this = this;
		  

	  },
	  onRender:function(){
		  _this = this;
		  ConfigController.getCompany().done(function(response){
			 _this.model.set(response['0']);
			 var template = _.template(_this.template);
			_this.$el.html(template(_this.model.attributes));
		  });
		  
		  return this;
	  },
	  events:{
		  "click #btnSave" : "saveConfig",
		  "click #btnAddNew" : "addNew"
	  },
	  addNew: function(){
		$("#answer-form").append('<label for="exampleInputEmail1">Caption</label><input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">')
	  },
	  saveConfig: function(){
		  var companyData = {
			  companyName : $("#txtCompanyName").val(),
			  question : $("#txtGeneralQuestion").val(),
			  photo : ''
		  };
		  console.log(companyData);
		  if(!Utilities.isEmpties(companyData,['photo'])){
			  console.log('saving');
			 ConfigController.saveOrUpdateCompany(companyData);
		  }
		  
		  var configurationData = {
			  field1Caption : $("#txtField1Caption").val(),
			  field1Sequence : $("#txtField1Sequence").val(),
			  field1DataType : $("#txtField1DataType").val(),
			  field2Caption : $("#txtField2Caption").val(),
			  field2Sequence : $("#txtField2Sequence").val(),
			  field2DataType : $("#txtField2DataType").val(),
			  field3Caption : $("#txtField3Caption").val(),
			  field3Sequence : $("#txtField3Sequence").val(),
			  field3DataType : $("#txtField3DataType").val(),
			  field4Caption : $("#txtField4Caption").val(),
			  field4Sequence : $("#txtField4Sequence").val(),
			  field4DataType : $("#txtField4DataType").val()
		  }
		  
		  ConfigController.saveOrUpdateForm(configurationData);
	  }
	});
	
	return ConfigView;
});