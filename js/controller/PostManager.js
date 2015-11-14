define([],function(){
	
	var PostManager = {
		post : function(url,params){
			return $.ajax({
			  method: "POST",
			  url: url,
			  data: params
			});
			  
		}
	}
	return PostManager;
});