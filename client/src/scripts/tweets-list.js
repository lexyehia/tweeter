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
              '<footer><span class="tweet-age">' + tweetCreated + '</span>' +
              '<span class="tweet-side-icons">' +
              '<i class="fa fa-flag tweet-side-icon" aria-hidden="true"></i>' +
              '<i class="fa fa-retweet tweet-side-icon" aria-hidden="true"></i>' +
              '<i class="fa fa-heart tweet-side-icon tweet-like" aria-hidden="true"></i>' +
              '<span class="tweet-likes-count tweet-side-icon" aria-hidden="true">'+
              (data.likes || 0) + '</span></span></footer></article>'

    return str
}

function escape(str) {
    var div = document.createElement('div')
    div.appendChild(document.createTextNode(str))
    return div.innerHTML
}

function parseHumanDate(timeCreated) {
    const created = new Date(timeCreated)
    const seconds = Math.floor((Date.now() - created) / 1000)

    let secondsArray = [
        [31536000, ' year'],
        [2592000, ' month'],
        [86400, ' day'],
        [3600, ' hour'],
        [60, ' minute'],
        [1, ' second']
    ]

    function parseHumanDateRecursive(seconds, secondsArray) {
        if (seconds === 0) return 'Just now'

        let dateWord = ''
        const head = secondsArray.shift()
        const interval = Math.floor(seconds / head[0])

        if (interval >= 1) {
            interval === 1 ? dateWord = head[1] : dateWord = head[1] + 's'
            return interval + dateWord + ' ago'
        } else {
            return parseHumanDateRecursive(seconds, secondsArray)
        }
    }

    return parseHumanDateRecursive(seconds, secondsArray)
}

module.exports = {
    renderTweets
}