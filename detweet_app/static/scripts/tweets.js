document.addEventListener('DOMContentLoaded', function (){
    // List containing all the tweet id's that have been flagged and will be rendered to the page.
    let idList = [];
    //Shorthand query selector
    var $$ = function(sel) {
        return document.querySelector(sel);
    }
/* ============ ENTER KEY START ============ */
    // Trigger start button keypress on enter.
    document.body.addEventListener('keyup', function(e){
        if (e.key === 'Enter'){
            $$('#start-button').click()
        }
    });
/* ============ ENTER KEY START END ============ */

/* ============ SEARCH BAR ============ */
    // Toggles the search box. When search box is toggled, it allows user to enter a search paramater.
    // That paramater will be passed to the function, overriding the detweet.
    $$('#selection-toggle').addEventListener('click', function (){
        $$('#search-box').classList.toggle('disabled');
        $$('#search-box').classList.toggle('focus');
        $$('#search-box input').value = '';
    });
    // Reset search box input value when page reloads.
    $$('#search-box input').value = '';
/* ============ SEARCH BAR END ============ */

/* ============ START BUTTON ============ */
    // Sends out the request with an optional search param.
    $$('#start-button').addEventListener('click', function() {
//    $('#start-button').click(function () {
//      let userSearch = $('#search-box input').val();
      let userSearch = $$('#search-box input').value;
      let searchArr = userSearch.split(" ");
      // Loading circle after clicking start. On a delay timer to load the content.
      $$('#load-circle').classList.add('active');
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
            $$('#count-info').textContent = "Total flagged tweets: ";
            $$('#remaining').textContent = flagged_ct;
            // On success, loop through the returned list and extract the tweet id and the text, append it to the page.
            if (result.length != 0) {
                result.forEach(function(el) {
                    let tweetId = Object.keys(el)[0];
                    idList.push(tweetId);
                    let tweetText = el[tweetId];
                    let newTweet = document.createElement('div');
                    newTweet.classList.add('column', 'centered');
                    newTweet.innerHTML =
                            `<div id="${tweetId}" class="tweet ui segment hvr-float-shadow">
                                <div class="top">
                                    <p>You tweeted:</p>
                                </div>
                                <button class="keep-tweet ui button violet hvr-pulse-grow" title="Keep me!">Keep me</button>
                                <p class="tweet-text">${tweetText}</p>
                            </div>`;
                    $$('#enclosure').appendChild(newTweet);
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
                }, 4000);
                // Loads the 'no results' search element on to the page.
            } else if (result.length == 0){
                setTimeout(function(){
                    $('#start-detweet-div').fadeOut(100);
                    $('#no-results-div').transition({
                        animation: 'drop', duration: 900
                    });
                }, 4000);
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
    $$('#search-again-r').addEventListener('click', function() {
        $$('#load-circle').classList.remove('active');
        $('#start-detweet-div').fadeIn(100);
        $$('#search-again-div').classList.remove('transition');
        $$('#search-again-div').classList.remove('visible');
        $$('#search-again-div').setAttribute('style', '');
    });
    // For when you want to search again and empty the list of all flagged tweets.
    // Essentially a 'Keep all' button.
    $$('#reset').addEventListener('click', function() {
      $$('#load-circle').classList.remove('active');
      $('#enclosure').fadeOut(50);
      $('#instruction-box').fadeOut(50);
      $$('#enclosure').innerHTML = "";
      idList = [];
      $('#start-detweet-div').fadeIn(1800);
      $$('#remaining').textContent = idList.length;
      console.log(idList);
    });

    $$('#search-again-nr').addEventListener('click', function() {
        $$('#load-circle').classList.remove('active');
        $('#start-detweet-div').fadeIn(100);
        $$('#no-results-div').classList.remove('transition');
        $$('#no-results-div').classList.remove('visible');
        $$('#no-results-div').setAttribute('style', '');
    });
/* ============ SEARCH AGAIN BUTTON END ============ */

/* ============ KEEP BUTTON ============ */
    // This function is for keeping tweets by removing them from the list of all tweets that are to be deleted.
    $('#enclosure').on('click', '.keep-tweet', function() {
        $(this).parent().fadeOut(1000, function() {
            let id = this['id'];
            if (idList.includes(id)) {
                let idIndex = idList.indexOf(id);
                idList.splice(idIndex, 1);
                $$('#remaining').textContent = idList.length;
            }
            this.parentElement.remove();
            // If there are no elements left to keep, show the search again option with custom text.
            if (idList.length == 0){
                $$('#search-again-div p').textContent = "Looks like there are no tweets left to delete. Thank you for using deTweet!";
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
    $$('#remove-all').addEventListener('click', function() {
        $('.ui.basic.modal').modal('show');
    });

    // cancel button to back out of deleting tweets.
    $$('#cancel').addEventListener('click', function() {
        $('.ui.basic.modal').modal('hide');
    });

    // Actual removal of tweets once the user confrims.
    $$('#remove').addEventListener('click', function() {
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
        // Brings in the seach again / tweet out suport menu. On a delay so the other box fades out first.
        setTimeout(function() {
            $$('#count-info').textContent = "Total deTweets: ";
            $$('#remaining').textContent = idList.length;
            $$('#search-again-div p').textContent = "Thank you for using deTweet! Your tweets have been deTweeted! Please give your profile a moment to register the changes.";
            $('#search-again-div').transition({
                animation: 'drop', duration: 500
            });
        }, 2000);
        console.log("Id list after remove clicked: " + idList);
    });
/* ============ REMOVE BUTTON END ============ */

/* ============ SCROLL TO TOP BUTTON ============ */
    // Scroll to the top button animation.
    $$("a[href='#top']").addEventListener('click', function() {
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
    });
/* ============ SCROLL TO TOP BUTTON END ============ */


});
