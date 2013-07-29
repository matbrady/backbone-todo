/** Todo Application'
*
*	Appliaction Architecture
* - a Todo model to describe individual todo items
* - a TodoList collection to store and persist todos
* - a way of creating todos
* - a way to display a listing of todos
* - a way to edit existing todos
* - a way to mark a todo as completed
* - a way to delete todos
* - a way to filter the items that have been completed or are remaining
*/
define('app/todo', [
	'jquery',
	'backbone',
	'underscore',
	'router/app',
	'view/app'
	],

function($, Backbone, _, AppRouter, AppView ) {

	var app = app || {};

	app.Router = new AppRouter();
	
	app.AppView = new AppView();

	return;

});