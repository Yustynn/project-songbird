var mongoose = require('mongoose');


var schema = new mongoose.Schema({
    name: { type: String, required: true },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    spotifyHandle: { type: String, required: true },
    twitterHandle: { type: String, required: true },
    tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }]
});

var schema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    }
});

mongoose.model('Person', schema);
