var https = require("https");
var superagent = require("superagent");
// var connectToDb = require('../../db');
var username = "ldt96";
var criticalID;

var songsToAdd = ["spotify:track:0bYg9bo50gSsH3LtXe2SQn","spotify:track:09CtPGIpYB4BrO8qb1RGsF"];

var bearerToken = "BQBQ_oFTlm1A22s5XjgOYgdfkqNrwvyoi-zTO1ztWbwnJBm4iuKsdW5THpuJ60chF9hIdLtiE2XXq0OGuqudaRY7DVZrRXTx-xmv1wiuHn17ozD2fddeqaTcw741XEuUQ9yWPaLfZcTWGSWIYmIZEQ74u3Rt10Ux7h5kMSH-uqBr5dwsea05UGylWTUicTtc3zDhrx21iIfR1Wi9rB1EKmcXqY-Af0PtRZdvSRpg0mhhgfHMbNALRLLY0AAoCSsEGAIDu9YL8NunoaJIdsLmedd6pZDQHoXcVEdA";
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

superagent
    .post("https://api.spotify.com/v1/users/" + username + "/playlists")
    .send({
        name: 'Test1 Playlist'
    })
    .set('Authorization', 'Bearer ' + bearerToken)
    .end(function(err, res) {
        // console.log("error: ", err);
        // console.log("response:", res);
        addSongs(res.body.id)
        // console.log("response:", res)
        // Calling the end function will send the request
    });

var addSongs = function(playlistId){
	superagent
		.post("https://api.spotify.com/v1/users/"+username+"/playlists/"+playlistId+"/tracks")
		.send({
			"uris":songsToAdd
		})
		.set('Authorization', 'Bearer ' + bearerToken)
		.end(function(err,res){
			console.log(err);
			console.log(res);
		})

	console.log('\n\n\n\n'+playlistId+'\n\n\n\n')
}
// var Song = require("mongoose").model("Song");


// Song.find()
// 	.then(function(songs){
// 		console.log(songs)
// 	})
