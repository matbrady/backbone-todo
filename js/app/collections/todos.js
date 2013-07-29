// TodoList Colection

define('collection/todos', [
	'backbone',
	'localstorage',
	'model/todo'
	], 
function( Backbone, LocalStorage, TodoModel ) {

	// The collection of todos is backed by *localStorage* instead fo a remote server
	var TodoList = Backbone.Collection.extend({

		// Reference to this collection's model.
		model: TodoModel,

		// Save all of the todo items under the `"todos-backbone"` namespace.
		localStorage: new Backbone.LocalStorage('todo-backbone'),

		// Filter down the list of all todo items that are finished.
		completed: function() {
			return this.filter( function( todo ) {
				return todo.get('completed');
			});
		},

		// Filter down the lisst of only todo items that are still not finsihed. 
		remaining: function() {
			return this.without.apply( this, this.completed() );
		},

		// We keep the Todos in sequential order, despite being saved by unordered
		// GUID in the database. This generates the next order number for new items.
		nextOrder: function() {
			if ( !this.length ) {
				return 1;
			}
			return this.last().get('order') + 1;
		},

		// Todos are sorted by their original insertion order.
		comarator: function() {
			return todo.get('order');
		}
		
	});

	// Example Creation
	// var Todos = new TodoList();

	return TodoList;
	
});