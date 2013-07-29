// Todo Model

define('model/todo', [
	'backbone'
	], 
function(Backbone) {

	var TodoModel = Backbone.Model.extend({

		// Default attributes that each todo created ahs 'title' and 'completed' keys.
		defaults: {
			title: '',
			completed: false
		},

		// Toggle to 'completed' state of this todo item.
		toggle: function() {
			this.save({
				completed: !this.get('completed')
			})
		}
	});

	return TodoModel;

});