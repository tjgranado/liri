// add npm
var keys = require("./keys.js");
var fs = require("fs");
var keyList = keys.twitterKeys;
var keySpotify = keys.spotifyKeys;
var Spotify = require('node-spotify-api');
var request = require("request");
var Twitter = require('twitter');

// twitter function
function twitter() {
    var client = new Twitter({
        consumer_key: keyList.consumer_key,
        consumer_secret: keyList.consumer_secret,
        access_token_key: keyList.access_token_key,
        access_token_secret: keyList.access_token_secret
    });
    var params = { screen_name: 'chrislaramaya' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
            }
        }
    });
}
//OMDB function
function movieThis(movieTitle) {
        var omdbQueryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=e0a594ab";
    
        request(omdbQueryUrl, function(error, response, body) {
    
            if (!error && response.statusCode === 200) {
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("This movie's plot: " + JSON.parse(body).Plot);
                console.log("Actors in this movie: " + JSON.parse(body).Actors);
                console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value); 
            }
        });
    }

 //spotify function
function spotify(songTitle){
        var spotify = new Spotify({
            id: keySpotify.id,
            secret: keySpotify.secret
        });
    
     spotify.search({ type: 'track', query: songTitle }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            // console.log(data.tracks.items[0]); 
            console.log("Song Name: " + data.tracks.items[0].name);
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Album Name: " + data.tracks.items[0].album.name);
            console.log("A preview of the song can be found at the following link: " + data.tracks.items[0].preview_url);
        });
    }
// command function
function command(){
        fs.readFile("random.txt", "utf8", function(error, data) {
            if (error) {
                return console.log(error);
            }
            var dataArr = data.split(",");
            spotify(dataArr[1])
        });
    }
    
    //OMDB command
    if (process.argv[2] == "movie-this") {
        if (process.argv[3] === undefined || process.argv[3] === null){
            movieThis("Mr. Nobody");
        }
        else {
            movieThis(process.argv[3]);
        }  
    }
    //twitter command
    else if (process.argv[2] == "my-tweets") {
        twitter();
    } 
    //spotify command
    else if (process.argv[2] == "spotify-this-song") {
        if (process.argv[3] === undefined || process.argv[3] === null){
            console.log("Song Name: The Sign");
            console.log("Artist: Ace of Base");
        }
        else if (process.argv[3] != undefined || process.argv[3] != null){
            spotify(process.argv[3]);
        }
    }
    //do-what-it-says
    else if (process.argv[2] == "do-what-it-says") {
      command();
    } 