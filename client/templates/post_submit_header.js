//XXX: TODO: re-factor this code...variables repeaded on every function, inneficient...
Template.post_submit_header.helpers({
	header: function () {
		var currentPath = Router.current().location.get().path;
		var currentTabName = Session.get('activeTab');
		if (currentPath === "/submit") {
			return "Post a new " + currentTabName;
		} else {
			return ;
		}
		},
		subheader: function () {
		var currentPath = Router.current().location.get().path;
		var currentTabName = Session.get('activeTab');
		if (currentPath === "/submit") {
			if (currentTabName === "story") {
				return "Found a new creative project awesome? Post it to creatorstory!";
			} else {
				return "High quality community, high quality discussions!";
			}
		} else {
			return ;
		}
	}
});

