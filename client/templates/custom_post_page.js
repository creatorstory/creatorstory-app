Template.post_page.helpers({
  isPending: function () {
    return this.post && this.post.status === Posts.config.STATUS_PENDING;
  },
  isStory: function() {
    var categoryId = this.categories[0];
    var category = Categories.findOne(categoryId);
    var categoryName = category.slug.split("-").splice(-1)[0];
    return categoryName === "stories";
  }
});

Template.post_page.rendered = function(){
  $('body').scrollTop(0);
};
