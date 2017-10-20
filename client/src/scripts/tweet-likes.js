import * as Cookies from '../vendor/js-cookie'

export function increaseLikes(event) {
    event.stopPropagation()

    var $article  = $(this).closest('article')
    var counter   = $article.find('.tweet-likes-count')
    var articleID = $article.data('id')
    var userID    = $article.find('.tweet-author-username').data('user-id')

    if (Cookies.get('user_id') && Cookies.get('user_id') !== userID) {
        $.ajax('/tweets/like', { method: 'PUT', data: 'id=' + articleID })
         .done(increaseLikesCounter.bind(counter))

    } else if (!Cookies.get('user_id')) {
        alert('Please login first to like tweets!')

    } else if (Cookies.get('user_id') === userID) {
        alert('Stop trying to like your own tweets!')
    }
}

function increaseLikesCounter() {
    $(this).text(+$(this).text() + 1)
    $(this).trigger('likes-change')
}

export function toggleLikesCount(event) {
    event.stopPropagation()

    if(+$(this).text() === 0) {
        $(this).hide()
    } else {
        $(this).show()
    }
}