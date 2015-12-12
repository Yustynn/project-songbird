var mongoose = require('mongoose');

var SongSchema = new mongoose.Schema({
	username: {type: String, required:true},
	songTitle: {type: String, required: true},
	songArtist: {type: String, required: true},
	songUrl: {type: String, required: true},
	songValence: {type: Number, required: true}
})

mongoose.model("Song", SongSchema);