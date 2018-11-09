/******************
* Hook Handlers
*******************/
function beforePostSubmitClient(modifier, post) {
	// set the right value for the category type
	var oldCategories = modifier.categories;
  if(oldCategories) {
	  modifier.categories = [ oldCategories.substr(0, oldCategories.indexOf(':')) ];
  }
	return modifier;
}

function beforePostEditClient(modifier, post) {
	// set the right value for the category type
	var oldCategories = modifier.$set.categories;
  if(oldCategories) {
	  modifier.$set.categories = [ oldCategories.substr(0, oldCategories.indexOf(':')) ];
  }
	return modifier;
}

function autoAuthorizeDiscussionPosts(post) {
  var categoryId = post.categories[0];
  var category = Categories.findOne(categoryId);
  var categoryName = category.slug.split('-').pop();

	// auto approve posts categorised as discussions
  if(categoryName === 'discussions') {
    var set = {
      status: Posts.config.STATUS_APPROVED,
      thumbnailUrl: ''
    };
    set.postedAt = new Date();
    Posts.update(post._id, {$set: set}, {validate: false});
    Telescope.callbacks.runAsync("postApprovedAsync", post);
  }
}


/***************************
* Hooks Declaration
****************************/
Telescope.callbacks.add("postSubmitClient", beforePostSubmitClient);
Telescope.callbacks.add("postSubmitAsync", autoAuthorizeDiscussionPosts);
Telescope.callbacks.add("postEditClient", beforePostEditClient);
