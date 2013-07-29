// Todo Router

define('router/app', [
	'backbone'
	], 
function(Backbone) {

	var Workspace = Backbone.Router.extend({

		routes: {
			'*filter': 'setFilter'
		},


		setFilter: function(param) {
			// Set the current filter to be used
			if (param) {
				param = param.trim();
			}
			app.TodoFilter = param || '';

			// Trigger a colletion filter event, causing hiding/unhiding
			// of Todo View items
			app.TodoList.trigger('filter')
		}
	});

	return Workspace;


});