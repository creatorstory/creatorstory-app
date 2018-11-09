Template.pages_menu.helpers({
  hasPages: function () {
    return Pages.find().count();
  },
  menuItems: function () {
    var menuItems = _.map(Pages.find().fetch(), function (page) {
      return {
        route: function () {
          //XXX: TODO: implemente the routing correctly here.
          return "/page/" + page.slug;
        },
        label: page.title
      };
    });
    return menuItems;
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

