var https = require("https");
var http = require("http");
var url = require("url");
var connectToDb = require('../../db');
var promisifiedHttpsGet = require("../utils/promisifiedHttpsGet.js").promisifiedHttpsGet;
var promisifiedHttpGet = require("../utils/promisifiedHttpsGet.js").promisifiedHttpGet;


var Song = require("mongoose").model("Song");
var People = require("mongoose").model("Person");

var bearerToken = "BQDxWyRJJbtBNJQWyI8cIx1pR2po4ATpo5vJ_xcAAujw8UZPGHkoz_BI8k5by-l0FUux5g7E4tROWhd7Sps70mKWqG7UYNboJM1vcaRigtYe-EaZJaBIiOz3jCE2DeS6kIqqEHmrE0QyhtJhE-RsBuTQQR1GIhvpOzEB59khfSAESfmGSSyZe4umKeDctcPDPmbfZxc8aEBs0VbINIlndbzf1qIiotp4AGZ86vazVxtNDTNNWmzayRmKOyA-6BE28tK8cFTUK6D6VCIxOS7QOlIaNoCm1t7wD6bI";

var usernames = []
People.find()
	.then(function(people){
		people.forEach(function(person){
			usernames.push(person.spotifyHandle)
		})
		// the next line should be usernames.forEach()
		usernames.forEach(function(username){
			getPlaylists(username)
		})
	}).then(null, console.error);


function getPlaylists(username) {
    var userOptions = {
        hostname: "api.spotify.com",
        port: 443,
        path: "/v1/users/" + username + "/playlists",
        headers: {
            "Authorization": "Bearer " + bearerToken
        }
    }
    return promisifiedHttpsGet(userOptions)
    	.then(function(body){
    		console.log(3)
    		var playlists = JSON.parse(body).items;
            // console.log(playlists)
            console.log("Getting playlists...");

            var promisedPlaylists = [];
            playlists.forEach(function(playlist) {
                promisedPlaylists.push(getTracks(playlist.tracks.href, username));
            })
            return Promise.all(promisedPlaylists);
    	})
}
var tracksProcessed = 0;

function getTracks(playlistLink, username) {
    var linkToPlaylist = playlistLink;
    var linkToPlaylistObj = url.parse(linkToPlaylist);
    // console.log(linkToPlaylistObj)


    var playlistOptions = {
        hostname: linkToPlaylistObj.hostname,
        port: 443,
        path: linkToPlaylistObj.path,
        headers: {
            "Authorization": "Bearer " + bearerToken
        }
    };
    promisifiedHttpsGet(playlistOptions)
    	.then(function(body){
    		var trackList = JSON.parse(body).items;
            console.log("Getting tracks for each playlist")
            var promisedTracks = [];
            trackList.forEach(function(track) {
                tracksProcessed++;
                if (tracksProcessed > 120) {
                    console.log("too many songs")
                    return;
                }
                var trackName = track.track.name;
                var trackUrl = track.track.uri;
                var trackArtist = track.track.artists[0].name;
                // console.log(track)
                var song = {
                    username: username,
                    songTitle: trackName,
                    songArtist: trackArtist,
                    songUrl: trackUrl
                }
                promisedTracks.push(getValence(trackName, trackArtist, song));
                console.log('pushed track to promisedTracks')
            })

            Promise.all(promisedTracks)
            .then(function resolve(tracks) {
            	console.log(tracks);
            	console.log('\n\n\ntracks logged\n\n\n')
            	// tracks = tracks.filter(function(song) { return !song.username });
	            return Song.create(tracks)
	        })
        	.then(function(songs){
        		console.log('Created ' + songs.length + 'songs.');
			}).then(null, function(err) {
				console.error('You done messed up, but we\'ll take care of it');
				return 1
			})
    	})
}

var index = 0;

function getValence(trackName, trackArtist, song) {

    trackName = trackName.replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(" ").join("%20").toLowerCase();
    if(trackName === "should’ve%20been%20us") return
    trackArtist = trackArtist.replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(" ").join("%20").toLowerCase();

    var echonestUrl = "http://developer.echonest.com/api/v4/song/search?api_key=CCFQ1SJBPJYEFFOCP&artist=" + trackArtist + "&title=" + trackName + "&bucket=audio_summary"

    return promisifiedHttpGet(echonestUrl)
    	.then(function(body){
    		if(JSON.parse(body).response.songs[0] === undefined){
            	return
            }
            var songInfo = JSON.parse(body).response.songs[0];
            // console.log(songInfo)
            song.songValence = Number(songInfo.audio_summary.valence);
            // console.log(song);

            return song;
    	})
}

// module.exports =
