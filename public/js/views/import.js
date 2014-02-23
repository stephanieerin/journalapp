window.ImportView = Backbone.View.extend({

	initialize: function(){
		this.render();
	},

	render: function() {
		$(this.el).html(this.template());
		return this;
	},

	events: {
		"click .import" : "importSelected",
		"change #file" : "process",
		"click .cancel" : "cancel"
	},

	process: function(event){
		var files = event.target.files;
		var output = [];
		if(files){
			for (var i = 0, f; f = files[i]; i++) {

				var r = new FileReader();

				r.onload = (function(theFile) {
					return function(e){
						var m = {
							title: theFile.name,
							body: e.target.result
						};
						$('.files', this.el).append(new ImportListItemView({model: m}).render().el);
					}
				})(f);
				r.readAsText(f);
			}
		}

	},

	importSelected: function(){
		var selected = $('.selected');
		for (var i = selected.length - 1; i >= 0; i--) {
			var s = selected[i].children;
			var title = s[0].innerHTML;
			title = title.substr(0, title.length - 4);
			var d = new Date(title);
			var m = {
				title: "Import: " + title,
				date: d.toDateString(),
				body: s[1].innerHTML
			};
			this.saveImport(m);
		};
		app.navigate('entries', true);
	},

	cancel: function() {
		window.history.back();
		return false;
	},

	saveImport: function(m){
		var self = this;
		this.model.set(m);
		// console.log('before save');
		this.model.save(null, {
			success: function (model) {
				// console.log('saving!');
				//self.render();
				//alert('Success!', 'Entry saved successfully', 'alert-success');
			},
			error: function(){
				alert('Error', 'An error occurred while trying to save this item', 'alert-error');
			}
		});
	},

});

window.ImportListItemView = Backbone.View.extend({
	
	tagName: 'li',

	events: {
		"click .importItem" : "toggleSelect"
	},

	initialize: function(){
		this.render();
	},

	toggleSelect: function(event){
		if(event.target.nodeName === "H5" || event.target.nodeName === "P"){
			event.target = event.target.parentElement;
		} 	

		var classList = event.target.classList;
		if(classList.contains("selected")){
			classList.remove('selected');
			classList.remove('text-success');
		} else {
			classList.add('selected');
			classList.add("text-success");
		}
	},

	render: function(){
		$(this.el).html(this.template(this.model));
		return this;
	}
})