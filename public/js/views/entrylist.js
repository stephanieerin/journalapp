window.EntryListView = Backbone.View.extend({

	initialize: function(){
		this.render();
	},

	render: function() {
		var entries = this.model.models;
		$(this.el).html('<ul class="thumbnails"></ul>');

		for (var i = entries.length - 1; i >= 0; i--) {
			$('.thumbnails', this.el).append(new EntryListItemView({model: entries[i]}).render().el);
		}

		return this;
	}
});

window.EntryListItemView = Backbone.View.extend({

	tagName: "li",

	initialize: function() {
		this.model.bind("change", this.render, this);
		this.model.bind("destroy", this.close, this);
	},

	render: function(){
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});