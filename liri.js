var input = process.argv;

var command = input[2];

// console.log(command);

var itemName = input[3];

// OMDB -------

var movieKey = "1d902091f624dd0ac10d4954cefe5a14"

var mdb = require('moviedb')(movieKey);

var movieQuery = "";


// console.log(itemName);

// ---- TWITTER ------

var Twitter = require('twitter');

var keyFile = require("./keys.js");

var keyList = keyFile.twitterKeys;

var T = new Twitter(keyList);

// console.log(keyFile);

var params = {
    count: 20,
}



// ---- SPOTIFY ----- how to get specific pieces of data???

var spotify = require('spotify');

var querySearch = "";



if (command == "my-tweets") {

    T.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) throw error;
        var tweetArr = [];
        for (var i = 0; i < tweets.length; i++) {
            var userTweets = tweets[i].text; //how do you get the time the tweet was posted also???
            var tweetTime = tweets[i].created_at;
            console.log(userTweets + " tweeted at " + tweetTime);
            console.log("--------------------")
            tweetArr.push(userTweets); //might use to store in the txt file if needed.
        }
        // console.log(tweetArr[0]);	
    });
} else if (command == "spotify-this-song") {
    if (querySearch != " ") {
        for (var i = 3; i < input.length; i++) {
            querySearch = querySearch + " " + input[i];
        }

        console.log("Searching for" + querySearch);
        console.log("......................");

        querySearch = querySearch.trim();

        spotify.search({ type: 'track', query: querySearch }, function(err, data) {
            var trackItemsArr = data["tracks"]["items"];

            if (!err) {
                for (var i = 0; i < trackItemsArr.length; i++) {
                    var trackName = data["tracks"]["items"][i]["name"];
                    var albumName = data["tracks"]["items"][i]["album"]["name"];
                    var artistName = data["tracks"]["items"][i]["album"]["artists"][0]["name"];
                    var previewLink = data["tracks"]["items"][i]["preview_url"];


                    if (trackName.toUpperCase() == querySearch.toUpperCase()) {
                        console.log("====================");
                        console.log("Artist: " + artistName);
                        console.log("--------------------");
                        console.log("Track Name: " + trackName);
                        console.log("--------------------");
                        console.log("Preview Link: " + previewLink);
                        console.log("--------------------");
                        console.log("Album: " + albumName);
                        console.log("--------------------");

                        break;
                    }
                }
            } else {
                console.log('Error occured: ' + err);
                return;
            }
        });
    } else {
        console.log("Please provide a song name!");
    }
    // ---------- MOVIE DB ------------
} else if (command == "movie-this") {
    if (querySearch != " ") {

        for (var i = 3; i < input.length; i++) {
            movieQuery = movieQuery + " " + input[i];
        }

        console.log("Searching for" + movieQuery);
        console.log("......................");

        movieQuery = movieQuery.trim().split(' ').join('+');


        mdb.searchMovie({ query: movieQuery }, function(err, res) {
            var movieItemsArr = res["results"];
            if (!err) {
                for (var i = 0; i < movieItemsArr.length; i++) {
                    var movieTitle = res["results"][i]["original_title"];
                    var movieYear = res["results"][i]["release_date"];
                    var movieRating = res["results"][i]["vote_average"];
                    var moviePlot = res["results"][i]["overview"];

                    movieTitle = movieTitle.trim().split(' ').join('+');

                    if (movieTitle.toUpperCase() == movieQuery.toUpperCase()) {
                        console.log("====================");
                        console.log("Movie Title: " + movieTitle.split('+').join(' '));
                        console.log("--------------------");
                        console.log("This movie was released: " + movieYear);
                        console.log("--------------------");
                        console.log("This movie earned (on average) " + movieRating + " out of 10.");
                        console.log("--------------------");
                        console.log("Plot: " + moviePlot);
                        console.log("--------------------");

                        break;
                    }
                }
            } else {
                console.log('Error occured: ' + err);
                return;
            }
        });
    } else {
        console.log("Please provide a song name!");
    }
}
