define([], function () {

	var DatabaseManager = {
		db : undefined,
		shortName : 'BudgetSystemDB',
		version : '1.0',
		displayName : 'WebSqlDB',
		maxSize : 65535,
		events : {
			onError : function () {
				console.log('error');
			},
			onSuccess : function () {
				console.log('success');
			},
			onNull : function (a, b, c) {
			}

		},
		init : function () {
			var invoke = $.Deferred();
			console.log(invoke);
			if (!window.openDatabase) {
				this.events.onError({
					msg : 'Database not supported'
				});
				alert('Database not supported');
				invoke.reject();
				return invoke;
			}
			var _this = this;
			this.db = openDatabase(this.shortName, this.version, this.displayName, this.maxSize);
			this.db.transaction(function (tx) {
				tx.executeSql('CREATE TABLE IF NOT EXISTS users(email TEXT NOT NULL PRIMARY KEY, Password TEXT NOT NULL)', [], _this.events.onNull, _this.events.onError);
				tx.executeSql('CREATE TABLE IF NOT EXISTS company_configuration(company_name TEXT NOT NULL PRIMARY KEY, company_logo TEXT NOT NULL,general_question_survey TEXT NOT NULL)', [], _this.events.onNull, _this.events.onError);
				tx.executeSql('CREATE TABLE IF NOT EXISTS questions(caption TEXT NOT NULL)', [], _this.events.onNull, _this.events.onError);
				tx.executeSql('CREATE TABLE IF NOT EXISTS answers(question_id TEXT , caption TEXT NOT NULL)', [], _this.events.onNull, _this.events.onError);
				tx.executeSql('CREATE TABLE IF NOT EXISTS form_configuration(field1_caption TEXT , field1_sequence INTEGER NOT NULL,field1_datatype INTEGER NOT NULL,' +
					'field2_caption TEXT , field2_sequence INTEGER NOT NULL,field2_datatype INTEGER NOT NULL,field3_caption TEXT ,' +
					'field3_sequence INTEGER NOT NULL,field3_datatype INTEGER NOT NULL,' +
					'field4_caption TEXT , field4_sequence INTEGER NOT NULL,field4_datatype INTEGER NOT NULL)', [], _this.events.onNull, _this.events.onError);
				tx.executeSql('CREATE TABLE IF NOT EXISTS respondent_information(survey_date TEXT NOT NULL,field1_detail TEXT NOT NULL,field2_detail TEXT NOT NULL,' +
					'field3_detail TEXT NOT NULL,field4_detail TEXT NOT NULL, general_question_response TEXT NOT NULL, general_question_comments TEXT NOT NULL)', [], _this.events.onNull, _this.events.onError);
				tx.executeSql('CREATE TABLE IF NOT EXISTS respondent_input(respondent_id TEXT NOT NULL,question_id TEXT NOT NULL,answer_id TEXT NOT NULL,score TEXT NOT NULL)', [], _this.events.onNull, _this.events.onError);
			}, this.events.onError, this.events.onSuccess);
			this.query('SELECT * FROM users').done(function (response) {
				if (response.data.length == 0) {
					_this.query('INSERT INTO users(email,password) VALUES("admin","admin")');

				}
				invoke.resolve();
			});
			console.log(invoke);
			return invoke;
		},
		isEmpty : function (query) {
			var invoke = $.Deferred();
			this.query(query).done(function (response) {
				if (response.data.length == 0) {
					invoke.resolve(true);
				} else {
					invoke.resolve(false);
				}
			});
			return invoke;
		},
		insert : function (query) {
			var invoke = $.Deferred();
			var initInvoke = undefined;
			if (this.db === undefined) {
				initInvoke = this.init();
			} else {
				initInvoke = $.Deferred();
				initInvoke.resolve();
			}

			var _this = this;
			initInvoke.done(function () {

				var onSuccess = function (transaction, result) {
					if (result != null || result.rows != null) {
						invoke.resolve({
							status : true,
							id : result.insertId
						});
					} else {
						invoke.resole({
							status : false,
							id : -1
						})
					}
				}
				var onError = function () {};

				_this.db.transaction(function (tx) {
					tx.executeSql(query, [], onSuccess, onError);

				}, _this.events.onError, _this.events.onSuccess);

			});
			return invoke;
		},
		onInsert2 : function(){
			
		},
		insert2 : function (query, isTrigger) {
			var _this = this;
			var onSuccess = function (transaction, result) {
				if (result != null || result.rows != null) {
					if(isTrigger){
					_this.onInsert2({
						status : true,
						id : result.insertId
					})
					}
				} else {
					if(isTrigger){
					_this.onInsert2({
						status : true,
						id : result.insertId
					})
					}
				}
			}
			var onError = function () {};

			_this.db.transaction(function (tx) {
				tx.executeSql(query, [], onSuccess, onError);

			}, _this.events.onError, _this.events.onSuccess);
		},
		query : function (query) {
			var invoke = $.Deferred();
			var initInvoke = undefined;
			if (this.db == undefined) {
				console.log('empty db');
				initInvoke = this.init();
			} else {
				initInvoke = $.Deferred();
				console.log(initInvoke);
				
				initInvoke.resolve();
			}
			var _this = this;

			initInvoke.done(function () {
				var onSuccess = function (transaction, result) {
					if (result != null || result.rows != null) {
						var data = [];
						for(var i=0;i<result.rows.length;i++){
							data.push(result.rows.item(i));
						}
						
						invoke.resolve({
							status : true,
							data : data
						});
					} else {
						invoke.resole({
							status : false,
							data : []
						})
					}
				}

				var onError = function () {};

				_this.db.transaction(function (tx) {
					tx.executeSql(query, [], onSuccess, onError);

				}, _this.events.onError, _this.events.onSuccess);
			});

			return invoke;
		}

	}

	return DatabaseManager;
});
