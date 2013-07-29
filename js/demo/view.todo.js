// TodoView

define('demo/view.todo', ['jquery', 'backbone', 'underscore'], function($, Backbone, _) {

	var TodoView = Backbone.View.extend({

		tagName: 'li',

		// Cache the template function for a single item.
		todoTpl: _.template( $('#item-template').html() ),


		events: {
			'dblclick label': 'edit',
			'keypress .edit': 'updateOnEnter',
			'blur .edit': 'close'
		},


		// Called when the view is first created
		initialize: function() {
			this.$el = $('#todo');

			// Later 
			// this.listenTo( someCollection, 'all', this.render );
			// Now
			this.render();
		},


		// Re-render the titles of the todo item.
		render: function() {
			this.$el.html( this.todoTpl( this.model.toJSON() ) );
			this.input = this.$('.edit');
			return this;
		},


		edit: function() {
			// exectued when the todo label is double clicked
		},


		close: function() {
			// executed when todo loses focus
		},


		updateOnEnter: function( e ) {
			// executed on each keypress when in todo edit mode,
			// but we'll wait for enter to get in action
		}

	});

	// Example Creation
	// var todoView = new TodoView( {model: myTodo} );


	return TodoView;
});