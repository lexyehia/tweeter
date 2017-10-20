import { renderTweets } from './tweets-list'

/**
 * When triggered, updates the character counter in the Compose Tweet box
 * based on the value of the textarea's character length
 *
 * @return {void}
 */
export function updateCharCounter() {
    var charsInputted = $(this).val().trim().length
    var counter = $(this).closest('form').find('.counter')
    counter.text(140 - charsInputted)

    if(counter.text() < 0) {
        counter.addClass('invalid')
    } else {
        counter.removeClass('invalid')        
    }
}

export function slideNewTweetBox(event) {
    event.preventDefault()

    $('.new-tweet').slideToggle('fast', function() {
        $('#new-text-input').focus()
    })
}

export function postNewTweet(event) {
    event.preventDefault()
    var textarea = $(this).find('textarea')
    textarea.val(textarea.val().trim())
    var input = textarea.val()

    if (!input) {
        alert('Please enter some text first!')

    } else if (input.length > 140) {
        alert('Your tweet is way too long!')

    } else {
        $.post( "/tweets/", $(this).serialize(), addNewTweet)
        $('.new-tweet').slideUp('fast')
        textarea.val('').trigger('counter-change')
    }
}

function addNewTweet(tweet) {
    const newTweetNode = renderTweets(tweet)

    $(newTweetNode).prependTo('#tweets')
                   .find('.tweet-likes-count')
                   .trigger('likes-change')
}
