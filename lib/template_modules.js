// Hide or remove features
Telescope.modules.remove("postComponents", 'post_rank');
Telescope.modules.remove("postHeading",'post_domain');
Telescope.modules.remove("primaryNav", 'categories_menu');
Telescope.modules.remove("mobileNav", 'categories_menu');
Telescope.modules.remove("profileDisplay", 'user_downvoted_posts');

// Add menus to left side panel for normal and mobile formats
Telescope.modules.add("primaryNav", {
  template: "stories_menu",
  order: 1
});
Telescope.modules.add("primaryNav", {
  template: "discussions_menu",
  order: 2
});

Telescope.modules.add("mobileNav", {
  template: "stories_menu",
  order: 1
});
Telescope.modules.add("mobileNav", {
  template: "discussions_menu",
  order: 2
});

//add pages menu as list
Telescope.modules.remove("primaryNav", "pages_menu");
Telescope.modules.add("secondaryNav", {
  template: "pages_menu",
  order: 1
});

//add post submit header to "top" zone
Telescope.modules.add("top", {
	template: "post_submit_header",
	order: 1
});

Telescope.modules.removeAll("postMeta");
Telescope.modules.add("postThumbnail", {
  template: 'svg_palomar',
  order: 20
});

Telescope.modules.add("postMeta", [
  {
    template: 'post_tagline',
    order: 1
  },
  {
    template: 'post_info',
    order: 10
  },
  {
    template: 'post_comments_link',
    order: 30
  },
  {
    template: 'post_admin',
    order: 40
  }
]);
