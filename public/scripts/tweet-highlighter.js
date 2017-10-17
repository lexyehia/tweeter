$(document).ready(function() {
    $('.tweet-side-icons').hide();

    $('#tweets').find('article').on({
        mouseenter: function() {
            $(this).siblings().removeClass('highlighted');
            $(this).addClass('highlighted');
            $(this).find('.tweet-side-icons').show();
        },

        mouseleave: function() {
            $(this).removeClass('highlighted');
            $(this).find('.tweet-side-icons').hide();
        }
    });
});
