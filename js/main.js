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
		jqueryui : '../vendor/jqueryui/jquery-ui.min',
		slickgrid : '../vendor/slickgrid',
		grid : '../vendor/slickgrid/slick.grid',
		sider: '../vendor/sider/jquery.sidr.min'
    },
	shim:{
		'raty':{
			deps:['jquery'],
			exports:'raty'
		},
		'bootstrap' :{
			deps : ['jquery'],
			exports : 'bootstrap'
		},
		
		'grid' : {
			deps : ['jquery','jqueryui','vendor/jquery.event.drag-2.2','slickgrid/slick.core'],
			exports: 'slickgrid'
		},
		'sidr' : {
			deps : ['jquery']
		}
	}
});
define(['jquery','app/app'],
function   ($) {
	Backbone.history.start();

});