Template.post_title.helpers({
  postLink: function(){
    return Posts.getLink(this);
  },
  postTarget: function() {
    return !!this.url ? '_blank' : '';
  },
  isPage: function(page) {
    var currentPath = Router.current().location.get().path;
    return currentPath.indexOf('/' + page) === 0;
  },
  isDiscussion: function() {
    var categoryId = this.categories[0];
    var category = Categories.findOne(categoryId);
    var categoryName = category.slug.split("-").splice(-1)[0];
    return categoryName === "discussions";
  }
});
