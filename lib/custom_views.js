/********************
 * Helpers
 ********************/
var getCategories = function(categoryType) {
  if(_.isUndefined(categoryType)) {
    categoryType = STORIES_CATEGORY;
  }
  var categoryRegex = new RegExp(categoryType + "$");
  var categories = _.map(Categories.find({slug: {$regex: categoryRegex}}, {sort: {order: 1, name: 1}}).fetch(), function (category) {
    return category._id;
  });
  return categories;
};

var isUserLoggedIn = function() {
  return !!Meteor.user();
};

/********************
 * Top
 ********************/
Posts.views.add("top", function (terms) {
  var categories = getCategories(terms.categoryType);
  return {
    find: {
      categories: { $in: categories }
    },
    options: {
      sort: {sticky: -1, score: -1}
    }
  };
});

/********************
 * New
 ********************/
Posts.views.add("new", function (terms) {
  var categories = getCategories(terms.categoryType);
  return {
    find: {
      categories: { $in: categories }
    },
    options: {
      sort: {sticky: -1, postedAt: -1}
    }
  };
});

/********************
 * Best
 ********************/
Posts.views.add("best", function (terms) {
  var categories = getCategories(terms.categoryType);
  return {
    find: {
      categories: { $in: categories }
    },
    options: {
      sort: {sticky: -1, baseScore: -1}
    }
  };
});

/********************
 * Daily
 ********************/
Posts.views.add("singleday", function (terms) {
  var categories = getCategories(terms.categoryType);
  return {
    find: {
      postedAt: {
        $gte: terms.after,
        $lt: terms.before
      },
      categories: { $in: categories }
    },
    options: {
      sort: {sticky: -1, baseScore: -1}
    }
  };
});

/********************
 * Upcoming
 ********************/
Posts.controllers.upcomingStories = Posts.controllers.list.extend({
  template: 'upcoming_stories'
});

Router.route('/upcomingStories', {
  name: 'upcomingStories',
  controller: Posts.controllers.upcomingStories
});

Telescope.menuItems.add("viewsMenu", {
  route: 'upcomingStories',
  label: 'Upcoming',
  description: 'upcoming_stories_view'
});


/********************
 * Category Posts
 ********************/
Posts.controllers.categoryPosts = Posts.controllers.list.extend({
  showViewsNav: true
});

Router.route('/category/:category', {
  name: 'subcategory_posts',
  template: 'category_posts',
  controller: Posts.controllers.categoryPosts,
  onBeforeAction: function() {
    var category = this.params.category;
    GlobalVars.currentCategoryView = category;
    Router.go('postsDaily');
  }
});

/********************
 * Category Posts
 ********************/

Router.onBeforeAction(function () {
  // skip custom actions when user is not loggedIn
  if(Meteor.isServer || !isUserLoggedIn()) {
    this.next();
    return;
  }
  var currentRouterName = Router.current().route.getName();
  if (currentRouterName === 'posts_default') {
    // set current view to story category
    GlobalVars.currentCategoryView = STORIES_CATEGORY;
    Router.go('postsDaily');
  } else if(_.contains(['posts_top','posts_new','posts_best'], currentRouterName)) {
    // get current view
    var currentView = currentRouterName.split('_').pop();
    // rerender posts template
    this.render('posts_list_controller', {
      data: {
        terms: {
          view: currentView,
          limit: 10,
          categoryType: GlobalVars.currentCategoryView
        }
      }
    });
  } else {
    this.next();
  }
});
