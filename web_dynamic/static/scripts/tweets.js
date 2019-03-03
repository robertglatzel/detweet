$( document ).ready(function() {
    let idList = [];
    $('.tweet').each(function() {
        let id = (this.id);
        idList.push(id);
    });
    if (idList.length === 0) {
        $('body').css('background', '#ddd6f3');
    }
    console.log(idList);

    // This function is for removing tweets from the list of all
    // tweets that are to be deleted. The array containing all the Tweets
    // will be updated.
    $('.keep-tweet').click(function() {
        $(this).parent().fadeOut(1000, function() {
            let id = $(this).prop('id');
            if (idList.includes(id)) {
                let idIndex = idList.indexOf(id);
                idList.splice(idIndex, 1);
            }
            $(this).parent().remove();
            console.log(idList);
        });
    });
    // This is the delete all flagged tweets function. It removes all remaining
    // tweets.
    $('#remove-all').click(function() {
        $('#enclosure').fadeOut(1000, function() {
            // Send the post request back to python with the remaining id's from
            // this list.
        });
        $('body').css('background', '#ddd6f3');
        $('footer').css('position', 'fixed');
    })

    $("a[href='#top']").click(function() {
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
    });

});
