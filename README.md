# liri-bot

## LIRI-Bot

This assignment was created as a homework during the UC Berkeley Extension's Full Stack Bootcamp. For this assignment, we were challenged to utilize our newly acquired Node.js skills in order to create an application that can do the following on command:

* Retrieve Spotify search results
* Retrieve upcoming concerts for a queried artist.

## Installation
1. From terminal or git-terminal, navigate to your desired download directory and run the following:

    `git clone https://github.com/ahydorn/liri-bot.git`

2. After installation, navigate inside the newly downloaded folder and run `npm install`
3. When complete, run `node liri.js` or one of the following commands without quotation marks:
    * `concert-this <artist name>`
    * `spotify-this-song <song title>`
    * `movie-this <movie name>`

## Command Usage

### Find Upcoming Concerts Using BandsInTown
`node liri.js concert-this`
Displays upcoming concerts with the following details in Terminal:
* Venue
* Location
* Event Date
* Lineup

### Find a Song using the Spotify API
`node liri.js spotify-this-song <song name>`
Returns the following information in Terminal:

* Artist(s)
* Song title
* Spotify preview link
* The album on which the song appears

*If no track is specified, it will default to *"Daly City Train"* by Rancid.

### Find a movie using the OMDB API
`node liri.js movie-this <movie name>`
Shows the following information in Terminal:

* Movie title
* Release year
* IMDB Rating
* Rotten Tomatoes rating
* Country of production
* Plot synopsis
* Actors

*If no movie is specified, it will default to "Bad Santa"*

## Find a movie using text from a file
`node liri.js do-what-it-says`

Takes the text from random.txt and runs the song through spotify-this-song command
Tech used
Node.js
Twitter NPM Package - https://www.npmjs.com/package/twitter
Spotify NPM Package - https://www.npmjs.com/package/spotify
Request NPM Package - https://www.npmjs.com/package/request
Prerequisites
- Node.js - Download the latest version of Node https://nodejs.org/en/
Built With
Sublime Text - Text Editor
Authors
Stefanie Ding - Node JS - Stefanie Ding