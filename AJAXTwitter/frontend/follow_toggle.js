const APIUtil = require('./api_util.js');

class FollowToggle {
  constructor(el, options) {
    this.$el = $(el);
    this.userId = this.$el.data("user-id") || options.userId;
    this.followState = (this.$el.data("initial-follow-state") || options.followState);
    this.render();
    this.handleClick();
  }

  render() {
    if (this.followState === "following" || this.followState === "unfollowing") {
      this.$el.prop("disabled", true);
    } else {
      this.$el.prop("disabled", false);
    }

    if (this.followState === "unfollowed") {
      this.$el.text("Follow!");
    } else if (this.followState === "followed") {
      this.$el.text("Unfollow!");
    } else if (this.followState === "following") {
      this.$el.text("Following!");
    } else if (this.followState === "unfollowing") {
      this.$el.text("Unfollowing!");
    }
  }

  handleClick () {
    this.$el.on('click', (event) => {
      event.preventDefault();
      if (this.followState === "unfollowed") {
        this.followState = "following";
        this.render();
        APIUtil.followUser(this.userId).then((respond) => {
          this.followState = "followed";
          this.render();
        });
      }
      else {
        this.followState = "unfollowing";
        this.render();
        APIUtil.unfollowUser(this.userId).then((respond) => {
          this.followState = "unfollowed";
          this.render();
        });
      }

    });
  }
}

module.exports = FollowToggle;
