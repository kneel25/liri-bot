var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var keys = require('./keys.js');  

var nodeArgs = process.argv; 

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

module.exports = keys;