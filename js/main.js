requirejs.config({
	baseUrl: 'vendor',
    paths: {
        app: '../js',
		templates : '../templates',
		vendor : '../vendor',
		bootstrap : '../vendor/bootstrap/js/bootstrap',
		marionette : '../vendor/backbone/backbone.marionette',
		backbone : '../vendor/backbone/backbone',
		view : '../js/view'
    },
	shim:{
		'raty':{
			deps:['jquery'],
			exports:'raty'
		},
	}
});
define(['jquery','app/app'],
function   ($) {
	Backbone.history.start();

});