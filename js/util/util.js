define([
	"marionette"
],function(){
	var Utilities = {
		isEmpty: function(value){
			if(value == null || value == undefined || value == ""){
				return true;
			}else{
				return false;
			}
		},
		isEmpties: function(list,except){
			var _this = this;
			var response = false;
			_.each(list,function(l,v){
				console.log(v);
				console.log(except);
				var b = $.inArray(v,except);
				console.log(b);
				if(b == -1){
					var isEmpty = _this.isEmpty(l);
					if(isEmpty){
						console.log('emptyas');
						response = true;
					}
				}
			});
			console.log(response);
			return response;
		},
		displayMessage: function(id,message){
			$(id).empty().append(message);
		},
		getDate: function(format){
			var date = new Date();
			
			return (date.getMonth() + 1) + "-" + date.getDate() +"-"+ (1900 + date.getYear());
		}
	}
	
	return Utilities;
	
});