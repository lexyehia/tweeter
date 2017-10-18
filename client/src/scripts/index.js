/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
require('webpack-jquery-ui/css');
require('webpack-jquery-ui');
require('../styles/layout.scss')
var Cookies = require('../vendor/js-cookie')
require('./users')
require('./composer-char-counter')
//import newtweet from '../styles/new-tweet.css'
//import tweets from '../styles/tweets.css'

$(document).ready(function() {
    $('.new-tweet').hide();
    loadTweets();

    // EVENT LISTENERS

    $('#tweets').on('mouseenter', 'article', function() {
        $(this).siblings().removeClass('highlighted');
        $(this).addClass('highlighted');
        $(this).find('.tweet-side-icons').show();
    });

    $('#tweets').on('mouseleave', 'article', function() {
        $(this).removeClass('highlighted');
        $(this).find('.tweet-side-icons').hide();
    });

    $('main').on('new-load', 'article', function() {
        var $counter = $(this).find('.tweet-likes-count');
        if(+$counter.text() === 0) {
            $counter.hide();
        } else {
            $counter.show();
        }

        $(this).find('.tweet-side-icons').hide();
    });

    $('main').on('click', '.tweet-like', increaseLikes);

    $('main').on('likes-change', '.tweet-likes-count', function (e) {
        e.stopPropagation();

        if(+$(this).text() === 0) {
            $(this).hide();
        } else {
            $(this).show();
        }
    });

    // MISC

    $('.new-tweet').find('form').submit(function(e) {
        e.preventDefault();
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
                    $('article').trigger('new-load');
                });
            });
            $('.new-tweet').slideUp('fast');
            $(this).find('textarea').val('').trigger('counter-change');
        }
    });

    $('#compose-tweet').click(function() {

        $('.new-tweet').slideToggle('fast', function() {
            $('#new-text-input').focus();
        });

        return false;
    })

});

function loadTweets() {
    $.get('/tweets', function(data) {
        var html = renderTweets(data);
        $('#tweets').append(html);
        $('article').trigger('new-load');
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

    var str = '<article data-id="' + data._id.toString() + '"><header>';
    str    += '<img class="tweet-author-avatar" src="' + data.user.avatars.regular + '"><span>';
    str    += '<span class="tweet-author-name">' + escape(data.user.name) + '</span>';
    str    += '<span class="tweet-author-username" data-user-id="' + (data.user.user_id || '') + '">' + escape(data.user.handle) + '</span></span></header>';
    str    += '<div class="tweet-body">' + escape(data.content.text) + '</div>';
    str    += '<footer><span class="tweet-age">' + tweetCreated + ' ago</span>';
    str    += '<span class="tweet-side-icons">';
    str    += '<i class="fa fa-flag tweet-side-icon" aria-hidden="true"></i>';
    str    += '<i class="fa fa-retweet tweet-side-icon" aria-hidden="true"></i>';
    str    += '<i class="fa fa-heart tweet-side-icon tweet-like" aria-hidden="true"></i>';
    str    += '<span class="tweet-likes-count tweet-side-icon" aria-hidden="true">'+ (data.likes || 0) + '</span>';
    str    += '</span></footer></article>';

    return str;
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

function increaseLikes(e) {
    e.stopPropagation();

    var $article = $(this).closest('article')
    var counter = $article.find('.tweet-likes-count')
    var articleID = $article.data('id');
    var userID = $article.find('.tweet-author-username').data('user-id')

    if (Cookies.get('user_id') && Cookies.get('user_id') !== userID) {
        $.post('/tweets/like', 'id=' + articleID, function() {
            counter.text((+counter.text() + 1).toString());
            $(counter).trigger('likes-change');
        })
    } else if (!Cookies.get('user_id')) {
        alert('Please login first to like tweets!')
    } else if (Cookies.get('user_id') === userID) {
        alert('Stop trying to like your own tweets!')
    }
}
