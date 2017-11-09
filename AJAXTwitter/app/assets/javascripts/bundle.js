/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(1);
const UsersSearch = __webpack_require__(3);
const TweetCompose = __webpack_require__(4);

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const APIUtil = {
  followUser: id => (
    $.ajax({
      method: 'POST',
      url: `/users/${id}/follow`,
      dataType: 'json'
    })
  ),

  unfollowUser: id => (
    $.ajax({
      method: 'DELETE',
      url: `/users/${id}/follow`,
      dataType: 'json'
    })
  ),

  searchUsers: (queryVal, success) => (
    $.ajax({
      url: '/users/search',
      method:  'GET',
      dataType: 'JSON',
      data: { query: queryVal },
      success: respond => {
        return success(respond);
      }
    })
  ),

  createTweet: (data, success) => (
    $.ajax({
      url: '/tweets',
      method: 'POST',
      dataType: 'JSON',
      data: { content: data },
      success: respond => {
        return success(respond);
      }
    })
  )

};

module.exports = APIUtil;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);
const FollowToggle = __webpack_require__(1);

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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map