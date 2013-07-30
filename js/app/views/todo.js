// Todo View

define('view/todo', [
	'jquery',
	'backbone',
	'underscore',
	'app/shared'
	],
function($, Backbone, _, app) {

	var TodoView = Backbone.View.extend({

		//... is a list.
		tagName: 'li',


		// Chache the template function for a single item.
		template: _.template( $('#item-template').html() ),


		// The DOM events specific to an item.
		events: {
			'click .toggle': 'toggleCompleted',
			'dblclick label': 'edit',
			'click .destroy': 'clear',
			'keypress .edit': 'updateOnEnter',
			'blur .edit': 'close'
		},


		// The TodoView Listens for changes to its model, re-rendering. Since. there's
		// a one-to-one correspondence between a **Todo** and a **TodoView** in this
		// app, we set a direct reference on the model for convience.
		initialize: function() {
			this.listenTo( this.model, 'change', this.render );
			this.listenTo( this.model, 'destroy', this.remove);
			this.listenTo( this.model, 'visible', this.toggleVisible );
		},


		// Re-renders the titles of the todo item.
		render: function() {
			this.$el.html( this.template(this.model.toJSON() ) );
			this.$input = this.$('.edit');
			return this;
		},


		// Toggle visibility of items
		toggleVisible: function() {
			this.$el.toggleClass( 'hidden', this.isHidden() ); 
		},


		// Determines if item should be hidden
		isHidden: function() {
			var isCompleted = this.model.get('completed');
			return (
				(!isCompleted && app.TodoFilter === 'completed') ||
				(isCompleted && app.TodoFilter === 'active')
			);
		},


		// Toggle the `"completed"` state of the model.
		toggleCompleted: function() {
			this.model.toggle();
		},


		// Switch this view into `"editing"` mode, displaying the input field.
		edit: function() {
			this.$el.addClass('editing');
			this.$input.focus();
		},


		// Close the `"editing"` mode, saving changes to the todo.
		close: function() {
			var value = this.$input.val().trim();

			if ( value ) {
				this.model.save({title: value});
			}

			this.$el.removeClass('editing');
		},


		// If you hit `enter`, we're through editing the item.
		updateOnEnter: function( evt ) {
			if ( evt.which === app.ENTER_KEY ) {
				this.close();
			}
		},


		// Remove the item, destroy the model from *localstorage* and delete its view.
		clear: function() {
			this.model.destroy();
		}
	});

	return TodoView;
});