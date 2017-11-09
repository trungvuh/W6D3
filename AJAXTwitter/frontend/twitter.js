const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');
const TweetCompose = require('./tweet_compose.js');

$( () => {
  $("button.follow-toggle").each((idx, el) => {
    return new FollowToggle(el);
  });

  $("nav.users-search").each((idx, el) => {
    return new UsersSearch(el);
  });

  $(".tweet-compose").each((idx, el) => {
    return new TweetCompose(el);
  });

});
