$( document ).ready(function() {
    let idList = [];
    $('.tweet').each(function() {
        let id = (this.id);
        idList.push(id);
    });
    console.log(idList);

    // Sends out the request with an optional search param.
    $('#start-button').click(function () {
      let searchTerms = $('#search-box input').val();
      let searchArr = searchTerms.split(" ");
      $.ajax({
        url: "http://localhost:5000/get_tweets",
        type: "GET",
        crossDomain: true,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        dataType: "text",
        success: function(result){
            console.log(result);
        },
        error: function(error){
            console.log(error);
        }
      });
      //Loading circle after clicking start. On a delay timer to load the content.
      $('#load-circle').addClass('active');
      setTimeout(function(){
          $('#start-detweet-div').fadeOut('fast');
          $('#main-container').fadeIn(900);
          // flip tweet into place when it loads from jinja
          $('.tweet')
            .transition({
              animation: 'horizontal flip in',
              duration: 1500,
            })
          ;
      }, 6000);
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
        $('#main-container').fadeOut(3000, function() {
            // Send the post request back to python with the remaining id's from
            // this list.
            $('body').css('background', '#ddd6f3');
        });
    });

    // cancel button to back out of deleting tweets.
    $('#cancel').click(function() {
        $('.ui.basic.modal')
            .modal('hide')
        ;
    });

    // Scroll to the top button animation.
    $("a[href='#top']").click(function() {
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
    });



    // Toggles the search bar. When search bar is toggled, it allows user to enter a search paramater. That paramater will be passed to the function, overriding the detweet.
    $('#selection-toggle').click(function() {
        $( "#search-box" ).toggleClass('focus disabled');
    });
    // Reset searchbox input value when page reloads.
    $('#search-box input').val('');
});
