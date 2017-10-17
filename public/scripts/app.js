/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
    $('.new-tweet').hide();
    loadTweets();

    $('.new-tweet').find('form').submit(function() {
        var input = $(this).find('textarea').val();

        if (input === null || input === '') {
            alert('Please enter some text first!');
        } else if (input.length > 140) {
            alert('Your tweet is way too long!');
        } else {
            $.post( "/tweets/", $(this).serialize(), function() {
                $.get('/tweets', function(data) {
                    var html = renderTweets(data);
                    $('#tweets > article').replaceWith(html);            
                });
            });
        }
        return false;        
    });

    $('#compose-tweet').click(function() {

        $('.new-tweet').slideToggle('fast', function() {
            $('#new-text-input').focus();                    
        });
        
        return false; 
    })
})

function loadTweets() {
    $.get('/tweets', function(data) {
        var html = renderTweets(data);
        $('#tweets').append(html);            
    })
}

function renderTweets(tweets) {
    var str = '';

    tweets = tweets.reverse();

    for(tweet of tweets) {
        str += createTweetElement(tweet);
    }

    var html = $.parseHTML(str);
    return html;
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

