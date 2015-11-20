define([
		'text!templates/reportView.html',
		'app/controller/ConfigController',
		'app/util/util',
		'marionette',
		'grid'
	], function (tmpl, ConfigController,Utilities) {
	var ReportView = Backbone.Marionette.ItemView.extend({
			template : tmpl,
			initialize : function (options) {
				this.data = options.data;
				var _this = this;
				this.task1 = ConfigController.getAllAnswers();
				this.task2 = ConfigController.getFormConfiguration();
				this.task1.done(function (response) {
					_this.answers = response;
					console.log(response);
				});
				this.task2.done(function (response) {
					_this.forms = response;
				});
			},
			onRender : function () {
				var template = _.template(this.template);
				this.$el.html(template());
				this.renderTable();
			},
			renderTable : function () {
				var _this = this;
				$.when(this.task1, this.task2).then(function () {
					var grid;
					var forms = _this.forms[0];
					var columns = [
					];
					var formFormatter = function(row,value,c,field,dataContext){
						var field = field.field.split('_')[0];						
						return dataContext[field+"_detail"];
					}
					var answerFormatter = function(row,value,c,field,dataContext){
						console.log(field);
						console.log(dataContext);
						
						var input = _.findWhere(dataContext.answers, { answerId : field.id});
						console.log(input);
						if(input == undefined){
							return "";
						}else{
							return input.userInput.score;
						}
						
					};
					_.each(forms,function(a,b){
						if(!Utilities.isMatch(a,'undefined') && b.indexOf('caption') > 0){
							columns.push({
								id : a,
								name : a,
								field : b,
								formatter : formFormatter
							})
						}
					});
					
					_.each(_this.answers,function(a){
						columns.push({
								id : a.answerId,
								name : a.caption,
								field : 'score',
								formatter : answerFormatter
							})
					});
					var options = {
						enableCellNavigation : true,
						enableColumnReorder : false,
						forceFitColumns : true,
						headerRowHeight :35,
						rowHeight : 35,
						topPanelHeight : 50
					};

					$(function () {
						
						grid = new Slick.Grid("#myGrid", _this.data, columns, options);
					})
				});

			}

		});

	return ReportView;
});
