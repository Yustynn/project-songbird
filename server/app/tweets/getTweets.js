var Twitter = require('twitter');
var attachSentimentPromisified = require('./getSentiments');
var Promise = require('bluebird');

var client = new Twitter({
  consumer_key: require('./keys').consumer_key,
  consumer_secret: require('./keys').consumer_secret,
  access_token_key: require('./keys').access_token_key,
  access_token_secret: require('./keys').access_token_secret
});

var params = {screen_name: 'SadQuotes'};

client.get('statuses/user_timeline', params, function(error, tweets, response){
  	if (!error) {
	  	var allTweets = [];
	  	for (var i = 0; i < tweets.length; i++) {
	  		if (tweets[i].text.indexOf("http://") === -1 && tweets[i].text.indexOf("https://") === -1) {
	  			if (tweets[i].in_reply_to_screen_name === null) {
		  			allTweets.push(tweets[i].text);
		  		}
	  		}
	  	}
	  	var tweets = allTweets.map(attachSentimentPromisified);
	  	Promise.all(tweets)
	  	.then(function(tweets) {
	  		tweets = tweets.filter(function(tweet) {
	  			return tweet.sentimentVal
	  		});
	  		var tweetScore = tweets.reduce(function(current, tweet) {
	  			var sentimentVal = (Number(tweet.sentimentVal) + 1) / 2;
	  			return current + sentimentVal;
		  	}, 0);
		  	console.log(tweetScore / tweets.length);
		})
	}
});