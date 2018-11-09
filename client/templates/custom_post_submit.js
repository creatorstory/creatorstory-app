CATEGORY_TYPE_MAP = {
  'story': 'stories',
  'discussion': 'discussions'
}
DEFAULT_CATEGORY_TYPE = 'story'

ReactiveTabs.createInterface({
  template: 'basicTabs',
  onChange: function (slug, template) {
    // update active tab
    var type = CATEGORY_TYPE_MAP[slug || DEFAULT_CATEGORY_TYPE];
    Session.set('activeTab', slug);
  }
});

Template.post_submit.helpers({
  tabs: function () {
    // initialize active tab
    Session.set('activeTab', DEFAULT_CATEGORY_TYPE);

    // tab label structure
    return [
      { name: 'Story', slug: 'story' },
      { name: 'Discussion', slug: 'discussion' }
    ];
  },
  isActiveTab: function(tagName) {
    var currentTagName = Session.get('activeTab');
    return currentTagName === tagName;
  },
  params: function() {
    var slug = Session.get('activeTab');
    return { slug: slug, category: CATEGORY_TYPE_MAP[slug] };
  }
});

Template.post_submit.events({
  'change input[name=url]': function(event) {
    var siteUrl = event.target.value;
    if(siteUrl) {
      // FIXME: do this on the server-side via new endpoint /thumbnail
      var embedlyKey = Settings.get('embedlyKey') || '76288e59b80d4cb698c1163458207db8';
      var embedlyUrl = 'http://api.embed.ly/1/extract?' +
      'key=' + embedlyKey + '&url=' + siteUrl;

      $.ajax(embedlyUrl).done(function(data) {
        $('input[name=title]').val(data['title'])
        $('textarea[name=body]').val(data['description'])
      });
    }
  },
});
