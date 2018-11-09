Meteor.startup(function () {
  Template.stories_menu.helpers({
    hasCategories: function () {
      return Categories.find().count();
    },
    menuItems: function () {
      var menuItems = _.map(Categories.find({slug: {$regex: /stories$/}}, {sort: {order: 1, name: 1}}).fetch(), function (category) {
        return {
          route: function () {
            return Categories.getUrl(category.slug);
          },
          label: category.name
        };
      });
      // include All item on mobile devices
      if (!!this.mobile && menuItems.length > 1) {
        menuItems.unshift({                         //ps: used the .unshift method here instead of .push to add the item to the beginning of the array
          route: function() {
            return "/category/stories";
          },
          label: "All"
        });
      }
      return menuItems;
    },
    menuLabel: function() {
      return "stories_posts"
    },
    menuMode: function () {
      if (!!this.mobile) {
        return 'list';
      } else if (Settings.get('navLayout', 'top-nav') === 'top-nav') {
        return 'dropdown';
      } else {
        return 'accordion';
      }
    }
  });
});
