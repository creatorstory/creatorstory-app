Template.upcoming_stories.helpers({
  arguments: function() {
    return {
      terms: {
        limit: 5,
        view: 'pending'
      }
    }
  }
});
