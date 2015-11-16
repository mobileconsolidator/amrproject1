define([
	"text!templates/field.html",
	"marionette",
],function(tmpl){
	var FieldView = Backbone.Marionette.ItemView.extend({
	  
	  template: tmpl,
	  events:{
		  "change .inputfield" : "saveData"
	  },
	  initialize: function(options){
		  this.model = new Backbone.Model();
		  this.model.set('fieldNumber',options.fieldNumber);
		  this.model.set('caption',options.caption);
		  this.model.set('sequence',options.sequence);
		  this.model.set('dataType',options.dataType);
		  this.model.set('dataTypes',['String','Integer','Boolean','Date']);
	  },
	  saveData : function(){
		this.trigger(FieldView.SAVE_DATA,this.getData());  
	  },
	  getData: function(){
		  var object = {};
		  var n =this.model.get('fieldNumber');
		  object['field'+n+'_caption']= $("#txtField"+n+"Caption").val();
		  object['field'+n+'_sequence']= $("#txtField"+n+"Sequence").val();
		  object['field'+n+'_datatype']= $("#txtField"+n+"DataType").val();
		  return object;
	  },
	  onRender: function(){
		  var template = _.template(this.template);
		  this.$el.html(template(this.model.attributes));
		  return this;
	  }
	});
	FieldView.SAVE_DATA = "field:save:data";
	return FieldView;
});