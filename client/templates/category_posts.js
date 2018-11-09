Template.category_posts.helpers({
  arguments: function() {
    return {
      terms: {
        view: 'top',
        limit: 10,
        categoryType: GlobalVars.currentCategoryView
      }
    }
  }
});
