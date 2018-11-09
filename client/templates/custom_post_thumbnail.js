Template.post_thumbnail.onCreated(function () {
  var instance = this;
  instance.showVideo = new ReactiveVar(false);
});

Template.post_thumbnail.helpers({
  postLink: function () {
    return !!this.media ? Posts.getLink(this) : "#";
  },
  target: function () {
    return !!this.url? "_blank" : "";
  },
  playVideoClass: function () {
    return !!this.media ? 'post-thumbnail-has-video': '';
  },
  playVideoIcon: function () {
    return !!this.media ? 'post-thumbnail-play-video-icon': '';
  },
  showVideo: function () {
    return Template.instance().showVideo.get();
  },
  isPage: function(page) {
    var currentPath = Router.current().location.get().path;
    return currentPath.indexOf('/' + page) === 0;
  },
  isStory: function() {
    return GlobalVars.currentCategoryView.indexOf(STORIES_CATEGORY) !== -1;
  }
});

Template.post_thumbnail.events({
  'click .post-thumbnail-has-video': function (e, instance) {

    e.preventDefault();
    instance.showVideo.set(true);

    // use Meteor.defer to make sure the elements are rendered by Blaze
    Meteor.defer(function () {
      $('body').addClass('showing-lightbox');
      $(e.target).parents('.post').find('.post-video-lightbox').fadeIn('fast');
      $(".js-video").fitVids();
    });
  },
  'click .post-video-lightbox-hide, click .post-video-lightbox': function (e, instance) {
    e.preventDefault();
    $(e.target).parents('.post').find('.post-video-lightbox').fadeOut('fast');
    $('body').removeClass('showing-lightbox');

    Meteor.defer(function () {
      instance.showVideo.set(false);
    });
    }
});
