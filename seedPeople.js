// var Person = require('./server/db/models/person');
var connectToDb = require('./server/db');
var Person = require('mongoose').model('Person');

var justinBieber = {
    name: 'Justin Bieber',
    spotifyHandle: 'justinbieberofficial',
    twitterHandle: 'justinbieber'
}

var ladyGaga = {
    name: 'Lady Gaga',
    spotifyHandle: 'ladygaga_spotify',
    twitterHandle: 'ladygaga'
}

Person.create([ladyGaga, justinBieber])
.then(function resolve() {
    console.log('Seed successful!')
})
.then(null, function reject(err){
    console.err('Seed error: ', err)
})
