MAX_TAGLINE_SIZE = 55;

Template.post_tagline.helpers({
	getPostTagline: function() {
		var body = Posts.findOne({_id: this._id}).body;
	    if(body.length <= MAX_TAGLINE_SIZE) {
	      return body.substr(0, MAX_TAGLINE_SIZE);
	    } else {
	      return body.substr(0, MAX_TAGLINE_SIZE).concat('...');
	    }
	}
});
