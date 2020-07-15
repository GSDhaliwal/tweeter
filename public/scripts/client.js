/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

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

 
  renderTweets(data);

});