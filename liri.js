var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var keys = require('./keys.js');

var nodeArgs = process.argv;

// module.exports = keys;


function spotifyThis() {
    if (requestInput === "") {  //spotify-this-song 'song title here' 
        requestInput = "The Sign Ace of Base"
    }
    spotify
        .search({
            type: 'track',
            query: requestInput
        })
        .then(function (response) {
            var artist = JSON.stringify(response.tracks.items[0].artists[0].name);
            var song = JSON.stringify(response.tracks.items[0].name);
            var preview = JSON.stringify(response.tracks.items[0].album.external_urls.spotify);
            var album = JSON.stringify(response.tracks.items[0].album.name);
            console.log(JSON.stringify(response.tracks.items[0], null, 2))

            console.log(`
                    Artist(s): ${artist}
                    The song's name: ${song}
                    A preview link of the song from Spotify: ${preview}
                    The album that the song is from: ${album}`);
        })
        .catch(function (err) {
            console.log(err);
        })
};


function retrieveTweets() {

    fs.appendFile('./log.txt', 'User Command: node liri.js my-tweets\n\n', (err) => {
        if (err) throw err;
    });
    var client = new twitter(twitterKeys); // my-tweets
    var params = {
        screen_name: '@kristaneel',
        count: 20
    };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) {
            var errorStr = 'ERROR: Retrieving user tweets -- ' + error;

            fs.appendFile('./log.txt', errorStr, (err) => {
                if (err) throw err;
                console.log(errorStr);
            });
            return;
        } else {
            var outputStr = '------------------------\n' +
                'User Tweets:\n' +
                '------------------------\n\n';

            for (var i = 0; i < tweets.length; i++) {
                outputStr += 'Created on: ' + tweets[i].created_at + '\n' +
                'Tweet content: ' + tweets[i].text + '\n' +
                '------------------------\n';
            }

            fs.appendFile('./log.txt', 'LIRI Response:\n\n' + outputStr + '\n', (err) => {
                if (err) throw err;
                console.log(outputStr);
            });
        }
    });
};


function grabMovie() {
    console.log("My Favorite movie is Robin Hood!");

    var findMovie;  //  movie-this '<movie name here>'
    if (parameter === undefined) {
        findMovie = "Mr. Nobody";
    } else {
        findMovie = parameter;
    };

    var queryUrl = "http://www.omdbapi.com/?t=" + findMovie + "&y=&plot=short&apikey=6c0bb571";

    console.log(queryUrl);
    request(queryUrl, function (err, res, body) {

        if (!err && res.statusCode === 200) {

            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value); 
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
};