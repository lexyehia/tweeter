$(document).ready(function() {
    loadTweets()
})

function loadTweets() {
    $.get('/tweets', addFirstTweetsData)
}

function addFirstTweetsData(data) {
    var html = renderTweets(data)
    $('#tweets').append(html)
    $('article').trigger('new-load')
}

function renderTweets(tweets) {
    var str = ''

    tweets = tweets.reverse()

    for(tweet of tweets) {
        str += createTweetElement(tweet)
    }

    var html = $.parseHTML(str)
    return html
}

function createTweetElement(data) {

    var tweetCreated = parseHumanDate(data.created_at)

    var str = '<article data-id="' + data._id.toString() + '"><header>' +
              '<img class="tweet-author-avatar" src="' + data.user.avatars.regular + '"><span>' +
              '<span class="tweet-author-name">' + escape(data.user.name) + '</span>' +
              '<span class="tweet-author-username" data-user-id="' + (data.user.user_id || '') +
              '">' + escape(data.user.handle) + '</span></span></header>' +
              '<div class="tweet-body">' + escape(data.content.text) + '</div>' +
              '<footer><span class="tweet-age">' + tweetCreated + ' ago</span>' +
              '<span class="tweet-side-icons">' +
              '<i class="fa fa-flag tweet-side-icon" aria-hidden="true"></i>' +
              '<i class="fa fa-retweet tweet-side-icon" aria-hidden="true"></i>' +
              '<i class="fa fa-heart tweet-side-icon tweet-like" aria-hidden="true"></i>' +
              '<span class="tweet-likes-count tweet-side-icon" aria-hidden="true">'+
              (data.likes || 0) + '</span></span></footer></article>'

    return str
}

function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

function parseHumanDate(timeCreated) {
    var created = new Date(timeCreated);
    var seconds = Math.floor((Date.now() - created) / 1000);

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

    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + ' hours';
    }

    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + ' minutes';
    }

    return Math.floor(seconds) + ' seconds';
}

module.exports = {
    loadTweets,
    renderTweets
}