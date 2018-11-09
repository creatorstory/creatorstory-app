// Form Field Settings
MAX_TITLE_SIZE = 55;
MAX_BODY_SIZE = 55;
MAX_BODY_ROWS = 5;

if(Meteor.isClient) {

  function findCategoryName() {
    var routerName = Router.current().route.getName();
    if(routerName === "post_submit") {
      var params = AutoForm.getCurrentDataForForm().params;
      return params.category;
    } else if(routerName === "post_edit") {
      var postId = Router.current().url.match(/posts\/(.*)\//)[1];
      var categoryId = Posts.findOne(postId).categories[0];
      var categorySlug = Categories.findOne(categoryId).slug;
      return categorySlug.split('-').pop();
    }
  }

  function findCategorySlug() {
    var routerName = Router.current().route.getName();
    if(routerName === "post_submit") {
      var params = AutoForm.getCurrentDataForForm().params;
      return params.slug;
    } else if(routerName === "post_edit") {
      var postId = Router.current().url.match(/posts\/(.*)\//)[1];
      var categoryId = Posts.findOne(postId).categories[0];
      return Categories.findOne(categoryId).slug;
    }
  }

  Posts.addField({
    fieldName: 'categories',
    fieldSchema: {
      type: [String],
      optional: false,
      editableBy: ["member", "admin"],
      autoform: {
        type: "select-radio",
        options: function () {
          var categoryName = findCategoryName();
          var categories = Categories.find({slug: {$regex: categoryName + "$"}}).map(function (category) {
            return {
              value: category._id + ":" + category.slug,
              label: category.name
            };
          });
          return categories;
        }
      }
    }
  });

  Posts.addField({
    fieldName: 'body',
    fieldSchema: {
      type: String,
      label: function() {
        var slug = findCategorySlug();
        switch(slug) {
          case 'story': return 'Tagline';
          case 'discussion': return 'Description';
          default: return;
        }
      },
      optional: true,
      editableBy: ["member", "admin"],
      max: function() {
        var slug = findCategorySlug();
        switch(slug) {
          case 'story': return MAX_BODY_SIZE;
          case 'discussion': return;
          default: return;
        }
      },
      autoform: {
        rows: function() {
          var slug = findCategorySlug();
          switch(slug) {
            case 'story': return;
            case 'discussion': return MAX_BODY_ROWS;
            default: return;
          }
        },
        placeholder: function() {
          var slug = findCategorySlug();
          switch(slug) {
            case 'story': return "Describe the project briefly (max " + MAX_BODY_SIZE + " characters)";
            case 'discussion': return 'Describe the discussion briefly';
            default: return "";
          }
        },
        omit: false
      }
    }
  });

  Posts.addField({
    fieldName: 'title',
    fieldSchema: {
      type: String,
      optional: false,
      editableBy: ["member", "admin"],
      max: MAX_TITLE_SIZE,
      autoform: {
        placeholder: function() {
          var slug = findCategorySlug();
          switch(slug) {
            case 'story': return "Enter the creative project's title (max " + MAX_TITLE_SIZE + " characters)";
            case 'discussion': return "Enter a brief discussion title (max " + MAX_TITLE_SIZE + " characters)";
            default: return "";
          }
        },
        omit: false
      }
    }
  });

  Posts.addField({
    fieldName: 'url',
    fieldSchema: {
      type: String,
      label: 'Link',
      optional: function() {
        var slug = findCategorySlug();
        switch(slug) {
          case 'story': return false;
          case 'discussion': return true;
          default: return false;
        }
      },
      editableBy: ["member", "admin"],
      autoform: {
        type: "bootstrap-url",
        placeholder: function() {
          var slug = findCategorySlug();
          switch(slug) {
            case 'story': return "http://www...";
            case 'discussion': return "http://www... (optional)";
            default: return "";
          }
        },
        omit: false
      }
    }
  });

}
