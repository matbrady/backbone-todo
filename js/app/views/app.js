// TodoApp View

define('view/app', [
	'jquery',
	'underscore',
	'backbone',
	'collection/todos',
	'view/todo'
	],
function($, _, Backbone, TodoList, TodoView) {
	// Our Overall **AppView** si the top-level piece of UI.

	var ENTER_KEY = 13;


	var AppView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of 
		// the App already present in the HTML.
		el: '#todoapp',


		// Our template for the line of statistics at the bottom of the app.
		statsTemplate: _.template( $('#stat-template').html() ),

		// Delegate events for creating new items, and clearing completed ones.
		events: {
			'keypress #new-todo': 'createOnEnter',
			'click #clear-completed': 'clearCompleted',
			'click #toggle-all': 'toggleAllCompleted'
		},


		// At initialization we bind to the relevent events on the 'Todos'
		// collection, when items are added or changed. Load any preexisting
		// todos that might be saved in *localStorage*.
		initialize: function( ) {
			this.TodoList = new TodoList();

			this.allCheckbox = this.$('#toggle-all')[0];
			this.$input = this.$('#new-todo');
			this.$footer = this.$('.footer');
			this.$main = this.$('#main');

			this.listenTo( this.TodoList, 'add', this.addOne);
			this.listenTo( this.TodoList, 'reset', this.addAll);

			this.listenTo( this.TodoList, 'change:completed', this.filterOne);
			this.listenTo( this.TodoList, 'filter', this.filterAll);
			this.listenTo( this.TodoList, 'all', this.render);

			this.TodoList.fetch();
		},


		// Re-rendering the App just means refreshing the statistics -- the reset 
		// of the app doesn't change.
		render: function() {
			var completed = this.TodoList.completed().length;
			var remaining = this.TodoList.remaining().length;

			if ( this.TodoList.length ) {
				this.$main.show();
				this.$footer.show();

				this.$footer.html( this.statsTemplate({
					completed: completed,
					remaining: remaining
				}));

				this.$('#filters li a')
					.removeClass('selected')
					.filter('[href="#/' + ( TodoFilter || '' ) + '"]')
					.addClass('selected');
			} else {
				this.$main.hide();
				this.$footer.hide();
			}

			this.allCheckbox.checked = !remaining;
		},


		// Add a single todo item to the list by creating a ciew for it, and
		// appending its element to the '<ul>'.
		addOne: function( todo ) {
			var view = new TodoView({model: todo});
			$('#todo-list').append( view.render().el );
		},


		// Add all items in the **Todo** collection at once.
		addAll: function() {
			this.$('#todo-list').html('');
			this.TodoList.each( this.addOne, this);
		},


		filterAll : function() {
			this.TodoList.each( this.filterOne, this);
		},

		// Generate the attributes for a new Todo Item
		newAttributes: function() {
			return {
				title: this.$input.val().trim(),
				order: this.TodoList.nextOrder(),
				completed: false
			};
		},


		// If you hit return in the main input field, create new Todo model,
		// presisting it to localStorage.
		createOnEnter: function( evt ) {
			if ( evt.which !== ENTER_KEY || !this.$input.val().trim() ) {
				return;
			}

			this.TodoList.create( this.newAttributes() );
			this.$input.val('');

		},

		// Clear all completed todo items, destroying their models.
		clearCompleted: function() {
			_.invoke( this.TodoList.completed(), 'destroy');

			return false;
		},


		toggleAllCompleted: function() {
			var completed = this.allCheckbox.checked;

			this.TodoList.each( function( todo ) {
				todo.save({
					'completed': completed
				});
			});
		}
	});

	return AppView;
});