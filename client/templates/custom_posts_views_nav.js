var getMenuItems = function () {
  var defaultItems = Telescope.menuItems.get("viewsMenu");

  // reject an item if the item is admin only and the current user is not an admin
  // or if views have been configured in the settings and the item is not part of them
  var viewableItems = _.reject(defaultItems, function (item) {
    return (item.adminOnly && !Users.is.admin(Meteor.user())) || (!!Settings.get('postViews') && !_.contains(Settings.get('postViews'), item.route));
  });

  // custom filtering
  viewableItems = _.reject(viewableItems, function (item) {
    var isUpcomingDiscussion = (
      GlobalVars.currentCategoryView.match(/discussions$/) &&
      item.label === 'Upcoming'
    )
    return isUpcomingDiscussion;
  });

  return viewableItems;
};

Template.posts_views_nav.helpers({
  menuItems: function () {
    return getMenuItems();
  },
  showNav: function () {
    // only show menu when we're on the right pages, and there are at least 2 items
    return !!Router.current().showViewsNav && getMenuItems().length >= 2;
  },
  isUserInvited: function () {
    return !!Meteor.user() && Meteor.user().telescope.isInvited;
  }
});
