require("dotenv").config();

// Variable assignment
// Get axios package
const axios = require("axios");
// Get node spotify api
const Spotify = require("node-spotify-api");
// Provide API for working with filesystem
const fs = require("fs");
// Reference keys.js for spotify info
const spotifyKeys = require("./keys.js");
// Create new spotify object
const spotify = new Spotify(spotifyKeys.spotify);
// List of args. First is node, second is the file (path), all following are args.
const [node, file, ...args] = process.argv;


// Movie this
// If nothing, use Bad Santa as default
if (args[0] === "movie-this") {
    if (args[1] === undefined) {
        getMovie("Bad+Santa");
        // Otherwise use args, but insert a + between each so they are searched as a single arg
    } else {
        getMovie(args.slice(1).join("+"));
    }
};


// Spotify this song
// If no args are used, return results for Daly City Train
if (args[0] === "spotify-this-song") {
    if (args[1] === undefined) {
        spotifySong("Daly City Train")
            // Otherwise search using user input
    } else {
        let songTitle = args.slice(1).join(" ");
        spotifySong(songTitle);
    }
};


// Search using 'do-what-it-says' as input
if (args[0] === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        dataArr = data.split(",");
        if (dataArr[0] === "movie-this") {
            if (dataArr[1] === undefined) {
                getMovie("Bad+Santa");
            } else {
                getMovie(dataArr[1].split().join("+"))
            }
        };
        if (dataArr[0] === "spotify-this-song") {
            if (dataArr[1] === undefined) {
                spotifySong("Daly City Train")
            } else {
                spotifySong(dataArr[1])
            }
        };
    });
};


// Grab song title and return relevant tracks
function spotifySong(songName) {
    spotify.search({ type: "track", query: songName, limit: 5 }, function(err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }
        // Display song data
        data.tracks.items.forEach(function(element) {
            console.log("");
            console.log(`Artist: ${element.artists[0].name}`);
            console.log(`Song: ${songName}`);
            console.log(`Spotify Preview Link: ${element.preview_url}`);
            console.log(`Album: ${element.album.name}`);
        });
    })
};

// Grab movie title and return specific movie info.
function getMovie(movieName) {
    axios
    // Make call to axios w/ movie name
        .get(`http://www.omdbapi.com/?t=${movieName}&apikey=ea249698`)
        .then(function(movie) {
            console.log("");
            console.log(`Title: ${movie.data.Title}`);
            console.log(`Released: ${movie.data.Year}`);
            console.log(`IMDB Raiting: ${movie.data.Ratings[0].Value}`);
            console.log(`Rotten Tomatoes Rating: ${movie.data.Ratings[1].Value}`);
            console.log(`Produced in: ${movie.data.Country}`);
            console.log(`Plot: ${movie.data.Plot}`);
            console.log(`Starring: ${movie.data.Actors}`);
        })
        // If nothing returned, return error
        .catch(function(err) {
            console.log(err);
        });
};