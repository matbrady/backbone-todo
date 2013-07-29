// Todo Model
define('demo/model.todo', ['backbone'], function(Backbone) {

	// Define a Todo Model
	var Todo = Backbone.Model.extend({
		// Default todo attributes values
		defaults: {
			title: '',
			completed: false
		},


		validate: function( attribs ) {
			console.log( attribs );
			if ( attribs.title.length < 5 ) {
				return 'Your title should be long than 5 letters ';
			}
		},


		initialize: function() {

			this.on('change', function() {
				// console.log( this.toJSON() );
			});

			this.on('invalid', function(model, error) {
				console.error(error);
			});

		}
	});

	// Example Creation
	// var myTodo = new Todo({
	// 	title: "This is my first Todo"
	// });

	return Todo;
});