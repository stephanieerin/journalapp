var AppRouter = Backbone.Router.extend({
	routes: {
		"entries" : "list",
		"entries/add" : "addEntry",
		"entries/:id" : "viewEntry",
		"about" : "about",
		"import" : "import"
	},

	initialize: function(){
		this.headerView = new HeaderView();
		$('.header').html(this.headerView.el);
	},

	home: function(){
		if(!this.homeView){
			this.homeView = new HomeView();
		}
		$('#content').html(this.homeView.el);
		this.headerView.selectMenuItem('home-menu');
	},

	list: function(){
		var entryList = new EntryCollection();
		entryList.fetch({success: function(){
			$('#content').html(new EntryListView({model: entryList}).el);
		}});
		this.headerView.selectMenuItem('home-menu');
	},

	viewEntry: function(id){
		var entry = new Entry({_id: id});
		entry.fetch({success: function(){
			$('#content').html(new EntryView({model: entry}).el);
		}});
		this.headerView.selectMenuItem();
	},

	addEntry: function(){
		var entry = new Entry();
		$('#content').html(new EntryView({model: entry}).el);
		this.headerView.selectMenuItem('add-menu');
	},

	about: function(){
		if(!this.aboutView){
			this.aboutView = new AboutView();
		}
		$('#content').html(this.aboutView.el);
		this.headerView.selectMenuItem('about-menu');
	},

	import: function() {
		var entry = new Entry();
		$('#content').html(new ImportView({model: entry}).el);
		this.headerView.selectMenuItem('import-menu');
	}
});

utils.loadTemplate(['HomeView', 'HeaderView', 'EntryView', 'EntryListItemView', 'AboutView', 'ImportView', 'ImportListItemView'], function() {
	app = new AppRouter();
	Backbone.history.start();
});