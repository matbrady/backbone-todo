// TodoApp View

define('view/app', [
	'jquery',
	'underscore',
	'backbone',
	'app/shared',
	'collection/todos',
	'view/todo'
	],
function($, _, Backbone, app, TodoList, TodoView) {
	// Our Overall **AppView** si the top-level piece of UI.

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
		initialize: function() {
			this.allCheckbox = this.$('#toggle-all')[0];
			this.$input = this.$('#new-todo');
			this.$footer = this.$('.footer');
			this.$main = this.$('#main');

			this.listenTo( app.TodoList, 'add', this.addOne);
			this.listenTo( app.TodoList, 'reset', this.addAll);

			this.listenTo( app.TodoList, 'change:completed', this.filterOne);
			this.listenTo( app.TodoList, 'filter', this.filterAll);
			this.listenTo( app.TodoList, 'all', this.render);

			app.TodoList.fetch();
		},


		// Re-rendering the App just means refreshing the statistics -- the rest 
		// of the app doesn't change.
		render: function() {
			var completed = app.TodoList.completed().length;
			var remaining = app.TodoList.remaining().length;

			if ( app.TodoList.length ) {
				this.$main.show();
				this.$footer.show();

				this.$footer.html( this.statsTemplate({
					completed: completed,
					remaining: remaining
				}));

				this.$('#filters li a')
					.removeClass('selected')
					.filter('[href="#/' + ( app.TodoFilter || '' ) + '"]')
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
			app.TodoList.each( this.addOne, this);
		},


		filterOne: function( todo ) {
			todo.trigger('visible');
		},


		filterAll: function() {
			app.TodoList.each( this.filterOne, this);
		},


		// Generate the attributes for a new Todo Item
		newAttributes: function() {
			return {
				title: this.$input.val().trim(),
				order: app.TodoList.nextOrder(),
				completed: false
			};
		},


		// If you hit return in the main input field, create new Todo model,
		// presisting it to localStorage.
		createOnEnter: function( evt ) {
			if ( evt.which !== app.ENTER_KEY || !this.$input.val().trim() ) {
				return;
			}

			app.TodoList.create( this.newAttributes() );
			this.$input.val('');

		},

		// Clear all completed todo items, destroying their models.
		clearCompleted: function() {
			_.invoke( app.TodoList.completed(), 'destroy');

			return false;
		},


		toggleAllCompleted: function() {
			var completed = this.allCheckbox.checked;

			app.TodoList.each( function( todo ) {
				todo.save({
					'completed': completed
				});
			});
		}
	});

	return AppView;
});