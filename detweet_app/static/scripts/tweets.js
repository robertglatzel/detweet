$( document ).ready(function() {
    // List containing all the tweet id's that have been flagged and will be rendered to the page.
    let idList = [];

/* ============ ENTER KEY START ============ */
    // Trigger start button keypress on enter.
    $(document).keypress(function(e) {
        var key = e.which;
        if(key == 13) {
            $('#start-button').click();
            return false;
        }
    });
/* ============ ENTER KEY START END ============ */

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
      // Loading circle after clicking start. On a delay timer to load the content.
      $('#load-circle').addClass('active');
      // Get the tweets from the api
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
            let flagged_ct = result.length;
            $('#count-info').text("Total flagged tweets: ");
            $('#remaining').text(flagged_ct);
            // On success, loop through the returned list and extract the tweet id and the text, append it to the page.
            if (result.length != 0) {
                result.forEach(function(el) {
                    let tweetId = Object.keys(el)[0];
                    idList.push(tweetId);
                    let tweetText = el[tweetId];
                    $('#enclosure').append(
                        `<div class="column">
                            <div id="${tweetId}" class="tweet ui segment hvr-float-shadow">
                                <div class="top">
                                    <p>You tweeted:</p>
                                </div>
                                <button class="keep-tweet ui button violet hvr-pulse-grow" title="Keep me!">Keep me</button>
                                <p class="tweet-text">${tweetText}</p>
                            </div>
                         </div>`);
                });
                // Loads tweets into the page.
                setTimeout(function(){
                    $('#start-detweet-div').fadeOut('fast');
                    $('#main-container').fadeIn(900);
                    $('#instruction-box, #enclosure, #up-div').show();
                    // flip tweet into place when loaded
                    $('.tweet').transition({
                        animation: 'horizontal flip in', duration: 1500
                    });
                }, 6000);
                // Loads the 'no results' search element on to the page.
            } else if (result.length == 0){
                setTimeout(function(){
                    $('#start-detweet-div').fadeOut(100);
                    $('#no-results-div').transition({
                        animation: 'drop', duration: 900
                    });
                }, 6000);
            }
        },
        error: function(error){
            console.log(error);
        }
      });
    });
/* ============ START BUTTON END ============ */

/* ============ SEARCH AGAIN BUTTON ============ */
    // This functions is for when the search again button is pressed. The page has to
    // remove some classes to reset like above.
    $('#search-again-r').click(function() {
        $('#load-circle').removeClass('active');
        $('#start-detweet-div').fadeIn(100);
        $('#search-again-div').removeClass('transition visible');
        $('#search-again-div').attr('style', '');
    });

    $('#search-again-nr').click(function() {
        $('#load-circle').removeClass('active');
        $('#start-detweet-div').fadeIn(100);
        $('#no-results-div').removeClass('transition visible');
        $('#no-results-div').attr('style', '');
    });
/* ============ SEARCH AGAIN BUTTON END ============ */

/* ============ KEEP BUTTON ============ */
    // This function is for keeping tweets by removing them from the list of all tweets that are to be deleted.
    $('#enclosure').on('click', '.keep-tweet', function() {
        $(this).parent().fadeOut(1000, function() {
            let id = $(this).prop('id');
            if (idList.includes(id)) {
                let idIndex = idList.indexOf(id);
                idList.splice(idIndex, 1);
                $('#remaining').text(idList.length);
            }
            $(this).parent().remove();
            // If there are no elements left to keep, show the search again option with custom text.
            if (idList.length == 0){
                $('#search-again-div p').text("Looks like there are no tweets left to delete. Thank you for using deTweet!");
                $('#main-container').fadeOut(200);
                setTimeout(function() {
                    $('#search-again-div').transition({
                        animation: 'drop', duration: 900
                    });
                }, 500);
            }
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

    // Actual removal of tweets once the user confrims.
    $('#remove').click(function() {
        // Send the post request back to python with the remaining id's from
        // this list.
        $('.ui.basic.modal').modal('hide');
        $('#instruction-box, #enclosure, #up-div').fadeOut(2000);
        // Sending post request back to the api to delete tweets.
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
        // Brings in the seach again / tweet out supoort menu. On a delay so the other box fades out first.
        setTimeout(function() {
            $('#count-info').text("Total deTweets: ");
            $('#remaining').text(idList.length);
            $('#search-again-div p').text("Thank you for using deTweet! Your tweets have been deTweeted! Please give your profile a moment to register the changes.");
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
