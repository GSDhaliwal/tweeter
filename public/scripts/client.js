/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet); 
    }
  }
 
  const createTweetElement = function(userData) {
    const stringifiedTweet = 
      `<article class="tweets">
        <header class="user-info">
          <div class="user-name-avatar">
            <img  class="user" src="${userData.user.avatars}">
            <p class="user-name">${userData.user.name}</p>
          </div>
          <div class="user-handle">
            <p>${userData.user.handle}</p>
          </div>
        </header>
          <p class="tweets-body">${userData.content.text}</p>
        <footer class="footer-info">
            <p class="date-images" id="date">${userData.created_at}</p>
            <p class="date-images" id="icons">icons</p>
          </div>
        </footer>
      </article>`

    return $(stringifiedTweet);
  }

  $('#form').submit(function(event) {
    event.preventDefault();
    $.ajax({
      url: '/tweets/',
      method: 'POST', 
      data: $(this).serialize()
    })
    .then(function(res) {
      console.log('Success: ', res);
      loadTweets(res);
    })
  })

  const loadTweets = function() {
    $.ajax({
      url: '/tweets', 
      method: 'GET',
    })
    .then(function(res) {
      $('#tweets-container').empty();
      renderTweets(res);
    })
  }

});