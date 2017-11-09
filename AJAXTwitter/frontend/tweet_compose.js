const APIUtil = require('./api_util.js');

class TweetCompose {
  constructor(el) {
    this.$el = $(el);
    this.$content = $('.tweet-compose textarea');
    this.handleSubmit();
  }

  handleSubmit() {
    this.$el.on("submit", (event) => {
      event.preventDefault();
      APIUtil.createTweet(this.$content.val(), this.submit.bind(this));
    });
  }

  submit(content) {
    console.log(content);
  }
}

module.exports = TweetCompose;
