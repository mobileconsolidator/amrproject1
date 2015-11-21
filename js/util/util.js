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
		},
		isMatch:function(value1,value2){
			return value1 == value2;
		},
		toRomanNumerals: function(num){
			var numeralCodes = [["","I","II","III","IV","V","VI","VII","VIII","IX"],         // Ones
                    ["","X","XX","XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"],   // Tens
                    ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM"]];        // Hundreds

			  var numeral = "";
			  var digits = num.toString().split('').reverse();
			  for (var i=0; i < digits.length; i++){
				numeral = numeralCodes[i][parseInt(digits[i])] + numeral;
			  }
			  return numeral;  
			
		},
		toLetterNum : function(num){
			var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
			return chars.charAt(num);
		}
	}
	
	return Utilities;
	
});