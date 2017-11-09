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
