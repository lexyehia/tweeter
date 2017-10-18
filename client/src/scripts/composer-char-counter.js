$(document).ready(function() {
    $('.new-tweet').find('textarea').on('keyup counter-change', function() {
        var charsInputted = $(this).val().length;
        var counter = $(this).closest('form').find('.counter');
        counter.text(140 - charsInputted);

        if(counter.text() < 0) {
            counter.addClass('invalid');
        }
    })
});