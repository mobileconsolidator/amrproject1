requirejs.config({
	baseUrl: 'vendor',
    paths: {
        app: '../js',
		templates : '../templates',
		vendor : '../vendor',
		bootstrap : '../vendor/bootstrap/js/bootstrap',
		marionette : '../vendor/backbone/backbone.marionette',
		backbone : '../vendor/backbone/backbone',
		view : '../js/view',
		jqueryui : '../vendor/jqueryui/jquery-ui.min'
    },
	shim:{
		'raty':{
			deps:['jquery'],
			exports:'raty'
		},
		'bootstrap' :{
			deps : ['jquery'],
			exports : 'bootstrap'
		}
	}
});
define(['jquery','app/app'],
function   ($) {
	Backbone.history.start();

});