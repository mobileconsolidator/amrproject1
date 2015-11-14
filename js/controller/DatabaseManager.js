define([],function(){
	
	var DatabaseManager = {
		db : undefined,
		shortName : 'BudgetSystemDB',
		version :'1.0',
		displayName : 'WebSqlDB',
		maxSize : 65535,
		events:{
			onError: function(){
				console.log('error');
			},
			onSuccess: function(){
				console.log('error');
			},
			onNull : function(a,b,c){
				 
				console.log(a);
				console.log(b)
				console.log(c);
				console.log('error');
			}
			
		},
		init: function(){
			
			if(!window.openDatabase){
				this.events.onError({msg : 'Database not supported'});
				return;
			}
			var _this = this;
			this.db = openDatabase(this.shortName,this.version,this.displayName,this.maxSize);
			this.db.transaction(function(tx){
				tx.executeSql( 'CREATE TABLE IF NOT EXISTS User(email TEXT NOT NULL PRIMARY KEY, Password TEXT NOT NULL)', [],_this.events.onNull,_this.events.onError);
				
				
				 },this.events.onError,this.events.onSuccess);
			this.query('SELECT * FROM User').done(function(response){
				if(response.data.length == 0){
					this.query('INSERT INTO User(email,password) VALUES("admin","admin")');
				}
			});
		},
		query: function(query){
			var invoke = $.Deferred();
			if(this.db == undefined){
				this.init();
			}
			var _this = this;
			
			var onSuccess = function(transaction,result){
				if(result != null || result.rows != null){
					invoke.resolve({status : true, data : result.rows});
				}else{
					invoke.resole({status : false, data : []})
				}
			}
			
			var onError = function(){
				
			}
			
			
			this.db.transaction(function(tx){
				tx.executeSql(query, [],onSuccess,onError);
				
				 },this.events.onError,this.events.onSuccess);
			
			return invoke;
		}
		
		
	}
	
	return DatabaseManager;
}); 