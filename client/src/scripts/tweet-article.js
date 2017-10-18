var Cookies = require('../vendor/js-cookie')

$(document).ready(function() {
    $('#tweets').on('mouseenter', 'article', highlightTweet)
    $('#tweets').on('mouseleave', 'article', dehighlightTweet)
    $('#tweets').on('new-load', 'article', hideZeroLikesCount)
    $('#tweets').on('click', '.tweet-like', increaseLikes)
    $('#tweets').on('likes-change', '.tweet-likes-count', showLikesCount)
})

function highlightTweet() {
    $(this).siblings().removeClass('highlighted')
    $(this).addClass('highlighted')
    $(this).find('.tweet-side-icons').show()
}

function dehighlightTweet() {
    $(this).removeClass('highlighted')
    $(this).find('.tweet-side-icons').hide()
}

function increaseLikes(event) {
    event.stopPropagation()

    var $article = $(this).closest('article')
    var counter = $article.find('.tweet-likes-count')
    var articleID = $article.data('id')
    var userID = $article.find('.tweet-author-username').data('user-id')

    if (Cookies.get('user_id') && Cookies.get('user_id') !== userID) {
        $.post('/tweets/like', 'id=' + articleID, increaseLikesCounter.bind(counter))
    } else if (!Cookies.get('user_id')) {
        alert('Please login first to like tweets!')
    } else if (Cookies.get('user_id') === userID) {
        alert('Stop trying to like your own tweets!')
    }
}

function increaseLikesCounter() {
    $(this).text((+$(this).text() + 1).toString())
    $(this).trigger('likes-change')
}

function hideZeroLikesCount() {
    var $counter = $(this).find('.tweet-likes-count')
    if(+$counter.text() === 0) {
        $counter.hide()
    } else {
        $counter.show()
    }

    $(this).find('.tweet-side-icons').hide()
}

function showLikesCount(event) {
    event.stopPropagation()

    if(+$(this).text() === 0) {
        $(this).hide()
    } else {
        $(this).show()
    }
}