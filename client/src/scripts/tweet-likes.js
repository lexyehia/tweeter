import * as Cookies from '../vendor/js-cookie'

/**
 * Function called when the 'like' button is clicked. It first verifies
 * that the user is both logged in, and different than the tweet's author, 
 * then it sends an Ajax PUT request to the server so that the 'likes' count 
 * is persisted in the database, callsback increaseLikesCounter().
 */
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

/**
 * Increases the 'likes' counter of the containing tweet 
 */
function increaseLikesCounter() {
    $(this).text(+$(this).text() + 1)
    $(this).trigger('likes-change')
}

/**
 * This function is invoked through an event listener, it hides all
 * 'likes' counts which are at 0, and shows them if they are greater
 */
export function toggleLikesCount(event) {
    event.stopPropagation()

    if(+$(this).text() === 0) {
        $(this).hide()
    } else {
        $(this).show()
    }
}