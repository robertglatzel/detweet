$('.keep-tweet').click(function() {
    $(this).parent().fadeOut(1000, function() {
        $(this).parent().remove();
    });
});
