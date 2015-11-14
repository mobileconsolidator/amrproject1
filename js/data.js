
define([], function () {
	var Store = {
		getListOfQuestion : function () {
			var data = [];
			data.push({
				category: 'I. Our service in general',
				items:[
				{
					description : 'Staff Friendliness'
				},
				{
					description : 'Promptness of service'
				},
				{
					description : 'Knowledge of service staff'
				}
				]
				
			});
			data.push({
				category: 'II. Showcase Environment',
				items:[
					{
						description : 'Overall experience of showcase'
					},
					{
						description : 'Cleanliness of showcase'
					}
				]
			});
			data.push({
				category: 'III. Product Collection',
				items:[
					{
						description : 'Speed of Service'
					},
					{
						description : 'Accuracy of product collected'
					}
				]
			});
			return data;
		}
	}
	return Store;
});
