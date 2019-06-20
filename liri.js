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
// If first element is spotify-this-song
if (args[0] === "spotify-this-song") {
    // ...and second element is undefined, search Daly City Train
    if (args[1] === undefined) {
        spotifySong("Daly City Train")
            // Otherwise search using user input and split everything after, joining with a " ".
    } else {
        let songTitle = args.slice(1).join(" ");
        spotifySong(songTitle);
    }
};

// Concert this
// If first element is concert-this...
if (args[0] === "concert-this") {
    // ...and second is undefined, use rancid
    if (args[1] === undefined) {
        getConcerts("Rancid");
        // ...otherwise, use user input and join separate words by " ".
    } else {
        getConcerts(args.slice(1).join(" "));
    }
};

// Search using 'do-what-it-says' as input
// If first element is do-what-it-says
if (args[0] === "do-what-it-says") {
    // Use fs to grab the text from "random.txt"
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        dataArr = data.split(",");
        // If movie-this is first element
        if (dataArr[0] === "movie-this") {
            // ...and nothing as second element, search Bad Santa
            if (dataArr[1] === undefined) {
                getMovie("Bad+Santa");
                // ...but if elements are there, split terms after index 1 and join separate words with a "+"
            } else {
                getMovie(dataArr[1].split().join("+"))
            }
        };
        // If first element is spotify-this-song
        if (dataArr[0] === "spotify-this-song") {
            // ...and second element is undefined, search "Daly City Train".
            if (dataArr[1] === undefined) {
                spotifySong("Daly City Train")
                    // Otherwise, search using second element
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
            console.log(`Language: ${movie.data.Language}`)
            console.log(`Plot: ${movie.data.Plot}`);
            console.log(`Starring: ${movie.data.Actors}`);
        })
        // If nothing returned, return error
        .catch(function(err) {
            console.log(err);
        });
};

// Grab band name and search concert-this
function getConcerts(artistName) {
    axios
    // Make call to axios w/ artist name
        .get(`https://rest.bandsintown.com/artists/${artistName}/events?app_id=codingbootcamp`)
        .then(function(response) {
            console.log("");
            console.log(`Venue: ${response.data[0].venue.name}`);
            console.log(`Where: ${response.data[0].venue.city}, ${response.data[0].venue.region} ${response.data[0].venue.country}`);
            console.log(`Event Date: ${response.data[0].datetime}`);
            console.log(`Lineup: ${response.data[0].lineup}`);
        })
        // If nothing returned, return error
        .catch(function(err) {
            console.log(err);
        });
};