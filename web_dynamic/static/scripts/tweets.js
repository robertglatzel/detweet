$( document ).ready(function() {
    let idList = [];
    $('.tweet').each(function() {
        let id = (this.id);
        idList.push(id);
    });
    console.log(idList);


    $('#start-button').click(function () {
      // get call to the api.
      $('#progress-modal')
        .modal('show')
        ;
      $(this).parent().css('display', 'none');
      $('#main-container').css('display', 'inline');
    });

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

    // Triggers the confirmation or cancelation screen to delete tweets
    $('#remove-all').click(function() {
        $('.ui.basic.modal')
            .modal('show')
        ;
    })

    //Actual removal of tweets once the user confrims.
    $('#remove').click(function() {
        $('.ui.basic.modal')
            .modal('hide')
        ;
        $('#enclosure').fadeOut(3000, function() {
            // Send the post request back to python with the remaining id's from
            // this list.
            $('body').css('background', '#ddd6f3');
            $('footer').css('position', 'fixed');
        });
    });

    // cancel button to back out of deleting tweets.
    $('#cancel').click(function() {
        $('.ui.basic.modal')
            .modal('hide')
        ;
    });

    // This is the delete all flagged tweets function. It removes all remaining
    // tweets.
    $("a[href='#top']").click(function() {
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
    });
    // flip tweet into place when it loads from jinja
    $('.tweet')
      .transition({
        animation: 'horizontal flip in',
        duration: 1500,
      })
    ;
});
