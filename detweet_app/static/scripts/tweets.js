$( document ).ready(function() {
    let idList = [];

    // Sends out the request with an optional search param.
    $('#start-button').click(function () {
      let searchTerms = $('#search-box input').val();
      let searchArr = searchTerms.split(" ");
      $.ajax({
        url: "http://localhost:5000/get_tweets",
        type: "POST",
        crossDomain: true,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        dataType: "json",
        data: JSON.stringify(searchArr),
        contentType: "application/json; charset=utf-8",
        success: function(result){
            result.forEach(function(el) {
                let tweetId = Object.keys(el)[0];
                idList.push(tweetId);
                let tweetText = el[tweetId];
                $('#enclosure').append(
                    `<div class="column hvr-grow">
                        <div id="${tweetId}" class="tweet ui segment">
                            <div class="top">
                                <p>You tweeted:</p>
                            </div>
                            <button class="keep-tweet hvr-pulse-grow" title="Keep me!"><i class="check circle icon"></i></button>
                            <p class="tweet-text">${tweetText}</p>
                        </div>
                     </div>`);
            });
            console.log(idList);
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
    $('#enclosure').on('click', '.keep-tweet', function() {
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
        $('.ui.basic.modal').modal('show');
    })

    //Actual removal of tweets once the user confrims.
    $('#remove').click(function() {
        // Send the post request back to python with the remaining id's from
        // this list.
        $('.ui.basic.modal').modal('hide');
        $('.instructions, #enclosure, #up-div').fadeOut(3000, function() {
            $('body').css('background', '#ddd6f3');
        });
        $('#search-again-div').fadeIn(6000, function() {
            return true;
        })
        $.ajax({
            url: "http://localhost:5000/delete_tweets",
            type: "POST",
            crossDomain: true,
            headers: {
              'Access-Control-Allow-Origin': '*'
            },
            dataType: "json",
            data: JSON.stringify(idList),
            contentType: "application/json; charset=utf-8",
            success: function(result){
                console.log(result);
            },
            error: function(error){
                console.log(error);
            }
        });
        console.log("Id list after remove clicked: " + idList);
    });

    // cancel button to back out of deleting tweets.
    $('#cancel').click(function() {
        $('.ui.basic.modal').modal('hide');
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
