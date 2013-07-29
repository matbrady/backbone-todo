// List View
define('demo/view.list', ['jquery', 'backbone', 'underscore'], function($, Backbone, _) {

	var ListView = Backbone.View.extend({

		render: function() {

			// Assume our model exposes the items we will
			// display in out list
			var items = this.model.get('items');

			// Loop through each of our items using the Underscore 
			// _.each iterator
			_.each( items, function(item) {

				// Create a new instance of teh todoView, passing
				// it a specific model item
				var todoView = new ItemView( {model: item} );

				// The itemView's DOM element is appended after it 
				// has been rendered. Here, the 'return this' is helpful
				// as the todoView renders its model. Later, we ask for 
				// its output ("el")
				this.$el.append( todoView.render().el );
				
			}, this);
		}

	});

	return ListView;

});