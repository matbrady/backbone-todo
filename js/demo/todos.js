// Todos.js
define('demo/todos', ['jquery', 'backbone', 'demo/model.todo', 'demo/view.todo'], function($, Backbone, Todo, TodoView) {

	// Instanciate the Todo Model with the a title, allowing completed attributes
	// to dafault to false
	window.myTodo = new Todo({
		title: "This is my first Todo",
		completed: true
	});

	window.todoView = new TodoView({
		model: myTodo
	});

	return myTodo;

});