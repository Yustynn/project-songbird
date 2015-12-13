var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI(require('./keys').alchemy);
var Promise = require('bluebird');

function attachSentimentPromisified(tweet) {
	return new Promise(function(resolve, reject) {
		alchemy.sentiment(tweet, {}, function(err, response) {
			if (err) reject(err);
			tweetObj = {
				sentimentVal: response.docSentiment.score,
				text: tweet
			}
			return resolve(tweetObj);
		});
	})
}

module.exports = attachSentimentPromisified;	

