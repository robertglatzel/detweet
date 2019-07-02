document.addEventListener('DOMContentLoaded', function() {
	// Obj containing all the tweet id's and their text that have been flagged and will be rendered to the page.
	let tweetObj = {};
	//Shorthand query selector
	var $$ = function(sel) {
		return document.querySelector(sel);
	};

	/* ============ START BUTTON ============ */
	// Sends out the request with an optional search param.
	$$('#start-button').addEventListener('click', function() {
		//    $('#start-button').click(function () {
		//      let userSearch = $('#search-box input').val();
		let userSearch = $$('#search-box input').value;
		let searchArr = userSearch.split(' ');
		// Loading circle after clicking start. On a delay timer to load the content.
		$$('#load-circle').classList.add('active');
		// Get the tweets from the api
		$.ajax({
			url: '/users',
			type: 'GET',
			crossDomain: true,
			headers: {
				'Access-Control-Allow-Origin': '*'
			},
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			success: function(result) {
				let flagged_ct = result.length;
				// On success, loop through the returned list and extract the tweet id and the text, append it to the page.
				if (result.length != 0) {
					result.forEach(function(el) {
						let tweetId = Object.keys(el)[0];
						let tweetText = el[tweetId];
						tweetObj[tweetId] = tweetText;
						let newTweet = document.createElement('div');
						newTweet.classList.add('column', 'centered');
						newTweet.innerHTML = `<div id="${tweetId}" class="tweet ui segment hvr-float-shadow">
                                <div class="top">
                                    <p>You tweeted:</p>
                                </div>
                                <button class="keep-tweet ui button violet hvr-pulse-grow" title="Keep me!">Keep me</button>
                                <p class="tweet-text">${tweetText}</p>
                            </div>`;
						$$('#enclosure').appendChild(newTweet);
					});
					// Loads the 'no results' search element on to the page.
				} else if (result.length == 0) {
					setTimeout(function() {
						$('#start-detweet-div').fadeOut(100);
						$('#no-results-div').transition({
							animation: 'drop',
							duration: 900
						});
					}, 4000);
				}
			},
			error: function(error) {
				console.log(error);
			}
		});
	});
	/* ============ START BUTTON END ============ */
});
