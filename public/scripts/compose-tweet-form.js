$(document).ready(function () {
    $('.new-tweet').find('form').submit(function (e) {
        console.log($(this).serialize());
        $.post( "/tweets/", $(this).serialize());
        return false;
    })
})