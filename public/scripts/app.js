/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
    loadTweets();
})

function loadTweets() {
    $.get('/tweets', renderTweets)
}

function renderTweets(tweets) {
    var str = '';

    for(tweet of tweets) {
        str += createTweetElement(tweet);
    }

    var html = $.parseHTML(str);

    $('#tweets').append(html);
}


 function createTweetElement(data) {

    var tweetCreated = parseHumanDate(data.created_at);

    var str = '<article><header>';
    str    += '<img class="tweet-author-avatar" src="' + data.user.avatars.regular + '"><span>';
    str    += '<span class="tweet-author-name">' + escape(data.user.name) + '</span>';
    str    += '<span class="tweet-author-username">' + escape(data.user.handle) + '</span></span></header>';
    str    += '<div class="tweet-body">' + escape(data.content.text) + '</div>';
    str    += '<footer><span class="tweet-age">' + tweetCreated + ' ago</span>';
    str    += '<span class="tweet-side-icons">';
    str    += '<i class="fa fa-flag tweet-side-icon" aria-hidden="true"></i>';
    str    += '<i class="fa fa-retweet tweet-side-icon" aria-hidden="true"></i>';
    str    += '<i class="fa fa-heart tweet-side-icon" aria-hidden="true"></i>';
    str    += '</span></footer></article>';

    return str;
}

function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}
  
function parseHumanDate(timeCreated) {
    var seconds = Math.floor((Date.now() - timeCreated) / 1000);
    
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return interval + ' years';
    }

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + ' months';
    }

    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + ' days';
    }

    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + ' minutes';
    }

    return Math.floor(seconds) + ' seconds';
}

