window.EntryView = Backbone.View.extend({

	initialize: function() {
		this.render();
	},

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},

	events: {
		"change"	: "change",
		"click .save"	: "saveEntry",
		"click .delete"	: "deleteEntry", 
	},

	change: function(event){
		utils.hideAlert();

		var target = event.target;
		var change = {};
		change[target.name] = target.value;
		this.model.set(change);
	},

	saveEntry: function(){
		var self = this;
		// console.log('before save');
		this.model.save(null, {
			success: function (model) {
				// console.log('saving!');
				self.render();
				app.navigate('entries/' + model.id, false);
				utils.showAlert('Success!', 'Entry saved successfully', 'alert-success');
			},
			error: function(){
				utils.showAlert('Error', 'An error occurred while trying to save this item', 'alert-error');
			}
		});
	},

	deleteEntry: function(){
		this.model.destroy({
			success: function(){
				window.history.back();
			},
			error: function() {
				utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
			}
		});
		return false;
	}
});