$(document).ready(function () {
    $('.new-tweet').find('form').submit(function (e) {
        var input = $(this).find('textarea').val();

        if (input === null || input === '') {
            alert('Please enter some text first!');
        } else if (input.length > 140) {
            alert('Your tweet is way too long!');
        } else {
            $.post( "/tweets/", $(this).serialize());
        }

        return false;        
    })
})