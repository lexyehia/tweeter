$(document).ready(function() {
    $('.new-tweet').find('textarea').on('keyup', function() {
        var charsInputted = $(this).val().length;
        $(this).closest('form').find('.counter').text(140 - charsInputted);
    })
});