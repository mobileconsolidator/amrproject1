define([],function(){
	var Utilities = {
		isEmpty: function(value){
			if(value == null || value == undefined || value == ""){
				return true;
			}else{
				return false;
			}
		},
		displayMessage: function(id,message){
			$(id).empty().append(message);
		}
	}
	
	return Utilities;
	
});