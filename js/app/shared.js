// App Namespace

define('app/shared', [
	'collection/todos'
	], 
function( TodoList ) {

	var app = app || {
		ENTER_KEY: 13,
		TodoList: new TodoList()
	};

	return app;
});