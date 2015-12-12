var mongoose = require('mongoose');


var schema = new mongoose.Schema({
    name: { type: String, required: true },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    spotifyHandle: { type: String, required: true },
    twitterHandle: { type: String, required: true },
    tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }]
});

mongoose.model('Person', schema);
