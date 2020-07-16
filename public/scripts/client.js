/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet); 
    }
  }

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
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
          <p class="tweets-body">${escape(userData.content.text)}</p>
        <footer class="footer-info">
            <p class="date-images" id="date">${userData.created_at}</p>
            <p class="date-images" id="icons">icons</p>
          </div>
        </footer>
      </article>`

    return $(stringifiedTweet);
  }

  $("#form").submit(function(event) {
    
    event.preventDefault();
    
    if ($("textarea").val().length === 0) {
      $("#empty-text").slideDown(1000);
      $("#over-140").slideUp(1000);
    } else if ($("textarea").val().length > 140) {
      $("#over-140").slideDown(1000);
      $("#empty-text").slideUp(1000);
    } else {
      $("#empty-text").slideUp(1000);
      $("#over-140").slideUp(1000);
      $.ajax({
        url: '/tweets/',
        method: 'POST', 
        data: $(this).serialize()
      })
      .then(function(res) {
        loadTweets(res);
      })
    }
   
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
    $('#tweet-text').val('');
    $('.counter').val(140);
  }

});