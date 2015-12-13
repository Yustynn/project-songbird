var https = require("https");
var superagent = require("superagent");
var connectToDb = require('../../db');
var username = "ldt96";
var criticalID;
var Song = require("mongoose").model("Song");


Song.find({username:username})
    .then(function(songs) {
        var songsToAdd = [];
        songs.forEach(function(song) {
            songsToAdd.push(song.songUrl)
        })
        addPlaylist(songsToAdd);
    })

// var songsToAdd = ["spotify:track:0bYg9bo50gSsH3LtXe2SQn","spotify:track:09CtPGIpYB4BrO8qb1RGsF"];

var bearerToken = "BQDxWyRJJbtBNJQWyI8cIx1pR2po4ATpo5vJ_xcAAujw8UZPGHkoz_BI8k5by-l0FUux5g7E4tROWhd7Sps70mKWqG7UYNboJM1vcaRigtYe-EaZJaBIiOz3jCE2DeS6kIqqEHmrE0QyhtJhE-RsBuTQQR1GIhvpOzEB59khfSAESfmGSSyZe4umKeDctcPDPmbfZxc8aEBs0VbINIlndbzf1qIiotp4AGZ86vazVxtNDTNNWmzayRmKOyA-6BE28tK8cFTUK6D6VCIxOS7QOlIaNoCm1t7wD6bI";
var userOptions = {
    hostname: "api.spotify.com",
    port: 443,
    path: "/v1/users/" + username + "/playlists",
    method: "POST",
    headers: {
        "Authorization": "Bearer " + bearerToken
    },
    body: {
        name: "Hello"
    }
}
var addPlaylist = function(songs) {
    superagent
        .post("https://api.spotify.com/v1/users/" + username + "/playlists")
        .send({
            name: 'Test1 Playlist'
        })
        .set('Authorization', 'Bearer ' + bearerToken)
        .end(function(err, res) {
            addSongs(res.body.id, songs)

        });
}

var addSongs = function(playlistId, songsToAdd) {
    superagent
        .post("https://api.spotify.com/v1/users/" + username + "/playlists/" + playlistId + "/tracks")
        .send({
            "uris": songsToAdd
        })
        .set('Authorization', 'Bearer ' + bearerToken)
        .end(function(err, res) {
            // console.log(err);
            console.log(res);
        })
}
var Song = require("mongoose").model("Song");
