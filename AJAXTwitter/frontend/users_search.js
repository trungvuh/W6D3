const APIUtil = require('./api_util.js');
const FollowToggle = require('./follow_toggle.js');

class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.$input = $(`.users-search input`);
    this.$ul = $('.users');
    this.handleInput();
  }

  handleInput() {
    this.$input.on("keyup", (event) => {
      APIUtil.searchUsers(this.$input.val(), this.renderResults.bind(this));
    });
  }

  renderResults(users) {
    this.$ul.empty();
    users.forEach (user => {
      let $li = $(`<li></li>`);
      $li.append(`<a href="/users/${user.id}">${user.username}</a>`);
      let $button = $("<button></button>");
      new FollowToggle($button, {userId: user.id, followState: user.followed });
      $li.append($button);
      this.$ul.append($li);
    });
  }
}



module.exports = UsersSearch;
