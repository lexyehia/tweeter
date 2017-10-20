$(document).ready(function() {
    loadTweets()
})

function loadTweets() {
    $.get('/tweets', addAllTweets)
    setTimeout(loadTweets, 120000)
}

function addAllTweets(data) {
    var html = renderTweets(data)
    $('#tweets').html(html)
    $('.tweet-likes-count').trigger('likes-change')
}

function renderTweets(data) {
    let str = ''

    if (Array.isArray(data)) {
        for(obj of data) {
            str += createTweetElement(obj)
        }
    } else {
        str = createTweetElement(data)
    }

    return $.parseHTML(str)
}

function createTweetElement(data) {

    return   `<article data-id="${data._id}">
              <header>
              <img class="tweet-author-avatar" src="${data.user.avatars.regular}">
              <span class="tweet-author-name">${escape(data.user.name)}</span>
              <span class="tweet-author-username" data-user-id="${data.user._id}">${escape(data.user.handle)}</span>
              </header>
              <div class="tweet-body">${escape(data.content.text)}</div>
              <footer>
              <span class="tweet-age">${parseHumanDate(data.created_at)}</span>
              <span class="tweet-side-icons">
              <i class="fa fa-flag tweet-side-icon" aria-hidden="true"></i>
              <i class="fa fa-retweet tweet-side-icon" aria-hidden="true"></i>
              <i class="fa fa-heart tweet-side-icon tweet-like" aria-hidden="true"></i>
              <span class="tweet-likes-count tweet-side-icon" aria-hidden="true">${data.likes}</span>
              </span>
              </footer>
              </article>`
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