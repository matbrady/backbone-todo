// List View
define('demo/view.list', ['jquery', 'backbone', 'underscore'], function($, Backbone, _) {

	events: {},


	render: function() {
		this.$el.html( this.template( this.model.attributes ) );
		return this;
	}

});