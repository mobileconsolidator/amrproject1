define([
	"text!templates/summaryreport.html",
	"app/controller/ReportController",
	"marionette"
],function(tmpl,ReportController){
	var SummaryReportView = Backbone.Marionette.ItemView.extend({
		template: tmpl,
		initialize: function(options){
				this.model = new Backbone.Model(options.data)
		},
		onRender:function(){
			var template = _.template(this.template);
			this.$el.html(template(this.model.attributes));
		}
	});
	return SummaryReportView;
});