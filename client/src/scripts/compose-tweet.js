var tweets = require('./tweets-list')

/** DOCUMENT READY AREA */
$(document).ready(function() {
    $('.new-tweet').hide()

    $('.new-tweet').find('textarea').on('keyup counter-change', updateCharCounter)
    $('.new-tweet').find('form').submit(postNewTweet)
    $('#compose-tweet').click(slideNewTweetBox)
})

/** CALLBACKS AND OTHER FUNCTIONS **/

/**
 * When triggered, updates the character counter in the Compose Tweet box
 * based on the value of the textarea's character length
 *
 * @return {void}
 */
function updateCharCounter() {
    var charsInputted = $(this).val().length
    var counter = $(this).closest('form').find('.counter')
    counter.text(140 - charsInputted)

    if(counter.text() < 0) {
        counter.addClass('invalid')
    }
}

function slideNewTweetBox(event) {
    event.preventDefault()

    $('.new-tweet').slideToggle('fast', function() {
        $('#new-text-input').focus()
    })
}

function postNewTweet(event) {
    event.preventDefault()
    var input = $(this).find('textarea').val()

    if (input === null || input === '') {
        alert('Please enter some text first!')

    } else if (input.length > 140) {
        alert('Your tweet is way too long!')

    } else {
        $.post( "/tweets/", $(this).serialize(), getNewTweets)
        $('.new-tweet').slideUp('fast')
        $(this).find('textarea').val('').trigger('counter-change')
    }
}

function getNewTweets() {
    setTimeout(tweets.loadTweets(updateTweetsList), 1000)
}

function updateTweetsList(data) {
    var html = tweets.renderTweets(data)
    $('#tweets > article').replaceWith(html)
    $('article').trigger('new-load')
}