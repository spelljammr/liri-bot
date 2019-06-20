require("dotenv").config();

const keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

const command = process.argv[2];