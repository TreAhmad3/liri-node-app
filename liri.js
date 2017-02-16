var input = process.argv;

var command = input[2];

// console.log(command);

var itemName = input[3];



// console.log(itemName);

// ---- TWITTER ------

var Twitter = require('twitter');

var keyFile = require("./keys.js");

var keyList = keyFile.twitterKeys;

// console.log(keyFile);

var params = {
	count: 20,
}



// ---- SPOTIFY ----- how to get specific pieces of data???

var spotify = require('spotify');

var querySearch = "";

var T = new Twitter(keyList);

if (command == "my-tweets"){
	
		T.get('statuses/user_timeline', params , function(error, tweets, response){
			if(error) throw error;
			var tweetArr = [];
			for (var i = 0; i < tweets.length; i++){
				var userTweets = tweets[i].text; //how do you get the time the tweet was posted also???
				var tweetTime = tweets[i].created_at;
				console.log(userTweets + " tweeted at " + tweetTime);
				console.log("--------------------")
				tweetArr.push(userTweets); //might use to store in the txt file if needed.
			}
			// console.log(tweetArr[0]);	
		});
} else if (command == "spotify-this-song"){
	if (querySearch != ""){
		for (var i = 3; i < input.length; i++){
			querySearch = querySearch + " " + input[i];
		}

		console.log("Searching for" + querySearch);
		console.log("--------------------");

		querySearch = querySearch.trim();

		spotify.search({type: 'track', query: querySearch}, function(err, data){
			var trackItemsArr = data["tracks"]["items"];
			
			if (!err) {
				for (var i = 0; i < trackItemsArr.length; i++){
					var trackName = data["tracks"]["items"][i]["name"];
					var albumName = data["tracks"]["items"][i]["album"]["name"];
					var artistName = data["tracks"]["items"][i]["album"]["artists"][0]["name"];
					var previewLink = data["tracks"]["items"][i]["preview_url"];


					if (trackName.toUpperCase() == querySearch.toUpperCase()){
						console.log("Artist: " + artistName);
						console.log("Track Name: " + trackName);
						console.log("Preview Link: " + previewLink);
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

}

