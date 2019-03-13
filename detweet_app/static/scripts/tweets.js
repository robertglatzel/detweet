$( document ).ready(function() {
    //List containing all the tweet id's that have been flagged and will be rendered to the page.
    let idList = [];

/* ============ SEARCH BAR ============ */
    // Toggles the search box. When search box is toggled, it allows user to enter a search paramater.
    // That paramater will be passed to the function, overriding the detweet.
    $('#selection-toggle').click(function() {
        $( "#search-box" ).toggleClass('focus disabled');
    });

    // Reset search box input value when page reloads.
    $('#search-box input').val('');
/* ============ SEARCH BAR END ============ */

/* ============ START BUTTON ============ */
    // Sends out the request with an optional search param.
    $('#start-button').click(function () {
      let userSearch = $('#search-box input').val();
      let searchArr = userSearch.split(" ");
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
            //on success, loop through the returned list and extract the tweet id and the text, append it to the page.
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
          // flip tweet into place when loaded
          $('.tweet').transition({
              animation: 'horizontal flip in', duration: 1500,
          });
      }, 6000);
    });
/* ============ START BUTTON END ============ */

/* ============ KEEP BUTTON ============ */
    // This function is for keeping tweets by removing them from the list of all tweets that are to be deleted.
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
/* ============ KEEP BUTTON END ============ */

/* ============ REMOVE BUTTON ============ */
    // Triggers the confirmation or cancelation screen to delete tweets
    $('#remove-all').click(function() {
        $('.ui.basic.modal').modal('show');
    });

    // cancel button to back out of deleting tweets.
    $('#cancel').click(function() {
        $('.ui.basic.modal').modal('hide');
    });

    //Actual removal of tweets once the user confrims.
    $('#remove').click(function() {
        // Send the post request back to python with the remaining id's from
        // this list.
        $('.ui.basic.modal').modal('hide');
        $('.instructions, #enclosure, #up-div').fadeOut(2000, function() {
            $('body').css('background', '#ddd6f3');
        });
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
        //Brings in the seach again / tweet out supoort menu. On a delay so the other box fades out first.
        setTimeout(function() {
            $('#search-again-div').transition({
                animation: 'drop', duration: 500
            });
        }, 2000);
        console.log("Id list after remove clicked: " + idList);
    });
/* ============ REMOVE BUTTON END ============ */

/* ============ SCROLL TO TOP BUTTON ============ */
    // Scroll to the top button animation.
    $("a[href='#top']").click(function() {
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
    });
/* ============ SCROLL TO TOP BUTTON END ============ */
});
