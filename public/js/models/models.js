window.Entry = Backbone.Model.extend({

	urlRoot: "/entries",

	idAttribute: "_id",

	initialize: function(){
		//Validators go here? not using these
	},

	defaults: {
		_id: null,
		title: "",
		body: "",
		date: ""
	}

});

window.EntryCollection = Backbone.Collection.extend({

	model: Entry,
	url: "/entries"

});